#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const TODAY = '2026-05-01';
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
  q026: {
    verified: true,
    sources: [
      wiki('Brown_Sugar_(Rolling_Stones_song)', 'Brown Sugar (Rolling Stones song)'),
      sf('the-rolling-stones/brown-sugar', 'Brown Sugar by The Rolling Stones'),
    ],
    extendedInfo_he: `השיר יצא באפריל 1971 כסינגל הראשון מ-Sticky Fingers והגיע למקום 1 בארה"ב ובקנדה. בראיון לרולינג סטון מ-1995 אמר ג'אגר: "כיום הייתי מצנזר את עצמי. הייתי חושב — לא, אני לא יכול לכתוב ככה גלמית". על ההסרה מסטליסט ב-2021 אמר קית' ריצ'רדס: "אני מנסה להבין עם הנשים איפה בדיוק הבעיה. הן לא הבינו שזה שיר על זוועות העבדות?".`,
  },
  q027: {
    verified: true,
    sources: [
      wiki('Zombie_(The_Cranberries_song)', 'Zombie (The Cranberries song)'),
      sf('the-cranberries/zombie', 'Zombie by The Cranberries'),
    ],
    extendedInfo_he: `הפיגוע התרחש ב-20 במרץ 1993, כשמטעני נפץ של ה-IRA הוסתרו בפחי אשפה ברחוב מסחרי בוורינגטון. ג'ונתן בול נהרג במקום, וטים פארי נפטר בבית החולים 5 ימים מאוחר יותר מפצעי ראש. אוריורדן הדגישה: "אני לא ה-IRA. כשבשיר נאמר 'זה לא אני, זו לא משפחתי' — זה מה שאני אומרת". השיר הפך לאחד מסמלי השלום בין אירלנד לאנגליה.`,
  },
  q028: {
    verified: true,
    sources: [
      wiki('Sunday_Bloody_Sunday', 'Sunday Bloody Sunday'),
      sf('u2/sunday-bloody-sunday', 'Sunday Bloody Sunday by U2'),
    ],
    extendedInfo_he: `בונו פתח מסורת של הצהרת "זה לא שיר מורד" לפני ביצוע השיר ב-1983 בהופעה ב-Red Rocks בקולורדו, אחרי שהלהקה ספגה ביקורת מכל צדדי המגזר הפוליטי. המתופף לארי מאלן הוסיף: "אנשים מתים כל יום מתוך מרירות ושנאה — ואנחנו אומרים למה?". השיר יצא ב-21 במרץ 1983 באלבום War.`,
  },
  q029: {
    verified: true,
    sources: [
      wiki('Lola_(song)', 'Lola (song)'),
      sf('the-kinks/lola', 'Lola by The Kinks'),
    ],
    extendedInfo_he: `ריי דייוויס סיפר שתי גרסאות שונות לאורך השנים — אחת על המנהל רוברט וייס שרקד עם אישה במועדון וגילה בסוף הערב שזה גבר עם זיפי זקן, ושנייה על חוויה שלו עצמו במועדון בפריז. ה-BBC אסר לראשונה את השיר בגלל אזכור "Coca-Cola" שהפר את מדיניות פרסום המוצרים — דייוויס נאלץ להקליט מחדש את המילים כ-"cherry cola". נושאי הזהות המגדרית עצמם לא היו הסיבה לאיסור.`,
  },
  q030: {
    verified: true,
    sources: [
      wiki('Afternoon_Delight', 'Afternoon Delight'),
      sf('starland-vocal-band/afternoon-delight', 'Afternoon Delight by Starland Vocal Band'),
    ],
    extendedInfo_he: `ביל דנוף, הכותב, אמר ש"לא רציתי לכתוב שיר סקס מוחלט, רק משהו כיפי שמרמז על סקס". הרעיון נולד מתפריט מסעדת Clyde's of Georgetown שבה הופיע "Afternoon Delight" כמנת הפתיחה. הגיטרה הפדל-סטיל אחרי "skyrockets in flight" עוצבה במכוון לדמות זיקוקים — מטאפורה לאורגזמה. השיר הגיע למקום הראשון בבילבורד ב-10 ביולי 1976, בשיא חגיגות 200 שנה לארה"ב.`,
  },
  q031: {
    verified: true,
    sources: [
      wiki('Wake_Me_Up_When_September_Ends', 'Wake Me Up When September Ends'),
      sf('green-day/wake-me-up-when-september-ends', 'Wake Me Up When September Ends by Green Day'),
    ],
    extendedInfo_he: `אביו של בילי ג'ו ארמסטרונג נפטר מסרטן ב-1 בספטמבר 1982, כשבילי היה בן 10. ביום הלוויה בילי ברח לחדרו ונעל את הדלת — וכשאמא שלו דפקה, הוא אמר לה "תעירי אותי כשספטמבר ייגמר". במשך שנים סירב לשיר על האירוע, אבל כתב את השיר ב-2004 לאלבום American Idiot. השיר זוכה לעיתים לפרשנויות חלופיות, כולל הצמדה לזיכרון פיגועי ה-11 בספטמבר.`,
  },
  q032: {
    verified: true,
    sources: [
      wiki('Lose_Yourself', 'Lose Yourself'),
      sf('eminem/lose-yourself', 'Lose Yourself by Eminem'),
    ],
    extendedInfo_he: `אמינם כתב את השיר בדמות B-Rabbit, הדמות שגילם בסרט 8 Mile (2002). הוא היה הראפר הראשון בהיסטוריה שזכה באוסקר על שיר מקורי, אבל לא הגיע לטקס הפרסים — לואיס רסטו, שותפו להפקה, קיבל את הפרס במקומו. בנוסף, השיר עמד 12 שבועות במקום 1 בבילבורד — שיא לכל שיר אוסקר בכל הזמנים.`,
  },
  q033: {
    verified: true,
    explanation_he: `לנון עצמו אמר ש-'Imagine' הוא "כמעט כמו המניפסט הקומוניסטי, אם כי אני לא ממש קומוניסט". במקום אחר הסביר שהמסר הוא "אנטי-דתי, אנטי-לאומי, אנטי-מסורתי, אנטי-קפיטליסטי — אבל בגלל שהוא מצופה בסוכר הוא מתקבל". השיר קורא לדמיין עולם בלי דת, בלי מדינות ובלי רכוש פרטי. רק ב-2017 קיבלה יוקו אונו קרדיט רשמי על שותפות בכתיבה, אחרי שלנון אמר שחלק גדול מהמילים והרעיון הגיעו ממנה.`,
    sources: [
      wiki('Imagine_(John_Lennon_song)', 'Imagine (John Lennon song)'),
      sf('john-lennon/imagine', 'Imagine by John Lennon'),
    ],
    extendedInfo_he: `הרעיון של "imagine" כפעולה דמיונית הגיע מספר השירה של יוקו אונו "Grapefruit" (1964), שכלל הוראות וציורים בסגנון מדיטטיבי. לנון הודה ב-1980 שהיה "מקומשן ושוביניסטי קצת" כשלא נתן לה קרדיט במקור. השיר נכתב במהלך שיא הפעילות האנטי-מלחמתית של בני הזוג — שנתיים אחרי "Bed-In for Peace".`,
  },
  q034: {
    verified: true,
    sources: [
      wiki(`What%27s_Going_On_(Marvin_Gaye_song)`, "What's Going On (Marvin Gaye song)"),
      sf('marvin-gaye/whats-going-on', "What's Going On by Marvin Gaye"),
    ],
    extendedInfo_he: `הרעיון המקורי הגיע מ-Renaldo "Obie" Benson מהלהקה Four Tops, שהיה עד לאלימות משטרתית במחאת People's Park בברקלי ב-1969. גיי הוסיף תכנים מהשיחות עם אחיו פרנקי שחזר משירות של 3 שנים בווייטנאם. השיר הושפע גם ממהומות ווטס ב-1965. ברי גורדי תיאר את השיר כ-"הדבר הגרוע ביותר ששמעתי בחיי" — אם כי לימים הכחיש שגיי איים לעזוב את חברת Motown אם לא ישוחרר.`,
  },
  q035: {
    verified: true,
    sources: [
      wiki('Fast_Car', 'Fast Car'),
      sf('tracy-chapman/fast-car', 'Fast Car by Tracy Chapman'),
    ],
    extendedInfo_he: `צ'פמן עצמה הסבירה: "זה לא ממש על מכונית. בעצם זה על קשר שלא עובד כי הוא מתחיל מהמקום הלא נכון". בשיר, הדוברת נאלצת לעזוב את הלימודים כדי לטפל באביה האלכוהוליסט שלא עובד, ואז הסיפור חוזר על עצמו — בן זוגה שותה כמו אביה. גרסת הכיסוי של לוק קומבס מ-2023 הגיעה למקום 2 בבילבורד ול-1 במצעדי הקאנטרי.`,
  },
  q036: {
    verified: true,
    explanation_he: `השיר על מייג'ור טום שנותק מבקרת הקרקע ונעלם בחלל הוא מטאפורה לניתוק רגשי ולבדידות. בואי כתב אותו ב-1969 בעקבות פרידה כואבת מהרקדנית הרמיון פרת'ינגייל ובהשפעת הסרט "2001: אודיסיאה בחלל" של קובריק. בהמשך הקריירה, ב-"Ashes to Ashes" (1980), חשף שמייג'ור טום נחשב למכור לסמים — "משוכל בגובה השמיים, פוגע בשפל היסטורי".`,
    sources: [
      wiki('Space_Oddity', 'Space Oddity'),
      sf('david-bowie/space-oddity', 'Space Oddity by David Bowie'),
    ],
    extendedInfo_he: `השיר שוחרר ב-11 ביולי 1969, חמישה ימים לפני שיגור אפולו 11. ה-BBC השמיע אותו ברקע בעת שידור הנחיתה על הירח, אבל הפסיק לשדרו לאחר שזיהה את "המילים האפלות". בואי הבהיר ששאב השראה דווקא מהסרט של קובריק, לא ממסע החלל בפועל. תקופת ההתמכרות הקשה שלו לקוקאין הגיעה רק בשנות ה-70 ולא קשורה ישירות לכתיבת השיר.`,
  },
  q037: {
    verified: true,
    explanation_he: `למרות המנגינה השלווה, "Waterfalls" מספר שני סיפורים טראגיים: בן שמתפתה לעולם הסחר בסמים ונהרג מאלימות רחוב, ואיש שמקיים יחסי מין לא מוגנים ונדבק באיידס ("שלוש האותיות שלקחו אותו למקום מנוחתו האחרון"). המילים "אל תרדפו אחרי מפלי מים" מבקשות להימנע מפיתויים מסוכנים. השיר היה הראשון שזכה למקום ראשון בבילבורד והתייחס לאיידס.`,
    sources: [
      wiki('Waterfalls_(TLC_song)', 'Waterfalls (TLC song)'),
      sf('tlc/waterfalls', 'Waterfalls by TLC'),
    ],
    extendedInfo_he: `השיר יצא ב-1995 בשיא מגפת האיידס, מאלבום CrazySexyCool. הוא נחשב לאחד השירים הראשונים בפופ המיינסטרים שעסק במפורש בנושא, וזכה למקום הראשון בבילבורד ל-7 שבועות. ההפקה של אורגניזד נויז ושיווק הקליפ — שמראה את שני הסיפורים במקביל — הפכו אותו לסמל תרבותי של שנות ה-90.`,
  },
  q038: {
    verified: true,
    sources: [
      wiki('Mr._Brightside', 'Mr. Brightside'),
      sf('the-killers/mr-brightside', 'Mr. Brightside by The Killers'),
    ],
    extendedInfo_he: `ברנדון פלאוורס סיפר: "ישנתי וידעתי שמשהו לא בסדר. הלכתי לבר Crown and Anchor בלאס וגאס, וחברתי הייתה שם עם בחור אחר". פלאוורס וגיטריסט דייב קיונינג כתבו את הגרסה הראשונה ב-2001, וביצעו אותה לראשונה בערב מיקרופון פתוח בבית קפה בוגאס בינואר 2002. השיר יצא ב-2003 ובאלבום הבכורה Hot Fuss (2004), והפך לטראק המזוהה ביותר עם הלהקה.`,
  },
  q039: {
    verified: true,
    explanation_he: `למרות שנשמע כמו שיר רוק סטנדרטי, הקליפ של "Black Hole Sun" מציג שכונה פרברית עם דמויות בעלות חיוכים מעוותים שנבלעות בשמש שחורה — מטאפורה ויזואלית לריקבון שמסתתר מאחורי החזות המושלמת. כריס קורנל עצמו טען שהמילים הן יותר "משחק במילים בשביל המילים" ופחות מסר ספציפי, ושהשם נולד כשטעה לשמוע באולפן חדשות. הוא ציין שלמרות המנגינה המהפנטת, "Black Hole Sun" הוא בעצם שיר עצוב.`,
    sources: [
      wiki('Black_Hole_Sun', 'Black Hole Sun'),
      sf('soundgarden/black-hole-sun', 'Black Hole Sun by Soundgarden'),
    ],
    extendedInfo_he: `קורנל סיפר שכתב את המילים ראשון ואז הלחין סביבן: "כתבתי את זה בראש שלי... העברתי הרבה זמן עם המנגינות". הוא השווה את האפקט ל-"Pink Floyd של תקופת סיד באראט, שיש שכבה שמחה מעל משהו אפל". הקליפ של האוורד גרינהל זכה ב-MTV VMA לסרטון מטאל של השנה (1994).`,
  },
  q040: {
    verified: true,
    explanation_he: `תום יורק כתב את "Creep" על אישה זרה שראה בתקופת הקולג' שלו באוקספורד וגרר אחריה במשך תקופה. המילים "אני מוזר, אני מנוול, מה אני עושה פה?" ביטאו שנאה עצמית כה עמוקה שהלהקה זנחה לחלוטין את ביצוע השיר ב-1998 (אחרי 5 שנות הופעות שבהן "חיינו את אותן 4.5 דקות שוב ושוב", כפי שתיאר אד או'בריאן), והחזירה אותו רק מ-2001 ובאופן ספורדי.`,
    sources: [
      wiki('Creep_(Radiohead_song)', 'Creep (Radiohead song)'),
      sf('radiohead/creep', 'Creep by Radiohead'),
    ],
    extendedInfo_he: `הביצוע הראשון אחרי הזניחה היה ב-2001, אחרי תקלה בקלידים שאילצה אותם לבצע אותו בהופעה ביתית. השיר לא הופיע ב-Pablo Honey כשיר מוביל — הוא יצא כסינגל ב-1992 וכשל בתחילה, אבל זכה לתחייה ב-1993 וקיבל בסופו של דבר את מקום 7 בבילבורד.`,
  },
  q041: {
    verified: true,
    explanation_he: `רוב האנשים מכירים את "Hallelujah" כשיר רוחני, אך כהן כתב על אמונה שבורה ותשוקה מינית. השיר משלב התייחסויות מקראיות לדוד ובת-שבע ("ראית אותה רוחצת על הגג, יופייה ואור הירח הפילוך") ולשמשון ודלילה ("היא קשרה אותך לכיסא, שברה את כס המלכות שלך, גזרה את שערך"). ה-"הללויה" היא צעקה של אדם שנפל מקרבת אלוהים. כהן כתב כ-80 גרסאות לבית לפני שבחר ב-6 לגרסה הסופית.`,
    sources: [
      wiki('Hallelujah_(Leonard_Cohen_song)', 'Hallelujah (Leonard Cohen song)'),
      sf('leonard-cohen/hallelujah', 'Hallelujah by Leonard Cohen'),
    ],
    extendedInfo_he: `יש דיווחים חלוקים: חלק מהמקורות אומרים 80 בתים, אחרים מדברים על 150-180. כהן עצמו אמר: "אם הייתי יודע מאיפה השירים מגיעים, הייתי הולך לשם יותר". השיר יצא לראשונה ב-1984 באלבום Various Positions שחברת Columbia סירבה להוציא בארה"ב — הוא הפך לאיקוני רק אחרי גרסת הכיסוי של ג'ף באקלי ב-1994.`,
  },
  q042: {
    verified: true,
    explanation_he: `כריס מרטין כתב את "Yellow" בהשראת הכוכבים שראה מחוץ לאולפן בלילה (לפי המלצת המפיק קן נלסון). למרות שנשמע כמו שיר אהבה רומנטי, המילים "אשפוך דם בשבילך, אתן עצמות בשבילך" מתארות מסירות אינטנסיבית עד-קיצונית. מרטין הסביר שהשיר עוסק ב-"מסירות לאדם — לכתוב לו שיר, לשחות בים בשבילו", ואמר שלא היה לו אדם ספציפי בראש — זה יכול לתאר אפילו אהבה אחווית.`,
    sources: [
      wiki('Yellow_(Coldplay_song)', 'Yellow (Coldplay song)'),
      sf('coldplay/yellow', 'Yellow by Coldplay'),
    ],
    extendedInfo_he: `הצבע "צהוב" עצמו לא נבחר במשמעות סמלית — מרטין אמר ש-"זה פשוט כי המילה נשמעה טוב, היא פשוט התאימה". השם הסופי הגיע ממדריך ה-Yellow Pages שהיה ליד באולפן. השיר יצא ב-26 ביוני 2000 כסינגל השני מאלבום הבכורה Parachutes והפך לפריצת הדרך הגדולה של Coldplay.`,
  },
  q043: {
    verified: true,
    explanation_he: `למרות הקצב הקליט, "bad guy" הוא שיר אירוני שבו אייליש לועגת לתופעה שבה אנשים מציגים את עצמם כ-"שוברי כללים". היא אמרה: "אם את כל הזמן אומרת אני רעה, אני שוברת כללים — את לא באמת". אייליש עצמה לוקחת את התפקיד של ה-"בחור הרע" שבדרך כלל שמור לגברים, ולועגת לאובך תפקידי המגדר — בפזמון היא בעצם מתעמתת עם הבן זוג שמשחק קשוח בעוד שהיא היא "הרעה האמיתית". הטוויסט בקצב בסוף השיר מסמל את הפיכת היוצרות.`,
    sources: [
      wiki('Bad_Guy_(Billie_Eilish_song)', 'Bad Guy (Billie Eilish song)'),
      sf('billie-eilish/bad-guy', 'Bad Guy by Billie Eilish'),
    ],
    extendedInfo_he: `השיר יצא ב-29 במרץ 2019 מאלבום הבכורה "When We All Fall Asleep, Where Do We Go?". המבנה המוזיקלי לא רגיל: הקצב מתחיל ב-135 BPM ויורד ל-120 BPM בסוף. בגראמי 2020 השיר זכה בכל ארבעת הפרסים הגדולים יחד עם בילי אייליש שזכתה באמן השנה ובסולן הנשי הטוב — היא הייתה הראשונה שעשתה זאת מאז קריסטופר קרוס ב-1981.`,
  },
  q044: {
    verified: true,
    explanation_he: `למרות הצליל הרטרו העליז, "Blinding Lights" מתאר נהיגה תחת השפעת אלכוהול בלילה לכיוון אקסית — מתוך בדידות עזה. The Weeknd הסביר: "אתה רוצה לראות מישהו בלילה, אתה שיכור, ואתה נוהג לכיוון האדם הזה ופשוט מסונוור על ידי האורות, אבל שום דבר לא יכול לעצור אותך". הוא הוסיף: "אני לא רוצה לקדם נהיגה שיכורה, אבל זה הצד האפל". השיר רומז על לאס וגאס ("Sin City") ועל מעגל הלילה האפל שלו עצמו.`,
    sources: [
      wiki('Blinding_Lights', 'Blinding Lights'),
      sf('the-weeknd/blinding-lights', 'Blinding Lights by The Weeknd'),
    ],
    extendedInfo_he: `השיר יצא בנובמבר 2019 מאלבום After Hours, ועוצב בסגנון synth-wave של שנות ה-80 בהשראת המשחק Grand Theft Auto: Vice City. הוא שבר את שיא בילבורד הוט 100 ככל הזמנים — 90 שבועות בעשירייה הראשונה ובמקום 1 ל-4 שבועות. ב-2024 הופיע ב-Spotify כשיר המושמע ביותר אי פעם.`,
  },
  q045: {
    verified: true,
    explanation_he: `הוזייר כתב את "Take Me to Church" כביקורת על הכנסייה הקתולית ועל דיכוי המיניות. הוא אמר: "גדלתי באירלנד, הכנסייה תמיד שם — הצביעות, הפחדנות הפוליטית". ה-"כנסייה" בשיר היא לא מקום פולחן אלא מטאפורה למיניות ולאהבה. הקליפ מציג את רדיפתו של זוג הומוסקסואלי, ובהשראת הפרסקציה של להט"ב ברוסיה (אם כי הסרטון עצמו צולם באירלנד).`,
    sources: [
      wiki('Take_Me_to_Church_(Hozier_song)', 'Take Me to Church (Hozier song)'),
      sf('hozier/take-me-to-church', 'Take Me to Church by Hozier'),
    ],
    extendedInfo_he: `הוזייר הדגיש שהשיר אינו "התקפה על אמונה" אלא ביקורת על "מוסד שמערער את האנושות". הוא תיאר אותו כ-"שיר של איבוד דת". הקליפ של ברנדן קנטי הופק בקורק, אירלנד, בתקציב של 1,500 אירו בלבד, אבל השפיע באופן עולמי. השיר הגיע למקום 2 בבילבורד ולשיא של 6 בבריטניה.`,
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
