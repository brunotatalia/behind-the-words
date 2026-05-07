#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const TODAY = '2026-05-07';
const wiki = (slug, title) => ({
  url: `https://en.wikipedia.org/wiki/${slug}`,
  title: `${title} — Wikipedia`,
  type: 'wikipedia',
  accessed: TODAY,
});
const sf = (slug, title) => ({
  url: `https://www.songfacts.com/facts/${slug}`,
  title: `${title} — Songfacts`,
  type: 'songfacts',
  accessed: TODAY,
});

const audits = {
  q422: {
    verified: true,
    explanation_he: `השיר נכתב ב-1991 על ידי סקוט קאטלר, אן פרבן ופיל ת'ורנלי. ההקלטה הראשונה הייתה ב-1993 על ידי הזמרת הדנית ליז סורנסן (Lis Sørensen) בשם "Brændt" (שרוף). אדנאסוואפ (Ednaswap) הקליטו את הגרסה האנגלית ב-1995 (לא 1993). ב-1996 כיסתה את השיר הזמרת הנורווגית-אמריקאית טרין רין. רק כשנטלי אימברוליה הקליטה אותו ב-1997 הוא הפך ללהיט עולמי.`,
    sources: [
      wiki('Torn_(Ednaswap_song)', 'Torn (Ednaswap song)'),
      sf('natalie-imbruglia/torn', 'Torn by Natalie Imbruglia'),
    ],
    extendedInfo_he: `הגרסה של אימברוליה הגיעה למקום 1 ב-MTV ולמקום 42 בבילבורד הוט 100 (אם כי החוקים של בילבורד אז מנעו ממנה חזירה למקום הראשון בגלל סיבות טכניות). אימברוליה אמרה ב-2017 שעד היום, 25 שנה אחרי, אנשים מבקשים ממנה את השיר הזה ראשון בכל הופעה.`,
  },
  q423: {
    verified: true,
    explanation_he: `הסולן ג'ון פוגרטי כתב את השיר ב-1969 כאמירה כללית על אי-צדק חברתי בזמן מלחמת ויטנאם — בני האליטה (כמו דייוויד אייזנהאואר, נכד הנשיא, שהתחתן עם ג'ולי ניקסון ב-1968) קיבלו דחיות שירות צבאי או תפקידים נוחים, בעוד הפועלים נשלחו למות. פוגרטי אמר: "היית שומע על בן של סנטור או חבר קונגרס שקיבל דחייה מהצבא או תפקיד מיוחס בצבא". אירוניה: השיר מנוגן בטקסים פטריוטיים בארה"ב.`,
    sources: [
      wiki('Fortunate_Son', 'Fortunate Son'),
      sf('creedence-clearwater-revival/fortunate-son', 'Fortunate Son by CCR'),
    ],
    extendedInfo_he: `דייוויד אייזנהאואר עצמו דווקא התגייס לחיל הים ב-1970 ושירת 3 שנים בפעיל — אבל זה היה אחרי כתיבת השיר ב-1969. השיר נכלל ברשימת 500 השירים הגדולים בכל הזמנים של רולינג סטון. ב-2014 פוגרטי הזדעזע מכך ש-קמפיין של דונלד טראמפ ניגן את השיר בעצרות — והוציא אזהרה שלא להשתמש בו.`,
  },
  q424: {
    verified: true,
    explanation_he: `ב-4 במאי 1970 משמר הלאום של אוהיו ירה בהפגנה נגד מלחמת ויטנאם באוניברסיטת קנט סטייט והרג 4 סטודנטים. ניל יאנג ראה את התמונות בעיתון Life Magazine, כתב את השיר תוך זמן קצר, וההרכב Crosby, Stills, Nash & Young הקליט אותו ב-21 במאי 1970 — כ-17 ימים אחרי הטרגדיה. השורה "Tin soldiers and Nixon coming" יחד עם דמעות של דייוויד קרוסבי בסיום ההקלטה הפכו אותו להמנון אנטי-מלחמתי.`,
    sources: [
      wiki(`Ohio_(Crosby,_Stills,_Nash_%26_Young_song)`, 'Ohio (Crosby, Stills, Nash & Young song)'),
      sf('crosby-stills-nash-young/ohio', 'Ohio by CSNY'),
    ],
    extendedInfo_he: `יאנג אמר ש-קנט סטייט היה "כנראה השיעור הכי גדול שאי פעם נלמד במוסד אמריקאי ללימודים". השיר הופץ ברדיו תוך שבועות ספורים מההקלטה — שיא של מהירות בתעשיית התקליטים של אז. הוא נחשב לאחד השירים הפוליטיים החשובים ביותר של הרוק האמריקאי.`,
  },
  q425: {
    verified: true,
    sources: [
      wiki('Waterloo_(ABBA_song)', 'Waterloo (ABBA song)'),
      sf('abba/waterloo', 'Waterloo by ABBA'),
    ],
    extendedInfo_he: `ABBA זכו באירוויזיון 1974 בבריטניה (ברייטון) ב-6 באפריל 1974 עם 24 נקודות, שני אחרי איטליה ב-6 נקודות בלבד. ב-2005 השיר נבחר כשיר האירוויזיון הטוב בכל הזמנים בתחרות ה-50 שנה של האירוויזיון. הזכייה הזאת השיקה את הקריירה הבינלאומית של ABBA והפכה אותם לאחת מלהקות הפופ הגדולות בכל הזמנים.`,
  },
  q426: {
    verified: true,
    explanation_he: `Guess Who היא להקה קנדית, והשיר נחשב לאנטי-אמריקאי. הוא נכתב ב-1969 בשיא מלחמת ויטנאם — לפי ראשי-בכר ב-2014, הוא היה "שיר מחאה אנטי-מלחמתי". (אם כי הסולן ברטון קמינגס טען ב-2013 שהמילים פשוט מבטאות העדפה לנשים קנדיות.) המילה "אמריקה" בשיר היא מטאפורה לאומה חולה מאלימות. הסיפור הפופולרי על פאט ניקסון שביקשה מהם לא לנגן את השיר בבית הלבן הוא — לפי קמינגס — מיתוס שהמנהל שלהם המציא לפרסום.`,
    sources: [
      wiki('American_Woman', 'American Woman'),
      sf('the-guess-who/american-woman', 'American Woman by The Guess Who'),
    ],
    extendedInfo_he: `השיר הוקלט ב-13 באוגוסט 1969 ויצא במרץ 1970. הוא הגיע למקום 1 בבילבורד הוט 100 בארה"ב — דבר נדיר ביותר ללהקה קנדית באותה תקופה. גרסת הכיסוי של לני קרביץ מ-1999 (לפסקול הסרט "Austin Powers") הציגה את השיר לדור חדש.`,
  },
  q427: {
    verified: true,
    sources: [
      wiki('Hurricane_(Bob_Dylan_song)', 'Hurricane (Bob Dylan song)'),
      sf('bob-dylan/hurricane', 'Hurricane by Bob Dylan'),
    ],
    extendedInfo_he: `רובין "הוריקן" קרטר היה מתאגרף אפרו-אמריקאי שהואשם יחד עם ג'ון ארטיס ברצח משולש בבר Lafayette ב-Paterson, ניו ג'רזי ב-1966. דילן קרא את האוטוביוגרפיה שלו וביקר אותו בכלא Rahway. דילן כתב את השיר עם ז'אק לוי כדי לעורר תמיכה ציבורית בשחרורו. ב-1985 השופט לי סארוקין פסק שקרטר לא קיבל משפט הוגן ושחרר אותו, אחרי כ-19 שנה בכלא. ב-1988 כל האישומים בוטלו לחלוטין. דנזל וושינגטון גילם אותו בסרט "The Hurricane" (1999).`,
  },
  q428: {
    verified: true,
    sources: [
      wiki('In_the_Air_Tonight', 'In the Air Tonight'),
      sf('phil-collins/in-the-air-tonight', 'In the Air Tonight by Phil Collins'),
    ],
    extendedInfo_he: `קולינס אמר במפורש: "אני לא יודע על מה השיר הזה. כשכתבתי אותו, עברתי גירושים. הדבר היחיד שאני יכול להגיד עליו הוא שהוא ברור בכעס". הוא דחה את האגדה האורבנית פעמים רבות, ואמר שהיא מתסכלת אותו במיוחד באמריקה. השיר נכתב במהלך גירושיו ב-1980 מאשתו הראשונה אנדריאה ברטורלי. הוא הודה: "כתבתי את המילים באופן ספונטני. אני לא בטוח על מה השיר, אבל יש בו הרבה כעס, יאוש ותסכול".`,
  },
  q429: {
    verified: true,
    explanation_he: `ה-YMCA במערב מנהטן היה ידוע ב-1970s כמקום מפגש פופולרי בקהילה הגאה ("cruising and hookup spot"). פרודיוסר Village People, ז'אק מוראלי, היה גאה והמטרה הראשונית של הלהקה הייתה "למשוך את הקהל הגאה של הדיסקו דרך פנטזיה גאה פופולרית". כותב המילים ויקטור ויליס מצדו טוען שהמילים הן רק "סלנג שחור של 70s" ושצריך "להוציא את הראש מהביוב". בכל מקרה, ההקשר התרבותי של ה-YMCA כמקום גאה אז הוא מתועד היטב — וכיום הוא מנוגן בטקסי בר-מצווה ובחתונות בלי לדעת את ההיסטוריה.`,
    sources: [
      wiki('Y.M.C.A._(song)', 'Y.M.C.A. (song)'),
      sf('village-people/ymca', 'Y.M.C.A. by Village People'),
    ],
    extendedInfo_he: `השיר יצא ב-1978 והגיע למקום 2 בבילבורד הוט 100 (חסם במקום 1 הוא "Le Freak" של Chic). הריקוד הקלאסי עם ההברות Y-M-C-A פופולארי בכל מסיבה. ב-2020 הוקצה השיר לארוועזרייה האמריקאית של דונלד טראמפ — מה שגרם לויקטור ויליס להוציא אזהרה משפטית.`,
  },
  q430: {
    verified: true,
    explanation_he: `משפחת מרווין גיי תבעה את רובין ת'יק ופארל ויליאמס בטענה שהם העתיקו את ה"תחושה" וה"סאונד" של השיר "Got to Give It Up" של גיי. במרץ 2015 חבר המושבעים פסק להם 7.4 מיליון דולר — אך ביולי 2015 השופט הוריד את הסכום ל-5.3 מיליון דולר. בית המשפט הפדרלי לערעורים אישר את הפסיקה ב-דצמבר 2018. זה היה תקדים מהפכני — הראשון שבו "אווירה מוזיקלית" (ולא העתקה ישירה של מנגינה) הוכרה כהפרת זכויות יוצרים.`,
    sources: [
      wiki('Blurred_Lines', 'Blurred Lines'),
      sf('robin-thicke/blurred-lines', 'Blurred Lines by Robin Thicke'),
    ],
    extendedInfo_he: `מרווין גיי קיבל קרדיט פוסט-מורטם כשותף לכתיבת השיר. הפסק הזה גרם לחששות נרחבים בתעשיית המוזיקה — מאז יוצרים נזהרים יותר מ"דמיון בתחושה" אחרי שהוא הופך פתאום לסכנה משפטית. ת'יק ופארל הכחישו לאורך כל הדרך שהם העתיקו, אבל הקלטות מאחורי הקלעים בהן ת'יק מודה ש"רציתי להפוך אותו ל-Marvin Gaye" עזרו לתביעה.`,
  },
  q431: {
    verified: true,
    explanation_he: `ג'ון בון ג'ובי לא אהב את ההקלטה הראשונית של השיר וכמעט זנח אותו. ריצ'י סמבורה (גיטרה ראשית) שכנע אותו לתת הזדמנות נוספת — והם עיבדו אותו מחדש (סמבורה הוסיף את ה-talk box המפורסם). השיר הפך לסינגל המוצלח ביותר של הלהקה — עמד 4 שבועות במקום 1 בבילבורד הוט 100 ב-1987 ו-2 שבועות במקום 1 בצ'ארט Mainstream Rock Tracks. האלבום "Slippery When Wet" מכר מעל 28 מיליון עותקים.`,
    sources: [
      wiki(`Livin%27_on_a_Prayer`, "Livin' on a Prayer"),
      sf('bon-jovi/livin-on-a-prayer', "Livin' on a Prayer by Bon Jovi"),
    ],
    extendedInfo_he: `הסיפור על "ג'וני וגינה" (Tommy and Gina) בשיר הפך לדמות מטאפורית של הזוג העובד שמחפש תקווה. השיר הופיע ב"גלי ההיסטוריה" של 80s ועדיין מנוגן ביציעי ספורט מסביב לעולם. ב-2024 בון ג'ובי הוציא דוקומנטרי על האלבום שמראה את התהליך של "כמעט-זניחת-השיר".`,
  },
  q432: {
    verified: true,
    sources: [
      wiki('Barbie_Girl', 'Barbie Girl'),
      sf('aqua/barbie-girl', 'Barbie Girl by Aqua'),
    ],
    extendedInfo_he: `מאטל תבעה את MCA Records בספטמבר 1997 על הפרת סימן מסחר וזכויות יוצרים. ב-2002 בית המשפט הפדרלי לערעורים בארה"ב פסק שהשיר מוגן כפרודיה — והשופט אלקס קוז'ינסקי סיכם את החלטתו במשפט המפורסם: "The parties are advised to chill". ב-2009 מאטל עצמם השתמשו בגרסה מותאמת של השיר בפרסומת. ב-2023 לסרט Barbie Movie של מאטל הם רכשו רישיון לשיר המקורי, וגם הזמינו את Aqua לכתוב גרסה חדשה שלקחה השראה ממנו.`,
  },
  q433: {
    verified: true,
    sources: [
      wiki('Cotton-Eyed_Joe', 'Cotton-Eyed Joe'),
      sf('rednex/cotton-eye-joe', 'Cotton Eye Joe by Rednex'),
    ],
    extendedInfo_he: `השיר ידוע לפחות מאז לפני מלחמת האזרחים האמריקאית (1861-1865), ושר על ידי עבדים אפרו-אמריקאים בדרום ארה"ב. הפולקלוריסטית דורות'י סקארבורו תיעדה אותה במחקריה כ"שיר ששמעה את העבדים שרים על המטעים". הוא היה פופולרי בקהילות מוזיקה פולקלוריסטית במשך עשרות שנים לפני שלהקת הסקה השוודית Rednex הפכה אותו ב-1994 ללהיט יורודאנס עולמי. השיר נחשב לאחד הסינגלים המצליחים בתולדות מצעדי האירופה.`,
  },
  q434: {
    verified: true,
    sources: [
      wiki(`Mother%27s_Little_Helper`, "Mother's Little Helper"),
      sf('the-rolling-stones/mothers-little-helper', "Mother's Little Helper by The Rolling Stones"),
    ],
    extendedInfo_he: `בשנות ה-60 היו מיליוני מרשמים של ולְיום (דיאזפם) ותרופות הרגעה אחרות לעקרות בית באמריקה ובבריטניה. ההשראה הספציפית הגיעה כשהמנדס קולה דייוויד הסינגר ביקש מאשתו להביא תרופות הרגעה לאולפן — היא הביאה ולְיום, ומיק ג'אגר התרגש מזה והתחיל לכתוב את המילים. השיר היה הראשון בפופ שעסק בהתמכרות תרופתית של מעמד-ביניים. ה-BBC אסר את השיר בעיקר בגלל "הזכרה מפורשת של סמים" — למרות הביקורת שלו על המסחור הרפואי.`,
  },
  q435: {
    verified: true,
    explanation_he: `יש מחלוקת על משמעות "Perfect Day" של לו ריד מ-1972. רבים פירשו אותו כשיר על יום תחת השפעת הרואין (לאור עברו של ריד עם הסם והקשר ל-Velvet Underground). אך ב-2000 ריד עצמו דחה את הפרשנות כ"מצחיקה" ואמר: "החזון של הבחור הזה ליום מושלם הוא הבחורה, סנגריה בפארק, ואז חוזרים הביתה. יום מושלם, פשוט מאוד". ה-BBC השתמש בו ב-1997 כסינגל לטובת קמפיין Children in Need, ואיסף 2.1 מיליון פאונד.`,
    sources: [
      wiki('Perfect_Day_(Lou_Reed_song)', 'Perfect Day (Lou Reed song)'),
      sf('lou-reed/perfect-day', 'Perfect Day by Lou Reed'),
    ],
    extendedInfo_he: `השיר נכלל בסרט "Trainspotting" (1996) של דני בויל בסצנה איקונית של מנת-יתר — מה שחיזק את הפרשנות של "שיר על הרואין", למרות שריד עצמו לא חתום על זה. הסינגל של ה-BBC ב-1997 כלל הופעות של בואי, אלטון ג'ון, סטיוארט, היאת'ר סמול ועוד עשרות אמנים.`,
  },
  q436: {
    verified: true,
    sources: [
      wiki('Cocaine_(song)', 'Cocaine (song)'),
      sf('eric-clapton/cocaine', 'Cocaine by Eric Clapton'),
    ],
    extendedInfo_he: `השיר נכתב והוקלט ב-1976 על ידי ג'.ג'. קייל. אריק קלפטון כיסה אותו ב-1977. קלפטון אמר: "השיר הזה הוא די בחכמה אנטי-קוקאין... אם תקשיבו טוב, ברור שהוא 'נגד'". בהופעות חיות, קלפטון מוסיף לעיתים שורות כמו "that dirty cocaine" כדי להבהיר את העמדה הביקורתית. ההפקה אכן נעשתה בתקופה שקלפטון נאבק בהתמכרות לקוקאין שלו עצמו. הוא ממעט לנגן את השיר בהופעות בעידן המודרני כדי למנוע אי הבנות.`,
  },
  q437: {
    verified: true,
    sources: [
      wiki(`Gangsta%27s_Paradise`, `Gangsta's Paradise`),
      sf('coolio/gangstas-paradise', `Gangsta's Paradise by Coolio`),
    ],
    extendedInfo_he: `סטיבי וונדר היה צריך לאשר את השימוש בלחן של "Pastime Paradise" (1976) שלו. הוא דרש ש-Coolio יסיר את כל הקללות מהטקסט לפני שיאפשר את השימוש. Coolio הסכים, ויצר את הגרסה המצונזרת. וונדר קיבל קרדיט שותף לכתיבה ותמלוגים מההצלחה הגדולה. השיר זכה בגראמי ל-Best Rap Solo Performance ב-1996 והפך לסינגל הנמכר ביותר של 1995. (שאלה כפולה ל-q079.)`,
  },
  q438: {
    verified: true,
    sources: [
      wiki('Nights_in_White_Satin', 'Nights in White Satin'),
      sf('moody-blues/nights-in-white-satin', 'Nights in White Satin by The Moody Blues'),
    ],
    extendedInfo_he: `ג'סטין הייווארד כתב את השיר בגיל 19, בסיבוב הופעות בבלגיה, אחרי שחברתו דאז נתנה לו במתנה סדינים מסטין לבן. רבים שומעים בטעות "Knights" (אבירים) במקום "Nights" (לילות) — הבלבול הזה אפילו הוביל לכיסוי בלגי של ג'ורג'ו מורודר ב-1976 בשם "Knights in White Satin" (בכוונה!). השיר יצא לראשונה ב-3 בנובמבר 1967 והפך ללהיט מאוחר ב-1972 כשיצא מחדש ב-FM רדיו אמריקאי.`,
  },
  q439: {
    verified: true,
    sources: [
      wiki('Time_After_Time_(Cyndi_Lauper_song)', 'Time After Time (Cyndi Lauper song)'),
      sf('cyndi-lauper/time-after-time', 'Time After Time by Cyndi Lauper'),
    ],
    extendedInfo_he: `סינדי לאופר ראתה את השם בעיתון TV Guide לסרט מד"ב מ-1979 בשם "Time After Time" — סרטו של ניקולס מאייר על ה.ג'. וולס שרודף את ג'ק המרטש בזמן. היא רצתה רק להשתמש בשם כשם זמני בכתיבה, אבל התקשרה לשם והרגישה שהשיר "יקרוס בלעדיו". השיר יצא ב-1984 והגיע למקום 1 בבילבורד הוט 100. גרסת הכיסוי של מיילס דייויס ב-1985 הפכה אותו לסטנדרט ג'אז.`,
  },
  q440: {
    verified: true,
    explanation_he: `השיר "Wannabe" של Spice Girls נכתב בסטודיו בלונדון עם המפיקים מאט רו וריצ'רד סטאנארד — והכנת הגרסה הסופית לקחה כ-30 דקות באולפן (אם כי רוב השיר נכתב בעבר ב"התפרצות יצירתית פתאומית" של החברות). הוא עוסק ב"ערך החברות הנשית מעל לקשרים רומנטיים" והפך לסמל של תנועת ה-girl power. השיר הגיע למקום 1 ב-37 מדינות עד סוף 1997 — שיא לאמני בריטיים בקריירת בכורה.`,
    sources: [
      wiki('Wannabe', 'Wannabe'),
      sf('spice-girls/wannabe', 'Wannabe by Spice Girls'),
    ],
    extendedInfo_he: `הביטוי "If you wanna be my lover, you gotta get with my friends" הפך לאחד הציטוטים המוכרים ביותר בפופ של 90s. הקליפ של ג'ורנה רוז ב-Midland Grand Hotel בלונדון צולם בלילה אחד — בלי תיכנון מקדים — והפך לאיקוני. ב-2016 ל-20 שנה לשיר נעשה קליפ מחווה עם קולקטיב ה-Global Goals.`,
  },
  q441: {
    verified: true,
    explanation_he: `בדצמבר 2011 ג'סטין ביבר וסלינה גומס שמעו את "Call Me Maybe" ברדיו בקנדה. הם דיברו על השיר ברשתות החברתיות שלהם, וביבר צייץ: "זה אולי השיר הכי קליט ששמעתי אי פעם". זה לבדו הביא לקרלי ריי ג'פסן הצלחה בינלאומית. בפברואר 2012, ביבר, גומס, אשלי טיסדייל וביג טיים ראש העלו לסטם פארודיה משותף שצבר 75 מיליון צפיות עד 2019. הוא לא היה סרטון יחיד של ביבר רוקד — אלא וידאו פארודיה קבוצתי.`,
    sources: [
      wiki('Call_Me_Maybe', 'Call Me Maybe'),
      sf('carly-rae-jepsen/call-me-maybe', 'Call Me Maybe by Carly Rae Jepsen'),
    ],
    extendedInfo_he: `השיר היה הסינגל השני של ג'פסן בקנדה ויצא במקור בספטמבר 2011. הוא הגיע למקום 1 בבילבורד הוט 100 בארה"ב ל-9 שבועות ב-2012. ג'פסן זכה בגראמי ל-Song of the Year (2013). השיר נכלל ברשימת רולינג סטון של 500 השירים הגדולים בכל הזמנים — הראשון של אמן קנדי באותה רשימה אחרי 2010.`,
  },
  q442: {
    verified: true,
    sources: [
      wiki('Old_Town_Road', 'Old Town Road'),
      sf('lil-nas-x/old-town-road', 'Old Town Road by Lil Nas X'),
    ],
    extendedInfo_he: `Billboard הסירה את השיר מהמצעד הקאנטרי ב-מרץ 2019 בטענה ש"הוא לא משלב מספיק אלמנטים של מוזיקת קאנטרי של היום". הוויכוח התלקח על גזענות נסתרת בז'אנרים — כי Lil Nas X הוא אפרו-אמריקאי. הוא הוציא ב-5 באפריל 2019 רמיקס עם בילי ריי סיירוס שפוצץ את המצעד הכללי. הגרסאות המשולבות של "Old Town Road" עמדו 19 שבועות במקום 1 בבילבורד הוט 100 (13 באפריל - 17 באוגוסט 2019) — שיא בכל הזמנים שעבר את "Despacito" (16 שבועות).`,
  },
  q443: {
    verified: true,
    explanation_he: `סיפור הברק שפגע במטוס במהלך טיסה מאוסטרליה לגרמניה הוא **מיתוס** — אגדה אורבנית שהמשפחה ידעה לטפח. אנגוס יאנג גילה ב-2003 ב-liner notes של ה-re-release את המקור האמיתי: "זה התחיל מטריק קטן שהיה לי בגיטרה. ניגנתי את זה למאל [אחיו] והוא אמר 'אה, יש לי רעיון קצב טוב שיתאים בבק'". הוא בחר בשם "Thunderstruck" כי הם רצו "משהו עוצמתי, כמו Powerage או Highway to Hell" — שיהדהד עם זהות AC/DC.`,
    sources: [
      wiki('Thunderstruck_(song)', 'Thunderstruck (song)'),
      sf('ac-dc/thunderstruck', 'Thunderstruck by AC/DC'),
    ],
    extendedInfo_he: `השיר יצא בספטמבר 1990 מהאלבום "The Razors Edge" והפך לאחד מסמלי הז'אנר. הריף הפותח של הגיטרה הוא אחד מהריפים האיקוניים ביותר בהיסטוריה של הרוק. השיר משמש עד היום כאנתם של קבוצות ספורט בעולם — מ-NBA דרך NFL ועד הליגות האוסטרליות.`,
  },
  q444: {
    verified: true,
    explanation_he: `ג'יימס הטפילד כתב גרסה מקורית של "Enter Sandman" שהזכירה SIDS (תסמונת מוות עריסה) ו"להרוס את המשפחה המושלמת — סוד נורא במשפחה". לארס אולריך והמפיק בוב רוק אמרו לו שהם חושבים שהוא יכול לכתוב מילים טובות יותר. הטפילד שכתב לנושא יותר כללי של סיוטי ילד והשטן ("Sleep with one eye open"). השיר הפך לסינגל הראשון מאלבום "Metallica" (האלבום השחור) ב-1991, והגיע למקום 16 בבילבורד הוט 100.`,
    sources: [
      wiki('Enter_Sandman', 'Enter Sandman'),
      sf('metallica/enter-sandman', 'Enter Sandman by Metallica'),
    ],
    extendedInfo_he: `הקליפ עם הילד שמטופל מסיוטים זכה בפרס Grammy ל-Best Hard Rock Performance ב-1992. השיר הוא ה-Walkout Song של מרינו ריוורה, הפיצ'ר הסגור של ה-Yankees, וה-Walkout של ה-NHL בכל המגרשים. ב-2009 הוא נמכר רישוי לסרט "תינוק" — מה שהפך אותו לאחד מהשירים המכניסים ביותר ברוק העולמי.`,
  },
  q445: {
    verified: true,
    explanation_he: `אקסל רוז וחבר ירדו מאוטובוס בניו יורק ופגשו אדם חסר-בית. הוא אמר להם: "אתה יודע איפה אתה? אתה בג'ונגל בייבי, אתה הולך למות!". השורה הזאת הפכה לתשתית של השיר. אקסל זכר את החוויה והעתיק אותה למילים בסיאטל מאוחר יותר (לא בניו יורק עצמה). השיר עוסק לא רק בניו יורק — הגיטריסט איזי סטרדלין אמר שזה גם "על רחובות הוליווד; אמת לחיים".`,
    sources: [
      wiki('Welcome_to_the_Jungle', 'Welcome to the Jungle'),
      sf('guns-n-roses/welcome-to-the-jungle', "Welcome to the Jungle by Guns N' Roses"),
    ],
    extendedInfo_he: `השיר היה הסינגל הראשון מאלבום הבכורה "Appetite for Destruction" (1987). הוא לא הצליח בתחילה אבל אחרי הפצת הקליפ ב-MTV (גרסה לילית בלבד בגלל אלימות), הוא הפך ללהיט. הוא הגיע למקום 7 בבילבורד הוט 100 ב-1988. השיר נכלל ברשימת 500 השירים הגדולים של רולינג סטון.`,
  },
  q446: {
    verified: true,
    explanation_he: `"Umbrella" נכתב על ידי The-Dream (טריוס נאש), קריסטופר סטיוארט וקוק הראל — תחילה בכוונה לבריטני ספירס. הם שלחו דמו לחברת התקליטים שלה Jive, אבל היא דחתה אותו (וטענה שיש להם מספיק שירים לאלבום שלה). יש שמועות שמריה קארי גם דחתה אותו, אבל זה לא מתועד בויקיפדיה. Def Jam לקחו את השיר לריהאנה, שהפכה אותו ללהיט עולמי בקיץ 2007 — עמד 10 שבועות במקום 1 בצ'ארט הבריטי. זה היה השיר שהפך אותה לכוכבת-על.`,
    sources: [
      wiki('Umbrella_(Rihanna_song)', 'Umbrella (Rihanna song)'),
      sf('rihanna/umbrella', 'Umbrella by Rihanna'),
    ],
    extendedInfo_he: `הביטוי "ella, ella, ella" הפך לאחד מההוקים הקליטים ביותר בפופ. The-Dream סיפר שהמילה "umbrella" "פשוט קפצה לראש שלו" כשהביט נבנה. השיר זכה בגראמי לBest Rap/Sung Collaboration ב-2008. ב-2017 השיר הופיע בסרט "It" כשהילדה ז'ורז'י מנסה לתפוס סירת נייר בגשם — שילוב שהפך אותו לוויראלי מחדש.`,
  },
  q447: {
    verified: true,
    explanation_he: `החלק ה"ליריק" של "Hips Don't Lie" של שאקירה מדגים קו טרומפט סלסה משירו של חרי ריברה הפורטוריקני "Amores Como el Nuestro" משנת **1992** (לא 1998 כפי שלעיתים מצוטט בטעות), שנכתב על ידי עומאר אלפאנו. שאקירה ו-Wyclef Jean שילבו את הדגימה ב-2006 ויצרו את השיר שעמד 10 שבועות במקום 1 בבילבורד הוט 100 — וההיט הראשון של זמרת קולומביאנית שעשה זאת. השיר היה הסינגל הכי מצליח של 2006.`,
    sources: [
      wiki(`Hips_Don%27t_Lie`, "Hips Don't Lie"),
      sf('shakira/hips-dont-lie', "Hips Don't Lie by Shakira"),
    ],
    extendedInfo_he: `שאקירה הוסיפה את ה"קולומביאנית" שלה — שילוב בין מקצב סלסה לעיבוד עכשווי של היפ-הופ. הקליפ של סופי מולר עם שאקירה רוקדת בקרנבל ברצלונה הפך לאיקוני. השיר זכה ב-Latin Grammy ובפרס Billboard. הופעת המונדיאל של גרמניה 2006, שבה שאקירה ביצעה את השיר חי, נחשבת לאחת ההופעות הזכורות ביותר בתחרות.`,
  },
  q448: {
    verified: true,
    explanation_he: `אדל כתבה את "Rolling in the Deep" יום אחרי הפרידה מחבר. ההשראה: בן הזוג אמר לה שחייה "ייהיו משעממים, בודדים ונוראיים" אם תעזוב, ושהיא "אדם חלש" אם לא תישאר ביחסים. היא ירדה לאולפן עם פול אפוורת' וכתבה את השיר באחר צהריים אחד, מלא כעס והוכחה עצמית. השיר זכה ב-3 פרסי גראמי (Record of the Year, Song of the Year, Best Short Form Music Video) ב-2012 — אדל זכתה בסך הכל ב-6 גראמיים בטקס ההוא, אבל לא 7 כפי שלעיתים מצוטט.`,
    sources: [
      wiki('Rolling_in_the_Deep', 'Rolling in the Deep'),
      sf('adele/rolling-in-the-deep', 'Rolling in the Deep by Adele'),
    ],
    extendedInfo_he: `השיר היה הסינגל הראשון מאלבום "21" (2011), והפך לסינגל הראשון של אמנית בריטית שעמד במקום 1 בבילבורד הוט 100 שבעה שבועות. הוא נחשב לסינגל הנמכר ביותר של 2011 בארה"ב — מעל 5 מיליון עותקים. הוא נכלל ברשימת 500 השירים הגדולים של רולינג סטון. ביצוע ההוקרה של אדל בטקס הגראמי 2012, חזרתה הראשונה לבמה אחרי ניתוח גרון, נחשב לאחד הרגעים הקלאסיים בהיסטוריית הטקס.`,
  },
  q449: {
    verified: true,
    explanation_he: `"Someone Like You" של אדל ידוע ביכולתו לגרום למאזינים לבכות. הסבר מדעי לכך פורסם ב-Wall Street Journal (2012, "Anatomy of a Tear-Jerker") — הוא משלב שני מנגנונים: השיר משתמש ב"appoggiatura" (תווי קישוט שמתנגדים לאקורד) כדי ליצור מתח רגשי שמרגיע כשהמלודיה חוזרת לתו הצפוי. בנוסף, מחקרים של נוירולוג רוברט זאטור ב-McGill מראים שמוזיקה אינטנסיבית כזו מעוררת שחרור דופמין במוח. הצירוף — מתח, פתרון, ודופמין — מסביר את הדמעות.`,
    sources: [
      wiki('Someone_Like_You_(Adele_song)', 'Someone Like You (Adele song)'),
      {
        url: 'https://www.wsj.com/articles/SB10001424052970203646004577213010291701378',
        title: 'Anatomy of a Tear-Jerker — Wall Street Journal',
        type: 'article',
        accessed: TODAY,
      },
    ],
    extendedInfo_he: `המחקר על appoggiatura בוצע על ידי הפסיכולוג הבריטי ג'ון סלובודה — שמצא ש-18 מתוך 20 הקטעים המוזיקליים שמעוררים תגובה רגשית מכילים את התופעה. אדל הצליחה לבנות את האפקט המדויק הזה אינטואיטיבית, בלי שתדע את המדע מאחוריו. השיר הגיע למקום 1 בבילבורד הוט 100 ל-5 שבועות ב-2011-2012 וזכה בגראמי ל-Best Pop Solo Performance ב-2012.`,
  },
};

const raw = readFileSync(QUESTIONS_PATH, 'utf8');
const questions = JSON.parse(raw);

let touched = 0;
const changes = [];
for (const q of questions) {
  const audit = audits[q.id];
  if (!audit) continue;
  q.sources = audit.sources;
  q.verified = audit.verified;
  if (audit.extendedInfo_he) q.extendedInfo_he = audit.extendedInfo_he;
  if (audit.explanation_he && audit.explanation_he !== q.explanation_he) {
    changes.push(`[${q.id}] explanation_he revised`);
    q.explanation_he = audit.explanation_he;
  }
  if (audit.question_he && audit.question_he !== q.question_he) {
    changes.push(`[${q.id}] question_he revised`);
    q.question_he = audit.question_he;
  }
  touched++;
}

writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2) + '\n');
console.log(`Updated ${touched} questions.`);
if (changes.length) {
  console.log('\nContent changes:');
  changes.forEach((n) => console.log('  ' + n));
}
