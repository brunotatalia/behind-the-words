#!/usr/bin/env node
// Self-contained statements pass — batch 7: q421-q449 (final batch)
// Same self-containment rule. Also fixes typos spotted along the way
// ("ארוועזרייה" → "עצרות הבחירות", "ביוקרטי" → "בויים", etc.).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const fixed = {
  q421: { // I Love Rock 'n' Roll / Joan Jett
    trueStatements: [
      { text_he: `I Love Rock 'n' Roll נכתב על ידי אלן מריל וג'ייק הוקר עבור הלהקה הבריטית The Arrows`, difficulty: 'medium' },
      { text_he: `הגרסה המקורית של I Love Rock 'n' Roll בביצוע The Arrows יצאה ביולי 1975`, difficulty: 'medium' },
      { text_he: `הגרסה המקורית של I Love Rock 'n' Roll בביצוע The Arrows לא הצליחה מסחרית ונשארה לא ידועה`, difficulty: 'medium' },
      { text_he: `ב-1976 ג'ואן ג'ט הייתה בסיבוב הופעות אנגלי עם להקת הבכורה שלה The Runaways`, difficulty: 'hard' },
      { text_he: `ג'ואן ג'ט ראתה את The Arrows מבצעים את I Love Rock 'n' Roll בסדרת הטלוויזיה הבריטית "Arrows"`, difficulty: 'hard' },
      { text_he: `ב-1981 ג'ואן ג'ט הקליטה את I Love Rock 'n' Roll עם הלהקה החדשה שלה The Blackhearts`, difficulty: 'medium' },
      { text_he: `I Love Rock 'n' Roll הפך לסינגל מספר 1 בארה"ב לשבעה שבועות ב-1982`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `I Love Rock 'n' Roll נכתב במקור על ידי ג'ואן ג'ט ב-1975`, difficulty: 'medium' },
      { text_he: `ג'ואן ג'ט שמעה את I Love Rock 'n' Roll ברדיו אמריקאי, לא בסדרה אנגלית`, difficulty: 'hard' },
      { text_he: `ג'ואן ג'ט הקליטה את I Love Rock 'n' Roll עם להקת הבכורה שלה The Runaways`, difficulty: 'medium' },
      { text_he: `הסינגל I Love Rock 'n' Roll הגיע רק למקום 5 בארה"ב`, difficulty: 'medium' },
    ],
  },
  q422: { // Torn / Natalie Imbruglia
    trueStatements: [
      { text_he: `הגרסה של נטלי אימברוליה ל-Torn הגיעה למקום 1 ב-MTV`, difficulty: 'medium' },
      { text_he: `הגרסה של נטלי אימברוליה ל-Torn הגיעה למקום 42 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `החוקים של בילבורד אז מנעו מ-Torn לעלות למקום הראשון בגלל סיבות טכניות`, difficulty: 'hard' },
      { text_he: `נטלי אימברוליה אמרה ב-2017 שעד היום, 25 שנה אחרי, אנשים מבקשים ממנה את Torn ראשון בכל הופעה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הגרסה של נטלי אימברוליה ל-Torn הגיעה למקום 1 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `נטלי אימברוליה הצהירה שהיא לא רוצה לשיר את Torn יותר`, difficulty: 'medium' },
      { text_he: `החוקים של בילבורד תמכו במלוא העוצמה ב-MTV באותה תקופה של Torn`, difficulty: 'hard' },
      { text_he: `נטלי אימברוליה כתבה גרסה חדשה של Torn ב-2017`, difficulty: 'medium' },
    ],
  },
  q423: { // Fortunate Son / Creedence Clearwater Revival
    trueStatements: [
      { text_he: `דייוויד אייזנהאואר (נכדו של הנשיא אייזנהאואר, מהדמויות שעוררו את Fortunate Son) דווקא התגייס לחיל הים ב-1970`, difficulty: 'hard' },
      { text_he: `דייוויד אייזנהאואר שירת 3 שנים בפועל בחיל הים`, difficulty: 'medium' },
      { text_he: `שירותו של דייוויד אייזנהאואר היה אחרי כתיבת Fortunate Son ב-1969`, difficulty: 'medium' },
      { text_he: `Fortunate Son נכלל ברשימת 500 השירים הגדולים בכל הזמנים של מגזין רולינג סטון`, difficulty: 'easy' },
      { text_he: `ב-2014 ג'ון פוגרטי, סולן Creedence Clearwater Revival וכותב Fortunate Son, הזדעזע מכך שקמפיין דונלד טראמפ ניגן את השיר בעצרות`, difficulty: 'medium' },
      { text_he: `ג'ון פוגרטי הוציא אזהרה רשמית לדונלד טראמפ שלא להשתמש ב-Fortunate Son`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `דייוויד אייזנהאואר נמלט משירות צבאי לקנדה`, difficulty: 'medium' },
      { text_he: `דייוויד אייזנהאואר שירת בחיל האוויר 5 שנים`, difficulty: 'hard' },
      { text_he: `ג'ון פוגרטי שיבח את הקמפיין של טראמפ על השימוש ב-Fortunate Son`, difficulty: 'medium' },
      { text_he: `ג'ון פוגרטי תבע את דונלד טראמפ בבית משפט על השימוש ב-Fortunate Son`, difficulty: 'medium' },
    ],
  },
  q424: { // Ohio / Crosby, Stills, Nash & Young
    trueStatements: [
      { text_he: `ניל יאנג, כותב Ohio, אמר שירי קנט סטייט (1970) היה "כנראה השיעור הכי גדול שאי פעם נלמד במוסד אמריקאי ללימודים"`, difficulty: 'medium' },
      { text_he: `Ohio הופץ ברדיו תוך שבועות ספורים מההקלטה — שיא של מהירות בתעשיית התקליטים של אותה תקופה`, difficulty: 'hard' },
      { text_he: `Ohio נחשב לאחד השירים הפוליטיים החשובים ביותר של הרוק האמריקאי`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ניל יאנג אמר שירי קנט סטייט ב-1970 "לא היה שום דבר מיוחד"`, difficulty: 'medium' },
      { text_he: `Ohio הופץ ברדיו רק שנה אחרי ההקלטה`, difficulty: 'hard' },
      { text_he: `Ohio נחשב לאחד השירים הקלאסיים על אהבה`, difficulty: 'medium' },
      { text_he: `ניל יאנג כתב את Ohio 6 חודשים אחרי ירי קנט סטייט`, difficulty: 'medium' },
    ],
  },
  q425: { // Waterloo / ABBA
    trueStatements: [
      { text_he: `ABBA זכו באירוויזיון 1974 שהתקיים בבריטניה (ברייטון) עם השיר Waterloo`, difficulty: 'easy' },
      { text_he: `הזכייה של ABBA ב-Waterloo באירוויזיון הייתה ב-6 באפריל 1974`, difficulty: 'medium' },
      { text_he: `ABBA זכו באירוויזיון 1974 עם 24 נקודות`, difficulty: 'medium' },
      { text_he: `ABBA הקדימו את איטליה במקום השני באירוויזיון 1974 ב-6 נקודות בלבד`, difficulty: 'hard' },
      { text_he: `ב-2005 Waterloo נבחר לשיר האירוויזיון הטוב בכל הזמנים, בתחרות ה-50 שנה של האירוויזיון`, difficulty: 'medium' },
      { text_he: `הזכייה של ABBA ב-Waterloo השיקה את הקריירה הבינלאומית שלהם`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ABBA זכו באירוויזיון 1972 עם Waterloo`, difficulty: 'medium' },
      { text_he: `הזכייה של ABBA ב-Waterloo הייתה בסטוקהולם, שוודיה`, difficulty: 'medium' },
      { text_he: `ABBA זכו באירוויזיון 1974 ברוב גדול של 50 נקודות מעל המקום השני`, difficulty: 'hard' },
      { text_he: `ב-2005 דווקא "Mamma Mia" נבחר כשיר האירוויזיון הטוב בכל הזמנים`, difficulty: 'medium' },
    ],
  },
  q426: { // American Woman / The Guess Who
    trueStatements: [
      { text_he: `American Woman הוקלט ב-13 באוגוסט 1969`, difficulty: 'medium' },
      { text_he: `American Woman יצא במרץ 1970`, difficulty: 'easy' },
      { text_he: `American Woman הגיע למקום 1 בבילבורד הוט 100 בארה"ב`, difficulty: 'easy' },
      { text_he: `מקום 1 בבילבורד עם American Woman היה דבר נדיר ביותר ללהקה קנדית באותה תקופה`, difficulty: 'medium' },
      { text_he: `גרסת הכיסוי של לני קרביץ ל-American Woman מ-1999 (לפסקול הסרט "Austin Powers") הציגה את השיר לדור חדש`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `American Woman הוקלט ב-1972`, difficulty: 'medium' },
      { text_he: `American Woman הגיע רק למקום 50 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `גרסת הכיסוי של בון ג'ובי ל-American Woman מ-1999 היא המוכרת ביותר`, difficulty: 'hard' },
      { text_he: `הקליפ של "Austin Powers" השתמש בגרסה המקורית של American Woman מ-1970`, difficulty: 'medium' },
    ],
  },
  q427: { // Hurricane / Bob Dylan
    trueStatements: [
      { text_he: `המתאגרף רובין "הוריקן" קרטר הואשם יחד עם ג'ון ארטיס ברצח משולש — הסיפור שעליו Hurricane`, difficulty: 'medium' },
      { text_he: `הרצח שעליו Hurricane התרחש בבר Lafayette ב-Paterson, ניו ג'רזי ב-1966`, difficulty: 'hard' },
      { text_he: `בוב דילן קרא את האוטוביוגרפיה של רובין "הוריקן" קרטר`, difficulty: 'medium' },
      { text_he: `בוב דילן ביקר את רובין "הוריקן" קרטר בכלא Rahway`, difficulty: 'medium' },
      { text_he: `בוב דילן כתב את Hurricane יחד עם ז'אק לוי`, difficulty: 'medium' },
      { text_he: `ב-1985 השופט לי סארוקין פסק שרובין "הוריקן" קרטר לא קיבל משפט הוגן`, difficulty: 'hard' },
      { text_he: `רובין "הוריקן" קרטר שוחרר מהכלא אחרי כ-19 שנה`, difficulty: 'medium' },
      { text_he: `ב-1988 כל האישומים נגד רובין "הוריקן" קרטר בוטלו לחלוטין`, difficulty: 'medium' },
      { text_he: `דנזל וושינגטון גילם את רובין "הוריקן" קרטר בסרט "The Hurricane" משנת 1999`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הרצח שעליו Hurricane התרחש בלאס וגאס`, difficulty: 'medium' },
      { text_he: `בוב דילן כתב את Hurricane לבד, בלי שותף`, difficulty: 'medium' },
      { text_he: `רובין "הוריקן" קרטר שוחרר מהכלא רק אחרי 25 שנה`, difficulty: 'hard' },
      { text_he: `מורגן פרימן גילם את רובין "הוריקן" קרטר בסרט "The Hurricane"`, difficulty: 'medium' },
    ],
  },
  q428: { // In the Air Tonight / Phil Collins
    trueStatements: [
      { text_he: `פיל קולינס אמר במפורש על In the Air Tonight: "אני לא יודע על מה השיר הזה"`, difficulty: 'medium' },
      { text_he: `פיל קולינס הסביר: "כשכתבתי את In the Air Tonight, עברתי גירושים"`, difficulty: 'medium' },
      { text_he: `פיל קולינס דחה פעמים רבות את האגדה האורבנית ש-In the Air Tonight על אדם שראה במישהו טובע`, difficulty: 'hard' },
      { text_he: `פיל קולינס אמר שהאגדה האורבנית סביב In the Air Tonight מתסכלת אותו במיוחד באמריקה`, difficulty: 'medium' },
      { text_he: `In the Air Tonight נכתב במהלך גירושיו של פיל קולינס ב-1980 מאשתו הראשונה אנדריאה ברטורלי`, difficulty: 'hard' },
      { text_he: `פיל קולינס הודה על In the Air Tonight: "כתבתי את המילים באופן ספונטני... יש בו הרבה כעס, יאוש ותסכול"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `פיל קולינס אישר שהאגדה האורבנית על In the Air Tonight (אדם שראה במישהו טובע) נכונה לחלוטין`, difficulty: 'medium' },
      { text_he: `פיל קולינס כתב את In the Air Tonight אחרי שראה אדם טובע באמת`, difficulty: 'medium' },
      { text_he: `שמה של אשתו הראשונה של פיל קולינס הוא רובין`, difficulty: 'hard' },
      { text_he: `פיל קולינס הצהיר שהוא יודע בדיוק על מה In the Air Tonight`, difficulty: 'medium' },
    ],
  },
  q429: { // Y.M.C.A. / Village People
    trueStatements: [
      { text_he: `Y.M.C.A. יצא ב-1978`, difficulty: 'easy' },
      { text_he: `Y.M.C.A. הגיע למקום 2 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `במקום 1 בבילבורד באותו שבוע של Y.M.C.A. הייתה "Le Freak" של Chic`, difficulty: 'hard' },
      { text_he: `הריקוד הקלאסי עם ההברות Y-M-C-A פופולרי בכל מסיבה`, difficulty: 'easy' },
      { text_he: `ב-2020 הוקצה Y.M.C.A. לעצרות הבחירות של דונלד טראמפ`, difficulty: 'medium' },
      { text_he: `ויקטור ויליס, סולן Village People, הוציא אזהרה משפטית בעקבות השימוש של טראמפ ב-Y.M.C.A.`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `Y.M.C.A. יצא ב-1980`, difficulty: 'easy' },
      { text_he: `Y.M.C.A. הגיע למקום 1 בבילבורד למשך 4 שבועות`, difficulty: 'medium' },
      { text_he: `במקום 1 בבילבורד בזמן יציאת Y.M.C.A. הייתה "Stayin' Alive" של Bee Gees`, difficulty: 'hard' },
      { text_he: `Village People תמכו בקמפיין של דונלד טראמפ`, difficulty: 'medium' },
    ],
  },
  q430: { // Blurred Lines / Robin Thicke
    trueStatements: [
      { text_he: `מרווין גיי קיבל קרדיט פוסט-מורטם כשותף לכתיבת Blurred Lines, אחרי תביעת משפחתו`, difficulty: 'medium' },
      { text_he: `הפסק במשפט Blurred Lines (שב-Got to Give It Up דמה לו) גרם לחששות נרחבים בתעשיית המוזיקה`, difficulty: 'hard' },
      { text_he: `מאז משפט Blurred Lines יוצרים נזהרים יותר מ"דמיון בתחושה" בלבד`, difficulty: 'medium' },
      { text_he: `רובין ת'יק ופארל וויליאמס הכחישו לאורך כל הדרך שהם העתיקו ב-Blurred Lines את "Got to Give It Up" של מרווין גיי`, difficulty: 'medium' },
      { text_he: `הקלטות מאחורי הקלעים בהן ת'יק מודה ש"רציתי להפוך את Blurred Lines ל-Marvin Gaye" עזרו לתביעה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `מרווין גיי תבע אישית על Blurred Lines לפני מותו`, difficulty: 'medium' },
      { text_he: `הפסק על Blurred Lines נחשב לאי-משמעותי בתעשייה`, difficulty: 'medium' },
      { text_he: `ת'יק ופארל אישרו מההתחלה שהם העתיקו ב-Blurred Lines את "Got to Give It Up"`, difficulty: 'hard' },
      { text_he: `ההקלטות מאחורי הקלעים על Blurred Lines מכילות פארל וויליאמס מאשר את ההעתקה, לא ת'יק`, difficulty: 'hard' },
    ],
  },
  q431: { // Livin' on a Prayer / Bon Jovi
    trueStatements: [
      { text_he: `הסיפור על "טומי וגינה" (Tommy and Gina) ב-Livin' on a Prayer הפך לדמות מטאפורית של הזוג העובד`, difficulty: 'medium' },
      { text_he: `Livin' on a Prayer מופיע ב"גלי ההיסטוריה" של 80s כסמל הז'אנר`, difficulty: 'easy' },
      { text_he: `Livin' on a Prayer עדיין מנוגן ביציעי ספורט מסביב לעולם`, difficulty: 'easy' },
      { text_he: `ב-2024 ג'ון בון ג'ובי הוציא דוקומנטרי על האלבום של Livin' on a Prayer שמראה את התהליך של "כמעט-זניחת-השיר"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הדמויות "טומי וגינה" ב-Livin' on a Prayer מבוססות על אנשים אמיתיים שג'ון בון ג'ובי הכיר`, difficulty: 'medium' },
      { text_he: `Livin' on a Prayer נשכח לחלוטין בשנות ה-90`, difficulty: 'medium' },
      { text_he: `Bon Jovi הוציאו דוקומנטרי על Livin' on a Prayer רק ב-2010`, difficulty: 'hard' },
      { text_he: `Livin' on a Prayer הוצא מסטליסטים ספורטיביים בעקבות ויכוחים על המסר`, difficulty: 'medium' },
    ],
  },
  q432: { // Barbie Girl / Aqua
    trueStatements: [
      { text_he: `חברת מאטל תבעה את חברת התקליטים MCA על Barbie Girl בספטמבר 1997`, difficulty: 'medium' },
      { text_he: `התביעה של מאטל על Barbie Girl הייתה על הפרת סימן מסחר וזכויות יוצרים`, difficulty: 'medium' },
      { text_he: `ב-2002 בית המשפט הפדרלי לערעורים בארה"ב פסק ש-Barbie Girl מוגן כפרודיה`, difficulty: 'hard' },
      { text_he: `השופט אלכס קוז'ינסקי סיכם את החלטתו על Barbie Girl במשפט: "The parties are advised to chill"`, difficulty: 'hard' },
      { text_he: `ב-2009 חברת מאטל עצמה השתמשה בגרסה מותאמת של Barbie Girl בפרסומת`, difficulty: 'medium' },
      { text_he: `ב-2023 לסרט Barbie Movie של מאטל הם רכשו רישיון ל-Barbie Girl המקורי`, difficulty: 'easy' },
      { text_he: `מאטל גם הזמינו את Aqua לכתוב גרסה חדשה של Barbie Girl לסרט Barbie`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `מאטל תבעו את Aqua במישרין על Barbie Girl, לא את MCA Records`, difficulty: 'medium' },
      { text_he: `מאטל זכו בתביעה על Barbie Girl ו-Aqua נאלצו לשלם פיצויים`, difficulty: 'medium' },
      { text_he: `השופט קוז'ינסקי סיכם את החלטתו על Barbie Girl במשפט "The parties shall pay damages"`, difficulty: 'hard' },
      { text_he: `מאטל מעולם לא השתמשו ב-Barbie Girl אחרי המשפט`, difficulty: 'medium' },
    ],
  },
  q433: { // Cotton Eye Joe / Rednex
    trueStatements: [
      { text_he: `המנגינה המקורית של Cotton Eye Joe ידועה לפחות מאז לפני מלחמת האזרחים האמריקאית (1861-1865)`, difficulty: 'hard' },
      { text_he: `Cotton Eye Joe המקורי שר על ידי עבדים אפרו-אמריקאים בדרום ארה"ב`, difficulty: 'medium' },
      { text_he: `הפולקלוריסטית דורות'י סקארבורו תיעדה את Cotton Eye Joe במחקריה כ"שיר ששמעה את העבדים שרים על המטעים"`, difficulty: 'hard' },
      { text_he: `Rednex היא להקת סקה שוודית`, difficulty: 'medium' },
      { text_he: `Rednex הפכו את Cotton Eye Joe ב-1994 ללהיט יורודאנס עולמי`, difficulty: 'medium' },
      { text_he: `גרסת Rednex ל-Cotton Eye Joe נחשבת לאחד הסינגלים המצליחים בתולדות מצעדי אירופה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Cotton Eye Joe נכתב במקור ב-1920 על ידי קומפוזיטור אמריקאי`, difficulty: 'medium' },
      { text_he: `Rednex היא להקה דנית, לא שוודית`, difficulty: 'medium' },
      { text_he: `Rednex הפכו את Cotton Eye Joe ללהיט עולמי ב-1990`, difficulty: 'hard' },
      { text_he: `הפולקלוריסטית דורות'י סקארבורו תיעדה את Cotton Eye Joe רק במאה ה-21`, difficulty: 'hard' },
    ],
  },
  q434: { // Mother's Little Helper / The Rolling Stones
    trueStatements: [
      { text_he: `בשנות ה-60 היו מיליוני מרשמים של ולְיום (דיאזפם) ותרופות הרגעה אחרות לעקרות בית — התופעה ש-Mother's Little Helper מבקר`, difficulty: 'medium' },
      { text_he: `התופעה של מרשמי הרגעה לעקרות בית בשנות ה-60 התרחשה הן באמריקה והן בבריטניה`, difficulty: 'medium' },
      { text_he: `ההשראה הספציפית ל-Mother's Little Helper הגיעה כשהמהנדס דייוויד הסינגר ביקש מאשתו להביא תרופות הרגעה לאולפן`, difficulty: 'hard' },
      { text_he: `אשתו של המהנדס דייוויד הסינגר הביאה ולְיום לאולפן The Rolling Stones — מה שעורר את כתיבת Mother's Little Helper`, difficulty: 'hard' },
      { text_he: `מיק ג'אגר התרגש מזה והתחיל לכתוב את מילי Mother's Little Helper`, difficulty: 'medium' },
      { text_he: `Mother's Little Helper היה הראשון בפופ שעסק בהתמכרות תרופתית של מעמד-ביניים`, difficulty: 'easy' },
      { text_he: `ה-BBC אסר את Mother's Little Helper בעיקר בגלל "הזכרה מפורשת של סמים"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `התרופה המצוטטת ב-Mother's Little Helper היא Prozac`, difficulty: 'medium' },
      { text_he: `מיק ג'אגר כתב את Mother's Little Helper אחרי ניסיון אישי עם ולְיום`, difficulty: 'medium' },
      { text_he: `ה-BBC שיבחה את Mother's Little Helper כשיר חינוכי על סכנות הסמים`, difficulty: 'hard' },
      { text_he: `התופעה של מרשמים מרובים לתרופות הרגעה הייתה רק בארה"ב, לא בבריטניה`, difficulty: 'medium' },
    ],
  },
  q435: { // Perfect Day / Lou Reed
    trueStatements: [
      { text_he: `Perfect Day נכלל בסרט "Trainspotting" (1996) של דני בויל`, difficulty: 'easy' },
      { text_he: `Perfect Day מופיע בסצנה איקונית של מנת-יתר בסרט "Trainspotting"`, difficulty: 'medium' },
      { text_he: `הסצנה של Perfect Day ב-Trainspotting חיזקה את הפרשנות של "שיר על הרואין"`, difficulty: 'medium' },
      { text_he: `לו ריד עצמו לא חתום על הפרשנות של Perfect Day כ"שיר על הרואין"`, difficulty: 'hard' },
      { text_he: `הסינגל של ה-BBC ל-Perfect Day ב-1997 כלל הופעות של דייוויד בואי, אלטון ג'ון, רוד סטיוארט, היאת'ר סמול ועוד עשרות אמנים`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `Perfect Day נכלל בסרט "Pulp Fiction" של קוונטין טרנטינו`, difficulty: 'medium' },
      { text_he: `לו ריד הצהיר במפורש ש-Perfect Day עוסק בהרואין`, difficulty: 'medium' },
      { text_he: `הסינגל של ה-BBC ל-Perfect Day ב-1997 כלל רק את לו ריד עצמו`, difficulty: 'hard' },
      { text_he: `הסצנה של Perfect Day ב-Trainspotting הייתה דווקא קומית`, difficulty: 'medium' },
    ],
  },
  q436: { // Cocaine / Eric Clapton
    trueStatements: [
      { text_he: `Cocaine נכתב והוקלט ב-1976 על ידי הזמר ג'.ג'. קייל`, difficulty: 'medium' },
      { text_he: `אריק קלפטון כיסה את Cocaine ב-1977`, difficulty: 'medium' },
      { text_he: `אריק קלפטון אמר על Cocaine: "השיר הזה הוא די בחכמה אנטי-קוקאין... אם תקשיבו טוב, ברור שהוא 'נגד'"`, difficulty: 'hard' },
      { text_he: `בהופעות חיות, אריק קלפטון מוסיף לעיתים שורות כמו "that dirty cocaine" ל-Cocaine כדי להבהיר את העמדה הביקורתית`, difficulty: 'hard' },
      { text_he: `הפקת Cocaine נעשתה בתקופה שאריק קלפטון נאבק בהתמכרות לקוקאין שלו עצמו`, difficulty: 'medium' },
      { text_he: `אריק קלפטון ממעט לנגן את Cocaine בהופעות בעידן המודרני כדי למנוע אי הבנות`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Cocaine נכתב על ידי אריק קלפטון עצמו ב-1976`, difficulty: 'medium' },
      { text_he: `אריק קלפטון הצהיר ש-Cocaine הוא חגיגה כנה של תרבות הסמים`, difficulty: 'medium' },
      { text_he: `הפקת Cocaine נעשתה בתקופה של פיכחון מוחלט של אריק קלפטון`, difficulty: 'hard' },
      { text_he: `אריק קלפטון מנגן את Cocaine בכל הופעה שלו עד היום`, difficulty: 'medium' },
    ],
  },
  q437: { // Gangsta's Paradise / Coolio (duplicate of q079)
    trueStatements: [
      { text_he: `סטיבי וונדר היה צריך לאשר את השימוש בלחן של "Pastime Paradise" (1976) שלו ב-Gangsta's Paradise`, difficulty: 'medium' },
      { text_he: `סטיבי וונדר דרש ש-Coolio יסיר את כל הקללות מהטקסט של Gangsta's Paradise לפני שיאפשר את השימוש בלחן`, difficulty: 'hard' },
      { text_he: `Coolio הסכים לדרישת סטיבי וונדר, ויצר את הגרסה המצונזרת של Gangsta's Paradise`, difficulty: 'medium' },
      { text_he: `סטיבי וונדר קיבל קרדיט שותף לכתיבת Gangsta's Paradise ותמלוגים מההצלחה הגדולה`, difficulty: 'medium' },
      { text_he: `Gangsta's Paradise זכה בגראמי ל-Best Rap Solo Performance ב-1996`, difficulty: 'easy' },
      { text_he: `Gangsta's Paradise היה הסינגל הנמכר ביותר של 1995`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `סטיבי וונדר סירב לחלוטין לאשר את השימוש בלחן של "Pastime Paradise" ב-Gangsta's Paradise`, difficulty: 'medium' },
      { text_he: `Coolio סירב להסיר את הקללות מ-Gangsta's Paradise והמשיך לשירת הגרסה הגלמית`, difficulty: 'medium' },
      { text_he: `סטיבי וונדר תבע את Coolio בבית משפט על Gangsta's Paradise`, difficulty: 'hard' },
      { text_he: `Gangsta's Paradise זכה בגראמי לאלבום השנה ב-1996`, difficulty: 'medium' },
    ],
  },
  q438: { // Nights in White Satin / The Moody Blues
    trueStatements: [
      { text_he: `ג'סטין הייווארד, סולן The Moody Blues, כתב את Nights in White Satin בגיל 19`, difficulty: 'medium' },
      { text_he: `ג'סטין הייווארד כתב את Nights in White Satin בסיבוב הופעות בבלגיה`, difficulty: 'medium' },
      { text_he: `חברתו דאז של ג'סטין הייווארד נתנה לו במתנה סדינים מסטין לבן — ההשראה ל-Nights in White Satin`, difficulty: 'hard' },
      { text_he: `רבים שומעים ב-Nights in White Satin בטעות "Knights" (אבירים) במקום "Nights" (לילות)`, difficulty: 'medium' },
      { text_he: `הבלבול עם "Knights" הוביל לכיסוי בלגי של ג'ורג'יו מורודר ב-1976 בשם "Knights in White Satin" (בכוונה!)`, difficulty: 'hard' },
      { text_he: `Nights in White Satin יצא לראשונה ב-3 בנובמבר 1967`, difficulty: 'easy' },
      { text_he: `Nights in White Satin הפך ללהיט מאוחר ב-1972 כשיצא מחדש ב-FM רדיו אמריקאי`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `ג'סטין הייווארד כתב את Nights in White Satin בגיל 25`, difficulty: 'medium' },
      { text_he: `הסדינים שהיו ההשראה ל-Nights in White Satin היו מתוצרת איטליה`, difficulty: 'hard' },
      { text_he: `הכיסוי של ג'ורג'יו מורודר ל-Nights in White Satin נקרא "Days in White Satin"`, difficulty: 'medium' },
      { text_he: `Nights in White Satin היה להיט מיידי מיום שחרורו ב-1967`, difficulty: 'medium' },
    ],
  },
  q439: { // Time After Time / Cyndi Lauper
    trueStatements: [
      { text_he: `סינדי לאופר ראתה את השם Time After Time בעיתון TV Guide`, difficulty: 'medium' },
      { text_he: `הסרט "Time After Time" משנת 1979, שעורר את שם השיר, הוא של הבמאי ניקולס מאייר`, difficulty: 'hard' },
      { text_he: `הסרט "Time After Time" משנת 1979 עוסק ב-ה.ג'. וולס שרודף את ג'ק המרטש בזמן`, difficulty: 'hard' },
      { text_he: `סינדי לאופר רצתה להשתמש ב-"Time After Time" רק כשם זמני בכתיבה`, difficulty: 'medium' },
      { text_he: `סינדי לאופר התקשרה לשם Time After Time והרגישה שהשיר "יקרוס בלעדיו"`, difficulty: 'medium' },
      { text_he: `Time After Time יצא ב-1984 והגיע למקום 1 בבילבורד הוט 100`, difficulty: 'easy' },
      { text_he: `גרסת הכיסוי של מיילס דייוויס ל-Time After Time מ-1985 הפכה אותו לסטנדרט ג'אז`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `סינדי לאופר ראתה את השם Time After Time בעיתון Rolling Stone`, difficulty: 'medium' },
      { text_he: `הסרט "Time After Time" עוסק במסע בזמן רגיל ללא ה.ג'. וולס`, difficulty: 'hard' },
      { text_he: `סינדי לאופר תכננה את שם Time After Time מההתחלה`, difficulty: 'medium' },
      { text_he: `Time After Time הגיע רק למקום 5 בבילבורד`, difficulty: 'medium' },
    ],
  },
  q440: { // Wannabe / Spice Girls
    trueStatements: [
      { text_he: `הביטוי "If you wanna be my lover, you gotta get with my friends" מ-Wannabe הפך לאחד הציטוטים המוכרים ביותר בפופ של 90s`, difficulty: 'medium' },
      { text_he: `הקליפ של Wannabe בבימוי ג'ורנה רוז ב-Midland Grand Hotel בלונדון צולם בלילה אחד`, difficulty: 'hard' },
      { text_he: `הקליפ של Wannabe צולם בלי תיכנון מקדים`, difficulty: 'medium' },
      { text_he: `ב-2016, ל-20 שנה לשיר Wannabe, נעשה קליפ מחווה עם קולקטיב ה-Global Goals`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הקליפ של Wannabe צולם במשך שבועיים בסטודיו מקצועי בלוס אנג'לס`, difficulty: 'medium' },
      { text_he: `הקליפ של Wannabe בויים על ידי דייוויד פינצ'ר`, difficulty: 'hard' },
      { text_he: `ב-2010 נעשה קליפ מחווה ל-Wannabe לציון 14 שנה לשיר`, difficulty: 'medium' },
      { text_he: `הקליפ של Wannabe צולם בפריז ב-Champs-Élysées`, difficulty: 'medium' },
    ],
  },
  q441: { // Call Me Maybe / Carly Rae Jepsen
    trueStatements: [
      { text_he: `Call Me Maybe היה הסינגל השני של קרלי ריי ג'פסן בקנדה`, difficulty: 'medium' },
      { text_he: `Call Me Maybe יצא במקור בספטמבר 2011`, difficulty: 'medium' },
      { text_he: `Call Me Maybe הגיע למקום 1 בבילבורד הוט 100 בארה"ב למשך 9 שבועות ב-2012`, difficulty: 'easy' },
      { text_he: `קרלי ריי ג'פסן זכתה בגראמי ל-Song of the Year (2013) על Call Me Maybe`, difficulty: 'medium' },
      { text_he: `Call Me Maybe נכלל ברשימת מגזין רולינג סטון של 500 השירים הגדולים בכל הזמנים`, difficulty: 'easy' },
      { text_he: `Call Me Maybe היה הראשון של אמן קנדי ברשימת רולינג סטון אחרי 2010`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `Call Me Maybe היה הסינגל הראשון של קרלי ריי ג'פסן בקריירה שלה`, difficulty: 'medium' },
      { text_he: `Call Me Maybe הגיע למקום 1 בבילבורד למשך 4 שבועות בלבד`, difficulty: 'medium' },
      { text_he: `קרלי ריי ג'פסן זכתה ב-Album of the Year ב-2013 על Call Me Maybe`, difficulty: 'hard' },
      { text_he: `Call Me Maybe לא נכלל ברשימת מגזין רולינג סטון`, difficulty: 'medium' },
    ],
  },
  q442: { // Old Town Road / Lil Nas X
    trueStatements: [
      { text_he: `Billboard הסירה את Old Town Road מהמצעד הקאנטרי במרץ 2019`, difficulty: 'medium' },
      { text_he: `הטענה הרשמית של Billboard להסרת Old Town Road מהמצעד הקאנטרי: "הוא לא משלב מספיק אלמנטים של מוזיקת קאנטרי של היום"`, difficulty: 'hard' },
      { text_he: `הוויכוח על Old Town Road התלקח על גזענות נסתרת בז'אנרים — Lil Nas X הוא אפרו-אמריקאי`, difficulty: 'medium' },
      { text_he: `Lil Nas X הוציא ב-5 באפריל 2019 רמיקס של Old Town Road עם בילי ריי סיירוס`, difficulty: 'medium' },
      { text_he: `הגרסאות המשולבות של Old Town Road עמדו 19 שבועות במקום 1 בבילבורד הוט 100`, difficulty: 'easy' },
      { text_he: `19 השבועות של Old Town Road במקום 1 הם שיא בכל הזמנים שעבר את "Despacito" (16 שבועות)`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `Billboard הסירה את Old Town Road מהמצעד הקאנטרי בעקבות תלונות מאמני קאנטרי ידועים`, difficulty: 'medium' },
      { text_he: `הרמיקס של Old Town Road היה עם דולי פרטון, לא עם בילי ריי סיירוס`, difficulty: 'medium' },
      { text_he: `הגרסאות המשולבות של Old Town Road עמדו 12 שבועות במקום 1`, difficulty: 'medium' },
      { text_he: `"Despacito" עדיין מחזיק בשיא של 19 שבועות במקום 1 בבילבורד`, difficulty: 'hard' },
    ],
  },
  q443: { // Thunderstruck / AC/DC
    trueStatements: [
      { text_he: `Thunderstruck יצא בספטמבר 1990 מאלבום AC/DC "The Razors Edge"`, difficulty: 'medium' },
      { text_he: `Thunderstruck הפך לאחד מסמלי ז'אנר ההארד רוק/הבי מטאל`, difficulty: 'easy' },
      { text_he: `הריף הפותח של הגיטרה ב-Thunderstruck הוא אחד הריפים האיקוניים ביותר בהיסטוריה של הרוק`, difficulty: 'easy' },
      { text_he: `Thunderstruck משמש עד היום כאנתם של קבוצות ספורט בעולם — מ-NBA דרך NFL ועד הליגות האוסטרליות`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Thunderstruck יצא ב-1985 מאלבום AC/DC "Highway to Hell"`, difficulty: 'medium' },
      { text_he: `הריף הפותח של Thunderstruck נחשב לבסיסי ופשוט יחסית בעולם הרוק`, difficulty: 'medium' },
      { text_he: `Thunderstruck אסור לנגן באירועי ספורט בארה"ב בעקבות זכויות יוצרים`, difficulty: 'hard' },
      { text_he: `אנגוס יאנג, גיטריסט AC/DC, כתב את כל הריף של Thunderstruck בעצמו ולבד`, difficulty: 'hard' },
    ],
  },
  q444: { // Enter Sandman / Metallica
    trueStatements: [
      { text_he: `הקליפ של Enter Sandman, עם הילד שמטופל מסיוטים, זכה בפרס Grammy ל-Best Hard Rock Performance ב-1992`, difficulty: 'medium' },
      { text_he: `Enter Sandman הוא ה-Walkout Song של מרינו ריוורה, הפיצ'ר הסגור של ניו יורק יאנקיז`, difficulty: 'hard' },
      { text_he: `Enter Sandman משמש כ-Walkout Song של ה-NHL בכל המגרשים`, difficulty: 'medium' },
      { text_he: `ב-2009 נמכר רישוי של Enter Sandman לסרט "תינוק"`, difficulty: 'hard' },
      { text_he: `Enter Sandman הוא אחד מהשירים המכניסים ביותר ברוק העולמי`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הקליפ של Enter Sandman זכה בגראמי לסרטון השנה ב-1992`, difficulty: 'medium' },
      { text_he: `Enter Sandman הוא ה-Walkout Song של דרק ג'יטר ביאנקיז`, difficulty: 'medium' },
      { text_he: `Enter Sandman אסור לשימוש בליגות ספורט מסיבות זכויות יוצרים`, difficulty: 'hard' },
      { text_he: `הסרט "תינוק" סירב להשתמש ב-Enter Sandman`, difficulty: 'medium' },
    ],
  },
  q445: { // Welcome to the Jungle / Guns N' Roses
    trueStatements: [
      { text_he: `Welcome to the Jungle היה הסינגל הראשון מאלבום הבכורה של Guns N' Roses, "Appetite for Destruction" (1987)`, difficulty: 'medium' },
      { text_he: `Welcome to the Jungle לא הצליח בתחילה כשיצא ב-1987`, difficulty: 'medium' },
      { text_he: `אחרי הפצת הקליפ של Welcome to the Jungle ב-MTV (גרסה לילית בלבד בגלל אלימות), השיר הפך ללהיט`, difficulty: 'hard' },
      { text_he: `Welcome to the Jungle הגיע למקום 7 בבילבורד הוט 100 ב-1988`, difficulty: 'easy' },
      { text_he: `Welcome to the Jungle נכלל ברשימת 500 השירים הגדולים של מגזין רולינג סטון`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Welcome to the Jungle היה להיט מיידי מרגע שחרורו ב-1987`, difficulty: 'medium' },
      { text_he: `הקליפ של Welcome to the Jungle ב-MTV היה ללא הגבלת שעות`, difficulty: 'medium' },
      { text_he: `Welcome to the Jungle הגיע למקום 1 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `Welcome to the Jungle היה הסינגל השלישי מאלבום "Appetite for Destruction", לא הראשון`, difficulty: 'hard' },
    ],
  },
  q446: { // Umbrella / Rihanna
    trueStatements: [
      { text_he: `הביטוי "ella, ella, ella" ב-Umbrella הפך לאחד מההוקים הקליטים ביותר בפופ`, difficulty: 'easy' },
      { text_he: `המפיק The-Dream סיפר שהמילה "umbrella" "פשוט קפצה לראש שלו" כשהביט של Umbrella נבנה`, difficulty: 'medium' },
      { text_he: `Umbrella זכה בגראמי ל-Best Rap/Sung Collaboration ב-2008`, difficulty: 'medium' },
      { text_he: `ב-2017 Umbrella הופיע בסרט "It"`, difficulty: 'easy' },
      { text_he: `בסצנת Umbrella בסרט "It", הילדה ז'ורז'י מנסה לתפוס סירת נייר בגשם`, difficulty: 'hard' },
      { text_he: `הופעת Umbrella בסרט "It" הפכה אותו לוויראלי מחדש`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הביטוי "ella, ella, ella" נוסף בלאחרונה על ידי ריהאנה לפני הקלטת Umbrella`, difficulty: 'medium' },
      { text_he: `Umbrella זכה בגראמי לשיר השנה ב-2008`, difficulty: 'medium' },
      { text_he: `Umbrella הופיע בסרט "Stranger Things" ב-2017`, difficulty: 'medium' },
      { text_he: `הסצנה של Umbrella בסרט "It" עוסקת בילדה שמחביאה מטריה`, difficulty: 'hard' },
    ],
  },
  q447: { // Hips Don't Lie / Shakira
    trueStatements: [
      { text_he: `שאקירה הוסיפה ב-Hips Don't Lie את ה"קולומביאניות" שלה — שילוב בין מקצב סלסה לעיבוד עכשווי של היפ-הופ`, difficulty: 'medium' },
      { text_he: `הקליפ של Hips Don't Lie בבימוי סופי מולר, עם שאקירה רוקדת בקרנבל ברצלונה, הפך לאיקוני`, difficulty: 'hard' },
      { text_he: `Hips Don't Lie זכה ב-Latin Grammy ובפרס Billboard`, difficulty: 'medium' },
      { text_he: `הופעת המונדיאל בגרמניה 2006, שבה שאקירה ביצעה את Hips Don't Lie חי, נחשבת לאחת ההופעות הזכורות ביותר בתחרות`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הקליפ של Hips Don't Lie צולם בקובה ולא בברצלונה`, difficulty: 'medium' },
      { text_he: `Hips Don't Lie זכה בגראמי לאלבום הלטיני הטוב`, difficulty: 'medium' },
      { text_he: `הופעת המונדיאל של שאקירה עם Hips Don't Lie הייתה בדרום אפריקה 2010, לא גרמניה 2006`, difficulty: 'hard' },
      { text_he: `שאקירה רקדה ל-Hips Don't Lie ב-Eurovision 2006 — לא במונדיאל`, difficulty: 'medium' },
    ],
  },
  q448: { // Rolling in the Deep / Adele
    trueStatements: [
      { text_he: `Rolling in the Deep היה הסינגל הראשון מאלבום אדל "21" (2011)`, difficulty: 'medium' },
      { text_he: `Rolling in the Deep הפך לסינגל הראשון של אמנית בריטית שעמד במקום 1 בבילבורד הוט 100 שבעה שבועות`, difficulty: 'hard' },
      { text_he: `Rolling in the Deep נחשב לסינגל הנמכר ביותר של 2011 בארה"ב — מעל 5 מיליון עותקים`, difficulty: 'medium' },
      { text_he: `Rolling in the Deep נכלל ברשימת 500 השירים הגדולים של מגזין רולינג סטון`, difficulty: 'easy' },
      { text_he: `ביצוע אדל ל-Rolling in the Deep בטקס הגראמי 2012 היה חזרתה הראשונה לבמה אחרי ניתוח גרון`, difficulty: 'hard' },
      { text_he: `ביצוע אדל ל-Rolling in the Deep בגראמי 2012 נחשב לאחד הרגעים הקלאסיים בהיסטוריית הטקס`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Rolling in the Deep היה הסינגל השלישי מאלבום אדל "21"`, difficulty: 'medium' },
      { text_he: `Rolling in the Deep הגיע למקום 1 בבילבורד למשך 3 שבועות בלבד`, difficulty: 'medium' },
      { text_he: `Rolling in the Deep נמכר במיליון עותקים בלבד ב-2011`, difficulty: 'hard' },
      { text_he: `אדל לא הופיעה בטקס הגראמי 2012`, difficulty: 'medium' },
    ],
  },
  q449: { // Someone Like You / Adele
    trueStatements: [
      { text_he: `המחקר על appoggiatura — האפקט המוזיקלי שמעורר דמעות ב-Someone Like You — בוצע על ידי הפסיכולוג הבריטי ג'ון סלובודה`, difficulty: 'hard' },
      { text_he: `הפסיכולוג ג'ון סלובודה מצא ש-18 מתוך 20 הקטעים המוזיקליים שמעוררים תגובה רגשית מכילים את האפקט appoggiatura`, difficulty: 'hard' },
      { text_he: `אדל הצליחה לבנות את אפקט ה-appoggiatura ב-Someone Like You אינטואיטיבית, בלי שתדע את המדע מאחוריו`, difficulty: 'medium' },
      { text_he: `Someone Like You הגיע למקום 1 בבילבורד הוט 100 למשך 5 שבועות ב-2011-2012`, difficulty: 'easy' },
      { text_he: `Someone Like You זכה בגראמי ל-Best Pop Solo Performance ב-2012`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `המחקר על appoggiatura ב-Someone Like You בוצע על ידי הפסיכולוג האמריקאי דניאל לויטין`, difficulty: 'hard' },
      { text_he: `הפסיכולוג סלובודה מצא ש-5 מתוך 20 הקטעים המעוררים מכילים את אפקט appoggiatura`, difficulty: 'hard' },
      { text_he: `אדל למדה את הטכניקה appoggiatura במחקר ספציפי לפני כתיבת Someone Like You`, difficulty: 'medium' },
      { text_he: `Someone Like You הגיע רק למקום 5 בבילבורד הוט 100`, difficulty: 'medium' },
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
