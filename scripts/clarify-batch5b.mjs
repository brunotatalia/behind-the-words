#!/usr/bin/env node
// Self-contained statements pass — batch 5b: q346-q377
// European/Italian/K-Pop section. Same self-containment rule as previous batches.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const fixed = {
  q346: { // Ça plane pour moi / Plastic Bertrand
    trueStatements: [
      { text_he: `Ça plane pour moi יצא ב-1977 (חלקם מצטטים 1978)`, difficulty: 'medium' },
      { text_he: `Ça plane pour moi הפך לאחד השירים הפאנקיים הצרפתיים המוכרים בעולם`, difficulty: 'easy' },
      { text_he: `מילי Ça plane pour moi הן ערבוב אבסורדי: חתולים שותי ויסקי, מלך ספה, ילדה שמכניסה את עצמה לאמבטיה רותחת`, difficulty: 'medium' },
      { text_he: `המפיק לו ד-פרייק אמר על Ça plane pour moi: "המילים הן רצף של דברים לא קוהרנטיים, שמישהו שמסומם נראה לראות"`, difficulty: 'hard' },
      { text_he: `בית משפט בבריסל ב-2006 פסק שפלסטיק ברטרנד אכן שר את Ça plane pour moi`, difficulty: 'hard' },
      { text_he: `ב-2010 פלסטיק ברטרנד כמעט הודה שלא שר את Ça plane pour moi, לפני שהתנער מהאמירה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `Ça plane pour moi יצא ב-1980`, difficulty: 'medium' },
      { text_he: `מילי Ça plane pour moi מספרות סיפור ברור ומתאים לפאנק קלאסי`, difficulty: 'medium' },
      { text_he: `בית המשפט פסק שלו ד-פרייק (המפיק) הוא ששר את Ça plane pour moi בפועל`, difficulty: 'hard' },
      { text_he: `פלסטיק ברטרנד מעולם לא הוטל ספק לגבי שירתו את Ça plane pour moi`, difficulty: 'medium' },
    ],
  },
  q349: { // Poupée de cire, poupée de son / France Gall
    trueStatements: [
      { text_he: `פראנס גאל ייצגה את לוקסמבורג באירוויזיון 1965 בנאפולי`, difficulty: 'medium' },
      { text_he: `פראנס גאל זכתה ב-32 נקודות באירוויזיון 1965, מקום ראשון מבין 18 משתתפים`, difficulty: 'medium' },
      { text_he: `Poupée de cire ("בובת שעווה" — כביטוי לזמרת שמושרת ועושה מה שאומרים לה) נחשב לראשונים בתחרות שכלל אלמנטים של ביקורת עצמית`, difficulty: 'hard' },
      { text_he: `הבעיה האמיתית עם פראנס גאל הגיעה דווקא בשנה שאחרי Poupée de cire — בשיר "Les Sucettes" של סרז' גנסבור (1966)`, difficulty: 'hard' },
      { text_he: `פראנס גאל לא הבינה כש-"Les Sucettes" יצא שהמילים על "סוכריות עם טעם אניס" מכילות רמזים פורנוגרפיים גלויים לסקס אורלי`, difficulty: 'medium' },
      { text_he: `כשפראנס גאל הבינה את הרמזים ב-"Les Sucettes" — היא הרגישה "מוכפשת ובגודה על ידי המבוגרים סביבה" וסירבה לשיר שירי גנסבור במשך שנים`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `פראנס גאל ייצגה את צרפת באירוויזיון 1965`, difficulty: 'medium' },
      { text_he: `פראנס גאל זכתה במקום השני באירוויזיון 1965`, difficulty: 'medium' },
      { text_he: `המילים הסקסואליות הכפולות של גנסבור נמצאות ב-Poupée de cire עצמו`, difficulty: 'hard' },
      { text_he: `פראנס גאל המשיכה לעבוד עם סרז' גנסבור באהבה גם אחרי "Les Sucettes"`, difficulty: 'medium' },
    ],
  },
  q350: { // Paroles Paroles / Dalida
    trueStatements: [
      { text_he: `Paroles Paroles יצא ב-17 בינואר 1973`, difficulty: 'easy' },
      { text_he: `Paroles Paroles הוא דואט בין הזמרת דלידה לבין השחקן אלן דלון`, difficulty: 'medium' },
      { text_he: `דלידה הקליטה את הקול שלה ל-Paroles Paroles ראשונה`, difficulty: 'medium' },
      { text_he: `אלן דלון הגיע לאולפן להקלטת Paroles Paroles, ביקש כיסא וכיבה את האורות`, difficulty: 'hard' },
      { text_he: `אלן דלון נתן את "תשובתו" לדלידה בפסקול Paroles Paroles בעיקר במבטו עליה בחושך`, difficulty: 'hard' },
      { text_he: `הטקסט של Paroles Paroles מתאר גבר שמציע לאישה "קרמלים, סוכריות ושוקולד"`, difficulty: 'medium' },
      { text_he: `Paroles Paroles הוא במקור גרסה צרפתית של דואט איטלקי של מינה ואלברטו לופו מ-1972`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `Paroles Paroles יצא בנובמבר 1975`, difficulty: 'easy' },
      { text_he: `אלן דלון הקליט את חלקו ל-Paroles Paroles ראשון, לפני דלידה`, difficulty: 'medium' },
      { text_he: `אלן דלון שר באמת את חלקו ב-Paroles Paroles, לא רק דיבר`, difficulty: 'hard' },
      { text_he: `Paroles Paroles הוא במקור גרסה צרפתית של שיר אנגלי`, difficulty: 'medium' },
    ],
  },
  q351: { // Formidable / Stromae
    trueStatements: [
      { text_he: `הקליפ של Formidable צולם בתחנת המטרו לואיז בבריסל`, difficulty: 'medium' },
      { text_he: `צילומי הקליפ של Formidable נעשו במצלמות נסתרות`, difficulty: 'medium' },
      { text_he: `סטרומאה העמיד פנים שהוא שיכור בצילומי Formidable`, difficulty: 'easy' },
      { text_he: `תגובות עוברי האורח בקליפ של Formidable אמיתיות לגמרי`, difficulty: 'medium' },
      { text_he: `אחד מעוברי האורח בקליפ Formidable ניסה למנוע מסטרומאה להתיישב על מסילת החשמלית`, difficulty: 'hard' },
      { text_he: `שלושה שוטרים ניגשו לסטרומאה בצילומי Formidable בלי לדעת שמדובר בצילומים`, difficulty: 'hard' },
      { text_he: `Formidable עוסק בלילה אחרי פרידה — סטרומאה שיכור מנסה להתמודד עם הבדידות`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הקליפ של Formidable צולם בכיכר טריאומף בפריז`, difficulty: 'medium' },
      { text_he: `צילומי Formidable נעשו עם תפאורה מורכבת ושחקני משנה`, difficulty: 'hard' },
      { text_he: `שוטר אחד בלבד ניגש לסטרומאה בצילומי Formidable`, difficulty: 'medium' },
      { text_he: `Formidable עוסק בחגיגת יום הולדת שיצאה משליטה`, difficulty: 'medium' },
    ],
  },
  q353: { // Djadja / Aya Nakamura
    trueStatements: [
      { text_he: `איה נקמורה משתמשת ב-Djadja בארגוט (סלנג) צרפתי`, difficulty: 'medium' },
      { text_he: `הסלנג של איה נקמורה ב-Djadja משלב ביטויים אנגליים, ערביים ובמבארה (שפת מאלי)`, difficulty: 'hard' },
      { text_he: `Djadja עוסק בדחייה של גבר שמשקר ומתגאה בקשר שלכאורה היה לו עם הזמרת איה נקמורה`, difficulty: 'medium' },
      { text_he: `הקליפ של Djadja זכה למעל מיליארד צפיות`, difficulty: 'easy' },
      { text_he: `Djadja הפך לאחד השירים הראשונים מצרפת לחצות מיליארד צפיות ביוטיוב`, difficulty: 'medium' },
      { text_he: `איה נקמורה נחשבת לחלוצה בז'אנר afro-pop צרפתי מודרני`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `איה נקמורה משתמשת ב-Djadja בעיקר בלטינית`, difficulty: 'medium' },
      { text_he: `Djadja עוסק בהתאהבות חדשה של הזמרת`, difficulty: 'medium' },
      { text_he: `הקליפ של Djadja זכה ל-50 מיליון צפיות בלבד`, difficulty: 'medium' },
      { text_he: `איה נקמורה היא חלוצה של ז'אנר ה-trap הצרפתי`, difficulty: 'hard' },
    ],
  },
  q354: { // Volare / Domenico Modugno
    trueStatements: [
      { text_he: `המילה "Volare" (לעוף) נכללה בפזמון Volare בעקבות סערה שפתחה את חלון דומניקו מודוניו`, difficulty: 'medium' },
      { text_he: `הסערה ששטפה את ביתו של דומניקו מודוניו נתנה לו את ההשראה לשנות את הפזמון של Volare`, difficulty: 'hard' },
      { text_he: `דומניקו מודוניו זכה במקום 1 בפסטיבל סן רמו של 1958 עם Volare`, difficulty: 'medium' },
      { text_he: `באירוויזיון 1958 דומניקו מודוניו הגיע למקום 3 עם Volare`, difficulty: 'hard' },
      { text_he: `Volare עמד 5 שבועות במקום 1 בבילבורד הוט 100 בארה"ב`, difficulty: 'medium' },
      { text_he: `Volare זכה בגראמי הראשון אי פעם להקלטת השנה ולשיר השנה (1959)`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `המילה "Volare" נכללה בפזמון Volare בעקבות חלום של מודוניו`, difficulty: 'medium' },
      { text_he: `דומניקו מודוניו זכה במקום 2 בפסטיבל סן רמו של 1958`, difficulty: 'medium' },
      { text_he: `באירוויזיון 1958 מודוניו זכה במקום הראשון עם Volare`, difficulty: 'hard' },
      { text_he: `Volare עמד שבוע אחד בלבד במקום 1 בבילבורד`, difficulty: 'medium' },
    ],
  },
  q355: { // Prisencolinensinainciusol / Adriano Celentano
    trueStatements: [
      { text_he: `אדריאנו צ'לנטאנו אמר על Prisencolinensinainciusol שכוונתו הייתה להראות "את חוסר היכולת לתקשר"`, difficulty: 'medium' },
      { text_he: `המטרה של Prisencolinensinainciusol הייתה להראות איך אנגלית נשמעת לאוזניים שלא מבינות אותה`, difficulty: 'hard' },
      { text_he: `Prisencolinensinainciusol יצא ב-3 בנובמבר 1972`, difficulty: 'medium' },
      { text_he: `Prisencolinensinainciusol הפך לוויראלי באינטרנט שנים מאוחר יותר`, difficulty: 'easy' },
      { text_he: `Prisencolinensinainciusol צבר תחייה ב-2009 אחרי שהבלוג Boing Boing פרסם אותו`, difficulty: 'hard' },
      { text_he: `אפילו תוכניות בריטיות וגרמניות התחילו להראות את Prisencolinensinainciusol כדוגמה לאיך שפתם נשמעת בחוץ`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `המטרה של Prisencolinensinainciusol הייתה להראות איך איטלקית נשמעת לזרים`, difficulty: 'medium' },
      { text_he: `Prisencolinensinainciusol יצא ב-1968`, difficulty: 'medium' },
      { text_he: `הוויראליות של Prisencolinensinainciusol באינטרנט הגיעה דווקא ב-2018`, difficulty: 'medium' },
      { text_he: `המילים ב-Prisencolinensinainciusol הן באיטלקית טהורה`, difficulty: 'hard' },
    ],
  },
  q356: { // Con Te Partirò / Andrea Bocelli
    trueStatements: [
      { text_he: `Con Te Partirò נכתב על ידי לוצ'יו קוורנטוטו (מילים) ופרנצ'סקו סארטורי (מנגינה)`, difficulty: 'hard' },
      { text_he: `הגרסה האנגלית/איטלקית של Con Te Partirò משנת 1996, של בוצ'לי עם שרה ברייטמן, זכתה ל-11x פלטיניום בגרמניה`, difficulty: 'medium' },
      { text_he: `המילים של Con Te Partirò מתארות אדם שמזמין את אהובתו לעזוב יחד למקומות שמעולם לא ראתה`, difficulty: 'medium' },
      { text_he: `למרות שהכותרת הבינלאומית של השיר היא "Time to Say Goodbye", רוב השיר Con Te Partirò עדיין באיטלקית`, difficulty: 'hard' },
      { text_he: `אנדריאה בוצ'לי שר רק חלקים מועטים באנגלית בגרסת "Time to Say Goodbye"`, difficulty: 'medium' },
      { text_he: `Con Te Partirò היה שיר הפרידה של מתאגרף הענקים גרהארד הנטגס מהזירה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Con Te Partirò נכתב על ידי בוצ'לי עצמו`, difficulty: 'medium' },
      { text_he: `הגרסה של בוצ'לי עם ברייטמן זכתה ל-2x פלטיניום בלבד בגרמניה`, difficulty: 'medium' },
      { text_he: `Con Te Partirò הוא כולו באנגלית בגרסה עם ברייטמן`, difficulty: 'hard' },
      { text_he: `Con Te Partirò הוקדש לפרידת לאצ'יו פולוקיו מהזירה`, difficulty: 'medium' },
    ],
  },
  q357: { // La Solitudine / Laura Pausini
    trueStatements: [
      { text_he: `לאורה פאוזיני אמרה על La Solitudine: "הסיפור היה בדיוק תצלום של חיי באותה תקופה"`, difficulty: 'medium' },
      { text_he: `La Solitudine הפך את לאורה פאוזיני בן לילה לכוכבת איטלקית`, difficulty: 'easy' },
      { text_he: `לאורה פאוזיני הייתה הראשונה שזכתה בגראמי לאלבום הפופ הלטיני ב-2007`, difficulty: 'hard' },
      { text_he: `La Solitudine זכה לתרגומים לספרדית, צרפתית ופורטוגזית`, difficulty: 'medium' },
      { text_he: `לאורה פאוזיני זכתה במקום 1 בקטגוריית הצעירים בפסטיבל סן רמו 1993, על La Solitudine`, difficulty: 'medium' },
      { text_he: `לאורה פאוזיני קיבלה 7,464 קולות בתחרות סן רמו 1993, עם La Solitudine`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `לאורה פאוזיני אמרה על La Solitudine: "השיר הוא פיקציה מוחלטת"`, difficulty: 'medium' },
      { text_he: `לאורה פאוזיני זכתה במקום 1 בקטגוריית האמנים הוותיקים בסן רמו 1993`, difficulty: 'medium' },
      { text_he: `לאורה פאוזיני זכתה בגראמי לשיר השנה ב-2000`, difficulty: 'hard' },
      { text_he: `לאורה פאוזיני קיבלה 2,000 קולות בלבד בסן רמו 1993`, difficulty: 'hard' },
    ],
  },
  q358: { // L'Italiano / Toto Cutugno
    trueStatements: [
      { text_he: `טוטו קוטוניו (1943-2023) זכה לאחר L'Italiano באירוויזיון 1990 עם השיר "Insieme: 1992"`, difficulty: 'medium' },
      { text_he: `L'Italiano הפך לאחד מסמלי הזיכרון הקולקטיבי של איטליה`, difficulty: 'easy' },
      { text_he: `L'Italiano הוא מחווה כנה לקהילות מהגרים איטלקיים בעולם`, difficulty: 'medium' },
      { text_he: `L'Italiano נכלל בפסקולים, פרסומות ואירועי ספורט עד היום`, difficulty: 'easy' },
      { text_he: `טוטו קוטוניו הושפע לכתיבת L'Italiano מהופעה שלו בטורונטו, קנדה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `טוטו קוטוניו זכה באירוויזיון 1985 עם L'Italiano`, difficulty: 'medium' },
      { text_he: `L'Italiano נכתב כסאטירה ביקורתית על איטליה`, difficulty: 'medium' },
      { text_he: `טוטו קוטוניו הושפע לכתיבת L'Italiano מהופעה בלוס אנג'לס`, difficulty: 'hard' },
      { text_he: `L'Italiano נחשב כיום לפסולה תרבותית באיטליה`, difficulty: 'medium' },
    ],
  },
  q359: { // Caruso / Lucio Dalla
    trueStatements: [
      { text_he: `לוצ'ו דאלה הקליט את Caruso ב-1986`, difficulty: 'medium' },
      { text_he: `Caruso שוחרר ב-1990 באלבום "Lucio Dalla"`, difficulty: 'medium' },
      { text_he: `לוצ'ו דאלה חיבר את Caruso אחרי שבעלי מלון Excelsior Vittoria בסורנטו סיפרו לו על ימיו האחרונים של הטנור אנריקו קארוזו`, difficulty: 'hard' },
      { text_he: `הטנור אנריקו קארוזו, שעליו השיר Caruso, נפטר ב-1921`, difficulty: 'medium' },
      { text_he: `סיפור Caruso כולל גם את הקשר הרגשי של הטנור אנריקו קארוזו עם תלמידה צעירה`, difficulty: 'medium' },
      { text_he: `אנדריאה בוצ'לי כיסה את Caruso ב-1986 ולוצ'יאנו פאברוטי כיסה אותו ב-1988`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `לוצ'ו דאלה הקליט את Caruso ב-1995`, difficulty: 'medium' },
      { text_he: `הטנור אנריקו קארוזו, שעליו Caruso, נפטר ב-1934`, difficulty: 'medium' },
      { text_he: `לוצ'ו דאלה כתב את Caruso על ימיו האחרונים של ג'וזפה ורדי, לא של אנריקו קארוזו`, difficulty: 'hard' },
      { text_he: `לוצ'יאנו פאברוטי דווקא סירב לכסות את Caruso`, difficulty: 'medium' },
    ],
  },
  q360: { // A Far l'Amore Comincia Tu / Raffaella Carrà
    trueStatements: [
      { text_he: `אחרי מותה ב-2021, רפאלה קארה זכתה לכבוד רב ברחבי אירופה`, difficulty: 'medium' },
      { text_he: `רפאלה קארה הייתה חלוצה של פמיניזם בתעשיית הטלוויזיה האיטלקית`, difficulty: 'medium' },
      { text_he: `ב-2017 רפאלה קארה קיבלה את הפרס "Gay Icon" ב-World Pride Madrid`, difficulty: 'hard' },
      { text_he: `כבר ב-1971 רפאלה קארה יצרה סקנדל בטלוויזיה האיטלקית כשחשפה את הטבור בריקוד "Tuca tuca"`, difficulty: 'easy' },
      { text_he: `העיתון של הוותיקן תיאר אז את רפאלה קארה כ"פרובוקטיבית מדי"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `רפאלה קארה נפטרה ב-2018`, difficulty: 'medium' },
      { text_he: `ספרד הקדישה לרפאלה קארה רחבה רשמית בשמה אחרי מותה`, difficulty: 'hard' },
      { text_he: `רפאלה קארה הייתה ידועה דווקא כשמרנית במופעיה`, difficulty: 'medium' },
      { text_he: `הוותיקן שיבח את רפאלה קארה כסמל למוסר ולמסורת`, difficulty: 'medium' },
    ],
  },
  q361: { // Gloria / Umberto Tozzi
    trueStatements: [
      { text_he: `אומברטו טוצי שאל את הפרגמנט המלודי של Gloria מתוך "Missa Solemnis" של בטהובן (החלק "Gloria")`, difficulty: 'hard' },
      { text_he: `גרסת לורה בראניגן ל-Gloria זכתה במועמדות לגראמי לביצוע פופ נשי ב-1983`, difficulty: 'medium' },
      { text_he: `גרסת לורה בראניגן ל-Gloria הגיעה למקום 2 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `גרסת לורה בראניגן ל-Gloria עמדה במקום 2 בבילבורד למשך 3 שבועות`, difficulty: 'hard' },
      { text_he: `גרסת לורה בראניגן ל-Gloria נחסמה במקום הראשון בבילבורד על ידי "Truly" של ליונל ריצ'י`, difficulty: 'hard' },
      { text_he: `Gloria משמש כהמנון של נבחרת הבייסבול White Sox של שיקגו`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `המלודיה של Gloria לקוחה מ"5th Symphony" של בטהובן`, difficulty: 'hard' },
      { text_he: `גרסת לורה בראניגן ל-Gloria הגיעה למקום 1 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `גרסת בראניגן ל-Gloria נחסמה במקום הראשון בבילבורד על ידי "Eye of the Tiger" של Survivor`, difficulty: 'hard' },
      { text_he: `Gloria משמש כהמנון של נבחרת הבייסבול ניו יורק יאנקיז`, difficulty: 'medium' },
    ],
  },
  q362: { // Nessun Dorma / Luciano Pavarotti
    trueStatements: [
      { text_he: `האריה Nessun Dorma מהאופרה "טורנדוט" של ג'אקומו פוצ'יני נכתבה ב-1926`, difficulty: 'medium' },
      { text_he: `Nessun Dorma עוסקת בנסיך קלאף שחייב לפתור שלוש חידות שהציגה לו הנסיכה טורנדוט`, difficulty: 'hard' },
      { text_he: `אם הנסיך קלאף לא פותר את שלוש החידות של הנסיכה טורנדוט — הוא ימות`, difficulty: 'medium' },
      { text_he: `אחרי שהנסיך קלאף ניצח את שלוש החידות של טורנדוט, הוא נתן לה אתגר משלו: לגלות את שמו עד שחר`, difficulty: 'hard' },
      { text_he: `במילי Nessun Dorma ("שאף אחד לא יישן") הנסיך קלאף בטוח שהוא ינצח את הנסיכה טורנדוט`, difficulty: 'medium' },
      { text_he: `הקלטת לוצ'יאנו פאברוטי של Nessun Dorma מ-1972 שימשה כשיר הנושא של שידור ה-BBC ממונדיאל איטליה 1990`, difficulty: 'easy' },
      { text_he: `הקלטת לוצ'יאנו פאברוטי של Nessun Dorma הגיעה למקום 2 במצעדי בריטניה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `האריה Nessun Dorma של פוצ'יני נכתבה ב-1900`, difficulty: 'medium' },
      { text_he: `האופרה "טורנדוט" של פוצ'יני, שממנה Nessun Dorma, עוסקת בקיסר רומאי קדום`, difficulty: 'hard' },
      { text_he: `הקלטת פאברוטי של Nessun Dorma שימשה למונדיאל ארה"ב 1994`, difficulty: 'medium' },
      { text_he: `הקלטת פאברוטי של Nessun Dorma הגיעה למקום 1 במצעדי בריטניה`, difficulty: 'medium' },
    ],
  },
  q363: { // Azzurro / Adriano Celentano
    trueStatements: [
      { text_he: `Azzurro הולחן על ידי פאולו קונטה (יחד עם ויטו פלאוויצ'יני ומיקלה ויראנו)`, difficulty: 'hard' },
      { text_he: `מילי Azzurro נכתבו על ידי פאולו קונטה וויטו פלאוויצ'יני`, difficulty: 'medium' },
      { text_he: `המילה "azzurro" באיטלקית לא נושאת את הקונוטציה השלילית של "כחול" ("blue") באנגלית`, difficulty: 'medium' },
      { text_he: `פאולו קונטה, מלחין Azzurro, הפך אחר כך למבצע סולו ידוע בעצמו`, difficulty: 'medium' },
      { text_he: `Azzurro נכלל בפסקול הסרט "Buongiorno Notte" של מרקו בלוקיו (2003)`, difficulty: 'hard' },
      { text_he: `Azzurro משמש לעיתים כסמל של אהדה בתחרויות ספורט איטלקיות`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Azzurro הולחן רק על ידי פאולו קונטה לבד`, difficulty: 'medium' },
      { text_he: `המילה "azzurro" באיטלקית בעלת קונוטציה שלילית בדיוק כמו "כחול" באנגלית`, difficulty: 'medium' },
      { text_he: `פאולו קונטה היה רק מלחין ולא ביצע מעולם בעצמו`, difficulty: 'hard' },
      { text_he: `Azzurro משמש כהמנון רשמי של נבחרת איטליה בכדורגל`, difficulty: 'medium' },
    ],
  },
  q364: { // Felicità / Al Bano & Romina Power
    trueStatements: [
      { text_he: `הצמד אל באנו ורומינה פאואר הופיעו באירוויזיון פעמיים`, difficulty: 'easy' },
      { text_he: `הופעתם הראשונה של אל באנו ורומינה באירוויזיון הייתה ב-1976 עם "Noi lo rivivremo di nuovo" (מקום 7)`, difficulty: 'hard' },
      { text_he: `הופעתם השנייה של אל באנו ורומינה באירוויזיון הייתה ב-1985 עם "Magic Oh Magic" (מקום 7)`, difficulty: 'hard' },
      { text_he: `רומינה פאואר היא בתו של השחקן ההוליוודי טיירון פאואר`, difficulty: 'medium' },
      { text_he: `אל באנו ורומינה פאואר היו מהזוגות המוזיקליים המוכרים ביותר באירופה משנות ה-70 ועד שנות ה-90`, difficulty: 'easy' },
      { text_he: `אחרי הפרידה ב-1999, אל באנו המשיך קריירת סולו ולעיתים גם הופיעו עם רומינה יחד`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `אל באנו ורומינה הופיעו באירוויזיון 5 פעמים`, difficulty: 'medium' },
      { text_he: `אל באנו ורומינה זכו באירוויזיון פעם אחת ב-1985`, difficulty: 'medium' },
      { text_he: `רומינה פאואר היא בתו של השחקן רוברט רדפורד`, difficulty: 'hard' },
      { text_he: `אל באנו פרש מהמוזיקה אחרי הפרידה מרומינה`, difficulty: 'medium' },
    ],
  },
  q365: { // Se Bastasse Una Canzone / Eros Ramazzotti
    trueStatements: [
      { text_he: `Se Bastasse Una Canzone הולחן על ידי פיירו קסאנו ואירוס רמאצוטי`, difficulty: 'medium' },
      { text_he: `מילי Se Bastasse Una Canzone נכתבו על ידי אירוס רמאצוטי ואדליו קוליאטי`, difficulty: 'hard' },
      { text_he: `Se Bastasse Una Canzone הוקדש "לחריגים, לחולמים, ולאלה שעדיין מחכים להזדמנות שלהם"`, difficulty: 'medium' },
      { text_he: `Se Bastasse Una Canzone נכלל באלבום אירוס רמאצוטי "In ogni senso" משנת 1990`, difficulty: 'medium' },
      { text_he: `אלבום אירוס רמאצוטי "In ogni senso" שכלל את Se Bastasse Una Canzone הפך לאחד האלבומים הנמכרים ביותר בקריירה שלו`, difficulty: 'easy' },
      { text_he: `Se Bastasse Una Canzone הופיע באנדרטה של נלסון מנדלה ב-1991 ובמופע "Pavarotti & Friends"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `Se Bastasse Una Canzone נכתב לבד על ידי אירוס רמאצוטי`, difficulty: 'medium' },
      { text_he: `Se Bastasse Una Canzone הוקדש "לפוליטיקאים האיטלקים הגדולים"`, difficulty: 'medium' },
      { text_he: `אלבום רמאצוטי שכלל את Se Bastasse Una Canzone נמכר חלקית ולא הצליח`, difficulty: 'hard' },
      { text_he: `Se Bastasse Una Canzone הופיע באנדרטה של ג'ון פ. קנדי`, difficulty: 'medium' },
    ],
  },
  q366: { // Quando Quando Quando / Tony Renis
    trueStatements: [
      { text_he: `Quando Quando Quando יצא ב-1962 כיצירה של טוני רניס`, difficulty: 'easy' },
      { text_he: `Quando Quando Quando נכתב בסגנון בוסה נובה`, difficulty: 'medium' },
      { text_he: `Quando Quando Quando הוצג בפסטיבל סן רמו 1962`, difficulty: 'medium' },
      { text_he: `הגרסה האנגלית של Quando Quando Quando הצליחה הודות לזמר פט בון`, difficulty: 'hard' },
      { text_he: `דואטים מאוחרים של Quando Quando Quando כללו את פאט אלן ואת סטיבי וונדר עם ג'יימי קולום`, difficulty: 'hard' },
      { text_he: `המילה "quando" שחוזרת על עצמה ב-Quando Quando Quando הפכה את מחסום השפה ליתרון`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Quando Quando Quando יצא ב-1968`, difficulty: 'medium' },
      { text_he: `Quando Quando Quando נכתב בסגנון טנגו ארגנטינאי`, difficulty: 'medium' },
      { text_he: `הגרסה האנגלית של Quando Quando Quando הצליחה הודות לפרנק סינטרה`, difficulty: 'hard' },
      { text_he: `דואטים מאוחרים של Quando Quando Quando כללו את פרנק סינטרה ואת עלא לואיס`, difficulty: 'medium' },
    ],
  },
  q367: { // Sarà Perché Ti Amo / Ricchi e Poveri
    trueStatements: [
      { text_he: `Ricchi e Poveri (משמעות בעברית: עשירים ועניים) הוקמה במקור כרביעיה`, difficulty: 'medium' },
      { text_he: `חברי Ricchi e Poveri המקוריים: אנג'לה ברמבטי, אנג'לו סוטג'ו, פרנקו גאטי ומרינה אוקיינה`, difficulty: 'hard' },
      { text_he: `ב-1981 מרינה אוקיינה עזבה את Ricchi e Poveri והם הפכו לשלישייה`, difficulty: 'medium' },
      { text_he: `ב-2020 הרכב הרביעיה המקורי של Ricchi e Poveri התאחד מחדש בפסטיבל סן רמו`, difficulty: 'hard' },
      { text_he: `ההתאחדות של Ricchi e Poveri ב-2020 הייתה לציון 50 שנה ללהקה`, difficulty: 'medium' },
      { text_he: `Sarà Perché Ti Amo יצא בפברואר 1981`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Ricchi e Poveri הוקמה כדואו מההתחלה`, difficulty: 'medium' },
      { text_he: `מרינה אוקיינה הצטרפה ל-Ricchi e Poveri רק ב-1990`, difficulty: 'hard' },
      { text_he: `התאחדות Ricchi e Poveri מחדש בסן רמו הייתה ב-2010`, difficulty: 'medium' },
      { text_he: `Sarà Perché Ti Amo יצא בנובמבר 1979`, difficulty: 'medium' },
    ],
  },
  q368: { // Gangnam Style / PSY
    trueStatements: [
      { text_he: `PSY הסביר על Gangnam Style: "השיר הזה למעשה לועג לאנשים שמנסים מאוד להיות משהו שהם לא"`, difficulty: 'medium' },
      { text_he: `הקליפ של Gangnam Style סוקר את הדימוי של גנגנאם — שכונת היוקרה של סיאול`, difficulty: 'medium' },
      { text_he: `הקליפ של Gangnam Style סוקר את גנגנאם דרך עיני "PSY הלא-גנגנאמי"`, difficulty: 'hard' },
      { text_he: `הקליפ של Gangnam Style היה הראשון אי פעם להגיע למיליארד צפיות ביוטיוב (דצמבר 2012)`, difficulty: 'easy' },
      { text_he: `Gangnam Style הפך ל-K-Pop הראשון שפרץ למיינסטרים העולמי`, difficulty: 'medium' },
      { text_he: `הריקוד "אופפ-גנגנאם-סטייל" של PSY שיחק תפקיד מרכזי בוויראליות הגלובלית של Gangnam Style`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `PSY הצהיר ש-Gangnam Style הוא חגיגה כנה של הסגנון של גנגנאם`, difficulty: 'medium' },
      { text_he: `הקליפ של Gangnam Style היה הראשון להגיע ל-100 מיליון צפיות בלבד`, difficulty: 'medium' },
      { text_he: `הקליפ של Gangnam Style צולם בלוס אנג'לס לקהל בין-לאומי`, difficulty: 'hard' },
      { text_he: `הריקוד של Gangnam Style הומצא על ידי כוריאוגרף אמריקאי`, difficulty: 'medium' },
    ],
  },
  q369: { // Spring Day / BTS
    trueStatements: [
      { text_he: `Spring Day של BTS יצא בפברואר 2017`, difficulty: 'easy' },
      { text_he: `אסון מעבורת הסוול בקוריאה התרחש באפריל 2014`, difficulty: 'medium' },
      { text_he: `באסון מעבורת הסוול ב-2014 טבעו 304 אנשים, רובם תלמידי תיכון`, difficulty: 'hard' },
      { text_he: `RM, סולן BTS, סירב לאשר את הקשר בין Spring Day לאסון מעבורת הסוול בצורה רשמית`, difficulty: 'medium' },
      { text_he: `RM אמר שהקליפ של Spring Day "מתמקד בייצוג ויזואלי של מילות השיר ואפשר לפרש אותו בדרכים רבות"`, difficulty: 'hard' },
      { text_he: `RM חשב על "חברי תיכון שאיבד איתם קשר" כשכתב את Spring Day`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Spring Day יצא ב-2014, חודשים אחרי אסון מעבורת הסוול`, difficulty: 'medium' },
      { text_he: `RM אישר במפורש ש-Spring Day נכתב על אסון מעבורת הסוול`, difficulty: 'medium' },
      { text_he: `באסון מעבורת הסוול ב-2014 נהרגו 50 אנשים בלבד`, difficulty: 'hard' },
      { text_he: `החברה Big Hit (חברת BTS) הצהירה רשמית ש-Spring Day הוא מחווה לקורבנות אסון הסוול`, difficulty: 'medium' },
    ],
  },
  q370: { // Fake Love / BTS
    trueStatements: [
      { text_he: `Fake Love של BTS יצא ב-18 במאי 2018`, difficulty: 'easy' },
      { text_he: `Fake Love הוא הסינגל הראשון מאלבום BTS "Love Yourself: Tear"`, difficulty: 'medium' },
      { text_he: `Fake Love זכה בפלטינום מ-RIAA — הסינגל הראשון של BTS שזכה בכך`, difficulty: 'hard' },
      { text_he: `Fake Love הגיע למקום 10 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `במאי 2018, מקום 10 ב-Fake Love היה השיא של אמן קוריאני בארה"ב`, difficulty: 'hard' },
      { text_he: `הקליפ של Fake Love עם אש הפך לסמל של מסע BTS דרך גן הילדות`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Fake Love יצא ב-2017 כסינגל הראשון של BTS`, difficulty: 'medium' },
      { text_he: `Fake Love זכה בזהב מ-RIAA אבל לא בפלטינום`, difficulty: 'hard' },
      { text_he: `Fake Love הגיע למקום 1 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `הקליפ של Fake Love זכה בפרס Grammy לסרטון הטוב`, difficulty: 'medium' },
    ],
  },
  q371: { // Lucifer / SHINee
    trueStatements: [
      { text_he: `Lucifer של SHINee יצא ב-19 ביולי 2010`, difficulty: 'easy' },
      { text_he: `Lucifer יצא דרך SM Entertainment, הסוכנות של SHINee`, difficulty: 'medium' },
      { text_he: `Lucifer הפך ללהיט מוקדם של SHINee`, difficulty: 'medium' },
      { text_he: `מילי Lucifer משוות אישה דו-פרצופית לשטן — "הלחישה שלה היא לוציפר"`, difficulty: 'hard' },
      { text_he: `הכוריאוגרפיה המורכבת של Lucifer, עם תזוזות ידיים מהירות, הפכה לאחד מסימני ההיכר של SHINee`, difficulty: 'medium' },
      { text_he: `עד היום הכוריאוגרפיה של Lucifer נחשבת לאחת הקשות ביותר ב-K-Pop`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Lucifer של SHINee יצא ב-2008 כסינגל הראשון של הלהקה`, difficulty: 'medium' },
      { text_he: `Lucifer יצא דרך JYP Entertainment`, difficulty: 'hard' },
      { text_he: `מילי Lucifer הן הצהרה רומנטית כנה`, difficulty: 'medium' },
      { text_he: `הכוריאוגרפיה של Lucifer נחשבת לפשוטה במיוחד ב-K-Pop`, difficulty: 'medium' },
    ],
  },
  q372: { // Blood Sweat & Tears / BTS
    trueStatements: [
      { text_he: `אלבום BTS "Wings" מ-2016, שאליו שייך Blood Sweat & Tears, נחשב לאלבום הקונספט הראשון של הלהקה`, difficulty: 'medium' },
      { text_he: `הקליפ של Blood Sweat & Tears זכה לעשרות מיליוני צפיות ביוטיוב בשבוע הראשון`, difficulty: 'easy' },
      { text_he: `הסיפור של "דמיאן" של הרמן הסה — הבסיס לקונספט אלבום Wings — עוסק בחיפוש זהות אצל נער שמגלה את הצד החשוך והאסור בעצמו`, difficulty: 'hard' },
      { text_he: `הקליפ של Blood Sweat & Tears מלא בהפניות ליצירות של פיטר ברויחל הזקן`, difficulty: 'hard' },
      { text_he: `יצירת "נפילת איקרוס" של פיטר ברויחל הזקן מופיעה בקליפ של Blood Sweat & Tears`, difficulty: 'medium' },
      { text_he: `יצירת "הקינה לאיקרוס" של הרברט ג'יימס דרייפר מופיעה בקליפ של Blood Sweat & Tears`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הקליפ של Blood Sweat & Tears מלא בהפניות ליצירות של מיכלאנג'לו`, difficulty: 'medium' },
      { text_he: `אלבום BTS "Wings" שכלל את Blood Sweat & Tears היה אלבום הבכורה של הלהקה`, difficulty: 'medium' },
      { text_he: `הסיפור של "דמיאן" של הרמן הסה הוא קומדיה רומנטית`, difficulty: 'hard' },
      { text_he: `יצירת "Mona Lisa" של דה וינצ'י מופיעה בקליפ של Blood Sweat & Tears`, difficulty: 'medium' },
    ],
  },
  q373: { // Good Day / IU
    trueStatements: [
      { text_he: `IU (לי ג'י-און) הייתה בת 17 כשהקליטה את Good Day ב-2010`, difficulty: 'medium' },
      { text_he: `בסיום Good Day ישנה סדרה של שלושה תווים גבוהים בעלייה של חצאי-טון`, difficulty: 'hard' },
      { text_he: `התווים הגבוהים בסיום Good Day מסתיימים ב-F♯5`, difficulty: 'hard' },
      { text_he: `הביצוע הוואקלי של IU בסיום Good Day נחשב לאחד הרגעים האיקוניים של K-Pop`, difficulty: 'easy' },
      { text_he: `המבקרים ציינו את "יציבות התדר" של IU ב-Good Day ואת "קיבולת הריאות" שלה`, difficulty: 'medium' },
      { text_he: `Good Day הפך את IU לכוכבת על מספר 1 בקוריאה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `IU הייתה בת 21 כשהקליטה את Good Day ב-2010`, difficulty: 'medium' },
      { text_he: `התווים הגבוהים בסיום Good Day מסתיימים ב-C6`, difficulty: 'hard' },
      { text_he: `סדרת התווים הגבוהים בסיום Good Day כוללת חמישה תווים בעלייה`, difficulty: 'medium' },
      { text_he: `Good Day נכשל מסחרית בקוריאה`, difficulty: 'medium' },
    ],
  },
  q374: { // God's Menu / Stray Kids
    trueStatements: [
      { text_he: `חברי Stray Kids — Bang Chan, Changbin ו-Han — היו אחראים על כתיבת והפקת God's Menu`, difficulty: 'medium' },
      { text_he: `Bang Chan, Changbin ו-Han מ-Stray Kids פועלים תחת השם "3Racha" כצוות יצירה`, difficulty: 'hard' },
      { text_he: `הסגנון של God's Menu תואר כ"חלוץ של מאלה-טייסט מיוזיק"`, difficulty: 'hard' },
      { text_he: `"מאלה" (mala) הוא פלפל סצ'ואני חריף — מטאפורה לחריפות הצליל של God's Menu`, difficulty: 'medium' },
      { text_he: `אפקטים בולטים ב-God's Menu: סכינים מתחדדות, סירים שכופרים, צלילי בישול`, difficulty: 'medium' },
      { text_he: `הקליפ של God's Menu מציג את חברי Stray Kids כשפים ב"מסעדה אלוהית"`, difficulty: 'easy' },
      { text_he: `God's Menu יצא ב-17 ביוני 2020`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `חברי Stray Kids — Felix ו-Lee Know — היו האחראים על כתיבת God's Menu`, difficulty: 'medium' },
      { text_he: `הסגנון של God's Menu תואר כ-"K-Trap" קלאסי`, difficulty: 'medium' },
      { text_he: `"מאלה" הוא ביטוי קוריאני לאומנות הקיגאמי`, difficulty: 'hard' },
      { text_he: `God's Menu הופק על ידי מפיקים חיצוניים, לא על ידי חברי Stray Kids`, difficulty: 'medium' },
    ],
  },
  q375: { // Cheer Up / TWICE
    trueStatements: [
      { text_he: `Cheer Up של TWICE יצא באפריל 2016`, difficulty: 'easy' },
      { text_he: `Cheer Up הוא הסינגל השני של TWICE`, difficulty: 'medium' },
      { text_he: `הפזמון של Cheer Up מבטא את האסטרטגיה: "בחורה לא יכולה לתת את לבה בקלות"`, difficulty: 'medium' },
      { text_he: `הפזמון של Cheer Up ממשיך: "ככה תאהב אותי יותר. אעמיד פנים שאני קרירה"`, difficulty: 'hard' },
      { text_he: `Cheer Up זכה ב-Korean Music Awards לשיר השנה ב-2017`, difficulty: 'medium' },
      { text_he: `Cheer Up הוא אחד מסמלי תור הזהב של TWICE`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Cheer Up של TWICE יצא ב-2017 כסינגל הרביעי של הלהקה`, difficulty: 'medium' },
      { text_he: `הפזמון של Cheer Up מעודד בנות לתת את לבן בקלות לאהוב`, difficulty: 'medium' },
      { text_he: `Cheer Up זכה ב-MAMA Award לשיר השנה ב-2017 (ולא ב-Korean Music Awards)`, difficulty: 'hard' },
      { text_he: `Cheer Up היה כישלון יחסי וגרם ל-TWICE לשנות סגנון`, difficulty: 'medium' },
    ],
  },
  q376: { // Fantastic Baby / BIGBANG
    trueStatements: [
      { text_he: `Fantastic Baby נכלל באלבום BIGBANG "Alive" משנת 2012`, difficulty: 'medium' },
      { text_he: `Fantastic Baby הפך לסינגל הראשון של BIGBANG שהגיע ל-Top 100 בבילבורד`, difficulty: 'medium' },
      { text_he: `ב-K-Pop Fantastic Baby נחשב לאחד הסינגלים שגיבשו את ז'אנר האנדרגראונד-פופ הקוריאני`, difficulty: 'hard' },
      { text_he: `הכוריאוגרפיה של Fantastic Baby בעיצוב LIA KIM הפכה לקלאסיקה של השנים האלו`, difficulty: 'hard' },
      { text_he: `הקליפ של Fantastic Baby נחשב לאחד הקליפים הראשונים של K-Pop שעבר את 300 מיליון צפיות`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Fantastic Baby נכלל באלבום BIGBANG "Made" משנת 2016`, difficulty: 'medium' },
      { text_he: `Fantastic Baby הגיע למקום 1 בבילבורד`, difficulty: 'easy' },
      { text_he: `הכוריאוגרפיה של Fantastic Baby היא של ב.דייב, לא של LIA KIM`, difficulty: 'hard' },
      { text_he: `הקליפ של Fantastic Baby עבר את 5 מיליארד צפיות`, difficulty: 'medium' },
    ],
  },
  q377: { // DDU-DU DDU-DU / BLACKPINK
    trueStatements: [
      { text_he: `DDU-DU DDU-DU של BLACKPINK יצא ביוני 2018`, difficulty: 'easy' },
      { text_he: `DDU-DU DDU-DU יצא כסינגל מאלבום ה-EP של BLACKPINK בשם "Square Up"`, difficulty: 'medium' },
      { text_he: `מבקרת מבטאון Business Insider אמרה ש-DDU-DU DDU-DU חסר את "המהות התמטית" של שירים אחרים`, difficulty: 'hard' },
      { text_he: `רוב הביקורות על DDU-DU DDU-DU היו חיוביות`, difficulty: 'medium' },
      { text_he: `ההצלחה של DDU-DU DDU-DU הביאה את BLACKPINK לפסטיבלים גדולים בעולם`, difficulty: 'easy' },
      { text_he: `BLACKPINK הופיעו בפסטיבל קוצ'לה ב-2019 — כראשונים מ-K-Pop`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `DDU-DU DDU-DU יצא בנובמבר 2017`, difficulty: 'medium' },
      { text_he: `כל הביקורות על DDU-DU DDU-DU היו שליליות`, difficulty: 'medium' },
      { text_he: `BLACKPINK הופיעו בקוצ'לה ב-2018 — שנה אחרי הופעתן הראשונה בארה"ב`, difficulty: 'hard' },
      { text_he: `BLACKPINK היו הלהקה הראשונה אי פעם בפסטיבל קוצ'לה`, difficulty: 'medium' },
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
