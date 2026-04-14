/**
 * Fetch Spotify track IDs for ALL questions missing spotifyId in questions.json
 *
 * Usage:
 *   node scripts/fetch-all-spotify-ids.mjs <CLIENT_ID> <CLIENT_SECRET>
 *
 * Or via environment variables:
 *   SPOTIFY_CLIENT_ID=abc SPOTIFY_CLIENT_SECRET=xyz node scripts/fetch-all-spotify-ids.mjs
 *
 * Get credentials at: https://developer.spotify.com/dashboard
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = path.join(__dirname, '../src/data/questions.json');

const CLIENT_ID = process.argv[2] || process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.argv[3] || process.env.SPOTIFY_CLIENT_SECRET;

// Pass --dry-run to preview without writing
const DRY_RUN = process.argv.includes('--dry-run');

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\nUsage: node scripts/fetch-all-spotify-ids.mjs <CLIENT_ID> <CLIENT_SECRET>');
  console.error('   or: SPOTIFY_CLIENT_ID=abc SPOTIFY_CLIENT_SECRET=xyz node scripts/fetch-all-spotify-ids.mjs');
  console.error('\nGet your credentials at: https://developer.spotify.com/dashboard\n');
  process.exit(1);
}

// ─── Helpers ───

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Get Spotify access token (Client Credentials flow) ───
async function getAccessToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to get token: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.access_token;
}

// ─── Search for a track on Spotify ───
async function searchTrack(token, songTitle, artist) {
  const query = encodeURIComponent(`${songTitle} ${artist}`);
  const url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=3`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    if (res.status === 429) {
      const retryAfter = parseInt(res.headers.get('retry-after') || '3', 10);
      console.log(`    Rate limited, waiting ${retryAfter}s...`);
      await sleep(retryAfter * 1000);
      return searchTrack(token, songTitle, artist);
    }
    throw new Error(`Spotify API error: ${res.status}`);
  }

  const data = await res.json();
  const tracks = data.tracks?.items || [];

  if (tracks.length === 0) return null;

  // Return top results for matching verification
  return tracks.map((t) => ({
    spotifyId: t.id,
    name: t.name,
    artists: t.artists.map((a) => a.name).join(', '),
    album: t.album?.name,
    popularity: t.popularity,
  }));
}

/**
 * Simple string similarity check (case-insensitive, ignoring punctuation).
 * Returns true if the strings are reasonably similar.
 */
function isSimilar(a, b) {
  const normalize = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  const na = normalize(a);
  const nb = normalize(b);
  // Exact match after normalization
  if (na === nb) return true;
  // One contains the other
  if (na.includes(nb) || nb.includes(na)) return true;
  return false;
}

// ─── Main ───
async function main() {
  console.log('\n=== Spotify ID Fetcher ===\n');
  if (DRY_RUN) console.log('[DRY RUN - will not write to file]\n');

  console.log('Getting access token...');
  const token = await getAccessToken();
  console.log('Token received.\n');

  const questions = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));

  // Find questions missing spotifyId
  const missing = questions.filter((q) => !q.spotifyId && q.songTitle && q.artist);
  const alreadyHave = questions.filter((q) => q.spotifyId).length;
  const noSongData = questions.filter((q) => !q.songTitle || !q.artist).length;

  console.log(`Total questions:       ${questions.length}`);
  console.log(`Already have spotifyId: ${alreadyHave}`);
  console.log(`Missing spotifyId:      ${missing.length}`);
  if (noSongData > 0) {
    console.log(`No song/artist data:    ${noSongData} (skipped)`);
  }
  console.log('');

  if (missing.length === 0) {
    console.log('Nothing to do - all questions already have spotifyId.');
    return;
  }

  let found = 0;
  let notFound = 0;
  let mismatch = 0;
  const failures = [];
  const mismatches = [];

  for (let i = 0; i < missing.length; i++) {
    const q = missing[i];
    const label = `[${i + 1}/${missing.length}]`;

    process.stdout.write(`${label} "${q.songTitle}" - ${q.artist} ... `);

    try {
      const results = await searchTrack(token, q.songTitle, q.artist);

      if (!results || results.length === 0) {
        console.log('NOT FOUND');
        notFound++;
        failures.push({ id: q.id, songTitle: q.songTitle, artist: q.artist });
      } else {
        const best = results[0];

        // Verify the match is reasonable
        const titleMatch = isSimilar(q.songTitle, best.name);
        const artistMatch = isSimilar(q.artist, best.artists);

        if (titleMatch || artistMatch) {
          // Good match - assign the ID
          q.spotifyId = best.spotifyId;
          console.log(`FOUND -> ${best.name} by ${best.artists} [${best.spotifyId}]`);
          found++;
        } else {
          // Potential mismatch - still assign but flag it
          q.spotifyId = best.spotifyId;
          console.log(
            `MISMATCH? Searched: "${q.songTitle}" - ${q.artist} | Got: "${best.name}" - ${best.artists} [${best.spotifyId}]`
          );
          mismatch++;
          mismatches.push({
            id: q.id,
            searched: `${q.songTitle} - ${q.artist}`,
            got: `${best.name} - ${best.artists}`,
            spotifyId: best.spotifyId,
          });
        }
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      notFound++;
      failures.push({ id: q.id, songTitle: q.songTitle, artist: q.artist, error: err.message });
    }

    // Rate limiting: 100ms delay between requests
    await sleep(100);
  }

  // Save results
  if (!DRY_RUN) {
    fs.writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2) + '\n');
  }

  // Report
  console.log('\n' + '='.repeat(60));
  console.log('RESULTS:');
  console.log(`  Found (good match):   ${found}`);
  console.log(`  Found (mismatch):     ${mismatch}`);
  console.log(`  Not found:            ${notFound}`);
  console.log(`  Total processed:      ${missing.length}`);
  console.log('='.repeat(60));

  if (mismatches.length > 0) {
    console.log('\nPOTENTIAL MISMATCHES (review these):');
    for (const m of mismatches) {
      console.log(`  ${m.id}: Searched "${m.searched}" -> Got "${m.got}" [${m.spotifyId}]`);
    }
  }

  if (failures.length > 0) {
    console.log('\nFAILED LOOKUPS:');
    for (const f of failures) {
      console.log(`  ${f.id}: "${f.songTitle}" - ${f.artist}${f.error ? ` (${f.error})` : ''}`);
    }
  }

  if (!DRY_RUN) {
    console.log(`\nSaved to: ${QUESTIONS_PATH}`);
  } else {
    console.log('\n[DRY RUN] No changes written.');
  }
  console.log('');
}

main().catch((err) => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
