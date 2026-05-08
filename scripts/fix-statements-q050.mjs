#!/usr/bin/env node
// Make statements self-contained: every statement should be readable
// in isolation without needing context from another statement.
// Pattern fix: replace bare "פיטרס" with "הכותבת גרצ'ן פיטרס" on first/only mention,
// and clarify pronouns/references like "מזה", "הסוף הטראגי" with explicit context.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const fixed = {
  q050: {
    trueStatements: [
      { text_he: `הכותבת גרצ'ן פיטרס כתבה את השיר מנקודת מבט של ילדה בת 8`, difficulty: 'medium' },
      { text_he: `הכותבת גרצ'ן פיטרס סיפרה שניסתה למצוא לסיפור סוף חלופי, אך בסופו של דבר בחרה בסוף הטראגי שבו האם מציתה את הבית`, difficulty: 'hard' },
      { text_he: `השיר נחשב לאבן דרך במודעות לאלימות במשפחה`, difficulty: 'easy' },
      { text_he: `הכותבת גרצ'ן פיטרס הביעה אי-נוחות מכך שהשיר משמש לעיתים בהקשרים פטריוטיים`, difficulty: 'medium' },
      { text_he: `גרצ'ן פיטרס הצהירה על השיר: "הוא על הישרדות וחירות מהתעללות, לא על המנון לאומי"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הכותבת גרצ'ן פיטרס כתבה את השיר מנקודת מבט של אישה בוגרת שנמלטה מאלימות`, difficulty: 'medium' },
      { text_he: `הכותבת גרצ'ן פיטרס בחרה לשיר סוף שמח שבו האם והבת בורחות ומתחילות חיים חדשים`, difficulty: 'hard' },
      { text_he: `הכותבת גרצ'ן פיטרס דווקא עודדה את השימוש בשיר בהקשרים פטריוטיים בארה"ב`, difficulty: 'medium' },
      { text_he: `גרצ'ן פיטרס תיארה את השיר כ"המנון פטריוטי כן" שמתאים ליום העצמאות`, difficulty: 'hard' },
    ],
  },
};

const raw = readFileSync(QUESTIONS_PATH, 'utf8');
const questions = JSON.parse(raw);
let touched = 0;
for (const q of questions) {
  const data = fixed[q.id];
  if (!data) continue;
  q.trueStatements = data.trueStatements;
  q.falseStatements = data.falseStatements;
  touched++;
}
writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2) + '\n');
console.log(`Fixed ${touched} questions.`);
