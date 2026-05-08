#!/usr/bin/env node
// Batch 7 (FINAL): q413-q449 (37 questions)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const statements = {
  q413: { // Layla / Derek and the Dominos (duplicate of q063)
    trueStatements: [
      { text_he: `קלפטון התאהב בפאטי בויד באמצע שנות ה-60`, difficulty: 'easy' },
      { text_he: `קלפטון היה חבר קרוב של ג'ורג' האריסון, בעלה של פאטי`, difficulty: 'easy' },
      { text_he: `השיר נכתב בעקבות סיפורו של "שכבי ומג'נון" — סיפור פרסי קלאסי על אהבה אסורה`, difficulty: 'hard' },
      { text_he: `חבר נתן לקלפטון לקרוא את הסיפור הפרסי`, difficulty: 'medium' },
      { text_he: `בויד התגרשה מהאריסון ב-1977`, difficulty: 'medium' },
      { text_he: `בויד וקלפטון נישאו ב-1979 בהופעה בטוקסון, אריזונה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `קלפטון התאהב בפאטי רק בשנות ה-70`, difficulty: 'easy' },
      { text_he: `השיר נכתב בעקבות הסיפור של רומיאו ויוליה`, difficulty: 'hard' },
      { text_he: `בויד וקלפטון נישאו בלונדון בטקס פרטי ב-1976`, difficulty: 'hard' },
      { text_he: `האריסון תבע את קלפטון בבית משפט בעקבות הרומן`, difficulty: 'medium' },
    ],
  },
  q414: { // You're So Vain / Carly Simon
    trueStatements: [
      { text_he: `סיימון מכרה ב-2003 את הסוד במכירה פומבית למימון מועדון אופרה`, difficulty: 'medium' },
      { text_he: `דיק אברסול, נשיא NBC Sports, זכה במכירה ב-50,000 דולר`, difficulty: 'hard' },
      { text_he: `התנאי במכירה: אברסול לא רשאי לחשוף בפומבי, רק לתת רמזים`, difficulty: 'hard' },
      { text_he: `הרמז הראשון ש-אברסול נתן: "השם מכיל את האותיות E, A, ו-R"`, difficulty: 'hard' },
      { text_he: `ב-2015 סיימון אישרה ש-בית 2 הוא על וורן ביטי`, difficulty: 'easy' },
      { text_he: `סיימון אומרת ש"וורן חושב שהכל עליו" — מה שהוא אכן חשב`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `סיימון מכרה את הסוד למוזיאון מטרופוליטן בניו יורק`, difficulty: 'medium' },
      { text_he: `אברסול שילם 100,000 דולר`, difficulty: 'hard' },
      { text_he: `ב-2015 סיימון אישרה את כל שלושת הזהויות בשיר`, difficulty: 'easy' },
      { text_he: `הרמז של אברסול היה רק "השם מכיל את האות J"`, difficulty: 'hard' },
    ],
  },
  q415: { // Escape (The Piña Colada Song) / Rupert Holmes
    trueStatements: [
      { text_he: `רופרט הולמס תיאר את השיר כסיפור על "איך חוסר תקשורת מוביל לבגידה"`, difficulty: 'medium' },
      { text_he: `הולמס הוסיף: "דיאלוג גלוי וכן יכול למנוע שבר לב ושעמום"`, difficulty: 'hard' },
      { text_he: `הסיפור: גבר משועמם מאשתו רואה מודעת היכרויות ומשיב`, difficulty: 'easy' },
      { text_he: `הוא מגלה באירוע שהאישה היא אשתו עצמה`, difficulty: 'easy' },
      { text_he: `השיר היה הסינגל האחרון של שנות ה-70 שהגיע למקום 1 בבילבורד`, difficulty: 'medium' },
      { text_he: `התאריך: 29 בדצמבר 1979`, difficulty: 'hard' },
      { text_he: `הולמס הוא בין השאר תיאטרון מצליח שזכה בטוני`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הולמס תיאר את השיר כ"רומנטי כן ופשוט"`, difficulty: 'medium' },
      { text_he: `בסוף הסיפור הגבר עוזב את אשתו`, difficulty: 'easy' },
      { text_he: `השיר היה הסינגל הראשון של שנות ה-80 שהגיע למקום 1`, difficulty: 'medium' },
      { text_he: `הולמס מעולם לא זכה בפרסי תיאטרון`, difficulty: 'hard' },
    ],
  },
  q416: { // Behind Blue Eyes / The Who
    trueStatements: [
      { text_he: `השיר נכתב במקור על ידי פיט טאונסנד עבור פרויקט אופרת הרוק "Lifehouse"`, difficulty: 'medium' },
      { text_he: `פרויקט "Lifehouse" לעולם לא יצא לפועל`, difficulty: 'easy' },
      { text_he: `השיר יצא ב-1971 באלבום "Who's Next" אחרי שלפהאוס פורק`, difficulty: 'hard' },
      { text_he: `הדובר בשיר הוא הנבל "ג'אמבו"`, difficulty: 'easy' },
      { text_he: `טאונסנד הסביר: "זה היה שיר שמושר על ידי הנבל של הסיפור — שבמקור היה רואה את עצמו כטוב שאולץ למצב של נבל"`, difficulty: 'hard' },
      { text_he: `גרסת הכיסוי של Limp Bizkit מ-2003 הציגה אותו לדור צעיר`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `השיר נכתב במקור עבור אלבום "Tommy"`, difficulty: 'medium' },
      { text_he: `הדובר בשיר הוא גיבור הסיפור, לא הנבל`, difficulty: 'easy' },
      { text_he: `טאונסנד הסביר שהשיר אוטוביוגרפי על חייו האישיים`, difficulty: 'hard' },
      { text_he: `גרסת הכיסוי של Linkin Park היא המוכרת ביותר`, difficulty: 'medium' },
    ],
  },
  q417: { // Closing Time / Semisonic
    trueStatements: [
      { text_he: `המתופף יעקב סליכטר אישר את הקריאה המטאפורית של השיר`, difficulty: 'medium' },
      { text_he: `סליכטר תיאר: השיר הוא "על להישלח החוצה מהרחם כאילו על ידי בוחן בר שמפנה את המקום"`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-1998`, difficulty: 'easy' },
      { text_he: `השיר נכלל בסטים של מסיבות סיום בכל אמריקה`, difficulty: 'medium' },
      { text_he: `רוב הקהל לא יודע שהשיר על לידה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `סליכטר הצהיר שהשיר הוא רק על סגירת בר רגיל`, difficulty: 'medium' },
      { text_he: `השיר יצא ב-2002`, difficulty: 'easy' },
      { text_he: `הלהקה אסרה לנגן את השיר במסיבות סיום`, difficulty: 'medium' },
      { text_he: `Semisonic הצהירו שהפרשנות של "לידה" מומצאת על ידי המעריצים`, difficulty: 'hard' },
    ],
  },
  q418: { // Tubthumping / Chumbawamba
    trueStatements: [
      { text_he: `Chumbawamba ידועים על הפרעות פוליטיות פומביות`, difficulty: 'medium' },
      { text_he: `ב-1998 הם שפכו דלי מים על שר הסחר הבריטי דונלד לואיס בטקס ה-Brit Awards`, difficulty: 'hard' },
      { text_he: `הם המשיכו 15 שנה אחרי "Tubthumping" עם פרויקטים פוליטיים`, difficulty: 'medium' },
      { text_he: `הם פורקו ב-2012`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Chumbawamba הימנעו מאקטיביזם פוליטי לאורך כל הקריירה שלהם`, difficulty: 'medium' },
      { text_he: `הם פורקו מיד אחרי הצלחת "Tubthumping" ב-1999`, difficulty: 'easy' },
      { text_he: `הם שפכו דלי מים על המלכה בטקס מלכותי`, difficulty: 'hard' },
      { text_he: `הם המשיכו לפעול עד היום (2026)`, difficulty: 'medium' },
    ],
  },
  q419: { // The One I Love / R.E.M. (duplicate of q025)
    trueStatements: [
      { text_he: `מייקל סטייפ אמר על השיר: "הוא ממש אלים ונוראי. חשבתי שזה יותר מדי. ברוטלי מדי"`, difficulty: 'easy' },
      { text_he: `המילים "פרופ פשוט להעסיק את זמני" מתארות שימוש באדם אחר כמטרה רגשית`, difficulty: 'medium' },
      { text_he: `סטייפ אמר ב-2016: "אנשים לא הבינו, אז זה בסדר"`, difficulty: 'hard' },
      { text_he: `סטייפ הוסיף ב-2016: "עכשיו זה שיר אהבה, אז זה בסדר"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `סטייפ הצהיר שהשיר הוא הצהרת אהבה כנה לאשתו`, difficulty: 'easy' },
      { text_he: `המילים מתארות מסירות אמיתית של אדם אוהב`, difficulty: 'medium' },
      { text_he: `סטייפ הצטער על שכתב את השיר וניסה למחוק אותו מהאלבום`, difficulty: 'hard' },
      { text_he: `סטייפ אמר שהוא "אסיר תודה" שאנשים מנגנים אותו בחתונות`, difficulty: 'hard' },
    ],
  },
  q420: { // Baby Got Back / Sir Mix-a-Lot
    trueStatements: [
      { text_he: `Sir Mix-a-Lot (אנתוני ריי) הסביר ב-1992 שההשראה הייתה פרסומת של Budweiser`, difficulty: 'medium' },
      { text_he: `הפרסומת הייתה עם "דוגמניות רזות בסגנון 'ילדה מהעמק'"`, difficulty: 'hard' },
      { text_he: `Mix-a-Lot חשב: "כל הנשים האפרו-אמריקאיות שאני מכיר נראות אחרת"`, difficulty: 'hard' },
      { text_he: `המסר היה הצדקת טיפוסי גוף שונים`, difficulty: 'easy' },
      { text_he: `הקליפ נאסר תחילה ב-MTV אבל לאחר מכן הוסר האיסור`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 בבילבורד הוט 100 לחמישה שבועות ב-1992`, difficulty: 'medium' },
      { text_he: `השיר זכה בגראמי`, difficulty: 'easy' },
      { text_he: `ב-2014 השיר חזר לתשומת הלב הציבורית כשניקי מינאז' עיבדה אותו ב"Anaconda"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `ההשראה הייתה פרסומת של Coca-Cola`, difficulty: 'medium' },
      { text_he: `השיר נאסר ב-MTV לחלוטין ומעולם לא הוסר האיסור`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 5 בבילבורד למשך 2 שבועות`, difficulty: 'medium' },
      { text_he: `ב-2014 ביונסה עיבדה את השיר`, difficulty: 'hard' },
    ],
  },
  q421: { // I Love Rock 'n' Roll / Joan Jett
    trueStatements: [
      { text_he: `השיר נכתב על ידי אלן מריל וג'ייק הוקר עבור The Arrows הבריטית`, difficulty: 'medium' },
      { text_he: `הגרסה המקורית יצאה ביולי 1975`, difficulty: 'hard' },
      { text_he: `הגרסה המקורית לא הצליחה מסחרית ונשארה לא ידועה`, difficulty: 'easy' },
      { text_he: `ב-1976 ג'ואן ג'ט הייתה בסיבוב הופעות אנגלי עם The Runaways`, difficulty: 'medium' },
      { text_he: `ג'ואן ג'ט ראתה את The Arrows מבצעים את השיר בסדרה האנגלית "Arrows"`, difficulty: 'hard' },
      { text_he: `ב-1981 ג'ואן הקליטה אותו עם הלהקה החדשה שלה The Blackhearts`, difficulty: 'medium' },
      { text_he: `הוא הפך לסינגל מספר 1 בארה"ב לשבעה שבועות ב-1982`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר נכתב במקור על ידי ג'ואן ג'ט ב-1975`, difficulty: 'medium' },
      { text_he: `ג'ואן ג'ט שמעה את השיר ברדיו אמריקאי, לא בסדרה אנגלית`, difficulty: 'hard' },
      { text_he: `ג'ואן ג'ט הקליטה את הגרסה שלה עם The Runaways`, difficulty: 'medium' },
      { text_he: `הסינגל הגיע למקום 5 בארה"ב`, difficulty: 'easy' },
    ],
  },
  q422: { // Torn / Natalie Imbruglia
    trueStatements: [
      { text_he: `הגרסה של אימברוליה הגיעה למקום 1 ב-MTV`, difficulty: 'medium' },
      { text_he: `הגרסה של אימברוליה הגיעה למקום 42 בבילבורד הוט 100`, difficulty: 'hard' },
      { text_he: `החוקים של בילבורד אז מנעו ממנה חזירה למקום הראשון בגלל סיבות טכניות`, difficulty: 'hard' },
      { text_he: `אימברוליה אמרה ב-2017 שעד היום, 25 שנה אחרי, אנשים מבקשים ממנה את השיר הזה ראשון בכל הופעה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הגרסה של אימברוליה הגיעה למקום 1 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `אימברוליה הצהירה שהיא לא רוצה לשיר את השיר יותר`, difficulty: 'medium' },
      { text_he: `החוקים של בילבורד תמכו במלוא העוצמה ב-MTV באותה תקופה`, difficulty: 'hard' },
      { text_he: `אימברוליה כתבה גרסה חדשה של השיר ב-2017`, difficulty: 'easy' },
    ],
  },
  q423: { // Fortunate Son / CCR
    trueStatements: [
      { text_he: `דייוויד אייזנהאואר עצמו דווקא התגייס לחיל הים ב-1970`, difficulty: 'hard' },
      { text_he: `הוא שירת 3 שנים בפעיל`, difficulty: 'medium' },
      { text_he: `שירותו של אייזנהאואר היה אחרי כתיבת השיר ב-1969`, difficulty: 'hard' },
      { text_he: `השיר נכלל ברשימת 500 השירים הגדולים בכל הזמנים של רולינג סטון`, difficulty: 'easy' },
      { text_he: `ב-2014 פוגרטי הזדעזע מכך ש-קמפיין של דונלד טראמפ ניגן את השיר בעצרות`, difficulty: 'medium' },
      { text_he: `פוגרטי הוציא אזהרה רשמית שלא להשתמש בשיר`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `דייוויד אייזנהאואר נמלט משירות צבאי לקנדה`, difficulty: 'hard' },
      { text_he: `אייזנהאואר שירת בחיל האוויר 5 שנים`, difficulty: 'medium' },
      { text_he: `פוגרטי שיבח את הקמפיין של טראמפ על השימוש בשיר`, difficulty: 'medium' },
      { text_he: `פוגרטי תבע את טראמפ בבית משפט`, difficulty: 'easy' },
    ],
  },
  q424: { // Ohio / CSNY
    trueStatements: [
      { text_he: `יאנג אמר ש-קנט סטייט היה "כנראה השיעור הכי גדול שאי פעם נלמד במוסד אמריקאי ללימודים"`, difficulty: 'medium' },
      { text_he: `השיר הופץ ברדיו תוך שבועות ספורים מההקלטה — שיא של מהירות בתעשיית התקליטים של אז`, difficulty: 'hard' },
      { text_he: `השיר נחשב לאחד השירים הפוליטיים החשובים ביותר של הרוק האמריקאי`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `יאנג אמר שקנט סטייט "לא היה שום דבר מיוחד"`, difficulty: 'medium' },
      { text_he: `השיר הופץ ברדיו רק שנה אחרי ההקלטה`, difficulty: 'hard' },
      { text_he: `השיר נחשב לאחד השירים הקלאסיים על אהבה`, difficulty: 'easy' },
      { text_he: `יאנג כתב את השיר 6 חודשים אחרי ירי קנט סטייט`, difficulty: 'medium' },
    ],
  },
  q425: { // Waterloo / ABBA
    trueStatements: [
      { text_he: `ABBA זכו באירוויזיון 1974 בבריטניה (ברייטון)`, difficulty: 'medium' },
      { text_he: `הזכייה הייתה ב-6 באפריל 1974`, difficulty: 'hard' },
      { text_he: `הם זכו עם 24 נקודות`, difficulty: 'medium' },
      { text_he: `הם הקדימו את איטליה במקום השני ב-6 נקודות בלבד`, difficulty: 'hard' },
      { text_he: `ב-2005 השיר נבחר כשיר האירוויזיון הטוב בכל הזמנים בתחרות ה-50 שנה של האירוויזיון`, difficulty: 'easy' },
      { text_he: `הזכייה השיקה את הקריירה הבינלאומית של ABBA`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ABBA זכו באירוויזיון 1972`, difficulty: 'medium' },
      { text_he: `הזכייה הייתה בסטוקהולם, שוודיה`, difficulty: 'medium' },
      { text_he: `הם זכו ברוב גדול של 50 נקודות מעל המקום השני`, difficulty: 'hard' },
      { text_he: `ב-2005 דווקא "Mamma Mia" נבחר כשיר האירוויזיון הטוב`, difficulty: 'easy' },
    ],
  },
  q426: { // American Woman / The Guess Who
    trueStatements: [
      { text_he: `השיר הוקלט ב-13 באוגוסט 1969`, difficulty: 'medium' },
      { text_he: `השיר יצא במרץ 1970`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 1 בבילבורד הוט 100 בארה"ב`, difficulty: 'easy' },
      { text_he: `זה היה דבר נדיר ביותר ללהקה קנדית באותה תקופה`, difficulty: 'medium' },
      { text_he: `גרסת הכיסוי של לני קרביץ מ-1999 (לפסקול הסרט "Austin Powers") הציגה את השיר לדור חדש`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר הוקלט ב-1972`, difficulty: 'medium' },
      { text_he: `השיר הגיע רק למקום 50 בבילבורד הוט 100`, difficulty: 'easy' },
      { text_he: `גרסת הכיסוי של בון ג'ובי מ-1999 היא המוכרת ביותר`, difficulty: 'hard' },
      { text_he: `הקליפ של "Austin Powers" השתמש בגרסה המקורית של 1970`, difficulty: 'medium' },
    ],
  },
  q427: { // Hurricane / Bob Dylan
    trueStatements: [
      { text_he: `רובין "הוריקן" קרטר הואשם יחד עם ג'ון ארטיס ברצח משולש`, difficulty: 'medium' },
      { text_he: `הרצח התרחש בבר Lafayette ב-Paterson, ניו ג'רזי ב-1966`, difficulty: 'hard' },
      { text_he: `דילן קרא את האוטוביוגרפיה של קרטר`, difficulty: 'medium' },
      { text_he: `דילן ביקר את קרטר בכלא Rahway`, difficulty: 'hard' },
      { text_he: `דילן כתב את השיר עם ז'אק לוי`, difficulty: 'easy' },
      { text_he: `ב-1985 השופט לי סארוקין פסק שקרטר לא קיבל משפט הוגן`, difficulty: 'medium' },
      { text_he: `קרטר שוחרר אחרי כ-19 שנה בכלא`, difficulty: 'easy' },
      { text_he: `ב-1988 כל האישומים בוטלו לחלוטין`, difficulty: 'hard' },
      { text_he: `דנזל וושינגטון גילם את קרטר בסרט "The Hurricane" (1999)`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הרצח התרחש בלאס וגאס`, difficulty: 'hard' },
      { text_he: `דילן כתב את השיר לבד, בלי שותף`, difficulty: 'easy' },
      { text_he: `קרטר שוחרר אחרי 25 שנה בכלא`, difficulty: 'easy' },
      { text_he: `מורגן פרימן גילם את קרטר בסרט "The Hurricane"`, difficulty: 'easy' },
    ],
  },
  q428: { // In the Air Tonight / Phil Collins
    trueStatements: [
      { text_he: `קולינס אמר במפורש: "אני לא יודע על מה השיר הזה"`, difficulty: 'easy' },
      { text_he: `קולינס הסביר: "כשכתבתי אותו, עברתי גירושים"`, difficulty: 'medium' },
      { text_he: `קולינס דחה את האגדה האורבנית פעמים רבות`, difficulty: 'medium' },
      { text_he: `הוא אמר שהאגדה מתסכלת אותו במיוחד באמריקה`, difficulty: 'hard' },
      { text_he: `השיר נכתב במהלך גירושיו ב-1980 מאשתו הראשונה אנדריאה ברטורלי`, difficulty: 'hard' },
      { text_he: `קולינס הודה: "כתבתי את המילים באופן ספונטני... יש בו הרבה כעס, יאוש ותסכול"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `קולינס אישר שהאגדה האורבנית נכונה לחלוטין`, difficulty: 'easy' },
      { text_he: `קולינס כתב את השיר אחרי שראה אדם טובע באמת`, difficulty: 'medium' },
      { text_he: `שמה של אשתו הראשונה של קולינס הוא רובין`, difficulty: 'hard' },
      { text_he: `קולינס הצהיר שהוא יודע בדיוק על מה השיר`, difficulty: 'easy' },
    ],
  },
  q429: { // YMCA / Village People
    trueStatements: [
      { text_he: `השיר יצא ב-1978`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 2 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `במקום 1 הייתה "Le Freak" של Chic`, difficulty: 'hard' },
      { text_he: `הריקוד הקלאסי עם ההברות Y-M-C-A פופולארי בכל מסיבה`, difficulty: 'easy' },
      { text_he: `ב-2020 הוקצה השיר לארוועזרייה האמריקאית של דונלד טראמפ`, difficulty: 'hard' },
      { text_he: `ויקטור ויליס הוציא אזהרה משפטית בעקבות השימוש`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-1980`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 1 בבילבורד למשך 4 שבועות`, difficulty: 'medium' },
      { text_he: `במקום 1 בזמן השחרור הייתה "Stayin' Alive" של Bee Gees`, difficulty: 'hard' },
      { text_he: `Village People תמכו בקמפיין של טראמפ`, difficulty: 'easy' },
    ],
  },
  q430: { // Blurred Lines / Robin Thicke
    trueStatements: [
      { text_he: `מרווין גיי קיבל קרדיט פוסט-מורטם כשותף לכתיבת השיר`, difficulty: 'medium' },
      { text_he: `הפסק גרם לחששות נרחבים בתעשיית המוזיקה`, difficulty: 'easy' },
      { text_he: `מאז יוצרים נזהרים יותר מ"דמיון בתחושה"`, difficulty: 'medium' },
      { text_he: `ת'יק ופארל הכחישו לאורך כל הדרך שהם העתיקו`, difficulty: 'easy' },
      { text_he: `הקלטות מאחורי הקלעים בהן ת'יק מודה ש"רציתי להפוך אותו ל-Marvin Gaye" עזרו לתביעה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `מרווין גיי תבע אישית לפני מותו`, difficulty: 'medium' },
      { text_he: `הפסק נחשב לאי-משמעותי בתעשייה`, difficulty: 'easy' },
      { text_he: `ת'יק ופארל אישרו מההתחלה שהם העתיקו את "Got to Give It Up"`, difficulty: 'medium' },
      { text_he: `ההקלטות מאחורי הקלעים מכילות פארל מאשר את ההעתקה, לא ת'יק`, difficulty: 'hard' },
    ],
  },
  q431: { // Livin' on a Prayer / Bon Jovi
    trueStatements: [
      { text_he: `הסיפור על "ג'וני וגינה" (Tommy and Gina) בשיר הפך לדמות מטאפורית של הזוג העובד`, difficulty: 'medium' },
      { text_he: `השיר הופיע ב"גלי ההיסטוריה" של 80s`, difficulty: 'easy' },
      { text_he: `הוא עדיין מנוגן ביציעי ספורט מסביב לעולם`, difficulty: 'easy' },
      { text_he: `ב-2024 בון ג'ובי הוציא דוקומנטרי על האלבום שמראה את התהליך של "כמעט-זניחת-השיר"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הדמויות "טומי וגינה" מבוססות על אנשים אמיתיים שבון ג'ובי הכיר`, difficulty: 'medium' },
      { text_he: `השיר נשכח לחלוטין בשנות ה-90`, difficulty: 'easy' },
      { text_he: `בון ג'ובי הוציאו דוקומנטרי בנושא רק ב-2010`, difficulty: 'hard' },
      { text_he: `השיר הוצא מסטליסטים ספורטיביים בעקבות הוויכוחים על המסר`, difficulty: 'easy' },
    ],
  },
  q432: { // Barbie Girl / Aqua
    trueStatements: [
      { text_he: `מאטל תבעה את MCA Records בספטמבר 1997`, difficulty: 'medium' },
      { text_he: `התביעה הייתה על הפרת סימן מסחר וזכויות יוצרים`, difficulty: 'easy' },
      { text_he: `ב-2002 בית המשפט הפדרלי לערעורים בארה"ב פסק שהשיר מוגן כפרודיה`, difficulty: 'medium' },
      { text_he: `השופט אלקס קוז'ינסקי סיכם את החלטתו במשפט: "The parties are advised to chill"`, difficulty: 'hard' },
      { text_he: `ב-2009 מאטל עצמם השתמשו בגרסה מותאמת של השיר בפרסומת`, difficulty: 'medium' },
      { text_he: `ב-2023 לסרט Barbie Movie של מאטל הם רכשו רישיון לשיר המקורי`, difficulty: 'hard' },
      { text_he: `מאטל גם הזמינו את Aqua לכתוב גרסה חדשה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `מאטל תבעו את Aqua במישרין, לא את MCA Records`, difficulty: 'medium' },
      { text_he: `מאטל זכו בתביעה ו-Aqua נאלצו לשלם פיצויים`, difficulty: 'easy' },
      { text_he: `השופט קוז'ינסקי סיכם את החלטתו במשפט "The parties shall pay damages"`, difficulty: 'hard' },
      { text_he: `מאטל מעולם לא השתמשו בשיר אחרי המשפט`, difficulty: 'medium' },
    ],
  },
  q433: { // Cotton Eye Joe / Rednex
    trueStatements: [
      { text_he: `השיר ידוע לפחות מאז לפני מלחמת האזרחים האמריקאית (1861-1865)`, difficulty: 'medium' },
      { text_he: `השיר שר על ידי עבדים אפרו-אמריקאים בדרום ארה"ב`, difficulty: 'easy' },
      { text_he: `הפולקלוריסטית דורות'י סקארבורו תיעדה אותה במחקריה כ"שיר ששמעה את העבדים שרים על המטעים"`, difficulty: 'hard' },
      { text_he: `Rednex היא להקת הסקה שוודית`, difficulty: 'medium' },
      { text_he: `הם הפכו את השיר ב-1994 ללהיט יורודאנס עולמי`, difficulty: 'easy' },
      { text_he: `השיר נחשב לאחד הסינגלים המצליחים בתולדות מצעדי האירופה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `השיר נכתב במקור ב-1920 על ידי קומפוזיטור אמריקאי`, difficulty: 'medium' },
      { text_he: `Rednex היא להקה דנית, לא שוודית`, difficulty: 'medium' },
      { text_he: `הם הפכו את השיר ללהיט ב-1990`, difficulty: 'easy' },
      { text_he: `הפולקלוריסטית סקארבורו תיעדה את השיר רק במאה ה-21`, difficulty: 'hard' },
    ],
  },
  q434: { // Mother's Little Helper / Rolling Stones
    trueStatements: [
      { text_he: `בשנות ה-60 היו מיליוני מרשמים של ולְיום (דיאזפם) ותרופות הרגעה אחרות לעקרות בית`, difficulty: 'easy' },
      { text_he: `התופעה התרחשה הן באמריקה והן בבריטניה`, difficulty: 'medium' },
      { text_he: `ההשראה הספציפית הגיעה כשהמהנדס דייוויד הסינגר ביקש מאשתו להביא תרופות הרגעה לאולפן`, difficulty: 'hard' },
      { text_he: `אשתו של הסינגר הביאה ולְיום לאולפן`, difficulty: 'hard' },
      { text_he: `מיק ג'אגר התרגש מזה והתחיל לכתוב את המילים`, difficulty: 'medium' },
      { text_he: `השיר היה הראשון בפופ שעסק בהתמכרות תרופתית של מעמד-ביניים`, difficulty: 'medium' },
      { text_he: `ה-BBC אסר את השיר בעיקר בגלל "הזכרה מפורשת של סמים"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `התרופה המצוטטת בשיר היא Prozac`, difficulty: 'medium' },
      { text_he: `מיק ג'אגר כתב את השיר אחרי ניסיון אישי עם ולְיום`, difficulty: 'hard' },
      { text_he: `ה-BBC שיבחה את השיר כשיר חינוכי על סכנות הסמים`, difficulty: 'easy' },
      { text_he: `התופעה של מרשמים מרובים לתרופות הרגעה הייתה רק בארה"ב, לא בבריטניה`, difficulty: 'medium' },
    ],
  },
  q435: { // Perfect Day / Lou Reed
    trueStatements: [
      { text_he: `השיר נכלל בסרט "Trainspotting" (1996) של דני בויל`, difficulty: 'medium' },
      { text_he: `השיר מופיע בסצנה איקונית של מנת-יתר בסרט`, difficulty: 'medium' },
      { text_he: `הסצנה ב-Trainspotting חיזקה את הפרשנות של "שיר על הרואין"`, difficulty: 'hard' },
      { text_he: `ריד עצמו לא חתום על הפרשנות של "שיר על הרואין"`, difficulty: 'easy' },
      { text_he: `הסינגל של ה-BBC ב-1997 כלל הופעות של בואי, אלטון ג'ון, סטיוארט, היאת'ר סמול ועוד עשרות אמנים`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר נכלל בסרט "Pulp Fiction" של טרנטינו`, difficulty: 'medium' },
      { text_he: `ריד הצהיר במפורש שהשיר עוסק בהרואין`, difficulty: 'easy' },
      { text_he: `הסינגל של ה-BBC ב-1997 כלל רק את לו ריד עצמו`, difficulty: 'hard' },
      { text_he: `הסצנה ב-Trainspotting הייתה דווקא קומית`, difficulty: 'medium' },
    ],
  },
  q436: { // Cocaine / Eric Clapton
    trueStatements: [
      { text_he: `השיר נכתב והוקלט ב-1976 על ידי ג'.ג'. קייל`, difficulty: 'medium' },
      { text_he: `אריק קלפטון כיסה אותו ב-1977`, difficulty: 'easy' },
      { text_he: `קלפטון אמר: "השיר הזה הוא די בחכמה אנטי-קוקאין... אם תקשיבו טוב, ברור שהוא 'נגד'"`, difficulty: 'medium' },
      { text_he: `בהופעות חיות, קלפטון מוסיף לעיתים שורות כמו "that dirty cocaine" כדי להבהיר את העמדה הביקורתית`, difficulty: 'hard' },
      { text_he: `ההפקה אכן נעשתה בתקופה שקלפטון נאבק בהתמכרות לקוקאין שלו עצמו`, difficulty: 'hard' },
      { text_he: `קלפטון ממעט לנגן את השיר בהופעות בעידן המודרני כדי למנוע אי הבנות`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר נכתב על ידי קלפטון עצמו ב-1976`, difficulty: 'medium' },
      { text_he: `קלפטון הצהיר שהשיר הוא חגיגה כנה של תרבות הסמים`, difficulty: 'medium' },
      { text_he: `ההפקה נעשתה בתקופה של פיכחון מוחלט של קלפטון`, difficulty: 'hard' },
      { text_he: `קלפטון מנגן את השיר בכל הופעה שלו עד היום`, difficulty: 'easy' },
    ],
  },
  q437: { // Gangsta's Paradise / Coolio (duplicate of q079)
    trueStatements: [
      { text_he: `סטיבי וונדר היה צריך לאשר את השימוש בלחן של "Pastime Paradise" (1976) שלו`, difficulty: 'medium' },
      { text_he: `וונדר דרש ש-Coolio יסיר את כל הקללות מהטקסט לפני שיאפשר את השימוש`, difficulty: 'easy' },
      { text_he: `Coolio הסכים, ויצר את הגרסה המצונזרת`, difficulty: 'easy' },
      { text_he: `וונדר קיבל קרדיט שותף לכתיבה ותמלוגים מההצלחה הגדולה`, difficulty: 'medium' },
      { text_he: `השיר זכה בגראמי ל-Best Rap Solo Performance ב-1996`, difficulty: 'hard' },
      { text_he: `השיר היה הסינגל הנמכר ביותר של 1995`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `סטיבי וונדר סירב לחלוטין לאשר את השימוש בלחן`, difficulty: 'medium' },
      { text_he: `Coolio סירב להסיר את הקללות והמשיך לשירת הגרסה הגלמית`, difficulty: 'easy' },
      { text_he: `וונדר תבע את Coolio בבית משפט`, difficulty: 'medium' },
      { text_he: `השיר זכה בגראמי לאלבום השנה ב-1996`, difficulty: 'hard' },
    ],
  },
  q438: { // Nights in White Satin / Moody Blues
    trueStatements: [
      { text_he: `ג'סטין הייווארד כתב את השיר בגיל 19`, difficulty: 'medium' },
      { text_he: `הוא כתב אותו בסיבוב הופעות בבלגיה`, difficulty: 'hard' },
      { text_he: `חברתו דאז נתנה לו במתנה סדינים מסטין לבן`, difficulty: 'easy' },
      { text_he: `רבים שומעים בטעות "Knights" (אבירים) במקום "Nights" (לילות)`, difficulty: 'easy' },
      { text_he: `הבלבול הוביל לכיסוי בלגי של ג'ורג'ו מורודר ב-1976 בשם "Knights in White Satin" (בכוונה!)`, difficulty: 'hard' },
      { text_he: `השיר יצא לראשונה ב-3 בנובמבר 1967`, difficulty: 'medium' },
      { text_he: `השיר הפך ללהיט מאוחר ב-1972 כשיצא מחדש ב-FM רדיו אמריקאי`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הייווארד כתב את השיר בגיל 25`, difficulty: 'medium' },
      { text_he: `הסדינים שהיו ההשראה היו מתוצרת איטליה, לא ידוע איזה`, difficulty: 'hard' },
      { text_he: `הכיסוי של מורודר נקרא "Days in White Satin"`, difficulty: 'hard' },
      { text_he: `השיר היה להיט מיידי מיום שחרורו ב-1967`, difficulty: 'medium' },
    ],
  },
  q439: { // Time After Time / Cyndi Lauper
    trueStatements: [
      { text_he: `סינדי לאופר ראתה את השם בעיתון TV Guide`, difficulty: 'medium' },
      { text_he: `הסרט "Time After Time" משנת 1979 הוא של ניקולס מאייר`, difficulty: 'hard' },
      { text_he: `הסרט עוסק ב-ה.ג'. וולס שרודף את ג'ק המרטש בזמן`, difficulty: 'hard' },
      { text_he: `לאופר רצתה להשתמש בשם רק כשם זמני בכתיבה`, difficulty: 'medium' },
      { text_he: `היא התקשרה לשם והרגישה שהשיר "יקרוס בלעדיו"`, difficulty: 'easy' },
      { text_he: `השיר יצא ב-1984 והגיע למקום 1 בבילבורד הוט 100`, difficulty: 'easy' },
      { text_he: `גרסת הכיסוי של מיילס דייויס ב-1985 הפכה אותו לסטנדרט ג'אז`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `לאופר ראתה את השם בעיתון Rolling Stone`, difficulty: 'medium' },
      { text_he: `הסרט "Time After Time" עוסק במסע בזמן רגיל ללא ה.ג'. וולס`, difficulty: 'hard' },
      { text_he: `לאופר תכננה את השם של השיר מההתחלה`, difficulty: 'easy' },
      { text_he: `השיר הגיע רק למקום 5 בבילבורד`, difficulty: 'easy' },
    ],
  },
  q440: { // Wannabe / Spice Girls
    trueStatements: [
      { text_he: `הביטוי "If you wanna be my lover, you gotta get with my friends" הפך לאחד הציטוטים המוכרים ביותר בפופ של 90s`, difficulty: 'easy' },
      { text_he: `הקליפ של ג'ורנה רוז ב-Midland Grand Hotel בלונדון צולם בלילה אחד`, difficulty: 'hard' },
      { text_he: `הקליפ צולם בלי תיכנון מקדים`, difficulty: 'medium' },
      { text_he: `ב-2016 ל-20 שנה לשיר נעשה קליפ מחווה עם קולקטיב ה-Global Goals`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הקליפ צולם במשך שבועיים בסטודיו מקצועי בלוס אנג'לס`, difficulty: 'hard' },
      { text_he: `הקליפ ביוקרטי על ידי דייוויד פינצ'ר`, difficulty: 'medium' },
      { text_he: `ב-2010 נעשה קליפ מחווה לציון 14 שנה לשיר`, difficulty: 'hard' },
      { text_he: `הקליפ צולם בפריז ב-Champs-Élysées`, difficulty: 'easy' },
    ],
  },
  q441: { // Call Me Maybe / Carly Rae Jepsen
    trueStatements: [
      { text_he: `השיר היה הסינגל השני של ג'פסן בקנדה`, difficulty: 'medium' },
      { text_he: `הוא יצא במקור בספטמבר 2011`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 1 בבילבורד הוט 100 בארה"ב ל-9 שבועות ב-2012`, difficulty: 'medium' },
      { text_he: `ג'פסן זכה בגראמי ל-Song of the Year (2013)`, difficulty: 'hard' },
      { text_he: `השיר נכלל ברשימת רולינג סטון של 500 השירים הגדולים בכל הזמנים`, difficulty: 'easy' },
      { text_he: `הוא היה הראשון של אמן קנדי ברשימה הזו אחרי 2010`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר היה הסינגל הראשון של ג'פסן בקריירה שלה`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 בבילבורד למשך 4 שבועות`, difficulty: 'medium' },
      { text_he: `ג'פסן זכה ב-Album of the Year ב-2013`, difficulty: 'hard' },
      { text_he: `השיר לא נכלל ברשימת רולינג סטון`, difficulty: 'easy' },
    ],
  },
  q442: { // Old Town Road / Lil Nas X
    trueStatements: [
      { text_he: `Billboard הסירה את השיר מהמצעד הקאנטרי ב-מרץ 2019`, difficulty: 'medium' },
      { text_he: `הטענה הרשמית: "הוא לא משלב מספיק אלמנטים של מוזיקת קאנטרי של היום"`, difficulty: 'hard' },
      { text_he: `הוויכוח התלקח על גזענות נסתרת בז'אנרים — Lil Nas X הוא אפרו-אמריקאי`, difficulty: 'medium' },
      { text_he: `הוא הוציא ב-5 באפריל 2019 רמיקס עם בילי ריי סיירוס`, difficulty: 'hard' },
      { text_he: `הגרסאות המשולבות של "Old Town Road" עמדו 19 שבועות במקום 1 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `ה-19 שבועות הם שיא בכל הזמנים שעבר את "Despacito" (16 שבועות)`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Billboard הסירה את השיר מהמצעד הקאנטרי בעקבות תלונות מאמני קאנטרי ידועים`, difficulty: 'medium' },
      { text_he: `הרמיקס היה עם דולי פרטון, לא בילי ריי סיירוס`, difficulty: 'hard' },
      { text_he: `הגרסאות המשולבות עמדו 12 שבועות במקום 1`, difficulty: 'medium' },
      { text_he: `"Despacito" עדיין מחזיק בשיא של 19 שבועות במקום 1`, difficulty: 'easy' },
    ],
  },
  q443: { // Thunderstruck / AC/DC
    trueStatements: [
      { text_he: `השיר יצא בספטמבר 1990 מהאלבום "The Razors Edge"`, difficulty: 'medium' },
      { text_he: `הוא הפך לאחד מסמלי הז'אנר`, difficulty: 'easy' },
      { text_he: `הריף הפותח של הגיטרה הוא אחד מהריפים האיקוניים ביותר בהיסטוריה של הרוק`, difficulty: 'medium' },
      { text_he: `השיר משמש עד היום כאנתם של קבוצות ספורט בעולם — מ-NBA דרך NFL ועד הליגות האוסטרליות`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-1985 מהאלבום "Highway to Hell"`, difficulty: 'medium' },
      { text_he: `הריף נחשב לבסיסי ופשוט יחסית בעולם הרוק`, difficulty: 'medium' },
      { text_he: `השיר אסור לנגן באירועי ספורט בארה"ב בעקבות זכויות יוצרים`, difficulty: 'hard' },
      { text_he: `אנגוס יאנג כתב את כל הריף בעצמו ולבד`, difficulty: 'easy' },
    ],
  },
  q444: { // Enter Sandman / Metallica
    trueStatements: [
      { text_he: `הקליפ עם הילד שמטופל מסיוטים זכה בפרס Grammy ל-Best Hard Rock Performance ב-1992`, difficulty: 'hard' },
      { text_he: `השיר הוא ה-Walkout Song של מרינו ריוורה, הפיצ'ר הסגור של ה-Yankees`, difficulty: 'hard' },
      { text_he: `השיר הוא ה-Walkout של ה-NHL בכל המגרשים`, difficulty: 'medium' },
      { text_he: `ב-2009 נמכר רישוי לסרט "תינוק"`, difficulty: 'medium' },
      { text_he: `השיר הוא אחד מהשירים המכניסים ביותר ברוק העולמי`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הקליפ זכה בגראמי לסרטון השנה ב-1992`, difficulty: 'hard' },
      { text_he: `השיר הוא ה-Walkout Song של דרק ג'יטר ב-Yankees`, difficulty: 'hard' },
      { text_he: `השיר אסור לשימוש בליגות ספורט מסיבות זכויות יוצרים`, difficulty: 'medium' },
      { text_he: `הסרט "תינוק" סירב להשתמש בשיר`, difficulty: 'medium' },
    ],
  },
  q445: { // Welcome to the Jungle / Guns N' Roses
    trueStatements: [
      { text_he: `השיר היה הסינגל הראשון מאלבום הבכורה "Appetite for Destruction" (1987)`, difficulty: 'medium' },
      { text_he: `הוא לא הצליח בתחילה`, difficulty: 'easy' },
      { text_he: `אחרי הפצת הקליפ ב-MTV (גרסה לילית בלבד בגלל אלימות), הוא הפך ללהיט`, difficulty: 'hard' },
      { text_he: `הוא הגיע למקום 7 בבילבורד הוט 100 ב-1988`, difficulty: 'medium' },
      { text_he: `השיר נכלל ברשימת 500 השירים הגדולים של רולינג סטון`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר היה להיט מיידי מרגע שחרורו ב-1987`, difficulty: 'easy' },
      { text_he: `הקליפ של השיר ב-MTV היה ללא הגבלת שעות`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 1 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `השיר היה הסינגל השלישי מהאלבום, לא הראשון`, difficulty: 'medium' },
    ],
  },
  q446: { // Umbrella / Rihanna
    trueStatements: [
      { text_he: `הביטוי "ella, ella, ella" הפך לאחד מההוקים הקליטים ביותר בפופ`, difficulty: 'easy' },
      { text_he: `The-Dream סיפר שהמילה "umbrella" "פשוט קפצה לראש שלו" כשהביט נבנה`, difficulty: 'medium' },
      { text_he: `השיר זכה בגראמי ל-Best Rap/Sung Collaboration ב-2008`, difficulty: 'hard' },
      { text_he: `ב-2017 השיר הופיע בסרט "It"`, difficulty: 'hard' },
      { text_he: `בסצנה הילדה ז'ורז'י מנסה לתפוס סירת נייר בגשם`, difficulty: 'medium' },
      { text_he: `הופעת השיר ב"It" הפכה אותו לוויראלי מחדש`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הביטוי "ella, ella, ella" נוסף בלאחרונה על ידי ריהאנה לפני ההקלטה`, difficulty: 'easy' },
      { text_he: `השיר זכה בגראמי לשיר השנה ב-2008`, difficulty: 'hard' },
      { text_he: `השיר הופיע בסרט "Stranger Things" ב-2017`, difficulty: 'hard' },
      { text_he: `הסצנה בסרט עוסקת בילדה שמחביאה מטריה`, difficulty: 'medium' },
    ],
  },
  q447: { // Hips Don't Lie / Shakira
    trueStatements: [
      { text_he: `שאקירה הוסיפה את ה"קולומביאנית" שלה — שילוב בין מקצב סלסה לעיבוד עכשווי של היפ-הופ`, difficulty: 'medium' },
      { text_he: `הקליפ של סופי מולר עם שאקירה רוקדת בקרנבל ברצלונה הפך לאיקוני`, difficulty: 'hard' },
      { text_he: `השיר זכה ב-Latin Grammy ובפרס Billboard`, difficulty: 'medium' },
      { text_he: `הופעת המונדיאל של גרמניה 2006, שבה שאקירה ביצעה את השיר חי, נחשבת לאחת ההופעות הזכורות ביותר בתחרות`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הקליפ צולם בקובה ולא בברצלונה`, difficulty: 'hard' },
      { text_he: `השיר זכה בגראמי לאלבום הלטיני הטוב`, difficulty: 'medium' },
      { text_he: `הופעת המונדיאל של שאקירה הייתה בדרום אפריקה 2010, לא גרמניה 2006`, difficulty: 'easy' },
      { text_he: `שאקירה רקדה ב-Eurovision 2006 — לא ב-מונדיאל`, difficulty: 'medium' },
    ],
  },
  q448: { // Rolling in the Deep / Adele
    trueStatements: [
      { text_he: `השיר היה הסינגל הראשון מאלבום "21" (2011)`, difficulty: 'easy' },
      { text_he: `השיר הפך לסינגל הראשון של אמנית בריטית שעמד במקום 1 בבילבורד הוט 100 שבעה שבועות`, difficulty: 'hard' },
      { text_he: `הוא נחשב לסינגל הנמכר ביותר של 2011 בארה"ב — מעל 5 מיליון עותקים`, difficulty: 'medium' },
      { text_he: `הוא נכלל ברשימת 500 השירים הגדולים של רולינג סטון`, difficulty: 'easy' },
      { text_he: `ביצוע אדל בטקס הגראמי 2012 היה חזרתה הראשונה לבמה אחרי ניתוח גרון`, difficulty: 'hard' },
      { text_he: `הביצוע ההוא נחשב לאחד הרגעים הקלאסיים בהיסטוריית הטקס`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `השיר היה הסינגל השלישי מאלבום "21"`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 1 בבילבורד למשך 3 שבועות בלבד`, difficulty: 'hard' },
      { text_he: `השיר נמכר 1 מיליון עותקים בלבד ב-2011`, difficulty: 'medium' },
      { text_he: `אדל לא הופיעה בטקס הגראמי 2012`, difficulty: 'medium' },
    ],
  },
  q449: { // Someone Like You / Adele
    trueStatements: [
      { text_he: `המחקר על appoggiatura בוצע על ידי הפסיכולוג הבריטי ג'ון סלובודה`, difficulty: 'hard' },
      { text_he: `סלובודה מצא ש-18 מתוך 20 הקטעים המוזיקליים שמעוררים תגובה רגשית מכילים את התופעה`, difficulty: 'hard' },
      { text_he: `אדל הצליחה לבנות את האפקט המדויק הזה אינטואיטיבית, בלי שתדע את המדע מאחוריו`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 1 בבילבורד הוט 100 ל-5 שבועות ב-2011-2012`, difficulty: 'medium' },
      { text_he: `השיר זכה בגראמי ל-Best Pop Solo Performance ב-2012`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `המחקר בוצע על ידי הפסיכולוג האמריקאי דניאל לויטין`, difficulty: 'hard' },
      { text_he: `סלובודה מצא ש-5 מתוך 20 הקטעים המעוררים מכילים את התופעה`, difficulty: 'hard' },
      { text_he: `אדל למדה את הטכניקה במחקר ספציפי לפני כתיבת השיר`, difficulty: 'easy' },
      { text_he: `השיר הגיע רק למקום 5 בבילבורד הוט 100`, difficulty: 'medium' },
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
