#!/usr/bin/env node
// Batch 4: q093-q320 (30 questions, with gaps)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const statements = {
  q093: { // Skinny Love / Bon Iver
    trueStatements: [
      { text_he: `ג'סטין ורנון נסע לבקתת היומנים המבודדת של אביו בצפון ויסקונסין`, difficulty: 'medium' },
      { text_he: `הוא נסע לשם אחרי סוף הלהקה הקודמת שלו (DeYarmond Edison) ופרידה רומנטית`, difficulty: 'hard' },
      { text_he: `ורנון חלה במונונוקלאוזיס בתקופה ההיא`, difficulty: 'hard' },
      { text_he: `הוא בילה 3 חודשים בבקתה בחורף 2007`, difficulty: 'medium' },
      { text_he: `הוא הקליט את כל אלבום הבכורה "For Emma, Forever Ago" לבד בבקתה`, difficulty: 'easy' },
      { text_he: `ורנון הסביר: "אהבה רזה היא להיות במערכת יחסים כי אתה צריך עזרה — אבל לא כי זו הסיבה שאתה צריך להיות בה"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `ורנון נסע לבקתה במונטנה`, difficulty: 'medium' },
      { text_he: `הוא בילה בבקתה כל החורף — כשנה שלמה`, difficulty: 'hard' },
      { text_he: `ורנון הקליט את האלבום עם להקה מלאה בבקתה`, difficulty: 'easy' },
      { text_he: `אלבום הבכורה של בון איבר נקרא "Holocene"`, difficulty: 'medium' },
    ],
  },
  q096: { // We Found Love / Rihanna
    trueStatements: [
      { text_he: `הבמאית מלינה מטסוקאס תיארה את הוויז'ן: "השיר הוא על התמכרות ואהבה ואיך זאת התמכרות"`, difficulty: 'medium' },
      { text_he: `המבקרים הצביעו על קווי הדמיון בין מערכת היחסים בקליפ לבין הקשר של ריהאנה עם כריס בראון`, difficulty: 'hard' },
      { text_he: `המפיק קלווין האריס יצר את השיר באלתור — "ניגנתי וזימרתי שטויות כדי לראות אם ההברות מתאימות"`, difficulty: 'medium' },
      { text_he: `הקליפ צולם בצפון אירלנד (בעיר באנגור ובלפסט) בספטמבר 2011`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 1 בבילבורד ל-10 שבועות`, difficulty: 'easy' },
      { text_he: `השיר זכה בגראמי על Best Dance Recording (2013)`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הקליפ צולם בלוס אנג'לס במשך שבוע ב-2011`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 5 בבילבורד למשך שבוע`, difficulty: 'easy' },
      { text_he: `המפיק של השיר היה The-Dream, לא קלווין האריס`, difficulty: 'medium' },
      { text_he: `השיר זכה בגראמי לשיר השנה (2013)`, difficulty: 'medium' },
    ],
  },
  q097: { // Summertime Sadness / Lana Del Rey
    trueStatements: [
      { text_he: `הקליפ הופק באפריל-מאי 2012`, difficulty: 'medium' },
      { text_he: `השיר נכלל באלבום הבכורה של דל ריי "Born to Die"`, difficulty: 'easy' },
      { text_he: `הסגנון של "Hollywood Sadcore" — מלודיות מתוקות שמסוות נושאים אפלים — הפך לחתימה שלה`, difficulty: 'medium' },
      { text_he: `הרמיקס של Cedric Gervais הגיע למקום 6 בבילבורד`, difficulty: 'hard' },
      { text_he: `הרמיקס של ג'רביי הפך ללהיט הסולו הגדול בארה"ב של דל ריי`, difficulty: 'medium' },
      { text_he: `הרמיקס זכה בגראמי לרמיקס הטוב ביותר ב-2014`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הקליפ הופק בלוס אנג'לס באוגוסט 2013`, difficulty: 'medium' },
      { text_he: `השיר נכלל באלבום "Ultraviolence" של דל ריי מ-2014`, difficulty: 'easy' },
      { text_he: `הרמיקס של ג'רביי הגיע למקום 1 בבילבורד למשך שבועיים`, difficulty: 'hard' },
      { text_he: `הרמיקס לא זכה לאיזשהן הכרה בפרסי גראמי`, difficulty: 'easy' },
    ],
  },
  q098: { // American Girl / Tom Petty
    trueStatements: [
      { text_he: `השמועה טוענת שהשיר על סטודנטית מאוניברסיטת פלורידה שקפצה ממגדלי Beaty Towers`, difficulty: 'medium' },
      { text_he: `דוברת אוניברסיטת פלורידה אישרה שאף אחד מעולם לא קפץ ממגדלי Beaty Towers`, difficulty: 'easy' },
      { text_he: `בניין Beaty Towers בעל "חלונות צרים שלא נפתחים ללא מרפסות"`, difficulty: 'hard' },
      { text_he: `פטי הסביר בספרו "Conversations with Tom Petty": "זה הפך למיתוס אורבני ענק בפלורידה. זה פשוט לא נכון בכלל"`, difficulty: 'medium' },
      { text_he: `פטי כתב את השיר בקליפורניה ליד כביש מהיר`, difficulty: 'hard' },
      { text_he: `קולות התנועה ליד הכביש המהיר הזכירו לפטי את גלי הים`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השמועה טוענת שמדובר בסטודנטית מאוניברסיטת ייל`, difficulty: 'medium' },
      { text_he: `אוניברסיטת פלורידה אישרה שהמקרה אכן קרה ב-1972`, difficulty: 'easy' },
      { text_he: `פטי כתב את השיר ביוסטון, טקסס`, difficulty: 'hard' },
      { text_he: `פטי הצהיר שהשיר אכן מבוסס על מקרה אמיתי`, difficulty: 'medium' },
    ],
  },
  q099: { // Losing My Religion / R.E.M.
    trueStatements: [
      { text_he: `סטייפ הסביר שזה "שיר אובססיה קלאסי"`, difficulty: 'medium' },
      { text_he: `סטייפ תיאר את הסיפור: "אדם במסיבה חברתית שיש לו עניין באדם אחר אבל מתבייש לגשת אליו"`, difficulty: 'hard' },
      { text_he: `הביטוי "losing my religion" בדיאלקט הדרומי של ארצות הברית פירושו "לאבד שליטה" או "להגיע לקצה הסבלנות"`, difficulty: 'easy' },
      { text_he: `השיר היה הסינגל המצליח ביותר של R.E.M`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 4 בבילבורד`, difficulty: 'hard' },
      { text_he: `השיר זכה בשני פרסי גראמי ב-1992`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `סטייפ הסביר שהשיר עוסק במסע רוחני אישי`, difficulty: 'medium' },
      { text_he: `הביטוי בדיאלקט הדרומי פירושו "לאבד אמונה באלוהים"`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 1 בבילבורד`, difficulty: 'hard' },
      { text_he: `השיר זכה ב-5 פרסי גראמי ב-1992`, difficulty: 'medium' },
    ],
  },
  q100: { // Karma Police / Radiohead
    trueStatements: [
      { text_he: `הביטוי "Karma Police" נולד כבדיחה פנימית בלהקה`, difficulty: 'medium' },
      { text_he: `כשמישהו התנהג רע באולפן, אמרו "המשטרת קארמה תתפוס אותך"`, difficulty: 'easy' },
      { text_he: `תום יורק הסביר: "זה למישהו שצריך לעבוד בחברה גדולה. זה שיר נגד בוסים"`, difficulty: 'hard' },
      { text_he: `יורק קרא בלהט: "f*ck the middle management!"`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-25 באוגוסט 1997 כסינגל השני מ-OK Computer`, difficulty: 'medium' },
      { text_he: `הקליפ של ג'ונתן גלייזר עם המכונית הרודפת אחרי אדם הפך לאיקוני`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הביטוי "Karma Police" הוא ציטוט מטקס בודהיסטי שיורק קרא עליו`, difficulty: 'medium' },
      { text_he: `יורק הסביר שהשיר נכתב על הניהול של חברת התקליטים EMI`, difficulty: 'hard' },
      { text_he: `השיר היה הסינגל הראשון מאלבום OK Computer`, difficulty: 'medium' },
      { text_he: `הקליפ ביוקרטי על ידי ספייק ג'ונז`, difficulty: 'easy' },
    ],
  },
  q101: { // Maps / Yeah Yeah Yeahs
    trueStatements: [
      { text_he: `נטען שראשי התיבות של 'Maps' הם "My Angus Please Stay"`, difficulty: 'medium' },
      { text_he: `אנגוס אנדרו הוא סולן הלהקה Liars והיה חברה של קארן או`, difficulty: 'hard' },
      { text_he: `הלהקה מעולם לא אישרה רשמית את ראשי התיבות`, difficulty: 'medium' },
      { text_he: `הדמעות של קארן או בקליפ הן אמיתיות — אנגוס איחר ב-3 שעות לצילומים`, difficulty: 'easy' },
      { text_he: `קארן או "כמעט עזבה לסיבוב הופעות" כשחשבה שאנגוס לא מגיע`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-2003 מאלבום הבכורה Fever to Tell`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `נטען שראשי התיבות של MAPS הם "My Always Permanent Soulmate"`, difficulty: 'medium' },
      { text_he: `אנגוס היה אחיה של קארן או`, difficulty: 'hard' },
      { text_he: `הלהקה אישרה את ראשי התיבות בריאיון רשמי ב-2008`, difficulty: 'medium' },
      { text_he: `הדמעות של קארן או בקליפ הן משחק מקצועי`, difficulty: 'easy' },
    ],
  },
  q102: { // The Sound of Silence / Simon & Garfunkel
    trueStatements: [
      { text_he: `סיימון הסביר: "הייתי הולך לחדר האמבטיה כי לאמבטיה היו אריחים — חדר עם הד קל"`, difficulty: 'medium' },
      { text_he: `סיימון הוסיף: "הייתי פותח את הברז כדי שהמים יזרמו... והייתי מנגן. בחושך"`, difficulty: 'hard' },
      { text_he: `המפיק טום ווילסון הוסיף גיטרות חשמליות, באס ותופים בלי ליידע את הצמד`, difficulty: 'easy' },
      { text_he: `התוספת נעשתה ביוני 1965`, difficulty: 'hard' },
      { text_he: `הוספת הכלים הפכה את השיר מבלדה אקוסטית כושלת ללהיט מספר 1`, difficulty: 'medium' },
      { text_he: `הגרסה החשמלית הגיעה למקום 1 בבילבורד בינואר 1966`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `סיימון כתב את השיר במטבח של אמו`, difficulty: 'medium' },
      { text_he: `הצמד אישר מראש את ההפקה הראשונית של גיטרות חשמליות`, difficulty: 'easy' },
      { text_he: `הגרסה החשמלית הגיעה למקום 5 בבילבורד`, difficulty: 'medium' },
      { text_he: `הגרסה האקוסטית הראשונה הייתה להיט מיידי`, difficulty: 'hard' },
    ],
  },
  q104: { // Baba O'Riley / The Who
    trueStatements: [
      { text_he: `השיר נכלל באלבום "Who's Next" מאוקטובר 1971`, difficulty: 'medium' },
      { text_he: `האלבום נוצר מהריסות אופרת הרוק "Lifehouse" שלא הצליחה`, difficulty: 'hard' },
      { text_he: `הסינתיסייזר ARP בפתיחה היה מהפכני בזמנו`, difficulty: 'easy' },
      { text_he: `החלק הכינור הקלאסי לקראת הסוף נוגן על ידי המבקר דייב ארביוס`, difficulty: 'hard' },
      { text_he: `דייב ארביוס נפטר אחרי הקלטת חלקו בשיר`, difficulty: 'hard' },
      { text_he: `ב-2008 השיר נכלל ברשימת 500 השירים הגדולים בכל הזמנים של רולינג סטון`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `השיר נכלל באלבום "Tommy" של 1969`, difficulty: 'medium' },
      { text_he: `הסינתיסייזר Moog בפתיחה הוא הראשון אי פעם בשיר רוק`, difficulty: 'easy' },
      { text_he: `החלק הכינור נוגן על ידי יהודי מנוחין`, difficulty: 'hard' },
      { text_he: `דייב ארביוס המשיך לנגן עם הלהקה למשך שנים`, difficulty: 'hard' },
    ],
  },
  q105: { // Biko / Peter Gabriel
    trueStatements: [
      { text_he: `סטיב ביקו, פעיל אנטי-אפרטהייד דרום אפריקאי, נפטר ב-12 בספטמבר 1977`, difficulty: 'medium' },
      { text_he: `ביקו נפטר אחרי מעצר משטרתי קשה בפורט אליזבת`, difficulty: 'hard' },
      { text_he: `גבריאל שמע את הידיעה דרך BBC`, difficulty: 'easy' },
      { text_he: `גבריאל ערך מחקר על חייו של ביקו לפני שכתב את השיר`, difficulty: 'medium' },
      { text_he: `השיר יצא באוגוסט 1980`, difficulty: 'hard' },
      { text_he: `השורה "אתה יכול לפוצץ נר אבל לא לפוצץ אש — ברגע שהלהבות מתחילות, הרוח רק תחיה אותן" הפכה לאחד הציטוטים הפוליטיים המוכרים ברוק`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `סטיב ביקו נפטר ב-1976 בקייפטאון`, difficulty: 'medium' },
      { text_he: `גבריאל שמע על מותו של ביקו בכתבה ב-Time Magazine`, difficulty: 'easy' },
      { text_he: `השיר יצא ב-1985, אחרי שחרורו של נלסון מנדלה מהכלא`, difficulty: 'hard' },
      { text_he: `גבריאל מעולם לא ביקר בדרום אפריקה לפני כתיבת השיר`, difficulty: 'medium' },
    ],
  },
  q107: { // Blue Monday / New Order
    trueStatements: [
      { text_he: `ברנארד סאמנר כתב את המילים תחת השפעת LSD`, difficulty: 'medium' },
      { text_he: `סאמנר אמר במפורש: "הם לא על איאן קרטיס. רצינו שזה יהיה מעורפל"`, difficulty: 'easy' },
      { text_he: `פיטר הוק הוסיף שאין הרבה מאחורי המילים — "ברני פשוט עשה את זה"`, difficulty: 'hard' },
      { text_he: `ההשראה לשם הייתה מאיור ב-"Breakfast of Champions" של קורט וונגוט`, difficulty: 'hard' },
      { text_he: `השם נשאל גם משיר בלוז של פאטס דומינו`, difficulty: 'medium' },
      { text_he: `השיר יצא במרץ 1983 כסינגל 12-אינץ' — הסינגל הגדול ביותר של 12-אינץ' שנמכר אי פעם בבריטניה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `סאמנר כתב את המילים בשבעת הימים שאחרי מותו של איאן קרטיס`, difficulty: 'medium' },
      { text_he: `סאמנר הצהיר שהשיר הוא מחווה ישירה לאיאן קרטיס`, difficulty: 'easy' },
      { text_he: `ההשראה לשם באה מספרו של ארנסט המינגוויי`, difficulty: 'hard' },
      { text_he: `השיר היה סינגל 7-אינץ' רגיל`, difficulty: 'medium' },
    ],
  },
  q108: { // By the Rivers of Babylon / Boney M
    trueStatements: [
      { text_he: `המקור של השיר הוא הגרסה הרסטמית של ה-Melodians מ-1970`, difficulty: 'hard' },
      { text_he: `הגרסה משלבת את תהילים קל"ז עם נחמיה א ו-ירמיהו ל"א`, difficulty: 'hard' },
      { text_he: `בוני אם — לקה גרמנית בהפקת פרנק פאריאן — הפכה את השיר ב-1978 ללהיט דיסקו עולמי`, difficulty: 'medium' },
      { text_he: `הגרסה של בוני אם עמדה 5 שבועות במקום 1 בבריטניה`, difficulty: 'medium' },
      { text_he: `הוא נכלל בעשירייה הראשונה של הסינגלים הנמכרים אי פעם בבריטניה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `המקור של השיר הוא של בוב מארלי מ-1972`, difficulty: 'hard' },
      { text_he: `הגרסה של בוני אם עמדה 5 שבועות במקום 1 בארה"ב`, difficulty: 'medium' },
      { text_he: `בוני אם הייתה להקה ג'מייקנית בהפקת ברטריקס`, difficulty: 'medium' },
      { text_he: `הגרסה של בוני אם נחשבת לכישלון מסחרי`, difficulty: 'easy' },
    ],
  },
  q300: { // Despacito / Luis Fonsi
    trueStatements: [
      { text_he: `השיר היה הסינגל השני הגדול של 2017 ב-Billboard Hot 100`, difficulty: 'medium' },
      { text_he: `השיר עמד 16 שבועות במקום 1`, difficulty: 'easy' },
      { text_he: `הקליפ של בריאן פרס היה הראשון אי פעם להגיע ל-3 מיליארד צפיות ב-YouTube (אוגוסט 2017)`, difficulty: 'hard' },
      { text_he: `הצמד פונסי-יאנקי כתבו את השיר בפורטו ריקו על מקצב רגאטון איטי`, difficulty: 'medium' },
      { text_he: `הרמיקס עם ביבר תרם לחזרת המוזיקה הלטינית למיינסטרים העולמי`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר עמד 30 שבועות במקום 1 בבילבורד`, difficulty: 'medium' },
      { text_he: `הקליפ היה הראשון להגיע ל-1 מיליארד צפיות בלבד`, difficulty: 'hard' },
      { text_he: `פונסי-יאנקי כתבו את השיר ביוסטון, טקסס`, difficulty: 'medium' },
      { text_he: `השיר היה היחיד בספרדית בעשירייה הראשונה של 2017`, difficulty: 'easy' },
    ],
  },
  q302: { // Hijo de la Luna / Mecano
    trueStatements: [
      { text_he: `השיר נכתב על ידי חוסה מריה קאנו מ-Mecano`, difficulty: 'medium' },
      { text_he: `הסולנית אנה תורוחה היא ששרה את השיר, אבל לא כתבה אותו`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-1986 באלבום "Entre el cielo y el suelo"`, difficulty: 'medium' },
      { text_he: `התינוק נולד לבקן (אלבינו) בגלל היותו "בן הירח"`, difficulty: 'easy' },
      { text_he: `האב חושב שזה עדות לבגידה ורוצח את האם בסכין`, difficulty: 'medium' },
      { text_he: `הסיפור מבוסס על אגדה רומאני (צוענים) קלאסית`, difficulty: 'hard' },
      { text_he: `השיר זכה לכיסויים ב-12 שפות`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר נכתב על ידי הסולנית אנה תורוחה`, difficulty: 'medium' },
      { text_he: `השיר יצא ב-1990 באלבום "Aidalai"`, difficulty: 'medium' },
      { text_he: `התינוק נולד שחור, מה שגרם לחשד הבגידה`, difficulty: 'easy' },
      { text_he: `הסיפור מבוסס על אגדה יוונית עתיקה`, difficulty: 'hard' },
    ],
  },
  q303: { // Gasolina / Daddy Yankee
    trueStatements: [
      { text_he: `דאדי יאנקי הכחיש במפורש: "השיר לחלוטין מילולי. זה השיר הכי תמים שכתבתי"`, difficulty: 'easy' },
      { text_he: `השיר יצא ב-2004 ונחשב למבשר הפריצה הגלובלית של הרגאטון`, difficulty: 'medium' },
      { text_he: `הוא הגיע למקום 32 בבילבורד הוט 100 — דבר נדיר ביותר לשיר ספרדית בלעדית באותה תקופה`, difficulty: 'hard' },
      { text_he: `ב-2008 ג'ון מקיין השתמש בשיר בקמפיין הנשיאות שלו`, difficulty: 'hard' },
      { text_he: `השימוש של מקיין עורר ויכוח אם הוא וצוותו "הבינו את הדאבל-אנטנדרים"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `דאדי יאנקי אישר שהשיר הוא מטאפורה מינית`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 1 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `ב-2008 ברק אובמה השתמש בשיר בקמפיין הנשיאות שלו`, difficulty: 'hard' },
      { text_he: `השיר נכתב במקור באנגלית ותורגם לספרדית`, difficulty: 'medium' },
    ],
  },
  q305: { // Lambada / Kaoma
    trueStatements: [
      { text_he: `קאומה זוקפת קרדיט ל"שיקו דה אוליבירה" המומצא במקום למחברים האמיתיים`, difficulty: 'hard' },
      { text_he: `המחברים האמיתיים הם Los Kjarkas הבוליביאניים`, difficulty: 'medium' },
      { text_he: `Los Kjarkas רישמו את היצירה ב-1981 במכון התרבות הבוליביאני (IBC)`, difficulty: 'hard' },
      { text_he: `אחרי מספר תביעות שהחלו ב-1990, הם זכו בזכויות היוצרים`, difficulty: 'medium' },
      { text_he: `השיר המקורי הוא בעצמו עיבוד למוזיקה אנדינית מסורתית בסגנון "סיאוי"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `קאומה זקפה את הקרדיט הראשוני לעצמה ולא אזכרה אף מקור`, difficulty: 'hard' },
      { text_he: `Los Kjarkas היא להקה ארגנטינאית, לא בוליביאנית`, difficulty: 'medium' },
      { text_he: `Los Kjarkas הפסידו לבסוף את התביעה לזכויות היוצרים`, difficulty: 'medium' },
      { text_he: `השיר המקורי הוא יצירה מקורית לחלוטין של Los Kjarkas`, difficulty: 'hard' },
    ],
  },
  q306: { // La Tortura / Shakira
    trueStatements: [
      { text_he: `השיר יצא ב-11 באפריל 2005 כסינגל הראשון מאלבום "Fijación Oral, Vol. 1"`, difficulty: 'medium' },
      { text_he: `זהו הדואט הראשון של שאקירה ואלחנדרו סאנז`, difficulty: 'medium' },
      { text_he: `השיר עמד 25 שבועות במקום 1 ב-Hot Latin Songs`, difficulty: 'hard' },
      { text_he: `שיא הבילבורד הזה נשבר רק על ידי "Despacito" ב-2017`, difficulty: 'hard' },
      { text_he: `הקליפ של מייקל הוסמן זכה ב-Latin Grammy לקליפ הטוב ביותר`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-2003 כסינגל מאלבום "Laundry Service"`, difficulty: 'medium' },
      { text_he: `זה היה הדואט החמישי של שאקירה ואלחנדרו סאנז`, difficulty: 'medium' },
      { text_he: `השיר עמד 5 שבועות במקום 1 בלבד`, difficulty: 'hard' },
      { text_he: `הקליפ זכה ב-MTV VMA לקליפ הטוב`, difficulty: 'easy' },
    ],
  },
  q308: { // Aserejé / Las Ketchup
    trueStatements: [
      { text_he: `השיר עוסק בבחור בשם דייגו שמגיע למועדון`, difficulty: 'easy' },
      { text_he: `ה-DJ של המועדון, חבר של דייגו, משמיע לו את "Rapper's Delight" של Sugarhill Gang`, difficulty: 'medium' },
      { text_he: `דייגו מנסה לרקוד ולשיר יחד אבל מעוות את המילים לג'יבריש ספרדי`, difficulty: 'easy' },
      { text_he: `הפזמון "Aserejé Ja De Jé" הוא חיקוי לא מדויק של "I said a hip-hop, the hippie the hippie to the hip hip hop"`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-10 ביוני 2002`, difficulty: 'medium' },
      { text_he: `הוא מכר מעל 7 מיליון עותקים בעולם`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הפזמון הוא חיקוי של שיר מקורי בספרדית`, difficulty: 'easy' },
      { text_he: `השיר יצא ב-2005`, difficulty: 'medium' },
      { text_he: `הוא מכר 1 מיליון עותקים בלבד`, difficulty: 'hard' },
      { text_he: `הסיפור בשיר עוסק בבחורה בשם פאולה ולא בבחור בשם דייגו`, difficulty: 'easy' },
    ],
  },
  q309: { // Como La Flor / Selena
    trueStatements: [
      { text_he: `השיר יצא ביוני 1992 כסינגל השני מאלבום "Entre a Mi Mundo"`, difficulty: 'medium' },
      { text_he: `השיר נכנס למקום 36 ב-Hot Latin Songs`, difficulty: 'hard' },
      { text_he: `סלנה קוונטינייה הייתה בת 23 כשנרצחה`, difficulty: 'easy' },
      { text_he: `סלנה נורתה למוות ב-31 במרץ 1995`, difficulty: 'medium' },
      { text_he: `הרוצחת הייתה יולנדה סלדיוואר, מי שהקימה את מועדון המעריצים שלה ב-1991`, difficulty: 'hard' },
      { text_he: `סלדיוואר ניהלה את חנויות ה-Boutiques של סלנה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-1990 כסינגל הראשון של סלנה`, difficulty: 'medium' },
      { text_he: `סלנה הייתה בת 25 כשנרצחה`, difficulty: 'easy' },
      { text_he: `סלנה נרצחה על ידי בעלה לשעבר ב-1995`, difficulty: 'hard' },
      { text_he: `יולנדה סלדיוואר הייתה אחיותה של סלנה`, difficulty: 'medium' },
    ],
  },
  q310: { // Obsesión / Aventura
    trueStatements: [
      { text_he: `הלהקה אוונטורה מורכבת מצעירים דומיניקנים-אמריקאים מהברונקס`, difficulty: 'medium' },
      { text_he: `הם הפכו את הבצ'אטה (סגנון מסורתי דומיניקני) ללהיט פופ עולמי`, difficulty: 'hard' },
      { text_he: `השיר אומר במפורש "זו לא אהבה, זו אובססיה"`, difficulty: 'easy' },
      { text_he: `הקצב הקליל גרם להפוך אותו לקלאסיקה של חתונות`, difficulty: 'easy' },
      { text_he: `השיר עמד 16 שבועות במקום 1 ב-Hot Latin Songs ב-2002`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `אוונטורה היא להקה פורטוריקנית מסן חואן`, difficulty: 'medium' },
      { text_he: `הם המציאו את הז'אנר הבצ'אטה`, difficulty: 'hard' },
      { text_he: `השיר עמד 4 שבועות במקום 1`, difficulty: 'medium' },
      { text_he: `המילים בשיר אומרות "זו אהבה אמיתית"`, difficulty: 'easy' },
    ],
  },
  q311: { // La Bamba / Ritchie Valens
    trueStatements: [
      { text_he: `משפחת ולנזואלה דיברה רק אנגלית בבית`, difficulty: 'medium' },
      { text_he: `ריצ'י ידע מעט מאוד ספרדית — הוא למד את המילים פונטית`, difficulty: 'easy' },
      { text_he: `"לה במבה" הוא קלאסיקה של "סון חרוצ'ו" מוורה קרוז שבמקסיקו`, difficulty: 'hard' },
      { text_he: `ולנס נהרג בגיל 17 בהתרסקות מטוס באיווה`, difficulty: 'easy' },
      { text_he: `התאונה הייתה ב-3 בפברואר 1959`, difficulty: 'medium' },
      { text_he: `הוא נהרג יחד עם באדי הולי ו-Big Bopper`, difficulty: 'medium' },
      { text_he: `דון מקלין הנציח את האירוע כ"היום שבו המוזיקה מתה" ב"American Pie"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `ריצ'י דיבר ספרדית בבית מקטנותו`, difficulty: 'medium' },
      { text_he: `"לה במבה" הוא שיר אהבה מקסיקני קלאסי`, difficulty: 'hard' },
      { text_he: `ולנס נהרג בגיל 19 בתאונת מכונית`, difficulty: 'easy' },
      { text_he: `התאונה הייתה ב-3 בפברואר 1962`, difficulty: 'medium' },
    ],
  },
  q312: { // Clandestino / Manu Chao
    trueStatements: [
      { text_he: `הוריו של מאנו צ'או היגרו מספרד לפריז כדי להימלט מדיקטטורת פרנקו`, difficulty: 'medium' },
      { text_he: `סבו של מאנו צ'או נידון למוות`, difficulty: 'hard' },
      { text_he: `אביו היה הכותב והעיתונאי רמון צ'או`, difficulty: 'hard' },
      { text_he: `מאנו צ'או הסביר: "כתבתי אותו על הגבול בין אירופה לאלה שמגיעים ממדינות עניות יותר"`, difficulty: 'medium' },
      { text_he: `האלבום "Clandestino" יצא ב-1998`, difficulty: 'easy' },
      { text_he: `הסינגל יצא ב-2000`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הוריו של מאנו צ'או היגרו מקובה לפריז`, difficulty: 'medium' },
      { text_he: `אביו של מאנו צ'או היה רופא במקצועו`, difficulty: 'hard' },
      { text_he: `מאנו צ'או הצהיר שהשיר עוסק ספציפית במקסיקנים בארה"ב`, difficulty: 'medium' },
      { text_he: `האלבום "Clandestino" יצא ב-1995`, difficulty: 'easy' },
    ],
  },
  q313: { // Suavemente / Elvis Crespo
    trueStatements: [
      { text_he: `המרנגה היא סגנון ריקוד מסורתי דומיניקני`, difficulty: 'easy' },
      { text_he: `"Suavemente" עזר להפוך את המרנגה ללהיט מיינסטרים בארה"ב`, difficulty: 'medium' },
      { text_he: `אלביס קרספו, ילדי בפורטו ריקו, הצליח להחזיר את המרנגה לרדיו אחרי שנים שבהן הסלסה דחקה אותה`, difficulty: 'hard' },
      { text_he: `השיר עמד במקום 1 ב-Hot Latin Songs מ-16 במאי 1998`, difficulty: 'medium' },
      { text_he: `קרספו היה הזמר המרנגה הראשון מאז חואן לואיס גוורה ב-1992 שהגיע למקום 1`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `המרנגה היא סגנון ריקוד פורטוריקני מסורתי`, difficulty: 'easy' },
      { text_he: `אלביס קרספו נולד וגדל בקובה`, difficulty: 'hard' },
      { text_he: `השיר עמד במקום 1 ב-Billboard Hot 100 (לא Hot Latin Songs)`, difficulty: 'medium' },
      { text_he: `קרספו היה הזמר הראשון אי פעם להגיע למקום 1 ב-Hot Latin Songs`, difficulty: 'hard' },
    ],
  },
  q314: { // Danza Kuduro / Don Omar
    trueStatements: [
      { text_he: `קודורו הוא סגנון מוזיקה וריקוד שנולד בלואנדה, אנגולה, בסוף שנות ה-80`, difficulty: 'medium' },
      { text_he: `הוא פופולרי בקרב קהילות אנגוליות בפרברי ליסבון`, difficulty: 'easy' },
      { text_he: `השכונות העיקריות בהן פופולרי הקודורו הן אמדורה וקלוז`, difficulty: 'hard' },
      { text_he: `השם "קודורו" מתייחס לתנועה שבה הרקדנים נראים עם "ישבן קשה" (Cu Duro בפורטוגזית)`, difficulty: 'hard' },
      { text_he: `השיר מערבב ספרדית מפי דון אומר עם פורטוגזית אירופית מפי לוצ'נזו`, difficulty: 'medium' },
      { text_he: `השיר באלבום "Lucenzo" של 2010`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `קודורו הוא סגנון ברזילאי מהפבלות של ריו דה ז'נירו`, difficulty: 'medium' },
      { text_he: `קודורו נולד בקייפ ורדה`, difficulty: 'easy' },
      { text_he: `השם "קודורו" פירושו "ריקוד אש" בפורטוגזית`, difficulty: 'hard' },
      { text_he: `השיר משלב צרפתית וערבית בנוסף לספרדית`, difficulty: 'medium' },
    ],
  },
  q315: { // Oye Como Va / Tito Puente
    trueStatements: [
      { text_he: `טיטו פואנטה (1923-2000) גדל בהארלם הספרדי בניו יורק להורים פורטוריקניים`, difficulty: 'medium' },
      { text_he: `פואנטה נחשב ל"מלך הטימבאלס" — תוף עומד אופייני למוזיקה הקובנית`, difficulty: 'hard' },
      { text_he: `כשסנטנה הוציא את גרסתו, פואנטה תחילה כעס שלא ביקשו רשות`, difficulty: 'medium' },
      { text_he: `אחר כך פואנטה אמר שגרסת סנטנה "הביאה את המוזיקה הלטינית לעולם"`, difficulty: 'hard' },
      { text_he: `התמלוגים מגרסת סנטנה הביאו לפואנטה פנסיה נוחה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `טיטו פואנטה גדל בקובה לפני שעלה לארה"ב`, difficulty: 'medium' },
      { text_he: `פואנטה נחשב ל"מלך הקונגה"`, difficulty: 'hard' },
      { text_he: `פואנטה תבע את סנטנה על השימוש ללא רשות`, difficulty: 'medium' },
      { text_he: `פואנטה לא קיבל תמלוגים מגרסת סנטנה`, difficulty: 'easy' },
    ],
  },
  q316: { // Bamboleo / Gipsy Kings
    trueStatements: [
      { text_he: `אלבום הבכורה של ג'יפסי קינגס יצא ב-1987 (1989 בארה"ב)`, difficulty: 'medium' },
      { text_he: `האלבום כלל את "Bamboléo", "Djobi Djoba" ו-"Un Amor"`, difficulty: 'easy' },
      { text_he: `האלבום עמד 40 שבועות במצעדי ארה"ב — הישג נדיר לאלבום בספרדית`, difficulty: 'hard' },
      { text_he: `הלהקה הפכה את הפלמנקו לז'אנר מיינסטרים עולמי`, difficulty: 'medium' },
      { text_he: `בני המשפחות Reyes ו-Baliardo הם הגרעין של הלהקה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `אלבום הבכורה של ג'יפסי קינגס יצא ב-1985`, difficulty: 'medium' },
      { text_he: `האלבום עמד שבועיים בלבד במצעדי ארה"ב`, difficulty: 'hard' },
      { text_he: `הלהקה התמחתה במוזיקה אלקטרונית מודרנית`, difficulty: 'medium' },
      { text_he: `הלהקה מורכבת מבני משפחה אחת בלבד — Reyes`, difficulty: 'hard' },
    ],
  },
  q317: { // Bidi Bidi Bom Bom / Selena
    trueStatements: [
      { text_he: `הצלילים "בידי בידי בום בום" הם אונומטופאה — חיקוי של דפיקות לב מהירות`, difficulty: 'easy' },
      { text_he: `סלנה נולדה ב-1971 ב-Lake Jackson, טקסס`, difficulty: 'medium' },
      { text_he: `סלנה גדלה בבית דובר אנגלית בלבד`, difficulty: 'medium' },
      { text_he: `אביה לימד אותה ספרדית פונטית כדי שתוכל לשיר מוזיקה טחאנו`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-31 ביולי 1994 מהאלבום "Amor Prohibido"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הצלילים "בידי בידי בום בום" הם תרגום של ביטוי מקסיקני`, difficulty: 'easy' },
      { text_he: `סלנה נולדה ב-1969 בקליפורניה`, difficulty: 'medium' },
      { text_he: `סלנה דיברה ספרדית מבית כשפת אם`, difficulty: 'medium' },
      { text_he: `השיר יצא ב-1992 מאלבום "Entre a Mi Mundo"`, difficulty: 'hard' },
    ],
  },
  q318: { // Conga / Gloria Estefan
    trueStatements: [
      { text_he: `משפחת פאחארדו של גלוריה ברחה מקובה אחרי המהפכה הקובנית והתיישבה במיאמי ב-1959`, difficulty: 'medium' },
      { text_he: `אביה של גלוריה השתתף בכישלון פלישת מפרץ החזירים ב-1961`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 10 בבילבורד הוט 100 ב-1985`, difficulty: 'easy' },
      { text_he: `זה היה הראשון מתוך ארבעה להיטים שגלוריה והלהקה Miami Sound Machine הגיעו עמם לעשירייה הראשונה`, difficulty: 'medium' },
      { text_he: `גלוריה גרה עד היום באיי הכוכבים במיאמי ביץ'`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `משפחת פאחארדו ברחה מקובה ב-1965`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 בבילבורד הוט 100 ב-1985`, difficulty: 'easy' },
      { text_he: `אביה של גלוריה היה רופא במאיאמי`, difficulty: 'hard' },
      { text_he: `גלוריה אסטפן עברה לחיות בקובה אחרי המהפכה ההפוכה`, difficulty: 'hard' },
    ],
  },
  q319: { // Ella Baila Sola / Eslabon Armado
    trueStatements: [
      { text_he: `השיר עצמו מתאר שני צעירים במסיבה שרואים אישה שרוקדת לבד`, difficulty: 'easy' },
      { text_he: `השיר עצמו לא מכיל רמזים לסמים`, difficulty: 'medium' },
      { text_he: `הז'אנר הזה ושירים אחרים של פסו פלומה שמתייחסים ל"אל צ'אפו" גוזמן ולקרטל סינלואה הם שגרמו לאיומים`, difficulty: 'hard' },
      { text_he: `ב-2023 פסו פלומה הפך לאמן הלטיני האזורי הראשון אי פעם להגיע למקום 1 בבילבורד 200`, difficulty: 'medium' },
      { text_he: `פסו פלומה ביטל הופעה בטיחואנה ב-14 באוקטובר 2023 בעקבות איומי קרטל ז'אליסקו`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר עצמו מכיל רמזים מפורשים לסחר בקוקאין`, difficulty: 'easy' },
      { text_he: `איומי המוות על פסו פלומה היו מקרטל סינלואה`, difficulty: 'hard' },
      { text_he: `פסו פלומה לעולם לא ביטל הופעה בעקבות איומים`, difficulty: 'hard' },
      { text_he: `השיר היה הראשון בז'אנר ה-reggaeton להגיע למקום 1 בבילבורד 200`, difficulty: 'medium' },
    ],
  },
  q320: { // Bailando / Enrique Iglesias
    trueStatements: [
      { text_he: `השיר יצא ב-11 באפריל 2014`, difficulty: 'medium' },
      { text_he: `הוא יצא בשתי גרסאות עיקריות — ספרדית ואנגלית`, difficulty: 'easy' },
      { text_he: `הגרסה הספרדית היא עם הקובנים Descemer Bueno ו-Gente de Zona`, difficulty: 'hard' },
      { text_he: `הגרסה האנגלית היא עם שון פול הג'מייקני`, difficulty: 'medium' },
      { text_he: `הגרסה הספרדית עמדה 41 שבועות במקום 1 ב-Hot Latin Songs — שיא בכל הזמנים`, difficulty: 'hard' },
      { text_he: `השיר הפך לאחד השירים המזוהים ביותר עם תקופת הגל הלטיני השני בארה"ב`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-2012 ביוזמת אנריקה איגלסיאס`, difficulty: 'medium' },
      { text_he: `הגרסה הספרדית היא עם שאקירה`, difficulty: 'hard' },
      { text_he: `הגרסה האנגלית היא עם פיטבול`, difficulty: 'medium' },
      { text_he: `הגרסה הספרדית עמדה 4 שבועות במקום 1 ב-Hot Latin Songs`, difficulty: 'hard' },
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
