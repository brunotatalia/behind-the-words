#!/usr/bin/env node
// Batch 2: q031-q061 (30 questions, q051 missing in data)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const statements = {
  q031: { // Wake Me Up When September Ends / Green Day
    trueStatements: [
      { text_he: `אביו של בילי ג'ו ארמסטרונג נפטר מסרטן ב-1 בספטמבר 1982`, difficulty: 'medium' },
      { text_he: `בילי ג'ו ארמסטרונג היה בן 10 כשאביו נפטר`, difficulty: 'easy' },
      { text_he: `ביום הלוויה בילי ברח לחדרו ואמר לאמו "תעירי אותי כשספטמבר ייגמר"`, difficulty: 'medium' },
      { text_he: `במשך שנים סירב בילי ג'ו לשיר על האירוע, וכתב את השיר רק ב-2004 לאלבום American Idiot`, difficulty: 'hard' },
      { text_he: `השיר זוכה לעיתים לפרשנויות חלופיות, כולל הצמדה לפיגועי 11 בספטמבר`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `אביו של בילי ג'ו ארמסטרונג נפטר מסרטן ב-1 באוקטובר 1982`, difficulty: 'medium' },
      { text_he: `בילי ג'ו ארמסטרונג היה בן 7 כשאביו נפטר`, difficulty: 'easy' },
      { text_he: `בילי כתב את השיר באלבום Dookie מ-1994`, difficulty: 'hard' },
      { text_he: `הפרשנות העיקרית של השיר היא ביקורת על מערכת הבריאות האמריקאית`, difficulty: 'easy' },
    ],
  },
  q032: { // Lose Yourself / Eminem
    trueStatements: [
      { text_he: `אמינם כתב את השיר בדמות B-Rabbit, הדמות שגילם בסרט 8 Mile (2002)`, difficulty: 'easy' },
      { text_he: `אמינם היה הראפר הראשון בהיסטוריה שזכה באוסקר על שיר מקורי`, difficulty: 'easy' },
      { text_he: `אמינם לא הגיע לטקס פרסי האוסקר`, difficulty: 'medium' },
      { text_he: `לואיס רסטו, שותפו להפקה, קיבל את פרס האוסקר במקומו`, difficulty: 'hard' },
      { text_he: `השיר עמד 12 שבועות במקום 1 בבילבורד — שיא לכל שיר אוסקר בכל הזמנים`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `אמינם כתב את השיר בדמות עצמית, ולא בדמות הסרט`, difficulty: 'easy' },
      { text_he: `אמינם היה הראפר הראשון שזכה בגראמי לאלבום השנה`, difficulty: 'easy' },
      { text_he: `אמינם נשא נאום מרגש בטקס פרסי האוסקר`, difficulty: 'medium' },
      { text_he: `השיר עמד 4 שבועות בלבד במקום 1 בבילבורד`, difficulty: 'medium' },
    ],
  },
  q033: { // Imagine / John Lennon
    trueStatements: [
      { text_he: `לנון אמר ש-Imagine הוא "כמעט כמו המניפסט הקומוניסטי, אם כי אני לא ממש קומוניסט"`, difficulty: 'medium' },
      { text_he: `הרעיון של "imagine" הגיע מספר השירה של יוקו אונו "Grapefruit" (1964)`, difficulty: 'hard' },
      { text_he: `יוקו אונו קיבלה קרדיט רשמי על שותפות בכתיבה רק ב-2017`, difficulty: 'easy' },
      { text_he: `לנון הודה ב-1980 שהיה "מקומשן ושוביניסטי קצת" כשלא נתן לה קרדיט במקור`, difficulty: 'hard' },
      { text_he: `השיר נכתב שנתיים אחרי "Bed-In for Peace"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `לנון אמר ש-Imagine הוא "מניפסט מובהק של דמוקרטיה ליברלית"`, difficulty: 'medium' },
      { text_he: `הרעיון הגיע לאונו אחרי שקראה את "1984" של אורוול`, difficulty: 'hard' },
      { text_he: `יוקו אונו קיבלה קרדיט רשמי בשחרור המקורי של השיר ב-1971`, difficulty: 'easy' },
      { text_he: `השיר נכתב חמש שנים אחרי "Bed-In for Peace"`, difficulty: 'medium' },
    ],
  },
  q034: { // What's Going On / Marvin Gaye
    trueStatements: [
      { text_he: `הרעיון המקורי הגיע מ-Renaldo "Obie" Benson מהלהקה Four Tops`, difficulty: 'hard' },
      { text_he: `בנסון היה עד לאלימות משטרתית במחאת People's Park בברקלי ב-1969`, difficulty: 'hard' },
      { text_he: `אחיו של גיי, פרנקי, חזר משירות של 3 שנים בווייטנאם`, difficulty: 'medium' },
      { text_he: `השיר הושפע גם ממהומות ווטס ב-1965`, difficulty: 'medium' },
      { text_he: `ברי גורדי תיאר את השיר כ"הדבר הגרוע ביותר ששמעתי בחיי"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הרעיון המקורי הגיע מסטיבי וונדר`, difficulty: 'hard' },
      { text_he: `בנסון היה עד למחאות אנטי-וייטנאם בלוס אנג'לס`, difficulty: 'hard' },
      { text_he: `אחיו של גיי שירת רק שנה אחת בווייטנאם`, difficulty: 'medium' },
      { text_he: `ברי גורדי תיאר את השיר מיד כ"יצירת מופת"`, difficulty: 'easy' },
    ],
  },
  q035: { // Fast Car / Tracy Chapman
    trueStatements: [
      { text_he: `צ'פמן הסבירה: "זה לא ממש על מכונית. בעצם זה על קשר שלא עובד כי הוא מתחיל מהמקום הלא נכון"`, difficulty: 'medium' },
      { text_he: `הדוברת בשיר נאלצת לעזוב את הלימודים כדי לטפל באביה האלכוהוליסט`, difficulty: 'easy' },
      { text_he: `בסיפור, בן זוגה של הדוברת הופך לאלכוהוליסט בדיוק כמו אביה`, difficulty: 'easy' },
      { text_he: `גרסת הכיסוי של לוק קומבס מ-2023 הגיעה למקום 2 בבילבורד`, difficulty: 'medium' },
      { text_he: `הגרסה של קומבס הגיעה למקום 1 במצעדי הקאנטרי`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `צ'פמן הסבירה שהשיר הוא בעצם על מכונית האהובה הראשונה שלה`, difficulty: 'medium' },
      { text_he: `בן זוגה של הדוברת הופך למצליח ועוזב אותה`, difficulty: 'easy' },
      { text_he: `גרסת הכיסוי של גארת' ברוקס מ-2023 הגיעה למקום 1 בבילבורד`, difficulty: 'medium' },
      { text_he: `הגרסה של קומבס הגיעה למקום 5 במצעדי הקאנטרי`, difficulty: 'hard' },
    ],
  },
  q036: { // Space Oddity / David Bowie
    trueStatements: [
      { text_he: `בואי כתב את השיר ב-1969 בעקבות פרידה כואבת מהרקדנית הרמיון פרת'ינגייל`, difficulty: 'medium' },
      { text_he: `השיר הושפע מהסרט "2001: אודיסיאה בחלל" של קובריק`, difficulty: 'easy' },
      { text_he: `השיר שוחרר ב-11 ביולי 1969, חמישה ימים לפני שיגור אפולו 11`, difficulty: 'hard' },
      { text_he: `ב-"Ashes to Ashes" (1980) חשף בואי שמייג'ור טום הוא מכור לסמים`, difficulty: 'easy' },
      { text_he: `תקופת ההתמכרות הקשה של בואי לקוקאין הגיעה רק בשנות ה-70 — לא קשורה לכתיבת השיר ב-1969`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `בואי כתב את השיר אחרי פרידה מאשתו אנג'י`, difficulty: 'medium' },
      { text_he: `השיר הושפע מהסרט "Star Wars" של ג'ורג' לוקאס`, difficulty: 'easy' },
      { text_he: `השיר שוחרר חודש לפני שיגור אפולו 11`, difficulty: 'hard' },
      { text_he: `בואי כתב את השיר תוך כדי תקופת התמכרותו לקוקאין`, difficulty: 'hard' },
    ],
  },
  q037: { // Waterfalls / TLC
    trueStatements: [
      { text_he: `השיר יצא ב-1995 מאלבום CrazySexyCool`, difficulty: 'easy' },
      { text_he: `השיר זכה למקום הראשון בבילבורד למשך 7 שבועות`, difficulty: 'medium' },
      { text_he: `הוא נחשב לאחד השירים הראשונים בפופ המיינסטרים שעסק במפורש באיידס`, difficulty: 'medium' },
      { text_he: `שני הסיפורים הטרגיים בשיר: בן שמתעסק בסחר סמים ונהרג, ואיש שמקיים יחסי מין לא מוגנים ונדבק באיידס`, difficulty: 'easy' },
      { text_he: `הקליפ מציג את שני הסיפורים במקביל`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-1996 מאלבום FanMail`, difficulty: 'easy' },
      { text_he: `השיר זכה למקום הראשון בבילבורד למשך 14 שבועות`, difficulty: 'medium' },
      { text_he: `שני הסיפורים בשיר עוסקים שניהם בהתמכרות לסמים`, difficulty: 'easy' },
      { text_he: `הקליפ מתמקד בסיפור אחד בלבד — של איש שנדבק באיידס`, difficulty: 'hard' },
    ],
  },
  q038: { // Mr. Brightside / The Killers
    trueStatements: [
      { text_he: `ברנדון פלאוורס סיפר: "הלכתי לבר Crown and Anchor בלאס וגאס וחברתי הייתה שם עם בחור אחר"`, difficulty: 'medium' },
      { text_he: `פלאוורס וגיטריסט דייב קיונינג כתבו את הגרסה הראשונה ב-2001`, difficulty: 'hard' },
      { text_he: `הם ביצעו את השיר לראשונה בערב מיקרופון פתוח בבית קפה בוגאס בינואר 2002`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-2003 ובאלבום הבכורה Hot Fuss (2004)`, difficulty: 'medium' },
      { text_he: `השיר הפך לטראק המזוהה ביותר עם The Killers`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `פלאוורס תפס את חברתו עם בחור אחר במלון בלוס אנג'לס`, difficulty: 'medium' },
      { text_he: `פלאוורס כתב את השיר לבד ב-2004`, difficulty: 'hard' },
      { text_he: `השיר בוצע לראשונה בקרנגי הול בניו יורק`, difficulty: 'hard' },
      { text_he: `השיר נכלל באלבום Day & Age מ-2008`, difficulty: 'medium' },
    ],
  },
  q039: { // Black Hole Sun / Soundgarden
    trueStatements: [
      { text_he: `כריס קורנל אמר שהשם נולד כשטעה לשמוע באולפן חדשות`, difficulty: 'hard' },
      { text_he: `קורנל טען שהמילים הן יותר "משחק במילים בשביל המילים" ופחות מסר ספציפי`, difficulty: 'medium' },
      { text_he: `קורנל ציין שלמרות המנגינה המהפנטת, "Black Hole Sun" הוא בעצם שיר עצוב`, difficulty: 'easy' },
      { text_he: `קורנל השווה את האפקט ל-"Pink Floyd של תקופת סיד באראט"`, difficulty: 'hard' },
      { text_he: `הקליפ של האוורד גרינהל זכה ב-MTV VMA לסרטון מטאל של השנה (1994)`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `כריס קורנל הצהיר שהשם הוא רעיון מתוכנן מראש על שמיים אפוקליפטיים`, difficulty: 'hard' },
      { text_he: `קורנל אמר שהמילים הן הצהרה ברורה על מחאה חברתית`, difficulty: 'medium' },
      { text_he: `קורנל ציין שהשיר הוא "אופטימי במהותו"`, difficulty: 'easy' },
      { text_he: `הקליפ זכה ב-MTV VMA לסרטון אלטרנטיבי של השנה (1994)`, difficulty: 'medium' },
    ],
  },
  q040: { // Creep / Radiohead
    trueStatements: [
      { text_he: `תום יורק כתב את השיר על אישה זרה שראה בתקופת הקולג' שלו באוקספורד וגרר אחריה במשך תקופה`, difficulty: 'medium' },
      { text_he: `הלהקה זנחה לחלוטין את ביצוע השיר ב-1998`, difficulty: 'hard' },
      { text_he: `אד או'בריאן תיאר את חוויית הביצוע: "חיינו את אותן 4.5 דקות שוב ושוב"`, difficulty: 'hard' },
      { text_he: `הביצוע הראשון אחרי הזניחה היה ב-2001, אחרי תקלה בקלידים שאילצה אותם לבצע אותו`, difficulty: 'easy' },
      { text_he: `השיר יצא כסינגל ב-1992 וכשל בתחילה, אבל זכה לתחייה ב-1993`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `יורק כתב את השיר על אהובתו הראשונה`, difficulty: 'medium' },
      { text_he: `הלהקה ניגנה את השיר בכל הופעה ב-1998`, difficulty: 'hard' },
      { text_he: `הביצוע הראשון אחרי הזניחה היה ב-2005, אחרי בקשת מעריצים`, difficulty: 'easy' },
      { text_he: `השיר היה להיט מיידי מיד עם שחרורו ב-1992`, difficulty: 'medium' },
    ],
  },
  q041: { // Hallelujah / Leonard Cohen
    trueStatements: [
      { text_he: `יש דיווחים שכהן כתב כ-80 בתים, אך מקורות אחרים מדברים על 150-180`, difficulty: 'hard' },
      { text_he: `כהן אמר: "אם הייתי יודע מאיפה השירים מגיעים, הייתי הולך לשם יותר"`, difficulty: 'medium' },
      { text_he: `השיר יצא לראשונה ב-1984 באלבום Various Positions`, difficulty: 'easy' },
      { text_he: `חברת Columbia סירבה להוציא את האלבום בארה"ב`, difficulty: 'medium' },
      { text_he: `השיר הפך לאיקוני רק אחרי גרסת הכיסוי של ג'ף באקלי ב-1994`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `כהן כתב את השיר במהלך שבוע אחד ושני בתים בלבד`, difficulty: 'hard' },
      { text_he: `כהן הסביר שהשיר עוסק בחוויית טבילה דתית שעבר`, difficulty: 'medium' },
      { text_he: `השיר יצא לראשונה ב-1979 באלבום Recent Songs`, difficulty: 'easy' },
      { text_he: `השיר הפך ללהיט מיידי עם שחרורו ב-1984`, difficulty: 'easy' },
    ],
  },
  q042: { // Yellow / Coldplay
    trueStatements: [
      { text_he: `כריס מרטין כתב את השיר בהשראת הכוכבים שראה מחוץ לאולפן בלילה`, difficulty: 'medium' },
      { text_he: `מרטין הסביר שהשיר עוסק ב"מסירות לאדם — לכתוב לו שיר, לשחות בים בשבילו"`, difficulty: 'easy' },
      { text_he: `מרטין אמר שלא היה לו אדם ספציפי בראש כשכתב את השיר`, difficulty: 'medium' },
      { text_he: `השם "Yellow" נבחר ממדריך ה-Yellow Pages שהיה ליד באולפן`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-26 ביוני 2000 כסינגל השני מאלבום הבכורה Parachutes`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `מרטין כתב את השיר בהשראת השקיעה שראה מחוץ לחלון`, difficulty: 'medium' },
      { text_he: `מרטין כתב את השיר על חברתו הראשונה`, difficulty: 'medium' },
      { text_he: `הצבע "צהוב" נבחר כסמל לעצב והדכאון`, difficulty: 'hard' },
      { text_he: `השיר יצא כסינגל הראשון מאלבום Parachutes`, difficulty: 'hard' },
    ],
  },
  q043: { // bad guy / Billie Eilish
    trueStatements: [
      { text_he: `אייליש אמרה: "אם את כל הזמן אומרת אני רעה, אני שוברת כללים — את לא באמת"`, difficulty: 'easy' },
      { text_he: `השיר יצא ב-29 במרץ 2019 מאלבום הבכורה "When We All Fall Asleep, Where Do We Go?"`, difficulty: 'medium' },
      { text_he: `המבנה המוזיקלי לא רגיל: הקצב מתחיל ב-135 BPM ויורד ל-120 BPM בסוף`, difficulty: 'hard' },
      { text_he: `בגראמי 2020 השיר זכה בכל ארבעת הפרסים הגדולים`, difficulty: 'easy' },
      { text_he: `אייליש הייתה הראשונה שזכתה בכל הפרסים הגדולים מאז קריסטופר קרוס ב-1981`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `אייליש הצהירה שהשיר הוא הצהרה כנה על היותה "אדם רע"`, difficulty: 'easy' },
      { text_he: `השיר יצא ב-2018 כסינגל ראשון בקריירה של אייליש`, difficulty: 'medium' },
      { text_he: `הקצב במבנה השיר נשאר אחיד 120 BPM לכל אורכו`, difficulty: 'hard' },
      { text_he: `אייליש הייתה הראשונה שזכתה בארבעת הפרסים הגדולים מאז ביונסה`, difficulty: 'hard' },
    ],
  },
  q044: { // Blinding Lights / The Weeknd
    trueStatements: [
      { text_he: `The Weeknd הסביר: "אתה רוצה לראות מישהו בלילה, אתה שיכור, ואתה נוהג לכיוון האדם הזה"`, difficulty: 'medium' },
      { text_he: `הוא הוסיף: "אני לא רוצה לקדם נהיגה שיכורה, אבל זה הצד האפל"`, difficulty: 'easy' },
      { text_he: `השיר יצא בנובמבר 2019 מאלבום After Hours`, difficulty: 'easy' },
      { text_he: `השיר עוצב בסגנון synth-wave של שנות ה-80 בהשראת המשחק Grand Theft Auto: Vice City`, difficulty: 'hard' },
      { text_he: `השיר עמד 90 שבועות בעשירייה הראשונה של בילבורד הוט 100 — שיא בכל הזמנים`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `The Weeknd אמר שהשיר עוסק בנהיגה הביתה אחרי הופעה רגילה`, difficulty: 'medium' },
      { text_he: `The Weeknd הצהיר שהשיר הוא שיר אהבה אופטימי`, difficulty: 'easy' },
      { text_he: `השיר עוצב בסגנון hip-hop קלאסי של שנות ה-90`, difficulty: 'hard' },
      { text_he: `השיר עמד 30 שבועות בעשירייה הראשונה של בילבורד`, difficulty: 'medium' },
    ],
  },
  q045: { // Take Me to Church / Hozier
    trueStatements: [
      { text_he: `הוזייר אמר: "גדלתי באירלנד, הכנסייה תמיד שם — הצביעות, הפחדנות הפוליטית"`, difficulty: 'medium' },
      { text_he: `הוזייר הדגיש שהשיר אינו "התקפה על אמונה" אלא ביקורת על "מוסד שמערער את האנושות"`, difficulty: 'hard' },
      { text_he: `הוזייר תיאר את השיר כ"שיר של איבוד דת"`, difficulty: 'easy' },
      { text_he: `הקליפ של ברנדן קנטי הופק בקורק, אירלנד, בתקציב של 1,500 אירו בלבד`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 2 בבילבורד ולשיא של 6 בבריטניה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הוזייר הצהיר שהשיר הוא "התקפה ישירה על אמונה דתית"`, difficulty: 'medium' },
      { text_he: `הוזייר תיאר את השיר כ"שיר של חזרה לדת"`, difficulty: 'hard' },
      { text_he: `הקליפ הופק ברוסיה בתקציב של 50,000 אירו`, difficulty: 'easy' },
      { text_he: `הקליפ הופק בלונדון בהפקה של MTV Europe`, difficulty: 'hard' },
    ],
  },
  q046: { // Firework / Katy Perry
    trueStatements: [
      { text_he: `פרי סיפרה שההשראה הגיעה מהרומן "On the Road" של ג'ק קרואק`, difficulty: 'medium' },
      { text_he: `הקטע הספציפי שעורר את השיר הוא על אנשים ש"בוערים, בוערים, בוערים, כמו זיקוקים צהובים מופלאים שמתפוצצים כעכבישים על פני הכוכבים"`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-26 באוקטובר 2010 מהאלבום "Teenage Dream"`, difficulty: 'easy' },
      { text_he: `השיר היה הסינגל מספר 1 השלישי של פרי מהאלבום`, difficulty: 'medium' },
      { text_he: `הקליפ זכה ב-MTV VMA לסרטון השנה (2011) וצולם בעיר בודפשט`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `ההשראה לשיר הגיעה מהספר "1984" של ג'ורג' אורוול`, difficulty: 'medium' },
      { text_he: `השיר יצא ב-2012 כסינגל מאלבום Prism`, difficulty: 'easy' },
      { text_he: `השיר היה הסינגל הראשון של פרי מהאלבום Teenage Dream`, difficulty: 'medium' },
      { text_he: `הקליפ צולם בלוס אנג'לס בעיר ההולדת של פרי`, difficulty: 'hard' },
    ],
  },
  q047: { // A Thousand Miles / Vanessa Carlton
    trueStatements: [
      { text_he: `קרלטון כתבה את השיר על תלמיד מ-Juilliard שהיה לה כלפיו רגשות`, difficulty: 'medium' },
      { text_he: `קרלטון למדה ב-School of American Ballet כשפיתחה את הרגשות הללו`, difficulty: 'hard' },
      { text_he: `היא אמרה: "מעולם לא דיברתי איתו. הייתי מאוד ביישנית"`, difficulty: 'easy' },
      { text_he: `התחושה שלה הייתה שיש לה סיכוי גדול יותר "ליפול למעלה" מאשר ליצור מערכת יחסים`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 5 בבילבורד ב-2002`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `קרלטון כתבה את השיר על מאהב שלה מבית הספר התיכון`, difficulty: 'medium' },
      { text_he: `קרלטון למדה באוניברסיטת קולומביה`, difficulty: 'hard' },
      { text_he: `קרלטון הצהירה שהיא ניסתה לחזר אחריו ונדחתה`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 1 בבילבורד ב-2002`, difficulty: 'easy' },
    ],
  },
  q048: { // WAP / Cardi B
    trueStatements: [
      { text_he: `בהופעה בגראמי 2021 ה-FCC קיבלה למעלה מ-1,000 תלונות על השיר`, difficulty: 'medium' },
      { text_he: `הפוליטיקאי הרפובליקני ג'יימס ברדלי אמר שהוא "רוצה לשפוך מי קודש לאוזניים"`, difficulty: 'hard' },
      { text_he: `הפוליטיקאית דיאנה לוריין אמרה שהשיר "החזיר את כל המגדר הנשי 100 שנים אחורה"`, difficulty: 'hard' },
      { text_he: `השיר זכה ל-93 מיליון השמעות בשבוע הראשון`, difficulty: 'medium' },
      { text_he: `ב-NPR השיר הוכתר "השיר הטוב של 2020"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ה-FCC קיבלה כ-50 תלונות בלבד על השיר`, difficulty: 'medium' },
      { text_he: `אופרה ווינפרי גינתה את השיר בתוכנית הטלוויזיה שלה`, difficulty: 'hard' },
      { text_he: `השיר זכה ל-30 מיליון השמעות בשבוע הראשון`, difficulty: 'medium' },
      { text_he: `ב-Rolling Stone השיר הוכתר "השיר הגרוע של 2020"`, difficulty: 'easy' },
    ],
  },
  q049: { // Can't Feel My Face / The Weeknd
    trueStatements: [
      { text_he: `בשיר מאוחר יותר, "Reminder", The Weeknd שר במפורש "פנים מאובנים מתוך שקית קוק"`, difficulty: 'hard' },
      { text_he: `רשמית, האמן מתאר את השיר כ"רומן לוהט עם אישה שהוא יודע שהיא לא טובה לו"`, difficulty: 'medium' },
      { text_he: `השיר יצא ביוני 2015 מהאלבום "Beauty Behind the Madness"`, difficulty: 'medium' },
      { text_he: `השיר עלה למקום 1 בבילבורד`, difficulty: 'easy' },
      { text_he: `השיר הופק על ידי מקס מרטין שמומחה לפופ סקנדינבי`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `The Weeknd הצהיר במפורש שהשיר עוסק בקוקאין`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-2013 מאלבום Trilogy`, difficulty: 'medium' },
      { text_he: `השיר עלה למקום 5 בבילבורד`, difficulty: 'easy' },
      { text_he: `השיר הופק על ידי דרייק`, difficulty: 'hard' },
    ],
  },
  q050: { // Independence Day / Martina McBride
    trueStatements: [
      { text_he: `הכותבת גרצ'ן פיטרס כתבה את השיר מנקודת מבט של ילדה בת 8`, difficulty: 'medium' },
      { text_he: `פיטרס אמרה: "ניסיתי למצוא דרך אחרת לצאת מזה" — אך בחרה בסוף הטראגי`, difficulty: 'hard' },
      { text_he: `השיר נחשב לאבן דרך במודעות לאלימות במשפחה`, difficulty: 'easy' },
      { text_he: `פיטרס הביעה אי-נוחות מהשימוש בשיר לעיתים בהקשרים פטריוטיים`, difficulty: 'medium' },
      { text_he: `פיטרס הצהירה: "הוא על הישרדות וחירות מהתעללות, לא על המנון לאומי"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הכותבת כתבה את השיר מנקודת מבט של אישה בוגרת`, difficulty: 'medium' },
      { text_he: `פיטרס בחרה בסוף שמח של בריחה ושיקום`, difficulty: 'hard' },
      { text_he: `פיטרס דווקא עודדה את השימוש בשיר בהקשרים פטריוטיים`, difficulty: 'medium' },
      { text_he: `פיטרס תיארה את השיר כ"המנון פטריוטי כן"`, difficulty: 'hard' },
    ],
  },
  q052: { // Somebody That I Used to Know / Gotye
    trueStatements: [
      { text_he: `גוטייה (וולי דה בקר) סיפר שכתב תחילה רק את החלק שלו`, difficulty: 'medium' },
      { text_he: `גוטייה הבין ש"לא היה לאן ללכת עם הדמות" וצריך עוד קול`, difficulty: 'hard' },
      { text_he: `הוא הוסיף את החלק הנשי של קימברה בסשן השלישי`, difficulty: 'hard' },
      { text_he: `השיר עמד 8 שבועות במקום 1 בבילבורד`, difficulty: 'medium' },
      { text_he: `השיר זכה בגראמי לשיר השנה ולהקלטת השנה (2013)`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `גוטייה תכנן את הדואט עם קימברה מהיום הראשון`, difficulty: 'medium' },
      { text_he: `קימברה תרמה את חלקה לאלבום בלי לפגוש את גוטייה`, difficulty: 'hard' },
      { text_he: `השיר עמד 4 שבועות במקום 1 בבילבורד`, difficulty: 'medium' },
      { text_he: `השיר זכה בגראמי לאלבום השנה (2013)`, difficulty: 'easy' },
    ],
  },
  q053: { // Ms. Jackson / Outkast
    trueStatements: [
      { text_he: `אנדרה 3000 כיוון את השיר ספציפית לאמא של אריקה בדו, קולין רייט`, difficulty: 'medium' },
      { text_he: `קולין רייט היא אמהּ של אריקה בדו ושל בנם המשותף סבן`, difficulty: 'hard' },
      { text_he: `אנדרה 3000 אמר: "כנראה שלעולם לא הייתי בא ואומר לאמא של אריקה 'אני מצטער על מה שקרה'"`, difficulty: 'easy' },
      { text_he: `אריקה בדו עצמה אמרה שזה "הכאיב לה בהתחלה" אבל העריכה את הכנות`, difficulty: 'medium' },
      { text_he: `הפתיחה מקדישה את השיר ל"baby's mamas' mamas"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר כותב לאמא של ביג בוי, השותף השני בלהקה`, difficulty: 'medium' },
      { text_he: `אריקה בדו תבעה את אנדרה 3000 על השיר`, difficulty: 'medium' },
      { text_he: `אנדרה 3000 הצהיר שהשיר הוא בדיוני לחלוטין`, difficulty: 'easy' },
      { text_he: `הפתיחה מקדישה את השיר ל"all the daddies out there"`, difficulty: 'hard' },
    ],
  },
  q054: { // Physical / Olivia Newton-John
    trueStatements: [
      { text_he: `ניוטון-ג'ון עצמה הביעה ספקות לגבי השיר בגלל הרמיזות`, difficulty: 'medium' },
      { text_he: `שורות כמו "אין יותר מה לדבר אלא אם זה אופקי" ו"תן לי לשמוע את הגוף שלך מדבר" גרמו לתחנות רדיו לאסור את השיר`, difficulty: 'easy' },
      { text_he: `הקליפ עם הסצנות של מקלחת ושינוי גוף נחשב לפרובוקטיבי בזמנו`, difficulty: 'hard' },
      { text_he: `השיר עמד 10 שבועות במקום 1 בבילבורד`, difficulty: 'medium' },
      { text_he: `השיר היה אחד הלהיטים הגדולים של 1981`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ניוטון-ג'ון לא הביעה שום ספקות לגבי השיר`, difficulty: 'medium' },
      { text_he: `תחנות רדיו ברחבי ארה"ב אהבו את השיר ומעולם לא אסרו אותו`, difficulty: 'easy' },
      { text_he: `הקליפ של השיר נחשב לתמים אז ולגמרי לא פרובוקטיבי`, difficulty: 'hard' },
      { text_he: `השיר עמד 4 שבועות במקום 1 בבילבורד`, difficulty: 'medium' },
    ],
  },
  q055: { // In Bloom / Nirvana
    trueStatements: [
      { text_he: `קוביין כתב את השיר בכוונה כך שמעריצים שלא מבינים את המסר ישירו אותו בקול רם — אירוניה כפולה`, difficulty: 'medium' },
      { text_he: `השורה "אוהב לירות מהרובה שלו" היא דקירה סאטירית במאצ'ואיזם שקוביין תיעב`, difficulty: 'hard' },
      { text_he: `קוביין אמר שהיה מתוסכל מ"אנשים שלוקחים אותנו ברצינות"`, difficulty: 'medium' },
      { text_he: `הוא ביקש שהקליפ של השיר יראה את הצד ההומוריסטי של הלהקה`, difficulty: 'easy' },
      { text_he: `השיר נכלל באלבום Nevermind (1991), אבל יצא כסינגל רק בנובמבר 1992`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `קוביין כתב את השיר כאהבה וכבוד למעריצים`, difficulty: 'medium' },
      { text_he: `השורה על הרובה היא ביטוי כן של אהבת קוביין לכלי נשק`, difficulty: 'hard' },
      { text_he: `השיר יצא כסינגל הראשון מאלבום Nevermind בספטמבר 1991`, difficulty: 'hard' },
      { text_he: `קוביין רצה שהקליפ יהיה רציני ועצוב`, difficulty: 'easy' },
    ],
  },
  q056: { // Little Red Corvette / Prince
    trueStatements: [
      { text_he: `שורות כמו "כיס מלא בסוסים, טרויאנים, חלקם משומשים" רומזות לקונדומים ולמאהבים קודמים`, difficulty: 'easy' },
      { text_he: `ה"ג'וקיים" בשיר הם הגברים שכבר רכבו על "המכונית"`, difficulty: 'hard' },
      { text_he: `פרינס בחר במטאפורות מוסוות בכוונה אחרי שירים יותר גלויים כמו "Head" ו"Dirty Mind"`, difficulty: 'medium' },
      { text_he: `השיר הוקלט במאי 1982`, difficulty: 'medium' },
      { text_he: `השיר שוחרר בפברואר 1983`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר באמת עוסק במכונית קורבט אדומה ספציפית שפרינס שם עליה עין`, difficulty: 'easy' },
      { text_he: `פרינס כתב את השיר עוד לפני "Head" ו"Dirty Mind"`, difficulty: 'medium' },
      { text_he: `השיר הוקלט בנובמבר 1981`, difficulty: 'medium' },
      { text_he: `השיר שוחרר באוקטובר 1982 כסינגל הראשון מאלבום 1999`, difficulty: 'hard' },
    ],
  },
  q057: { // Hurt / NIN
    trueStatements: [
      { text_he: `קאש הקליט את הכיסוי בפברואר 2003 כשהיה בן 71`, difficulty: 'medium' },
      { text_he: `קאש נפטר 7 חודשים לאחר ההקלטה (12 בספטמבר 2003)`, difficulty: 'hard' },
      { text_he: `רזנור אמר אחרי שראה את הקליפ של קאש: "פשוט איבדתי את החברה שלי, כי השיר הזה כבר לא שלי"`, difficulty: 'medium' },
      { text_he: `רזנור הוסיף שהוא הרגיש "כמו חיבוק חם" מהביצוע של קאש`, difficulty: 'hard' },
      { text_he: `הכיסוי של קאש נחשב כיום לאיקוני יותר מהמקור של NIN`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `קאש הקליט את הכיסוי כשהיה בן 65`, difficulty: 'medium' },
      { text_he: `קאש נפטר שנתיים לאחר ההקלטה`, difficulty: 'hard' },
      { text_he: `רזנור הביע אכזבה מהכיסוי של קאש`, difficulty: 'medium' },
      { text_he: `הכיסוי של קאש לא קיבל פרסי ביקורת או מועמדויות לגראמי`, difficulty: 'easy' },
    ],
  },
  q058: { // Don't Stand So Close to Me / The Police
    trueStatements: [
      { text_he: `סטינג עבד כמורה לפני שהפך למוזיקאי, לתלמידי כיתות ז'-י'`, difficulty: 'medium' },
      { text_he: `ב-1981 רמז סטינג על אלמנט אוטוביוגרפי: "עברתי התנסות הוראה ובחורות בנות 15 חיבבו אותי"`, difficulty: 'hard' },
      { text_he: `ב-1993 הוא תיאר אחרת: "היינו פצצות בלונדיניות באותה תקופה... אז הרעיון היה — בואו נכתוב סיפור לוליטה"`, difficulty: 'hard' },
      { text_he: `בסופו של דבר סטינג הכחיש שהשיר אוטוביוגרפי`, difficulty: 'easy' },
      { text_he: `הקישור ל"לוליטה" של נבוקוב מופיע במפורש בשיר ("בדיוק כמו האיש הזקן בספר ההוא של נבוקוב")`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `סטינג עבד כעורך דין לפני שהפך למוזיקאי`, difficulty: 'medium' },
      { text_he: `סטינג מעולם לא רמז על אלמנט אוטוביוגרפי בשיר`, difficulty: 'hard' },
      { text_he: `הקישור הספרותי בשיר הוא ל"רומיאו ויוליה" של שייקספיר`, difficulty: 'medium' },
      { text_he: `סטינג הצהיר שהשיר אוטוביוגרפי לחלוטין`, difficulty: 'easy' },
    ],
  },
  q059: { // Alive / Pearl Jam
    trueStatements: [
      { text_he: `אביו הביולוגי האמיתי של אדי ודר היה אדוארד סברסון השלישי`, difficulty: 'hard' },
      { text_he: `אביו הביולוגי נפטר מטרשת נפוצה ב-1981`, difficulty: 'hard' },
      { text_he: `ודר נפגש עם אביו הביולוגי "שלוש או ארבע פעמים" כמכרים משפחתיים בלי לדעת על הקשר`, difficulty: 'medium' },
      { text_he: `בהופעות, הקהל "הסיר את הקללה" מהשיר כשהם שרו "אני עדיין חי" בחגיגה`, difficulty: 'easy' },
      { text_he: `השיר יצא ב-7 ביולי 1991, 51 ימים לפני אלבום Ten`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `אביו הביולוגי של ודר חי עד היום`, difficulty: 'hard' },
      { text_he: `אביו הביולוגי נפטר מהתקף לב ב-1979`, difficulty: 'hard' },
      { text_he: `ודר מעולם לא פגש את אביו הביולוגי`, difficulty: 'medium' },
      { text_he: `השיר היה הסינגל הראשון מאלבום Vs. (1993)`, difficulty: 'easy' },
    ],
  },
  q060: { // This Is America / Childish Gambino
    trueStatements: [
      { text_he: `הקליפ ביוקרטי על ידי הירו מורי`, difficulty: 'medium' },
      { text_he: `הקליפ משווה את הריקודים השמחים של גלובר לרגעים של אלימות — היורה לאנשים שצומחת מתוך הריקוד`, difficulty: 'easy' },
      { text_he: `השיר עובר בין שני "עולמות סאונד" — קוראל שמח לפני יריות, ואז טראפ אפל ופועם אחרי`, difficulty: 'hard' },
      { text_he: `הקליפ צבר 980 מיליון צפיות עד מרץ 2026`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הקליפ ביוקרטי על ידי דונלד גלובר עצמו`, difficulty: 'medium' },
      { text_he: `הקליפ מציג ריקודים בלבד, ללא תכנים אלימים`, difficulty: 'easy' },
      { text_he: `הסאונד של השיר אחיד לכל אורכו — סגנון hip-hop קלאסי`, difficulty: 'hard' },
      { text_he: `הקליפ צבר 5 מיליארד צפיות בתוך שנה אחת`, difficulty: 'hard' },
    ],
  },
  q061: { // Rocket Man / Elton John
    trueStatements: [
      { text_he: `השיר מבוסס על סיפור קצר של ריי ברדבורי משנת 1951 (מתוך אסופת "האיש המאויר")`, difficulty: 'hard' },
      { text_he: `הסיפור עוסק באסטרונאוט שעבודתו כולאת אותו רחוק מבני משפחתו`, difficulty: 'medium' },
      { text_he: `ברני טאופין שאב את הרעיון בנהיגה ליד בית הוריו`, difficulty: 'hard' },
      { text_he: `טאופין הודה בהשראה משיר קודם של Pearls Before Swine על אותו סיפור: "כל הכותבים הם גנבים גדולים"`, difficulty: 'easy' },
      { text_he: `השיר יצא באפריל 1972 מהאלבום "Honky Château" והגיע למקום 2 בבריטניה ולמקום 6 בארה"ב`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `השיר מבוסס על סיפור של אייזק אסימוב`, difficulty: 'hard' },
      { text_he: `הסיפור עוסק באסטרונאוט הראשון על המאדים`, difficulty: 'medium' },
      { text_he: `טאופין שאב השראה ישירה מנחיתת אפולו 11`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-1969 לכבוד הנחיתה הראשונה על הירח`, difficulty: 'medium' },
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
