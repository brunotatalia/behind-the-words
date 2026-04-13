/**
 * Fetch Deezer 30-second preview URLs for all questions
 * No API key needed!
 *
 * Usage:
 *   node scripts/fetch-deezer-previews.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = path.join(__dirname, '../src/data/questions.json');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchDeezer(songTitle, artist) {
  const query = encodeURIComponent(`${songTitle} ${artist}`);
  const url = `https://api.deezer.com/search?q=${query}&limit=3`;

  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 429) {
      console.log(`  ⏳ Rate limited, waiting 5s...`);
      await sleep(5000);
      return searchDeezer(songTitle, artist);
    }
    return null;
  }

  const data = await res.json();
  const tracks = data.data || [];

  if (tracks.length === 0) return null;

  // Prefer track with preview
  const withPreview = tracks.find((t) => t.preview && t.preview !== '');
  const best = withPreview || tracks[0];

  return {
    previewUrl: best.preview || null,
    title: best.title,
    artist: best.artist?.name,
  };
}

async function main() {
  console.log('\n🎵 Deezer Preview URL Fetcher (no API key needed!)\n');

  const questions = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));

  let found = 0;
  let notFound = 0;
  let alreadyHad = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    if (q.previewUrl) {
      alreadyHad++;
      continue;
    }

    process.stdout.write(`[${i + 1}/${questions.length}] "${q.songTitle}" - ${q.artist}... `);

    try {
      const result = await searchDeezer(q.songTitle, q.artist);

      if (result && result.previewUrl) {
        q.previewUrl = result.previewUrl;
        console.log(`✅ Found (${result.title} - ${result.artist})`);
        found++;
      } else {
        console.log(`❌ Not found`);
        notFound++;
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
      notFound++;
    }

    // Deezer allows ~50 requests per 5 seconds
    await sleep(150);
  }

  fs.writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2) + '\n');

  console.log('\n' + '═'.repeat(50));
  console.log(`✅ Preview URLs found:     ${found}`);
  console.log(`❌ Not found:              ${notFound}`);
  console.log(`⏭️  Already had preview:     ${alreadyHad}`);
  console.log(`📁 Saved to: ${QUESTIONS_PATH}`);
  console.log('═'.repeat(50) + '\n');
}

main().catch((err) => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
