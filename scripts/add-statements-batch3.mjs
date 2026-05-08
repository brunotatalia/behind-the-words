#!/usr/bin/env node
// Batch 3: q062-q092 (30 questions, q072 missing)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const statements = {
  q062: { // Royals / Lorde
    trueStatements: [
      { text_he: `לורד (אלה ילי-אוקונור) כתבה את השיר ביולי 2012 בחופשה בית-ספרית בניו זילנד`, difficulty: 'medium' },
      { text_he: `לורד הייתה בת 15-16 כשכתבה את השיר`, difficulty: 'easy' },
      { text_he: `ההשראה השלילית הגיעה דווקא מאמני היפ-הופ שהיא הקשיבה להם — A$AP Rocky, דרייק, ניקי מינאז' ואחרים`, difficulty: 'medium' },
      { text_he: `לורד ביקרה את "ההתייחסויות שלהם לאלכוהול יקר ולמכוניות שלא ייצגו את המציאות שלי"`, difficulty: 'hard' },
      { text_he: `השיר זכה בגראמי לשיר השנה ב-2014`, difficulty: 'easy' },
      { text_he: `לורד הפכה לאמנית הצעירה ביותר שזכתה בקטגוריית שיר השנה בגראמי`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `לורד כתבה את השיר באוסטרליה בזמן סיבוב הופעות`, difficulty: 'medium' },
      { text_he: `לורד הייתה בת 19 כשכתבה את השיר`, difficulty: 'easy' },
      { text_he: `ההשראה הגיעה לה ממוזיקת הפאנק הבריטית של שנות ה-70`, difficulty: 'medium' },
      { text_he: `השיר זכה בגראמי לאלבום השנה ב-2014`, difficulty: 'easy' },
    ],
  },
  q063: { // Layla / Derek and the Dominos
    trueStatements: [
      { text_he: `קלפטון התאהב בפאטי בויד באמצע שנות ה-60 כשהיה חבר קרוב של ג'ורג' האריסון`, difficulty: 'easy' },
      { text_he: `השיר נכתב בעקבות סיפורו של "שכבי ומג'נון" — סיפור פרסי קלאסי על אהבה אסורה`, difficulty: 'hard' },
      { text_he: `פאטי בויד התגרשה מהאריסון ב-1977`, difficulty: 'medium' },
      { text_he: `בויד וקלפטון נישאו ב-1979 בהופעה בטוקסון, אריזונה`, difficulty: 'hard' },
      { text_he: `האריסון לא היה מריר וכן הגיע למסיבת החתונה`, difficulty: 'easy' },
      { text_he: `בויד וקלפטון התגרשו ב-1989`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `קלפטון התאהב בפאטי בויד רק בשנות ה-70 כשפגש אותה לראשונה`, difficulty: 'easy' },
      { text_he: `השיר נכתב בעקבות הסיפור של רומיאו ויוליה`, difficulty: 'hard' },
      { text_he: `בויד וקלפטון נישאו בלונדון בטקס פרטי ב-1977`, difficulty: 'hard' },
      { text_he: `האריסון פתח בתביעה משפטית נגד קלפטון אחרי הגירושים`, difficulty: 'easy' },
    ],
  },
  q064: { // Swimming Pools (Drank) / Kendrick Lamar
    trueStatements: [
      { text_he: `השיר יצא ב-31 ביולי 2012`, difficulty: 'medium' },
      { text_he: `השיר הוא סינגל מהאלבום "good kid, m.A.A.d city"`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 17 בבילבורד`, difficulty: 'hard' },
      { text_he: `ההפקה של T-Minus בנויה כך שהאזנה שטחית מתפרשת כשיר חגיגי`, difficulty: 'hard' },
      { text_he: `הקשבה למילים חושפת שיחה פנימית בין שלוש דמויות בתוך הראש של לאמר על האם להמשיך לשתות`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-2014 כסינגל מאלבום "To Pimp a Butterfly"`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 1 בבילבורד`, difficulty: 'medium' },
      { text_he: `ההפקה של דר. דרי מובהקת לחלוטין כשיר אלכוהול חגיגי`, difficulty: 'hard' },
      { text_he: `השיר מצוי בדיאלוג ישיר עם אבא של לאמר`, difficulty: 'medium' },
    ],
  },
  q065: { // Go Your Own Way / Fleetwood Mac
    trueStatements: [
      { text_he: `בקינגהאם וניקס היו זוג ב-Fleetwood Mac בזמן הקלטת אלבום Rumours`, difficulty: 'easy' },
      { text_he: `במקביל לרומורס, גם כריסטין וג'ון מק-וי התגרשו ומיק פליטווד היה במשבר נישואים`, difficulty: 'medium' },
      { text_he: `סטיוויי ניקס שנאה את השורה "packing up, shacking up's all you wanna do"`, difficulty: 'medium' },
      { text_he: `ניקס אמרה: "כל פעם שהמילים האלה היו מגיעות על הבמה, רציתי לרצוח אותו"`, difficulty: 'hard' },
      { text_he: `אלבום Rumours יצא ב-1977`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `רק בקינגהאם וניקס היו במשבר זוגיות בזמן Rumours, שאר הלהקה היו יציבים`, difficulty: 'easy' },
      { text_he: `ניקס אהבה את השיר ועזרה לבקינגהאם בכתיבתו`, difficulty: 'medium' },
      { text_he: `סטיוויי ניקס דרשה להוסיף שורה משלה בתגובה`, difficulty: 'hard' },
      { text_he: `אלבום Rumours יצא ב-1979`, difficulty: 'easy' },
    ],
  },
  q066: { // Dancing in the Dark / Bruce Springsteen
    trueStatements: [
      { text_he: `המפיק ג'ון לאנדאו לחץ על ספרינגסטין שהאלבום צריך להיט`, difficulty: 'medium' },
      { text_he: `ספרינגסטין הגיב סרקסטית: "תראה, כתבתי 70 שירים. אם אתה רוצה עוד אחד, תכתוב אותו"`, difficulty: 'hard' },
      { text_he: `למרות התסכול, ספרינגסטין ישב באותו לילה וכתב את השיר`, difficulty: 'easy' },
      { text_he: `הקליפ המפורסם הוא הופעה חיה בסיינט פול`, difficulty: 'medium' },
      { text_he: `בקליפ מופיעה לראשונה קורטני קוקס, אז שחקנית בלתי-מוכרת`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `המפיק פיל ספקטור הוא זה שלחץ על ספרינגסטין לכתוב להיט`, difficulty: 'medium' },
      { text_he: `ספרינגסטין שמח להזדמנות לכתוב להיט מסחרי`, difficulty: 'easy' },
      { text_he: `הקליפ המפורסם הוא הפקת אולפן עם תפאורה מורכבת`, difficulty: 'medium' },
      { text_he: `בקליפ מופיעה לראשונה ג'ניפר אניסטון`, difficulty: 'hard' },
    ],
  },
  q067: { // Total Eclipse of the Heart / Bonnie Tyler
    trueStatements: [
      { text_he: `סטיינמן הסביר: "הכל על החושך, על כוח החושך ומקום האהבה בחושך"`, difficulty: 'medium' },
      { text_he: `סטיינמן הוסיף: "אם מישהו מקשיב למילים, הן ממש כמו שורות ערפדים"`, difficulty: 'hard' },
      { text_he: `המחזמר Nosferatu שעבורו נכתב במקור השיר מעולם לא יצא לדרך`, difficulty: 'easy' },
      { text_he: `סטיינמן עצמו ביצע את השיר ב-1989 בגרסה משלו`, difficulty: 'hard' },
      { text_he: `מיט לואף הקליט אותו ב-1996`, difficulty: 'medium' },
      { text_he: `גרסת בוני טיילר זכתה במקום 1 בבילבורד ל-4 שבועות ב-1983`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `סטיינמן כתב את השיר במקור עבור מחזמר על אנדרו לויד וובר`, difficulty: 'easy' },
      { text_he: `המחזמר Nosferatu הצליח על ברודווי ב-1985`, difficulty: 'medium' },
      { text_he: `סטיינמן מעולם לא הקליט את השיר בעצמו`, difficulty: 'hard' },
      { text_he: `גרסת בוני טיילר עמדה רק שבוע אחד במקום 1 בבילבורד`, difficulty: 'medium' },
    ],
  },
  q068: { // Like a Prayer / Madonna
    trueStatements: [
      { text_he: `הבמאית מרי למברט תיארה את הוויז'ן של הקליפ: "אקסטזה, במיוחד מינית, וכיצד היא קשורה לאקסטזה דתית"`, difficulty: 'medium' },
      { text_he: `פפסי שיחררה פרסומת עם השיר ביום אחד והייתה צריכה לבטל אותה למחרת אחרי הזעקה הציבורית`, difficulty: 'easy' },
      { text_he: `פפסי נתנה למדונה לשמור את ה-5 מיליון דולר שלה כדי "להיפטר מהוויכוח"`, difficulty: 'hard' },
      { text_he: `מדונה הגיבה: "אומנות צריכה להיות שנויה במחלוקת, וזהו"`, difficulty: 'easy' },
      { text_he: `הוותיקן גינה את הקליפ`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הבמאי דייוויד פינצ'ר ביים את הקליפ`, difficulty: 'medium' },
      { text_he: `מדונה החזירה את ה-5 מיליון דולר לפפסי בהתנצלות`, difficulty: 'hard' },
      { text_he: `מדונה התנצלה פומבית על השערורייה`, difficulty: 'easy' },
      { text_he: `הוותיקן שיבח את הקליפ כיצירת אמנות מודרנית`, difficulty: 'medium' },
    ],
  },
  q069: { // Killing Me Softly / Roberta Flack
    trueStatements: [
      { text_he: `לורי ליברמן ראתה את דון מקלין בנובמבר 1971 במועדון Troubadour בווסט הוליווד`, difficulty: 'medium' },
      { text_he: `ההשראה הספציפית הגיעה דווקא מהשיר "Empty Chairs" של מקלין, ולא מ-American Pie`, difficulty: 'hard' },
      { text_he: `ליברמן כתבה הערות על מפית במהלך ההופעה`, difficulty: 'easy' },
      { text_he: `נורמן גימבל וצ'רלס פוקס כתבו את השיר בעקבות שיתוף ההערות איתם`, difficulty: 'medium' },
      { text_he: `רוברטה פלאק שמעה את השיר במטוס וביצעה אותו ב-1973`, difficulty: 'hard' },
      { text_he: `הפיוג'יס החזירו את השיר לשיא ב-1996`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `לורי ליברמן ראתה את דון מקלין בקרנגי הול בניו יורק`, difficulty: 'medium' },
      { text_he: `ההשראה הספציפית הגיעה משיר "American Pie" של מקלין`, difficulty: 'hard' },
      { text_he: `רוברטה פלאק שמעה את השיר ברדיו וביצעה אותו ב-1975`, difficulty: 'hard' },
      { text_he: `הפיוג'יס דחו את הצעת הכיסוי בתחילה`, difficulty: 'easy' },
    ],
  },
  q070: { // Purple Rain / Prince
    trueStatements: [
      { text_he: `השיר נכתב לסרט בעל אותו השם (1984)`, difficulty: 'easy' },
      { text_he: `הסרט "Purple Rain" זכה באוסקר על פסקול`, difficulty: 'medium' },
      { text_he: `כל בית בשיר קשור למערכת יחסים מאתגרת אחרת של דמותו של פרינס בסרט`, difficulty: 'hard' },
      { text_he: `הקלטת ההופעה החיה שנכללה באלבום נעשתה בקלאב First Avenue במיניאפוליס`, difficulty: 'hard' },
      { text_he: `ההקלטה החיה נעשתה בלילה אחד באוגוסט 1983`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 2 בבילבורד`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר נכתב במקור לאלבום סולו ולא לסרט`, difficulty: 'easy' },
      { text_he: `הסרט "Purple Rain" זכה באוסקר על סרט בלשי הטוב`, difficulty: 'medium' },
      { text_he: `ההקלטה החיה נעשתה ב-Madison Square Garden בניו יורק`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 1 בבילבורד למשך 3 שבועות`, difficulty: 'easy' },
    ],
  },
  q071: { // Sweet Child O' Mine / Guns N' Roses
    trueStatements: [
      { text_he: `אקסל רוז כתב את המילים על חברתו דאז ארין אברלי`, difficulty: 'easy' },
      { text_he: `ארין אברלי היא בתו של דון אברלי מהדואו האברלי בראדרס`, difficulty: 'hard' },
      { text_he: `סלאש סיפר שניגן את הריף "תוך שהוא עושה פרצופים לסטיבן אדלר" המתופף`, difficulty: 'medium' },
      { text_he: `סלאש אמר: "תוך שעה תרגיל הגיטרה שלי הפך למשהו אחר"`, difficulty: 'hard' },
      { text_he: `השיר הוקלט ב-1987`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 בבילבורד באוגוסט 1988`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `אקסל רוז כתב את המילים על אמו`, difficulty: 'easy' },
      { text_he: `ארין אברלי היא דוגמנית פלייבוי שאקסל פגש בלוס אנג'לס`, difficulty: 'hard' },
      { text_he: `סלאש המציא את הריף תוך שהוא צופה בסרט`, difficulty: 'medium' },
      { text_he: `השיר הוקלט ב-1985`, difficulty: 'medium' },
    ],
  },
  q073: { // Running Up That Hill / Kate Bush
    trueStatements: [
      { text_he: `EMI חששו שהכותרת המקורית "A Deal with God" תפגע בשידור ברדיו`, difficulty: 'medium' },
      { text_he: `הכותרת הוחלפה ל-"Running Up That Hill (A Deal with God)"`, difficulty: 'easy' },
      { text_he: `בוש הסבירה: "השיר עוסק באי-יכולת של גברים ונשים להבין זה את זה"`, difficulty: 'medium' },
      { text_he: `בוש: "דמיינתי שעל ידי 'עסקה עם אלוהים' הם יוכלו להחליף מקומות ולהגיע להבנה גדולה יותר"`, difficulty: 'hard' },
      { text_he: `התחייה ב-Stranger Things 4 הייתה במאי 2022`, difficulty: 'easy' },
      { text_he: `אחרי התחייה, השיר הגיע למקום 1 ב-8 מדינות וצבר מעל מיליארד השמעות בספוטיפיי עד יוני 2023`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הכותרת המקורית הייתה "Cloudbusting"`, difficulty: 'medium' },
      { text_he: `בוש הסבירה שהשיר עוסק בריצה גופנית ובריאות`, difficulty: 'medium' },
      { text_he: `התחייה ב-Stranger Things 4 הייתה בינואר 2023`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 1 בבילבורד הוט 100 אחרי התחייה`, difficulty: 'hard' },
    ],
  },
  q074: { // Thriller / Michael Jackson
    trueStatements: [
      { text_he: `וינסנט פרייס סיפר ב-Tonight Show של ג'וני קרסון שנדרש לבחור בין אחוזים מהמכירות לבין סכום קבוע של 20,000 דולר`, difficulty: 'medium' },
      { text_he: `פרייס בחר בסכום הקבוע — והודה אחר כך ש"יכולתי להרוויח מיליונים"`, difficulty: 'easy' },
      { text_he: `הקליפ של ג'ון לנדיס באורך 14 דקות הפך לעצמו לתופעה תרבותית`, difficulty: 'medium' },
      { text_he: `ג'ון לנדיס היה גם הבמאי של הסרט "An American Werewolf in London"`, difficulty: 'hard' },
      { text_he: `רוד טמפרטון, שהיה כותב לחברת Heatwave, הציע במקור את השם "Starlight"`, difficulty: 'hard' },
      { text_he: `מייקל ג'קסון התעקש על השם "Thriller"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `וינסנט פרייס בחר באחוזים והרוויח מיליונים מההצלחה`, difficulty: 'medium' },
      { text_he: `הקליפ של ג'ון לנדיס באורך 7 דקות`, difficulty: 'medium' },
      { text_he: `רוד טמפרטון הציע במקור את השם "Thriller"`, difficulty: 'hard' },
      { text_he: `מייקל ג'קסון רצה לקרוא לשיר "Midnight Madness"`, difficulty: 'hard' },
    ],
  },
  q075: { // Piano Man / Billy Joel
    trueStatements: [
      { text_he: `בילי ג'ואל ניגן ב-Executive Room ברובע ווילשייר בלוס אנג'לס`, difficulty: 'medium' },
      { text_he: `הוא ניגן שם בין 1972 ל-1973 תחת השם "ביל מרטין"`, difficulty: 'hard' },
      { text_he: `שמו המלא של בילי הוא ויליאם מרטין ג'ואל`, difficulty: 'medium' },
      { text_he: `ג'ואל היה צריך לעבוד אבל "לא היה יכול להשתמש בשם הרגיל שלו"`, difficulty: 'easy' },
      { text_he: `כל הדמויות בשיר — ג'ון הברמן, פול, דייווי — מבוססות על אנשים אמיתיים מהבר`, difficulty: 'easy' },
      { text_he: `השיר הוקלט בספטמבר 1973 ויצא כסינגל בפברואר 1974`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `בילי ג'ואל ניגן בבר במנהטן בין 1968 ל-1970`, difficulty: 'medium' },
      { text_he: `שמו הבדוי בעת העבודה היה "ג'ואי פיאנו"`, difficulty: 'hard' },
      { text_he: `הדמויות בשיר הן בדיוניות לחלוטין`, difficulty: 'easy' },
      { text_he: `השיר יצא לראשונה ב-1976`, difficulty: 'easy' },
    ],
  },
  q076: { // You're Beautiful / James Blunt
    trueStatements: [
      { text_he: `בלאנט אמר במפורש: "השיר הוא לא מה שאנשים חושבים שהוא"`, difficulty: 'easy' },
      { text_he: `בלאנט הסביר: "הוא על בחור שמסומם לחלוטין, עוקב אחרי החברה של מישהו אחר"`, difficulty: 'medium' },
      { text_he: `בלאנט אמר ש"צריך להיכלא בכלא" את הדמות בשיר`, difficulty: 'hard' },
      { text_he: `בלאנט הוסיף: "אם זה מה שאתם חושבים שזה רומנטיקה, אני חושב שאתם די מוזרים"`, difficulty: 'medium' },
      { text_he: `השיר יצא ב-2004 מהאלבום "Back to Bedlam"`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 בבריטניה ובארה"ב`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `בלאנט הצהיר שהשיר אכן רומנטי וכן ביחסיו עם אהובתו`, difficulty: 'easy' },
      { text_he: `בלאנט אמר שהדמות בשיר היא "גיבור רומנטי אמיתי"`, difficulty: 'medium' },
      { text_he: `השיר יצא ב-2007 מהאלבום "All the Lost Souls"`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 בארה"ב אבל רק למקום 5 בבריטניה`, difficulty: 'easy' },
    ],
  },
  q077: { // Puff the Magic Dragon / Peter, Paul and Mary
    trueStatements: [
      { text_he: `מאמר ב-Newsweek מ-1964 הציע את הפרשנות הסמית`, difficulty: 'medium' },
      { text_he: `לפי הפרשנות: "Puff" = עישון מריחואנה, "Dragon" = "draggin'" (לקחת שאיפה), "Jackie Paper" = ניירות גלגול`, difficulty: 'easy' },
      { text_he: `השיר נאסר בסינגפור ובהונג קונג בגלל החשד`, difficulty: 'hard' },
      { text_he: `פיטר יארו טען: "לא יכולתי לכתוב שיר עם לני על דרקון שיש לו תת-טקסט של גראס בכלל"`, difficulty: 'medium' },
      { text_he: `יארו טען שלא ידע מה זו מריחואנה ב-1958 כשנכתב השיר המקורי`, difficulty: 'hard' },
      { text_he: `השיר הופיע בהופעות של Captain Kangaroo כשיר ילדים קלאסי`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `מאמר ב-Time מ-1968 הציע את הפרשנות הסמית`, difficulty: 'medium' },
      { text_he: `השיר נאסר בארה"ב למשך שנה שלמה`, difficulty: 'hard' },
      { text_he: `יארו אישר את הפרשנות הסמית בריאיון ב-1985`, difficulty: 'medium' },
      { text_he: `השיר נכתב במקור ב-1962, לא ב-1958`, difficulty: 'hard' },
    ],
  },
  q078: { // Shape of You / Ed Sheeran
    trueStatements: [
      { text_he: `במקור השיר נכתב במהלך מחנה כתיבה עם ריהאנה בראש`, difficulty: 'medium' },
      { text_he: `השיר נכתב גם עם Little Mix כיעד אפשרי בתחילה`, difficulty: 'hard' },
      { text_he: `אחרי שהוסיפו אזכור של ואן מוריסון ("put van the man on the jukebox") הוחלט שהוא יותר מתאים לשירן`, difficulty: 'hard' },
      { text_he: `השיר מדגם את "No Scrubs" של TLC`, difficulty: 'easy' },
      { text_he: `הדגימה הוסיפה קרדיט לכותבי "No Scrubs"`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 בבילבורד ל-12 שבועות והפך להיט הגדול של 2017`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `במקור השיר נכתב לג'סטין ביבר`, difficulty: 'medium' },
      { text_he: `השיר מדגם את "Waterfalls" של TLC`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 1 בבילבורד ל-4 שבועות בלבד`, difficulty: 'easy' },
      { text_he: `שירן כתב את השיר באולפן יחד עם ריהאנה`, difficulty: 'medium' },
    ],
  },
  q079: { // Gangsta's Paradise / Coolio
    trueStatements: [
      { text_he: `השיר נכתב במקור עבור הסרט "Dangerous Minds" עם מישל פייפר`, difficulty: 'medium' },
      { text_he: `השיר מבטא "תחושות הייאוש והנטישה שהרגישו ילדי בית הספר בסרט"`, difficulty: 'hard' },
      { text_he: `השיר דיגם את "Pastime Paradise" של סטיבי וונדר מ-1976`, difficulty: 'easy' },
      { text_he: `סטיבי וונדר זכה בקרדיט שותפות בכתיבה בגלל הדגימה`, difficulty: 'medium' },
      { text_he: `השיר זכה בגראמי על Best Rap Solo Performance ב-1996`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `השיר נכתב לסרט "Boyz n the Hood" של ג'ון סינגלטון`, difficulty: 'medium' },
      { text_he: `השיר דיגם את "Superstition" של סטיבי וונדר`, difficulty: 'easy' },
      { text_he: `השיר זכה בגראמי לשיר השנה ב-1996`, difficulty: 'easy' },
      { text_he: `סטיבי וונדר תבע את קוליו על הדגימה הלא-מורשית`, difficulty: 'medium' },
    ],
  },
  q080: { // Smells Like Teen Spirit / Nirvana
    trueStatements: [
      { text_he: `קתלין הנה (סולנית Bikini Kill) ריססה את הביטוי "Kurt smells like Teen Spirit" על קיר חדרו של קוביין`, difficulty: 'easy' },
      { text_he: `הגרפיטי נעשה אחרי לילה של גרפיטי בסיאטל`, difficulty: 'medium' },
      { text_he: `קוביין חשב שהיא משבחת את הרוח המהפכנית שלו`, difficulty: 'medium' },
      { text_he: `קוביין גילה ש-Teen Spirit הוא דאודורנט לנערות רק חודשים אחרי יציאת הסינגל`, difficulty: 'easy' },
      { text_he: `קוביין אמר שהשיר "מורכב מרעיונות סותרים — לועג לרעיון של מהפכה אבל גם מאמץ אותו"`, difficulty: 'hard' },
      { text_he: `הבסיסט קריסט נובוסליץ' אמר: "קורט תיעב את המיינסטרים. זה מה ש-Smells Like Teen Spirit היה — מנטליות של קונפורמיות"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `קתלין הנה הייתה חברתו של קוביין באותה תקופה`, difficulty: 'easy' },
      { text_he: `קוביין ידע מההתחלה ש-Teen Spirit הוא דאודורנט`, difficulty: 'medium' },
      { text_he: `קוביין אמר שהשיר הוא "הצהרה ברורה ואחידה נגד הפופ"`, difficulty: 'hard' },
      { text_he: `הציטוט "מנטליות של קונפורמיות" אמרו דייב גרול ולא נובוסליץ'`, difficulty: 'hard' },
    ],
  },
  q081: { // Seven Nation Army / White Stripes
    trueStatements: [
      { text_he: `בילדותו בדטרויט ג'ק ווייט שמע "Salvation Army" וחשב שזה "Seven Nation Army"`, difficulty: 'easy' },
      { text_he: `השיר מבטא תסכול מהרכילות שמלוותה את העלייה של The White Stripes לפסגות ההצלחה`, difficulty: 'medium' },
      { text_he: `הריף עם בס-בריטון הפך להמנון ספורט ויראלי בעולם`, difficulty: 'medium' },
      { text_he: `הויראליות בספורט החלה באוקטובר 2003`, difficulty: 'hard' },
      { text_he: `אוהדי קלאב ברוז' הבלגי שרו אותו במשחק ליגת האלופות באיטליה`, difficulty: 'hard' },
      { text_he: `בגולדן בול 2018 הוא היה ההמנון הלא-רשמי של מונדיאל רוסיה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `ג'ק ווייט שמע את השם "Seven Nation Army" מסבו ששירת בצבא`, difficulty: 'easy' },
      { text_he: `השיר מבטא דעות פוליטיות נגד מלחמת עיראק`, difficulty: 'medium' },
      { text_he: `הויראליות בספורט החלה ב-1999 במונדיאל`, difficulty: 'hard' },
      { text_he: `המשחק הראשון שבו שרו את השיר היה במנצ'סטר יונייטד`, difficulty: 'hard' },
    ],
  },
  q082: { // Stairway to Heaven / Led Zeppelin
    trueStatements: [
      { text_he: `רוברט פלאנט אישר שהשיר על "אישה שמקבלת את כל מה שהיא רוצה בלי לתת חזרה כלום"`, difficulty: 'medium' },
      { text_he: `הטאבו של ניגון הריף בחנויות גיטרות הונצח בסרט "Wayne's World" (1992)`, difficulty: 'easy' },
      { text_he: `בסרט מופיע שלט "NO Stairway To Heaven" עם תגובת ווין: "אין מדרגות. נדחה"`, difficulty: 'hard' },
      { text_he: `בגלל סיבוכי רישוי, הסרט עצמו החליף את הריף ב"משהו לא-מובן" בפצרים מאוחרים יותר`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `רוברט פלאנט אישר שהשיר על מסע רוחני אמיתי שלו לטיבט`, difficulty: 'medium' },
      { text_he: `הטאבו על ניגון הריף הונצח בסרט "Almost Famous" של קמרון קרואו`, difficulty: 'easy' },
      { text_he: `בסרט "Wayne's World" השלט אומר "PLAY Stairway To Heaven"`, difficulty: 'hard' },
      { text_he: `בכל הפצרים של "Wayne's World" יש את הריף המקורי`, difficulty: 'hard' },
    ],
  },
  q083: { // Heroes / David Bowie
    trueStatements: [
      { text_he: `בואי דיבר על ההופעה של 1987: "הייתה אחת ההופעות הרגשיות ביותר שעשיתי. הייתי בדמעות"`, difficulty: 'medium' },
      { text_he: `ההופעה הייתה "הופעה כפולה" — עם החומה כתפאורה, הקול עבר לצד השני`, difficulty: 'hard' },
      { text_he: `בואי ראה במו עיניו "אלפים מהצד השני התקרבו לחומה"`, difficulty: 'easy' },
      { text_he: `הוא שמע אותם "מריעים ושרים יחד"`, difficulty: 'medium' },
      { text_he: `כשבואי נפטר ב-2016, משרד החוץ הגרמני צייץ "להתראות, דייוויד בואי. אתה עכשיו בין הגיבורים. תודה שעזרת להפיל את החומה"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `בואי הצהיר שההופעה הייתה "סתמית כמו כל הופעה אחרת"`, difficulty: 'medium' },
      { text_he: `המשרד החוץ הגרמני הזניח את מותו של בואי ב-2016`, difficulty: 'hard' },
      { text_he: `בואי לא ידע אם המזרחים שמעו את ההופעה`, difficulty: 'easy' },
      { text_he: `ההופעה הייתה ב-1989, יום אחרי שנפלה החומה`, difficulty: 'medium' },
    ],
  },
  q084: { // Toxic / Britney Spears
    trueStatements: [
      { text_he: `בריטני ספירס הסבירה: "זה בעצם על נערה מכורה לבחור... הנערה הרעה הזאת תעשה הכל כדי לקבל מה שהיא רוצה"`, difficulty: 'easy' },
      { text_he: `ההוק האסיאתי המפורסם הוא דגימה מהשיר "Tere Mere Beech Mein"`, difficulty: 'hard' },
      { text_he: `השיר המקורי הוא מהסרט הבוליוודי "Ek Duuje Ke Liye" משנת 1981`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-13 בינואר 2004 מאלבום "In the Zone"`, difficulty: 'medium' },
      { text_he: `ההפקה של הצמד השוודי Bloodshy & Avant שילבה מיתרים בוליוודיים, חליליות ובס-באס`, difficulty: 'hard' },
      { text_he: `השיר זכה בגראמי על Best Dance Recording ב-2005 — הזכייה הראשונה של ספירס בגראמי`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `ההוק האסיאתי הוא דגימה מסרט בוליווד משנת 1947`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-2005 מאלבום "Blackout"`, difficulty: 'medium' },
      { text_he: `ההפקה של מקס מרטין שילבה את ההוק הבוליוודי`, difficulty: 'hard' },
      { text_he: `השיר זכה בגראמי לשיר השנה ב-2005`, difficulty: 'medium' },
    ],
  },
  q085: { // SOS / ABBA
    trueStatements: [
      { text_he: `שם העבודה של השיר היה "Turn Me On"`, difficulty: 'medium' },
      { text_he: `הכותרת הסופית "SOS" נטבעה על ידי המנהל סטיג אנדרסון`, difficulty: 'hard' },
      { text_he: `המטרה הייתה לתת תחושת דחיפות רגשית`, difficulty: 'easy' },
      { text_he: `אגנתה שרה את הקול הראשי בשיר`, difficulty: 'easy' },
      { text_he: `ABBA אמרו שעם "SOS" הם מצאו לראשונה את הזהות שלהם כלהקת פופ`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `שם העבודה היה "Help Me"`, difficulty: 'medium' },
      { text_he: `הכותרת "SOS" נבחרה על ידי בני יור`, difficulty: 'hard' },
      { text_he: `פרידה היא ששרה את הקול הראשי`, difficulty: 'easy' },
      { text_he: `"SOS" היה הסינגל האחרון של ABBA לפני הפיזור`, difficulty: 'medium' },
    ],
  },
  q086: { // Wonderwall / Oasis
    trueStatements: [
      { text_he: `נואל גלאגר אמר ל-NME ב-1996 שהשיר על חברתו דאז מג מתיוס`, difficulty: 'medium' },
      { text_he: `אחרי הגירושים שלהם ב-2001 נואל הבהיר ב-Q Magazine שהמשמעות שונה`, difficulty: 'hard' },
      { text_he: `נואל אמר: "המשמעות של השיר נלקחה ממני על ידי התקשורת"`, difficulty: 'easy' },
      { text_he: `נואל הסביר ש"זה על חבר דמיוני שיבוא להציל אותך מעצמך"`, difficulty: 'medium' },
      { text_he: `נואל אמר שהיה לו קשה לתקן את הסיפור אחרי שהוא כבר נכתב`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `נואל אמר מהיום הראשון שהשיר על חבר דמיוני`, difficulty: 'medium' },
      { text_he: `נואל ומג מתיוס מעולם לא נישאו`, difficulty: 'hard' },
      { text_he: `נואל הצהיר שהשיר על אחיו ליאם`, difficulty: 'easy' },
      { text_he: `נואל אמר שהשיר עוסק ב"מציאות גדולה יותר מאהבה אנושית"`, difficulty: 'medium' },
    ],
  },
  q087: { // No Woman, No Cry / Bob Marley
    trueStatements: [
      { text_he: `הקרדיט הרשמי לשיר ניתן לוינסנט פורד, חבר של מארלי`, difficulty: 'medium' },
      { text_he: `פורד ניהל מטבח חינמי בטרנצ'טאון, השיכון בו מארלי גדל בעוני`, difficulty: 'hard' },
      { text_he: `מארלי אמר שבלעדי המטבח של פורד הוא היה גווע ברעב`, difficulty: 'easy' },
      { text_he: `ההערכה היא שמארלי שיתף את הקרדיט כדי לעקוף הגבלות חוזה`, difficulty: 'hard' },
      { text_he: `התמלוגים מהשיר אפשרו לפורד להמשיך את פעילות הצדקה שלו`, difficulty: 'medium' },
      { text_he: `בשיר מארלי מזכיר את "Government Yards in Trenchtown"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הקרדיט הרשמי לשיר ניתן לאשתו של מארלי, ריטה`, difficulty: 'medium' },
      { text_he: `פורד היה הגיטריסט הראשון של מארלי`, difficulty: 'hard' },
      { text_he: `מארלי שיתף את הקרדיט כי פורד באמת כתב את השיר`, difficulty: 'hard' },
      { text_he: `בשיר מארלי מזכיר את שכונת קינגסטון העשירה`, difficulty: 'easy' },
    ],
  },
  q088: { // Gold Digger / Kanye West
    trueStatements: [
      { text_he: `הפזמון של ג'יימי פוקס הוא אינטרפולציה של "I Got a Woman" של ריי צ'ארלס מ-1954`, difficulty: 'medium' },
      { text_he: `המקור של "I Got a Woman" נכתב על ידי Renald Richard`, difficulty: 'hard' },
      { text_he: `השיר מספר על "גבר שחור שעוזב אישה שחורה למען בחורה לבנה אחרי שהוא מתעשר"`, difficulty: 'easy' },
      { text_he: `השיר יצא ביולי 2005`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 בבילבורד ל-10 שבועות`, difficulty: 'hard' },
      { text_he: `השיר נכלל באלבום "Late Registration" של קניה ווסט`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הפזמון של ג'יימי פוקס הוא דגימה מ-"What I'd Say" של ריי צ'ארלס`, difficulty: 'medium' },
      { text_he: `השיר יצא ב-2003 כסינגל מאלבום "The College Dropout"`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 בבילבורד ל-3 שבועות בלבד`, difficulty: 'hard' },
      { text_he: `השיר נכלל באלבום "Graduation" מ-2007`, difficulty: 'easy' },
    ],
  },
  q089: { // Basket Case / Green Day
    trueStatements: [
      { text_he: `במקור בילי ג'ו ארמסטרונג כתב את השיר כשיר אהבה בסביבות 1992-93`, difficulty: 'medium' },
      { text_he: `אז שכתב את המילים סביב חוויות התקפי הפניקה שלו`, difficulty: 'easy' },
      { text_he: `השיר תיעד את הבלבול והאי-וודאות של מי שלא מבין מה קורה לו`, difficulty: 'hard' },
      { text_he: `השיר עזר לרבים לזהות את המצב אצל עצמם`, difficulty: 'easy' },
      { text_he: `השיר יצא ב-1 באוגוסט 1994 כסינגל השני מ-Dookie`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `ארמסטרונג כתב את השיר ישר על התקפי הפאניקה שלו`, difficulty: 'medium' },
      { text_he: `השיר יצא ב-1995 כסינגל מ-Insomniac`, difficulty: 'hard' },
      { text_he: `הסינגל הראשון מאלבום Dookie היה "Basket Case"`, difficulty: 'medium' },
      { text_he: `ארמסטרונג כתב את השיר במיוחד עבור קמפיין מודעות לבריאות הנפש`, difficulty: 'easy' },
    ],
  },
  q090: { // Paranoid Android / Radiohead
    trueStatements: [
      { text_he: `החוויה הספציפית של תום יורק התרחשה בבר בלוס אנג'לס בתקופת הסיבוב בארה"ב`, difficulty: 'medium' },
      { text_he: `יורק היה מוקף באנשים מסוממים בקוקאין`, difficulty: 'easy' },
      { text_he: `יורק פחד מאישה שהפכה אלימה אחרי שמישהו שפך עליה משקה`, difficulty: 'hard' },
      { text_he: `שם השיר נלקח ממרווין הרובוט הפרנואיד מ-The Hitchhiker's Guide to the Galaxy של דאגלס אדאמס`, difficulty: 'medium' },
      { text_he: `השיר באורך 6:23 דקות`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-26 במאי 1997 כסינגל הראשון מ-OK Computer`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `החוויה הייתה במלון בניו יורק במהלך סיבוב הופעות אירופי`, difficulty: 'medium' },
      { text_he: `שם השיר מתייחס לסרט "Blade Runner"`, difficulty: 'medium' },
      { text_he: `השיר באורך 4:30 דקות`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-1995 לפני אלבום OK Computer`, difficulty: 'easy' },
    ],
  },
  q091: { // 1999 / Prince
    trueStatements: [
      { text_he: `פרינס כתב את השיר ב-1982 בשיא המתחים של המלחמה הקרה`, difficulty: 'easy' },
      { text_he: `השיר נכתב בתקופת ממשל רייגן והעצמת הנשק הגרעיני`, difficulty: 'medium' },
      { text_he: `השיר נפתח עם הזמרת הליווי ליסה קולמן ששרה על חלום שבו "השמיים היו סגולים"`, difficulty: 'hard' },
      { text_he: `פרינס שר: "לפני שאתן לזה לקרות, ארקוד את חיי"`, difficulty: 'medium' },
      { text_he: `בראיון ל-CNN ב-1999 פרינס אמר שרצה "לכתוב משהו שייתן תקווה" למרות הזמנים הקשים שצפה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `פרינס כתב את השיר ב-1979`, difficulty: 'easy' },
      { text_he: `השיר נכתב בתקופת ממשל קלינטון`, difficulty: 'medium' },
      { text_he: `שיינה ה' זיגלר היא הזמרת הליווי בשיר`, difficulty: 'hard' },
      { text_he: `פרינס אמר ב-1999 שאיבד את התקווה ולכן כתב שיר חגיגה`, difficulty: 'medium' },
    ],
  },
  q092: { // Kids / MGMT
    trueStatements: [
      { text_he: `אנדרו ואן-וינגרדן הסביר: "היינו חושבים איך לעשות את שיר הפופ הסטריאוטיפי ביותר, וזה אחד מאלה שעשינו"`, difficulty: 'medium' },
      { text_he: `בן גולדווסר תיאר את התחושה: "להיות בן 19, בעולם הקולג' הפנטסטי, שזה קצת כמו ילדות כי אין לך הרבה אחריות"`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-2007 באלבום "Oracular Spectacular"`, difficulty: 'medium' },
      { text_he: `השיר הפך ללהיט רק ב-2008-2009`, difficulty: 'hard' },
      { text_he: `הקליפ הראשון מ-2008 צולם בלי תקציב כמעט`, difficulty: 'easy' },
      { text_he: `ניקולא סרקוזי, נשיא צרפת אז, השתמש בשיר בקמפיין ב-2009 — MGMT תבעו אותו והגיעו לפשרה`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `MGMT כתבו את השיר כמסר רציני נגד תרבות הצריכה`, difficulty: 'medium' },
      { text_he: `השיר יצא ב-2010 והפך מיד ללהיט`, difficulty: 'medium' },
      { text_he: `הקליפ של השיר זכה בפרס MTV VMA לסרטון השנה`, difficulty: 'easy' },
      { text_he: `אנגלה מרקל השתמשה בשיר בקמפיין הבחירות שלה`, difficulty: 'hard' },
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
