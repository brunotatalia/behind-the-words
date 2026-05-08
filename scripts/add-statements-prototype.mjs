#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const statements = {
  q001: {
    trueStatements: [
      { text_he: `השיר שמתנגן כעת מבוסס על מקרה אמיתי שדווח בעיתון Dallas Morning News`, difficulty: 'easy' },
      { text_he: `הקליפ של השיר זכה ב-4 פרסי MTV VMA ב-1993, כולל פרס סרטון השנה`, difficulty: 'medium' },
      { text_he: `אחרי הטבח בקולומביין ב-1999, MTV ו-VH1 הפחיתו דרסטית את שידור הקליפ`, difficulty: 'hard' },
      { text_he: `הילד שעליו נכתב השיר היה בן 15 וירה בעצמו מול הכיתה בטקסס`, difficulty: 'easy' },
      { text_he: `אדי ודר כתב את המילים וג'ף אמנט הלחין את המוזיקה`, difficulty: 'hard' },
      { text_he: `הקליפ במאי על ידי מארק פלינגטון`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `האירוע האמיתי שעליו מבוסס השיר התרחש בקולומביין, קולורדו`, difficulty: 'medium' },
      { text_he: `אדי ודר הכיר אישית את הילד שירה בעצמו מתקופת בית הספר המשותפת שלהם`, difficulty: 'easy' },
      { text_he: `הקליפ של השיר נאסר רשמית ובאופן מוחלט משידור ב-MTV`, difficulty: 'hard' },
      { text_he: `השיר נכתב בעקבות שיחה אישית של אדי ודר עם אם הילד שירה בעצמו`, difficulty: 'medium' },
    ],
  },
  q002: {
    trueStatements: [
      { text_he: `מארק פוסטר הקליט את השיר כדמו מהיר ב-Logic Pro מחדר השינה שלו`, difficulty: 'medium' },
      { text_he: `השיר הוסר מתחנות רדיו רבות בעקבות הטבח בסנדי הוק בדצמבר 2012`, difficulty: 'medium' },
      { text_he: `שם השיר מתייחס לנעלי Reebok Pumps שילדים עשירים נעלו`, difficulty: 'easy' },
      { text_he: `המילים נכתבו מנקודת מבט של נער מתבגר עם מחשבות אובדניות-אלימות`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 3 בבילבורד הוט 100 ועמד שם 8 שבועות רצוף`, difficulty: 'hard' },
      { text_he: `הדמו הגולמי של פוסטר הוא הגרסה ששוחררה לאחר מכן בלי שיפוצים`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר הוקלט באולפן מקצועי בלוס אנג'לס עם תזמורת מלאה`, difficulty: 'medium' },
      { text_he: `המילים מסופרות מנקודת מבטו של תלמיד שניצל מאירוע אלימות`, difficulty: 'easy' },
      { text_he: `שם השיר מתייחס לנעלי הריצה של הקורבן`, difficulty: 'easy' },
      { text_he: `אחרי הטבח בסנדי הוק, השיר דווקא קיבל יותר נגן ברדיו כסמל אנטי-אלימות`, difficulty: 'hard' },
    ],
  },
  q003: {
    trueStatements: [
      { text_he: `סטינג כתב את השיר באחוזת גולדן-איי של איאן פלמינג בג'מייקה`, difficulty: 'hard' },
      { text_he: `סטינג עצמו תיאר את השיר כ"שיר קטן ומרושע — על קנאה, מעקב ובעלות"`, difficulty: 'easy' },
      { text_he: `השיר זכה בגראמי לשיר השנה ב-1984`, difficulty: 'medium' },
      { text_he: `Puff Daddy & Faith Evans דגמו את השיר ב-1997 ב-"I'll Be Missing You"`, difficulty: 'easy' },
      { text_he: `השיר מספק לסטינג בין רבע לשליש מהכנסותיו השנתיות מתמלוגים`, difficulty: 'hard' },
      { text_he: `סטינג כתב אותו בתקופה של גירושים מאשתו הראשונה ופירוק הלהקה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `סטינג כתב את השיר כשיר אהבה כן ורומנטי לאשתו`, difficulty: 'easy' },
      { text_he: `השיר הוקלט באולפן Abbey Road בלונדון`, difficulty: 'medium' },
      { text_he: `השיר זכה בגראמי לאלבום השנה ב-1984`, difficulty: 'medium' },
      { text_he: `סטינג כתב אותו באמצע סיבוב הופעות בארה"ב`, difficulty: 'hard' },
    ],
  },
};

const raw = readFileSync(QUESTIONS_PATH, 'utf8');
const questions = JSON.parse(raw);

let touched = 0;
for (const q of questions) {
  const data = statements[q.id];
  if (!data) continue;
  q.trueStatements = data.trueStatements;
  q.falseStatements = data.falseStatements;
  touched++;
}

writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2) + '\n');
console.log(`Added statements to ${touched} questions.`);
