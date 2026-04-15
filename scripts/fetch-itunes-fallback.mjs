/**
 * Audit every question's Deezer preview, and fetch an iTunes fallback
 * (`itunesPreviewUrl`) for any track where Deezer returns null preview
 * OR where there's no deezerId at all.
 *
 * iTunes previews never expire and are universally available.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = path.join(__dirname, '../src/data/questions.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function deezerHasPreview(deezerId) {
  if (!deezerId) return false;
  try {
    const r = await fetch(`https://api.deezer.com/track/${deezerId}`);
    if (!r.ok) return false;
    const j = await r.json();
    return !!j.preview;
  } catch {
    return false;
  }
}

async function searchItunes(songTitle, artist) {
  const q = encodeURIComponent(`${songTitle} ${artist}`.trim());
  // Try US first (broadest catalog), then IL
  for (const country of ['US', 'IL']) {
    const url = `https://itunes.apple.com/search?term=${q}&media=music&limit=10&country=${country}`;
    try {
      const r = await fetch(url);
      if (r.status === 429) {
        await sleep(8000);
        continue;
      }
      if (!r.ok) continue;
      const data = await r.json();
      const tracks = data.results || [];
      const hit = tracks.find((t) => t.previewUrl);
      if (hit) {
        return {
          previewUrl: hit.previewUrl,
          title: hit.trackName,
          artist: hit.artistName,
        };
      }
    } catch {}
  }
  return null;
}

async function main() {
  console.log('\n🍎 iTunes fallback fetcher (audits Deezer previews)\n');
  const questions = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));

  // Step 1: audit Deezer in parallel
  console.log(`Auditing ${questions.length} tracks against Deezer...`);
  const needsFallback = [];
  const queue = [...questions];
  const CONCURRENCY = 15;

  async function worker() {
    while (queue.length) {
      const q = queue.shift();
      if (q.itunesPreviewUrl) continue; // already has fallback
      const hasDeezer = await deezerHasPreview(q.deezerId);
      if (!hasDeezer) needsFallback.push(q);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  console.log(`Need iTunes fallback: ${needsFallback.length}/${questions.length}\n`);

  // Step 2: fetch iTunes previews sequentially (respect rate limits)
  let found = 0;
  let notFound = 0;
  const notFoundList = [];

  for (let i = 0; i < needsFallback.length; i++) {
    const q = needsFallback[i];
    process.stdout.write(`[${i + 1}/${needsFallback.length}] "${q.songTitle}" — ${q.artist}... `);

    let result = await searchItunes(q.songTitle, q.artist);
    await sleep(250);

    if (!result) {
      // Fallback: title only
      result = await searchItunes(q.songTitle, '');
      await sleep(250);
    }

    if (result) {
      q.itunesPreviewUrl = result.previewUrl;
      console.log(`✅ ${result.title} — ${result.artist}`);
      found++;
    } else {
      console.log(`❌`);
      notFound++;
      notFoundList.push(`${q.id}: ${q.songTitle} — ${q.artist}`);
    }

    // Save progress every 20
    if ((i + 1) % 20 === 0) {
      fs.writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2) + '\n');
    }
  }

  fs.writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2) + '\n');

  const covered = questions.filter((q) => q.deezerId || q.itunesPreviewUrl).length;
  console.log('\n' + '═'.repeat(60));
  console.log(`✅ iTunes fallbacks added: ${found}`);
  console.log(`❌ Still no preview:       ${notFound}`);
  console.log(`📊 Total with some audio:  ${covered}/${questions.length}`);
  console.log('═'.repeat(60));

  if (notFoundList.length) {
    console.log('\nStill missing:');
    notFoundList.forEach((l) => console.log('  ' + l));
    fs.writeFileSync('/tmp/still-missing.json', JSON.stringify(notFoundList, null, 2));
  }
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
