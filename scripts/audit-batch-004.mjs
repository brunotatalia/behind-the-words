#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const TODAY = '2026-05-03';
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
  q046: {
    verified: true,
    explanation_he: `'Firework' של קייטי פרי הוא שיר על מציאת ערך עצמי וניצוץ פנימי. פרי סיפרה שההשראה הגיעה מהרומן 'On the Road' של ג'ק קרואק — בקטע על אנשים ש"בוערים, בוערים, בוערים, כמו זיקוקים צהובים מופלאים שמתפוצצים כעכבישים על פני הכוכבים". המסר הוא קריאה לכל מי שמרגיש לא בולט למצוא בעצמו את האור.`,
    sources: [
      wiki('Firework_(song)', 'Firework (song)'),
      sf('katy-perry/firework', 'Firework by Katy Perry'),
    ],
    extendedInfo_he: `השיר יצא ב-26 באוקטובר 2010 מהאלבום "Teenage Dream" והפך לסינגל מספר 1 השלישי של פרי מהאלבום. פרי הסבירה שזהו "המנון לא-מקלקלי" עם "מסר נפלא" — קריאה לאנשים למצוא את האומץ "להיות הם עצמם". הקליפ זכה ב-MTV VMA לסרטון השנה (2011) וצולם בעיר בודפשט.`,
  },
  q047: {
    verified: true,
    sources: [
      wiki('A_Thousand_Miles', 'A Thousand Miles'),
      sf('vanessa-carlton/a-thousand-miles', 'A Thousand Miles by Vanessa Carlton'),
    ],
    extendedInfo_he: `קרלטון כתבה את השיר על תלמיד מ-Juilliard שהיה לה כלפיו רגשות בזמן שלמדה ב-School of American Ballet. היא אמרה: "מעולם לא דיברתי איתו. הייתי מאוד ביישנית". ההרגשה שלה הייתה שיש לה סיכוי גדול יותר "ליפול למעלה" מאשר ליצור מערכת יחסים — מכאן השורה המפורסמת. השיר הגיע למקום 5 בבילבורד ב-2002.`,
  },
  q048: {
    verified: true,
    sources: [
      wiki('WAP_(song)', 'WAP (song)'),
      sf('cardi-b/wap', 'WAP by Cardi B'),
    ],
    extendedInfo_he: `השיר עורר בהלה מוסרית שדווקא תרמה לפופולריותו — בהופעה בגראמי 2021 ה-FCC קיבלה למעלה מ-1,000 תלונות. פוליטיקאים רפובליקנים גינו: ג'יימס ברדלי אמר שהוא "רוצה לשפוך מי קודש לאוזניים", דיאנה לוריין אמרה שהוא "החזיר את כל המגדר הנשי 100 שנים אחורה". הרבה מבקרים הללו אותו כ"מסר חיובי-מיני" וכ"חגיגה של סוכנות מינית של נשים שחורות". 93 מיליון השמעות בשבוע הראשון, וב-NPR הוכתר "השיר הטוב של 2020".`,
  },
  q049: {
    verified: true,
    explanation_he: `למרות הצליל הפופי המדבק, רבים מפרשים את 'Can't Feel My Face' כשיר על התמכרות לקוקאין — "היא" בשיר היא לא אישה אלא הסם. המשפט "אני לא מרגיש את הפנים שלי כשאני איתה" מתאר את ההרדמה מהסם. בשיר מאוחר יותר, "Reminder", The Weeknd שר במפורש "פנים מאובנים מתוך שקית קוק", מה שמחזק את הפרשנות. רשמית, האמן מתאר את השיר כ"רומן לוהט עם אישה שהוא יודע שהיא לא טובה לו".`,
    sources: [
      wiki('Can%27t_Feel_My_Face', `Can't Feel My Face`),
      sf('the-weeknd/cant-feel-my-face', `Can't Feel My Face by The Weeknd`),
    ],
    extendedInfo_he: `השיר יצא ביוני 2015 מהאלבום "Beauty Behind the Madness" ועלה למקום 1 בבילבורד. הוא הופק על ידי מקס מרטין שמומחה לפופ סקנדינבי, מה שיצר את הסתירה בין הצליל הקליל למשמעות האפלה. כשבלה חדיד, חברתו דאז של The Weeknd, נשאלה אם השיר עליה היא ענתה: "יש הרבה דברים שעוברים לו בראש, אז אני לא יודעת אם זה עליי".`,
  },
  q050: {
    verified: true,
    sources: [
      wiki('Independence_Day_(Martina_McBride_song)', 'Independence Day (Martina McBride song)'),
      sf('martina-mcbride/independence-day', 'Independence Day by Martina McBride'),
    ],
    extendedInfo_he: `הכותבת גרצ'ן פיטרס כתבה את השיר במכוון מנקודת מבט של ילדה בת 8, ואמרה: "ניסיתי למצוא דרך אחרת לצאת מזה" — אך בחרה בסוף הטראגי כי לא הצליחה. השיר נחשב לאבן דרך במודעות לאלימות במשפחה, ופיטרס הביעה אי-נוחות מהשימוש בו לעיתים בהקשרים פטריוטיים — "הוא על הישרדות וחירות מהתעללות, לא על המנון לאומי".`,
  },
  q052: {
    verified: true,
    explanation_he: `'Somebody That I Used to Know' חושף שני צדדים של אותו סיפור פרידה. גוטייה שר ראשון על הכאב והדחייה שחווה, אך כשקימברה מצטרפת בבית השני היא הופכת את המבט — חושפת שהיא הרגישה מנותקת רגשית למרות נוכחותו ("אמרתי לעצמי שאתה הנכון לי, אבל הרגשתי כל כך בודדה איתך"). השיר מראה איך כל צד בפרידה מרגיש שהוא הקורבן, בלי שאחד מהם בהכרח צודק.`,
    sources: [
      wiki('Somebody_That_I_Used_to_Know', 'Somebody That I Used to Know'),
      sf('gotye/somebody-that-i-used-to-know', 'Somebody That I Used to Know by Gotye'),
    ],
    extendedInfo_he: `גוטייה (וולי דה בקר) סיפר שכתב תחילה רק את החלק שלו, אבל הבין ש"לא היה לאן ללכת עם הדמות" וצריך עוד קול. הוסיף את החלק הנשי בסשן השלישי, מה שיצר את האפקט של "כל צד אומר את שלו". השיר עמד 8 שבועות במקום 1 בבילבורד וזכה בגראמי לשיר השנה ולהקלטת השנה (2013).`,
  },
  q053: {
    verified: true,
    sources: [
      wiki('Ms._Jackson', 'Ms. Jackson'),
      sf('outkast/ms-jackson', 'Ms. Jackson by OutKast'),
    ],
    extendedInfo_he: `אנדרה 3000 כיוון את השיר ספציפית לאמא של אריקה בדו (קולין רייט), אם אריקה ואמהּ של בנם סבן. הוא אמר: "כנראה שלעולם לא הייתי בא ואומר לאמא של אריקה 'אני מצטער על מה שקרה'", אז עשה זאת בשיר. אריקה בדו עצמה אמרה שזה "הכאיב לה בהתחלה" אבל העריכה את הכנות. הפתיחה מקדישה את השיר ל"baby's mamas' mamas".`,
  },
  q054: {
    verified: true,
    sources: [
      wiki('Physical_(Olivia_Newton-John_song)', 'Physical (Olivia Newton-John song)'),
      sf('olivia-newton-john/physical', 'Physical by Olivia Newton-John'),
    ],
    extendedInfo_he: `ניוטון-ג'ון עצמה הביעה ספקות לגבי השיר בגלל הרמיזות. שורות כמו "אין יותר מה לדבר אלא אם זה אופקי" ו"תן לי לשמוע את הגוף שלך מדבר" גרמו לתחנות רדיו לאסור את השיר. הקליפ עצמו עם הסצנות של מקלחת ושינוי גוף נחשב לפרובוקטיבי בזמנו. השיר עמד 10 שבועות במקום 1 בבילבורד והפך לאחד הלהיטים הגדולים של 1981.`,
  },
  q055: {
    verified: true,
    sources: [
      wiki('In_Bloom', 'In Bloom'),
      sf('nirvana/in-bloom', 'In Bloom by Nirvana'),
    ],
    extendedInfo_he: `קוביין כתב את השיר במכוון בצורה שתגרום לאותם מעריצים שלא מבינים את המסר לשיר אותו בקול רם — אירוניה כפולה. השורה "אוהב לירות מהרובה שלו" היא דקירה סאטירית במאצ'ואיזם שקוביין תיעב. הוא אמר שהיה מתוסכל מ"אנשים שלוקחים אותנו ברצינות" וביקש שהקליפ יראה את הצד ההומוריסטי שלהם. השיר נכלל באלבום Nevermind (1991), אבל יצא כסינגל רק בנובמבר 1992.`,
  },
  q056: {
    verified: true,
    sources: [
      wiki('Little_Red_Corvette', 'Little Red Corvette'),
      sf('prince/little-red-corvette', 'Little Red Corvette by Prince'),
    ],
    extendedInfo_he: `המכונית האדומה הקטנה היא מטאפורה לאישה ולמפגש מיני. שורות כמו "כיס מלא בסוסים, טרויאנים, חלקם משומשים" רומזות לקונדומים ולמאהבים קודמים — וה"ג'וקיים" הם הגברים שכבר רכבו על "המכונית". פרינס בחר במטאפורות מוסוות בכוונה אחרי שירים יותר גלויים כמו "Head" ו"Dirty Mind" שהפחידו את הרדיו. השיר הוקלט במאי 1982 ושוחרר בפברואר 1983.`,
  },
  q057: {
    verified: true,
    sources: [
      wiki('Hurt_(Nine_Inch_Nails_song)', 'Hurt (Nine Inch Nails song)'),
      sf('nine-inch-nails/hurt', 'Hurt by Nine Inch Nails'),
    ],
    extendedInfo_he: `קאש הקליט את הכיסוי בפברואר 2003 כשהיה בן 71 עם בעיות בריאות חמורות, ונפטר 7 חודשים לאחר מכן (12 בספטמבר 2003). רזנור אמר אחרי שראה את הקליפ: "פשוט איבדתי את החברה שלי, כי השיר הזה כבר לא שלי" — והוסיף שהוא הרגיש "כמו חיבוק חם". הכיסוי של קאש זכה לשבחי ביקורת ולמועמדויות לגראמי, וכיום נחשב לאיקוני יותר מהמקור של NIN.`,
  },
  q058: {
    verified: true,
    question_he: `איזה שיר מפורסם של שנות ה-80 שכולם שרים בשמחה עוסק למעשה בקשר אסור בין מורה לתלמידה?`,
    sources: [
      wiki(`Don%27t_Stand_So_Close_to_Me`, `Don't Stand So Close to Me`),
      sf('the-police/dont-stand-so-close-to-me', `Don't Stand So Close to Me by The Police`),
    ],
    extendedInfo_he: `סטינג עצמו עבד כמורה לפני שהפך למוזיקאי (לתלמידי כיתות ז'-י'), אבל שינה את גרסתו לאורך השנים. ב-1981 רמז על אלמנט אוטוביוגרפי: "עברתי התנסות הוראה ובחורות בנות 15 חיבבו אותי". ב-1993 הוא תיאר אותו אחרת: "היינו פצצות בלונדיניות באותה תקופה... אז הרעיון היה — בואו נכתוב סיפור לוליטה". בסופו של דבר הוא הכחיש שהשיר אוטוביוגרפי. הקישור ל"לוליטה" של נבוקוב מופיע במפורש בשיר ("בדיוק כמו האיש הזקן בספר ההוא של נבוקוב").`,
  },
  q059: {
    verified: true,
    sources: [
      wiki('Alive_(Pearl_Jam_song)', 'Alive (Pearl Jam song)'),
      sf('pearl-jam/alive', 'Alive by Pearl Jam'),
    ],
    extendedInfo_he: `אביו הביולוגי האמיתי של ודר, אדוארד סברסון השלישי, נפטר מטרשת נפוצה ב-1981 לפני שהבן יכול היה ליצור איתו קשר אמיתי — הם נפגשו "שלוש או ארבע פעמים" כמכרים משפחתיים בלי שודר ידע על הקשר. בהופעות, הקהל שינה את משמעות השיר — "הם הסירו את הקללה" כשהם שרו "אני עדיין חי" בחגיגה. השיר יצא ב-7 ביולי 1991, 51 ימים לפני אלבום Ten.`,
  },
  q060: {
    verified: true,
    sources: [
      wiki('This_Is_America_(song)', 'This Is America (song)'),
      sf('childish-gambino/this-is-america', 'This Is America by Childish Gambino'),
    ],
    extendedInfo_he: `הקליפ של היירו מורי משווה את הריקודים השמחים של גלובר לרגעים של אלימות — היורה לאנשים שצומחת מתוך הריקוד הוויראלי. השיר עובר בין שני "עולמות סאונד" — קוראל שמח בעדלידוקסי לפני יריות, ואז טראפ אפל ופועם אחרי. ב-NPR מנגנים: "הסתירות בין נסיון להרוויח כסף, והיותך גבר שחור באמריקה". הקליפ צבר 980 מיליון צפיות עד מרץ 2026.`,
  },
  q061: {
    verified: true,
    explanation_he: `'Rocket Man' מבוסס על סיפור קצר של ריי ברדבורי משנת 1951 (מתוך אסופת "האיש המאויר") על אסטרונאוט שעבודתו כולאת אותו רחוק מבני משפחתו. ברני טאופין שאב את הרעיון בנהיגה ליד בית הוריו, וגם הודה בהשראה משיר קודם של Pearls Before Swine על אותו סיפור — "כל הכותבים הם גנבים גדולים". האסטרונאוט בשיר הוא דמות פשוטה שעובדה הפכה ל"רגילה" — לא גיבור — והוא חי עם הניתוק והכמיהה למשפחה.`,
    sources: [
      wiki('Rocket_Man_(song)', 'Rocket Man (song)'),
      sf('elton-john/rocket-man', 'Rocket Man by Elton John'),
    ],
    extendedInfo_he: `יש פרשנים שראו בשיר מטאפורה לבדידות של כוכבי רוק — "סמל לכך שכוכבי רוק מנותקים מחבריהם, מהמשפחה ומהעולם האמיתי" — אבל זה אינו מה שטאופין הצהיר במפורש. השיר יצא באפריל 1972 מהאלבום "Honky Château" והגיע למקום 2 בבריטניה ולמקום 6 בארה"ב. הוא נחשב לאחד השירים הטובים ביותר של השניים.`,
  },
  q062: {
    verified: true,
    sources: [
      wiki('Royals_(song)', 'Royals (song)'),
      sf('lorde/royals', 'Royals by Lorde'),
    ],
    extendedInfo_he: `לורד (אלה ילי-אוקונור) כתבה את השיר ביולי 2012 בחופשה בית-ספרית בניו זילנד, כשהייתה בת 15-16. ההשראה השלילית הגיעה דווקא מאמני היפ-הופ שהיא הקשיבה להם — A$AP Rocky, דרייק, לאנה דל ריי, ניקי מינאז', קאניה ווסט וג'יי-זי — שהיא ביקרה את "ההתייחסויות שלהם לאלכוהול יקר ולמכוניות שלא ייצגו את המציאות שלי". השיר זכה בגראמי לשיר השנה (2014) — לורד הפכה לאמנית הצעירה ביותר שזכתה בקטגוריה.`,
  },
  q063: {
    verified: true,
    sources: [
      wiki('Layla', 'Layla'),
      sf('derek-and-the-dominos/layla', 'Layla by Derek and the Dominos'),
    ],
    extendedInfo_he: `קלפטון התאהב בפאטי בויד באמצע שנות ה-60 כשהיה חבר קרוב של ג'ורג' האריסון. השיר נכתב בעקבות סיפורו של "שכבי ומג'נון" — סיפור פרסי קלאסי על אהבה אסורה — שחבר נתן לקלפטון לקרוא. בסופו של דבר בויד התגרשה מהאריסון ב-1977 ונישאה לקלפטון ב-1979 בהופעה בטוקסון, אריזונה. האריסון לא היה מריר וכן הגיע למסיבת החתונה. השניים התגרשו ב-1989.`,
  },
  q064: {
    verified: true,
    explanation_he: `למרות שנשמע כשיר מסיבות על שתייה, 'Swimming Pools (Drank)' של קנדריק לאמר הוא בעצם הרהור אישי על אלכוהול ולחץ חברתי. בבית הראשון הוא נזכר בסבא שלו ששתה ובמותו, ובסיבות שהובילו אותו עצמו לשתייה. "בריכות השחייה" הן מטאפורה לכמויות אדירות של אלכוהול — בסמפל אדם שיכור אומר שהוא צריך "בריכת שחייה מלאה במשקה ולקפוץ לתוכה".`,
    sources: [
      wiki('Swimming_Pools_(Drank)', 'Swimming Pools (Drank)'),
      sf('kendrick-lamar/swimming-pools-drank', 'Swimming Pools (Drank) by Kendrick Lamar'),
    ],
    extendedInfo_he: `השיר יצא ב-31 ביולי 2012 כסינגל מהאלבום "good kid, m.A.A.d city" שיצא מאוחר יותר באותה שנה. הוא הגיע למקום 17 בבילבורד והפך לאחד מהשירים המזוהים ביותר של לאמר. ההפקה של T-Minus בנויה כך שהאזנה שטחית מתפרשת כשיר חגיגי, בעוד שהקשבה למילים חושפת שיחה פנימית בין שלוש דמויות בתוך הראש של לאמר על האם להמשיך לשתות.`,
  },
  q065: {
    verified: true,
    sources: [
      wiki('Go_Your_Own_Way', 'Go Your Own Way'),
      sf('fleetwood-mac/go-your-own-way', 'Go Your Own Way by Fleetwood Mac'),
    ],
    extendedInfo_he: `בקינגהאם וניקס היו זוג ב-Fleetwood Mac, ובמקביל לאלבום Rumours גם ק'יסטין וג'ון מק-וי התגרשו ומיק פליטווד היה במשבר נישואים — כל הלהקה הייתה במשבר זוגיות בו-זמנית. ניקס שנאה את השורה "packing up, shacking up's all you wanna do" ואמרה: "כל פעם שהמילים האלה היו מגיעות על הבמה, רציתי לרצוח אותו". האלבום Rumours יצא ב-1977 והפך לאחד מהאלבומים הנמכרים ביותר בכל הזמנים.`,
  },
  q066: {
    verified: true,
    sources: [
      wiki('Dancing_in_the_Dark_(Bruce_Springsteen_song)', 'Dancing in the Dark (Bruce Springsteen song)'),
      sf('bruce-springsteen/dancing-in-the-dark', 'Dancing in the Dark by Bruce Springsteen'),
    ],
    extendedInfo_he: `המפיק ג'ון לנדאו לחץ על ספרינגסטין שהאלבום צריך להיט. ספרינגסטין הגיב סרקסטית: "תראה, כתבתי 70 שירים. אם אתה רוצה עוד אחד, תכתוב אותו". הוא בכל זאת ישב באותו לילה וכתב את השיר. הקליפ המפורסם הוא הופעה חיה בסיינט פול ובו מופיעה לראשונה קורטני קוקס, אז שחקנית בלתי-מוכרת.`,
  },
  q067: {
    verified: true,
    sources: [
      wiki('Total_Eclipse_of_the_Heart', 'Total Eclipse of the Heart'),
      sf('bonnie-tyler/total-eclipse-of-the-heart', 'Total Eclipse of the Heart by Bonnie Tyler'),
    ],
    extendedInfo_he: `סטיינמן הסביר: "הכל על החושך, על כוח החושך ומקום האהבה בחושך... אם מישהו מקשיב למילים, הן ממש כמו שורות ערפדים". המחזמר Nosferatu שעבורו נכתב במקור השיר מעולם לא יצא לדרך. סטיינמן עצמו ביצע את השיר ב-1989 בגרסה משלו, ואחר כך מייט ליאוף הקליט אותו ב-1996. גרסת בוני טיילר זכתה במקום 1 בבילבורד ל-4 שבועות ב-1983.`,
  },
  q068: {
    verified: true,
    sources: [
      wiki('Like_a_Prayer_(song)', 'Like a Prayer (song)'),
      sf('madonna/like-a-prayer', 'Like a Prayer by Madonna'),
    ],
    extendedInfo_he: `הבמאית מרי למברט תיארה את הוויז'ן שלה: "אקסטזה, במיוחד מינית, וכיצד היא קשורה לאקסטזה דתית". פפסי שיחררה פרסומת עם השיר ביום אחד והייתה צריכה לבטל אותה למחרת אחרי הזעקה הציבורית — אבל היא נתנה למדונה לשמור את ה-5 מיליון דולר שלה כדי "להיפטר מהוויכוח". מדונה הגיבה: "אומנות צריכה להיות שנויה במחלוקת, וזהו".`,
  },
  q069: {
    verified: true,
    sources: [
      wiki('Killing_Me_Softly_with_His_Song', 'Killing Me Softly with His Song'),
      sf('roberta-flack/killing-me-softly-with-his-song', 'Killing Me Softly with His Song by Roberta Flack'),
    ],
    extendedInfo_he: `לורי ליברמן ראתה את דון מקלין בנובמבר 1971 במועדון Troubadour בווסט הוליווד, וההשראה הספציפית הגיעה דווקא מהשיר שלו "Empty Chairs" (לא מ-American Pie). היא כתבה הערות על מפית במהלך ההופעה, ואחר כך שיתפה אותן עם נורמן גימבל וצ'רלס פוקס שכתבו את השיר. גרסתה שלה מ-1972 לא הצליחה — רוברטה פלאק שמעה את השיר במטוס וביצעה אותו ב-1973, וזכתה במקום 1 בבילבורד. הפיוג'יס החזירו אותו לשיא ב-1996.`,
  },
  q070: {
    verified: true,
    explanation_he: `'הגשם הסגול' הוא מטאפורה לסוף העולם משולב באהבה ובאמונה. פרינס הסביר: "כשיש דם בשמיים — אדום + כחול = סגול. הגשם הסגול קשור לסוף העולם ולהיות עם זה שאתה אוהב, ולתת לאמונה שלך/אלוהים להוביל אותך דרך הגשם הסגול". בהקשר של הסרט, הוא תפילה רוחנית ובקשת הדרכה — לא ביקורת פוליטית.`,
    sources: [
      wiki('Purple_Rain_(song)', 'Purple Rain (song)'),
      sf('prince/purple-rain', 'Purple Rain by Prince'),
    ],
    extendedInfo_he: `השיר נכתב לסרט בעל אותו השם (1984), שזכה באוסקר על פסקול. כל בית בשיר קשור למערכת יחסים מאתגרת אחרת של דמותו של פרינס בסרט. הקלטת ההופעה החיה שבסופו של דבר נכללה באלבום נעשתה בקלאב First Avenue במיניאפוליס בלילה אחד באוגוסט 1983. השיר הגיע למקום 2 בבילבורד.`,
  },
  q071: {
    verified: true,
    sources: [
      wiki(`Sweet_Child_o%27_Mine`, `Sweet Child o' Mine`),
      sf(`guns-n-roses/sweet-child-o-mine`, `Sweet Child o' Mine by Guns N' Roses`),
    ],
    extendedInfo_he: `אקסל רוז כתב את המילים על חברתו דאז ארין אברלי (בתו של דון אברלי מהדואו האברלי בראדרס). סלאש סיפר שהוא ניגן את הריף ה"קרקסי" כתרגיל "תוך שהוא עושה פרצופים לסטיבן אדלר" המתופף — "תוך שעה תרגיל הגיטרה שלי הפך למשהו אחר". הריף נחשב לאחד הריפים האיקוניים ביותר בהיסטוריה של הרוק. השיר הוקלט ב-1987 והגיע למקום 1 בבילבורד באוגוסט 1988.`,
  },
  q073: {
    verified: true,
    sources: [
      wiki('Running_Up_That_Hill', 'Running Up That Hill'),
      sf('kate-bush/running-up-that-hill', 'Running Up That Hill by Kate Bush'),
    ],
    extendedInfo_he: `EMI חששו שהכותרת המקורית "A Deal with God" תפגע בשידור ברדיו — לכן הוחלף ל"Running Up That Hill (A Deal with God)". בוש הסבירה שהשיר עוסק "באי-יכולת של גברים ונשים להבין זה את זה — דמיינתי שעל ידי 'עסקה עם אלוהים' הם יוכלו להחליף מקומות ולהגיע להבנה גדולה יותר". התחייה ב-Stranger Things 4 (מאי 2022) הביאה את השיר למקום 1 ב-8 מדינות, השני של בוש בבריטניה (44 שנים אחרי הראשון), ולמעל מיליארד השמעות בספוטיפיי עד יוני 2023.`,
  },
  q074: {
    verified: true,
    sources: [
      wiki('Thriller_(song)', 'Thriller (song)'),
      sf('michael-jackson/thriller', 'Thriller by Michael Jackson'),
    ],
    extendedInfo_he: `וינסנט פרייס סיפר ב-Tonight Show של ג'וני קרסון שהוא נדרש לבחור בין אחוזים מהמכירות לבין סכום קבוע של 20,000 דולר — והוא בחר בסכום הקבוע. אחר כך הודה ש"יכולתי להרוויח מיליונים". הקליפ של ג'ון לנדיס (במאי An American Werewolf in London) באורך 14 דקות הפך לעצמו לתופעה תרבותית. רוד טמפרטון, שהיה כותב לחברת Heatwave, הציע במקור את השם "Starlight" — מייקל ג'קסון התעקש על "Thriller".`,
  },
  q075: {
    verified: true,
    sources: [
      wiki('Piano_Man_(song)', 'Piano Man (song)'),
      sf('billy-joel/piano-man', 'Piano Man by Billy Joel'),
    ],
    extendedInfo_he: `בילי ג'ואל ניגן ב-Executive Room ברובע ווילשייר בלוס אנג'לס בין 1972 ל-1973 תחת השם "ביל מרטין" (שמו המלא הוא ויליאם מרטין ג'ואל). הוא היה צריך לעבוד אבל "לא היה יכול להשתמש בשם הרגיל שלו". כל הדמויות בשיר — ג'ון הברמן, פול, דייווי — מבוססות על אנשים אמיתיים מהבר. השיר הוקלט בספטמבר 1973 ויצא כסינגל בפברואר 1974.`,
  },
  q076: {
    verified: true,
    sources: [
      wiki(`You%27re_Beautiful_(James_Blunt_song)`, `You're Beautiful (James Blunt song)`),
      sf('james-blunt/youre-beautiful', `You're Beautiful by James Blunt`),
    ],
    extendedInfo_he: `בלאנט סיפר במלוא הגלוי: "השיר הוא לא מה שאנשים חושבים שהוא. הוא על בחור שמסומם לחלוטין, עוקב אחרי החברה של מישהו אחר — וצריך להיכלא בכלא. אבל אנשים חושבים 'אה, הוא רומנטיקן מתוק'. אם זה מה שאתם חושבים שזה רומנטיקה, אני חושב שאתם די מוזרים". השיר יצא ב-2004 מהאלבום "Back to Bedlam" והגיע למקום 1 בבריטניה ובארה"ב.`,
  },
  q077: {
    verified: true,
    sources: [
      wiki('Puff,_the_Magic_Dragon', 'Puff, the Magic Dragon'),
      sf('peter-paul-and-mary/puff-the-magic-dragon', 'Puff, the Magic Dragon by Peter, Paul and Mary'),
    ],
    extendedInfo_he: `מאמר ב-Newsweek מ-1964 הציע את הפרשנות הסמית - "Puff" = עישון מריחואנה, "Dragon" = "draggin'" (לקחת שאיפה), "Jackie Paper" = ניירות גלגול. השיר נאסר בסינגפור ובהונג קונג בגלל החשד. פיטר יארו הכחיש לאורך כל השנים: "לא יכולתי לכתוב שיר עם לני על דרקון שיש לו תת-טקסט של גראס בכלל" — וטען שלא ידע מה זו מריחואנה ב-1958 כשנכתב השיר המקורי. השיר הופיע בהופעות של Captain Kangaroo כשיר ילדים קלאסי.`,
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
