#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const TODAY = '2026-05-01';

const audits = {
  q001: {
    verified: true,
    sources: [
      {
        url: 'https://en.wikipedia.org/wiki/Jeremy_(song)',
        title: 'Jeremy (song) — Wikipedia',
        type: 'wikipedia',
        accessed: TODAY,
      },
      {
        url: 'https://www.songfacts.com/facts/pearl-jam/jeremy',
        title: 'Jeremy by Pearl Jam — Songfacts',
        type: 'songfacts',
        accessed: TODAY,
      },
    ],
    extendedInfo_he:
      'הקליפ של מארק פלינגטון זכה ב-4 פרסי MTV VMA ב-1993 (כולל סרטון השנה), אבל MTV צנזרה את רגע הירייה — מה שגרם לרבים לחשוב בטעות שמדובר בירי בכיתה ולא בהתאבדות. אחרי הטבח בקולומביין (1999) MTV ו-VH1 הפסיקו כמעט לגמרי לשדר את הקליפ. למרות הנושא הקשה, פרל ג\'אם ממשיכים לבצע את השיר בהופעות עד היום.',
  },
  q002: {
    verified: true,
    sources: [
      {
        url: 'https://en.wikipedia.org/wiki/Pumped_Up_Kicks',
        title: 'Pumped Up Kicks — Wikipedia',
        type: 'wikipedia',
        accessed: TODAY,
      },
      {
        url: 'https://www.songfacts.com/facts/foster-the-people/pumped-up-kicks',
        title: 'Pumped Up Kicks by Foster the People — Songfacts',
        type: 'songfacts',
        accessed: TODAY,
      },
    ],
    extendedInfo_he:
      'מארק פוסטר הקליט את השיר ב-2009 כדמו מהיר בחדר השינה שלו ב-Logic Pro, כשעבד אז ככותב ג\'ינגלים לפרסומות — הדמו הגולמי הוא הגרסה ששוחררה. אחרי הטבח בבית הספר היסודי סנדי הוק (דצמבר 2012) רבות מתחנות הרדיו הסירו את השיר משידור. השיר הגיע למקום 3 במצעד הבילבורד והפך לאחד הלהיטים הדיגיטליים הנמכרים ביותר ב-2011 (כ-3.84 מיליון עותקים בארה"ב).',
  },
  q003: {
    verified: true,
    sources: [
      {
        url: 'https://en.wikipedia.org/wiki/Every_Breath_You_Take',
        title: 'Every Breath You Take — Wikipedia',
        type: 'wikipedia',
        accessed: TODAY,
      },
      {
        url: 'https://www.songfacts.com/facts/the-police/every-breath-you-take',
        title: 'Every Breath You Take by The Police — Songfacts',
        type: 'songfacts',
        accessed: TODAY,
      },
    ],
    extendedInfo_he:
      'סטינג כתב את השיר באחוזת גולדן-איי של איאן פלמינג בג\'מייקה, בתקופה של גירושים מאשתו הראשונה ומתחים פנימיים שכמעט פירקו את הפוליס. בראיון ב-1983 הוא הגדיר אותו "שיר קטן ומרושע, די מרושע באמת — על קנאה, מעקב ובעלות". השיר זכה בשני פרסי גראמי (כולל שיר השנה 1984), ו-Puff Daddy & Faith Evans דגמו אותו ב-1997 ב-"I\'ll Be Missing You" שעמד 11 שבועות במקום הראשון בבילבורד. עד היום הוא מספק לסטינג בין רבע לשליש מהכנסותיו מתמלוגים.',
  },
  q004: {
    verified: true,
    explanation_he:
      "השיר 'Hotel California' של Eagles משתמש במטאפורה של מלון אלגנטי שאי אפשר לברוח ממנו כדי לתאר את הצד האפל של החלום האמריקאי — עודפות, נרקיסיזם וחיי הזוהר של לוס אנג'לס בשנות ה-70. דון הנלי אמר שהשיר הוא 'מסע מתמימות לנסיון' ועוסק 'בצד התחתון של החלום האמריקאי'. המשפט 'אתה יכול לעשות צ'ק-אאוט מתי שתרצה, אבל לעולם לא תוכל לעזוב' מסמל את חוסר היכולת להיחלץ מאורח החיים הזה — הלהקה במפורש הכחישה שמדובר בשיר על התמכרות לסמים.",
    sources: [
      {
        url: 'https://en.wikipedia.org/wiki/Hotel_California',
        title: 'Hotel California — Wikipedia',
        type: 'wikipedia',
        accessed: TODAY,
      },
      {
        url: 'https://www.songfacts.com/facts/eagles/hotel-california',
        title: 'Hotel California by Eagles — Songfacts',
        type: 'songfacts',
        accessed: TODAY,
      },
    ],
    extendedInfo_he:
      'דון פלדר יצר את הדמו האינסטרומנטלי בבית חוף במאליבו על מכונת תופים וגיטרת 12-מיתרים, בהשפעות של רגאיי ולטינו. דון הנלי וגלן פריי כתבו את המילים סביב המוזיקה. סולו הגיתרה המפורסם מבוצע על ידי ג\'ו וולש ופלדר במקביל, ולקח כשלושה ימים להקליט. לגבי המילה "colitas" — פלדר הסביר שמדובר בצמח שפורח בלילה במדבר, אבל בסלנג מקסיקני זו גם מילה לפרחי קנאביס, מה שתורם לאמביגואליות המכוונת של השיר.',
  },
  q005: {
    verified: true,
    sources: [
      {
        url: 'https://en.wikipedia.org/wiki/Born_in_the_U.S.A._(song)',
        title: 'Born in the U.S.A. (song) — Wikipedia',
        type: 'wikipedia',
        accessed: TODAY,
      },
      {
        url: 'https://www.songfacts.com/facts/bruce-springsteen/born-in-the-usa',
        title: 'Born in the U.S.A. by Bruce Springsteen — Songfacts',
        type: 'songfacts',
        accessed: TODAY,
      },
    ],
    extendedInfo_he:
      'במקור השיר נכתב כדמו אקוסטי עגום במהלך מושבי ההקלטות לאלבום Nebraska (1982), אך המפיק ג\'ון לאנדאו חשב שהמלודיה לא מתאימה לשם — אז הוא נדחה ועובד מחדש עם להקת E-Street. האלבום שיצא ב-1984 הפך להיט עצום עם 7 שירים בעשיריה הראשונה. ההמשכיות של אי-ההבנה לא נעצרה ברייגן — באוקטובר 2020 השיר הושמע בעצרות של דונלד טראמפ, ספרינגסטין הגיב בקריאה לטראמפ "נרקיסיסט רעיל" ו"איום על הדמוקרטיה".',
  },
};

const raw = readFileSync(QUESTIONS_PATH, 'utf8');
const questions = JSON.parse(raw);

let touched = 0;
const changes = [];
for (const q of questions) {
  const audit = audits[q.id];
  if (!audit) continue;
  q.sources = audit.sources;
  q.verified = audit.verified;
  if (audit.extendedInfo_he) q.extendedInfo_he = audit.extendedInfo_he;
  if (audit.explanation_he && audit.explanation_he !== q.explanation_he) {
    changes.push(`[${q.id}] explanation_he was revised`);
    q.explanation_he = audit.explanation_he;
  }
  touched++;
}

writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2) + '\n');
console.log(`Updated ${touched} questions.`);
if (changes.length) {
  console.log('\nContent changes:');
  changes.forEach((n) => console.log('  ' + n));
}
