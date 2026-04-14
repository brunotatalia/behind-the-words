/**
 * Fetch Deezer track IDs for all questions.
 * IDs don't expire (unlike preview URLs). Preview URLs are fetched at runtime.
 *
 * Usage:
 *   node scripts/fetch-deezer-ids.mjs
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
  const url = `https://api.deezer.com/search?q=${query}&limit=5`;

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
    deezerId: best.id,
    title: best.title,
    artist: best.artist?.name,
    hasPreview: !!(best.preview && best.preview !== ''),
  };
}

async function main() {
  console.log('\n🎵 Deezer Track ID Fetcher\n');

  const questions = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));

  let found = 0;
  let notFound = 0;
  let alreadyHad = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    if (q.deezerId) {
      alreadyHad++;
      continue;
    }

    process.stdout.write(`[${i + 1}/${questions.length}] "${q.songTitle}" - ${q.artist}... `);

    try {
      const result = await searchDeezer(q.songTitle, q.artist);

      if (result && result.hasPreview) {
        q.deezerId = result.deezerId;
        console.log(`✅ ID:${result.deezerId} (${result.title} - ${result.artist})`);
        found++;
      } else if (result) {
        console.log(`⚠️  Found but no preview (${result.title})`);
        notFound++;
      } else {
        console.log(`❌ Not found`);
        notFound++;
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
      notFound++;
    }

    await sleep(150);
  }

  // Remove old expired previewUrl fields
  let removedUrls = 0;
  questions.forEach((q) => {
    if (q.previewUrl) {
      delete q.previewUrl;
      removedUrls++;
    }
  });

  fs.writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2) + '\n');

  console.log('\n' + '═'.repeat(50));
  console.log(`✅ Deezer IDs found:       ${found}`);
  console.log(`❌ Not found/no preview:    ${notFound}`);
  console.log(`⏭️  Already had ID:          ${alreadyHad}`);
  console.log(`🗑️  Removed expired URLs:    ${removedUrls}`);
  console.log(`📁 Saved to: ${QUESTIONS_PATH}`);
  console.log('═'.repeat(50) + '\n');
}

main().catch((err) => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
