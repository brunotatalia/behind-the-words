#!/usr/bin/env node
// Batch 6: q367-q412 (30 questions)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const statements = {
  q367: { // Sarà Perché Ti Amo / Ricchi e Poveri
    trueStatements: [
      { text_he: `הלהקה Ricchi e Poveri (עשירים ועניים) הוקמה במקור כרביעיה`, difficulty: 'medium' },
      { text_he: `חברי הלהקה המקוריים: אנג'לה ברמבטי, אנג'לו סוטג'ו, פרנקו גאטי ומרינה אוקיינה`, difficulty: 'hard' },
      { text_he: `ב-1981 מרינה עזבה והם הפכו לשלישייה`, difficulty: 'medium' },
      { text_he: `ב-2020 הרכב הרביעיה המקורי התאחד מחדש בפסטיבל סן רמו`, difficulty: 'easy' },
      { text_he: `ההתאחדות הייתה לציון 50 שנה ללהקה`, difficulty: 'hard' },
      { text_he: `השיר "Sarà Perché Ti Amo" יצא בפברואר 1981`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הלהקה Ricchi e Poveri הוקמה כדואו מההתחלה`, difficulty: 'medium' },
      { text_he: `מרינה אוקיינה הצטרפה ללהקה רק ב-1990`, difficulty: 'hard' },
      { text_he: `ההתאחדות מחדש בסן רמו הייתה ב-2010`, difficulty: 'easy' },
      { text_he: `השיר יצא בנובמבר 1979`, difficulty: 'medium' },
    ],
  },
  q368: { // Gangnam Style / PSY
    trueStatements: [
      { text_he: `PSY הסביר: "השיר הזה למעשה לועג לאנשים שמנסים מאוד להיות משהו שהם לא"`, difficulty: 'medium' },
      { text_he: `הקליפ סוקרס את הדימוי של גנגנאם — שכונת היוקרה של סיאול`, difficulty: 'easy' },
      { text_he: `הקליפ סוקרס דרך עיני "PSY הלא-גנגנאמי"`, difficulty: 'hard' },
      { text_he: `הקליפ היה הראשון אי פעם להגיע למיליארד צפיות ביוטיוב (דצמבר 2012)`, difficulty: 'easy' },
      { text_he: `הקליפ הפך ל-K-Pop הראשון שפרץ למיינסטרים העולמי`, difficulty: 'medium' },
      { text_he: `הריקוד "אופפ-גנגנאם-סטייל" שיחק תפקיד כמו ויראלי גלובלי`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `PSY הצהיר שהשיר הוא חגיגה כנה של הסגנון של גנגנאם`, difficulty: 'medium' },
      { text_he: `הקליפ היה הראשון להגיע ל-100 מיליון צפיות בלבד`, difficulty: 'easy' },
      { text_he: `הקליפ צולם בלוס אנג'לס לקהל בין-לאומי`, difficulty: 'hard' },
      { text_he: `הריקוד "Gangnam Style" הומצא על ידי כוריאוגרף אמריקאי`, difficulty: 'medium' },
    ],
  },
  q369: { // Spring Day / BTS
    trueStatements: [
      { text_he: `השיר יצא בפברואר 2017`, difficulty: 'medium' },
      { text_he: `אסון מעבורת הסוול התרחש באפריל 2014`, difficulty: 'medium' },
      { text_he: `באסון טבעו 304 אנשים, רובם תלמידי תיכון`, difficulty: 'hard' },
      { text_he: `RM, הסולן של BTS, סירב לאשר את הקשר בין השיר לאסון בצורה רשמית`, difficulty: 'easy' },
      { text_he: `RM אמר שהקליפ "מתמקד בייצוג ויזואלי של מילות השיר ואפשר לפרש אותו בדרכים רבות"`, difficulty: 'hard' },
      { text_he: `RM חשב על "חברי תיכון שאיבד איתם קשר" כשכתב את השיר`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-2014, חודשים אחרי האסון`, difficulty: 'medium' },
      { text_he: `RM אישר במפורש שהשיר נכתב על אסון הסוול`, difficulty: 'easy' },
      { text_he: `באסון מעבורת הסוול נהרגו 50 אנשים בלבד`, difficulty: 'hard' },
      { text_he: `החברה Big Hit (חברת BTS) הצהירה רשמית שהשיר הוא מחווה לקורבנות`, difficulty: 'medium' },
    ],
  },
  q370: { // Fake Love / BTS
    trueStatements: [
      { text_he: `השיר יצא ב-18 במאי 2018`, difficulty: 'medium' },
      { text_he: `השיר הוא הסינגל הראשון מאלבום "Love Yourself: Tear"`, difficulty: 'easy' },
      { text_he: `השיר זכה בפלטינום מ-RIAA — הסינגל הראשון של BTS שזכה בכך`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 10 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `באותה תקופה זה היה השיא של אמן קוריאני בארה"ב`, difficulty: 'hard' },
      { text_he: `הקליפ של אש הפך ל-"בית" של מסע BTS דרך גן הילדות`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-2017 כסינגל הראשון של BTS`, difficulty: 'medium' },
      { text_he: `השיר זכה בזהב מ-RIAA אבל לא בפלטינום`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 1 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `הקליפ של השיר זכה בפרס Grammy לסרטון הטוב`, difficulty: 'easy' },
    ],
  },
  q371: { // Lucifer / SHINee
    trueStatements: [
      { text_he: `השיר יצא ב-19 ביולי 2010`, difficulty: 'medium' },
      { text_he: `השיר יצא דרך SM Entertainment`, difficulty: 'easy' },
      { text_he: `השיר הפך ללהיט מוקדם של SHINee`, difficulty: 'medium' },
      { text_he: `המילים משוות אישה דו-פרצופית לשטן — "הלחישה שלה היא לוציפר"`, difficulty: 'hard' },
      { text_he: `הכוריאוגרפיה המורכבת עם תזוזות ידיים מהירות הפכה לאחת הסימנים של SHINee`, difficulty: 'medium' },
      { text_he: `עד היום הכוריאוגרפיה של "לוציפר" נחשבת לאחת הקשות ביותר ב-K-Pop`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-2008 כסינגל הראשון של SHINee`, difficulty: 'medium' },
      { text_he: `השיר יצא דרך JYP Entertainment`, difficulty: 'easy' },
      { text_he: `המילים בשיר הן הצהרה רומנטית כנה`, difficulty: 'hard' },
      { text_he: `הכוריאוגרפיה של "לוציפר" נחשבת לפשוטה במיוחד`, difficulty: 'medium' },
    ],
  },
  q372: { // Blood Sweat & Tears / BTS
    trueStatements: [
      { text_he: `האלבום "Wings" מ-2016 שאליו השיר שייך נחשב לאלבום הקונספט הראשון של BTS`, difficulty: 'medium' },
      { text_he: `הקליפ זכה לעשרות מיליוני צפיות ביוטיוב בשבוע הראשון`, difficulty: 'easy' },
      { text_he: `הסיפור של "דמיאן" עוסק בחיפוש זהות אצל נער שמגלה את הצד החשוך והאסור בעצמו`, difficulty: 'hard' },
      { text_he: `הקליפ מלא בהפניות ליצירות של פיטר ברויחל`, difficulty: 'hard' },
      { text_he: `יצירת "נפילת איקרוס" של ברויחל מופיעה בקליפ`, difficulty: 'medium' },
      { text_he: `יצירת "הקינה לאיקרוס" של הרברט ג'יימס דרייפר מופיעה בקליפ`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הקליפ מלא בהפניות ליצירות של מיכלאנג'לו`, difficulty: 'hard' },
      { text_he: `"Wings" היה אלבום הבכורה של BTS`, difficulty: 'medium' },
      { text_he: `הסיפור של "דמיאן" של הסה הוא קומדיה רומנטית`, difficulty: 'easy' },
      { text_he: `יצירת "Mona Lisa" של דה וינצ'י מופיעה בקליפ`, difficulty: 'medium' },
    ],
  },
  q373: { // Good Day / IU
    trueStatements: [
      { text_he: `IU (לי ג'י-און) הייתה בת 17 כשהקליטה את השיר ב-2010`, difficulty: 'easy' },
      { text_he: `בסיום השיר ישנה סדרה של שלושה תווים גבוהים בעלייה של חצאי-טון`, difficulty: 'medium' },
      { text_he: `התווים הגבוהים מסתיימים ב-F♯5`, difficulty: 'hard' },
      { text_he: `הביצוע נחשב לאחד הרגעים הוואקליים האיקוניים של K-Pop`, difficulty: 'medium' },
      { text_he: `המבקרים ציינו את "יציבות התדר" שלה ואת "קיבולת הריאות"`, difficulty: 'hard' },
      { text_he: `השיר הפך אותה לכוכבת על מספר 1 בקוריאה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `IU הייתה בת 21 כשהקליטה את השיר ב-2010`, difficulty: 'easy' },
      { text_he: `התווים הגבוהים מסתיימים ב-C6`, difficulty: 'hard' },
      { text_he: `הסדרה כוללת חמישה תווים בעלייה`, difficulty: 'medium' },
      { text_he: `השיר נכשל מסחרית בקוריאה`, difficulty: 'easy' },
    ],
  },
  q374: { // God's Menu / Stray Kids
    trueStatements: [
      { text_he: `חברי הלהקה Bang Chan, Changbin ו-Han היו אחראים על כתיבת והפקת השיר`, difficulty: 'medium' },
      { text_he: `שלושתם פועלים תחת השם "3Racha"`, difficulty: 'hard' },
      { text_he: `הסגנון תואר כ"חלוץ של מאלה-טייסט מיוזיק"`, difficulty: 'hard' },
      { text_he: `"מאלה" (mala) הוא פלפל סצ'ואני חריף — מטאפורה לחריפות הצליל`, difficulty: 'medium' },
      { text_he: `הסטיינגר עזרים בשיר: סכינים מתחדדות, סירים שכופרים, צלילי בישול`, difficulty: 'medium' },
      { text_he: `הקליפ מציג את הלהקה כשפים ב"מסעדה אלוהית"`, difficulty: 'easy' },
      { text_he: `השיר יצא ב-17 ביוני 2020`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `חברי הלהקה Felix ו-Lee Know היו האחראים על כתיבת השיר`, difficulty: 'medium' },
      { text_he: `הסגנון תואר כ-"K-Trap" קלאסי`, difficulty: 'hard' },
      { text_he: `"מאלה" הוא ביטוי קוריאני לאומנות הקיגאמי`, difficulty: 'hard' },
      { text_he: `השיר הופק על ידי מפיקים חיצוניים, לא על ידי חברי הלהקה`, difficulty: 'medium' },
    ],
  },
  q375: { // Cheer Up / TWICE
    trueStatements: [
      { text_he: `השיר יצא באפריל 2016`, difficulty: 'medium' },
      { text_he: `הוא הסינגל השני של TWICE`, difficulty: 'easy' },
      { text_he: `הפזמון מבטא את האסטרטגיה: "בחורה לא יכולה לתת את לבה בקלות"`, difficulty: 'medium' },
      { text_he: `הפזמון ממשיך: "ככה תאהב אותי יותר. אעמיד פנים שאני קרירה"`, difficulty: 'hard' },
      { text_he: `השיר זכה ב-Korean Music Awards לשיר השנה ב-2017`, difficulty: 'hard' },
      { text_he: `השיר הוא אחד מסמלי תור הזהב של TWICE`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-2017 כסינגל הרביעי של TWICE`, difficulty: 'medium' },
      { text_he: `הפזמון מעודד בנות לתת את לבן בקלות לאהוב`, difficulty: 'medium' },
      { text_he: `השיר זכה ב-MAMA Award לשיר השנה ב-2017 (ולא ב-Korean Music Awards)`, difficulty: 'hard' },
      { text_he: `השיר היה כישלון יחסי וגרם ל-TWICE לשנות סגנון`, difficulty: 'easy' },
    ],
  },
  q376: { // Fantastic Baby / BIGBANG
    trueStatements: [
      { text_he: `השיר נכלל באלבום "Alive" (2012)`, difficulty: 'medium' },
      { text_he: `הוא הפך לסינגל הראשון של BIGBANG שהגיע ל-Top 100 בבילבורד`, difficulty: 'hard' },
      { text_he: `ב-K-Pop הוא נחשב לאחד הסינגלים שגיבשו את הז'אנר של אנדרגראונד-פופ קוריאני`, difficulty: 'medium' },
      { text_he: `כתב יד הריקוד "פנטסטיק בייבי" של LIA KIM הפך לקלאסיקה של השנים האלו`, difficulty: 'hard' },
      { text_he: `הקליפ נחשב לאחד הקליפים הראשונים של K-Pop שעבר את 300 מיליון צפיות`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר נכלל באלבום "Made" (2016)`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 בבילבורד`, difficulty: 'hard' },
      { text_he: `כתב הריקוד הוא של ב.דייב, לא של LIA KIM`, difficulty: 'hard' },
      { text_he: `הקליפ עבר את 5 מיליארד צפיות`, difficulty: 'easy' },
    ],
  },
  q377: { // DDU-DU DDU-DU / BLACKPINK
    trueStatements: [
      { text_he: `השיר יצא ביוני 2018`, difficulty: 'medium' },
      { text_he: `הוא יצא כסינגל מאלבום ה-EP "Square Up" של BLACKPINK`, difficulty: 'hard' },
      { text_he: `המבקרת מ-Business Insider אמרה שהוא חסר את "המהות התמטית" של שירים אחרים`, difficulty: 'hard' },
      { text_he: `רוב הביקורות על השיר היו חיוביות`, difficulty: 'easy' },
      { text_he: `ההצלחה של השיר הביאה את BLACKPINK לפסטיבלים גדולים בעולם`, difficulty: 'medium' },
      { text_he: `BLACKPINK הופיעו בפסטיבל קוצ'לה ב-2019 — כראשונים מ-K-Pop`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר יצא בנובמבר 2017`, difficulty: 'medium' },
      { text_he: `כל הביקורות על השיר היו שליליות`, difficulty: 'easy' },
      { text_he: `BLACKPINK הופיעו בקוצ'לה ב-2018 — שנה אחרי הופעתן הראשונה בארה"ב`, difficulty: 'easy' },
      { text_he: `BLACKPINK היו הלהקה הראשונה אי פעם בקוצ'לה`, difficulty: 'medium' },
    ],
  },
  q380: { // Ta Paidia Tou Peiraia / Hadjidakis
    trueStatements: [
      { text_he: `מנוס חאטזידאקיס זכה באוסקר לשיר המקורי הטוב ביותר ב-1961`, difficulty: 'medium' },
      { text_he: `חאטזידאקיס סירב להגיע לטקס ולקחת את הפרס`, difficulty: 'easy' },
      { text_he: `חאטזידאקיס אמר שהסרט "לא ביום ראשון" "משקף לרעה על אתונה"`, difficulty: 'hard' },
      { text_he: `הסרט מתאר זונה כדמות הראשית`, difficulty: 'medium' },
      { text_he: `מלינה מרקורי גילמה את הזונה איליה בסרט`, difficulty: 'hard' },
      { text_he: `ז'יל דאסין ביים את הסרט`, difficulty: 'hard' },
      { text_he: `הסרט היה מועמד ל-5 פרסי אוסקר`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `חאטזידאקיס הגיע לטקס וקיבל את הפרס באמוציה גדולה`, difficulty: 'easy' },
      { text_he: `הסרט "לא ביום ראשון" צולם בסקנדינביה`, difficulty: 'medium' },
      { text_he: `מלינה מרקורי הייתה זמרת אופרה ולא שחקנית בסרט`, difficulty: 'hard' },
      { text_he: `הסרט זכה לאוסקר על סרט זר הטוב`, difficulty: 'medium' },
    ],
  },
  q389: { // Demis Roussos
    trueStatements: [
      { text_he: `רוסוס היה אחד מהזמרים הראשונים ממוצא יווני שזכה להצלחה במצעדי אנגליה ובכל אירופה`, difficulty: 'easy' },
      { text_he: `ב-1985 הוא היה בין הנוסעים שנחטפו על ידי חמושים שיעיים בטיסת TWA 847`, difficulty: 'hard' },
      { text_he: `החטיפה הייתה חוויה שעיצבה אותו לשארית חייו`, difficulty: 'medium' },
      { text_he: `רוסוס נפטר ב-25 בינואר 2015`, difficulty: 'medium' },
      { text_he: `הוא נפטר בגיל 68 באתונה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `רוסוס נחטף בטיסת אייר פרנס ב-1976`, difficulty: 'hard' },
      { text_he: `רוסוס נפטר ב-2018 בגיל 70`, difficulty: 'medium' },
      { text_he: `רוסוס נפטר במלון בלאס וגאס`, difficulty: 'hard' },
      { text_he: `רוסוס היה הזמר היווני המצליח הראשון בארה"ב`, difficulty: 'easy' },
    ],
  },
  q391: { // Du Hast / Rammstein
    trueStatements: [
      { text_he: `המילים מצטטות את נוסח שבועות הנישואין הגרמני`, difficulty: 'medium' },
      { text_he: `הנוסח: "האם אתה רוצה לקחת אותה לאשתך, לאהוב ולכבד עד שהמוות יפריד בינכם?"`, difficulty: 'hard' },
      { text_he: `התשובה בשיר היא "לא"`, difficulty: 'easy' },
      { text_he: `הפזמון נשמע כ-"Du hasst" (אתה שונא) אך בעצם הוא "Du hast" (יש לך / אתה מחזיק)`, difficulty: 'medium' },
      { text_he: `הבית הראשון אומר "Du hast mich" (יש לך אותי)`, difficulty: 'hard' },
      { text_he: `השיר נחשב לאחד הסינגלים הגרמניים המצליחים ביותר אי פעם`, difficulty: 'easy' },
      { text_he: `הקליפ של פילטר זכה למעל מיליארד צפיות`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `המילים מצטטות שירת ערש גרמנית מסורתית`, difficulty: 'medium' },
      { text_he: `התשובה בשיר היא "כן"`, difficulty: 'easy' },
      { text_he: `הפזמון מבוסס על משחק מילים בין "Liebe" (אהבה) ל-"Lebe" (לחיות)`, difficulty: 'medium' },
      { text_he: `הקליפ של השיר זכה ל-100 מיליון צפיות בלבד`, difficulty: 'hard' },
    ],
  },
  q392: { // Rock Me Amadeus / Falco
    trueStatements: [
      { text_he: `פלקו (יוהאן הולצל) חי בין השנים 1957-1998`, difficulty: 'hard' },
      { text_he: `פלקו הציג את מוצרט כ"רוק סטאר של המאה ה-18" — קונספט שהיה מהפכני בזמנו`, difficulty: 'medium' },
      { text_he: `השיר עמד 3 שבועות במקום 1 בבילבורד הוט 100 ב-1986`, difficulty: 'medium' },
      { text_he: `הוא היחיד בגרמנית שעשה זאת אי פעם`, difficulty: 'easy' },
      { text_he: `שיר ספרדי הגיע למקום 1 ב-1987 ושיר קוריאני הגיע ב-2020`, difficulty: 'hard' },
      { text_he: `פלקו נהרג בתאונת דרכים ב-6 בפברואר 1998 ברפובליקה הדומיניקנית בגיל 40`, difficulty: 'medium' },
      { text_he: `הנסיבות עוררו ספקולציות לאור התמודדותו של פלקו עם דיכאון`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `פלקו חי בין 1962-2002`, difficulty: 'hard' },
      { text_he: `השיר עמד 6 שבועות במקום 1 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `שירים גרמניים נוספים הגיעו למקום 1 בבילבורד אחרי "Rock Me Amadeus"`, difficulty: 'easy' },
      { text_he: `פלקו נהרג בתאונת מטוס ברפובליקה הדומיניקנית`, difficulty: 'medium' },
    ],
  },
  q394: { // Mas Que Nada / Jorge Ben
    trueStatements: [
      { text_he: `הביטוי "Preto Velho" (זקן שחור) בשיר הוא ארכטיפ של רוח אומבנדית`, difficulty: 'hard' },
      { text_he: `"Preto Velho" מסמל חוכמה, סבלנות והיסטוריית העבדים האפריקאים בברזיל`, difficulty: 'hard' },
      { text_he: `השיר היה הצלחה גדולה ב-1963`, difficulty: 'easy' },
      { text_he: `הוא נכלל גם בגרסה של Sergio Mendes & Brasil '66`, difficulty: 'medium' },
      { text_he: `גרסת מנדס הפכה ללהיט עולמי`, difficulty: 'medium' },
      { text_he: `ב-2006 בלאק אייד פיז עיבדו אותו עם בן ובנדס בלהיט "Mas Que Nada"`, difficulty: 'hard' },
      { text_he: `גרסת בלאק אייד פיז עם בן הגיעה למקום 1 בבריטניה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `"Preto Velho" הוא ביטוי לדוגמא לכלב שחור בברזיל`, difficulty: 'hard' },
      { text_he: `השיר היה כישלון מסחרי בברזיל ב-1963`, difficulty: 'easy' },
      { text_he: `Sergio Mendes נמנע מלעבד את השיר`, difficulty: 'medium' },
      { text_he: `בלאק אייד פיז עיבדו את השיר ב-2010, לא ב-2006`, difficulty: 'hard' },
    ],
  },
  q398: { // Dragostea Din Tei / O-Zone
    trueStatements: [
      { text_he: `O-Zone הוקמה ב-1999 בקישינב, מולדובה, על ידי דן באלאן`, difficulty: 'hard' },
      { text_he: `הם עברו לבוקרשט, רומניה ב-2002`, difficulty: 'medium' },
      { text_he: `השיר היה רב-מכר בכל אירופה — מקום 1 בכל המדינות הגדולות`, difficulty: 'easy' },
      { text_he: `ברולסמה מעולם לא צפה לוויראליות`, difficulty: 'medium' },
      { text_he: `הוא העלה את הסרטון לאתר Newgrounds והוא התפשט מעצמו`, difficulty: 'hard' },
      { text_he: `השיר תורגם ל-14 שפות וכוסה על ידי עשרות אמנים`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `O-Zone הוקמה בבוקרשט ב-2001`, difficulty: 'hard' },
      { text_he: `ברולסמה תכנן את הוויראליות מראש`, difficulty: 'medium' },
      { text_he: `הסרטון של ברולסמה הועלה ליוטיוב במקור`, difficulty: 'medium' },
      { text_he: `השיר נשאר רק במולדובה ולא הצליח באירופה`, difficulty: 'easy' },
    ],
  },
  q399: { // Tunak Tunak Tun / Daler Mehndi
    trueStatements: [
      { text_he: `דאלר מהנדי הוא זמר באהנגרא הודי`, difficulty: 'medium' },
      { text_he: `מהנדי ספג ביקורת שהשירים שלו מצליחים בגלל "ריבוי הדוגמניות הרוקדות בקליפים"`, difficulty: 'easy' },
      { text_he: `כתגובה הוא יצר ב-1998 קליפ עם 4 עותקים דיגיטליים של עצמו בלבד`, difficulty: 'medium' },
      { text_he: `הקליפ עשה שימוש בטכנולוגיית בלוסקרין — הראשון בהודו`, difficulty: 'hard' },
      { text_he: `כל אחד מהארבעה ייצג יסוד קלאסי שונה (אש, מים, אדמה, אוויר)`, difficulty: 'hard' },
      { text_he: `השיר אכן הגיע למקום 1 בהודו והוכיח את הטענה`, difficulty: 'easy' },
      { text_he: `ב-2007 הוא הפך לאחד מהסרטונים ההודיים הראשונים שנעשו ויראליים באינטרנט המערבי`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `מהנדי הוא זמר רגאיי אינדי-בריטי`, difficulty: 'medium' },
      { text_he: `הקליפ כולל 6 עותקים דיגיטליים של מהנדי`, difficulty: 'hard' },
      { text_he: `כל עותק ייצג שלב אחר בחיי האדם`, difficulty: 'hard' },
      { text_he: `הקליפ נכשל בהודו אבל הצליח בארה"ב`, difficulty: 'easy' },
    ],
  },
  q400: { // Hey Jude / Beatles
    trueStatements: [
      { text_he: `מקרטני התחיל את השיר עם הרעיון "Hey Jules"`, difficulty: 'easy' },
      { text_he: `"Jules" היה שמו של ג'וליאן לנון בן ה-5`, difficulty: 'medium' },
      { text_he: `מקרטני ביקר את ג'וליאן וסינתיה (אמו) ביוני 1968 בעיצומה של הפרידה`, difficulty: 'medium' },
      { text_he: `מקרטני שינה את "Jules" ל-"Jude" כי חשב שזה "נשמע קצת יותר טוב"`, difficulty: 'hard' },
      { text_he: `ג'וליאן גילה את האמת רק בערך 20 שנה אחר כך, סביב 1988`, difficulty: 'hard' },
      { text_he: `ב-1996 ג'וליאן רכש את הערות ההקלטה המקוריות במכירה פומבית ב-25,000 פאונד`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `מקרטני התחיל את השיר עם הרעיון "Hey Joe"`, difficulty: 'easy' },
      { text_he: `ג'וליאן היה בן 10 כשמקרטני כתב את השיר`, difficulty: 'medium' },
      { text_he: `ג'וליאן ידע מההתחלה שהשיר נכתב עליו`, difficulty: 'easy' },
      { text_he: `ב-1996 ג'וליאן רכש את הערות ההקלטה ב-100,000 פאונד`, difficulty: 'hard' },
    ],
  },
  q401: { // Tiny Dancer / Elton John
    trueStatements: [
      { text_he: `ברני טאופין אישר ב-1973 ב-Rolling Stone שהשיר על אשתו דאז מקסין פייבלמן`, difficulty: 'medium' },
      { text_he: `מקסין פייבלמן עצמה אישרה ב-2019: "ידעתי שהשיר עליי"`, difficulty: 'hard' },
      { text_he: `מקסין הייתה במחול בלט קלאסי מילדה`, difficulty: 'medium' },
      { text_he: `מקסין תפרה טלאים על הג'קטים והג'ינסים של אלטון`, difficulty: 'hard' },
      { text_he: `טאופין כתב את השיר בנסיעתו הראשונה לקליפורניה ב-1970`, difficulty: 'medium' },
      { text_he: `השיר הופיע באלבום "Madman Across the Water" מ-1971`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `מקסין הייתה אחותו של ברני טאופין`, difficulty: 'medium' },
      { text_he: `מקסין הייתה זמרת אופרה במקצועה`, difficulty: 'medium' },
      { text_he: `טאופין כתב את השיר בלונדון ב-1968`, difficulty: 'hard' },
      { text_he: `השיר הופיע באלבום הבכורה של אלטון ג'ון`, difficulty: 'hard' },
    ],
  },
  q402: { // Jolene / Dolly Parton
    trueStatements: [
      { text_he: `דולי הודתה שהשיר מבוסס על "אמת חלקית"`, difficulty: 'easy' },
      { text_he: `המקור: פקידה ג'ינג'ית בבנק שלה שפלירטטה בבוטות עם בעלה קרל דין`, difficulty: 'medium' },
      { text_he: `הפקידה פלירטטה איתו זמן קצר אחרי חתונתם`, difficulty: 'medium' },
      { text_he: `השם "ג'ולין" עצמו הגיע מפגישה עם מעריצה בת 10`, difficulty: 'hard' },
      { text_he: `דולי שמה לב לשיער האדום היפה של הילדה ושאלה לשמה`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 1 ב-Hot Country ב-1974`, difficulty: 'medium' },
      { text_he: `בכיסוי המפורסם של ביונסה ב-2024 הוצא הקטע על "מתחננת אליה"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `דולי הצהירה שהשיר הוא בדיוני לחלוטין`, difficulty: 'easy' },
      { text_he: `הפקידה האמיתית נקראת "ג'ולין" כשם השיר`, difficulty: 'medium' },
      { text_he: `המעריצה שנתנה את השם הייתה בת 5`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 1 בבילבורד הוט 100 ב-1974`, difficulty: 'medium' },
    ],
  },
  q403: { // Smooth Criminal / Michael Jackson
    trueStatements: [
      { text_he: `הפזמון "Annie, are you OK?" הוקדם מבובת ה-CPR "Resusci Anne" של חברת Laerdal`, difficulty: 'medium' },
      { text_he: `מתאמני החייאה שואלים את הבובה את השאלה הזו לפני שמתחילים`, difficulty: 'easy' },
      { text_he: `הסיפור על מייקל ג'קסון ששמע את זה בקורס החייאה הוא בחזקת מסורת פופולרית`, difficulty: 'hard' },
      { text_he: `הקליפ של "Moonwalker" היה בבימוי מארטין סקורסזה`, difficulty: 'hard' },
      { text_he: `הריקוד "Anti-Gravity Lean" — שבו ג'קסון נשען ב-45 מעלות — הוא חלק מהקליפ`, difficulty: 'medium' },
      { text_he: `הריקוד מצריך נעליים מיוחדות עם רגל מגנטית שמייקל ג'קסון רשם בפטנט`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הפזמון מבוסס על אישה אמיתית בשם אנני שמייקל הכיר`, difficulty: 'medium' },
      { text_he: `הקליפ היה בבימוי ספילברג, לא סקורסזה`, difficulty: 'hard' },
      { text_he: `הריקוד "Anti-Gravity Lean" עם נטייה של 90 מעלות`, difficulty: 'medium' },
      { text_he: `הנעליים המיוחדות לא היו מוגנות בפטנט והועתקו על ידי רקדנים אחרים`, difficulty: 'hard' },
    ],
  },
  q404: { // Mr. Jones / Counting Crows
    trueStatements: [
      { text_he: `השיר יצא ב-1993 באלבום הבכורה "August and Everything After"`, difficulty: 'easy' },
      { text_he: `השיר היה הלהיט הגדול הראשון של Counting Crows`, difficulty: 'medium' },
      { text_he: `אדם דוריץ הוא הסולן של הלהקה`, difficulty: 'easy' },
      { text_he: `דוריץ ידוע בשיער המיוחד שלו שהופיע איתו 30 שנה אחר כך`, difficulty: 'hard' },
      { text_he: `השיר נכלל ברשימות של 500 השירים הטובים בכל הזמנים`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-1995 באלבום השני של הלהקה`, difficulty: 'easy' },
      { text_he: `אדם דוריץ הוא הבסיסט של הלהקה`, difficulty: 'easy' },
      { text_he: `דוריץ הקריח אחרי שנים ומשנה את המראה שלו`, difficulty: 'hard' },
      { text_he: `השיר נכשל מסחרית והגיע רק למקום 50 בבילבורד`, difficulty: 'medium' },
    ],
  },
  q405: { // Maggie May / Rod Stewart
    trueStatements: [
      { text_he: `סטיוארט אמר: "מגי מיי הייתה סיפור אמיתי, על האישה הראשונה שעשיתי איתה סקס"`, difficulty: 'easy' },
      { text_he: `המפגש היה בפסטיבל הג'אז של Beaulieu ב-1961`, difficulty: 'medium' },
      { text_he: `סטיוארט היה בן 16 בזמן המפגש`, difficulty: 'medium' },
      { text_he: `"מגי מיי" עצמו לא היה שמה האמיתי של האישה`, difficulty: 'easy' },
      { text_he: `סטיוארט שאל את השם משיר עם ליברפולי עתיק על זונה בשם "מגי מיי"`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-1971 כצד B`, difficulty: 'medium' },
      { text_he: `DJים הפכו אותו ל-A והוא הגיע למקום 1 ב-UK ובארה"ב באותה שבוע`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `המפגש היה בפסטיבל וודסטוק ב-1969`, difficulty: 'medium' },
      { text_he: `סטיוארט היה בן 22 בזמן המפגש`, difficulty: 'medium' },
      { text_he: `"מגי מיי" היה שמה האמיתי של האישה`, difficulty: 'easy' },
      { text_he: `השיר יצא במקור כסינגל A מצד אחד בלבד`, difficulty: 'hard' },
    ],
  },
  q406: { // Take On Me / a-ha
    trueStatements: [
      { text_he: `השיר הוקלט בשתי גרסאות מרכזיות`, difficulty: 'medium' },
      { text_he: `הראשונה ב-1984 עם המפיק טוני מנספילד — היה כשלון`, difficulty: 'hard' },
      { text_he: `השנייה עם אלן טארני ב-1985 — הפכה ללהיט`, difficulty: 'hard' },
      { text_he: `הקליפ של סטיב ברון השתמש בטכניקת ה-rotoscoping (שיתוף בין צילום חי וציורי דיו)`, difficulty: 'medium' },
      { text_he: `הקליפ לקח 16 שבועות להפיק`, difficulty: 'easy' },
      { text_he: `הקליפ זכה ב-6 פרסי MTV ב-1986`, difficulty: 'easy' },
      { text_he: `הפרסים: New Artist, Concept Video, Most Experimental Video, Direction, Special Effects, Viewer's Choice`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר הוקלט בגרסה אחת בלבד והפך ללהיט מיד`, difficulty: 'medium' },
      { text_he: `הקליפ נעשה באנימציה תלת-ממדית מתקדמת`, difficulty: 'hard' },
      { text_he: `הקליפ זכה ב-3 פרסי MTV בלבד`, difficulty: 'easy' },
      { text_he: `הקליפ צולם תוך 3 ימים`, difficulty: 'easy' },
    ],
  },
  q407: { // Don't Stop Believin' / Journey
    trueStatements: [
      { text_he: `סטיב פרי הסביר: "ניסיתי 'דרום דטרויט', ניסיתי 'מזרח' ו-'מערב' וזה לא שר"`, difficulty: 'medium' },
      { text_he: `פרי הוסיף: "אבל 'דרום דטרויט' נשמע כל כך יפה. אהבתי את הצליל"`, difficulty: 'hard' },
      { text_he: `גיאוגרפית, דרומית לדטרויט נמצאת העיר וינדזור, אונטריו, בקנדה`, difficulty: 'medium' },
      { text_he: `דטרויט שוכנת על הגדה הצפונית של נהר דטרויט`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-1981`, difficulty: 'easy' },
      { text_he: `השיר חזר לחיים אחרי הפרק האחרון של "הסופרנוס" ב-2007`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `דרומית לדטרויט נמצאת העיר טולדו, אוהיו`, difficulty: 'medium' },
      { text_he: `סטיב פרי גר בדרום דטרויט בילדותו`, difficulty: 'easy' },
      { text_he: `השיר יצא ב-1977`, difficulty: 'medium' },
      { text_he: `השיר חזר לחיים אחרי "Glee" ב-2009 ולא אחרי "הסופרנוס"`, difficulty: 'hard' },
    ],
  },
  q408: { // Africa / Toto
    trueStatements: [
      { text_he: `השיר יצא ב-1982 מהאלבום Toto IV`, difficulty: 'medium' },
      { text_he: `הוא הגיע למקום 1 בבילבורד הוט 100 ב-1983`, difficulty: 'easy' },
      { text_he: `בעידן הסטרימינג השיר זכה לתחייה ב-2017`, difficulty: 'medium' },
      { text_he: `הוא הפך לאחד השירים המושמעים ביותר של שנות ה-80`, difficulty: 'hard' },
      { text_he: `ב-2019 התקנה הוצבה בנמיביה — מערכת לוואים מסוקרת שנגנת אותו אינסוף בלולאה במדבר`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-1985 מהאלבום Toto V`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 5 בבילבורד הוט 100`, difficulty: 'easy' },
      { text_he: `התחייה של השיר התרחשה ב-2010, לא ב-2017`, difficulty: 'medium' },
      { text_he: `התקנת הסאונד הוצבה בקניה ב-2018`, difficulty: 'hard' },
    ],
  },
  q410: { // Sweet Caroline / Neil Diamond
    trueStatements: [
      { text_he: `דיימונד הודה ב-2007 שההשראה הגיעה מתצלום של קרוליין קנדי`, difficulty: 'medium' },
      { text_he: `קרוליין קנדי הייתה בערך בת 11 כשהשיר יצא`, difficulty: 'hard' },
      { text_he: `דיימונד שר את השיר בפרטיות במסיבת יום הולדת 50 שלה ב-2007`, difficulty: 'easy' },
      { text_he: `ב-2014 דיימונד שינה את גרסתו ואמר שהשיר היה למעשה על אשתו דאז`, difficulty: 'medium' },
      { text_he: `דיימונד הסביר שהיה צריך שם בעל 3 הברות שיתאים למלודיה`, difficulty: 'hard' },
      { text_he: `השיר הפך להמנון של בייסבול בוסטון רד סוקס ב-2002`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `דיימונד אמר מההתחלה שהשיר על אשתו, לא על קרוליין קנדי`, difficulty: 'medium' },
      { text_he: `קרוליין קנדי הייתה בת 25 כשהשיר יצא`, difficulty: 'hard' },
      { text_he: `דיימונד שר את השיר בטקס פומבי לכבוד יום הולדת 50 לקרוליין קנדי`, difficulty: 'medium' },
      { text_he: `השיר הפך להמנון של בייסבול ניו יורק יאנקיז`, difficulty: 'easy' },
    ],
  },
  q411: { // Stayin' Alive / Bee Gees
    trueStatements: [
      { text_he: `הקצב של השיר הוא בערך 103 פעימות לדקה (BPM)`, difficulty: 'medium' },
      { text_he: `הקצב נופל בטווח המומלץ של איגוד הלב האמריקאי לעיסוי לב בהחייאה (100-120 פעימות לדקה)`, difficulty: 'medium' },
      { text_he: `מחקרים הראו ש-CPR בתזמון לקצב של "Stayin' Alive" משפר את שמירת הזיכרון של הטכניקה`, difficulty: 'easy' },
      { text_he: `ב-2008 איגוד הלב פתח קמפיין עם הסרטון של קן ג'ונג בחליפת "סטיין אלייב"`, difficulty: 'hard' },
      { text_he: `מחקרים הראו ש-"Another One Bites the Dust" של קווין עובד טוב — אם כי קצת אירוני ל-CPR`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הקצב של השיר הוא 80 פעימות לדקה`, difficulty: 'medium' },
      { text_he: `הטווח המומלץ של איגוד הלב הוא 60-80 פעימות לדקה`, difficulty: 'medium' },
      { text_he: `הקמפיין של איגוד הלב היה ב-1998 עם הסרטון של ג'ון טראבולטה`, difficulty: 'hard' },
      { text_he: `מחקרים הראו ש-"Macarena" עובד טוב יותר ל-CPR`, difficulty: 'hard' },
    ],
  },
  q412: { // White Wedding / Billy Idol
    trueStatements: [
      { text_he: `בילי איידול היה כועס שאחותו הצעירה ג'יין התחתנה כשהיא בהריון`, difficulty: 'medium' },
      { text_he: `המצב הפך את ה"חתונה הלבנה" (שמלה לבנה כסמל לבתולים) לצביעות בעיניו`, difficulty: 'hard' },
      { text_he: `רבים מקשיבים מתעקשים לפרש "little sister" בשיר כסלנג ל"חברה"`, difficulty: 'hard' },
      { text_he: `הקשר לאחותו הוא ההשראה האמיתית לשיר`, difficulty: 'easy' },
      { text_he: `השיר נחשב לאחד הסמלים של עידן הניו ווייב`, difficulty: 'medium' },
      { text_he: `השיר הוא אחד השירים הכי מנוגנים בחתונות עד היום — באירוניה גדולה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `איידול היה שמח על חתונת אחותו וכתב שיר חגיגי בעצם`, difficulty: 'medium' },
      { text_he: `אחותו של איידול נקראת ג'ניפר`, difficulty: 'hard' },
      { text_he: `השיר נכתב על אחיו הבכור, לא אחותו`, difficulty: 'easy' },
      { text_he: `השיר נחשב לסמל של פאנק רוק קלאסי`, difficulty: 'medium' },
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
