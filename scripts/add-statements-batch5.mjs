#!/usr/bin/env node
// Batch 5: q321-q366 (30 questions, with gaps)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const statements = {
  q321: { // Corazón Partío / Alejandro Sanz
    trueStatements: [
      { text_he: `השיר יצא ב-3 בנובמבר 1997 מהאלבום "Más"`, difficulty: 'medium' },
      { text_he: `אלבום "Más" הפך לאלבום הספרדי הנמכר ביותר בכל הזמנים בספרד`, difficulty: 'hard' },
      { text_he: `השיר עיצב מחדש את סאונד הפופ הספרדי בשילוב פלמנקו וג'אז`, difficulty: 'medium' },
      { text_he: `השיר פתח את הקריירה הבינלאומית של אלחנדרו סאנז`, difficulty: 'easy' },
      { text_he: `הוא נחשב ל"היט שגרם למהפכה" בפופ הספרדי של שנות ה-90`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-1995 מאלבום הבכורה של סאנז`, difficulty: 'medium' },
      { text_he: `אלבום "Más" נכשל מסחרית בספרד`, difficulty: 'hard' },
      { text_he: `סאנז שילב בעיקר רגאי וסקה בסאונד`, difficulty: 'medium' },
      { text_he: `השיר היה הסינגל האחרון של סאנז לפני יציאתו לפנסיה`, difficulty: 'easy' },
    ],
  },
  q324: { // Aïcha / Khaled
    trueStatements: [
      { text_he: `השיר יצא ב-1996 והפך להיט עולמי`, difficulty: 'medium' },
      { text_he: `ז'אן-ז'אק גולדמן (אחד הכותבים הצרפתים החשובים) כתב את הגרסה הצרפתית`, difficulty: 'medium' },
      { text_he: `חאלד הוסיף ושינה את המילים בערבית באלתור`, difficulty: 'hard' },
      { text_he: `השיר זכה ב-Victoires de la Musique לשיר הצרפתי הטוב של 1997`, difficulty: 'hard' },
      { text_he: `הקליפ עם חאלד שר ברחובות פריז הפך לאיקוני`, difficulty: 'easy' },
      { text_he: `השיר נחשב להמנון של תרבות "ראי-פופ" הצרפתית של שנות ה-90`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `השיר נכתב על ידי גוראן ברגוביץ' מסרביה`, difficulty: 'medium' },
      { text_he: `חאלד כתב את כל מילות השיר בעצמו`, difficulty: 'hard' },
      { text_he: `השיר זכה בגראמי לשיר עולמי הטוב ב-1997`, difficulty: 'hard' },
      { text_he: `הקליפ צולם באלג'יריה ולא בפריז`, difficulty: 'easy' },
    ],
  },
  q325: { // Nour El Ain / Amr Diab
    trueStatements: [
      { text_he: `דיאב הוא אחד מאמני הפופ הערביים המצליחים בכל הזמנים — מעל 100 מיליון אלבומים נמכרו`, difficulty: 'hard' },
      { text_he: `דיאב השפיע על אסתטיקת קליפים ערבית מודרנית`, difficulty: 'medium' },
      { text_he: `הקליפ של "Nour El Ain" צולם בנופים אגדיים`, difficulty: 'medium' },
      { text_he: `השיר זכה לכיסויים בעשרות שפות, כולל הינדי לבוליווד`, difficulty: 'easy' },
      { text_he: `השיר זכה בפרס World Music Award כאלבום הנמכר ביותר במזרח התיכון לשנת 1996`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `דיאב מכר 10 מיליון אלבומים בלבד בכל הקריירה`, difficulty: 'hard' },
      { text_he: `הקליפ של "Nour El Ain" צולם באולפן בלי תפאורה מורכבת`, difficulty: 'medium' },
      { text_he: `השיר לא זכה לכיסויים בשפות אחרות`, difficulty: 'easy' },
      { text_he: `דיאב זכה ב-MTV VMA לסרטון בינלאומי הטוב`, difficulty: 'hard' },
    ],
  },
  q326: { // Ya Rayah / Rachid Taha
    trueStatements: [
      { text_he: `המקור של "יא ראיח" נכתב ובוצע ב-1973 על ידי דחמאן אל-חראשי`, difficulty: 'medium' },
      { text_he: `אל-חראשי הוא אגדת הצ'עבי האלג'יראי`, difficulty: 'hard' },
      { text_he: `רשיד טאהא ביצע את גרסתו ב-1993 באלבומו הראשון`, difficulty: 'hard' },
      { text_he: `טאהא הוציא את השיר כסינגל ב-1997`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 11 במצעדים הצרפתיים`, difficulty: 'hard' },
      { text_he: `השיר זכה לכיסויים בעשרות שפות וגרסאות ושימש כסמל לדור שלם של מהגרים מגרבים`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `המקור של "יא ראיח" הוא של רשיד טאהא עצמו מ-1980`, difficulty: 'medium' },
      { text_he: `דחמאן אל-חראשי הוא זמר ישראלי-יהודי-מרוקאי`, difficulty: 'hard' },
      { text_he: `טאהא הוציא את השיר כסינגל ב-2003`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 במצעדים הצרפתיים`, difficulty: 'hard' },
    ],
  },
  q328: { // Ah W Noss / Nancy Ajram
    trueStatements: [
      { text_he: `האלבום "Ah W Noss" יצא ב-14 באפריל 2004`, difficulty: 'medium' },
      { text_he: `האלבום היה נקודת ציון חשובה בקריירה של ננסי עג'רם`, difficulty: 'easy' },
      { text_he: `ההצלחה הראשונית של ננסי הייתה ב"Akhasmak Ah" (2002)`, difficulty: 'hard' },
      { text_he: `אלבום "Ah W Noss" ביסס את ננסי כסטאר אל"ף בעולם הערבי`, difficulty: 'medium' },
      { text_he: `שירים בולטים נוספים באלבום: "Lawn Ouyounak" (צבע עיניך) ו-"Inta Eyh?"`, difficulty: 'hard' },
      { text_he: `הקליפ הצבעוני של "Ah W Noss" נחשב לאחד מסימני ההיכר של עידן הפופ הערבי החדש`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `האלבום יצא ב-1999 — בתחילת הקריירה של ננסי`, difficulty: 'medium' },
      { text_he: `ההצלחה הראשונית של ננסי הייתה דווקא במצרים`, difficulty: 'hard' },
      { text_he: `אלבום "Ah W Noss" כלל רק שיר אחד מצליח`, difficulty: 'medium' },
      { text_he: `הקליפ של "Ah W Noss" צולם בשחור-לבן`, difficulty: 'easy' },
    ],
  },
  q329: { // Didi / Khaled
    trueStatements: [
      { text_he: `"דידי" של חאלד מ-1992 הפך אותו לסופרסטאר בין-לאומי`, difficulty: 'easy' },
      { text_he: `השיר חדר לאירופה, אסיה ואפריקה`, difficulty: 'medium' },
      { text_he: `בשנות ה-90 קבוצות אסלאמיסטיות באלג'יריה איימו על זמרי הראי`, difficulty: 'easy' },
      { text_he: `שב חסני נרצח ב-29 בספטמבר 1994 בגיל 26`, difficulty: 'hard' },
      { text_he: `שב חסני נרצח מחוץ לבית הוריו באוראן`, difficulty: 'hard' },
      { text_he: `המפיק רשיד באבא-אחמד נורה ב-1995`, difficulty: 'hard' },
      { text_he: `חאלד עזב לצרפת מתישהו אחרי הקלטת אלבום "Kutché" ב-1988`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `"דידי" יצא ב-1985`, difficulty: 'medium' },
      { text_he: `שב חסני נרצח באלג'יר בגיל 35`, difficulty: 'hard' },
      { text_he: `המפיק רשיד באבא-אחמד היה הראשון מבין הראי שנרצח`, difficulty: 'hard' },
      { text_he: `חאלד מעולם לא עזב את אלג'יריה`, difficulty: 'easy' },
    ],
  },
  q332: { // Batwanes Beek / Warda
    trueStatements: [
      { text_he: `וורדה הייתה נשואה למלחין המצרי בלאל חמדי בין השנים שאחרי 1972 ועד 1990`, difficulty: 'hard' },
      { text_he: `הנישואים האלה הם מה שיכול להסביר את הבלבול לגבי בלאל חמדי ככותב השיר`, difficulty: 'hard' },
      { text_he: `בלאל חמדי כן הלחין שירים אחרים של וורדה`, difficulty: 'medium' },
      { text_he: `את "בטוואנס ביק" הלחין סלאח א-שרנובי`, difficulty: 'easy' },
      { text_he: `המילים נכתבו על ידי עומאר בטיישה`, difficulty: 'medium' },
      { text_he: `השיר נחשב לאחד הביצועים הקלאסיים של ז'אנר הטרב הערבי המודרני`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `וורדה ובלאל חמדי לעולם לא היו נישואים`, difficulty: 'hard' },
      { text_he: `בלאל חמדי הוא שהלחין את "בטוואנס ביק"`, difficulty: 'easy' },
      { text_he: `המילים של "בטוואנס ביק" נכתבו על ידי וורדה עצמה`, difficulty: 'medium' },
      { text_he: `סלאח א-שרנובי הוא משורר ולא מלחין`, difficulty: 'medium' },
    ],
  },
  q337: { // Rock El Casbah / Rachid Taha
    trueStatements: [
      { text_he: `רשיד טאהא ביצע גרסה ערבית-אלקטרונית ל-"Rock The Casbah" של The Clash`, difficulty: 'easy' },
      { text_he: `השיר המקורי של The Clash משנת 1982 עסק באיסור על מוזיקת רוק באיראן של חומייני`, difficulty: 'medium' },
      { text_he: `טאהא, מהגר אלג'יראי בצרפת, נתן לשיר ממד נוסף של מחאה על חיי המהגרים בפרברי צרפת`, difficulty: 'hard' },
      { text_he: `טאהא היה חבר אישי של ג'ו סטראמר מ-The Clash`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר המקורי של The Clash עסק באיסור על מוזיקה בסעודיה`, difficulty: 'medium' },
      { text_he: `טאהא הוא מהגר מרוקאי בצרפת`, difficulty: 'hard' },
      { text_he: `טאהא וג'ו סטראמר מעולם לא נפגשו אישית`, difficulty: 'hard' },
      { text_he: `טאהא ביצע את השיר באנגלית בלבד`, difficulty: 'easy' },
    ],
  },
  q339: { // Ne Me Quitte Pas / Brel
    trueStatements: [
      { text_he: `ז'אק ברל אמר בראיון מ-1966 שהשיר הוא "המנון לפחדנות של גברים" — לא שיר אהבה`, difficulty: 'medium' },
      { text_he: `ברל ביקש להראות עד כמה גבר מוכן להשפיל את עצמו`, difficulty: 'easy' },
      { text_he: `הגבר בשיר מבטיח להפוך ל"צל של הצל שלך" ול"כלב לכלב שלך"`, difficulty: 'hard' },
      { text_he: `השיר נכתב במקור ב-1959 אחרי שאהובתו של ברל, סוזאן גבריאלו, נטשה אותו`, difficulty: 'hard' },
      { text_he: `סוזאן עזבה את ברל אחרי שהכריח אותה לעבור הפלה`, difficulty: 'hard' },
      { text_he: `השיר כוסה על ידי כ-200 אמנים — כולל אדית פיאף, ניק קייב ושינא איסטון`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `ברל הצהיר שהשיר הוא "השיר הרומנטי הכי כן שכתבתי"`, difficulty: 'medium' },
      { text_he: `הגבר בשיר מבטיח להפוך ל"צל של אהבתך"`, difficulty: 'hard' },
      { text_he: `סוזאן עזבה את ברל אחרי שהוא בגד בה`, difficulty: 'hard' },
      { text_he: `השיר נכתב ב-1965`, difficulty: 'easy' },
    ],
  },
  q340: { // Papaoutai / Stromae
    trueStatements: [
      { text_he: `שם השיר הוא הצמדה פונטית של "Papa, où t'es?" — "אבא, איפה אתה?" בצרפתית של בלגיה`, difficulty: 'medium' },
      { text_he: `אביו של סטרומאה היה ארכיטקט ממוצא טוצי שנשאר ברואנדה`, difficulty: 'hard' },
      { text_he: `אביו של סטרומאה לא היה נוכח ברוב חיי בנו`, difficulty: 'easy' },
      { text_he: `אביו נרצח ברצח העם ברואנדה ב-1994`, difficulty: 'medium' },
      { text_he: `סטרומאה היה אז בן 9 (לא 5 כפי שלעיתים מצוטט)`, difficulty: 'hard' },
      { text_he: `הקליפ של ססיל פאיגנרט עם הבובה של "אבא הפלסטיק" הפך לאיקוני`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `שם השיר הוא צירוף מילים בקריאולית בלגית`, difficulty: 'medium' },
      { text_he: `אביו של סטרומאה היה רופא ממוצא הוטו`, difficulty: 'hard' },
      { text_he: `אביו נרצח באתיופיה ב-1991`, difficulty: 'medium' },
      { text_he: `סטרומאה היה בן 5 כשאביו נרצח`, difficulty: 'hard' },
    ],
  },
  q341: { // Je t'aime moi non plus / Gainsbourg
    trueStatements: [
      { text_he: `השיר נכתב במקור ב-1967 עבור בריג'יט בארדו, אהובתו של גנסבור באותה תקופה`, difficulty: 'medium' },
      { text_he: `בארדו ביקשה מגנסבור לא לפרסם את ההקלטה`, difficulty: 'easy' },
      { text_he: `הסיבה לבקשה: זה גרם למשבר עם בעלה גונתר זאקס`, difficulty: 'hard' },
      { text_he: `גנסבור הקליט גרסה חדשה ב-1968 עם ג'יין בירקין`, difficulty: 'medium' },
      { text_he: `ג'יין בירקין סיפרה: "נסחפתי קצת עם הנשימות הכבדות — כל כך, שאמרו לי להירגע"`, difficulty: 'hard' },
      { text_he: `השיר נאסר ברדיו בספרד, שוודיה, ברזיל, בריטניה ואיטליה`, difficulty: 'medium' },
      { text_he: `באיטליה, המנכ"ל של חברת התקליטים נכלא בעוון פגיעה במוסר הציבורי`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר נכתב במקור עבור איזבל אדג'אני`, difficulty: 'medium' },
      { text_he: `בארדו ביקשה לפרסם את השיר אבל גנסבור סירב`, difficulty: 'easy' },
      { text_he: `גנסבור הקליט את הגרסה הסופית עם איש משלו, לא עם בירקין`, difficulty: 'hard' },
      { text_he: `השיר התקבל בכבוד בכל אירופה ולא נאסר באף מדינה`, difficulty: 'medium' },
    ],
  },
  q345: { // La Bohème / Aznavour
    trueStatements: [
      { text_he: `אזנבור (1924-2018) נולד באיסטנבול להורים ארמנים`, difficulty: 'medium' },
      { text_he: `אזנבור נחשב לאחד מאמני השאנסון הצרפתי הגדולים בכל הזמנים`, difficulty: 'easy' },
      { text_he: `השיר נכלל באלבום "Charles Aznavour 65"`, difficulty: 'hard' },
      { text_he: `השיר זכה לכיסויים בעשרות שפות`, difficulty: 'medium' },
      { text_he: `הוא נחשב לאחד הסמלים של הזיכרון הקולקטיבי של פריז של תחילת המאה ה-20`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `אזנבור נולד בפריז להורים צרפתיים`, difficulty: 'medium' },
      { text_he: `אזנבור התמחה במוזיקת אופרה ולא בשאנסון`, difficulty: 'easy' },
      { text_he: `השיר זכה לכיסוי בערבית בלבד`, difficulty: 'medium' },
      { text_he: `אזנבור נפטר ב-2002`, difficulty: 'hard' },
    ],
  },
  q346: { // Ça plane pour moi
    trueStatements: [
      { text_he: `השיר יצא ב-1977 (חלקם מצטטים 1978)`, difficulty: 'medium' },
      { text_he: `השיר הפך לאחד השירים הפאנקיים הצרפתיים המוכרים בעולם`, difficulty: 'easy' },
      { text_he: `המילים הן ערבוב אבסורדי: חתולים שותי ויסקי, מלך ספה, ילדה שמכניסה את עצמה לאמבטיה רותחת`, difficulty: 'medium' },
      { text_he: `המפיק לו ד-פרייק אמר: "המילים הן רצף של דברים לא קוהרנטיים, שמישהו שמסומם נראה לראות"`, difficulty: 'hard' },
      { text_he: `בית משפט בבריסל ב-2006 פסק שברטרנד אכן שר את השיר`, difficulty: 'hard' },
      { text_he: `ב-2010 ברטרנד כמעט הודה שלא שר את השיר, לפני שהתנער מהאמירה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-1980`, difficulty: 'medium' },
      { text_he: `המילים מספרות סיפור ברור ומתאים לפאנק קלאסי`, difficulty: 'easy' },
      { text_he: `בית המשפט פסק שלו ד-פרייק (המפיק) הוא שר את השיר`, difficulty: 'hard' },
      { text_he: `ברטרנד מעולם לא הוטל ספק לגבי שירתו את השיר`, difficulty: 'medium' },
    ],
  },
  q349: { // Poupée de cire / France Gall
    trueStatements: [
      { text_he: `גאל ייצגה את לוקסמבורג בתחרות ב-נאפולי`, difficulty: 'medium' },
      { text_he: `היא זכתה ב-32 נקודות, מקום ראשון מבין 18 משתתפים`, difficulty: 'hard' },
      { text_he: `השיר עצמו ("בובת שעווה" כביטוי לזמרת שמושרת ועושה מה שאומרים לה) נחשב לראשונים בתחרות שכלל אלמנטים של ביקורת עצמית`, difficulty: 'hard' },
      { text_he: `הבעיה האמיתית הגיעה דווקא בשנה שאחר כך — ב"Les Sucettes" של גנסבור (1966)`, difficulty: 'medium' },
      { text_he: `גאל לא הבינה שהמילים על "סוכריות עם טעם אניס" מכילות רמזים פורנוגרפיים גלויים לסקס אורלי`, difficulty: 'easy' },
      { text_he: `כשגאל הבינה — היא הרגישה "מוכפשת ובגודה על ידי המבוגרים סביבה" וסירבה לשיר שירי גנסבור במשך שנים`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `גאל ייצגה את צרפת באירוויזיון 1965`, difficulty: 'medium' },
      { text_he: `גאל זכתה במקום השני באירוויזיון`, difficulty: 'hard' },
      { text_he: `המילים הסקסואליות הכפולות נמצאות ב"Poupée de cire" עצמו`, difficulty: 'easy' },
      { text_he: `גאל המשיכה לעבוד עם גנסבור באהבה גם אחרי "Les Sucettes"`, difficulty: 'medium' },
    ],
  },
  q350: { // Paroles Paroles / Dalida
    trueStatements: [
      { text_he: `השיר יצא ב-17 בינואר 1973`, difficulty: 'medium' },
      { text_he: `הוא דואט בין דלידה לבין השחקן אלן דלון`, difficulty: 'easy' },
      { text_he: `דלידה הקליטה את הקול שלה ראשונה`, difficulty: 'medium' },
      { text_he: `דלון הגיע לאולפן, ביקש כיסא, כיבה את האורות`, difficulty: 'hard' },
      { text_he: `דלון נתן את "תשובתו" לפסקול במבטו על דלידה בחושך`, difficulty: 'hard' },
      { text_he: `הטקסט מתאר גבר שמציע לאישה "קרמלים, סוכריות ושוקולד"`, difficulty: 'easy' },
      { text_he: `השיר היה במקור גרסה צרפתית של דואט איטלקי של מינה ואלברטו לופו מ-1972`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר יצא בנובמבר 1975`, difficulty: 'medium' },
      { text_he: `דלון הקליט את חלקו ראשון ולא דלידה`, difficulty: 'medium' },
      { text_he: `דלון שר באמת את חלקו, לא רק דיבר`, difficulty: 'easy' },
      { text_he: `השיר היה גרסה צרפתית של שיר אנגלי`, difficulty: 'hard' },
    ],
  },
  q351: { // Formidable / Stromae
    trueStatements: [
      { text_he: `הקליפ צולם בתחנת המטרו לואיז בבריסל`, difficulty: 'medium' },
      { text_he: `הצילומים נעשו במצלמות נסתרות`, difficulty: 'easy' },
      { text_he: `סטרומאה העמיד פנים שהוא שיכור`, difficulty: 'easy' },
      { text_he: `תגובות עוברי האורח אמיתיות לגמרי`, difficulty: 'medium' },
      { text_he: `אחד מעוברי האורח ניסה למנוע מסטרומאה להתיישב על מסילת החשמלית`, difficulty: 'hard' },
      { text_he: `שלושה שוטרים ניגשו אליו בלי לדעת שמדובר בצילומים`, difficulty: 'hard' },
      { text_he: `השיר עוסק בלילה אחרי פרידה — סטרומאה שיכור מנסה להתמודד עם הבדידות`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הקליפ צולם בכיכר טריאומף בפריז`, difficulty: 'medium' },
      { text_he: `הצילומים נעשו עם תפאורה מורכבת ושחקני משנה`, difficulty: 'easy' },
      { text_he: `שוטרים אחד בלבד ניגש לסטרומאה`, difficulty: 'hard' },
      { text_he: `השיר עוסק בחגיגת יום הולדת שיצאה משליטה`, difficulty: 'medium' },
    ],
  },
  q353: { // Djadja / Aya Nakamura
    trueStatements: [
      { text_he: `נקמורה משתמשת בארגוט (סלנג) צרפתי`, difficulty: 'medium' },
      { text_he: `הסלנג שלה משלב ביטויים אנגליים, ערביים ו-בנמברה (שפת מאלי)`, difficulty: 'hard' },
      { text_he: `השיר עוסק בדחייה של גבר שמשקר ומתגאה בקשר שלכאורה היה לו עם הזמרת`, difficulty: 'easy' },
      { text_he: `הקליפ זכה למעל 1 מיליארד צפיות`, difficulty: 'medium' },
      { text_he: `השיר הפך לאחד הראשונים מצרפת לחצות מיליארד צפיות ביוטיוב`, difficulty: 'easy' },
      { text_he: `נקמורה נחשבת לחלוצה בז'אנר afro-pop צרפתי מודרני`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `נקמורה משתמשת בעיקר בלטינית בשיר`, difficulty: 'medium' },
      { text_he: `השיר עוסק בהתאהבות חדשה`, difficulty: 'easy' },
      { text_he: `הקליפ זכה ל-50 מיליון צפיות בלבד`, difficulty: 'medium' },
      { text_he: `נקמורה היא חלוצה של ז'אנר ה-trap הצרפתי`, difficulty: 'hard' },
    ],
  },
  q354: { // Volare / Modugno
    trueStatements: [
      { text_he: `המילה "Volare" (לעוף) נכללה בפזמון בעקבות סערה שפתחה את חלון מודוניו`, difficulty: 'hard' },
      { text_he: `הסערה נתנה למודוניו את ההשראה לשנות את הפזמון`, difficulty: 'medium' },
      { text_he: `מודוניו זכה במקום 1 בפסטיבל סן רמו של 1958`, difficulty: 'easy' },
      { text_he: `באירוויזיון אותה שנה הוא הגיע למקום 3`, difficulty: 'hard' },
      { text_he: `השיר עמד 5 שבועות במקום 1 בבילבורד הוט 100 בארה"ב`, difficulty: 'medium' },
      { text_he: `הוא זכה בגראמי הראשון אי פעם להקלטה ולשיר השנה (1959)`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `המילה "Volare" נכללה בפזמון בעקבות חלום של מודוניו`, difficulty: 'hard' },
      { text_he: `מודוניו זכה במקום 2 בפסטיבל סן רמו של 1958`, difficulty: 'easy' },
      { text_he: `באירוויזיון 1958 מודוניו זכה במקום הראשון`, difficulty: 'hard' },
      { text_he: `השיר עמד שבוע אחד בלבד במקום 1 בבילבורד`, difficulty: 'medium' },
    ],
  },
  q355: { // Prisencolinensinainciusol / Celentano
    trueStatements: [
      { text_he: `אדריאנו צ'לנטאנו אמר שכוונתו הייתה להראות "את חוסר היכולת לתקשר"`, difficulty: 'medium' },
      { text_he: `המטרה הייתה להראות איך אנגלית נשמעת לאוזניים שלא מבינות אותה`, difficulty: 'easy' },
      { text_he: `השיר יצא ב-3 בנובמבר 1972`, difficulty: 'hard' },
      { text_he: `השיר הפך לוויראלי באינטרנט שנים מאוחר יותר`, difficulty: 'medium' },
      { text_he: `הוא צבר תחייה ב-2009 אחרי שהבלוג Boing Boing פרסם אותו`, difficulty: 'hard' },
      { text_he: `אפילו תוכניות בריטיות וגרמניות התחילו להראות אותו כדוגמה לאיך שפתם נשמעת בחוץ`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `המטרה הייתה להראות איך איטלקית נשמעת לזרים`, difficulty: 'medium' },
      { text_he: `השיר יצא ב-1968`, difficulty: 'hard' },
      { text_he: `הוויראליות באינטרנט הגיעה דווקא ב-2018`, difficulty: 'hard' },
      { text_he: `המילים בשיר הן באיטלקית טהורה`, difficulty: 'easy' },
    ],
  },
  q356: { // Con Te Partirò / Bocelli
    trueStatements: [
      { text_he: `השיר נכתב על ידי לוצ'יו קוורנטוטו (מילים) ופרנצ'סקו סארטורי (מנגינה)`, difficulty: 'hard' },
      { text_he: `הגרסה האנגלית/איטלקית של 1996 עם ברייטמן זכתה ל-11x פלטיניום בגרמניה`, difficulty: 'hard' },
      { text_he: `המילים מתארות אדם שמזמין את אהובתו לעזוב יחד למקומות שמעולם לא ראתה`, difficulty: 'medium' },
      { text_he: `למרות הכותרת באנגלית, רוב השיר עדיין באיטלקית`, difficulty: 'medium' },
      { text_he: `בוצ'לי שר רק חלקים מועטים באנגלית`, difficulty: 'easy' },
      { text_he: `השיר היה שיר הפרידה של מתאגרף הענקים גרהארד הנטגס מהזירה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר נכתב על ידי בוצ'לי עצמו`, difficulty: 'hard' },
      { text_he: `הגרסה עם ברייטמן זכתה ל-2x פלטיניום בלבד בגרמניה`, difficulty: 'hard' },
      { text_he: `השיר הוא כולו באנגלית בגרסה עם ברייטמן`, difficulty: 'medium' },
      { text_he: `השיר הוקדש לפרידת לאצ'יו פולוקיו מהזירה`, difficulty: 'medium' },
    ],
  },
  q357: { // La Solitudine / Pausini
    trueStatements: [
      { text_he: `פאוזיני אמרה: "הסיפור היה בדיוק תצלום של חיי באותה תקופה"`, difficulty: 'medium' },
      { text_he: `השיר הפך אותה בן לילה לכוכבת איטלקית`, difficulty: 'easy' },
      { text_he: `פאוזיני הייתה הראשונה שזכתה בגראמי לאלבום הפופ הלטיני ב-2007`, difficulty: 'hard' },
      { text_he: `השיר זכה לתרגומים לספרדית, צרפתית ופורטוגזית`, difficulty: 'medium' },
      { text_he: `פאוזיני זכתה במקום 1 בקטגוריית הצעירים בפסטיבל סן רמו 1993`, difficulty: 'easy' },
      { text_he: `היא קיבלה 7,464 קולות בתחרות`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `פאוזיני אמרה: "השיר הוא פיקציה מוחלטת"`, difficulty: 'medium' },
      { text_he: `פאוזיני זכתה במקום 1 בקטגוריית האמנים הוותיקים בסן רמו`, difficulty: 'easy' },
      { text_he: `פאוזיני זכתה בגראמי לשיר השנה ב-2000`, difficulty: 'hard' },
      { text_he: `היא קיבלה 2,000 קולות בלבד בסן רמו`, difficulty: 'hard' },
    ],
  },
  q358: { // L'Italiano / Cutugno
    trueStatements: [
      { text_he: `קוטוניו (1943-2023) זכה אחר כך באירוויזיון 1990 עם השיר "Insieme: 1992"`, difficulty: 'hard' },
      { text_he: `"L'Italiano" הפך לאחד מסמלי הזיכרון הקולקטיבי של איטליה`, difficulty: 'medium' },
      { text_he: `השיר הוא מחווה כנה לקהילות מהגרים איטלקיים בעולם`, difficulty: 'easy' },
      { text_he: `השיר נכלל בפסקולים, פרסומות ואירועי ספורט עד היום`, difficulty: 'medium' },
      { text_he: `קוטוניו הושפע מהופעה בטורונטו, קנדה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `קוטוניו זכה באירוויזיון 1985 עם השיר`, difficulty: 'hard' },
      { text_he: `"L'Italiano" נכתב כסאטירה ביקורתית על איטליה`, difficulty: 'easy' },
      { text_he: `קוטוניו הושפע מהופעה בלוס אנג'לס`, difficulty: 'hard' },
      { text_he: `השיר נחשב כיום לפסולה תרבותית באיטליה`, difficulty: 'medium' },
    ],
  },
  q359: { // Caruso / Lucio Dalla
    trueStatements: [
      { text_he: `לוצ'ו דאלה הקליט את השיר ב-1986`, difficulty: 'medium' },
      { text_he: `השיר שוחרר ב-1990 באלבום "Lucio Dalla"`, difficulty: 'hard' },
      { text_he: `דאלה חיבר אותו אחרי שבעלי מלון Excelsior Vittoria בסורנטו סיפרו לו על ימיו האחרונים של הטנור אנריקו קארוזו`, difficulty: 'hard' },
      { text_he: `קארוזו נפטר ב-1921`, difficulty: 'medium' },
      { text_he: `הסיפור כולל גם את הקשר הרגשי של קארוזו עם תלמידה צעירה`, difficulty: 'easy' },
      { text_he: `בוצ'לי כיסה את השיר ב-1986 וגם פאברוטי ב-1988`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `דאלה הקליט את השיר ב-1995`, difficulty: 'medium' },
      { text_he: `קארוזו נפטר ב-1934`, difficulty: 'medium' },
      { text_he: `דאלה כתב את השיר על ימיו האחרונים של ורדי, לא של קארוזו`, difficulty: 'hard' },
      { text_he: `פאברוטי דווקא סירב לכסות את השיר`, difficulty: 'easy' },
    ],
  },
  q360: { // A Far l'Amore Comincia Tu / Carrà
    trueStatements: [
      { text_he: `אחרי מותה ב-2021 קארא זכתה לכבוד רב ברחבי אירופה`, difficulty: 'easy' },
      { text_he: `קארא הייתה חלוצה של פמיניזם בתעשיית הטלוויזיה האיטלקית`, difficulty: 'medium' },
      { text_he: `ב-2017 היא קיבלה פרס "Gay Icon" ב-World Pride Madrid`, difficulty: 'hard' },
      { text_he: `כבר ב-1971 היא יצרה סקנדל בטלוויזיה האיטלקית כשחשפה את הטבור ב"Tuca tuca"`, difficulty: 'hard' },
      { text_he: `העיתון של הוותיקן תיאר אותה אז כ"פרובוקטיבית מדי"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `קארא נפטרה ב-2018`, difficulty: 'easy' },
      { text_he: `ספרד הקדישה לקארא רחבה רשמית בשמה אחרי מותה`, difficulty: 'hard' },
      { text_he: `קארא הייתה ידועה דווקא כשמרנית במופעיה`, difficulty: 'medium' },
      { text_he: `הוותיקן שיבח את קארא כסמל למוסר ולמסורת`, difficulty: 'medium' },
    ],
  },
  q361: { // Gloria / Tozzi
    trueStatements: [
      { text_he: `אומברטו טוצי שאל את הפרגמנט המלודי של השיר מ"Missa solemnis" של בטהובן (החלק "Gloria")`, difficulty: 'hard' },
      { text_he: `גרסת בראניגן זכתה במועמדות לגראמי לביצוע פופ נשי ב-1983`, difficulty: 'medium' },
      { text_he: `הגרסה של בראניגן הגיעה למקום 2 בבילבורד הוט 100`, difficulty: 'easy' },
      { text_he: `השיר עמד במקום 2 ל-3 שבועות`, difficulty: 'medium' },
      { text_he: `הוא נחסם במקום הראשון על ידי "Truly" של ליונל ריצ'י`, difficulty: 'hard' },
      { text_he: `השיר משמש להמנון של נבחרת בייסבול White Sox של שיקגו`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `המלודיה לקוחה מ"5th Symphony" של בטהובן`, difficulty: 'hard' },
      { text_he: `גרסת בראניגן הגיעה למקום 1 בבילבורד הוט 100`, difficulty: 'easy' },
      { text_he: `השיר נחסם במקום הראשון על ידי "Eye of the Tiger" של Survivor`, difficulty: 'hard' },
      { text_he: `השיר משמש להמנון של נבחרת בייסבול ניו יורק יאנקיז`, difficulty: 'easy' },
    ],
  },
  q362: { // Nessun Dorma / Pavarotti
    trueStatements: [
      { text_he: `האריה מהאופרה "טורנדוט" של פוצ'יני נכתבה ב-1926`, difficulty: 'easy' },
      { text_he: `האריה עוסקת בנסיך קלאף שחייב לפתור שלוש חידות שהציגה לו הנסיכה טורנדוט`, difficulty: 'medium' },
      { text_he: `אם קלאף לא פותר את החידות — הוא ימות`, difficulty: 'easy' },
      { text_he: `אחרי שניצח, קלאף נתן לה אתגר משלו: לגלות את שמו עד שחר`, difficulty: 'hard' },
      { text_he: `ב"Nessun dorma" ("שאף אחד לא יישן") הוא בטוח שהוא ינצח`, difficulty: 'medium' },
      { text_he: `הקלטת פאברוטי מ-1972 שימשה כשיר הנושא של שידור ה-BBC ממונדיאל איטליה 1990`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 2 במצעדי בריטניה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `האריה נכתבה ב-1900`, difficulty: 'easy' },
      { text_he: `האופרה "טורנדוט" עוסקת בקיסר רומאי קדום`, difficulty: 'medium' },
      { text_he: `הקלטת פאברוטי שימשה למונדיאל ארה"ב 1994`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 1 במצעדי בריטניה`, difficulty: 'medium' },
    ],
  },
  q363: { // Azzurro / Celentano
    trueStatements: [
      { text_he: `השיר הולחן על ידי פאולו קונטה (יחד עם ויטו פלאוויצ'יני ומיקלה ויראנו)`, difficulty: 'hard' },
      { text_he: `המילים נכתבו על ידי קונטה ופלאוויצ'יני`, difficulty: 'medium' },
      { text_he: `המילה "azzurro" באיטלקית לא נושאת את הקונוטציה השלילית של "כחול" באנגלית`, difficulty: 'medium' },
      { text_he: `פאולו קונטה הפך אחר כך למבצע סולו ידוע`, difficulty: 'hard' },
      { text_he: `השיר נכלל בפסקול הסרט "Buongiorno Notte" של מרקו בלוקיו (2003)`, difficulty: 'hard' },
      { text_he: `הוא משמש לעיתים כסמל של אהדה בתחרויות ספורט איטלקיות`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר הולחן רק על ידי פאולו קונטה לבד`, difficulty: 'hard' },
      { text_he: `המילה "azzurro" באיטלקית בעלת קונוטציה שלילית בדיוק כמו "כחול" באנגלית`, difficulty: 'medium' },
      { text_he: `פאולו קונטה היה רק מלחין ולא ביצע מעולם בעצמו`, difficulty: 'hard' },
      { text_he: `השיר משמש כהמנון של נבחרת איטליה בכדורגל`, difficulty: 'easy' },
    ],
  },
  q364: { // Felicità / Al Bano & Romina Power
    trueStatements: [
      { text_he: `אל באנו ורומינה הופיעו באירוויזיון פעמיים`, difficulty: 'medium' },
      { text_he: `הופעתם הראשונה הייתה ב-1976 עם "Noi lo rivivremo di nuovo" (מקום 7)`, difficulty: 'hard' },
      { text_he: `הופעתם השנייה הייתה ב-1985 עם "Magic Oh Magic" (מקום 7)`, difficulty: 'hard' },
      { text_he: `רומינה היא בתו של השחקן טיירון פאוור`, difficulty: 'medium' },
      { text_he: `הם היו מהזוגות המוזיקליים המוכרים ביותר באירופה משנות ה-70 ועד שנות ה-90`, difficulty: 'easy' },
      { text_he: `אחרי הפרידה ב-1999, אל באנו המשיך קריירה סולו ולעיתים גם הופיעו יחד`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `אל באנו ורומינה הופיעו באירוויזיון 5 פעמים`, difficulty: 'medium' },
      { text_he: `הם זכו באירוויזיון פעם אחת ב-1985`, difficulty: 'hard' },
      { text_he: `רומינה היא בתו של השחקן רוברט רדפורד`, difficulty: 'medium' },
      { text_he: `אל באנו פרש מהמוזיקה אחרי הפרידה`, difficulty: 'easy' },
    ],
  },
  q365: { // Se Bastasse Una Canzone / Ramazzotti
    trueStatements: [
      { text_he: `השיר נכתב על ידי פיירו קסאנו וארוס רמאצוטי (מנגינה)`, difficulty: 'hard' },
      { text_he: `המילים נכתבו על ידי רמאצוטי ואדליו קוליאטי`, difficulty: 'hard' },
      { text_he: `השיר הוקדש "לחריגים, לחולמים, ולאלה שעדיין מחכים להזדמנות שלהם"`, difficulty: 'medium' },
      { text_he: `השיר נכלל באלבום "In ogni senso" משנת 1990`, difficulty: 'medium' },
      { text_he: `האלבום הפך לאחד האלבומים הנמכרים ביותר בקריירה של רמאצוטי`, difficulty: 'easy' },
      { text_he: `השיר הופיע באנדרטה של מנדלה ב-1991 ובמופע "Pavarotti & Friends"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר נכתב לבד על ידי רמאצוטי`, difficulty: 'hard' },
      { text_he: `השיר הוקדש "לפוליטיקאים האיטלקים הגדולים"`, difficulty: 'medium' },
      { text_he: `האלבום שכלל אותו נמכר חלקית ולא הצליח`, difficulty: 'easy' },
      { text_he: `השיר הופיע באנדרטה של ג'ון פ. קנדי`, difficulty: 'hard' },
    ],
  },
  q366: { // Quando Quando Quando / Tony Renis
    trueStatements: [
      { text_he: `השיר יצא ב-1962 כיצירה של טוני רניס`, difficulty: 'medium' },
      { text_he: `הוא נכתב בסגנון בוסה נובה`, difficulty: 'hard' },
      { text_he: `הוא הוצג בפסטיבל סן רמו אותה שנה`, difficulty: 'medium' },
      { text_he: `הגרסה האנגלית הצליחה הודות לפט בון`, difficulty: 'easy' },
      { text_he: `דואטים מאוחרים כללו את פאט אלן וסטיבי וונדר עם ג'יימי קולום`, difficulty: 'hard' },
      { text_he: `המילה "quando" שחוזרת על עצמה הפכה את מחסום השפה ליתרון`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-1968`, difficulty: 'medium' },
      { text_he: `הוא נכתב בסגנון טנגו ארגנטינאי`, difficulty: 'hard' },
      { text_he: `הגרסה האנגלית הצליחה הודות לפרנק סינטרה`, difficulty: 'easy' },
      { text_he: `דואטים מאוחרים כללו את פרנק סינטרה ועלא לואיס`, difficulty: 'hard' },
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
