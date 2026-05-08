#!/usr/bin/env node
// Self-contained statements pass — batch 3: q061-q090
// Rule: every statement must be readable in isolation given only the song
// header (title + artist + year). Fix bare names, pronouns, "the album",
// vague references like "the experience", etc.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const fixed = {
  q061: { // Rocket Man / Elton John
    trueStatements: [
      { text_he: `Rocket Man מבוסס על סיפור קצר של ריי ברדבורי משנת 1951 (מתוך אסופת "האיש המאויר")`, difficulty: 'medium' },
      { text_he: `הסיפור של ברדבורי שעליו מבוסס Rocket Man עוסק באסטרונאוט שעבודתו כולאת אותו רחוק מבני משפחתו`, difficulty: 'hard' },
      { text_he: `ברני טאופין, כותב המילים הקבוע של אלטון ג'ון, שאב את הרעיון ל-Rocket Man בנהיגה ליד בית הוריו`, difficulty: 'medium' },
      { text_he: `ברני טאופין, כותב המילים, הודה בהשראה משיר קודם של Pearls Before Swine על אותו סיפור: "כל הכותבים הם גנבים גדולים"`, difficulty: 'hard' },
      { text_he: `Rocket Man יצא באפריל 1972 מאלבום אלטון ג'ון "Honky Château" והגיע למקום 2 בבריטניה ולמקום 6 בארה"ב`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Rocket Man מבוסס על סיפור של אייזק אסימוב`, difficulty: 'medium' },
      { text_he: `הסיפור שעליו מבוסס Rocket Man עוסק באסטרונאוט הראשון על המאדים`, difficulty: 'hard' },
      { text_he: `ברני טאופין, כותב המילים, שאב השראה ישירה מנחיתת אפולו 11`, difficulty: 'medium' },
      { text_he: `Rocket Man יצא ב-1969 לכבוד הנחיתה הראשונה על הירח`, difficulty: 'easy' },
    ],
  },
  q062: { // Royals / Lorde
    trueStatements: [
      { text_he: `לורד (אלה ילי-אוקונור) כתבה את Royals ביולי 2012 בחופשה בית-ספרית בניו זילנד`, difficulty: 'medium' },
      { text_he: `לורד הייתה בת 15-16 כשכתבה את Royals`, difficulty: 'easy' },
      { text_he: `ההשראה השלילית ל-Royals הגיעה דווקא מאמני היפ-הופ שלורד הקשיבה להם — A$AP Rocky, דרייק, ניקי מינאז' ואחרים`, difficulty: 'medium' },
      { text_he: `לורד ביקרה את אמני ההיפ-הופ על "ההתייחסויות שלהם לאלכוהול יקר ולמכוניות, שלא ייצגו את המציאות שלי"`, difficulty: 'hard' },
      { text_he: `Royals זכה בגראמי לשיר השנה ב-2014`, difficulty: 'easy' },
      { text_he: `לורד הפכה לאמנית הצעירה ביותר שזכתה בקטגוריית שיר השנה בגראמי, על Royals`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `לורד כתבה את Royals באוסטרליה בזמן סיבוב הופעות`, difficulty: 'medium' },
      { text_he: `לורד הייתה בת 19 כשכתבה את Royals`, difficulty: 'easy' },
      { text_he: `ההשראה ל-Royals הגיעה ללורד ממוזיקת הפאנק הבריטית של שנות ה-70`, difficulty: 'medium' },
      { text_he: `Royals זכה בגראמי לאלבום השנה ב-2014`, difficulty: 'medium' },
    ],
  },
  q063: { // Layla / Derek and the Dominos
    trueStatements: [
      { text_he: `אריק קלפטון, מנהיג Derek and the Dominos, התאהב בפאטי בויד באמצע שנות ה-60 כשהיה חבר קרוב של ג'ורג' האריסון, בעלה דאז של בויד`, difficulty: 'medium' },
      { text_he: `Layla נכתב בעקבות סיפורו של "שכבי ומג'נון" — סיפור פרסי קלאסי על אהבה אסורה`, difficulty: 'hard' },
      { text_he: `פאטי בויד התגרשה מג'ורג' האריסון ב-1977`, difficulty: 'medium' },
      { text_he: `פאטי בויד ואריק קלפטון נישאו ב-1979 בהופעה בטוקסון, אריזונה`, difficulty: 'medium' },
      { text_he: `ג'ורג' האריסון לא היה מריר על קלפטון וכן הגיע למסיבת החתונה של בויד וקלפטון`, difficulty: 'hard' },
      { text_he: `פאטי בויד ואריק קלפטון התגרשו ב-1989`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `אריק קלפטון התאהב בפאטי בויד רק בשנות ה-70 כשפגש אותה לראשונה`, difficulty: 'medium' },
      { text_he: `Layla נכתב בעקבות הסיפור של רומיאו ויוליה`, difficulty: 'medium' },
      { text_he: `פאטי בויד ואריק קלפטון נישאו בלונדון בטקס פרטי ב-1977`, difficulty: 'hard' },
      { text_he: `ג'ורג' האריסון פתח בתביעה משפטית נגד קלפטון אחרי הגירושים מבויד`, difficulty: 'medium' },
    ],
  },
  q064: { // Swimming Pools (Drank) / Kendrick Lamar
    trueStatements: [
      { text_he: `Swimming Pools (Drank) יצא ב-31 ביולי 2012`, difficulty: 'easy' },
      { text_he: `Swimming Pools (Drank) הוא סינגל מהאלבום של קנדריק לאמר "good kid, m.A.A.d city"`, difficulty: 'medium' },
      { text_he: `Swimming Pools (Drank) הגיע למקום 17 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `ההפקה של T-Minus ל-Swimming Pools בנויה כך שהאזנה שטחית מתפרשת כשיר חגיגי על שתייה`, difficulty: 'hard' },
      { text_he: `הקשבה צמודה למילי Swimming Pools חושפת שיחה פנימית בין שלוש דמויות בתוך הראש של קנדריק לאמר על האם להמשיך לשתות`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `Swimming Pools (Drank) יצא ב-2014 כסינגל מאלבום קנדריק לאמר "To Pimp a Butterfly"`, difficulty: 'medium' },
      { text_he: `Swimming Pools (Drank) הגיע למקום 1 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `ההפקה של דר. דרי ל-Swimming Pools מובהקת לחלוטין כשיר אלכוהול חגיגי`, difficulty: 'hard' },
      { text_he: `Swimming Pools (Drank) מצוי בדיאלוג ישיר עם אביו של קנדריק לאמר`, difficulty: 'medium' },
    ],
  },
  q065: { // Go Your Own Way / Fleetwood Mac
    trueStatements: [
      { text_he: `לינדזי בקינגהאם וסטיוויי ניקס, חברי Fleetwood Mac, היו זוג בזמן הקלטת אלבום Rumours`, difficulty: 'medium' },
      { text_he: `במקביל לחילוקי הדעות בין בקינגהאם וניקס, גם כריסטין וג'ון מק-וי, חברי Fleetwood Mac, התגרשו ומיק פליטווד היה במשבר נישואים`, difficulty: 'hard' },
      { text_he: `סטיוויי ניקס שנאה את השורה "packing up, shacking up's all you wanna do" ב-Go Your Own Way, שלינדזי בקינגהאם כתב עליה`, difficulty: 'medium' },
      { text_he: `סטיוויי ניקס אמרה על Go Your Own Way: "כל פעם שהמילים האלה היו מגיעות על הבמה, רציתי לרצוח את לינדזי בקינגהאם"`, difficulty: 'easy' },
      { text_he: `אלבום Rumours של Fleetwood Mac, שכלל את Go Your Own Way, יצא ב-1977`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `רק בקינגהאם וניקס היו במשבר זוגיות בזמן Rumours, שאר חברי Fleetwood Mac היו יציבים`, difficulty: 'medium' },
      { text_he: `סטיוויי ניקס אהבה את Go Your Own Way ועזרה ללינדזי בקינגהאם בכתיבתו`, difficulty: 'medium' },
      { text_he: `סטיוויי ניקס דרשה להוסיף שורה משלה ב-Go Your Own Way בתגובה לבקינגהאם`, difficulty: 'hard' },
      { text_he: `אלבום Rumours של Fleetwood Mac יצא ב-1979`, difficulty: 'medium' },
    ],
  },
  q066: { // Dancing in the Dark / Bruce Springsteen
    trueStatements: [
      { text_he: `המפיק ג'ון לאנדאו לחץ על ברוס ספרינגסטין שאלבום Born in the U.S.A. צריך עוד להיט אחד`, difficulty: 'medium' },
      { text_he: `ספרינגסטין הגיב סרקסטית ללאנדאו: "תראה, כתבתי 70 שירים. אם אתה רוצה עוד אחד, תכתוב אותו"`, difficulty: 'hard' },
      { text_he: `למרות התסכול, ספרינגסטין ישב באותו לילה וכתב את Dancing in the Dark`, difficulty: 'medium' },
      { text_he: `הקליפ המפורסם של Dancing in the Dark הוא הופעה חיה בסיינט פול, מינסוטה`, difficulty: 'medium' },
      { text_he: `בקליפ של Dancing in the Dark מופיעה לראשונה השחקנית קורטני קוקס, אז שחקנית בלתי-מוכרת`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `המפיק פיל ספקטור הוא זה שלחץ על ספרינגסטין לכתוב את Dancing in the Dark`, difficulty: 'medium' },
      { text_he: `ברוס ספרינגסטין שמח להזדמנות לכתוב להיט מסחרי כמו Dancing in the Dark`, difficulty: 'medium' },
      { text_he: `הקליפ של Dancing in the Dark הוא הפקת אולפן עם תפאורה מורכבת`, difficulty: 'hard' },
      { text_he: `בקליפ של Dancing in the Dark מופיעה לראשונה ג'ניפר אניסטון`, difficulty: 'easy' },
    ],
  },
  q067: { // Total Eclipse of the Heart / Bonnie Tyler
    trueStatements: [
      { text_he: `ג'ים סטיינמן, כותב Total Eclipse of the Heart, הסביר: "הכל על החושך, על כוח החושך ומקום האהבה בחושך"`, difficulty: 'medium' },
      { text_he: `ג'ים סטיינמן הוסיף על Total Eclipse: "אם מישהו מקשיב למילים, הן ממש כמו שורות ערפדים"`, difficulty: 'hard' },
      { text_he: `המחזמר Nosferatu שעבורו נכתב במקור Total Eclipse of the Heart מעולם לא יצא לדרך`, difficulty: 'hard' },
      { text_he: `ג'ים סטיינמן עצמו ביצע את Total Eclipse ב-1989 בגרסה משלו`, difficulty: 'medium' },
      { text_he: `הזמר מיט לואף הקליט גרסה משלו ל-Total Eclipse of the Heart ב-1996`, difficulty: 'easy' },
      { text_he: `גרסת בוני טיילר ל-Total Eclipse זכתה במקום 1 בבילבורד ל-4 שבועות ב-1983`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `ג'ים סטיינמן כתב את Total Eclipse במקור עבור מחזמר של אנדרו לויד וובר`, difficulty: 'medium' },
      { text_he: `המחזמר Nosferatu שעבורו נכתב Total Eclipse הצליח על ברודווי ב-1985`, difficulty: 'hard' },
      { text_he: `ג'ים סטיינמן מעולם לא הקליט את Total Eclipse בעצמו`, difficulty: 'medium' },
      { text_he: `גרסת בוני טיילר ל-Total Eclipse עמדה רק שבוע אחד במקום 1 בבילבורד`, difficulty: 'medium' },
    ],
  },
  q068: { // Like a Prayer / Madonna
    trueStatements: [
      { text_he: `מרי למברט, במאית הקליפ של Like a Prayer, תיארה את הוויז'ן: "אקסטזה, במיוחד מינית, וכיצד היא קשורה לאקסטזה דתית"`, difficulty: 'medium' },
      { text_he: `חברת פפסי שיחררה פרסומת עם השיר Like a Prayer ביום אחד והייתה צריכה לבטל אותה למחרת אחרי הזעקה הציבורית`, difficulty: 'easy' },
      { text_he: `חברת פפסי נתנה למדונה לשמור את 5 מיליון הדולר שקיבלה על הסכם הפרסומת, "כדי להיפטר מהוויכוח"`, difficulty: 'hard' },
      { text_he: `מדונה הגיבה לסערה סביב Like a Prayer: "אומנות צריכה להיות שנויה במחלוקת, וזהו"`, difficulty: 'medium' },
      { text_he: `הוותיקן גינה את הקליפ של Like a Prayer`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הבמאי דייוויד פינצ'ר ביים את הקליפ של Like a Prayer`, difficulty: 'medium' },
      { text_he: `מדונה החזירה את 5 מיליון הדולר לפפסי בהתנצלות על השערורייה של Like a Prayer`, difficulty: 'medium' },
      { text_he: `מדונה התנצלה פומבית על השערורייה סביב Like a Prayer`, difficulty: 'medium' },
      { text_he: `הוותיקן שיבח את הקליפ של Like a Prayer כיצירת אמנות מודרנית`, difficulty: 'hard' },
    ],
  },
  q069: { // Killing Me Softly / Roberta Flack
    trueStatements: [
      { text_he: `הזמרת לורי ליברמן ראתה את דון מקלין מבצע בהופעה במועדון Troubadour בווסט הוליווד בנובמבר 1971`, difficulty: 'medium' },
      { text_he: `ההשראה הספציפית ל-Killing Me Softly הגיעה דווקא מהשיר "Empty Chairs" של דון מקלין, ולא מ-American Pie`, difficulty: 'hard' },
      { text_he: `לורי ליברמן כתבה הערות על מפית במהלך ההופעה של דון מקלין`, difficulty: 'medium' },
      { text_he: `הכותבים נורמן גימבל וצ'רלס פוקס כתבו את Killing Me Softly בעקבות ההערות של לורי ליברמן ששיתפה איתם`, difficulty: 'hard' },
      { text_he: `רוברטה פלאק שמעה את הגרסה המקורית של Killing Me Softly במטוס וביצעה אותה ב-1973`, difficulty: 'medium' },
      { text_he: `להקת ה-Fugees החזירו את Killing Me Softly לשיא המצעדים בגרסת כיסוי משנת 1996`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `לורי ליברמן ראתה את דון מקלין מבצע בקרנגי הול בניו יורק`, difficulty: 'medium' },
      { text_he: `ההשראה הספציפית ל-Killing Me Softly הגיעה משיר "American Pie" של דון מקלין`, difficulty: 'hard' },
      { text_he: `רוברטה פלאק שמעה את Killing Me Softly ברדיו וביצעה אותו ב-1975`, difficulty: 'medium' },
      { text_he: `להקת ה-Fugees דחו את הצעת הכיסוי של Killing Me Softly בתחילה`, difficulty: 'hard' },
    ],
  },
  q070: { // Purple Rain / Prince
    trueStatements: [
      { text_he: `Purple Rain נכתב לסרט בעל אותו השם משנת 1984`, difficulty: 'easy' },
      { text_he: `הסרט "Purple Rain" זכה באוסקר על פסקול`, difficulty: 'medium' },
      { text_he: `כל בית ב-Purple Rain קשור למערכת יחסים מאתגרת אחרת של דמותו של פרינס בסרט "Purple Rain"`, difficulty: 'hard' },
      { text_he: `הקלטת ההופעה החיה של Purple Rain שנכללה באלבום נעשתה בקלאב First Avenue במיניאפוליס`, difficulty: 'medium' },
      { text_he: `ההקלטה החיה של Purple Rain נעשתה בלילה אחד באוגוסט 1983`, difficulty: 'hard' },
      { text_he: `Purple Rain הגיע למקום 2 בבילבורד`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Purple Rain נכתב במקור לאלבום סולו של פרינס ולא לסרט`, difficulty: 'medium' },
      { text_he: `הסרט "Purple Rain" זכה באוסקר לסרט הבלשי הטוב ביותר`, difficulty: 'medium' },
      { text_he: `הקלטת ההופעה החיה של Purple Rain נעשתה ב-Madison Square Garden בניו יורק`, difficulty: 'hard' },
      { text_he: `Purple Rain הגיע למקום 1 בבילבורד למשך 3 שבועות`, difficulty: 'medium' },
    ],
  },
  q071: { // Sweet Child O' Mine / Guns N' Roses
    trueStatements: [
      { text_he: `אקסל רוז, סולן Guns N' Roses, כתב את מילי Sweet Child O' Mine על חברתו דאז ארין אברלי`, difficulty: 'medium' },
      { text_he: `ארין אברלי, האהובה ב-Sweet Child O' Mine, היא בתו של דון אברלי מהדואו Everly Brothers`, difficulty: 'hard' },
      { text_he: `סלאש, גיטריסט Guns N' Roses, סיפר שניגן את הריף הפותח של Sweet Child O' Mine "תוך שהוא עושה פרצופים לסטיבן אדלר, מתופף Guns N' Roses"`, difficulty: 'medium' },
      { text_he: `סלאש אמר על תהליך יצירת הריף של Sweet Child O' Mine: "תוך שעה תרגיל הגיטרה שלי הפך למשהו אחר"`, difficulty: 'hard' },
      { text_he: `Sweet Child O' Mine הוקלט ב-1987`, difficulty: 'easy' },
      { text_he: `Sweet Child O' Mine הגיע למקום 1 בבילבורד באוגוסט 1988`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `אקסל רוז כתב את מילי Sweet Child O' Mine על אמו`, difficulty: 'medium' },
      { text_he: `ארין אברלי, האהובה ב-Sweet Child O' Mine, היא דוגמנית פלייבוי שאקסל רוז פגש בלוס אנג'לס`, difficulty: 'hard' },
      { text_he: `סלאש המציא את הריף של Sweet Child O' Mine תוך שהוא צופה בסרט`, difficulty: 'medium' },
      { text_he: `Sweet Child O' Mine הוקלט ב-1985`, difficulty: 'easy' },
    ],
  },
  q073: { // Running Up That Hill / Kate Bush
    trueStatements: [
      { text_he: `חברת התקליטים EMI חששה שהכותרת המקורית של השיר, "A Deal with God", תפגע בשידור ברדיו`, difficulty: 'medium' },
      { text_he: `הכותרת של השיר הוחלפה לפשרה: "Running Up That Hill (A Deal with God)"`, difficulty: 'easy' },
      { text_he: `קייט בוש הסבירה: "Running Up That Hill עוסק באי-יכולת של גברים ונשים להבין זה את זה"`, difficulty: 'medium' },
      { text_he: `קייט בוש: "דמיינתי שעל ידי 'עסקה עם אלוהים' גברים ונשים יוכלו להחליף מקומות ולהגיע להבנה גדולה יותר"`, difficulty: 'hard' },
      { text_he: `התחייה של Running Up That Hill, לאחר שימוש בשיר בעונה הרביעית של Stranger Things, הייתה במאי 2022`, difficulty: 'easy' },
      { text_he: `אחרי התחייה ב-Stranger Things, השיר הגיע למקום 1 ב-8 מדינות וצבר מעל מיליארד השמעות בספוטיפיי עד יוני 2023`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הכותרת המקורית של Running Up That Hill הייתה "Cloudbusting"`, difficulty: 'medium' },
      { text_he: `קייט בוש הסבירה ש-Running Up That Hill עוסק בריצה גופנית ובריאות`, difficulty: 'easy' },
      { text_he: `התחייה של Running Up That Hill דרך Stranger Things 4 הייתה בינואר 2023`, difficulty: 'medium' },
      { text_he: `Running Up That Hill הגיע למקום 1 בבילבורד הוט 100 אחרי התחייה ב-Stranger Things`, difficulty: 'hard' },
    ],
  },
  q074: { // Thriller / Michael Jackson
    trueStatements: [
      { text_he: `השחקן וינסנט פרייס סיפר ב-Tonight Show של ג'וני קרסון שנדרש לבחור על שכרו עבור הופעתו ב-Thriller: אחוזים מהמכירות או סכום קבוע של 20,000 דולר`, difficulty: 'hard' },
      { text_he: `וינסנט פרייס בחר בסכום הקבוע — והודה אחר כך ש"יכולתי להרוויח מיליונים"`, difficulty: 'medium' },
      { text_he: `הקליפ של ג'ון לנדיס ל-Thriller, באורך 14 דקות, הפך לעצמו לתופעה תרבותית`, difficulty: 'easy' },
      { text_he: `ג'ון לנדיס, במאי הקליפ של Thriller, היה גם הבמאי של הסרט "An American Werewolf in London"`, difficulty: 'medium' },
      { text_he: `רוד טמפרטון, שהיה כותב לחברת Heatwave, הציע במקור את השם "Starlight" לשיר Thriller`, difficulty: 'hard' },
      { text_he: `מייקל ג'קסון התעקש על השם "Thriller" לשיר`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `וינסנט פרייס בחר באחוזים על Thriller והרוויח מיליונים מההצלחה`, difficulty: 'medium' },
      { text_he: `הקליפ של ג'ון לנדיס ל-Thriller היה באורך 7 דקות`, difficulty: 'easy' },
      { text_he: `רוד טמפרטון הציע במקור את השם "Thriller" לשיר`, difficulty: 'hard' },
      { text_he: `מייקל ג'קסון רצה לקרוא לשיר Thriller בשם "Midnight Madness"`, difficulty: 'medium' },
    ],
  },
  q075: { // Piano Man / Billy Joel
    trueStatements: [
      { text_he: `בילי ג'ואל ניגן בבר Executive Room ברובע ווילשייר בלוס אנג'לס — הבר שעליו מתבסס Piano Man`, difficulty: 'medium' },
      { text_he: `בילי ג'ואל ניגן ב-Executive Room בין 1972 ל-1973, תחת השם הבדוי "ביל מרטין"`, difficulty: 'hard' },
      { text_he: `שמו המלא של בילי ג'ואל הוא ויליאם מרטין ג'ואל — מכאן השם הבדוי "ביל מרטין" שתחתיו ניגן בבר`, difficulty: 'medium' },
      { text_he: `בילי ג'ואל היה צריך לעבוד אבל "לא היה יכול להשתמש בשם הרגיל שלו" בגלל בעיית חוזה`, difficulty: 'hard' },
      { text_he: `כל הדמויות ב-Piano Man — ג'ון הברמן, פול, דייווי — מבוססות על אנשים אמיתיים מבר Executive Room`, difficulty: 'medium' },
      { text_he: `Piano Man הוקלט בספטמבר 1973 ויצא כסינגל בפברואר 1974`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `בילי ג'ואל ניגן בבר במנהטן בין 1968 ל-1970 — הבר שעליו מתבסס Piano Man`, difficulty: 'medium' },
      { text_he: `שמו הבדוי של בילי ג'ואל בעת העבודה בבר היה "ג'ואי פיאנו"`, difficulty: 'hard' },
      { text_he: `הדמויות ב-Piano Man הן בדיוניות לחלוטין`, difficulty: 'medium' },
      { text_he: `Piano Man יצא לראשונה ב-1976`, difficulty: 'easy' },
    ],
  },
  q076: { // You're Beautiful / James Blunt
    trueStatements: [
      { text_he: `ג'יימס בלאנט אמר במפורש: "You're Beautiful הוא לא מה שאנשים חושבים שהוא"`, difficulty: 'easy' },
      { text_he: `ג'יימס בלאנט הסביר את You're Beautiful: "הוא על בחור שמסומם לחלוטין, עוקב אחרי החברה של מישהו אחר"`, difficulty: 'medium' },
      { text_he: `ג'יימס בלאנט אמר ש"צריך להיכלא בכלא" את הדמות הראשית של You're Beautiful`, difficulty: 'medium' },
      { text_he: `ג'יימס בלאנט הוסיף על You're Beautiful: "אם זה מה שאתם חושבים שזה רומנטיקה, אני חושב שאתם די מוזרים"`, difficulty: 'hard' },
      { text_he: `You're Beautiful יצא ב-2004 מאלבום ג'יימס בלאנט "Back to Bedlam"`, difficulty: 'easy' },
      { text_he: `You're Beautiful הגיע למקום 1 בבריטניה ובארה"ב`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `ג'יימס בלאנט הצהיר ש-You're Beautiful אכן רומנטי וכן ביחסיו עם אהובתו`, difficulty: 'medium' },
      { text_he: `ג'יימס בלאנט אמר שהדמות ב-You're Beautiful היא "גיבור רומנטי אמיתי"`, difficulty: 'medium' },
      { text_he: `You're Beautiful יצא ב-2007 מאלבום ג'יימס בלאנט "All the Lost Souls"`, difficulty: 'easy' },
      { text_he: `You're Beautiful הגיע למקום 1 בארה"ב אבל רק למקום 5 בבריטניה`, difficulty: 'hard' },
    ],
  },
  q077: { // Puff the Magic Dragon / Peter, Paul and Mary
    trueStatements: [
      { text_he: `מאמר במגזין Newsweek מ-1964 הציע פרשנות שלפיה Puff the Magic Dragon הוא שיר על מריחואנה`, difficulty: 'medium' },
      { text_he: `לפי הפרשנות הסמית: "Puff" = עישון מריחואנה, "Dragon" = "draggin'" (לקחת שאיפה), "Jackie Paper" = ניירות גלגול`, difficulty: 'hard' },
      { text_he: `Puff the Magic Dragon נאסר בסינגפור ובהונג קונג בגלל החשד שהוא עוסק במריחואנה`, difficulty: 'medium' },
      { text_he: `פיטר יארו, חבר Peter, Paul and Mary וכותב Puff the Magic Dragon יחד עם לני ליפטון, טען: "לא יכולתי לכתוב שיר עם לני על דרקון שיש לו תת-טקסט של גראס בכלל"`, difficulty: 'hard' },
      { text_he: `פיטר יארו טען שלא ידע מה זו מריחואנה ב-1958, השנה שבה נכתבה הגרסה המקורית של Puff`, difficulty: 'medium' },
      { text_he: `Puff the Magic Dragon הופיע בהופעות של Captain Kangaroo כשיר ילדים קלאסי`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `מאמר במגזין Time מ-1968 הציע את הפרשנות הסמית ל-Puff the Magic Dragon`, difficulty: 'medium' },
      { text_he: `Puff the Magic Dragon נאסר בארה"ב למשך שנה שלמה`, difficulty: 'medium' },
      { text_he: `פיטר יארו אישר את הפרשנות הסמית ל-Puff the Magic Dragon בריאיון ב-1985`, difficulty: 'hard' },
      { text_he: `Puff the Magic Dragon נכתב במקור ב-1962, לא ב-1958`, difficulty: 'medium' },
    ],
  },
  q078: { // Shape of You / Ed Sheeran
    trueStatements: [
      { text_he: `במקור Shape of You נכתב במחנה כתיבה כשהזמרת ריהאנה הייתה היעד הראשוני`, difficulty: 'medium' },
      { text_he: `Shape of You נכתב גם עם להקת Little Mix כיעד אפשרי בתחילה`, difficulty: 'hard' },
      { text_he: `אחרי שהוסיפו ל-Shape of You אזכור של ואן מוריסון ("put van the man on the jukebox") הוחלט שהשיר יותר מתאים לאד שירן`, difficulty: 'hard' },
      { text_he: `Shape of You מדגם את "No Scrubs" של TLC`, difficulty: 'medium' },
      { text_he: `הדגימה של "No Scrubs" ב-Shape of You הוסיפה קרדיט לכותבי "No Scrubs"`, difficulty: 'medium' },
      { text_he: `Shape of You הגיע למקום 1 בבילבורד למשך 12 שבועות והפך להיט הגדול של 2017`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `במקור Shape of You נכתב כסינגל לג'סטין ביבר`, difficulty: 'medium' },
      { text_he: `Shape of You מדגם את "Waterfalls" של TLC`, difficulty: 'medium' },
      { text_he: `Shape of You הגיע למקום 1 בבילבורד ל-4 שבועות בלבד`, difficulty: 'medium' },
      { text_he: `אד שירן כתב את Shape of You באולפן יחד עם ריהאנה`, difficulty: 'hard' },
    ],
  },
  q079: { // Gangsta's Paradise / Coolio
    trueStatements: [
      { text_he: `Gangsta's Paradise נכתב במקור עבור הסרט "Dangerous Minds" עם השחקנית מישל פייפר`, difficulty: 'medium' },
      { text_he: `Gangsta's Paradise מבטא את "תחושות הייאוש והנטישה שהרגישו ילדי בית הספר בסרט Dangerous Minds"`, difficulty: 'hard' },
      { text_he: `Gangsta's Paradise דיגם את "Pastime Paradise" של סטיבי וונדר מ-1976`, difficulty: 'medium' },
      { text_he: `סטיבי וונדר זכה בקרדיט שותפות בכתיבת Gangsta's Paradise בגלל הדגימה של "Pastime Paradise"`, difficulty: 'medium' },
      { text_he: `Gangsta's Paradise זכה בגראמי על Best Rap Solo Performance ב-1996`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Gangsta's Paradise נכתב לסרט "Boyz n the Hood" של ג'ון סינגלטון`, difficulty: 'medium' },
      { text_he: `Gangsta's Paradise דיגם את "Superstition" של סטיבי וונדר`, difficulty: 'medium' },
      { text_he: `Gangsta's Paradise זכה בגראמי לשיר השנה ב-1996`, difficulty: 'easy' },
      { text_he: `סטיבי וונדר תבע את קוליו על דגימה לא-מורשית ב-Gangsta's Paradise`, difficulty: 'hard' },
    ],
  },
  q080: { // Smells Like Teen Spirit / Nirvana
    trueStatements: [
      { text_he: `קתלין הנה, סולנית להקת Bikini Kill, ריססה את הביטוי "Kurt smells like Teen Spirit" על קיר חדרו של קורט קוביין, סולן Nirvana`, difficulty: 'hard' },
      { text_he: `הגרפיטי על קיר חדרו של קורט קוביין נעשה אחרי לילה של גרפיטי בסיאטל`, difficulty: 'medium' },
      { text_he: `קורט קוביין חשב שקתלין הנה משבחת את הרוח המהפכנית שלו, ולא ידע ש-Teen Spirit הוא דאודורנט לנערות`, difficulty: 'hard' },
      { text_he: `קורט קוביין גילה ש-Teen Spirit הוא דאודורנט לנערות רק חודשים אחרי יציאת הסינגל Smells Like Teen Spirit`, difficulty: 'medium' },
      { text_he: `קורט קוביין אמר על Smells Like Teen Spirit שהוא "מורכב מרעיונות סותרים — לועג לרעיון של מהפכה אבל גם מאמץ אותו"`, difficulty: 'medium' },
      { text_he: `הבסיסט של Nirvana, קריסט נובוסליץ', אמר: "קורט תיעב את המיינסטרים. זה מה ש-Smells Like Teen Spirit היה — מנטליות של קונפורמיות"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `קתלין הנה, סולנית Bikini Kill, הייתה חברתו של קורט קוביין באותה תקופה`, difficulty: 'hard' },
      { text_he: `קורט קוביין ידע מההתחלה ש-Teen Spirit הוא דאודורנט לנערות`, difficulty: 'medium' },
      { text_he: `קורט קוביין אמר ש-Smells Like Teen Spirit הוא "הצהרה ברורה ואחידה נגד הפופ"`, difficulty: 'medium' },
      { text_he: `הציטוט "מנטליות של קונפורמיות" על Smells Like Teen Spirit אמר דייב גרול ולא נובוסליץ'`, difficulty: 'hard' },
    ],
  },
  q081: { // Seven Nation Army / The White Stripes
    trueStatements: [
      { text_he: `בילדותו בדטרויט, ג'ק ווייט (סולן The White Stripes) שמע את השם "Salvation Army" וחשב שזה "Seven Nation Army"`, difficulty: 'medium' },
      { text_he: `Seven Nation Army מבטא תסכול מהרכילות שמלוותה את העלייה של The White Stripes לפסגות ההצלחה`, difficulty: 'hard' },
      { text_he: `הריף הפותח של Seven Nation Army, מנוגן בגיטרה דרך אפקט אוקטבה (לצליל בס-בריטון), הפך להמנון ספורט ויראלי בעולם`, difficulty: 'medium' },
      { text_he: `הוויראליות של Seven Nation Army במגרשי הספורט החלה באוקטובר 2003`, difficulty: 'hard' },
      { text_he: `אוהדי קלאב ברוז' הבלגי שרו את Seven Nation Army במשחק ליגת האלופות באיטליה — האירוע שהתחיל את התופעה`, difficulty: 'hard' },
      { text_he: `במונדיאל רוסיה 2018, Seven Nation Army היה ההמנון הלא-רשמי של היציעים`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ג'ק ווייט שמע את השם "Seven Nation Army" מסבו ששירת בצבא`, difficulty: 'medium' },
      { text_he: `Seven Nation Army מבטא דעות פוליטיות נגד מלחמת עיראק`, difficulty: 'medium' },
      { text_he: `הוויראליות של Seven Nation Army במגרשי הספורט החלה ב-1999 במונדיאל`, difficulty: 'hard' },
      { text_he: `המשחק הראשון שבו שרו את Seven Nation Army היה משחק של מנצ'סטר יונייטד`, difficulty: 'medium' },
    ],
  },
  q082: { // Stairway to Heaven / Led Zeppelin
    trueStatements: [
      { text_he: `רוברט פלאנט, סולן Led Zeppelin, אישר ש-Stairway to Heaven עוסק ב"אישה שמקבלת את כל מה שהיא רוצה בלי לתת חזרה כלום"`, difficulty: 'medium' },
      { text_he: `הטאבו על ניגון הריף הפותח של Stairway to Heaven בחנויות גיטרות הונצח בסרט "Wayne's World" משנת 1992`, difficulty: 'medium' },
      { text_he: `בסרט "Wayne's World" מופיע שלט "NO Stairway To Heaven", ווין מצביע עליו ואומר "אין מדרגות. נדחה"`, difficulty: 'hard' },
      { text_he: `בגלל סיבוכי רישוי על השיר Stairway to Heaven, סרט "Wayne's World" החליף את הריף ב"משהו לא-מובן" בפרסומים מאוחרים יותר`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `רוברט פלאנט אישר ש-Stairway to Heaven עוסק במסע רוחני אמיתי שלו לטיבט`, difficulty: 'medium' },
      { text_he: `הטאבו על ניגון הריף של Stairway to Heaven הונצח בסרט "Almost Famous" של קמרון קרואו`, difficulty: 'hard' },
      { text_he: `בסרט "Wayne's World" השלט אומר "PLAY Stairway To Heaven"`, difficulty: 'medium' },
      { text_he: `בכל הפרסומים של "Wayne's World" יש את הריף המקורי של Stairway to Heaven`, difficulty: 'medium' },
    ],
  },
  q083: { // Heroes / David Bowie
    trueStatements: [
      { text_he: `דייוויד בואי דיבר על ההופעה שלו ליד חומת ברלין ב-1987 שבה ביצע את Heroes: "הייתה אחת ההופעות הרגשיות ביותר שעשיתי. הייתי בדמעות"`, difficulty: 'medium' },
      { text_he: `הופעת Heroes של דייוויד בואי בברלין 1987 הייתה "הופעה כפולה" — חומת ברלין שימשה כתפאורה והקול עבר לצד המזרחי`, difficulty: 'hard' },
      { text_he: `דייוויד בואי ראה במו עיניו "אלפים מהצד המזרחי של החומה התקרבו לחומה" כדי לשמוע אותו מבצע את Heroes`, difficulty: 'hard' },
      { text_he: `דייוויד בואי שמע את ההמונים מהצד המזרחי של החומה "מריעים ושרים יחד" איתו את Heroes`, difficulty: 'medium' },
      { text_he: `כשדייוויד בואי נפטר ב-2016, משרד החוץ הגרמני צייץ "להתראות, דייוויד בואי. אתה עכשיו בין הגיבורים. תודה שעזרת להפיל את החומה"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `דייוויד בואי הצהיר שההופעה שלו ליד חומת ברלין הייתה "סתמית כמו כל הופעה אחרת"`, difficulty: 'medium' },
      { text_he: `משרד החוץ הגרמני הזניח את מותו של דייוויד בואי ב-2016`, difficulty: 'medium' },
      { text_he: `דייוויד בואי לא ידע אם המזרחים שמעו את ההופעה שלו ליד חומת ברלין`, difficulty: 'hard' },
      { text_he: `הופעת Heroes של דייוויד בואי בברלין הייתה ב-1989, יום אחרי שנפלה החומה`, difficulty: 'medium' },
    ],
  },
  q084: { // Toxic / Britney Spears
    trueStatements: [
      { text_he: `בריטני ספירס הסבירה: "Toxic בעצם על נערה מכורה לבחור... הנערה הרעה הזאת תעשה הכל כדי לקבל מה שהיא רוצה"`, difficulty: 'medium' },
      { text_he: `ההוק האסיאתי המפורסם ב-Toxic הוא דגימה מהשיר ההודי "Tere Mere Beech Mein"`, difficulty: 'hard' },
      { text_he: `המקור של ההוק ב-Toxic, השיר "Tere Mere Beech Mein", הוא מהסרט הבוליוודי "Ek Duuje Ke Liye" משנת 1981`, difficulty: 'hard' },
      { text_he: `Toxic יצא ב-13 בינואר 2004 מאלבום בריטני ספירס "In the Zone"`, difficulty: 'medium' },
      { text_he: `ההפקה של הצמד השוודי Bloodshy & Avant ל-Toxic שילבה מיתרים בוליוודיים, חליליות ובס-באס`, difficulty: 'medium' },
      { text_he: `Toxic זכה בגראמי על Best Dance Recording ב-2005 — הזכייה הראשונה של בריטני ספירס בגראמי`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ההוק האסיאתי ב-Toxic הוא דגימה מסרט בוליווד משנת 1947`, difficulty: 'hard' },
      { text_he: `Toxic יצא ב-2005 מאלבום בריטני ספירס "Blackout"`, difficulty: 'medium' },
      { text_he: `ההפקה של מקס מרטין ל-Toxic שילבה את ההוק הבוליוודי`, difficulty: 'medium' },
      { text_he: `Toxic זכה בגראמי לשיר השנה ב-2005`, difficulty: 'medium' },
    ],
  },
  q085: { // SOS / ABBA
    trueStatements: [
      { text_he: `שם העבודה של SOS היה "Turn Me On"`, difficulty: 'medium' },
      { text_he: `הכותרת הסופית "SOS" נטבעה על ידי מנהל ABBA, סטיג אנדרסון`, difficulty: 'hard' },
      { text_he: `המטרה של הכותרת "SOS" הייתה לתת ל-SOS תחושת דחיפות רגשית`, difficulty: 'medium' },
      { text_he: `אגנתה פלטסקוג, חברת ABBA, שרה את הקול הראשי ב-SOS`, difficulty: 'medium' },
      { text_he: `חברי ABBA אמרו שעם SOS הם מצאו לראשונה את הזהות שלהם כלהקת פופ`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `שם העבודה של SOS היה "Help Me"`, difficulty: 'medium' },
      { text_he: `הכותרת "SOS" נבחרה על ידי בני אנדרסון, חבר ABBA`, difficulty: 'hard' },
      { text_he: `אנני-פריד (פרידה) לינגסטד היא ששרה את הקול הראשי ב-SOS`, difficulty: 'medium' },
      { text_he: `SOS היה הסינגל האחרון של ABBA לפני הפיזור`, difficulty: 'easy' },
    ],
  },
  q086: { // Wonderwall / Oasis
    trueStatements: [
      { text_he: `נואל גלאגר, גיטריסט וכותב השירים של Oasis, אמר ל-NME ב-1996 ש-Wonderwall נכתב על חברתו דאז (ולימים אשתו) מג מתיוס`, difficulty: 'medium' },
      { text_he: `אחרי הגירושים של נואל גלאגר ומג מתיוס ב-2001, נואל הבהיר ב-Q Magazine שהמשמעות של Wonderwall שונה`, difficulty: 'hard' },
      { text_he: `נואל גלאגר אמר על Wonderwall: "המשמעות של השיר נלקחה ממני על ידי התקשורת"`, difficulty: 'medium' },
      { text_he: `נואל גלאגר הסביר ש-Wonderwall "על חבר דמיוני שיבוא להציל אותך מעצמך"`, difficulty: 'easy' },
      { text_he: `נואל גלאגר אמר שהיה לו קשה לתקן את הסיפור על Wonderwall אחרי שהוא כבר נכתב`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `נואל גלאגר אמר מהיום הראשון ש-Wonderwall על חבר דמיוני`, difficulty: 'medium' },
      { text_he: `נואל גלאגר ומג מתיוס מעולם לא נישאו`, difficulty: 'medium' },
      { text_he: `נואל גלאגר הצהיר ש-Wonderwall נכתב על אחיו ליאם`, difficulty: 'medium' },
      { text_he: `נואל גלאגר אמר ש-Wonderwall עוסק ב"מציאות גדולה יותר מאהבה אנושית"`, difficulty: 'hard' },
    ],
  },
  q087: { // No Woman, No Cry / Bob Marley
    trueStatements: [
      { text_he: `הקרדיט הרשמי לכתיבת No Woman, No Cry ניתן לוינסנט פורד, חבר של בוב מארלי`, difficulty: 'medium' },
      { text_he: `וינסנט פורד ניהל מטבח חינמי בטרנצ'טאון, השיכון בקינגסטון בו בוב מארלי גדל בעוני`, difficulty: 'hard' },
      { text_he: `בוב מארלי אמר שבלעדי המטבח של פורד בטרנצ'טאון הוא היה גווע ברעב`, difficulty: 'medium' },
      { text_he: `ההערכה היא שבוב מארלי שיתף את הקרדיט עם וינסנט פורד כדי לעקוף הגבלות חוזה`, difficulty: 'hard' },
      { text_he: `התמלוגים מ-No Woman, No Cry אפשרו לוינסנט פורד להמשיך את פעילות הצדקה שלו במטבח טרנצ'טאון`, difficulty: 'medium' },
      { text_he: `בשיר No Woman, No Cry בוב מארלי מזכיר את "Government Yards in Trenchtown"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הקרדיט הרשמי לכתיבת No Woman, No Cry ניתן לאשתו של בוב מארלי, ריטה`, difficulty: 'medium' },
      { text_he: `וינסנט פורד היה הגיטריסט הראשון של בוב מארלי`, difficulty: 'hard' },
      { text_he: `בוב מארלי שיתף את הקרדיט על No Woman, No Cry כי וינסנט פורד באמת כתב את השיר`, difficulty: 'medium' },
      { text_he: `בשיר No Woman, No Cry בוב מארלי מזכיר את שכונת קינגסטון העשירה`, difficulty: 'easy' },
    ],
  },
  q088: { // Gold Digger / Kanye West
    trueStatements: [
      { text_he: `הפזמון של Gold Digger בביצוע ג'יימי פוקס הוא אינטרפולציה של "I Got a Woman" של ריי צ'ארלס מ-1954`, difficulty: 'medium' },
      { text_he: `המקור של "I Got a Woman" — הבסיס לפזמון Gold Digger — נכתב על ידי Renald Richard`, difficulty: 'hard' },
      { text_he: `Gold Digger מספר על "גבר שחור שעוזב אישה שחורה למען בחורה לבנה אחרי שהוא מתעשר"`, difficulty: 'medium' },
      { text_he: `Gold Digger יצא ביולי 2005`, difficulty: 'easy' },
      { text_he: `Gold Digger הגיע למקום 1 בבילבורד למשך 10 שבועות`, difficulty: 'medium' },
      { text_he: `Gold Digger נכלל באלבום קניה ווסט "Late Registration"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הפזמון של Gold Digger הוא דגימה מהשיר "What I'd Say" של ריי צ'ארלס`, difficulty: 'medium' },
      { text_he: `Gold Digger יצא ב-2003 כסינגל מאלבום קניה ווסט "The College Dropout"`, difficulty: 'medium' },
      { text_he: `Gold Digger הגיע למקום 1 בבילבורד למשך 3 שבועות בלבד`, difficulty: 'hard' },
      { text_he: `Gold Digger נכלל באלבום קניה ווסט "Graduation" מ-2007`, difficulty: 'medium' },
    ],
  },
  q089: { // Basket Case / Green Day
    trueStatements: [
      { text_he: `בילי ג'ו ארמסטרונג, סולן Green Day, כתב את Basket Case במקור כשיר אהבה בסביבות 1992-93`, difficulty: 'medium' },
      { text_he: `אחר כך שכתב בילי ג'ו ארמסטרונג את מילי Basket Case סביב חוויות התקפי הפניקה האישיים שלו`, difficulty: 'hard' },
      { text_he: `Basket Case תיעד את הבלבול והאי-וודאות של מי שחווה התקפי פניקה ולא מבין מה קורה לו`, difficulty: 'medium' },
      { text_he: `Basket Case עזר למאזינים רבים לזהות אצל עצמם תסמינים של התקפי פניקה`, difficulty: 'medium' },
      { text_he: `Basket Case יצא ב-1 באוגוסט 1994 כסינגל השני מאלבום Green Day "Dookie"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `בילי ג'ו ארמסטרונג כתב את Basket Case מההתחלה ישירות על התקפי הפאניקה שלו`, difficulty: 'medium' },
      { text_he: `Basket Case יצא ב-1995 כסינגל מאלבום Green Day "Insomniac"`, difficulty: 'medium' },
      { text_he: `הסינגל הראשון מאלבום Green Day "Dookie" היה Basket Case`, difficulty: 'hard' },
      { text_he: `בילי ג'ו ארמסטרונג כתב את Basket Case במיוחד עבור קמפיין מודעות לבריאות הנפש`, difficulty: 'medium' },
    ],
  },
  q090: { // Paranoid Android / Radiohead
    trueStatements: [
      { text_he: `החוויה הספציפית של תום יורק, סולן Radiohead, שעוררה את כתיבת Paranoid Android התרחשה בבר בלוס אנג'לס בתקופת סיבוב ההופעות בארה"ב`, difficulty: 'hard' },
      { text_he: `תום יורק היה מוקף באנשים מסוממים בקוקאין באותו בר שעורר את Paranoid Android`, difficulty: 'medium' },
      { text_he: `תום יורק פחד מאישה שהפכה אלימה אחרי שמישהו שפך עליה משקה — חוויה שהובילה לכתיבת Paranoid Android`, difficulty: 'medium' },
      { text_he: `שם השיר Paranoid Android נלקח מ"מרווין הרובוט הפרנואיד" מתוך הספר "מדריך הטרמפיסט לגלקסיה" של דאגלס אדאמס`, difficulty: 'medium' },
      { text_he: `Paranoid Android הוא באורך 6:23 דקות`, difficulty: 'medium' },
      { text_he: `Paranoid Android יצא ב-26 במאי 1997 כסינגל הראשון מאלבום Radiohead "OK Computer"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `החוויה שעוררה את Paranoid Android הייתה במלון בניו יורק במהלך סיבוב הופעות אירופי`, difficulty: 'hard' },
      { text_he: `שם השיר Paranoid Android מתייחס לסרט "Blade Runner"`, difficulty: 'medium' },
      { text_he: `Paranoid Android הוא באורך 4:30 דקות`, difficulty: 'medium' },
      { text_he: `Paranoid Android יצא ב-1995, לפני אלבום OK Computer`, difficulty: 'easy' },
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
