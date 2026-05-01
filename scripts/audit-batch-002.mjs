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
  q006: {
    verified: true,
    sources: [
      wiki('Hey_Ya!', 'Hey Ya!'),
      sf('outkast/hey-ya', 'Hey Ya! by OutKast'),
    ],
    extendedInfo_he:
      'השיר עמד 9 שבועות במקום הראשון בבילבורד (דצמבר 2003 – פברואר 2004), והפך לשיר הראשון ב-iTunes שעבר את רף מיליון ההורדות. הביטוי "shake it like a Polaroid picture" הקפיץ זמנית את חברת Polaroid שהייתה בפשיטת רגל, באמצעות הופעות חסות של OutKast. השיר זכה בגראמי וב-VMA, ונכלל במקום ה-10 ברשימת 500 השירים הגדולים בכל הזמנים של רולינג סטון (2021).',
  },
  q007: {
    verified: true,
    sources: [
      wiki('Semi-Charmed_Life', 'Semi-Charmed Life'),
      sf('third-eye-blind/semi-charmed-life', 'Semi-Charmed Life by Third Eye Blind'),
    ],
    extendedInfo_he:
      'סטפן ג\'נקינס כתב את השיר אחרי שראה חברים משתמשים בקריסטל מת\' בהופעה של Primus. הוא תיאר אותו כ"שיר על להתפרק" ואמר שרצה שהריף "ייצור את ההרגשה הבהירה והמבריקה של ספיד". גרסת הרדיו הצנזרה את המילה "crystal meth" באמצעות backmasking, מה שאיפשר השמעה רחבה למרות התוכן. השיר הגיע למקום 4 בבילבורד והפך לאחד הלהיטים הגדולים של 1997.',
  },
  q008: {
    verified: true,
    sources: [
      wiki('Polly_(Nirvana_song)', 'Polly (Nirvana song)'),
      sf('nirvana/polly', 'Polly by Nirvana'),
    ],
    extendedInfo_he:
      'החוטף היה ג\'רלד פרנד, והקורבן ברחה לאחר שהערימה עליו בתחנת דלק וקפצה ממשאיתו, מה שמשך תשומת לב סובבים. תוספת היצירתית של קוביין הייתה לכתוב את הקורבן כמשתפת פעולה לכאורה כדי לגרום לחוטף להוריד את ערנותו. ב-1992 קוביין הביע זעזוע כשנודע לו על אונס שבו התוקפים שרו את מילות "Polly" — "אנשים בלי-תועלת מהשפיכה והבייצים האלה".',
  },
  q009: {
    verified: true,
    sources: [
      wiki('Tears_in_Heaven', 'Tears in Heaven'),
      sf('eric-clapton/tears-in-heaven', 'Tears in Heaven by Eric Clapton'),
    ],
    extendedInfo_he:
      'השיר נכתב בשיתוף עם הפזמונאי וויל ג\'נינגס עבור פסקול הסרט Rush (1992). קלפטון היסס לגבי שחרור פומבי, אבל הבמאית לילי זאנוק שכנעה אותו ש"זה אולי יעזור למישהו". השיר זכה ב-3 פרסי גראמי ב-1993 (שיר השנה, הקלטת השנה, ביצוע פופ גברי), והגיע למקום 2 בבילבורד.',
  },
  q010: {
    verified: true,
    sources: [
      wiki('99_Luftballons', '99 Luftballons'),
      sf('nena/99-luftballons', '99 Luftballons by Nena'),
    ],
    extendedInfo_he:
      'הרעיון נולד ביוני 1982 כשגיטריסט הלהקה קרלו קרגס ראה בלונים מתעופפים בהופעה של רולינג סטונס בברלין המערבית, וחשב מה יקרה אם יחצו את חומת ברלין למזרח. הגרסה הגרמנית הגיעה למקום 2 בבילבורד בארה"ב; הגרסה האנגלית "99 Red Balloons" הגיעה למקום 1 בבריטניה ובקנדה ב-1984. ננה עצמה הדגישה שהשיר עוסק במודעות לפעולותינו וקריאה לשלום, יותר מאשר במסר פוליטי ישיר.',
  },
  q011: {
    verified: true,
    explanation_he:
      "השיר 'Macarena' מספר על בחורה בשם מקרנה שמנצלת את ההזדמנות שחבר שלה ויטורינו מתגייס לצבא כדי לבלות עם גברים אחרים. הריקוד העליז גורם לכולם להתעלם מהעובדה שהמילים מספרות סיפור של בגידה.",
    sources: [
      wiki('Macarena_(song)', 'Macarena (song)'),
      sf('los-del-rio/macarena', 'Macarena by Los del Río'),
    ],
    extendedInfo_he:
      'השיר נכתב על ידי לוס דל ריו (Antonio Romero Monge ו-Rafael Ruiz Perdigones) ב-1993, אחרי ש-Monge ראה רקדנית בוונצואלה. השם "מקרנה" נבחר לכבוד בתו של מונחה. הריקס של Bayside Boys שיצא ב-1995 עמד 14 שבועות במקום הראשון בבילבורד ב-1996, ומכר מעל 14 מיליון עותקים בעולם. נוסחת ה"גוף-ועליצות" הזו עצמה זכתה לביצוע במהלך הוועידה הדמוקרטית של 1996.',
  },
  q012: {
    verified: true,
    sources: [
      wiki('Chandelier_(song)', 'Chandelier (song)'),
      sf('sia/chandelier', 'Chandelier by Sia'),
    ],
    extendedInfo_he:
      'סיה (שכיום מפוכחת) כתבה את השיר מנסיון עברה האישי עם אלכוהוליזם, וכתגובה לשירי "מסיבת בנות" אחרים בפופ. בתחילה כתבה אותו לריהאנה או לביונסה, אך החליטה להקליט בעצמה. הקליפ המפורסם עם הרקדנית מאדי זיגלר בת ה-11 שוחרר במאי 2014. השיר הגיע למקום 8 בבילבורד וקיבל 4 מועמדויות לגראמי.',
  },
  q013: {
    verified: true,
    sources: [
      wiki('Stan_(song)', 'Stan (song)'),
      sf('eminem/stan', 'Stan by Eminem'),
    ],
    extendedInfo_he:
      'במקור נופל סטן עם חברתו ההרה לתוך מבחן הנהר אחרי נסיעה שיכורה — ואמינם בשיר עצמו עונה לו במכתב, אבל מבין באיחור שהסיפור החדשותי שהוא שמע הוא של סטן עצמו. השיר דוגם את "Thank You" של דיידו, ונכלל ברשימת 500 השירים הגדולים של רולינג סטון. המונח "stan" נכנס למילון אוקספורד ב-2017 ולמילון מריאם-וובסטר ב-2019, ומשמש כיום כפועל ושם עצם לתיאור מעריץ אובססיבי.',
  },
  q014: {
    verified: true,
    explanation_he:
      "ג'ון לנון טען שהשם מבוסס על ציור של בנו ג'וליאן שצייר חברה מבית הספר בשם לוסי וודן (שאכן הייתה אמיתית, נפטרה ב-2009). אך הצירוף המקרי של ראשי התיבות L-S-D, יחד עם הדימויים הפסיכדליים בשיר, הפכו אותו לשנוי במחלוקת. לנון עצמו הכחיש לאורך השנים כל התייחסות מכוונת לסם ואמר שדמיון הפנטזיה הגיע מ'אליס בארץ הפלאות'.",
    sources: [
      wiki('Lucy_in_the_Sky_with_Diamonds', 'Lucy in the Sky with Diamonds'),
      sf('the-beatles/lucy-in-the-sky-with-diamonds', 'Lucy in the Sky with Diamonds by The Beatles'),
    ],
    extendedInfo_he:
      'הסיפור על איסור שידור ב-BBC הוא מיתוס נפוץ אך שנוי במחלוקת — לפי החוקרים אלן קלייסון וספנסר לי, ה-BBC מעולם לא אסר רשמית את השיר, ושידר אותו לראשונה ב-20 במאי 1967. השיר היחיד מאלבום Sgt. Pepper שאכן נאסר על ידי ה-BBC היה "A Day in the Life". גרסת הכיסוי של אלטון ג\'ון מ-1974 (עם השתתפות לנון) הגיעה למקום 1 בארה"ב.',
  },
  q015: {
    verified: true,
    sources: [
      wiki('Norwegian_Wood_(This_Bird_Has_Flown)', 'Norwegian Wood (This Bird Has Flown)'),
      sf('the-beatles/norwegian-wood-this-bird-has-flown', 'Norwegian Wood by The Beatles'),
    ],
    extendedInfo_he:
      'לנון הודה במפורש: "ניסיתי לכתוב על רומן מבלי לתת לאשתי לדעת שיש לי כזה — נזהר ופרנואיד כי לא רציתי שסין תדע שמשהו קורה מחוץ לבית". פול מקרטני אישר שהשם "Norwegian Wood" מתייחס לסוג של ציפוי קיר אורן זול שהיה אופנתי בלונדון, ושהבחירה הייתה לעגנית. הסיום "I lit a fire" נשאר עמום בכוונה — לפי מקרטני, הוא עשוי להתייחס לחימום ליד אש או לשרוף את הדירה כנקמה.',
  },
  q016: {
    verified: true,
    sources: [
      wiki('Forever_Young_(Alphaville_song)', 'Forever Young (Alphaville song)'),
      sf('alphaville/forever-young', 'Forever Young by Alphaville'),
    ],
    extendedInfo_he:
      'מקור הלהקה האלקטרונית הגרמנית, השיר שוחרר בספטמבר 1984 ועוסק בחרדה הקיומית של חיים בצל איום גרעיני — "אתה הולך להפיל את הפצצה או לא?". במקור הבית השלישי נכתב עם תחושה "פאשיסטית" שהמפיקים דרשו מהזמר מריאן גולד לשנות. השיר עבר תחייה ב-2024 כשנעשה ויראלי בטיקטוק, צבר מעל 1.1 מיליארד השמעות בספוטיפיי, והגיע ל-10 שבועות במקום 1 בבילבורד.',
  },
  q017: {
    verified: true,
    explanation_he:
      "השיר מפרט תרחישי קטסטרופה בקצב מסחרר ומסתיים ב'ואני מרגיש מצוין'. מייקל סטייפ אמר שזה 'אוסף של זרם תודעה' — מילים שהגיעו אליו ממקורות שונים: חלומות, צפייה בטלוויזיה, וחיי היומיום. הניגוד בין הזרם הקטסטרופלי למילה האירונית של 'מרגיש מצוין' הוא חלק מהאפקט.",
    sources: [
      wiki("It%27s_the_End_of_the_World_as_We_Know_It_(And_I_Feel_Fine)", "It's the End of the World as We Know It (And I Feel Fine)"),
      {
        url: 'https://americansongwriter.com/r-e-m-frontman-michael-stipe-clears-up-confusion-around-iconic-hit-its-the-end-of-the-world-as-we-know-it-and-i-feel-fine/',
        title: "R.E.M. Frontman Michael Stipe Clears Up Confusion Around Iconic Hit — American Songwriter",
        type: 'article',
        accessed: TODAY,
      },
    ],
    extendedInfo_he:
      'חלק מהמילים נולדו מחלום של סטייפ שבו הוא היחיד במסיבת יום הולדת של לסטר באנגס שאינו עם ראשי תיבות L.B. — שם הופיעו לני ברוס, ליאוניד ברז\'נב, לאונרד ברנשטיין. השיר הושפע מ-"Subterranean Homesick Blues" של בוב דילן בסגנון השירה המהיר. בספטמבר 2025 סטייפ סוף סוף חשף ברשתות החברתיות את המילים הנכונות שהמעריצים שמעו לא נכון במשך 38 שנה.',
  },
  q018: {
    verified: true,
    question_he: "איזה שיר פופ ענק של שנות ה-70 עוסק למעשה בזנות?",
    sources: [
      wiki('Roxanne_(The_Police_song)', 'Roxanne (The Police song)'),
      sf('the-police/roxanne', 'Roxanne by The Police'),
    ],
    extendedInfo_he:
      'סטינג כתב את השיר באוקטובר 1977 כשהפוליס שהו במלון עלוב בפריז ליד רובע האורות האדומים, אחרי שראה זונות לראשונה בחייו. השיר שוחרר ב-7 באפריל 1978 אך נכשל מסחרית בתחילה. רק שידור של תחנת רדיו באוסטין, טקסס, ב-1979 חולל פריצת דרך — והוא הגיע למקום 12 בבריטניה ולמקום 32 בארה"ב במאי 1979.',
  },
  q019: {
    verified: true,
    sources: [
      wiki('Bohemian_Rhapsody', 'Bohemian Rhapsody'),
      sf('queen/bohemian-rhapsody', 'Bohemian Rhapsody by Queen'),
    ],
    extendedInfo_he:
      'מרקורי סירב לאורך כל חייו לפרש את השיר ואמר ש"אנשים צריכים פשוט להאזין ולהחליט בעצמם". בריאן מיי הודה שמרקורי "כתב את עצמו לתוך השיר" וכלל בו את המאבקים האישיים שלו — אך הלהקה הסכימה לשמור על פרטיות המשמעות. אחרי מותו של מרקורי, אהובו ג\'ים האטון אמר שהשיר היה "וידוי של מרקורי על היותו הומוסקסואל". מרקורי כתב אותו דווקא בתקופת מפנה אישי — אחרי שבע שנים עם מרי אוסטין, כשהתחיל בקשר הראשון שלו עם גבר.',
  },
  q020: {
    verified: true,
    explanation_he:
      "מארק הופוס מ-Blink-182 כתב את השיר אחרי שקרא מכתב התאבדות אמיתי של מתבגר, בתקופה קשה של דיכאון וטורים מפרכים שבהם הרגיש בודד בעוד שאר חברי הלהקה חזרו הביתה לבני זוג. השיר מתאר בדידות ומחשבות חשוכות אך מסתיים בתקווה — 'מחר מחזיק ימים טובים יותר'. השם 'אדם' עצמו, לפי טראביס בארקר, נלקח דווקא מסקיצה של הסדרה הקומית Mr. Show.",
    sources: [
      wiki("Adam%27s_Song", "Adam's Song"),
      sf('blink-182/adams-song', "Adam's Song by Blink-182"),
    ],
    extendedInfo_he:
      'השיר מהאלבום Enema of the State (1999) ספג ביקורת בעקבות התאבדות של ניצולת מטבח קולומביין שהאזינה לו על loop. חברי הלהקה הדגישו שזה "שיר של תקווה", לא קריאה להתאבדות. השיר מסתיים ב"crescendo" של פסנתר עם תחושת התעוררות חיובית.',
  },
  q021: {
    verified: true,
    sources: [
      wiki('Bullet_with_Butterfly_Wings', 'Bullet with Butterfly Wings'),
      sf('smashing-pumpkins/bullet-with-butterfly-wings', 'Bullet with Butterfly Wings by Smashing Pumpkins'),
    ],
    extendedInfo_he:
      'השיר עוסק בכאב שבא עם להיות כוכב רוק — בילי קורגן ביטא תסכול מהמאבק לשמור על שליטה אומנותית אחרי הצלחה מסחרית. הוא סיפר שכתב את השורה המפורסמת "rat in a cage" ספונטנית: "פשוט ישבתי, משועמם, הרמתי את הגיטרה והתחלתי לשיר". בכוונה דחף את המילים "כמעט לפרודיה" כתגובה לתדמית הקודרת שהתקשורת הצמידה לו. השיר נכלל באלבום הכפול "Mellon Collie and the Infinite Sadness" (אוקטובר 1995).',
  },
  q022: {
    verified: true,
    sources: [
      wiki('Under_the_Bridge', 'Under the Bridge'),
      sf('red-hot-chili-peppers/under-the-bridge', 'Under the Bridge by Red Hot Chili Peppers'),
    ],
    extendedInfo_he:
      'אנתוני קידיס כתב את השורה הראשונה "לפעמים אני מרגיש שאין לי שותף" כשהיה בנהיגה, מרגיש מחוץ לחבורה כי ג\'ון פרושיאנטה ופלי התקרבו זה לזה. הוא היה גם בהרהור על מותו של חברו הילל סלובאק מהתמכרות. הגשר שעליו הוא שר אכן קיים בלוס אנג\'לס במרכז העיר, אבל קידיס שמר את המיקום המדויק בסוד. המפיק ריק רובין מצא את השיר במחברת של קידיס ולחץ עליו לפתח אותו.',
  },
  q023: {
    verified: true,
    explanation_he:
      "השיר נכתב על ידי ג'ון קרטר (לימים אשתו של ג'וני קאש) יחד עם מרל קילגור ב-1962, בתקופה שבה ג'ון התאהבה בג'וני קאש למרות שהיו שניהם נשואים לאחרים. 'טבעת האש' היא מטאפורה לאהבה משתלטת, צורבת ובלתי-נשלטת — ג'ון אמרה: 'אין דרך להיות בגיהינום הזה, אין דרך לכבות להבה ששורפת ושורפת ושורפת'. הגרסה של ג'וני קאש משנת 1963 הפכה לאיקונית.",
    sources: [
      wiki('Ring_of_Fire_(song)', 'Ring of Fire (song)'),
      sf('johnny-cash/ring-of-fire', 'Ring of Fire by Johnny Cash'),
    ],
    extendedInfo_he:
      'הגרסה המקורית הוקלטה בשנת 1962 על ידי אניטה קרטר, אחותה של ג\'ון. ג\'וני קאש הקליט את גרסתו ב-1963 והוסיף את התרועות הטרומפט המיאצקיות שהפכו לסמל. ג\'ון וג\'וני התחתנו רק ב-1968. ביתה של ג\'ון, רוזאן קאש, הדגישה שהשיר מייצג "את כוח הטרנספורמציה של אהבה" יותר מסיפור ביוגרפי ספציפי.',
  },
  q024: {
    verified: true,
    sources: [
      wiki('Slide_(Goo_Goo_Dolls_song)', 'Slide (Goo Goo Dolls song)'),
      {
        url: 'https://americansongwriter.com/the-oft-misinterpreted-meaning-behind-the-goo-goo-dolls-slide-speaks-volumes-today/',
        title: 'The Oft-Misinterpreted Meaning Behind "Slide" — American Songwriter',
        type: 'article',
        accessed: TODAY,
      },
    ],
    extendedInfo_he:
      'בהופעה ב-2002 ב-VH1 Storytellers ג\'ון רז\'זניק הסביר שהשיר עוסק בנערה מתבגרת מסביבה קתולית קפדנית שנכנסת להריון, ויחד עם חברה הם דנים באם להתחתן או לעשות הפלה — "האם אתה רוצה להתחתן או לברוח". בראיון ב-2018 הוא הוסיף שזה מבוסס על ילדותו בבאפלו ועל "תרבות נוקשה עם הרבה דרישות". על המילה "slide" עצמה הוא אמר שזה היה "משהו אקראי שצץ בראש".',
  },
  q025: {
    verified: true,
    sources: [
      wiki('The_One_I_Love_(R.E.M._song)', 'The One I Love (R.E.M. song)'),
      sf('rem/the-one-i-love', 'The One I Love by R.E.M.'),
    ],
    extendedInfo_he:
      'מייקל סטייפ אמר על השיר: "הוא ממש אלים ונוראי. חשבתי שזה יותר מדי. ברוטלי מדי". המילים "פרופ פשוט להעסיק את זמני" מתארות שימוש באדם אחר כמטרה רגשית. על המאזינים שמתעקשים לשמוע בו שיר אהבה הוא אמר ב-2016: "אנשים לא הבינו, אז זה בסדר. עכשיו זה שיר אהבה, אז זה בסדר".',
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
