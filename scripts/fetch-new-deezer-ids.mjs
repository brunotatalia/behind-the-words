// Fetch Deezer IDs for the 100 new international questions (q300-q399)
// and update questions.json with the results
import { readFileSync, writeFileSync } from 'fs';

const questionsPath = decodeURIComponent(new URL('../src/data/questions.json', import.meta.url).pathname);

const delay = ms => new Promise(r => setTimeout(r, ms));

async function search(title, artist) {
  // Clean artist name for search
  const cleanArtist = artist.replace(/\s*ft\.?\s*/gi, ' ').replace(/\s*&\s*/g, ' ');
  const q = encodeURIComponent(`${title} ${cleanArtist}`.trim());
  try {
    const res = await fetch(`https://api.deezer.com/search?q=${q}&limit=5`);
    const data = await res.json();
    // Prefer track with preview available
    const withPreview = data.data?.find(t => t.preview);
    const track = withPreview || data.data?.[0];
    return {
      deezerId: track?.id ?? null,
      deezerTitle: track?.title ?? null,
      deezerArtist: track?.artist?.name ?? null,
      hasPreview: !!(track?.preview),
    };
  } catch (e) {
    return { deezerId: null, error: e.message };
  }
}

// Load questions
const questions = JSON.parse(readFileSync(questionsPath, 'utf-8'));
const newQuestions = questions.filter(q => {
  const num = parseInt(q.id.replace('q', ''));
  return num >= 300 && num <= 399;
});

console.log(`Found ${newQuestions.length} new questions to fetch Deezer IDs for\n`);

let found = 0;
let notFound = 0;
let noPreview = 0;

for (const q of newQuestions) {
  const result = await search(q.songTitle, q.artist);

  if (result.deezerId) {
    q.deezerId = result.deezerId;
    found++;
    const status = result.hasPreview ? '✓' : '⚠';
    if (!result.hasPreview) noPreview++;
    console.log(`${status} ${q.id}: "${q.songTitle}" - ${q.artist} => ${result.deezerId} (${result.deezerTitle} by ${result.deezerArtist})${!result.hasPreview ? ' [NO PREVIEW]' : ''}`);
  } else {
    notFound++;
    console.log(`✗ ${q.id}: "${q.songTitle}" - ${q.artist} => NOT FOUND`);
  }

  await delay(200);
}

console.log(`\n--- Results ---`);
console.log(`Found: ${found}`);
console.log(`Not found: ${notFound}`);
console.log(`No preview: ${noPreview}`);

// Save updated questions
writeFileSync(questionsPath, JSON.stringify(questions, null, 2) + '\n');
console.log(`\nUpdated questions.json with Deezer IDs`);
