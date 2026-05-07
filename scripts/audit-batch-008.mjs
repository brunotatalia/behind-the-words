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
  q332: {
    verified: true,
    sources: [
      wiki('Warda_Al-Jazairia', 'Warda Al-Jazairia'),
      wiki('Batwanes_Beek', 'Batwanes Beek'),
    ],
    extendedInfo_he: `וורדה הייתה נשואה למלחין המצרי בלאל חמדי בין השנים שאחרי 1972 ועד 1990 — מה שיכול להסביר את הבלבול הנפוץ לגביו ככותב השיר. בלאל חמדי כן הלחין שירים אחרים שלה, אבל לא את "בטוואנס ביק" — את זה הלחין סלאח א-שרנובי, והמילים נכתבו על ידי עומאר בטיישה. השיר נחשב לאחד הביצועים הקלאסיים של ז'אנר הטרב הערבי המודרני.`,
  },
  q369: {
    verified: true,
    explanation_he: `"יום האביב" של BTS מ-2017 נקשר על ידי מעריצים ועיתונאים לאסון מעבורת הסוול ב-2014, שבו טבעו 304 אנשים, רובם תלמידי תיכון. הקליפ כולל ערימת בגדים ונעליים שדומות לאנדרטה לקורבנות. אבל RM, הסולן של BTS, סירב לאשר את הקשר בצורה רשמית — הוא אמר שהקליפ "מתמקד בייצוג ויזואלי של מילות השיר ואפשר לפרש אותו בדרכים רבות". הוא חשב על "חברי תיכון שאיבד איתם קשר" כשכתב.`,
    sources: [
      wiki('Spring_Day_(BTS_song)', 'Spring Day (BTS song)'),
      sf('bts/spring-day', 'Spring Day by BTS'),
    ],
    extendedInfo_he: `השיר יצא בפברואר 2017 — כמעט 3 שנים אחרי הטרגדיה של אפריל 2014. הוא נחשב לאחד השירים העצובים ויפים של BTS. החיבור הסמוי לאסון הסוול הפך אותו לסמל של זיכרון בקוריאה הדרומית — אך כל הקריאה הזו היא של מעריצים ולא הצהרה רשמית מהלהקה.`,
  },
  q380: {
    verified: true,
    sources: [
      wiki('Never_on_Sunday', 'Never on Sunday'),
      wiki('Manos_Hadjidakis', 'Manos Hadjidakis'),
    ],
    extendedInfo_he: `מנוס חאטזידאקיס זכה באוסקר לשיר המקורי הטוב ביותר ב-1961, אבל סירב להגיע לטקס ולקחת את הפרס. הוא אמר שהסרט "לא ביום ראשון" — שמתאר זונה כדמות הראשית — "משקף לרעה על אתונה". מלינה מרקורי, שגילמה את הזונה איליה בסרט, הפכה את השיר לסמל יווני בעולם. ז'יל דאסין ביים את הסרט שהיה גם הוא מועמד ל-5 פרסי אוסקר.`,
  },
  q389: {
    verified: true,
    explanation_he: `דמיס רוסוס נולד ב-15 ביוני 1946 באלכסנדריה, מצרים, לקהילה היוונית המקומית. משפחתו איבדה את רכושה במהלך משבר סואץ ב-1956 ועברה ליוון. ב-1968 הוא הצטרף ללהקת Aphrodite's Child עם ונגליס פאפאתאנאסיו (ונגליס המוכר). אחרי פירוק הלהקה ב-1971 פיתח קריירת סולו עולמית מצליחה — "Forever and Ever" הגיע למקום 1 במספר מדינות ב-1973. סגנון הלבוש המיוחד שלו (גלימות זורמות וזקן) והקול הגבוה שלו הפכו אותו לאייקון תרבותי באירופה.`,
    sources: [
      wiki('Demis_Roussos', 'Demis Roussos'),
      sf('demis-roussos/forever-and-ever', 'Demis Roussos — Songfacts'),
    ],
    extendedInfo_he: `רוסוס היה אחד מהזמרים הראשונים ממוצא יווני שזכה להצלחה במצעדי אנגליה ובכל אירופה. ב-1985 הוא היה בין הנוסעים שנחטפו על ידי חמושים שיעיים בטיסת TWA 847 — חוויה שעיצבה אותו לשארית חייו. הוא נפטר ב-25 בינואר 2015 בגיל 68 באתונה.`,
  },
  q391: {
    verified: true,
    sources: [
      wiki('Du_Hast', 'Du Hast'),
      sf('rammstein/du-hast', 'Du Hast by Rammstein'),
    ],
    extendedInfo_he: `המילים מצטטות את נוסח שבועות הנישואין הגרמני: "האם אתה רוצה לקחת אותה לאשתך, לאהוב ולכבד עד שהמוות יפריד בינכם?" — והתשובה בשיר היא "לא". משחק המילים: בעוד שהפזמון נשמע כ-"Du hasst" (אתה שונא), הוא בעצם "Du hast" (יש לך / אתה מחזיק) — כשהבית הראשון אומר "Du hast mich" (יש לך אותי) ובית השני מתפתח לשבועה עם מבנה זהה. עד היום נחשב לאחד הסינגלים הגרמניים המצליחים ביותר אי פעם — מעל מיליארד צפיות בקליפ של פילטר.`,
  },
  q392: {
    verified: true,
    sources: [
      wiki('Rock_Me_Amadeus', 'Rock Me Amadeus'),
      sf('falco/rock-me-amadeus', 'Rock Me Amadeus by Falco'),
    ],
    extendedInfo_he: `פלקו (יוהאן הולצל, 1957-1998) הציג את מוצרט כ"רוק סטאר של המאה ה-18" — קונספט שהיה מהפכני בזמנו. השיר עמד 3 שבועות במקום 1 בבילבורד הוט 100 ב-1986 — ועד היום הוא היחיד בגרמנית שעשה זאת (אם כי שיר ספרדי הגיע למקום 1 ב-1987 ושיר קוריאני הגיע ב-2020). פלקו נהרג בתאונת דרכים ב-6 בפברואר 1998 ברפובליקה הדומיניקנית בגיל 40, בנסיבות שעוררו ספקולציות לאור התמודדותו עם דיכאון.`,
  },
  q394: {
    verified: true,
    explanation_he: `"מאס קה נאדה" של ז'ורז'י בן (Jorge Ben) מ-1963 משלב פורטוגזית ברזילאית עם השפעות אפריקאיות. הביטוי "Mas que nada" הוא סלנג סרקסטי בריו דה ז'ניירו — תרגום קרוב הוא "תפסיק כבר!" או "אל תגזים!". מילות הפתיחה "Oariá raiô. Obá Obá Obá" הן השבעה אומבנדה — דת ברזילאית שמשלבת את הקנדומבלה האפריקאית עם הקתוליות. הן מזמנות את האלה אובא, אלת לוחמת ששולטת על נהרות ושיטפונות. השיר משלב את שורשי ברזיל האפריקאיים עם הסמבה.`,
    sources: [
      wiki('Mas_que_Nada', 'Mas que Nada'),
      {
        url: 'https://thebestofbrazil.info/specialfeatures3.html',
        title: 'Mas que Nada — Story behind the song — The Best of Brazil',
        type: 'article',
        accessed: TODAY,
      },
    ],
    extendedInfo_he: `הביטוי "Preto Velho" (זקן שחור) בשיר הוא ארכטיפ של רוח אומבנדית — מסמל חוכמה, סבלנות והיסטוריית העבדים האפריקאים בברזיל. השיר היה הצלחה גדולה ב-1963 ונכלל גם בגרסה של Sergio Mendes & Brasil '66 שהפכה ללהיט עולמי. ב-2006 בלאק אייד פיז עיבדו אותו עם בן ובנדס בלהיט "Mas Que Nada" שהגיע למקום 1 בבריטניה.`,
  },
  q398: {
    verified: true,
    explanation_he: `"דרגוסטאה דין טיי" (אהבה מעץ הלינדן) של O-Zone — להקה מולדובית (לא רומנית) שעברה לרומניה ב-2002 — הפך למם האינטרנט המפורסם "נומה נומה". המם נוצר ב-6 בדצמבר 2004 כשגארי ברולסמה, בלוגר אמריקאי חובב, פרסם סרטון של עצמו עושה ליפ-סינק. הוא הפך לאחד מממי האינטרנט הראשונים בהיסטוריה — מעל 700 מיליון צפיות עד 2006. השיר עצמו יצא ביוני 2003 וזכה להצלחה ענקית באירופה הרבה לפני המם.`,
    sources: [
      wiki('Dragostea_Din_Tei', 'Dragostea Din Tei'),
      sf('o-zone/dragostea-din-tei', 'Dragostea Din Tei by O-Zone'),
    ],
    extendedInfo_he: `O-Zone הוקמה ב-1999 בקישינב, מולדובה, על ידי דן באלאן. הם עברו לבוקרשט, רומניה ב-2002. השיר היה רב-מכר בכל אירופה — מקום 1 בכל המדינות הגדולות. ברולסמה מעולם לא צפה לוויראליות — הוא העלה את הסרטון לאתר Newgrounds והוא התפשט מעצמו. השיר תורגם ל-14 שפות וכוסה על ידי עשרות אמנים.`,
  },
  q399: {
    verified: true,
    sources: [
      wiki('Tunak_Tunak_Tun', 'Tunak Tunak Tun'),
      sf('daler-mehndi/tunak-tunak-tun', 'Tunak Tunak Tun by Daler Mehndi'),
    ],
    extendedInfo_he: `דאלר מהנדי, זמר באהנגרא הודי, ספג ביקורת שהשירים שלו מצליחים בגלל "ריבוי הדוגמניות הרוקדות בקליפים". כתגובה הוא יצר ב-1998 קליפ עם 4 עותקים דיגיטליים של עצמו בלבד, באמצעות טכנולוגיית בלוסקרין — הראשון בהודו. כל אחד מהארבעה ייצג יסוד קלאסי שונה (אש, מים, אדמה, אוויר). השיר אכן הגיע למקום 1 בהודו והוכיח את הטענה. ב-2007 הוא הפך לאחד מהסרטונים ההודיים הראשונים שנעשו ויראליים באינטרנט המערבי.`,
  },
  q400: {
    verified: true,
    sources: [
      wiki('Hey_Jude', 'Hey Jude'),
      sf('the-beatles/hey-jude', 'Hey Jude by The Beatles'),
    ],
    extendedInfo_he: `מקרטני התחיל את השיר עם הרעיון "Hey Jules" — שמו של ג'וליאן לנון בן ה-5. הוא ביקר אותו וסינתיה (אמו) ביוני 1968 כשהוריו היו בעיצומה של הפרידה. את ה-"Jules" הוא שינה ל-"Jude" כי הוא חשב שזה "נשמע קצת יותר טוב". ג'וליאן גילה את האמת רק בערך 20 שנה אחר כך, סביב 1988. ב-1996 הוא רכש את הערות ההקלטה המקוריות במכירה פומבית ב-25,000 פאונד.`,
  },
  q401: {
    verified: true,
    sources: [
      wiki('Tiny_Dancer', 'Tiny Dancer'),
      sf('elton-john/tiny-dancer', 'Tiny Dancer by Elton John'),
    ],
    extendedInfo_he: `ברני טאופין אישר ב-1973 ב-Rolling Stone שהשיר על אשתו דאז מקסין פייבלמן. היא עצמה אישרה ב-2019: "ידעתי שהשיר עליי. הייתי במחול בלט קלאסי מילדה, ותפרתי טלאים על ה-ג'קטים והג'ינסים של אלטון". טאופין כתב את השיר בנסיעתו הראשונה לקליפורניה ב-1970, כשניסה להשוות את הנשים האמריקאיות לאלה שהכיר באנגליה. השיר הופיע באלבום "Madman Across the Water" מ-1971.`,
  },
  q402: {
    verified: true,
    explanation_he: `דולי הודתה שהשיר מבוסס על "אמת חלקית" — פקידה ג'ינג'ית בבנק שלה שפלירטטה בבוטות עם בעלה קרל דין זמן קצר אחרי חתונתם. השם "ג'ולין" עצמו הגיע מפגישה עם מעריצה בת 10 (לא 8 כפי שלעיתים מצוטט) — דולי שמה לב לשיער האדום היפה שלה ושאלה לשמה. השיר משלב את שני המקורות — שמה של הצעירה והנרטיב הרגשי של חוסר הביטחון בנישואין. השיר הגיע למקום 1 ב-Hot Country ב-1974.`,
    sources: [
      wiki('Jolene', 'Jolene'),
      sf('dolly-parton/jolene', 'Jolene by Dolly Parton'),
    ],
    extendedInfo_he: `השיר הוקלט ב-1973 ויצא ב-1974. בכיסוי המפורסם של ביונסה ב-2024 הוצא הקטע על "מתחננת אליה" כי "ביונסה לא מתחננת לאף אחד". כיסויים אחרים נעשו על ידי ה-וייט סטרייפס, וויטני יוסטון ועוד עשרות אמנים. בית-הספר Bluegrass לקח כ-2.5 דקות בלבד לכתוב את כל השיר.`,
  },
  q403: {
    verified: true,
    sources: [
      wiki('Smooth_Criminal', 'Smooth Criminal'),
      sf('michael-jackson/smooth-criminal', 'Smooth Criminal by Michael Jackson'),
    ],
    extendedInfo_he: `הפזמון "Annie, are you OK?" הוקדם מבובת ה-CPR "Resusci Anne" של חברת Laerdal — מתאמני החייאה שואלים את הבובה את השאלה הזו לפני שמתחילים. הסיפור על מייקל ג'קסון ששמע את זה בקורס החייאה הוא בחזקת מסורת פופולרית. הקליפ של מארטין סקורסזה (במאי הסרט "Moonwalker") עם הריקוד "Anti-Gravity Lean" — שבו ג'קסון נשען ב-45 מעלות — מצריך נעליים מיוחדות עם רגל מגנטית שהוא רשם בפטנט.`,
  },
  q404: {
    verified: true,
    explanation_he: `"מר ג'ונס" הוא מרטי ג'ונס, חבר טוב של אדם דוריץ והבסיסט של להקה אחרת בשם The Himalayans. הסיפור: דוריץ ומרטי הלכו יחד לבר בסן פרנסיסקו לראות את אביו של מרטי — דייוויד סרבה, גיטריסט פלמנקו ספרדי — מנגן עם הלהקה הוותיקה שלו. אחרי ההופעה, השניים שתו ובהו בקני דייל ג'ונסון (המתופף של כריס אייזק) שישב עם שלוש נשים — וחלמו על איך זה להיות כוכבי רוק כאלה. דוריץ הבהיר אחר כך: "כתבתי שיר על עצמי, פשוט הייתי איתו באותו לילה".`,
    sources: [
      wiki('Mr._Jones_(Counting_Crows_song)', 'Mr. Jones (Counting Crows song)'),
      sf('counting-crows/mr-jones', 'Mr. Jones by Counting Crows'),
    ],
    extendedInfo_he: `השיר יצא ב-1993 באלבום הבכורה "August and Everything After" והפך ללהיט הגדול הראשון של הלהקה. הוא מסוקס מצורפק את החלום של אדם פשוט לכוכבות רוק. אדם דוריץ הוא הסולן עם השיער המיוחד שעדיין הופיע איתו 30 שנה אחר כך. השיר נכלל ברשימות של 500 השירים הטובים בכל הזמנים.`,
  },
  q405: {
    verified: true,
    sources: [
      wiki('Maggie_May_(song)', 'Maggie May (song)'),
      sf('rod-stewart/maggie-may', 'Maggie May by Rod Stewart'),
    ],
    extendedInfo_he: `סטיוארט סיפר: "מגי מיי הייתה סיפור אמיתי, על האישה הראשונה שעשיתי איתה סקס, בפסטיבל הג'אז של Beaulieu ב-1961" — אז הוא היה בן 16. "מגי מיי" עצמו לא היה שמה — סטיוארט שאל את השם משיר עם ליברפולי עתיק על זונה בשם "מגי מיי". השיר יצא ב-1971 כצד B, אבל DJים הפכו אותו ל-A — והוא הגיע למקום 1 ב-UK ובארה"ב באותה שבוע (Maggie May ו-Reason to Believe). ניגן אצלו דייב הריס בגיטרה ראשית.`,
  },
  q406: {
    verified: true,
    sources: [
      wiki('Take_On_Me', 'Take On Me'),
      sf('a-ha/take-on-me', 'Take On Me by a-ha'),
    ],
    extendedInfo_he: `השיר הוקלט בשתי גרסאות מרכזיות: הראשונה ב-1984 עם המפיק טוני מנספילד (כשלון), והשנייה עם אלן טארני ב-1985 (להיט). הקליפ של סטיב ברון עם טכניקת ה-rotoscoping (שיתוף בין צילום חי וציורי דיו) לקח 16 שבועות להפיק. הוא זכה ב-6 פרסי MTV ב-1986: New Artist, Concept Video, Most Experimental Video, Direction, Special Effects, Viewer's Choice. הקליפ נחשב לאחד מהקליפים האיקוניים בתולדות MTV.`,
  },
  q407: {
    verified: true,
    sources: [
      wiki(`Don%27t_Stop_Believin%27`, "Don't Stop Believin'"),
      sf('journey/dont-stop-believin', "Don't Stop Believin' by Journey"),
    ],
    extendedInfo_he: `סטיב פרי הסביר: "ניסיתי 'דרום דטרויט', ניסיתי 'מזרח' ו-'מערב' וזה לא שר. אבל 'דרום דטרויט' נשמע כל כך יפה. אהבתי את הצליל — רק אחר כך גיליתי שזו ממש קנדה". גיאוגרפית, דרומית לדטרויט נמצאת העיר וינדזור, אונטריו, בקנדה — דטרויט שוכנת על הגדה הצפונית של נהר דטרויט. השיר יצא ב-1981 והפך לאחד הסינגלים הדיגיטליים הנמכרים בכל הזמנים בפיגור — הוא חזר לחיים אחרי הפרק האחרון של "הסופרנוס" ב-2007.`,
  },
  q408: {
    verified: true,
    explanation_he: `אף אחד מחברי טוטו לא ביקר באפריקה לפני כתיבת השיר. דיוויד פייץ' אמר שכתב את "אפריקה" אחרי שצפה ב"דוקומנטרי בלילה מאוחר" שתיאר "צרה וסבל אפריקאי". הוא גם שאב השראה מתיאורי נופים במגזין National Geographic ומסיפורים ממוריו בבית הספר הקתולי שלו ש"עשו עבודה מיסיונרית באפריקה". השורה המפורסמת "I bless the rains down in Africa" מבוססת על דימויים מתוקשרים, לא על חוויה אישית.`,
    sources: [
      wiki('Africa_(Toto_song)', 'Africa (Toto song)'),
      sf('toto/africa', 'Africa by Toto'),
    ],
    extendedInfo_he: `השיר יצא ב-1982 מהאלבום Toto IV. הוא הגיע למקום 1 בבילבורד הוט 100 ב-1983. בעידן הסטרימינג זכה לתחייה ב-2017 והפך לאחד השירים המושמעים ביותר של שנות ה-80. ב-2019 התקנה הוצבה בנמיביה — מערכת לוואים מסוקרת שנגנת אותו אינסוף בלולאה במדבר.`,
  },
  q410: {
    verified: true,
    sources: [
      wiki('Sweet_Caroline', 'Sweet Caroline'),
      sf('neil-diamond/sweet-caroline', 'Sweet Caroline by Neil Diamond'),
    ],
    extendedInfo_he: `דיימונד הודה ב-2007 שהשראה הגיעה מתצלום של קרוליין קנדי — בת הנשיא ג'ון פ' קנדי — שראה במגזין כשהייתה בערך בת 11. הוא שר את השיר בפרטיות במסיבת יום הולדת 50 שלה ב-2007. אבל ב-2014 דיימונד שינה את גרסתו ואמר שהשיר היה למעשה על אשתו דאז, אבל היה צריך שם בעל 3 הברות שיתאים למלודיה. השיר הפך להמנון של בייסבול בוסטון רד סוקס ב-2002.`,
  },
  q411: {
    verified: true,
    sources: [
      wiki(`Stayin%27_Alive`, "Stayin' Alive"),
      sf('bee-gees/stayin-alive', "Stayin' Alive by Bee Gees"),
    ],
    extendedInfo_he: `הקצב של השיר — בערך 103 פעימות לדקה (BPM) — נופל בטווח המומלץ על ידי איגוד הלב האמריקאי לעיסוי לב בהחייאה (100-120 פעימות לדקה). מחקרים הראו ש-CPR בתזמון לקצב של "Stayin' Alive" משפר את שמירת הזיכרון של הטכניקה. ב-2008 איגוד הלב פתח קמפיין עם הסרטון של קן ג'ונג בחליפת "סטיין אלייב". המחקרים הראו שגם "Another One Bites the Dust" של קווין עובד טוב — אם כי קצת אירוני ל-CPR.`,
  },
  q412: {
    verified: true,
    sources: [
      wiki('White_Wedding_(Billy_Idol_song)', 'White Wedding (Billy Idol song)'),
      sf('billy-idol/white-wedding', 'White Wedding by Billy Idol'),
    ],
    extendedInfo_he: `מקור הציניות: בילי איידול היה כועס שאחותו הצעירה ג'יין התחתנה כשהיא בהריון — מה שהפך את ה"חתונה הלבנה" (שמלה לבנה כסמל לתומלגות) לצביעות בעיניו. רבים מקשיבים מתעקשים לפרש "little sister" בשיר כסלנג ל"חברה", לא במובנו המילולי — אבל הקשר לאחותו הוא אכן ההשראה. השיר נחשב לאחד הסמלים של עידן הניו ווייב, וגם — באירוניה — אחד השירים הכי מנוגנים בחתונות עד היום.`,
  },
  q413: {
    verified: true,
    sources: [
      wiki('Layla', 'Layla'),
      sf('derek-and-the-dominos/layla', 'Layla by Derek and the Dominos'),
    ],
    extendedInfo_he: `(שאלה כפולה לq063 — אותו שיר עם זווית קצת שונה.) קלפטון התאהב בפאטי בויד באמצע שנות ה-60 כשהיה חבר קרוב של ג'ורג' האריסון. השיר נכתב בעקבות סיפורו של "שכבי ומג'נון" — סיפור פרסי קלאסי על אהבה אסורה — שחבר נתן לקלפטון לקרוא. בסופו של דבר בויד התגרשה מהאריסון ב-1977 ונישאה לקלפטון ב-1979 בהופעה בטוקסון, אריזונה.`,
  },
  q414: {
    verified: true,
    sources: [
      wiki(`You%27re_So_Vain`, "You're So Vain"),
      sf('carly-simon/youre-so-vain', "You're So Vain by Carly Simon"),
    ],
    extendedInfo_he: `סיימון מכרה ב-2003 את הסוד במכירה פומבית למימון מועדון אופרה — דיק אברסול, נשיא NBC Sports, זכה ב-50,000 דולר. תנאי: הוא לא רשאי לחשוף בפומבי, רק לתת רמזים — "השם מכיל את האותיות E, A, ו-R". ב-2015 סיימון אישרה ש-בית 2 הוא על וורן ביטי. בכל ראיון היא אומרת ש"וורן חושב שהכל עליו" — מה שהוא אכן חשב.`,
  },
  q415: {
    verified: true,
    sources: [
      wiki(`Escape_(The_Pi%C3%B1a_Colada_Song)`, 'Escape (The Piña Colada Song)'),
      sf('rupert-holmes/escape-the-pina-colada-song', 'Escape (The Piña Colada Song) by Rupert Holmes'),
    ],
    extendedInfo_he: `רופרט הולמס תיאר את השיר כסיפור על "איך חוסר תקשורת מוביל לבגידה — ושדיאלוג גלוי וכן יכול למנוע שבר לב ושעמום". הסיפור: גבר משועמם מאשתו רואה מודעת היכרויות ומשיב — רק כדי לגלות באירוע שהאישה היא אשתו עצמה. השיר היה הסינגל האחרון של שנות ה-70 שהגיע למקום 1 בבילבורד (29 בדצמבר 1979). הולמס הוא בין השאר תיאטרון מצליח שזכה בטוני.`,
  },
  q416: {
    verified: true,
    explanation_he: `"Behind Blue Eyes" נכתב במקור על ידי פיט טאונסנד עבור פרויקט אופרת הרוק "Lifehouse" שלו, שלעולם לא יצא לפועל. הדובר הוא הנבל "ג'אמבו" שמלא בכעס וייסורים בגלל "כל הלחץ והפיתוי שמקיפים אותו". טאונסנד הסביר: "זה היה שיר שמושר על ידי הנבל של הסיפור — שבמקור היה רואה את עצמו כטוב שאולץ למצב של נבל". רבים מנגנים את השיר בחתונות בלי להבין שזה תפילה של אדם רע.`,
    sources: [
      wiki('Behind_Blue_Eyes', 'Behind Blue Eyes'),
      sf('the-who/behind-blue-eyes', 'Behind Blue Eyes by The Who'),
    ],
    extendedInfo_he: `השיר יצא ב-1971 באלבום "Who's Next" אחרי שלפהאוס פורק. הכריכה האפלה והאקוסטיקה שלו הפכו אותו לקלאסיקה בלתי-נמחקת. גרסת הכיסוי של Limp Bizkit מ-2003 הציגה אותו לדור צעיר, ועוררה ויכוח על נאמנות לחזון המקורי של טאונסנד.`,
  },
  q417: {
    verified: true,
    explanation_he: `דן וילסון, סולן Semisonic, כתב את "Closing Time" כשחברתו דאז דיאן אספאלדון (לימים אשתו) הייתה בהריון מתקדם. הוא לא תכנן את זה — הוא ניסה לכתוב סינגל סגירת קונצרט — ובאמצע הכתיבה הבין שהשיר גם על להיוולד. השורות "אתה לא חייב ללכת הביתה אבל אתה לא יכול להישאר כאן" ו"כל התחלה חדשה מגיעה מסוף של התחלה אחרת" הן אלגוריה למעבר מהרחם לעולם.`,
    sources: [
      wiki('Closing_Time_(Semisonic_song)', 'Closing Time (Semisonic song)'),
      sf('semisonic/closing-time', 'Closing Time by Semisonic'),
    ],
    extendedInfo_he: `המתופף יעקב סליכטר אישר את הקריאה המטאפורית: השיר הוא "על להישלח החוצה מהרחם כאילו על ידי בוחן בר שמפנה את המקום". השיר יצא ב-1998 ונכלל בסטים של מסיבות סיום בכל אמריקה — כשרוב הקהל לא יודע שזה על לידה.`,
  },
  q418: {
    verified: true,
    explanation_he: `Chumbawamba הייתה להקה אנרכו-קומוניסטית שהוקמה ב-בורנלי, אנגליה ב-1982 (חבריה גרו במשותף בלידס). הם פעלו 15 שנים בעולם המוזיקה האינדי לפני ש"Tubthumping" הפך אותם להיט מסחרי ב-1997. השורה "אני נופל אבל קם בחזרה" עוסקת ב"חוסן של אנשים מן השורה — הקשיחות והעקשנות של מעמד הפועלים שממשיך להילחם". הם הקדישו תמלוגים לקבוצות אקטיביזם — דחו 1.5 מיליון דולר מ-Nike, ונתנו את כספי GM ל-Indymedia ו-CorpWatch.`,
    sources: [
      wiki('Tubthumping', 'Tubthumping'),
      wiki('Chumbawamba', 'Chumbawamba'),
    ],
    extendedInfo_he: `Chumbawamba ידועים על הפרעות פוליטיות פומביות — ב-1998 הם שפכו דלי מים על שר הסחר הבריטי דונלד לואיס בטקס ה-Brit Awards. הם המשיכו 15 שנה אחרי "Tubthumping" עם פרויקטים פוליטיים לפני שפורקו ב-2012.`,
  },
  q419: {
    verified: true,
    sources: [
      wiki('The_One_I_Love_(R.E.M._song)', 'The One I Love (R.E.M. song)'),
      sf('rem/the-one-i-love', 'The One I Love by R.E.M.'),
    ],
    extendedInfo_he: `(שאלה כפולה ל-q025 — אותו שיר עם זווית קצת שונה.) מייקל סטייפ אמר על השיר: "הוא ממש אלים ונוראי. חשבתי שזה יותר מדי. ברוטלי מדי". המילים "פרופ פשוט להעסיק את זמני" מתארות שימוש באדם אחר כמטרה רגשית. על המאזינים שמתעקשים לשמוע בו שיר אהבה הוא אמר ב-2016: "אנשים לא הבינו, אז זה בסדר. עכשיו זה שיר אהבה, אז זה בסדר".`,
  },
  q420: {
    verified: true,
    sources: [
      wiki('Baby_Got_Back', 'Baby Got Back'),
      sf('sir-mix-a-lot/baby-got-back', 'Baby Got Back by Sir Mix-a-Lot'),
    ],
    extendedInfo_he: `Sir Mix-a-Lot (אנתוני ריי) הסביר ב-1992: "ראיתי פרסומת של Budweiser שבה רק דוגמניות רזות בסגנון 'ילדה מהעמק', וחשבתי — כל הנשים האפרו-אמריקאיות שאני מכיר נראות אחרת". המסר היה הצדקת טיפוסי גוף שונים. הקליפ נאסר תחילה ב-MTV אבל לאחר מכן הוסר האיסור. השיר הגיע למקום 1 בבילבורד הוט 100 לחמישה שבועות ב-1992 וזכה בגראמי. ב-2014 הוא חזר לתשומת הלב הציבורית כשניקי מינאז' עיבדה אותו ב"Anaconda".`,
  },
  q421: {
    verified: true,
    sources: [
      wiki(`I_Love_Rock_%27n%27_Roll`, "I Love Rock 'n' Roll"),
      sf('joan-jett/i-love-rock-n-roll', "I Love Rock 'n' Roll by Joan Jett"),
    ],
    extendedInfo_he: `השיר נכתב על ידי אלן מריל וג'ייק הוקר עבור The Arrows הבריטית ויצא ביולי 1975 — הגרסה המקורית לא הצליחה מסחרית ונשארה לא ידועה. ב-1976 ג'ואן ג'ט הייתה בסיבוב הופעות אנגלי עם The Runaways וראתה את The Arrows מבצעים את השיר בסדרה האנגלית "Arrows". היא שמרה את השיר בראש שנים. ב-1981 היא הקליטה אותו עם הלהקה החדשה שלה The Blackhearts והוא הפך לסינגל מספר 1 בארה"ב לשבעה שבועות ב-1982.`,
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
