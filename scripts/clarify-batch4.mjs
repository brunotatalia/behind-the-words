#!/usr/bin/env node
// Self-contained statements pass — batch 4: q091-q119
// Rule: every statement must be readable in isolation given only the song
// header (title + artist + year). Includes a few typo fixes spotted along
// the way ("המבקר" → "המנגן", "לקה" → "להקה", "ביוקרטי" → "בויים").
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const fixed = {
  q091: { // 1999 / Prince
    trueStatements: [
      { text_he: `פרינס כתב את השיר 1999 בשנת 1982, בשיא המתחים של המלחמה הקרה`, difficulty: 'medium' },
      { text_he: `השיר 1999 נכתב בתקופת ממשל הנשיא רונלד רייגן ובעיצומה של העצמת הנשק הגרעיני בארה"ב`, difficulty: 'medium' },
      { text_he: `השיר 1999 נפתח עם הזמרת הליווי ליסה קולמן ששרה על חלום שבו "השמיים היו סגולים"`, difficulty: 'hard' },
      { text_he: `פרינס שר ב-1999: "לפני שאתן למלחמה הגרעינית לקרות, ארקוד את חיי"`, difficulty: 'medium' },
      { text_he: `בראיון ל-CNN בשנת 1999 אמר פרינס שרצה "לכתוב משהו שייתן תקווה" למרות הזמנים הקשים שצפה כשכתב את השיר`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `פרינס כתב את השיר 1999 בשנת 1979`, difficulty: 'medium' },
      { text_he: `השיר 1999 נכתב בתקופת ממשל הנשיא ביל קלינטון`, difficulty: 'medium' },
      { text_he: `שיינה ה' זיגלר היא הזמרת הליווי שפותחת את השיר 1999`, difficulty: 'hard' },
      { text_he: `פרינס אמר ב-1999 שאיבד את התקווה ולכן כתב את השיר 1999 כשיר חגיגה`, difficulty: 'medium' },
    ],
  },
  q092: { // Kids / MGMT
    trueStatements: [
      { text_he: `אנדרו ואן-וינגרדן, חבר MGMT, הסביר על Kids: "היינו חושבים איך לעשות את שיר הפופ הסטריאוטיפי ביותר, וזה אחד מאלה שעשינו"`, difficulty: 'medium' },
      { text_he: `בן גולדווסר, חבר MGMT, תיאר את התחושה ב-Kids: "להיות בן 19, בעולם הקולג' הפנטסטי, שזה קצת כמו ילדות כי אין לך הרבה אחריות"`, difficulty: 'hard' },
      { text_he: `Kids יצא ב-2007 מאלבום MGMT "Oracular Spectacular"`, difficulty: 'medium' },
      { text_he: `Kids הפך ללהיט רק ב-2008-2009, שנה-שנתיים אחרי שחרורו הראשוני`, difficulty: 'medium' },
      { text_he: `הקליפ הראשון של Kids מ-2008 צולם בלי תקציב כמעט`, difficulty: 'easy' },
      { text_he: `ניקולא סרקוזי, נשיא צרפת אז, השתמש ב-Kids בקמפיין ב-2009 — MGMT תבעו אותו והגיעו לפשרה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `MGMT כתבו את Kids כמסר רציני נגד תרבות הצריכה`, difficulty: 'medium' },
      { text_he: `Kids יצא ב-2010 והפך מיד ללהיט`, difficulty: 'medium' },
      { text_he: `הקליפ של Kids זכה בפרס MTV VMA לסרטון השנה`, difficulty: 'hard' },
      { text_he: `אנגלה מרקל השתמשה ב-Kids בקמפיין הבחירות שלה`, difficulty: 'medium' },
    ],
  },
  q093: { // Skinny Love / Bon Iver
    trueStatements: [
      { text_he: `ג'סטין ורנון, יוצר Bon Iver, נסע לבקתת היומנים המבודדת של אביו בצפון ויסקונסין`, difficulty: 'medium' },
      { text_he: `ג'סטין ורנון נסע לבקתה בויסקונסין אחרי סוף הלהקה הקודמת שלו (DeYarmond Edison) ופרידה רומנטית`, difficulty: 'hard' },
      { text_he: `ג'סטין ורנון חלה במונונוקלאוזיס בתקופה שלפני הקלטת Skinny Love`, difficulty: 'medium' },
      { text_he: `ג'סטין ורנון בילה 3 חודשים בבקתת אביו בויסקונסין בחורף 2007`, difficulty: 'medium' },
      { text_he: `ג'סטין ורנון הקליט לבד בבקתה את כל אלבום הבכורה של Bon Iver, "For Emma, Forever Ago"`, difficulty: 'medium' },
      { text_he: `ג'סטין ורנון הסביר את שם השיר Skinny Love: "אהבה רזה היא להיות במערכת יחסים כי אתה צריך עזרה — אבל לא כי זו הסיבה שאתה צריך להיות בה"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `ג'סטין ורנון נסע לבקתה במונטנה כשכתב את Skinny Love`, difficulty: 'medium' },
      { text_he: `ג'סטין ורנון בילה בבקתה כל החורף — שנה שלמה — כשהקליט את Skinny Love`, difficulty: 'medium' },
      { text_he: `ג'סטין ורנון הקליט את אלבום Bon Iver עם להקה מלאה בבקתה בויסקונסין`, difficulty: 'hard' },
      { text_he: `אלבום הבכורה של Bon Iver שכלל את Skinny Love נקרא "Holocene"`, difficulty: 'medium' },
    ],
  },
  q096: { // We Found Love / Rihanna
    trueStatements: [
      { text_he: `מלינה מטסוקאס, במאית הקליפ של We Found Love, תיארה את הוויז'ן: "השיר הוא על התמכרות ואהבה ואיך זאת התמכרות"`, difficulty: 'medium' },
      { text_he: `המבקרים הצביעו על קווי הדמיון בין מערכת היחסים בקליפ של We Found Love לבין הקשר של ריהאנה עם כריס בראון`, difficulty: 'medium' },
      { text_he: `המפיק קלווין האריס יצר את We Found Love באלתור — "ניגנתי וזימרתי שטויות כדי לראות אם ההברות מתאימות"`, difficulty: 'hard' },
      { text_he: `הקליפ של We Found Love צולם בצפון אירלנד (בעיר באנגור ובלפסט) בספטמבר 2011`, difficulty: 'easy' },
      { text_he: `We Found Love הגיע למקום 1 בבילבורד למשך 10 שבועות`, difficulty: 'medium' },
      { text_he: `We Found Love זכה בגראמי על Best Dance Recording (2013)`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הקליפ של We Found Love צולם בלוס אנג'לס במשך שבוע ב-2011`, difficulty: 'medium' },
      { text_he: `We Found Love הגיע למקום 5 בבילבורד למשך שבוע אחד`, difficulty: 'medium' },
      { text_he: `המפיק של We Found Love היה The-Dream, לא קלווין האריס`, difficulty: 'hard' },
      { text_he: `We Found Love זכה בגראמי לשיר השנה (2013)`, difficulty: 'medium' },
    ],
  },
  q097: { // Summertime Sadness / Lana Del Rey
    trueStatements: [
      { text_he: `הקליפ של Summertime Sadness הופק באפריל-מאי 2012`, difficulty: 'easy' },
      { text_he: `Summertime Sadness נכלל באלבום הבכורה של לאנה דל ריי, "Born to Die"`, difficulty: 'medium' },
      { text_he: `הסגנון "Hollywood Sadcore" — מלודיות מתוקות שמסוות נושאים אפלים — הפך לחתימה של לאנה דל ריי`, difficulty: 'hard' },
      { text_he: `הרמיקס של Cedric Gervais ל-Summertime Sadness הגיע למקום 6 בבילבורד`, difficulty: 'medium' },
      { text_he: `הרמיקס של Cedric Gervais ל-Summertime Sadness הפך ללהיט הסולו הגדול בארה"ב של לאנה דל ריי`, difficulty: 'medium' },
      { text_he: `הרמיקס של Cedric Gervais ל-Summertime Sadness זכה בגראמי לרמיקס הטוב ביותר ב-2014`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הקליפ של Summertime Sadness הופק בלוס אנג'לס באוגוסט 2013`, difficulty: 'medium' },
      { text_he: `Summertime Sadness נכלל באלבום לאנה דל ריי "Ultraviolence" מ-2014`, difficulty: 'medium' },
      { text_he: `הרמיקס של Cedric Gervais ל-Summertime Sadness הגיע למקום 1 בבילבורד למשך שבועיים`, difficulty: 'medium' },
      { text_he: `הרמיקס של Cedric Gervais ל-Summertime Sadness לא זכה לאיזשהן הכרה בפרסי גראמי`, difficulty: 'hard' },
    ],
  },
  q098: { // American Girl / Tom Petty
    trueStatements: [
      { text_he: `שמועה ידועה טוענת ש-American Girl כתוב על סטודנטית מאוניברסיטת פלורידה שקפצה ממגדלי המעונות Beaty Towers`, difficulty: 'medium' },
      { text_he: `דוברת אוניברסיטת פלורידה אישרה שאף אחד מעולם לא קפץ ממגדלי המעונות Beaty Towers`, difficulty: 'medium' },
      { text_he: `מבנה Beaty Towers שעליו דוברת השמועה בעל "חלונות צרים שלא נפתחים, ללא מרפסות" — מה שעושה את הקפיצה לפיזית בלתי-אפשרית`, difficulty: 'hard' },
      { text_he: `טום פטי הסביר בספרו "Conversations with Tom Petty" על השמועה סביב American Girl: "זה הפך למיתוס אורבני ענק בפלורידה. זה פשוט לא נכון בכלל"`, difficulty: 'easy' },
      { text_he: `טום פטי כתב את American Girl בקליפורניה ליד כביש מהיר`, difficulty: 'medium' },
      { text_he: `קולות התנועה ליד הכביש המהיר בקליפורניה הזכירו לטום פטי גלי ים בזמן כתיבת American Girl`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השמועה סביב American Girl טוענת שמדובר בסטודנטית מאוניברסיטת ייל`, difficulty: 'medium' },
      { text_he: `אוניברסיטת פלורידה אישרה שהמקרה שב-American Girl אכן קרה ב-1972`, difficulty: 'medium' },
      { text_he: `טום פטי כתב את American Girl ביוסטון, טקסס`, difficulty: 'hard' },
      { text_he: `טום פטי הצהיר ש-American Girl אכן מבוסס על מקרה אמיתי בפלורידה`, difficulty: 'medium' },
    ],
  },
  q099: { // Losing My Religion / R.E.M.
    trueStatements: [
      { text_he: `מייקל סטייפ, סולן R.E.M., הסביר ש-Losing My Religion הוא "שיר אובססיה קלאסי"`, difficulty: 'medium' },
      { text_he: `מייקל סטייפ תיאר את הסיפור של Losing My Religion: "אדם במסיבה חברתית שיש לו עניין באדם אחר אבל מתבייש לגשת אליו"`, difficulty: 'hard' },
      { text_he: `הביטוי "losing my religion" בדיאלקט הדרומי של ארצות הברית פירושו "לאבד שליטה" או "להגיע לקצה הסבלנות"`, difficulty: 'easy' },
      { text_he: `Losing My Religion היה הסינגל המצליח ביותר של R.E.M`, difficulty: 'medium' },
      { text_he: `Losing My Religion הגיע למקום 4 בבילבורד`, difficulty: 'easy' },
      { text_he: `Losing My Religion זכה בשני פרסי גראמי ב-1992`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `מייקל סטייפ הסביר ש-Losing My Religion עוסק במסע רוחני אישי שעבר`, difficulty: 'medium' },
      { text_he: `הביטוי "losing my religion" בדיאלקט הדרומי פירושו "לאבד אמונה באלוהים"`, difficulty: 'medium' },
      { text_he: `Losing My Religion הגיע למקום 1 בבילבורד`, difficulty: 'easy' },
      { text_he: `Losing My Religion זכה ב-5 פרסי גראמי ב-1992`, difficulty: 'hard' },
    ],
  },
  q100: { // Karma Police / Radiohead
    trueStatements: [
      { text_he: `הביטוי "Karma Police" נולד כבדיחה פנימית בלהקת Radiohead`, difficulty: 'medium' },
      { text_he: `כשמישהו התנהג רע באולפן של Radiohead, חברי הלהקה אמרו "המשטרת קארמה תתפוס אותך"`, difficulty: 'hard' },
      { text_he: `תום יורק, סולן Radiohead, הסביר על Karma Police: "זה למישהו שצריך לעבוד בחברה גדולה. זה שיר נגד בוסים"`, difficulty: 'medium' },
      { text_he: `תום יורק קרא בלהט בהקלטות Karma Police: "f*ck the middle management!"`, difficulty: 'hard' },
      { text_he: `Karma Police יצא ב-25 באוגוסט 1997 כסינגל השני מאלבום Radiohead "OK Computer"`, difficulty: 'easy' },
      { text_he: `הקליפ של Karma Police בבימוי ג'ונתן גלייזר, עם המכונית הרודפת אחרי אדם, הפך לאיקוני`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הביטוי "Karma Police" הוא ציטוט מטקס בודהיסטי שתום יורק קרא עליו`, difficulty: 'medium' },
      { text_he: `תום יורק הסביר ש-Karma Police נכתב על הניהול של חברת התקליטים EMI`, difficulty: 'hard' },
      { text_he: `Karma Police היה הסינגל הראשון מאלבום Radiohead "OK Computer"`, difficulty: 'medium' },
      { text_he: `הקליפ של Karma Police בויים על ידי ספייק ג'ונז`, difficulty: 'medium' },
    ],
  },
  q101: { // Maps / Yeah Yeah Yeahs
    trueStatements: [
      { text_he: `נטען שראשי התיבות של "Maps" הם "My Angus Please Stay"`, difficulty: 'medium' },
      { text_he: `אנגוס אנדרו, שעליו לכאורה כותבים ראשי התיבות של Maps, הוא סולן הלהקה Liars והיה חבר של קארן או, סולנית Yeah Yeah Yeahs`, difficulty: 'hard' },
      { text_he: `Yeah Yeah Yeahs מעולם לא אישרו רשמית את ראשי התיבות של Maps`, difficulty: 'medium' },
      { text_he: `הדמעות של קארן או בקליפ של Maps הן אמיתיות — אנגוס אנדרו איחר ב-3 שעות לצילומים`, difficulty: 'medium' },
      { text_he: `קארן או "כמעט עזבה לסיבוב הופעות" כשחשבה שאנגוס אנדרו לא מגיע לצילומי הקליפ של Maps`, difficulty: 'hard' },
      { text_he: `Maps יצא ב-2003 מאלבום הבכורה של Yeah Yeah Yeahs, "Fever to Tell"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `נטען שראשי התיבות של "Maps" הם "My Always Permanent Soulmate"`, difficulty: 'medium' },
      { text_he: `אנגוס אנדרו, שעליו לכאורה Maps, היה אחיה של קארן או`, difficulty: 'medium' },
      { text_he: `Yeah Yeah Yeahs אישרו את ראשי התיבות של Maps בריאיון רשמי ב-2008`, difficulty: 'hard' },
      { text_he: `הדמעות של קארן או בקליפ של Maps הן משחק מקצועי`, difficulty: 'medium' },
    ],
  },
  q102: { // The Sound of Silence / Simon & Garfunkel
    trueStatements: [
      { text_he: `פול סיימון הסביר על כתיבת The Sound of Silence: "הייתי הולך לחדר האמבטיה כי לאמבטיה היו אריחים — חדר עם הד קל"`, difficulty: 'medium' },
      { text_he: `פול סיימון הוסיף על כתיבת The Sound of Silence: "הייתי פותח את הברז כדי שהמים יזרמו... והייתי מנגן. בחושך"`, difficulty: 'hard' },
      { text_he: `המפיק טום ווילסון הוסיף ל-The Sound of Silence גיטרות חשמליות, באס ותופים בלי ליידע את סיימון וגרפונקל`, difficulty: 'medium' },
      { text_he: `התוספת של הכלים החשמליים ל-The Sound of Silence נעשתה ביוני 1965`, difficulty: 'medium' },
      { text_he: `הוספת הכלים החשמליים ל-The Sound of Silence הפכה אותו מבלדה אקוסטית כושלת ללהיט מספר 1`, difficulty: 'easy' },
      { text_he: `הגרסה החשמלית של The Sound of Silence הגיעה למקום 1 בבילבורד בינואר 1966`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `פול סיימון כתב את The Sound of Silence במטבח של אמו`, difficulty: 'medium' },
      { text_he: `סיימון וגרפונקל אישרו מראש את הוספת הגיטרות החשמליות ל-The Sound of Silence`, difficulty: 'medium' },
      { text_he: `הגרסה החשמלית של The Sound of Silence הגיעה רק למקום 5 בבילבורד`, difficulty: 'medium' },
      { text_he: `הגרסה האקוסטית הראשונה של The Sound of Silence הייתה להיט מיידי`, difficulty: 'hard' },
    ],
  },
  q104: { // Baba O'Riley / The Who
    trueStatements: [
      { text_he: `Baba O'Riley נכלל באלבום The Who "Who's Next" מאוקטובר 1971`, difficulty: 'easy' },
      { text_he: `אלבום "Who's Next" שכלל את Baba O'Riley נוצר מהריסות אופרת הרוק "Lifehouse" של פיט טאונסנד שלא הצליחה`, difficulty: 'hard' },
      { text_he: `הסינתיסייזר ARP בפתיחת Baba O'Riley היה מהפכני בזמנו`, difficulty: 'medium' },
      { text_he: `חלק הכינור הקלאסי לקראת סוף Baba O'Riley נוגן על ידי הכנר דייב ארביוס`, difficulty: 'medium' },
      { text_he: `הכנר דייב ארביוס נפטר זמן קצר אחרי הקלטת חלקו ב-Baba O'Riley`, difficulty: 'medium' },
      { text_he: `ב-2008 Baba O'Riley נכלל ברשימת 500 השירים הגדולים בכל הזמנים של מגזין רולינג סטון`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Baba O'Riley נכלל באלבום The Who "Tommy" מ-1969`, difficulty: 'medium' },
      { text_he: `הסינתיסייזר Moog בפתיחת Baba O'Riley הוא הראשון אי פעם בשיר רוק`, difficulty: 'hard' },
      { text_he: `חלק הכינור ב-Baba O'Riley נוגן על ידי הכנר יהודי מנוחין`, difficulty: 'medium' },
      { text_he: `דייב ארביוס המשיך לנגן עם The Who למשך שנים אחרי Baba O'Riley`, difficulty: 'medium' },
    ],
  },
  q105: { // Biko / Peter Gabriel
    trueStatements: [
      { text_he: `סטיב ביקו, פעיל אנטי-אפרטהייד דרום אפריקאי שעליו השיר Biko, נפטר ב-12 בספטמבר 1977`, difficulty: 'medium' },
      { text_he: `סטיב ביקו נפטר אחרי מעצר משטרתי קשה בעיר פורט אליזבת בדרום אפריקה`, difficulty: 'medium' },
      { text_he: `פיטר גבריאל שמע את הידיעה על מות סטיב ביקו דרך BBC`, difficulty: 'hard' },
      { text_he: `פיטר גבריאל ערך מחקר על חייו של סטיב ביקו לפני שכתב את השיר Biko`, difficulty: 'medium' },
      { text_he: `Biko יצא באוגוסט 1980`, difficulty: 'easy' },
      { text_he: `השורה ב-Biko "אתה יכול לפוצץ נר אבל לא לפוצץ אש — ברגע שהלהבות מתחילות, הרוח רק תחיה אותן" הפכה לאחד הציטוטים הפוליטיים המוכרים ברוק`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `סטיב ביקו נפטר ב-1976 בקייפטאון`, difficulty: 'medium' },
      { text_he: `פיטר גבריאל שמע על מות סטיב ביקו בכתבה במגזין Time`, difficulty: 'hard' },
      { text_he: `Biko יצא ב-1985, אחרי שחרורו של נלסון מנדלה מהכלא`, difficulty: 'medium' },
      { text_he: `פיטר גבריאל מעולם לא ביקר בדרום אפריקה לפני כתיבת Biko`, difficulty: 'medium' },
    ],
  },
  q107: { // Blue Monday / New Order
    trueStatements: [
      { text_he: `ברנארד סאמנר, סולן New Order, כתב את מילי Blue Monday תחת השפעת LSD`, difficulty: 'medium' },
      { text_he: `ברנארד סאמנר אמר במפורש על Blue Monday: "המילים לא על איאן קרטיס. רצינו שזה יהיה מעורפל"`, difficulty: 'hard' },
      { text_he: `פיטר הוק, בסיסט New Order, הוסיף שאין הרבה מאחורי המילים של Blue Monday — "ברני [סאמנר] פשוט עשה את זה"`, difficulty: 'hard' },
      { text_he: `ההשראה לשם "Blue Monday" הייתה מאיור בספר "Breakfast of Champions" של קורט וונגוט`, difficulty: 'medium' },
      { text_he: `השם "Blue Monday" נשאל גם משיר בלוז של פאטס דומינו`, difficulty: 'medium' },
      { text_he: `Blue Monday יצא במרץ 1983 כסינגל 12-אינץ' — הסינגל 12-אינץ' הנמכר ביותר אי פעם בבריטניה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ברנארד סאמנר כתב את Blue Monday בשבעת הימים שאחרי מותו של איאן קרטיס`, difficulty: 'medium' },
      { text_he: `ברנארד סאמנר הצהיר ש-Blue Monday הוא מחווה ישירה לאיאן קרטיס`, difficulty: 'medium' },
      { text_he: `ההשראה לשם "Blue Monday" באה מספרו של ארנסט המינגוויי`, difficulty: 'hard' },
      { text_he: `Blue Monday יצא כסינגל 7-אינץ' רגיל`, difficulty: 'medium' },
    ],
  },
  q108: { // By the Rivers of Babylon / Boney M
    trueStatements: [
      { text_he: `המקור של By the Rivers of Babylon הוא הגרסה הרסטמית של ה-Melodians מ-1970`, difficulty: 'hard' },
      { text_he: `הגרסה המקורית של By the Rivers of Babylon משלבת את תהילים קל"ז עם נחמיה א ו-ירמיהו ל"א`, difficulty: 'medium' },
      { text_he: `Boney M — להקה גרמנית בהפקת פרנק פאריאן — הפכה את By the Rivers of Babylon ב-1978 ללהיט דיסקו עולמי`, difficulty: 'medium' },
      { text_he: `הגרסה של Boney M ל-By the Rivers of Babylon עמדה 5 שבועות במקום 1 בבריטניה`, difficulty: 'easy' },
      { text_he: `By the Rivers of Babylon בביצוע Boney M נכלל בעשירייה הראשונה של הסינגלים הנמכרים אי פעם בבריטניה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `המקור של By the Rivers of Babylon הוא של בוב מארלי מ-1972`, difficulty: 'medium' },
      { text_he: `הגרסה של Boney M ל-By the Rivers of Babylon עמדה 5 שבועות במקום 1 בארה"ב`, difficulty: 'medium' },
      { text_he: `Boney M הייתה להקה ג'מייקאית בהפקת בריטים`, difficulty: 'hard' },
      { text_he: `הגרסה של Boney M ל-By the Rivers of Babylon נחשבת לכישלון מסחרי`, difficulty: 'medium' },
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
