/**
 * Fetch iTunes/Apple Music 30-second preview URLs for songs missing from Deezer.
 * iTunes API is free, no key needed, and has great Israeli music coverage.
 * iTunes preview URLs don't expire.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = path.join(__dirname, '../src/data/questions.json');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchItunes(songTitle, artist) {
  const query = encodeURIComponent(`${songTitle} ${artist}`);
  const url = `https://itunes.apple.com/search?term=${query}&media=music&limit=5&country=IL`;

  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 429) {
      console.log(`  ⏳ Rate limited, waiting 10s...`);
      await sleep(10000);
      return searchItunes(songTitle, artist);
    }
    return null;
  }

  const data = await res.json();
  const tracks = data.results || [];

  // Find track with preview
  const withPreview = tracks.find(t => t.previewUrl);
  return withPreview ? {
    previewUrl: withPreview.previewUrl,
    title: withPreview.trackName,
    artist: withPreview.artistName,
  } : null;
}

async function main() {
  console.log('\n🍎 iTunes Preview Fetcher for Missing Songs\n');

  const questions = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));
  const missing = questions.filter(q => !q.deezerId && !q.itunesPreviewUrl);
  console.log(`Missing from Deezer: ${missing.length} songs\n`);

  let found = 0;
  let notFound = 0;

  for (const q of missing) {
    process.stdout.write(`"${q.songTitle}" - ${q.artist}... `);

    try {
      // Try with both title + artist
      let result = await searchItunes(q.songTitle, q.artist);
      await sleep(200);

      // Fallback: just title
      if (!result) {
        result = await searchItunes(q.songTitle, '');
        await sleep(200);
      }

      if (result) {
        q.itunesPreviewUrl = result.previewUrl;
        console.log(`✅ ${result.title} - ${result.artist}`);
        found++;
      } else {
        console.log(`❌ Not found`);
        notFound++;
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
      notFound++;
    }
  }

  fs.writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2) + '\n');

  const totalCovered = questions.filter(q => q.deezerId || q.itunesPreviewUrl).length;
  console.log('\n' + '═'.repeat(50));
  console.log(`✅ Found on iTunes:  ${found}`);
  console.log(`❌ Not found:        ${notFound}`);
  console.log(`📊 Total coverage:   ${totalCovered}/${questions.length}`);
  console.log('═'.repeat(50) + '\n');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
