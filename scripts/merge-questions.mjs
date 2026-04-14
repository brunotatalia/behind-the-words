import { readFileSync, writeFileSync } from 'fs';

const files = [
  '/private/tmp/claude-501/-Users-yossi-Desktop-SONG-GAME/7192ea54-ee9b-427b-8619-da0a01932042/tasks/a9e14b2810193a698.output',
  '/private/tmp/claude-501/-Users-yossi-Desktop-SONG-GAME/7192ea54-ee9b-427b-8619-da0a01932042/tasks/af8203119d682034a.output',
  '/private/tmp/claude-501/-Users-yossi-Desktop-SONG-GAME/7192ea54-ee9b-427b-8619-da0a01932042/tasks/a22e5a4a5ff7261fa.output',
];

let allNewQuestions = [];

for (const file of files) {
  const raw = readFileSync(file, 'utf-8');
  const match = raw.match(/\[[\s\S]*\]/);
  if (!match) { console.error('No JSON array found in', file); continue; }
  try {
    const questions = JSON.parse(match[0]);
    console.log(`Parsed ${questions.length} questions from ${file.split('/').pop()}`);
    allNewQuestions.push(...questions);
  } catch (e) { console.error('JSON parse error in', file, e.message); }
}

console.log(`Total new questions: ${allNewQuestions.length}`);

function fixEntities(obj) {
  if (typeof obj === 'string') return obj.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  if (Array.isArray(obj)) return obj.map(fixEntities);
  if (obj && typeof obj === 'object') { const r = {}; for (const [k,v] of Object.entries(obj)) r[k] = fixEntities(v); return r; }
  return obj;
}
allNewQuestions = allNewQuestions.map(fixEntities);

const validCats = ['tone-disconnect','misunderstood-romance','historical-political','drug-references','biographical','translation-barriers'];
const validDiffs = ['easy','medium','hard'];
const ids = new Set();
let errors = 0;
for (const q of allNewQuestions) {
  if (!q.id || ids.has(q.id)) { console.error(`Dup/missing ID: ${q.id}`); errors++; }
  ids.add(q.id);
  if (!validCats.includes(q.category)) { console.error(`Bad category ${q.id}: ${q.category}`); errors++; }
  if (!validDiffs.includes(q.difficulty)) { console.error(`Bad difficulty ${q.id}: ${q.difficulty}`); errors++; }
  if (!q.options || q.options.length !== 4) { console.error(`Bad options ${q.id}`); errors++; }
  if (!['a','b','c','d'].includes(q.correctAnswer)) { console.error(`Bad answer ${q.id}: ${q.correctAnswer}`); errors++; }
}
console.log(`Validation errors: ${errors}`);

allNewQuestions.sort((a, b) => parseInt(a.id.replace('q','')) - parseInt(b.id.replace('q','')));

const catCount = {}, diffCount = {}, langTags = {};
for (const q of allNewQuestions) {
  catCount[q.category] = (catCount[q.category] || 0) + 1;
  diffCount[q.difficulty] = (diffCount[q.difficulty] || 0) + 1;
  for (const tag of (q.tags || [])) {
    if (['spanish','french','arabic','italian','korean','greek','german','portuguese','japanese','romanian','hindi'].includes(tag))
      langTags[tag] = (langTags[tag] || 0) + 1;
  }
}
console.log('Categories:', JSON.stringify(catCount));
console.log('Difficulty:', JSON.stringify(diffCount));
console.log('Languages:', JSON.stringify(langTags));

const existingPath = '/Users/yossi/Desktop/SONG GAME/behind-the-lyrics/src/data/questions.json';
const existing = JSON.parse(readFileSync(existingPath, 'utf-8'));
console.log(`Existing: ${existing.length}`);

const existingSongs = new Set(existing.map(q => `${q.songTitle}|${q.artist}`.toLowerCase()));
const dupes = allNewQuestions.filter(q => existingSongs.has(`${q.songTitle}|${q.artist}`.toLowerCase()));
if (dupes.length > 0) { console.log('Duplicates:'); dupes.forEach(d => console.log(`  ${d.id}: ${d.songTitle} - ${d.artist}`)); }

const merged = [...existing, ...allNewQuestions];
writeFileSync(existingPath, JSON.stringify(merged, null, 2) + '\n', 'utf-8');
console.log(`Wrote ${merged.length} total questions`);
