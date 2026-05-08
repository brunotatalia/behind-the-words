#!/usr/bin/env node
// Self-contained statements pass — batch 2: q031-q060 (skipping q050 already done)
// Rule: every statement must be readable in isolation. Player sees only
// the song header (title + artist + year) plus this single statement.
// Fixes:
//   - Bare last names → full name + role on every appearance
//   - Implicit "the band" / "the album" → explicit name
//   - Pronouns "him/her/them/this" → named referent
//   - Vague references like "the curse" → expanded
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const fixed = {
  q031: { // Wake Me Up When September Ends / Green Day
    trueStatements: [
      { text_he: `אביו של בילי ג'ו ארמסטרונג, סולן Green Day, נפטר מסרטן ב-1 בספטמבר 1982`, difficulty: 'easy' },
      { text_he: `בילי ג'ו ארמסטרונג, סולן Green Day, היה בן 10 כשאביו נפטר מסרטן`, difficulty: 'easy' },
      { text_he: `ביום הלוויה של אביו, בילי ג'ו ארמסטרונג ברח לחדרו ואמר לאמו "תעירי אותי כשספטמבר ייגמר"`, difficulty: 'medium' },
      { text_he: `במשך שנים סירב בילי ג'ו ארמסטרונג, סולן Green Day, לכתוב על מות אביו, וכתב את השיר רק ב-2004 לאלבום American Idiot`, difficulty: 'medium' },
      { text_he: `השיר זוכה לעיתים לפרשנויות חלופיות, כולל הצמדה לפיגועי 11 בספטמבר 2001`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `אביו של בילי ג'ו ארמסטרונג, סולן Green Day, נפטר מסרטן ב-1 באוקטובר 1982`, difficulty: 'easy' },
      { text_he: `בילי ג'ו ארמסטרונג, סולן Green Day, היה בן 7 כשאביו נפטר מסרטן`, difficulty: 'easy' },
      { text_he: `בילי ג'ו ארמסטרונג כתב את השיר לאלבום Dookie של Green Day מ-1994`, difficulty: 'medium' },
      { text_he: `הפרשנות העיקרית של השיר היא ביקורת על מערכת הבריאות האמריקאית`, difficulty: 'hard' },
    ],
  },
  q032: { // Lose Yourself / Eminem
    trueStatements: [
      { text_he: `אמינם כתב את השיר בדמות B-Rabbit, הדמות שגילם בסרט 8 Mile (2002)`, difficulty: 'easy' },
      { text_he: `אמינם היה הראפר הראשון בהיסטוריה שזכה באוסקר על שיר מקורי, על השיר הזה`, difficulty: 'medium' },
      { text_he: `אמינם לא הגיע לטקס פרסי האוסקר שבו זכה השיר`, difficulty: 'medium' },
      { text_he: `לואיס רסטו, שותפו להפקה של אמינם, קיבל את פרס האוסקר במקום אמינם`, difficulty: 'hard' },
      { text_he: `השיר עמד 12 שבועות במקום 1 בבילבורד — שיא לכל שיר זוכה אוסקר בכל הזמנים`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `אמינם כתב את השיר על עצמו, ולא בדמות הסרט 8 Mile`, difficulty: 'easy' },
      { text_he: `אמינם היה הראפר הראשון שזכה בגראמי לאלבום השנה, על אלבום שכלל את השיר`, difficulty: 'medium' },
      { text_he: `אמינם נשא נאום מרגש בטקס פרסי האוסקר על זכייתו בשיר`, difficulty: 'medium' },
      { text_he: `השיר עמד 4 שבועות בלבד במקום 1 בבילבורד`, difficulty: 'hard' },
    ],
  },
  q033: { // Imagine / John Lennon
    trueStatements: [
      { text_he: `ג'ון לנון אמר על Imagine: "כמעט כמו המניפסט הקומוניסטי, אם כי אני לא ממש קומוניסט"`, difficulty: 'easy' },
      { text_he: `הרעיון של "imagine" הגיע לג'ון לנון מספר השירה Grapefruit (1964) שכתבה אשתו יוקו אונו`, difficulty: 'hard' },
      { text_he: `יוקו אונו, אשתו של ג'ון לנון, קיבלה קרדיט רשמי על שותפות בכתיבת השיר רק ב-2017`, difficulty: 'medium' },
      { text_he: `ג'ון לנון הודה ב-1980 שהיה "מקומשן ושוביניסטי קצת" כשלא נתן ליוקו אונו קרדיט בכתיבה`, difficulty: 'medium' },
      { text_he: `השיר נכתב כשנתיים אחרי מחאת Bed-In for Peace של ג'ון לנון ויוקו אונו (1969)`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `ג'ון לנון אמר ש-Imagine הוא "מניפסט מובהק של דמוקרטיה ליברלית"`, difficulty: 'easy' },
      { text_he: `הרעיון לשיר הגיע לג'ון לנון אחרי שיוקו אונו קראה את הספר "1984" של ג'ורג' אורוול`, difficulty: 'hard' },
      { text_he: `יוקו אונו קיבלה קרדיט רשמי בשחרור המקורי של השיר ב-1971`, difficulty: 'medium' },
      { text_he: `השיר נכתב חמש שנים אחרי מחאת Bed-In for Peace של ג'ון לנון ויוקו אונו`, difficulty: 'medium' },
    ],
  },
  q034: { // What's Going On / Marvin Gaye
    trueStatements: [
      { text_he: `הרעיון המקורי לשיר הגיע מ-Renaldo "Obie" Benson, חבר להקת Four Tops`, difficulty: 'medium' },
      { text_he: `Obie Benson, יוצר השיר המקורי, היה עד לאלימות משטרתית במחאת People's Park בברקלי ב-1969`, difficulty: 'hard' },
      { text_he: `פרנקי גיי, אחיו של מרווין גיי, חזר משירות של 3 שנים בווייטנאם והשפיע על תוכן השיר`, difficulty: 'medium' },
      { text_he: `השיר הושפע גם ממהומות ווטס ב-1965`, difficulty: 'medium' },
      { text_he: `ברי גורדי, מנכ"ל מוטאון ובעל החברה, תיאר את השיר כ"הדבר הגרוע ביותר ששמעתי בחיי"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הרעיון המקורי לשיר הגיע מסטיבי וונדר`, difficulty: 'medium' },
      { text_he: `Obie Benson, יוצר השיר, היה עד למחאות אנטי-וייטנאם בלוס אנג'לס`, difficulty: 'hard' },
      { text_he: `פרנקי גיי, אחיו של מרווין גיי, שירת רק שנה אחת בווייטנאם`, difficulty: 'medium' },
      { text_he: `ברי גורדי, מנכ"ל מוטאון, תיאר את השיר מיד כ"יצירת מופת"`, difficulty: 'easy' },
    ],
  },
  q035: { // Fast Car / Tracy Chapman
    trueStatements: [
      { text_he: `טרייסי צ'פמן הסבירה: "זה לא ממש על מכונית. בעצם זה על קשר שלא עובד כי הוא מתחיל מהמקום הלא נכון"`, difficulty: 'medium' },
      { text_he: `הדוברת בשיר נאלצת לעזוב את הלימודים כדי לטפל באביה האלכוהוליסט`, difficulty: 'easy' },
      { text_he: `בסיפור שבשיר, בן זוגה של הדוברת הופך לאלכוהוליסט בדיוק כמו אביה`, difficulty: 'medium' },
      { text_he: `גרסת הכיסוי של הזמר לוק קומבס לשיר משנת 2023 הגיעה למקום 2 בבילבורד`, difficulty: 'easy' },
      { text_he: `גרסת הכיסוי של לוק קומבס לשיר הגיעה למקום 1 במצעדי הקאנטרי`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `טרייסי צ'פמן הסבירה שהשיר עוסק במכונית האהובה הראשונה שלה`, difficulty: 'medium' },
      { text_he: `בסיפור שבשיר, בן זוגה של הדוברת הופך למצליח ועוזב אותה`, difficulty: 'medium' },
      { text_he: `גרסת הכיסוי של הזמר גארת' ברוקס לשיר משנת 2023 הגיעה למקום 1 בבילבורד`, difficulty: 'medium' },
      { text_he: `גרסת הכיסוי של לוק קומבס לשיר הגיעה למקום 5 במצעדי הקאנטרי`, difficulty: 'hard' },
    ],
  },
  q036: { // Space Oddity / David Bowie
    trueStatements: [
      { text_he: `דייוויד בואי כתב את השיר ב-1969 בעקבות פרידה כואבת מהרקדנית הרמיון פרת'ינגייל`, difficulty: 'hard' },
      { text_he: `השיר הושפע מהסרט "2001: אודיסיאה בחלל" של סטנלי קובריק`, difficulty: 'easy' },
      { text_he: `השיר שוחרר ב-11 ביולי 1969, חמישה ימים לפני שיגור אפולו 11`, difficulty: 'medium' },
      { text_he: `בשיר ההמשך "Ashes to Ashes" (1980) חשף דייוויד בואי שמייג'ור טום, גיבור Space Oddity, הוא מכור לסמים`, difficulty: 'medium' },
      { text_he: `תקופת ההתמכרות הקשה של דייוויד בואי לקוקאין הגיעה רק בשנות ה-70 — לא קשורה לכתיבת השיר ב-1969`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `דייוויד בואי כתב את השיר אחרי פרידה מאשתו אנג'י`, difficulty: 'hard' },
      { text_he: `השיר הושפע מהסרט "Star Wars" של ג'ורג' לוקאס`, difficulty: 'easy' },
      { text_he: `השיר שוחרר חודש לפני שיגור אפולו 11`, difficulty: 'medium' },
      { text_he: `דייוויד בואי כתב את השיר תוך כדי תקופת התמכרותו לקוקאין`, difficulty: 'medium' },
    ],
  },
  q037: { // Waterfalls / TLC
    trueStatements: [
      { text_he: `השיר יצא ב-1995 מאלבום TLC בשם CrazySexyCool`, difficulty: 'easy' },
      { text_he: `השיר זכה למקום הראשון בבילבורד למשך 7 שבועות`, difficulty: 'medium' },
      { text_he: `Waterfalls נחשב לאחד השירים הראשונים בפופ המיינסטרים שעסק במפורש באיידס`, difficulty: 'medium' },
      { text_he: `השיר מכיל שני סיפורים טרגיים: צעיר שעוסק בסחר סמים ונהרג, וגבר שמקיים יחסי מין לא מוגנים ונדבק באיידס`, difficulty: 'hard' },
      { text_he: `הקליפ של Waterfalls מציג את שני הסיפורים — סוחר הסמים והגבר שנדבק באיידס — במקביל`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-1996 מאלבום TLC בשם FanMail`, difficulty: 'easy' },
      { text_he: `השיר זכה למקום הראשון בבילבורד למשך 14 שבועות`, difficulty: 'medium' },
      { text_he: `שני הסיפורים בשיר עוסקים שניהם בהתמכרות לסמים`, difficulty: 'hard' },
      { text_he: `הקליפ של Waterfalls מתמקד בסיפור אחד בלבד — של גבר שנדבק באיידס`, difficulty: 'medium' },
    ],
  },
  q038: { // Mr. Brightside / The Killers
    trueStatements: [
      { text_he: `ברנדון פלאוורס, סולן The Killers, סיפר: "הלכתי לבר Crown and Anchor בלאס וגאס וחברתי הייתה שם עם בחור אחר"`, difficulty: 'easy' },
      { text_he: `ברנדון פלאוורס וגיטריסט The Killers דייב קיונינג כתבו את הגרסה הראשונה של השיר ב-2001`, difficulty: 'medium' },
      { text_he: `פלאוורס וקיונינג ביצעו את השיר לראשונה בערב מיקרופון פתוח בבית קפה בלאס וגאס בינואר 2002`, difficulty: 'hard' },
      { text_he: `השיר יצא כסינגל ב-2003 ובאלבום הבכורה של The Killers, Hot Fuss (2004)`, difficulty: 'medium' },
      { text_he: `Mr. Brightside הפך לטראק המזוהה ביותר עם The Killers`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ברנדון פלאוורס, סולן The Killers, תפס את חברתו עם בחור אחר במלון בלוס אנג'לס`, difficulty: 'easy' },
      { text_he: `ברנדון פלאוורס כתב את השיר לבד ב-2004`, difficulty: 'medium' },
      { text_he: `השיר בוצע לראשונה בקרנגי הול בניו יורק`, difficulty: 'hard' },
      { text_he: `השיר נכלל באלבום Day & Age של The Killers מ-2008`, difficulty: 'medium' },
    ],
  },
  q039: { // Black Hole Sun / Soundgarden
    trueStatements: [
      { text_he: `כריס קורנל, סולן Soundgarden, אמר ששם השיר נולד כשטעה לשמוע מהדורת חדשות באולפן`, difficulty: 'medium' },
      { text_he: `כריס קורנל טען שמילות השיר הן יותר "משחק במילים בשביל המילים" ופחות מסר ספציפי`, difficulty: 'hard' },
      { text_he: `כריס קורנל ציין שלמרות המנגינה המהפנטת, Black Hole Sun הוא בעצם שיר עצוב`, difficulty: 'medium' },
      { text_he: `כריס קורנל השווה את האפקט של השיר ל-"Pink Floyd של תקופת סיד באראט"`, difficulty: 'hard' },
      { text_he: `הקליפ של השיר, בבימוי הווארד גרינהל, זכה ב-MTV VMA לסרטון מטאל של השנה (1994)`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `כריס קורנל הצהיר ששם השיר הוא רעיון מתוכנן מראש על שמיים אפוקליפטיים`, difficulty: 'medium' },
      { text_he: `כריס קורנל אמר שמילות השיר הן הצהרה ברורה על מחאה חברתית`, difficulty: 'medium' },
      { text_he: `כריס קורנל ציין שהשיר הוא "אופטימי במהותו"`, difficulty: 'medium' },
      { text_he: `הקליפ של השיר זכה ב-MTV VMA לסרטון אלטרנטיבי של השנה (1994)`, difficulty: 'hard' },
    ],
  },
  q040: { // Creep / Radiohead
    trueStatements: [
      { text_he: `תום יורק, סולן Radiohead, כתב את השיר על אישה זרה שראה בתקופת הקולג' באוקספורד וגרר אחריה במשך תקופה`, difficulty: 'medium' },
      { text_he: `Radiohead זנחה לחלוטין את ביצוע השיר Creep ב-1998`, difficulty: 'easy' },
      { text_he: `אד או'בריאן, גיטריסט Radiohead, תיאר את חוויית הביצוע של Creep: "חיינו את אותן 4.5 דקות שוב ושוב"`, difficulty: 'medium' },
      { text_he: `הביצוע הראשון של Creep אחרי הזניחה של Radiohead היה ב-2001, אחרי תקלה בקלידים שאילצה את הלהקה לבצע אותו`, difficulty: 'hard' },
      { text_he: `השיר יצא כסינגל ב-1992 וכשל בתחילה, אבל זכה לתחייה ב-1993`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `תום יורק, סולן Radiohead, כתב את השיר על אהובתו הראשונה`, difficulty: 'medium' },
      { text_he: `Radiohead ניגנה את השיר Creep בכל הופעה ב-1998`, difficulty: 'easy' },
      { text_he: `הביצוע הראשון של Creep אחרי הזניחה היה ב-2005, אחרי בקשת מעריצים`, difficulty: 'hard' },
      { text_he: `השיר היה להיט מיידי מיד עם שחרורו ב-1992`, difficulty: 'medium' },
    ],
  },
  q041: { // Hallelujah / Leonard Cohen
    trueStatements: [
      { text_he: `יש דיווחים שלאונרד כהן כתב כ-80 בתים לשיר, אך מקורות אחרים מדברים על 150-180`, difficulty: 'hard' },
      { text_he: `לאונרד כהן אמר על תהליך הכתיבה של השיר: "אם הייתי יודע מאיפה השירים מגיעים, הייתי הולך לשם יותר"`, difficulty: 'medium' },
      { text_he: `השיר יצא לראשונה ב-1984 באלבום Various Positions של לאונרד כהן`, difficulty: 'easy' },
      { text_he: `חברת Columbia סירבה להוציא בארה"ב את האלבום Various Positions שכלל את Hallelujah`, difficulty: 'medium' },
      { text_he: `השיר הפך לאיקוני רק אחרי גרסת הכיסוי של ג'ף באקלי ב-1994`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `לאונרד כהן כתב את השיר במהלך שבוע אחד ושני בתים בלבד`, difficulty: 'hard' },
      { text_he: `לאונרד כהן הסביר שהשיר עוסק בחוויית טבילה דתית שעבר`, difficulty: 'medium' },
      { text_he: `השיר יצא לראשונה ב-1979 באלבום Recent Songs של לאונרד כהן`, difficulty: 'easy' },
      { text_he: `השיר הפך ללהיט מיידי עם שחרורו ב-1984`, difficulty: 'medium' },
    ],
  },
  q042: { // Yellow / Coldplay
    trueStatements: [
      { text_he: `כריס מרטין, סולן Coldplay, כתב את השיר בהשראת הכוכבים שראה מחוץ לאולפן בלילה`, difficulty: 'medium' },
      { text_he: `כריס מרטין הסביר שהשיר עוסק ב"מסירות לאדם — לכתוב לו שיר, לשחות בים בשבילו"`, difficulty: 'easy' },
      { text_he: `כריס מרטין אמר שלא היה לו אדם ספציפי בראש כשכתב את Yellow`, difficulty: 'medium' },
      { text_he: `השם "Yellow" נבחר ממדריך הטלפונים Yellow Pages שהיה ליד באולפן בזמן ההקלטה`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-26 ביוני 2000 כסינגל השני מאלבום הבכורה של Coldplay, Parachutes`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `כריס מרטין, סולן Coldplay, כתב את השיר בהשראת השקיעה שראה מחוץ לחלון`, difficulty: 'medium' },
      { text_he: `כריס מרטין כתב את השיר על חברתו הראשונה`, difficulty: 'medium' },
      { text_he: `הצבע "צהוב" נבחר לשם השיר כסמל לעצב ולדכאון`, difficulty: 'hard' },
      { text_he: `השיר יצא כסינגל הראשון מאלבום הבכורה של Coldplay, Parachutes`, difficulty: 'medium' },
    ],
  },
  q043: { // bad guy / Billie Eilish
    trueStatements: [
      { text_he: `בילי אייליש אמרה על השיר: "אם את כל הזמן אומרת אני רעה, אני שוברת כללים — את לא באמת"`, difficulty: 'easy' },
      { text_he: `bad guy יצא ב-29 במרץ 2019 מאלבום הבכורה של בילי אייליש "When We All Fall Asleep, Where Do We Go?"`, difficulty: 'easy' },
      { text_he: `המבנה המוזיקלי של bad guy לא רגיל: הקצב מתחיל ב-135 BPM ויורד ל-120 BPM בסוף`, difficulty: 'hard' },
      { text_he: `בטקס הגראמי של 2020 השיר זכה בכל ארבעת הפרסים הגדולים`, difficulty: 'medium' },
      { text_he: `בילי אייליש הייתה הראשונה שזכתה בכל ארבעת הפרסי הגראמי הגדולים מאז קריסטופר קרוס ב-1981`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `בילי אייליש הצהירה ש-bad guy הוא הצהרה כנה על היותה "אדם רע"`, difficulty: 'easy' },
      { text_he: `bad guy יצא ב-2018 כסינגל הראשון בקריירה של בילי אייליש`, difficulty: 'medium' },
      { text_he: `הקצב במבנה השיר נשאר אחיד 120 BPM לכל אורכו`, difficulty: 'hard' },
      { text_he: `בילי אייליש הייתה הראשונה שזכתה בארבעת פרסי הגראמי הגדולים מאז ביונסה`, difficulty: 'medium' },
    ],
  },
  q044: { // Blinding Lights / The Weeknd
    trueStatements: [
      { text_he: `The Weeknd הסביר על השיר: "אתה רוצה לראות מישהו בלילה, אתה שיכור, ואתה נוהג לכיוון האדם הזה"`, difficulty: 'medium' },
      { text_he: `The Weeknd הוסיף על Blinding Lights: "אני לא רוצה לקדם נהיגה שיכורה, אבל זה הצד האפל"`, difficulty: 'medium' },
      { text_he: `Blinding Lights יצא בנובמבר 2019 מאלבום The Weeknd בשם After Hours`, difficulty: 'easy' },
      { text_he: `Blinding Lights עוצב בסגנון synth-wave של שנות ה-80 בהשראת המשחק Grand Theft Auto: Vice City`, difficulty: 'hard' },
      { text_he: `Blinding Lights עמד 90 שבועות בעשירייה הראשונה של בילבורד הוט 100 — שיא בכל הזמנים`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `The Weeknd אמר ש-Blinding Lights עוסק בנהיגה הביתה אחרי הופעה רגילה`, difficulty: 'medium' },
      { text_he: `The Weeknd הצהיר ש-Blinding Lights הוא שיר אהבה אופטימי`, difficulty: 'medium' },
      { text_he: `Blinding Lights עוצב בסגנון hip-hop קלאסי של שנות ה-90`, difficulty: 'hard' },
      { text_he: `Blinding Lights עמד 30 שבועות בעשירייה הראשונה של בילבורד`, difficulty: 'medium' },
    ],
  },
  q045: { // Take Me to Church / Hozier
    trueStatements: [
      { text_he: `הוזייר אמר: "גדלתי באירלנד, הכנסייה תמיד שם — הצביעות, הפחדנות הפוליטית"`, difficulty: 'easy' },
      { text_he: `הוזייר הדגיש ש-Take Me to Church אינו "התקפה על אמונה" אלא ביקורת על "מוסד שמערער את האנושות"`, difficulty: 'medium' },
      { text_he: `הוזייר תיאר את Take Me to Church כ"שיר של איבוד דת"`, difficulty: 'medium' },
      { text_he: `הקליפ של Take Me to Church, בבימוי ברנדן קנטי, הופק בקורק שבאירלנד בתקציב של 1,500 אירו בלבד`, difficulty: 'hard' },
      { text_he: `Take Me to Church הגיע למקום 2 בבילבורד ולשיא של מקום 6 בבריטניה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הוזייר הצהיר ש-Take Me to Church הוא "התקפה ישירה על אמונה דתית"`, difficulty: 'easy' },
      { text_he: `הוזייר תיאר את Take Me to Church כ"שיר של חזרה לדת"`, difficulty: 'medium' },
      { text_he: `הקליפ של Take Me to Church הופק ברוסיה בתקציב של 50,000 אירו`, difficulty: 'hard' },
      { text_he: `הקליפ של Take Me to Church הופק בלונדון בהפקה של MTV Europe`, difficulty: 'medium' },
    ],
  },
  q046: { // Firework / Katy Perry
    trueStatements: [
      { text_he: `קייטי פרי סיפרה שההשראה ל-Firework הגיעה מהרומן "On the Road" של ג'ק קרואק`, difficulty: 'medium' },
      { text_he: `הקטע ב-"On the Road" של קרואק שעורר את השיר עוסק באנשים ש"בוערים, בוערים, בוערים, כמו זיקוקים צהובים מופלאים שמתפוצצים כעכבישים על פני הכוכבים"`, difficulty: 'hard' },
      { text_he: `Firework יצא ב-26 באוקטובר 2010 מאלבום קייטי פרי "Teenage Dream"`, difficulty: 'medium' },
      { text_he: `Firework היה הסינגל מספר 1 השלישי של קייטי פרי מאלבום Teenage Dream`, difficulty: 'medium' },
      { text_he: `הקליפ של Firework זכה ב-MTV VMA לסרטון השנה (2011) וצולם בעיר בודפשט`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ההשראה ל-Firework הגיעה מהספר "1984" של ג'ורג' אורוול`, difficulty: 'medium' },
      { text_he: `Firework יצא ב-2012 כסינגל מאלבום קייטי פרי בשם Prism`, difficulty: 'medium' },
      { text_he: `Firework היה הסינגל הראשון של קייטי פרי מאלבום Teenage Dream`, difficulty: 'medium' },
      { text_he: `הקליפ של Firework צולם בלוס אנג'לס, עיר ההולדת של קייטי פרי`, difficulty: 'hard' },
    ],
  },
  q047: { // A Thousand Miles / Vanessa Carlton
    trueStatements: [
      { text_he: `ונסה קרלטון כתבה את השיר על תלמיד מ-Juilliard שהיה לה כלפיו רגשות`, difficulty: 'medium' },
      { text_he: `ונסה קרלטון למדה ב-School of American Ballet כשפיתחה את הרגשות לאותו תלמיד מ-Juilliard`, difficulty: 'hard' },
      { text_he: `ונסה קרלטון אמרה על האהוב ההוא: "מעולם לא דיברתי איתו. הייתי מאוד ביישנית"`, difficulty: 'easy' },
      { text_he: `ונסה קרלטון אמרה שהיה לה סיכוי גדול יותר "ליפול למעלה" מאשר ליצור מערכת יחסים עם אותו תלמיד`, difficulty: 'hard' },
      { text_he: `A Thousand Miles הגיע למקום 5 בבילבורד ב-2002`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ונסה קרלטון כתבה את השיר על מאהב שלה מבית הספר התיכון`, difficulty: 'medium' },
      { text_he: `ונסה קרלטון למדה באוניברסיטת קולומביה`, difficulty: 'hard' },
      { text_he: `ונסה קרלטון הצהירה שניסתה לחזר אחרי האהוב ונדחתה`, difficulty: 'medium' },
      { text_he: `A Thousand Miles הגיע למקום 1 בבילבורד ב-2002`, difficulty: 'easy' },
    ],
  },
  q048: { // WAP / Cardi B ft. Megan Thee Stallion
    trueStatements: [
      { text_he: `אחרי הביצוע של WAP בטקס הגראמי 2021, ה-FCC קיבלה למעלה מ-1,000 תלונות על השיר`, difficulty: 'medium' },
      { text_he: `הפוליטיקאי הרפובליקני ג'יימס ברדלי אמר על WAP שהוא "רוצה לשפוך מי קודש לאוזניים"`, difficulty: 'hard' },
      { text_he: `הפוליטיקאית הרפובליקנית דיאנה לוריין אמרה ש-WAP "החזיר את כל המגדר הנשי 100 שנים אחורה"`, difficulty: 'medium' },
      { text_he: `WAP זכה ל-93 מיליון השמעות בשבוע הראשון לאחר שחרורו`, difficulty: 'medium' },
      { text_he: `מגזין NPR הכתיר את WAP "השיר הטוב של 2020"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `ה-FCC קיבלה כ-50 תלונות בלבד אחרי הביצוע של WAP בגראמי 2021`, difficulty: 'medium' },
      { text_he: `אופרה ווינפרי גינתה את WAP בתוכנית הטלוויזיה שלה`, difficulty: 'easy' },
      { text_he: `WAP זכה ל-30 מיליון השמעות בלבד בשבוע הראשון`, difficulty: 'medium' },
      { text_he: `מגזין Rolling Stone הכתיר את WAP "השיר הגרוע של 2020"`, difficulty: 'hard' },
    ],
  },
  q049: { // Can't Feel My Face / The Weeknd
    trueStatements: [
      { text_he: `בשיר מאוחר יותר של The Weeknd, "Reminder", הוא שר במפורש "פנים מאובנים מתוך שקית קוק" — מה שמאשש את הפרשנות שגם Can't Feel My Face הוא על קוקאין`, difficulty: 'hard' },
      { text_he: `רשמית, The Weeknd מתאר את Can't Feel My Face כ"רומן לוהט עם אישה שהוא יודע שהיא לא טובה לו"`, difficulty: 'medium' },
      { text_he: `Can't Feel My Face יצא ביוני 2015 מאלבום The Weeknd בשם "Beauty Behind the Madness"`, difficulty: 'easy' },
      { text_he: `Can't Feel My Face עלה למקום 1 בבילבורד`, difficulty: 'medium' },
      { text_he: `Can't Feel My Face הופק על ידי מקס מרטין, מפיק שמתמחה בפופ סקנדינבי`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `The Weeknd הצהיר במפורש ש-Can't Feel My Face עוסק בקוקאין`, difficulty: 'medium' },
      { text_he: `Can't Feel My Face יצא ב-2013 מאלבום The Weeknd בשם Trilogy`, difficulty: 'easy' },
      { text_he: `Can't Feel My Face עלה רק למקום 5 בבילבורד`, difficulty: 'medium' },
      { text_he: `Can't Feel My Face הופק על ידי הראפר דרייק`, difficulty: 'hard' },
    ],
  },
  // q050 already fixed in previous pass — skip
  q052: { // Somebody That I Used to Know / Gotye ft. Kimbra
    trueStatements: [
      { text_he: `גוטייה (וולי דה בקר) סיפר שכתב תחילה רק את חלקו הגברי בדואט`, difficulty: 'medium' },
      { text_he: `גוטייה הבין ש"לא היה לאן ללכת עם הדמות" וצריך עוד קול בשיר`, difficulty: 'medium' },
      { text_he: `גוטייה הוסיף את החלק הנשי של קימברה רק בסשן ההקלטות השלישי`, difficulty: 'hard' },
      { text_he: `Somebody That I Used to Know עמד 8 שבועות במקום 1 בבילבורד`, difficulty: 'easy' },
      { text_he: `Somebody That I Used to Know זכה בגראמי לשיר השנה ולהקלטת השנה (2013)`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `גוטייה תכנן את הדואט עם קימברה מהיום הראשון של כתיבת השיר`, difficulty: 'medium' },
      { text_he: `קימברה תרמה את חלקה לשיר בלי לפגוש את גוטייה אישית`, difficulty: 'hard' },
      { text_he: `Somebody That I Used to Know עמד 4 שבועות בלבד במקום 1 בבילבורד`, difficulty: 'medium' },
      { text_he: `Somebody That I Used to Know זכה בגראמי לאלבום השנה (2013)`, difficulty: 'medium' },
    ],
  },
  q053: { // Ms. Jackson / Outkast
    trueStatements: [
      { text_he: `אנדרה 3000, חבר Outkast, כיוון את השיר ספציפית לאמא של הזמרת אריקה בדו, קולין רייט`, difficulty: 'medium' },
      { text_he: `קולין רייט היא אמהּ של אריקה בדו, ואמה של בתה ובן של אריקה בדו ואנדרה 3000, סבן בנג'מין`, difficulty: 'hard' },
      { text_he: `אנדרה 3000 אמר על השיר: "כנראה שלעולם לא הייתי בא ואומר לאמא של אריקה 'אני מצטער על מה שקרה'"`, difficulty: 'medium' },
      { text_he: `אריקה בדו עצמה אמרה על Ms. Jackson שהשיר "הכאיב לה בהתחלה" אבל היא העריכה את הכנות`, difficulty: 'easy' },
      { text_he: `הפתיחה של Ms. Jackson מקדישה את השיר ל"baby's mamas' mamas" (לאמהות של אמהות הילדים)`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Ms. Jackson כתוב לאמא של ביג בוי, השותף השני ב-Outkast`, difficulty: 'medium' },
      { text_he: `אריקה בדו תבעה את אנדרה 3000 בעקבות השיר Ms. Jackson`, difficulty: 'hard' },
      { text_he: `אנדרה 3000 הצהיר ש-Ms. Jackson הוא בדיוני לחלוטין`, difficulty: 'medium' },
      { text_he: `הפתיחה של Ms. Jackson מקדישה את השיר ל"all the daddies out there"`, difficulty: 'easy' },
    ],
  },
  q054: { // Physical / Olivia Newton-John
    trueStatements: [
      { text_he: `אוליביה ניוטון-ג'ון עצמה הביעה ספקות לגבי Physical בגלל הרמיזות המיניות`, difficulty: 'medium' },
      { text_he: `שורות כמו "אין יותר מה לדבר אלא אם זה אופקי" ו"תן לי לשמוע את הגוף שלך מדבר" גרמו לתחנות רדיו לאסור את Physical`, difficulty: 'hard' },
      { text_he: `הקליפ של Physical, עם סצנות מקלחת ושינוי גוף, נחשב לפרובוקטיבי בזמנו`, difficulty: 'medium' },
      { text_he: `Physical עמד 10 שבועות במקום 1 בבילבורד`, difficulty: 'easy' },
      { text_he: `Physical היה אחד הלהיטים הגדולים של 1981`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `אוליביה ניוטון-ג'ון לא הביעה שום ספקות לגבי Physical`, difficulty: 'medium' },
      { text_he: `תחנות רדיו ברחבי ארה"ב אהבו את Physical ומעולם לא אסרו אותו`, difficulty: 'medium' },
      { text_he: `הקליפ של Physical נחשב לתמים אז ולגמרי לא פרובוקטיבי`, difficulty: 'hard' },
      { text_he: `Physical עמד 4 שבועות בלבד במקום 1 בבילבורד`, difficulty: 'medium' },
    ],
  },
  q055: { // In Bloom / Nirvana
    trueStatements: [
      { text_he: `קורט קוביין, סולן Nirvana, כתב את השיר בכוונה כך שמעריצים שלא מבינים את המסר ישירו אותו בקול רם — אירוניה כפולה`, difficulty: 'hard' },
      { text_he: `השורה "אוהב לירות מהרובה שלו" ב-In Bloom היא דקירה סאטירית במאצ'ואיזם שקורט קוביין תיעב`, difficulty: 'medium' },
      { text_he: `קורט קוביין אמר שהיה מתוסכל מ"אנשים שלוקחים אותנו ברצינות"`, difficulty: 'medium' },
      { text_he: `קורט קוביין ביקש שהקליפ של In Bloom יראה את הצד ההומוריסטי של Nirvana`, difficulty: 'easy' },
      { text_he: `In Bloom נכלל באלבום Nirvana בשם Nevermind (1991), אבל יצא כסינגל רק בנובמבר 1992`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `קורט קוביין כתב את In Bloom כאהבה וכבוד למעריצים`, difficulty: 'hard' },
      { text_he: `השורה על הרובה ב-In Bloom היא ביטוי כן של אהבת קורט קוביין לכלי נשק`, difficulty: 'medium' },
      { text_he: `In Bloom יצא כסינגל הראשון מאלבום Nevermind בספטמבר 1991`, difficulty: 'medium' },
      { text_he: `קורט קוביין רצה שהקליפ של In Bloom יהיה רציני ועצוב`, difficulty: 'medium' },
    ],
  },
  q056: { // Little Red Corvette / Prince
    trueStatements: [
      { text_he: `שורות כמו "כיס מלא בסוסים, טרויאנים, חלקם משומשים" ב-Little Red Corvette רומזות לקונדומים ולמאהבים קודמים של הדוברת בשיר`, difficulty: 'hard' },
      { text_he: `ה"ג'וקיים" ב-Little Red Corvette הם הגברים שכבר רכבו על "המכונית" — מטאפורה לאישה`, difficulty: 'hard' },
      { text_he: `פרינס בחר במטאפורות מוסוות ב-Little Red Corvette אחרי שירים יותר גלויים שלו כמו "Head" ו-"Dirty Mind"`, difficulty: 'medium' },
      { text_he: `פרינס הקליט את Little Red Corvette במאי 1982`, difficulty: 'medium' },
      { text_he: `Little Red Corvette שוחרר רשמית כסינגל בפברואר 1983`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Little Red Corvette באמת עוסק במכונית קורבט אדומה ספציפית שפרינס שם עליה עין`, difficulty: 'medium' },
      { text_he: `פרינס כתב את Little Red Corvette עוד לפני "Head" ו-"Dirty Mind"`, difficulty: 'hard' },
      { text_he: `פרינס הקליט את Little Red Corvette בנובמבר 1981`, difficulty: 'medium' },
      { text_he: `Little Red Corvette שוחרר באוקטובר 1982 כסינגל הראשון מאלבום פרינס בשם 1999`, difficulty: 'medium' },
    ],
  },
  q057: { // Hurt / Nine Inch Nails (cover by Johnny Cash)
    trueStatements: [
      { text_he: `הזמר ג'וני קאש הקליט את הכיסוי של Hurt בפברואר 2003 כשהיה בן 71`, difficulty: 'medium' },
      { text_he: `ג'וני קאש נפטר 7 חודשים לאחר הקלטת הכיסוי של Hurt (12 בספטמבר 2003)`, difficulty: 'easy' },
      { text_he: `טרנט רזנור, מנהיג Nine Inch Nails וכותב Hurt, אמר אחרי שראה את הקליפ של ג'וני קאש: "פשוט איבדתי את החברה שלי, כי השיר הזה כבר לא שלי"`, difficulty: 'hard' },
      { text_he: `טרנט רזנור הוסיף שהוא הרגיש "כמו חיבוק חם" מהביצוע של ג'וני קאש ל-Hurt`, difficulty: 'medium' },
      { text_he: `הכיסוי של ג'וני קאש ל-Hurt נחשב כיום לאיקוני יותר מהמקור של Nine Inch Nails`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ג'וני קאש הקליט את הכיסוי של Hurt כשהיה בן 65`, difficulty: 'medium' },
      { text_he: `ג'וני קאש נפטר שנתיים לאחר הקלטת הכיסוי של Hurt`, difficulty: 'medium' },
      { text_he: `טרנט רזנור הביע אכזבה מהכיסוי של ג'וני קאש ל-Hurt`, difficulty: 'hard' },
      { text_he: `הכיסוי של ג'וני קאש ל-Hurt לא קיבל פרסי ביקורת או מועמדויות לגראמי`, difficulty: 'medium' },
    ],
  },
  q058: { // Don't Stand So Close to Me / The Police
    trueStatements: [
      { text_he: `סטינג, סולן The Police, עבד כמורה לפני שהפך למוזיקאי, ולימד תלמידי כיתות ז'-י'`, difficulty: 'medium' },
      { text_he: `ב-1981 רמז סטינג על אלמנט אוטוביוגרפי בשיר: "עברתי התנסות הוראה ובחורות בנות 15 חיבבו אותי"`, difficulty: 'hard' },
      { text_he: `ב-1993 סטינג תיאר את כתיבת השיר אחרת: "היינו פצצות בלונדיניות באותה תקופה... אז הרעיון היה — בואו נכתוב סיפור לוליטה"`, difficulty: 'hard' },
      { text_he: `בסופו של דבר סטינג הכחיש שהשיר אוטוביוגרפי`, difficulty: 'medium' },
      { text_he: `הקישור לרומן "לוליטה" של נבוקוב מופיע במפורש בשיר ("בדיוק כמו האיש הזקן בספר ההוא של נבוקוב")`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `סטינג, סולן The Police, עבד כעורך דין לפני שהפך למוזיקאי`, difficulty: 'medium' },
      { text_he: `סטינג מעולם לא רמז על אלמנט אוטוביוגרפי בשיר`, difficulty: 'hard' },
      { text_he: `הקישור הספרותי בשיר הוא ל"רומיאו ויוליה" של שייקספיר`, difficulty: 'easy' },
      { text_he: `סטינג הצהיר שהשיר אוטוביוגרפי לחלוטין`, difficulty: 'medium' },
    ],
  },
  q059: { // Alive / Pearl Jam
    trueStatements: [
      { text_he: `אביו הביולוגי האמיתי של אדי ודר, סולן Pearl Jam, היה אדוארד סברסון השלישי`, difficulty: 'hard' },
      { text_he: `אביו הביולוגי של אדי ודר נפטר מטרשת נפוצה ב-1981`, difficulty: 'medium' },
      { text_he: `אדי ודר נפגש עם אביו הביולוגי "שלוש או ארבע פעמים" כמכרים משפחתיים, בלי לדעת שזה אביו האמיתי`, difficulty: 'hard' },
      { text_he: `בהופעות של Pearl Jam, הקהל "הסיר את הקללה" של תחושת האשמה ששרד את אביו, ע"י שירת השורה "אני עדיין חי" כחגיגה`, difficulty: 'medium' },
      { text_he: `Alive יצא כסינגל ב-7 ביולי 1991, 51 ימים לפני אלבום הבכורה של Pearl Jam, Ten`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `אביו הביולוגי של אדי ודר, סולן Pearl Jam, חי עד היום`, difficulty: 'hard' },
      { text_he: `אביו הביולוגי של אדי ודר נפטר מהתקף לב ב-1979`, difficulty: 'medium' },
      { text_he: `אדי ודר מעולם לא פגש את אביו הביולוגי`, difficulty: 'hard' },
      { text_he: `Alive היה הסינגל הראשון מאלבום Pearl Jam בשם Vs. (1993)`, difficulty: 'medium' },
    ],
  },
  q060: { // This Is America / Childish Gambino
    trueStatements: [
      { text_he: `הקליפ של This Is America בויים על ידי הירו מורי`, difficulty: 'medium' },
      { text_he: `הקליפ של This Is America משווה את הריקודים השמחים של דונלד גלובר (Childish Gambino) לרגעי אלימות פתאומיים — היורה לאנשים שצומחת מתוך הריקוד`, difficulty: 'hard' },
      { text_he: `This Is America עובר בין שני "עולמות סאונד": קוראל שמח לפני יריות, ואז טראפ אפל ופועם אחרי הירייה`, difficulty: 'medium' },
      { text_he: `הקליפ של This Is America צבר 980 מיליון צפיות עד מרץ 2026`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הקליפ של This Is America בויים על ידי דונלד גלובר עצמו`, difficulty: 'medium' },
      { text_he: `הקליפ של This Is America מציג ריקודים בלבד, ללא תכנים אלימים`, difficulty: 'easy' },
      { text_he: `הסאונד של This Is America אחיד לכל אורכו — סגנון hip-hop קלאסי`, difficulty: 'medium' },
      { text_he: `הקליפ של This Is America צבר 5 מיליארד צפיות בתוך שנה אחת`, difficulty: 'hard' },
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
console.log(`Clarified statements in ${touched} questions.`);
