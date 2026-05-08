#!/usr/bin/env node
// Statements MUST be derived from explanation_he or extendedInfo_he.
// True statements: direct facts from the text.
// False statements: plausible TWISTS of those facts (different number/place/event/person).
// When the player reads the explanation after answering, the link must be obvious.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const statements = {
  // q001 Jeremy / Pearl Jam
  // Source facts:
  //   explanation: ילד בן 15, ירה בעצמו בכיתתו בטקסס ב-1991, אדי ודר כתב כתגובה
  //                על התעלמות מבוגרים מסימני אזהרה
  //   extended:    מארק פלינגטון ביים, 4 פרסי VMA 1993 (כולל סרטון השנה), MTV
  //                צנזרה את רגע הירייה, אחרי קולומביין (1999) MTV+VH1 הפחיתו
  //                כמעט לגמרי שידור, פרל ג'אם ממשיכים לבצע עד היום
  q001: {
    trueStatements: [
      { text_he: `המקרה האמיתי שעליו מבוסס השיר התרחש בטקסס ב-1991`, difficulty: 'easy' },
      { text_he: `הילד שעליו השיר היה בן 15 כשירה בעצמו מול הכיתה`, difficulty: 'easy' },
      { text_he: `הקליפ זכה ב-4 פרסי MTV VMA ב-1993, כולל פרס סרטון השנה`, difficulty: 'medium' },
      { text_he: `MTV צנזרה את רגע הירייה בקליפ`, difficulty: 'medium' },
      { text_he: `אחרי הטבח בקולומביין ב-1999, MTV ו-VH1 כמעט הפסיקו לגמרי לשדר את הקליפ`, difficulty: 'hard' },
      { text_he: `אדי ודר כתב את השיר כתגובה על התעלמות מבוגרים מסימני אזהרה אצל בני נוער`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `המקרה האמיתי שעליו מבוסס השיר התרחש בקליפורניה ב-1991`, difficulty: 'easy' }, // טוויסט: טקסס → קליפורניה
      { text_he: `הילד שעליו השיר היה בן 17 כשירה בעצמו מול הכיתה`, difficulty: 'easy' }, // טוויסט: 15 → 17
      { text_he: `הקליפ זכה ב-2 פרסי MTV VMA בלבד ב-1993`, difficulty: 'medium' }, // טוויסט: 4 → 2
      { text_he: `MTV הוסיפה את רגע הירייה לקליפ למרות התנגדות הלהקה`, difficulty: 'hard' }, // טוויסט הפוך: צנזרה → הוסיפה
      { text_he: `פרל ג'אם הפסיקו לבצע את השיר בהופעות אחרי 1999`, difficulty: 'medium' }, // טוויסט הפוך: ממשיכים → הפסיקו
    ],
  },

  // q002 Pumped Up Kicks / Foster the People
  // Source facts:
  //   explanation: קצב קליט מסתיר תוכן אפל; "Kicks" = נעלי Reebok Pumps של ילדים
  //                עשירים; מארק פוסטר כתב מנקודת מבט של נער מתוסכל
  //   extended:    הקליט ב-2009 כדמו מהיר ב-Logic Pro בחדר השינה שלו, עבד אז
  //                ככותב ג'ינגלים לפרסומות; הדמו הגולמי הוא הגרסה ששוחררה;
  //                אחרי טבח סנדי הוק (דצמבר 2012) תחנות רדיו רבות הסירו את
  //                השיר; הגיע למקום 3 בבילבורד; כ-3.84 מיליון עותקים נמכרו
  //                בארה"ב ב-2011
  q002: {
    trueStatements: [
      { text_he: `מארק פוסטר הקליט את השיר ב-Logic Pro בחדר השינה שלו`, difficulty: 'easy' },
      { text_he: `פוסטר עבד ככותב ג'ינגלים לפרסומות בתקופה שכתב את השיר`, difficulty: 'medium' },
      { text_he: `אחרי הטבח בבית הספר היסודי סנדי הוק (דצמבר 2012) תחנות רדיו רבות הסירו את השיר`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 3 במצעד הבילבורד הוט 100`, difficulty: 'hard' },
      { text_he: `הדמו הגולמי שפוסטר הקליט הוא הגרסה ששוחררה לציבור — בלי שיפוצים באולפן`, difficulty: 'hard' },
      { text_he: `שם השיר מתייחס לנעלי Reebok Pumps של ילדים עשירים`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `מארק פוסטר הקליט את השיר באולפן מקצועי במנהטן`, difficulty: 'easy' }, // טוויסט: חדר שינה
      { text_he: `פוסטר עבד ככותב פסקולים לסרטי הוליווד בתקופת השיר`, difficulty: 'medium' }, // טוויסט: ג'ינגלים → פסקולים
      { text_he: `אחרי הטבח באוניברסיטת וירג'יניה טק ב-2007 תחנות רדיו הסירו את השיר`, difficulty: 'medium' }, // טוויסט: סנדי הוק → וירג'יניה טק
      { text_he: `השיר הגיע למקום 1 במצעד הבילבורד הוט 100`, difficulty: 'hard' }, // טוויסט: 3 → 1
      { text_he: `שם השיר מתייחס לנעלי הריצה של הקורבן בשיר`, difficulty: 'easy' }, // טוויסט: Pumps של עשירים → נעלי קורבן
    ],
  },

  // q003 Every Breath You Take / The Police
  // Source facts:
  //   explanation: סטינג כתב על מעקב ואובססיה (לא אהבה); המילים מתארות שליטה
  //                מפחידה; מושמע לעיתים בחתונות באירוניה
  //   extended:    סטינג כתב באחוזת גולדן-איי של איאן פלמינג בג'מייקה; תקופת
  //                גירושים מאשתו הראשונה ופירוקות הפוליס; ב-1983 ב-NME הגדיר
  //                "שיר קטן ומרושע - על קנאה, מעקב ובעלות"; זכה ב-2 גראמיים
  //                (כולל שיר השנה 1984); Puff Daddy & Faith Evans דגמו ב-1997
  //                ב-"I'll Be Missing You" שעמד 11 שבועות במקום 1 בבילבורד;
  //                מספק לסטינג בין רבע לשליש מההכנסות מתמלוגים
  q003: {
    trueStatements: [
      { text_he: `סטינג כתב את השיר באחוזת גולדן-איי של איאן פלמינג בג'מייקה`, difficulty: 'hard' },
      { text_he: `סטינג עצמו הגדיר את השיר כ"שיר קטן ומרושע — על קנאה, מעקב ובעלות"`, difficulty: 'easy' },
      { text_he: `השיר זכה בגראמי לשיר השנה ב-1984`, difficulty: 'medium' },
      { text_he: `Puff Daddy ו-Faith Evans דגמו את השיר ב-1997 ב-"I'll Be Missing You"`, difficulty: 'easy' },
      { text_he: `סטינג כתב את השיר בתקופה של גירושים מאשתו הראשונה ופירוק הפוליס`, difficulty: 'medium' },
      { text_he: `השיר מספק לסטינג בין רבע לשליש מהכנסותיו השנתיות מתמלוגים`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `סטינג כתב את השיר בבית הקיץ של ג'ון לנון באיביזה`, difficulty: 'hard' }, // טוויסט: גולדן-איי → איביזה
      { text_he: `סטינג הגדיר את השיר כ"שיר אהבה אמיתי — על נאמנות והתמסרות"`, difficulty: 'easy' }, // טוויסט הפוך
      { text_he: `השיר זכה בגראמי לאלבום השנה ב-1984`, difficulty: 'medium' }, // טוויסט: שיר השנה → אלבום השנה
      { text_he: `R. Kelly דגם את השיר ב-1995 ב-"I Believe I Can Fly"`, difficulty: 'medium' }, // טוויסט: Puff Daddy → R. Kelly
      { text_he: `סטינג כתב את השיר בתקופת אהבה חדשה אחרי ההצלחה הראשונה של הפוליס`, difficulty: 'medium' }, // טוויסט הפוך
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
console.log(`Updated statements for ${touched} questions.`);
