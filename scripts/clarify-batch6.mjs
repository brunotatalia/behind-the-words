#!/usr/bin/env node
// Self-contained statements pass — batch 6: q380-q420
// Same self-containment rule as previous batches.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const fixed = {
  q380: { // Ta Paidia Tou Peiraia / Manos Hadjidakis
    trueStatements: [
      { text_he: `מנוס חאטזידאקיס זכה באוסקר לשיר המקורי הטוב ביותר ב-1961, על Ta Paidia Tou Peiraia`, difficulty: 'medium' },
      { text_he: `מנוס חאטזידאקיס סירב להגיע לטקס האוסקר ולקבל את הפרס על Ta Paidia Tou Peiraia`, difficulty: 'medium' },
      { text_he: `מנוס חאטזידאקיס אמר שהסרט "לא ביום ראשון", שעבורו נכתב Ta Paidia Tou Peiraia, "משקף לרעה על אתונה"`, difficulty: 'hard' },
      { text_he: `הסרט "לא ביום ראשון", שעבורו נכתב Ta Paidia Tou Peiraia, מתאר זונה כדמות הראשית`, difficulty: 'medium' },
      { text_he: `השחקנית מלינה מרקורי גילמה את הזונה איליה בסרט "לא ביום ראשון"`, difficulty: 'medium' },
      { text_he: `הבמאי ז'יל דאסין ביים את הסרט "לא ביום ראשון"`, difficulty: 'hard' },
      { text_he: `הסרט "לא ביום ראשון" היה מועמד ל-5 פרסי אוסקר`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `מנוס חאטזידאקיס הגיע לטקס וקיבל את האוסקר על Ta Paidia Tou Peiraia באמוציה גדולה`, difficulty: 'medium' },
      { text_he: `הסרט "לא ביום ראשון", שעבורו נכתב Ta Paidia Tou Peiraia, צולם בסקנדינביה`, difficulty: 'medium' },
      { text_he: `מלינה מרקורי הייתה זמרת אופרה ולא שחקנית בסרט "לא ביום ראשון"`, difficulty: 'hard' },
      { text_he: `הסרט "לא ביום ראשון" זכה לאוסקר על סרט זר הטוב`, difficulty: 'medium' },
    ],
  },
  q389: { // My Friend the Wind / Demis Roussos
    trueStatements: [
      { text_he: `דמיס רוסוס היה אחד הזמרים הראשונים ממוצא יווני שזכה להצלחה במצעדי אנגליה ובכל אירופה`, difficulty: 'medium' },
      { text_he: `ב-1985 דמיס רוסוס היה בין הנוסעים שנחטפו על ידי חמושים שיעיים בטיסת TWA 847`, difficulty: 'easy' },
      { text_he: `חוויית החטיפה ב-TWA 847 הייתה אירוע שעיצב את דמיס רוסוס לשארית חייו`, difficulty: 'medium' },
      { text_he: `דמיס רוסוס נפטר ב-25 בינואר 2015`, difficulty: 'medium' },
      { text_he: `דמיס רוסוס נפטר בגיל 68 באתונה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `דמיס רוסוס נחטף בטיסת אייר פרנס ב-1976`, difficulty: 'medium' },
      { text_he: `דמיס רוסוס נפטר ב-2018 בגיל 70`, difficulty: 'medium' },
      { text_he: `דמיס רוסוס נפטר במלון בלאס וגאס`, difficulty: 'hard' },
      { text_he: `דמיס רוסוס היה הזמר היווני המצליח הראשון בארה"ב`, difficulty: 'hard' },
    ],
  },
  q391: { // Du Hast / Rammstein
    trueStatements: [
      { text_he: `מילי Du Hast מצטטות את נוסח שבועות הנישואין הגרמני`, difficulty: 'medium' },
      { text_he: `הנוסח שב-Du Hast: "האם אתה רוצה לקחת אותה לאשתך, לאהוב ולכבד עד שהמוות יפריד בינכם?"`, difficulty: 'hard' },
      { text_he: `התשובה ב-Du Hast לשאלת הנישואין היא "לא"`, difficulty: 'easy' },
      { text_he: `הפזמון של Du Hast נשמע כ-"Du hasst" (אתה שונא) אך בעצם הוא "Du hast" (יש לך / אתה מחזיק)`, difficulty: 'medium' },
      { text_he: `הבית הראשון של Du Hast אומר "Du hast mich" (יש לך אותי)`, difficulty: 'hard' },
      { text_he: `Du Hast נחשב לאחד הסינגלים הגרמניים המצליחים ביותר אי פעם`, difficulty: 'easy' },
      { text_he: `הקליפ של Du Hast (פילטר) זכה למעל מיליארד צפיות`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `מילי Du Hast מצטטות שירת ערש גרמנית מסורתית`, difficulty: 'medium' },
      { text_he: `התשובה ב-Du Hast לשאלת הנישואין היא "כן"`, difficulty: 'easy' },
      { text_he: `הפזמון של Du Hast מבוסס על משחק מילים בין "Liebe" (אהבה) ל-"Lebe" (לחיות)`, difficulty: 'hard' },
      { text_he: `הקליפ של Du Hast זכה ל-100 מיליון צפיות בלבד`, difficulty: 'medium' },
    ],
  },
  q392: { // Rock Me Amadeus / Falco
    trueStatements: [
      { text_he: `פלקו (יוהאן הולצל) חי בין השנים 1957-1998`, difficulty: 'medium' },
      { text_he: `פלקו הציג ב-Rock Me Amadeus את מוצרט כ"רוק סטאר של המאה ה-18" — קונספט שהיה מהפכני בזמנו`, difficulty: 'medium' },
      { text_he: `Rock Me Amadeus עמד 3 שבועות במקום 1 בבילבורד הוט 100 ב-1986`, difficulty: 'easy' },
      { text_he: `Rock Me Amadeus היה השיר היחיד בגרמנית שהגיע למקום 1 בבילבורד הוט 100`, difficulty: 'hard' },
      { text_he: `שיר ספרדי הגיע למקום 1 בבילבורד הוט 100 רק ב-1987 (אחרי Rock Me Amadeus), ושיר קוריאני הגיע ב-2020`, difficulty: 'hard' },
      { text_he: `פלקו נהרג בתאונת דרכים ב-6 בפברואר 1998 ברפובליקה הדומיניקנית בגיל 40`, difficulty: 'medium' },
      { text_he: `נסיבות מותו של פלקו עוררו ספקולציות לאור התמודדותו עם דיכאון`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `פלקו חי בין 1962-2002`, difficulty: 'medium' },
      { text_he: `Rock Me Amadeus עמד 6 שבועות במקום 1 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `שירים גרמניים נוספים הגיעו למקום 1 בבילבורד אחרי Rock Me Amadeus`, difficulty: 'hard' },
      { text_he: `פלקו נהרג בתאונת מטוס ברפובליקה הדומיניקנית`, difficulty: 'medium' },
    ],
  },
  q394: { // Mas Que Nada / Jorge Ben
    trueStatements: [
      { text_he: `הביטוי "Preto Velho" (זקן שחור) ב-Mas Que Nada הוא ארכטיפ של רוח אומבנדית`, difficulty: 'hard' },
      { text_he: `"Preto Velho" מסמל חוכמה, סבלנות והיסטוריית העבדים האפריקאים בברזיל`, difficulty: 'hard' },
      { text_he: `Mas Que Nada היה הצלחה גדולה ב-1963`, difficulty: 'easy' },
      { text_he: `Mas Que Nada נכלל גם בגרסה של Sergio Mendes & Brasil '66`, difficulty: 'medium' },
      { text_he: `גרסת Sergio Mendes & Brasil '66 ל-Mas Que Nada הפכה את השיר ללהיט עולמי`, difficulty: 'medium' },
      { text_he: `ב-2006 להקת Black Eyed Peas עיבדה את Mas Que Nada יחד עם ז'ורז' בן ועם ססיליה בנדס`, difficulty: 'medium' },
      { text_he: `גרסת Black Eyed Peas עם ז'ורז' בן ל-Mas Que Nada הגיעה למקום 1 בבריטניה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `"Preto Velho" הוא ביטוי לדוגמה לכלב שחור בברזיל`, difficulty: 'hard' },
      { text_he: `Mas Que Nada היה כישלון מסחרי בברזיל ב-1963`, difficulty: 'medium' },
      { text_he: `Sergio Mendes נמנע מלעבד את Mas Que Nada`, difficulty: 'medium' },
      { text_he: `Black Eyed Peas עיבדו את Mas Que Nada ב-2010, לא ב-2006`, difficulty: 'medium' },
    ],
  },
  q398: { // Dragostea Din Tei / O-Zone
    trueStatements: [
      { text_he: `O-Zone הוקמה ב-1999 בקישינב, מולדובה, על ידי דן באלאן`, difficulty: 'medium' },
      { text_he: `חברי O-Zone עברו לבוקרשט, רומניה ב-2002`, difficulty: 'medium' },
      { text_he: `Dragostea Din Tei היה רב-מכר בכל אירופה — מקום 1 בכל המדינות הגדולות`, difficulty: 'easy' },
      { text_he: `גארי ברולסמה (יוצר וידאו ה-"Numa Numa" הוויראלי על Dragostea Din Tei) מעולם לא צפה לוויראליות`, difficulty: 'hard' },
      { text_he: `גארי ברולסמה העלה את הסרטון של עצמו שר ל-Dragostea Din Tei לאתר Newgrounds והוא התפשט מעצמו`, difficulty: 'hard' },
      { text_he: `Dragostea Din Tei תורגם ל-14 שפות וכוסה על ידי עשרות אמנים`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `O-Zone הוקמה בבוקרשט ב-2001`, difficulty: 'medium' },
      { text_he: `גארי ברולסמה תכנן את הוויראליות של Dragostea Din Tei מראש`, difficulty: 'hard' },
      { text_he: `סרטון "Numa Numa" של ברולסמה ל-Dragostea Din Tei הועלה ליוטיוב במקור`, difficulty: 'medium' },
      { text_he: `Dragostea Din Tei נשאר רק במולדובה ולא הצליח באירופה`, difficulty: 'easy' },
    ],
  },
  q399: { // Tunak Tunak Tun / Daler Mehndi
    trueStatements: [
      { text_he: `דאלר מהנדי הוא זמר באהנגרא הודי`, difficulty: 'easy' },
      { text_he: `דאלר מהנדי ספג ביקורת שהשירים שלו מצליחים בגלל "ריבוי הדוגמניות הרוקדות בקליפים"`, difficulty: 'medium' },
      { text_he: `כתגובה לביקורת על השימוש בדוגמניות, דאלר מהנדי יצר ב-1998 את הקליפ של Tunak Tunak Tun עם 4 עותקים דיגיטליים של עצמו בלבד`, difficulty: 'hard' },
      { text_he: `הקליפ של Tunak Tunak Tun עשה שימוש בטכנולוגיית בלוסקרין — הראשון בהודו`, difficulty: 'medium' },
      { text_he: `כל אחד מארבעת העותקים של דאלר מהנדי בקליפ Tunak Tunak Tun ייצג יסוד קלאסי שונה (אש, מים, אדמה, אוויר)`, difficulty: 'hard' },
      { text_he: `Tunak Tunak Tun אכן הגיע למקום 1 בהודו והוכיח את הטענה של מהנדי`, difficulty: 'medium' },
      { text_he: `ב-2007 הקליפ של Tunak Tunak Tun הפך לאחד מהסרטונים ההודיים הראשונים שנעשו ויראליים באינטרנט המערבי`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `דאלר מהנדי הוא זמר רגאיי אינדי-בריטי`, difficulty: 'medium' },
      { text_he: `הקליפ של Tunak Tunak Tun כולל 6 עותקים דיגיטליים של מהנדי`, difficulty: 'medium' },
      { text_he: `כל עותק של דאלר מהנדי בקליפ Tunak Tunak Tun ייצג שלב אחר בחיי האדם`, difficulty: 'hard' },
      { text_he: `הקליפ של Tunak Tunak Tun נכשל בהודו אבל הצליח בארה"ב`, difficulty: 'medium' },
    ],
  },
  q400: { // Hey Jude / The Beatles
    trueStatements: [
      { text_he: `פול מקרטני התחיל את Hey Jude עם הרעיון "Hey Jules"`, difficulty: 'medium' },
      { text_he: `"Jules" היה שמו של ג'וליאן לנון, בנו של ג'ון לנון, בן ה-5`, difficulty: 'medium' },
      { text_he: `פול מקרטני ביקר את ג'וליאן לנון ואמו סינתיה ביוני 1968 בעיצומה של הפרידה בין ג'ון לנון לסינתיה`, difficulty: 'hard' },
      { text_he: `פול מקרטני שינה את "Jules" ל-"Jude" כי חשב שזה "נשמע קצת יותר טוב"`, difficulty: 'medium' },
      { text_he: `ג'וליאן לנון גילה ש-Hey Jude נכתב עליו רק בערך 20 שנה אחרי שהשיר יצא, סביב 1988`, difficulty: 'hard' },
      { text_he: `ב-1996 ג'וליאן לנון רכש את הערות ההקלטה המקוריות של Hey Jude במכירה פומבית ב-25,000 פאונד`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `פול מקרטני התחיל את Hey Jude עם הרעיון "Hey Joe"`, difficulty: 'medium' },
      { text_he: `ג'וליאן לנון היה בן 10 כשפול מקרטני כתב את Hey Jude`, difficulty: 'medium' },
      { text_he: `ג'וליאן לנון ידע מההתחלה ש-Hey Jude נכתב עליו`, difficulty: 'hard' },
      { text_he: `ב-1996 ג'וליאן לנון רכש את הערות ההקלטה של Hey Jude ב-100,000 פאונד`, difficulty: 'medium' },
    ],
  },
  q401: { // Tiny Dancer / Elton John
    trueStatements: [
      { text_he: `ברני טאופין, כותב המילים של אלטון ג'ון, אישר ב-1973 ב-Rolling Stone ש-Tiny Dancer נכתב על אשתו דאז מקסין פייבלמן`, difficulty: 'medium' },
      { text_he: `מקסין פייבלמן עצמה אישרה ב-2019: "ידעתי ש-Tiny Dancer עליי"`, difficulty: 'easy' },
      { text_he: `מקסין פייבלמן, אשת ברני טאופין דאז, הייתה במחול בלט קלאסי מילדה`, difficulty: 'medium' },
      { text_he: `מקסין פייבלמן תפרה טלאים על הג'קטים והג'ינסים של אלטון ג'ון`, difficulty: 'hard' },
      { text_he: `ברני טאופין כתב את Tiny Dancer בנסיעתו הראשונה לקליפורניה ב-1970`, difficulty: 'medium' },
      { text_he: `Tiny Dancer הופיע באלבום אלטון ג'ון "Madman Across the Water" מ-1971`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `מקסין פייבלמן (השראת Tiny Dancer) הייתה אחותו של ברני טאופין`, difficulty: 'medium' },
      { text_he: `מקסין פייבלמן הייתה זמרת אופרה במקצועה`, difficulty: 'hard' },
      { text_he: `ברני טאופין כתב את Tiny Dancer בלונדון ב-1968`, difficulty: 'medium' },
      { text_he: `Tiny Dancer הופיע באלבום הבכורה של אלטון ג'ון`, difficulty: 'medium' },
    ],
  },
  q402: { // Jolene / Dolly Parton
    trueStatements: [
      { text_he: `דולי פרטון הודתה ש-Jolene מבוסס על "אמת חלקית"`, difficulty: 'medium' },
      { text_he: `המקור האמיתי ל-Jolene: פקידה ג'ינג'ית בבנק של דולי פרטון שפלירטטה בבוטות עם בעלה קרל דין`, difficulty: 'medium' },
      { text_he: `הפקידה הג'ינג'ית פלירטטה עם קרל דין זמן קצר אחרי חתונתו עם דולי פרטון`, difficulty: 'medium' },
      { text_he: `השם "ג'ולין" עצמו הגיע מפגישה של דולי פרטון עם מעריצה בת 10`, difficulty: 'hard' },
      { text_he: `דולי פרטון שמה לב לשיער האדום היפה של הילדה ושאלה לשמה — "ג'ולין"`, difficulty: 'medium' },
      { text_he: `Jolene הגיע למקום 1 ב-Hot Country ב-1974`, difficulty: 'easy' },
      { text_he: `בכיסוי המפורסם של ביונסה ל-Jolene ב-2024 הוצא הקטע על "מתחננת אליה"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `דולי פרטון הצהירה ש-Jolene הוא בדיוני לחלוטין`, difficulty: 'medium' },
      { text_he: `הפקידה האמיתית בבנק של דולי פרטון נקראת "ג'ולין" כשם השיר`, difficulty: 'medium' },
      { text_he: `המעריצה של דולי פרטון שנתנה את השם "ג'ולין" הייתה בת 5`, difficulty: 'hard' },
      { text_he: `Jolene הגיע למקום 1 בבילבורד הוט 100 ב-1974`, difficulty: 'medium' },
    ],
  },
  q403: { // Smooth Criminal / Michael Jackson
    trueStatements: [
      { text_he: `הפזמון "Annie, are you OK?" ב-Smooth Criminal הוקדם מבובת ה-CPR "Resusci Anne" של חברת Laerdal`, difficulty: 'hard' },
      { text_he: `מתאמני החייאה שואלים את בובת Resusci Anne את השאלה "Annie, are you OK?" לפני שמתחילים`, difficulty: 'medium' },
      { text_he: `הסיפור על מייקל ג'קסון ששמע את "Annie, are you OK?" בקורס החייאה הוא בחזקת מסורת פופולרית`, difficulty: 'hard' },
      { text_he: `הקליפ של Smooth Criminal (מתוך הסרט "Moonwalker") היה בבימוי מרטין סקורסזה`, difficulty: 'easy' },
      { text_he: `הריקוד "Anti-Gravity Lean" — שבו מייקל ג'קסון נשען ב-45 מעלות — הוא חלק מהקליפ של Smooth Criminal`, difficulty: 'medium' },
      { text_he: `הריקוד "Anti-Gravity Lean" של Smooth Criminal מצריך נעליים מיוחדות עם רגל מגנטית שמייקל ג'קסון רשם בפטנט`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הפזמון "Annie, are you OK?" ב-Smooth Criminal מבוסס על אישה אמיתית בשם אנני שמייקל ג'קסון הכיר`, difficulty: 'medium' },
      { text_he: `הקליפ של Smooth Criminal היה בבימוי סטיבן ספילברג, לא מרטין סקורסזה`, difficulty: 'hard' },
      { text_he: `הריקוד "Anti-Gravity Lean" של Smooth Criminal הוא בנטייה של 90 מעלות`, difficulty: 'medium' },
      { text_he: `הנעליים המיוחדות של Smooth Criminal לא היו מוגנות בפטנט והועתקו על ידי רקדנים אחרים`, difficulty: 'hard' },
    ],
  },
  q404: { // Mr. Jones / Counting Crows
    trueStatements: [
      { text_he: `Mr. Jones יצא ב-1993 מאלבום הבכורה של Counting Crows "August and Everything After"`, difficulty: 'medium' },
      { text_he: `Mr. Jones היה הלהיט הגדול הראשון של Counting Crows`, difficulty: 'easy' },
      { text_he: `אדם דוריץ, סולן Counting Crows, הוא הסולן בשיר Mr. Jones`, difficulty: 'easy' },
      { text_he: `אדם דוריץ ידוע בשיער הדרדלוקס המיוחד שלו, שהופיע איתו 30 שנה אחרי Mr. Jones`, difficulty: 'medium' },
      { text_he: `Mr. Jones נכלל ברשימות של 500 השירים הטובים בכל הזמנים`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Mr. Jones יצא ב-1995 מאלבום השני של Counting Crows`, difficulty: 'medium' },
      { text_he: `אדם דוריץ הוא הבסיסט של Counting Crows`, difficulty: 'medium' },
      { text_he: `אדם דוריץ הקריח אחרי שנים והשתנה לחלוטין`, difficulty: 'hard' },
      { text_he: `Mr. Jones נכשל מסחרית והגיע רק למקום 50 בבילבורד`, difficulty: 'medium' },
    ],
  },
  q405: { // Maggie May / Rod Stewart
    trueStatements: [
      { text_he: `רוד סטיוארט אמר על Maggie May: "מגי מיי הייתה סיפור אמיתי, על האישה הראשונה שעשיתי איתה סקס"`, difficulty: 'medium' },
      { text_he: `המפגש שעורר את Maggie May היה בפסטיבל הג'אז של Beaulieu ב-1961`, difficulty: 'hard' },
      { text_he: `רוד סטיוארט היה בן 16 בזמן המפגש שעורר את Maggie May`, difficulty: 'medium' },
      { text_he: `"מגי מיי" עצמו לא היה שמה האמיתי של האישה שעוררה את השיר`, difficulty: 'medium' },
      { text_he: `רוד סטיוארט שאל את השם "מגי מיי" משיר עם ליברפולי עתיק על זונה בשם "מגי מיי"`, difficulty: 'hard' },
      { text_he: `Maggie May יצא ב-1971 כצד B של סינגל`, difficulty: 'medium' },
      { text_he: `דיג'ייז הפכו את Maggie May ל-A-side, והוא הגיע למקום 1 ב-UK ובארה"ב באותו שבוע`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `המפגש שעורר את Maggie May היה בפסטיבל וודסטוק ב-1969`, difficulty: 'medium' },
      { text_he: `רוד סטיוארט היה בן 22 בזמן המפגש שעורר את Maggie May`, difficulty: 'medium' },
      { text_he: `"מגי מיי" היה שמה האמיתי של האישה שעוררה את השיר`, difficulty: 'hard' },
      { text_he: `Maggie May יצא במקור כסינגל A-side מצד אחד בלבד`, difficulty: 'medium' },
    ],
  },
  q406: { // Take On Me / a-ha
    trueStatements: [
      { text_he: `Take On Me הוקלט בשתי גרסאות מרכזיות`, difficulty: 'medium' },
      { text_he: `הגרסה הראשונה של Take On Me הוקלטה ב-1984 עם המפיק טוני מנספילד — והייתה כישלון`, difficulty: 'hard' },
      { text_he: `הגרסה השנייה של Take On Me הוקלטה עם המפיק אלן טארני ב-1985 — והפכה ללהיט`, difficulty: 'hard' },
      { text_he: `הקליפ של Take On Me בבימוי סטיב ברון השתמש בטכניקת ה-rotoscoping (שילוב בין צילום חי וציורי דיו)`, difficulty: 'medium' },
      { text_he: `הקליפ של Take On Me לקח 16 שבועות להפיק`, difficulty: 'hard' },
      { text_he: `הקליפ של Take On Me זכה ב-6 פרסי MTV ב-1986`, difficulty: 'easy' },
      { text_he: `פרסי ה-MTV של Take On Me כללו את: New Artist, Concept Video, Most Experimental Video, Direction, Special Effects, Viewer's Choice`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `Take On Me הוקלט בגרסה אחת בלבד והפך ללהיט מיד`, difficulty: 'medium' },
      { text_he: `הקליפ של Take On Me נעשה באנימציה תלת-ממדית מתקדמת`, difficulty: 'medium' },
      { text_he: `הקליפ של Take On Me זכה ב-3 פרסי MTV בלבד`, difficulty: 'hard' },
      { text_he: `הקליפ של Take On Me צולם תוך 3 ימים`, difficulty: 'medium' },
    ],
  },
  q407: { // Don't Stop Believin' / Journey
    trueStatements: [
      { text_he: `סטיב פרי, סולן Journey, הסביר את הבחירה ב-"South Detroit" ב-Don't Stop Believin': "ניסיתי 'דרום דטרויט', ניסיתי 'מזרח' ו-'מערב' וזה לא שר"`, difficulty: 'medium' },
      { text_he: `סטיב פרי הוסיף: "אבל 'דרום דטרויט' נשמע כל כך יפה. אהבתי את הצליל"`, difficulty: 'hard' },
      { text_he: `גיאוגרפית, דרומית לדטרויט נמצאת העיר וינדזור, אונטריו, בקנדה — לא חלק מדטרויט`, difficulty: 'medium' },
      { text_he: `דטרויט שוכנת על הגדה הצפונית של נהר דטרויט`, difficulty: 'medium' },
      { text_he: `Don't Stop Believin' יצא ב-1981`, difficulty: 'easy' },
      { text_he: `Don't Stop Believin' חזר לחיים אחרי הפרק האחרון של "הסופרנוס" ב-2007`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `דרומית לדטרויט נמצאת העיר טולדו, אוהיו`, difficulty: 'medium' },
      { text_he: `סטיב פרי גר בדרום דטרויט בילדותו`, difficulty: 'medium' },
      { text_he: `Don't Stop Believin' יצא ב-1977`, difficulty: 'medium' },
      { text_he: `Don't Stop Believin' חזר לחיים אחרי "Glee" ב-2009 ולא אחרי "הסופרנוס"`, difficulty: 'hard' },
    ],
  },
  q408: { // Africa / Toto
    trueStatements: [
      { text_he: `Africa יצא ב-1982 מאלבום Toto IV`, difficulty: 'easy' },
      { text_he: `Africa הגיע למקום 1 בבילבורד הוט 100 ב-1983`, difficulty: 'medium' },
      { text_he: `בעידן הסטרימינג, Africa זכה לתחייה ב-2017`, difficulty: 'medium' },
      { text_he: `Africa הפך לאחד השירים המושמעים ביותר של שנות ה-80`, difficulty: 'easy' },
      { text_he: `ב-2019 הוצבה בנמיביה התקנה — מערכת לוואים מסוקרת שמנגנת את Africa אינסוף בלולאה במדבר`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `Africa יצא ב-1985 מאלבום Toto V`, difficulty: 'medium' },
      { text_he: `Africa הגיע למקום 5 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `התחייה של Africa התרחשה ב-2010, לא ב-2017`, difficulty: 'medium' },
      { text_he: `התקנת הסאונד שמנגנת את Africa בלולאה הוצבה בקניה ב-2018`, difficulty: 'hard' },
    ],
  },
  q410: { // Sweet Caroline / Neil Diamond
    trueStatements: [
      { text_he: `ניל דיימונד הודה ב-2007 שההשראה ל-Sweet Caroline הגיעה מתצלום של קרוליין קנדי`, difficulty: 'medium' },
      { text_he: `קרוליין קנדי הייתה בערך בת 11 כש-Sweet Caroline יצא`, difficulty: 'medium' },
      { text_he: `ניל דיימונד שר את Sweet Caroline בפרטיות במסיבת יום הולדת 50 של קרוליין קנדי ב-2007`, difficulty: 'hard' },
      { text_he: `ב-2014 ניל דיימונד שינה את גרסתו ואמר ש-Sweet Caroline היה למעשה על אשתו דאז`, difficulty: 'hard' },
      { text_he: `ניל דיימונד הסביר שהיה צריך שם בעל 3 הברות שיתאים למלודיה של Sweet Caroline`, difficulty: 'medium' },
      { text_he: `Sweet Caroline הפך להמנון של נבחרת הבייסבול בוסטון רד סוקס ב-2002`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ניל דיימונד אמר מההתחלה ש-Sweet Caroline על אשתו, לא על קרוליין קנדי`, difficulty: 'medium' },
      { text_he: `קרוליין קנדי הייתה בת 25 כש-Sweet Caroline יצא`, difficulty: 'medium' },
      { text_he: `ניל דיימונד שר את Sweet Caroline בטקס פומבי לכבוד יום הולדת 50 לקרוליין קנדי`, difficulty: 'hard' },
      { text_he: `Sweet Caroline הפך להמנון של נבחרת הבייסבול ניו יורק יאנקיז`, difficulty: 'easy' },
    ],
  },
  q411: { // Stayin' Alive / Bee Gees
    trueStatements: [
      { text_he: `הקצב של Stayin' Alive הוא בערך 103 פעימות לדקה (BPM)`, difficulty: 'medium' },
      { text_he: `הקצב של Stayin' Alive נופל בטווח המומלץ של איגוד הלב האמריקאי לעיסוי לב בהחייאה (100-120 פעימות לדקה)`, difficulty: 'hard' },
      { text_he: `מחקרים הראו ש-CPR בתזמון לקצב של Stayin' Alive משפר את שמירת הזיכרון של הטכניקה`, difficulty: 'medium' },
      { text_he: `ב-2008 איגוד הלב האמריקאי פתח קמפיין סביב Stayin' Alive עם הסרטון של קן ג'ונג בחליפת "סטיין אלייב"`, difficulty: 'hard' },
      { text_he: `מחקרים הראו ש-"Another One Bites the Dust" של Queen עובד טוב לתזמון CPR — אם כי קצת אירוני`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הקצב של Stayin' Alive הוא 80 פעימות לדקה`, difficulty: 'medium' },
      { text_he: `הטווח המומלץ של איגוד הלב לעיסוי לב הוא 60-80 פעימות לדקה`, difficulty: 'medium' },
      { text_he: `קמפיין איגוד הלב סביב Stayin' Alive היה ב-1998 עם הסרטון של ג'ון טראבולטה`, difficulty: 'hard' },
      { text_he: `מחקרים הראו ש-"Macarena" עובד טוב יותר ל-CPR מאשר Stayin' Alive`, difficulty: 'medium' },
    ],
  },
  q412: { // White Wedding / Billy Idol
    trueStatements: [
      { text_he: `בילי איידול היה כועס שאחותו הצעירה ג'יין התחתנה כשהיא בהריון`, difficulty: 'medium' },
      { text_he: `המצב של אחותו של בילי איידול הפך את ה"חתונה הלבנה" (שמלה לבנה כסמל לבתולים) לצביעות בעיני בילי איידול`, difficulty: 'hard' },
      { text_he: `רבים ממאזיני White Wedding מתעקשים לפרש "little sister" בשיר כסלנג ל"חברה"`, difficulty: 'medium' },
      { text_he: `הקשר לאחותו של בילי איידול, ג'יין, הוא ההשראה האמיתית ל-White Wedding`, difficulty: 'medium' },
      { text_he: `White Wedding נחשב לאחד הסמלים של עידן הניו ווייב`, difficulty: 'easy' },
      { text_he: `White Wedding הוא אחד השירים הכי מנוגנים בחתונות עד היום — באירוניה גדולה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `בילי איידול היה שמח על חתונת אחותו וכתב את White Wedding כשיר חגיגי`, difficulty: 'medium' },
      { text_he: `אחותו של בילי איידול נקראת ג'ניפר`, difficulty: 'medium' },
      { text_he: `White Wedding נכתב על אחיו הבכור של בילי איידול, לא אחותו`, difficulty: 'hard' },
      { text_he: `White Wedding נחשב לסמל של פאנק רוק קלאסי`, difficulty: 'medium' },
    ],
  },
  q413: { // Layla / Derek and the Dominos (duplicate of q063)
    trueStatements: [
      { text_he: `אריק קלפטון, מנהיג Derek and the Dominos, התאהב בפאטי בויד באמצע שנות ה-60`, difficulty: 'medium' },
      { text_he: `אריק קלפטון היה חבר קרוב של ג'ורג' האריסון מ-The Beatles, בעלה דאז של פאטי בויד`, difficulty: 'medium' },
      { text_he: `Layla נכתב בעקבות סיפורו של "שכבי ומג'נון" — סיפור פרסי קלאסי על אהבה אסורה`, difficulty: 'hard' },
      { text_he: `חבר נתן לאריק קלפטון לקרוא את הסיפור הפרסי "שכבי ומג'נון"`, difficulty: 'hard' },
      { text_he: `פאטי בויד התגרשה מג'ורג' האריסון ב-1977`, difficulty: 'medium' },
      { text_he: `פאטי בויד ואריק קלפטון נישאו ב-1979 בהופעה בטוקסון, אריזונה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `אריק קלפטון התאהב בפאטי בויד רק בשנות ה-70`, difficulty: 'medium' },
      { text_he: `Layla נכתב בעקבות הסיפור של רומיאו ויוליה`, difficulty: 'medium' },
      { text_he: `פאטי בויד ואריק קלפטון נישאו בלונדון בטקס פרטי ב-1976`, difficulty: 'hard' },
      { text_he: `ג'ורג' האריסון תבע את אריק קלפטון בבית משפט בעקבות הרומן עם פאטי בויד`, difficulty: 'medium' },
    ],
  },
  q414: { // You're So Vain / Carly Simon
    trueStatements: [
      { text_he: `קרלי סיימון מכרה ב-2003 את הסוד של You're So Vain במכירה פומבית למימון מועדון אופרה`, difficulty: 'medium' },
      { text_he: `דיק אברסול, נשיא NBC Sports, זכה במכירה הפומבית של הסוד של You're So Vain ב-50,000 דולר`, difficulty: 'hard' },
      { text_he: `התנאי במכירת הסוד של You're So Vain: דיק אברסול אינו רשאי לחשוף בפומבי, רק לתת רמזים`, difficulty: 'hard' },
      { text_he: `הרמז הראשון שדיק אברסול נתן על הסוד של You're So Vain: "השם מכיל את האותיות E, A, ו-R"`, difficulty: 'hard' },
      { text_he: `ב-2015 קרלי סיימון אישרה שבית 2 ב-You're So Vain הוא על וורן ביטי`, difficulty: 'medium' },
      { text_he: `קרלי סיימון אומרת על וורן ביטי וYou're So Vain ש"וורן חושב שהכל עליו" — מה שהוא אכן חשב`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `קרלי סיימון מכרה את הסוד של You're So Vain למוזיאון מטרופוליטן בניו יורק`, difficulty: 'medium' },
      { text_he: `דיק אברסול שילם 100,000 דולר על הסוד של You're So Vain`, difficulty: 'medium' },
      { text_he: `ב-2015 קרלי סיימון אישרה את כל שלושת זהויות הגברים ב-You're So Vain`, difficulty: 'hard' },
      { text_he: `הרמז של דיק אברסול על Vain היה רק "השם מכיל את האות J"`, difficulty: 'medium' },
    ],
  },
  q415: { // Escape (The Piña Colada Song) / Rupert Holmes
    trueStatements: [
      { text_he: `רופרט הולמס תיאר את Escape כסיפור על "איך חוסר תקשורת מוביל לבגידה"`, difficulty: 'medium' },
      { text_he: `רופרט הולמס הוסיף על Escape: "דיאלוג גלוי וכן יכול למנוע שבר לב ושעמום"`, difficulty: 'hard' },
      { text_he: `הסיפור ב-Escape: גבר משועמם מאשתו רואה מודעת היכרויות ומשיב`, difficulty: 'medium' },
      { text_he: `הגבר ב-Escape מגלה במפגש שהאישה שמודעתה ענתה אליה היא אשתו עצמה`, difficulty: 'medium' },
      { text_he: `Escape היה הסינגל האחרון של שנות ה-70 שהגיע למקום 1 בבילבורד`, difficulty: 'hard' },
      { text_he: `Escape הגיע למקום 1 בבילבורד ב-29 בדצמבר 1979`, difficulty: 'medium' },
      { text_he: `רופרט הולמס הוא בין השאר איש תיאטרון מצליח שזכה בפרס טוני`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `רופרט הולמס תיאר את Escape כ"רומנטי כן ופשוט"`, difficulty: 'medium' },
      { text_he: `בסוף Escape הגבר עוזב את אשתו`, difficulty: 'medium' },
      { text_he: `Escape היה הסינגל הראשון של שנות ה-80 שהגיע למקום 1 בבילבורד`, difficulty: 'hard' },
      { text_he: `רופרט הולמס מעולם לא זכה בפרסי תיאטרון`, difficulty: 'medium' },
    ],
  },
  q416: { // Behind Blue Eyes / The Who
    trueStatements: [
      { text_he: `Behind Blue Eyes נכתב במקור על ידי פיט טאונסנד, גיטריסט The Who, עבור פרויקט אופרת הרוק "Lifehouse"`, difficulty: 'medium' },
      { text_he: `פרויקט "Lifehouse" של The Who, שעבורו נכתב Behind Blue Eyes, לעולם לא יצא לפועל`, difficulty: 'medium' },
      { text_he: `Behind Blue Eyes יצא ב-1971 באלבום The Who "Who's Next" אחרי ש-Lifehouse פורק`, difficulty: 'easy' },
      { text_he: `הדובר ב-Behind Blue Eyes הוא הנבל "ג'אמבו" מתוך הקונספט המקורי של Lifehouse`, difficulty: 'hard' },
      { text_he: `פיט טאונסנד הסביר על Behind Blue Eyes: "זה היה שיר שמושר על ידי הנבל של הסיפור — שבמקור היה רואה את עצמו כטוב שאולץ למצב של נבל"`, difficulty: 'hard' },
      { text_he: `גרסת הכיסוי של Limp Bizkit ל-Behind Blue Eyes מ-2003 הציגה את השיר לדור צעיר`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Behind Blue Eyes נכתב במקור עבור אלבום The Who "Tommy"`, difficulty: 'medium' },
      { text_he: `הדובר ב-Behind Blue Eyes הוא גיבור הסיפור, לא הנבל`, difficulty: 'medium' },
      { text_he: `פיט טאונסנד הסביר ש-Behind Blue Eyes אוטוביוגרפי על חייו האישיים`, difficulty: 'hard' },
      { text_he: `גרסת הכיסוי של Linkin Park ל-Behind Blue Eyes היא המוכרת ביותר`, difficulty: 'medium' },
    ],
  },
  q417: { // Closing Time / Semisonic
    trueStatements: [
      { text_he: `יעקב סליכטר, מתופף Semisonic, אישר את הקריאה המטאפורית של Closing Time`, difficulty: 'medium' },
      { text_he: `יעקב סליכטר תיאר את Closing Time: השיר הוא "על להישלח החוצה מהרחם, כאילו על ידי בוחן בר שמפנה את המקום"`, difficulty: 'hard' },
      { text_he: `Closing Time יצא ב-1998`, difficulty: 'easy' },
      { text_he: `Closing Time נכלל בסטים של מסיבות סיום בכל אמריקה`, difficulty: 'medium' },
      { text_he: `רוב הקהל לא יודע ש-Closing Time עוסק בלידה (ולא רק בסגירת בר)`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `יעקב סליכטר הצהיר ש-Closing Time עוסק רק בסגירת בר רגיל`, difficulty: 'medium' },
      { text_he: `Closing Time יצא ב-2002`, difficulty: 'medium' },
      { text_he: `Semisonic אסרו לנגן את Closing Time במסיבות סיום`, difficulty: 'hard' },
      { text_he: `Semisonic הצהירו שהפרשנות של "לידה" ב-Closing Time מומצאת על ידי המעריצים`, difficulty: 'medium' },
    ],
  },
  q418: { // Tubthumping / Chumbawamba
    trueStatements: [
      { text_he: `Chumbawamba ידועים על הפרעות פוליטיות פומביות`, difficulty: 'medium' },
      { text_he: `ב-1998 חברי Chumbawamba שפכו דלי מים על שר הסחר הבריטי דונלד לואיס בטקס ה-Brit Awards`, difficulty: 'hard' },
      { text_he: `Chumbawamba המשיכו 15 שנה אחרי הצלחת Tubthumping עם פרויקטים פוליטיים`, difficulty: 'medium' },
      { text_he: `Chumbawamba פורקו ב-2012`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Chumbawamba הימנעו מאקטיביזם פוליטי לאורך כל הקריירה שלהם`, difficulty: 'medium' },
      { text_he: `Chumbawamba פורקו מיד אחרי הצלחת Tubthumping ב-1999`, difficulty: 'medium' },
      { text_he: `חברי Chumbawamba שפכו דלי מים על המלכה אליזבת ה-2 בטקס מלכותי`, difficulty: 'hard' },
      { text_he: `Chumbawamba המשיכו לפעול עד היום (2026)`, difficulty: 'medium' },
    ],
  },
  q419: { // The One I Love / R.E.M.
    trueStatements: [
      { text_he: `מייקל סטייפ, סולן R.E.M., אמר על The One I Love: "הוא ממש אלים ונוראי. חשבתי שזה יותר מדי. ברוטלי מדי"`, difficulty: 'medium' },
      { text_he: `המילים ב-The One I Love "פרופ פשוט להעסיק את זמני" מתארות שימוש באדם אחר כמטרה רגשית`, difficulty: 'hard' },
      { text_he: `מייקל סטייפ אמר ב-2016 על The One I Love: "אנשים לא הבינו, אז זה בסדר"`, difficulty: 'medium' },
      { text_he: `מייקל סטייפ הוסיף ב-2016 על The One I Love: "עכשיו זה שיר אהבה, אז זה בסדר"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `מייקל סטייפ הצהיר ש-The One I Love הוא הצהרת אהבה כנה לאשתו`, difficulty: 'medium' },
      { text_he: `המילים ב-The One I Love מתארות מסירות אמיתית של אדם אוהב`, difficulty: 'medium' },
      { text_he: `מייקל סטייפ הצטער שכתב את The One I Love וניסה למחוק אותו מהאלבום`, difficulty: 'hard' },
      { text_he: `מייקל סטייפ אמר שהוא "אסיר תודה" שאנשים מנגנים את The One I Love בחתונות`, difficulty: 'medium' },
    ],
  },
  q420: { // Baby Got Back / Sir Mix-a-Lot
    trueStatements: [
      { text_he: `Sir Mix-a-Lot (אנתוני ריי) הסביר ב-1992 שההשראה ל-Baby Got Back הייתה פרסומת של חברת בודוויזר`, difficulty: 'medium' },
      { text_he: `הפרסומת של בודוויזר שהשפיעה על Baby Got Back הייתה עם "דוגמניות רזות בסגנון 'ילדה מהעמק'"`, difficulty: 'hard' },
      { text_he: `Sir Mix-a-Lot חשב כשראה את הפרסומת: "כל הנשים האפרו-אמריקאיות שאני מכיר נראות אחרת"`, difficulty: 'medium' },
      { text_he: `המסר של Baby Got Back היה הצדקת טיפוסי גוף שונים`, difficulty: 'medium' },
      { text_he: `הקליפ של Baby Got Back נאסר תחילה ב-MTV אבל לאחר מכן הוסר האיסור`, difficulty: 'medium' },
      { text_he: `Baby Got Back הגיע למקום 1 בבילבורד הוט 100 לחמישה שבועות ב-1992`, difficulty: 'easy' },
      { text_he: `Baby Got Back זכה בפרס גראמי`, difficulty: 'easy' },
      { text_he: `ב-2014 Baby Got Back חזר לתשומת הלב הציבורית כשניקי מינאז' עיבדה אותו ב"Anaconda"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `ההשראה ל-Baby Got Back הייתה פרסומת של Coca-Cola`, difficulty: 'medium' },
      { text_he: `Baby Got Back נאסר ב-MTV לחלוטין ומעולם לא הוסר האיסור`, difficulty: 'medium' },
      { text_he: `Baby Got Back הגיע למקום 5 בבילבורד למשך 2 שבועות`, difficulty: 'hard' },
      { text_he: `ב-2014 ביונסה עיבדה את Baby Got Back`, difficulty: 'medium' },
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
