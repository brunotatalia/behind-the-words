/**
 * Fetch Spotify preview URLs for all questions in questions.json
 *
 * Usage:
 *   node scripts/fetch-spotify-previews.mjs <CLIENT_ID> <CLIENT_SECRET>
 *
 * Example:
 *   node scripts/fetch-spotify-previews.mjs abc123 xyz789
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = path.join(__dirname, '../src/data/questions.json');

const CLIENT_ID = process.argv[2];
const CLIENT_SECRET = process.argv[3];

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\n❌ Usage: node scripts/fetch-spotify-previews.mjs <CLIENT_ID> <CLIENT_SECRET>\n');
  console.error('Get your credentials at: https://developer.spotify.com/dashboard\n');
  process.exit(1);
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

// ─── Search for a track and get preview URL + Spotify ID ───
async function searchTrack(token, songTitle, artist) {
  const query = encodeURIComponent(`track:${songTitle} artist:${artist}`);
  const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=3`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    if (res.status === 429) {
      // Rate limited - wait and retry
      const retryAfter = parseInt(res.headers.get('retry-after') || '2');
      console.log(`  ⏳ Rate limited, waiting ${retryAfter}s...`);
      await sleep(retryAfter * 1000);
      return searchTrack(token, songTitle, artist);
    }
    return null;
  }

  const data = await res.json();
  const tracks = data.tracks?.items || [];

  if (tracks.length === 0) return null;

  // Try to find best match (prefer one with preview_url)
  const withPreview = tracks.find((t) => t.preview_url);
  const best = withPreview || tracks[0];

  return {
    spotifyId: best.id,
    previewUrl: best.preview_url || null,
    name: best.name,
    artist: best.artists?.[0]?.name,
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Main ───
async function main() {
  console.log('\n🎵 Spotify Preview URL Fetcher\n');
  console.log('Getting access token...');
  const token = await getAccessToken();
  console.log('✅ Token received\n');

  const questions = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));

  let found = 0;
  let notFound = 0;
  let alreadyHad = 0;
  let noPreview = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    // Skip if already has previewUrl
    if (q.previewUrl) {
      alreadyHad++;
      continue;
    }

    process.stdout.write(`[${i + 1}/${questions.length}] "${q.songTitle}" - ${q.artist}... `);

    try {
      const result = await searchTrack(token, q.songTitle, q.artist);

      if (result) {
        // Always update spotifyId if we found one
        if (result.spotifyId) {
          q.spotifyId = result.spotifyId;
        }

        if (result.previewUrl) {
          q.previewUrl = result.previewUrl;
          console.log(`✅ Found (${result.name})`);
          found++;
        } else {
          console.log(`⚠️  Found on Spotify but no preview available`);
          noPreview++;
        }
      } else {
        console.log(`❌ Not found on Spotify`);
        notFound++;
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
      notFound++;
    }

    // Small delay to avoid rate limiting (30 requests per second allowed)
    await sleep(100);
  }

  // Save updated questions
  fs.writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2) + '\n');

  console.log('\n' + '═'.repeat(50));
  console.log(`✅ Preview URLs found:     ${found}`);
  console.log(`⚠️  No preview available:   ${noPreview}`);
  console.log(`❌ Not found on Spotify:    ${notFound}`);
  console.log(`⏭️  Already had preview:     ${alreadyHad}`);
  console.log(`📁 Saved to: ${QUESTIONS_PATH}`);
  console.log('═'.repeat(50) + '\n');
}

main().catch((err) => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
