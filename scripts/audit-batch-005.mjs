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
  q078: {
    verified: true,
    sources: [
      wiki('Shape_of_You', 'Shape of You'),
      sf('ed-sheeran/shape-of-you', 'Shape of You by Ed Sheeran'),
    ],
    extendedInfo_he: `במקור השיר נכתב במהלך מחנה כתיבה עם ריהאנה בראש (וגם ל-Little Mix תחילה), אבל אחרי שהוסיפו אזכור של ואן מוריסון ("put van the man on the jukebox") הוחלט שהוא יותר מתאים לשירן. השיר מדגם את "No Scrubs" של TLC, מה שהוסיף קרדיט לכותבי השיר ההוא. הוא הגיע למקום 1 בבילבורד ל-12 שבועות והפך להיט הגדול של 2017.`,
  },
  q079: {
    verified: true,
    sources: [
      wiki(`Gangsta%27s_Paradise`, `Gangsta's Paradise`),
      sf('coolio/gangstas-paradise', `Gangsta's Paradise by Coolio`),
    ],
    extendedInfo_he: `השיר נכתב במקור עבור הסרט "Dangerous Minds" עם מישל פייפר, ומבטא "תחושות הייאוש והנטישה שהרגישו ילדי בית הספר בסרט". הוא דיגם את "Pastime Paradise" של סטיבי וונדר מ-1976, שזכה גם הוא בקרדיט. השיר זכה בגראמי על Best Rap Solo Performance ב-1996. אחד מהשירים המזוהים ביותר עם שנות ה-90.`,
  },
  q080: {
    verified: true,
    sources: [
      wiki('Smells_Like_Teen_Spirit', 'Smells Like Teen Spirit'),
      sf('nirvana/smells-like-teen-spirit', 'Smells Like Teen Spirit by Nirvana'),
    ],
    extendedInfo_he: `קתלין הנה (סולנית Bikini Kill) ריססה את הביטוי "Kurt smells like Teen Spirit" על קיר חדרו של קוביין אחרי לילה של גרפיטי בסיאטל. קוביין חשב שהיא משבחת את הרוח המהפכנית שלו ולא ידע ש-Teen Spirit הוא דאודורנט לנערות — גילה זאת רק חודשים אחרי שיציאת הסינגל. הוא אמר שהשיר "מורכב מרעיונות סותרים — לועג לרעיון של מהפכה אבל גם מאמץ אותו". באס נובוסליץ' אמר: "קורט תיעב את המיינסטרים. זה מה ש-Smells Like Teen Spirit היה — מנטליות של קונפורמיות".`,
  },
  q081: {
    verified: true,
    sources: [
      wiki('Seven_Nation_Army', 'Seven Nation Army'),
      sf('the-white-stripes/seven-nation-army', 'Seven Nation Army by The White Stripes'),
    ],
    extendedInfo_he: `בילדותו בדטרויט ג'ק ווייט שמע "Salvation Army" וחשב שזה "Seven Nation Army" — וזה הפך לשם השיר. השיר מבטא תסכול מהרכילות שמלוותה את העלייה של The White Stripes לפסגות ההצלחה. הריף עם בס-בריטון הפך להמנון ספורט ויראלי בעולם — החל מאוקטובר 2003 כשאוהדי קלאב ברוז' שרו אותו במשחק ליגת האלופות באיטליה. בגולדן בול 2018 הוא היה ההמנון הלא-רשמי של מונדיאל רוסיה.`,
  },
  q082: {
    verified: true,
    sources: [
      wiki('Stairway_to_Heaven', 'Stairway to Heaven'),
      sf('led-zeppelin/stairway-to-heaven', 'Stairway to Heaven by Led Zeppelin'),
    ],
    extendedInfo_he: `רוברט פלאנט אישר את הפרשנות: השיר על "אישה שמקבלת את כל מה שהיא רוצה בלי לתת חזרה כלום". הטאבו של ניגון הריף בחנויות גיטרות הונצח בסרט "Wayne's World" (1992) — שלט "NO Stairway To Heaven" עם תגובת ווין: "אין מדרגות. נדחה". בגלל סיבוכי רישוי, הסרט עצמו החליף את הריף ב"משהו לא-מובן" בפצרים מאוחרים יותר.`,
  },
  q083: {
    verified: true,
    explanation_he: `בואי ראה את המפיק טוני ויסקונטי ואהובתו (הזמרת הגרמנייה אנטוניה מאס) מתנשקים ליד חומת ברלין, וכתב את השיר על האומץ של אהבה בצל המלחמה הקרה. הוא תיאר זוג — אחד ממזרח ברלין ואחד ממערב — שחולמים על חופש למרות הסיכון הקבוע למוות. בואי שם את המילה "Heroes" במירכאות בכוונה כדי להביע אירוניה — לא ניצחון פשוט. הופעתו ב-1987 ליד הרייכסטאג נחשבת לאחד הזרזים לנפילת החומה — אלפי מזרח-ברלינאים נצמדו לחומה משם הצד השני וזימרו יחד.`,
    sources: [
      wiki('Heroes_(David_Bowie_song)', 'Heroes (David Bowie song)'),
      sf('david-bowie/heroes', 'Heroes by David Bowie'),
    ],
    extendedInfo_he: `בואי דיבר על ההופעה של 1987: "הייתה אחת ההופעות הרגשיות ביותר שעשיתי. הייתי בדמעות". זו הייתה למעשה "הופעה כפולה" — עם החומה כתפאורה, הקול עבר לצד השני. הוא ראה במו עיניו "אלפים מהצד השני התקרבו לחומה" ושמע אותם "מריעים ושרים יחד". כשבואי נפטר ב-2016, משרד החוץ הגרמני צייץ "להתראות, דייוויד בואי. אתה עכשיו בין הגיבורים. תודה שעזרת להפיל את החומה".`,
  },
  q084: {
    verified: true,
    explanation_he: `'Toxic' משתמש במטאפורה של רעל וסם כדי לתאר את ההתמכרות ליחסים רעילים. בריטני ספירס הסבירה: "זה בעצם על נערה מכורה לבחור... הנערה הרעה הזאת תעשה הכל כדי לקבל מה שהיא רוצה". ההוק האסיאתי המפורסם הוא דגימה מהשיר "Tere Mere Beech Mein" מהסרט הבוליוודי "Ek Duuje Ke Liye" משנת 1981 (לא 1940 כפי שלעיתים מצוטט בטעות).`,
    sources: [
      wiki('Toxic_(song)', 'Toxic (song)'),
      sf('britney-spears/toxic', 'Toxic by Britney Spears'),
    ],
    extendedInfo_he: `השיר יצא ב-13 בינואר 2004 מאלבום "In the Zone" שיצא ב-2003. ההפקה של הצמד השוודי Bloodshy & Avant שילבה מיתרים בוליוודיים, חליליות ובס-באס. השיר זכה בגראמי על Best Dance Recording ב-2005 — הזכייה הראשונה של ספירס בגראמי. הקליפ של ג'וזף קאהן הפך לאחד האיקוניים של תקופת התווך של ספירס.`,
  },
  q085: {
    verified: true,
    sources: [
      wiki('SOS_(ABBA_song)', 'SOS (ABBA song)'),
      sf('abba/sos', 'SOS by ABBA'),
    ],
    extendedInfo_he: `שם העבודה היה "Turn Me On" — הכותרת הסופית "SOS" נטבעה על ידי המנהל סטיג אנדרסון כדי לתת תחושת דחיפות רגשית. אגנתה שרה את הקול הראשי — תחילתו של "סגנון הקלאסי הראשון של פרידה" שלה. ABBA אמרו שעם "SOS" הם מצאו לראשונה את הזהות שלהם כלהקת פופ. הזמרים הקליטו עם קוד-נשימה שלם של "פיתויים ופאתוס" שהפך לחותם הסגנוני שלהם.`,
  },
  q086: {
    verified: true,
    sources: [
      wiki('Wonderwall', 'Wonderwall'),
      sf('oasis/wonderwall', 'Wonderwall by Oasis'),
    ],
    extendedInfo_he: `נואל גלאגר נתן שני הסברים שונים לאורך השנים: למגזין NME ב-1996 הוא אמר שהשיר על חברתו דאז מג מתיוס. אחר כך (במיוחד אחרי הגירושים שלהם ב-2001) הוא הבהיר ב-Q Magazine: "המשמעות של השיר נלקחה ממני על ידי התקשורת... זה על חבר דמיוני שיבוא להציל אותך מעצמך". הוא הסביר שהיה לו קשה לתקן את הסיפור אחרי שהוא כבר נכתב.`,
  },
  q087: {
    verified: true,
    sources: [
      wiki('No_Woman,_No_Cry', 'No Woman, No Cry'),
      {
        url: 'https://www.smoothradio.com/features/the-story-of/bob-marley-no-woman-no-cry-lyrics-meaning-video/',
        title: 'The Story of "No Woman No Cry" by Bob Marley — Smooth Radio',
        type: 'article',
        accessed: TODAY,
      },
    ],
    extendedInfo_he: `הקרדיט הרשמי לשיר ניתן לוינסנט פורד, חבר של מארלי שניהל מטבח חינמי בטרנצ'טאון — שם מארלי גדל בעוני. מארלי אמר שבלעדי המטבח של פורד הוא היה גווע ברעב. ההערכה היא שמארלי שיתף את הקרדיט כדי לעקוף הגבלות חוזה ולספק "עזרה מתמשכת לחברים קרובים" — התמלוגים מהשיר אפשרו לפורד להמשיך את פעילות הצדקה שלו. בשיר מארלי מזכיר את "Government Yards in Trenchtown" — שיכון ציבורי בו גדל.`,
  },
  q088: {
    verified: true,
    sources: [
      wiki('Gold_Digger_(Kanye_West_song)', 'Gold Digger (Kanye West song)'),
      sf('kanye-west/gold-digger', 'Gold Digger by Kanye West'),
    ],
    extendedInfo_he: `הפזמון של ג'יימי פוקס הוא אינטרפולציה של "I Got a Woman" של ריי צ'ארלס מ-1954, שכתב Renald Richard. השיר מספר על "גבר שחור שעוזב אישה שחורה למען בחורה לבנה אחרי שהוא מתעשר". יצא ביולי 2005 והגיע למקום 1 בבילבורד ל-10 שבועות. נכלל באלבום "Late Registration" של קניה ווסט.`,
  },
  q089: {
    verified: true,
    sources: [
      wiki('Basket_Case_(Green_Day_song)', 'Basket Case (Green Day song)'),
      sf('green-day/basket-case', 'Basket Case by Green Day'),
    ],
    extendedInfo_he: `במקור בילי ג'ו ארמסטרונג כתב את השיר כשיר אהבה בסביבות 1992-93, ואז שכתב את המילים סביב חוויות התקפי הפניקה שלו. השיר תיעד את הבלבול והאי-וודאות של מי שלא מבין מה קורה לו — ועזר לרבים לזהות את המצב אצל עצמם. השיר יצא ב-1 באוגוסט 1994 כסינגל השני מ-Dookie.`,
  },
  q090: {
    verified: true,
    sources: [
      wiki('Paranoid_Android', 'Paranoid Android'),
      sf('radiohead/paranoid-android', 'Paranoid Android by Radiohead'),
    ],
    extendedInfo_he: `החוויה הספציפית שיורק מתאר התרחשה בבר בלוס אנג'לס בתקופת הסיבוב בארה"ב. הוא הוקף באנשים מסוממים בקוקאין, ופחד מאישה אחת שהפכה אלימה אחרי שמישהו שפך עליה משקה. השם נלקח ממרווין הרובוט הפרנואיד מ-The Hitchhiker's Guide to the Galaxy של דאגלס אדאמס. השיר בן 6:23 דקות יצא ב-26 במאי 1997 כסינגל הראשון מ-OK Computer ונחשב לאחד היצירות המורכבות ביותר של רדיוהד.`,
  },
  q091: {
    verified: true,
    sources: [
      wiki('1999_(song)', '1999 (song)'),
      sf('prince/1999', '1999 by Prince'),
    ],
    extendedInfo_he: `פרינס כתב את השיר ב-1982 בשיא המתחים של המלחמה הקרה — ממשל רייגן והעצמת הנשק הגרעיני. השיר נפתח עם הזמרת הליווי ליסה קולמן ששרה על חלום שבו "השמיים היו סגולים" ואנשים בורחים מההרס. אבל פרינס בוחר לחגוג את החיים: "לפני שאתן לזה לקרות, ארקוד את חיי". בראיון ל-CNN ב-1999 הוא אמר שרצה "לכתוב משהו שייתן תקווה" למרות הזמנים הקשים שצפה.`,
  },
  q092: {
    verified: true,
    explanation_he: `'Kids' של MGMT נכתב במקור כתרגיל ביצירת "השיר הפופ הסטריאוטיפי ביותר" — סאטירה על מוזיקת פופ קליטה. אנדרו ואן-וינגרדן מהלהקה הסביר: "היינו חושבים איך לעשות את שיר הפופ הסטריאוטיפי ביותר, וזה אחד מאלה שעשינו". בן גולדווסר הוסיף שהשיר תופס את התחושה של "להיות בן 19, בעולם הקולג' הפנטסטי, שזה קצת כמו ילדות כי אין לך הרבה אחריות". כשהשיר הפך ללהיט פופ אמיתי, זו הייתה אירוניה כפולה — סאטירה שהתקבלה ברצינות.`,
    sources: [
      wiki('Kids_(MGMT_song)', 'Kids (MGMT song)'),
      sf('mgmt/kids', 'Kids by MGMT'),
    ],
    extendedInfo_he: `השיר יצא ב-2007 באלבום "Oracular Spectacular" אבל הפך ללהיט רק ב-2008-2009. הקליפ הראשון של ה-2008 צולם בלי תקציב כמעט והציג ילדה קטנה שמוקפת ביצורים מפלצתיים — חוויה שגרמה לה לבכות במהלך הצילומים, מה שהוביל לוויכוח ציבורי. ניקולא סרקוזי, נשיא צרפת אז, השתמש בשיר בקמפיין ב-2009 — MGMT תבעו אותו והגיעו לפשרה.`,
  },
  q093: {
    verified: true,
    sources: [
      wiki('Skinny_Love', 'Skinny Love'),
      sf('bon-iver/skinny-love', 'Skinny Love by Bon Iver'),
    ],
    extendedInfo_he: `ג'סטין ורנון נסע לבקתת היומנים המבודדת של אביו בצפון ויסקונסין אחרי תקופה קשה — סוף הלהקה הקודמת שלו (DeYarmond Edison), פרידה רומנטית, וחולי במונונוקלאוזיס. הוא בילה שם 3 חודשים בחורף 2007 והקליט את כל אלבום הבכורה "For Emma, Forever Ago" לבד. ורנון הסביר שאהבה "רזה" היא מצב של "להיות במערכת יחסים כי אתה צריך עזרה — אבל לא בהכרח כי זה הסיבה שאתה צריך להיות בה".`,
  },
  q096: {
    verified: true,
    explanation_he: `למרות הביט האופורי, 'We Found Love' מתאר אהבה שנמצאה "במקום חסר תקווה" — ולא בהכרח חיובי. הקליפ של מלינה מטסוקאס מציג את ריהאנה כ"מכורה גם לאהוב שלה וגם לסמים", והשניים "מתעללים זה בזה". המפיק קלווין האריס יצר את השיר באלתור — "ניגנתי וזימרתי שטויות כדי לראות אם ההברות מתאימות". הקליפ צולם בצפון אירלנד (בעיר באנגור ובלפסט) בספטמבר 2011.`,
    sources: [
      wiki('We_Found_Love', 'We Found Love'),
      sf('rihanna/we-found-love', 'We Found Love by Rihanna'),
    ],
    extendedInfo_he: `המטסוקאס תיארה את הוויז'ן: "השיר הוא על התמכרות ואהבה ואיך זאת התמכרות, ועל המכשולים של ניסיון לעזוב". המבקרים הצביעו על קווי הדמיון בין מערכת היחסים בקליפ לבין הקשר הזעיר של ריהאנה עם כריס בראון. השיר הגיע למקום 1 בבילבורד ל-10 שבועות וזכה בגראמי על Best Dance Recording (2013).`,
  },
  q097: {
    verified: true,
    explanation_he: `מאחורי המלודיה הנוסטלגית של 'Summertime Sadness', הקליפ של קייל ניומן מציג שתי נשים שלוקחות את חייהן — אבל היחסים ביניהן (אהובות או חברות?) נשארים מעורפלים בכוונה. ג'יימי קינג ששיחקה בקליפ אמרה: "זה על אי-יכולת לחיות בלי זה שאתה אוהב, חבר או אהוב — לא משנה. זה מה שאתה רוצה שזה יהיה". הרמיקס של Cedric Gervais הפך את השיר ללהיט מחול וזכה בגראמי לרמיקס הטוב ביותר ב-2014.`,
    sources: [
      wiki('Summertime_Sadness', 'Summertime Sadness'),
      sf('lana-del-rey/summertime-sadness', 'Summertime Sadness by Lana Del Rey'),
    ],
    extendedInfo_he: `הקליפ הופק באפריל-מאי 2012 ונכלל באלבום הבכורה של לאנה דל ריי "Born to Die". הסגנון של "Hollywood Sadcore" שלה — מלודיות מתוקות שמסוות נושאים אפלים — הפך לחתימה. הרמיקס של ג'רביי הגיע למקום 6 בבילבורד והפך ללהיט הסולו הגדול בארה"ב של דל ריי. יש שטוענים שהקליפ נושא דמיון לסיפור של ת'למה ולואיז, אבל הבמאי מעולם לא אישר.`,
  },
  q098: {
    verified: true,
    sources: [
      wiki('American_Girl_(Tom_Petty_song)', 'American Girl (Tom Petty song)'),
      sf('tom-petty/american-girl', 'American Girl by Tom Petty'),
    ],
    extendedInfo_he: `השמועה טוענת שהשיר על סטודנטית מאוניברסיטת פלורידה שקפצה ממגדלי Beaty Towers. דוברת האוניברסיטה אישרה שאף אחד מעולם לא קפץ משם — והבניין אכן בעל "חלונות צרים שלא נפתחים ללא מרפסות". פטי הסביר בספרו "Conversations with Tom Petty": "זה הפך למיתוס אורבני ענק בפלורידה. זה פשוט לא נכון בכלל". הוא כתב את השיר בקליפורניה ליד כביש מהיר — קולות התנועה הזכירו לו את גלי הים.`,
  },
  q099: {
    verified: true,
    sources: [
      wiki('Losing_My_Religion', 'Losing My Religion'),
      sf('rem/losing-my-religion', 'Losing My Religion by R.E.M.'),
    ],
    extendedInfo_he: `במקור הסביר מייקל סטייפ שזה "שיר אובססיה קלאסי" על "אדם במסיבה חברתית שיש לו עניין באדם אחר אבל מתבייש לגשת אליו". הביטוי "losing my religion" בדיאלקט הדרומי של ארצות הברית פירושו "לאבד שליטה" או "להגיע לקצה הסבלנות" — לא קשור לדת. השיר היה הסינגל המצליח ביותר של R.E.M. — הגיע למקום 4 בבילבורד וזכה בשני פרסי גראמי ב-1992.`,
  },
  q100: {
    verified: true,
    sources: [
      wiki('Karma_Police', 'Karma Police'),
      sf('radiohead/karma-police', 'Karma Police by Radiohead'),
    ],
    extendedInfo_he: `הביטוי "Karma Police" נולד כבדיחה פנימית בלהקה — כשמישהו התנהג רע באולפן, אמרו "המשטרת קארמה תתפוס אותך". תום יורק הסביר: "זה למישהו שצריך לעבוד בחברה גדולה. זה שיר נגד בוסים. f*ck the middle management!". השיר יצא ב-25 באוגוסט 1997 כסינגל השני מ-OK Computer — הקליפ של ג'ונתן גלייזר עם המכונית הרודפת אחרי אדם הפך לאיקוני.`,
  },
  q101: {
    verified: true,
    explanation_he: `נטען שראשי התיבות של 'Maps' הם "My Angus Please Stay" — בקשה מקארן או לחברה אנגוס אנדרו (סולן Liars) לא לעזוב לפני שהיא יוצאת לסיבוב הופעות. הלהקה מעולם לא אישרה רשמית. הדמעות בקליפ הן אכן אמיתיות — אנגוס איחר ב-3 שעות לצילומים, וקארן או "כמעט עזבה לסיבוב הופעות" כשהיא חשבה שהוא לא מגיע. בסוף הוא כן הגיע — והדמעות שלה ב-Take הסופי הן רגע אמיתי.`,
    sources: [
      wiki('Maps_(Yeah_Yeah_Yeahs_song)', 'Maps (Yeah Yeah Yeahs song)'),
      sf('yeah-yeah-yeahs/maps', 'Maps by Yeah Yeah Yeahs'),
    ],
    extendedInfo_he: `השיר יצא ב-2003 מאלבום הבכורה Fever to Tell. השיר נחשב לרגע פריצת הדרך של היה היה היאז מהפאנק-רוק האלים שלהם לצלילים יותר מלודיים. ביונסה הודתה שהשיר השפיע ישירות על "Halo" שלה. הקליפ זכה ב-MTV VMA לקליפ נשי הטוב של 2004.`,
  },
  q102: {
    verified: true,
    sources: [
      wiki('The_Sound_of_Silence', 'The Sound of Silence'),
      sf('simon-and-garfunkel/the-sounds-of-silence', 'The Sound of Silence by Simon & Garfunkel'),
    ],
    extendedInfo_he: `סיימון הסביר: "הייתי הולך לחדר האמבטיה כי לאמבטיה היו אריחים — חדר עם הד קל. הייתי פותח את הברז כדי שהמים יזרמו... והייתי מנגן. בחושך". המפיק טום ווילסון הוסיף גיטרות חשמליות, באס ותופים בערוב יוני 1965 בלי ליידע את הצמד — וזה שינה את השיר מבלדה אקוסטית כושלת ללהיט מספר 1 (ינואר 1966) שהציל את הקריירה שלהם.`,
  },
  q104: {
    verified: true,
    explanation_he: `השיר שרבים מכירים בטעות כ-'Teenage Wasteland' נקרא על שם שני אנשים: המורה הרוחני ההודי מהר באבא וטרי ריילי, חלוץ המוזיקה המינימליסטית. בקונספט המקורי של אופרת הרוק "Lifehouse" של פיטר טאונסנד, השיר היה אמור להיפתח עם איכר סקוטי בשם ריי שאוסף את אשתו סאלי ושני ילדיהם כדי לעבור לונדון — לא נער קרנבל. הביטוי "Teenage Wasteland" מתאר את הניכור של דור הבריטי בתקופה.`,
    sources: [
      wiki(`Baba_O%27Riley`, `Baba O'Riley`),
      sf('the-who/baba-o-riley', `Baba O'Riley by The Who`),
    ],
    extendedInfo_he: `השיר נכלל באלבום "Who's Next" (אוקטובר 1971), שנוצר מהריסות אופרת הרוק "Lifehouse" שלא הצליחה. הסינתיסייזר ARP בפתיחה היה מהפכני בזמנו. ב-2008 השיר נכלל ברשימת 500 השירים הגדולים בכל הזמנים של רולינג סטון. החלק הכינור הקלאסי לקראת הסוף נוגן על ידי המבקר דייב ארביוס, שגם נפטר אחרי הקלטתו.`,
  },
  q105: {
    verified: true,
    sources: [
      wiki('Biko_(song)', 'Biko (song)'),
      sf('peter-gabriel/biko', 'Biko by Peter Gabriel'),
    ],
    extendedInfo_he: `סטיב ביקו, פעיל אנטי-אפרטהייד דרום אפריקאי, נפטר ב-12 בספטמבר 1977 אחרי מעצר משטרתי קשה בפורט אליזבת. גבריאל שמע את הידיעה דרך BBC, נדהם, וערך מחקר על חייו לפני שכתב את השיר. השיר יצא באוגוסט 1980 והפך להמנון אנטי-אפרטהייד עולמי. השורה "אתה יכול לפוצץ נר אבל לא לפוצץ אש — ברגע שהלהבות מתחילות, הרוח רק תחיה אותן" הפכה לאחד הציטוטים הפוליטיים המוכרים בתולדות הרוק.`,
  },
  q107: {
    verified: true,
    explanation_he: `'Blue Monday' של ניו אורדר הוא שיר אלקטרוני מסתורי שהמשמעות שלו נשארה מעורפלת בכוונה. ברנארד סאמנר כתב את המילים תחת השפעת LSD ואמר במפורש: "הם לא על איאן קרטיס. רצינו שזה יהיה מעורפל". פיטר הוק הוסיף שאין הרבה מאחורי המילים — "ברני פשוט עשה את זה". ההשראה לשם הייתה מאיור ב"Breakfast of Champions" של קורט וונגוט וגם משיר בלוז של פאטס דומינו. למרות הצליל הקריר, רבים מקשיבים שומעים בו תחושת בדידות עמוקה.`,
    sources: [
      wiki('Blue_Monday_(New_Order_song)', 'Blue Monday (New Order song)'),
      sf('new-order/blue-monday', 'Blue Monday by New Order'),
    ],
    extendedInfo_he: `השיר יצא במרץ 1983 כסינגל 12-אינץ' — הסינגל הגדול ביותר של 12-אינץ' שנמכר אי פעם בבריטניה. עיצוב הכריכה של פיטר סוויל היה כל כך יקר להפקה שכל עותק נמכר בהפסד עבור Factory Records. הביט הקלאסי של 4/4 והסינתי המהפנט השפיעו על שני עשורים של מוזיקת מחולים — מ-house ו-techno עד EDM של היום.`,
  },
  q108: {
    verified: true,
    sources: [
      wiki('Rivers_of_Babylon', 'Rivers of Babylon'),
      sf('boney-m/rivers-of-babylon', 'Rivers of Babylon by Boney M'),
    ],
    extendedInfo_he: `המקור הוא הגרסה הרסטמית של ה-Melodians מ-1970, שמשלבת את תהילים קל"ז עם נחמיה א ו-ירמיהו ל"א. בוני אם — לקה גרמנית בהפקת פרנק פאריאן — הפכה אותה ב-1978 ללהיט דיסקו עולמי. הגרסה שלהם עמדה 5 שבועות במקום 1 בבריטניה ונכללת בעשירייה הראשונה של הסינגלים הנמכרים אי פעם בבריטניה. רבים מהמאזינים בעולם רוקדים על שיר גלות, חורבן ובכי.`,
  },
  q300: {
    verified: true,
    explanation_he: `"Despacito" פירושו "לאט לאט", והשיר משתמש בלשון אלגורית ורומזת לתיאור משיכה פיזית ואינטימיות (לא בלשון מפורשת). ביקורות תיארו את המילים כ-"מצועצעות בעדינות" וכ-"סקסי בלי להיות וולגרי". כשג'סטין ביבר הצטרף לרמיקס, נתפס בהופעה כשהוא מחליף חלקי מילים במילה "blah" — לואיס פונסי הגן עליו ואמר שהוא ראוי ל"קצת הקלה" כי ספרדית אינה שפת אמו.`,
    sources: [
      wiki('Despacito', 'Despacito'),
      sf('luis-fonsi/despacito', 'Despacito by Luis Fonsi'),
    ],
    extendedInfo_he: `השיר היה הסינגל השני הגדול של 2017 ב-Billboard Hot 100 ועמד 16 שבועות במקום 1. הקליפ של בריאן פרס היה הראשון אי פעם להגיע ל-3 מיליארד צפיות ב-YouTube (אוגוסט 2017). הצמד פונסי-יאנקי כתבו את השיר בפורטו ריקו על מקצב רגאטון איטי. הרמיקס עם ביבר תרם לחזרת המוזיקה הלטינית למיינסטרים העולמי.`,
  },
  q302: {
    verified: true,
    sources: [
      wiki('Hijo_de_la_Luna', 'Hijo de la Luna'),
      sf('mecano/hijo-de-la-luna', 'Hijo de la Luna by Mecano'),
    ],
    extendedInfo_he: `השיר נכתב על ידי חוסה מריה קאנו מ-Mecano (ולא על ידי הסולנית אנה תורוחה ששרה אותו). יצא ב-1986 באלבום "Entre el cielo y el suelo". התינוק נולד לבקן (אלבינו) בגלל היותו "בן הירח" — האב חושב שזו עדות לבגידה ורוצח את האם בסכין. הסיפור מבוסס על אגדה רומאני (צוענים) קלאסית. השיר זכה לכיסויים ב-12 שפות ונחשב לשיר הספרדי המוכר ביותר בעולם.`,
  },
  q303: {
    verified: true,
    question_he: `איזה להיט רגאטון עולמי משמש לעיתים קרובות כדוגמה ל"שירים שכולם רוקדים אליהם בלי להבין את המילים" — אבל היוצר עצמו מכחיש את הפרשנות הוולגרית?`,
    explanation_he: `"גסולינה" של דאדי יאנקי הפכה ללהיט עולמי ב-2004, ורבים פירשו את "גסולינה" כמטאפורה לתשוקה מינית בסלנג פורטוריקני. אבל דאדי יאנקי עצמו הכחיש זאת במפורש: "השיר לחלוטין מילולי. זה השיר הכי תמים שכתבתי". הוא מתאר אישה שאוהבת לצאת ולהשתעשע, וה-"גסולינה" היא ביטוי פורטוריקני נפוץ בלי קונוטציה מינית. הוויכוח בין הפרשנות הוולגרית לבין כוונת היוצר הוא חלק מהמיתולוגיה של השיר.`,
    sources: [
      wiki('Gasolina', 'Gasolina'),
      sf('daddy-yankee/gasolina', 'Gasolina by Daddy Yankee'),
    ],
    extendedInfo_he: `השיר יצא ב-2004 ונחשב למבשר הפריצה הגלובלית של הרגאטון. הוא הגיע למקום 32 בבילבורד הוט 100 — דבר נדיר ביותר לשיר ספרדית בלעדית באותה תקופה. ב-2008 ג'ון מקיין השתמש בשיר בקמפיין הנשיאות שלו — מה שעורר ויכוח אם הוא וצוותו "הבינו את הדאבל-אנטנדרים". יאנקי עצמו, בתגובה לכל ההמולה, חזר ואמר שהשיר הוא "הכי תמים שכתבתי".`,
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
