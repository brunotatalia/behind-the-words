#!/usr/bin/env node
// Self-contained statements pass — batch 1: q001-q030
// Rule: every statement must be readable in isolation. Player sees only
// the song header (title + artist + year) plus this single statement.
// Fixes applied:
//   - Bare last names → full name + role on every appearance
//   - Implicit "the band" → explicit band name
//   - Ambiguous first names → disambiguating last name
//   - References to "the event"/"this" → name the event
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const fixed = {
  q001: { // Jeremy / Pearl Jam
    trueStatements: [
      { text_he: `המקרה האמיתי שעליו מבוסס השיר התרחש בטקסס ב-1991`, difficulty: 'easy' },
      { text_he: `הילד שהשיר מבוסס עליו היה בן 15 כשירה בעצמו מול הכיתה`, difficulty: 'easy' },
      { text_he: `הקליפ של השיר זכה ב-4 פרסי MTV VMA ב-1993, כולל פרס סרטון השנה`, difficulty: 'medium' },
      { text_he: `MTV צנזרה את רגע הירייה בקליפ של השיר`, difficulty: 'medium' },
      { text_he: `אחרי הטבח בקולומביין ב-1999, MTV ו-VH1 כמעט הפסיקו לשדר את הקליפ`, difficulty: 'hard' },
      { text_he: `אדי ודר, סולן Pearl Jam, כתב את השיר כתגובה על התעלמות מבוגרים מסימני אזהרה אצל בני נוער`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `המקרה האמיתי שעליו מבוסס השיר התרחש בקליפורניה ב-1991`, difficulty: 'easy' },
      { text_he: `הילד שהשיר מבוסס עליו היה בן 17 כשירה בעצמו מול הכיתה`, difficulty: 'easy' },
      { text_he: `הקליפ של השיר זכה ב-2 פרסי MTV VMA בלבד ב-1993`, difficulty: 'medium' },
      { text_he: `MTV הוסיפה את רגע הירייה לקליפ למרות התנגדות Pearl Jam`, difficulty: 'hard' },
      { text_he: `Pearl Jam הפסיקו לבצע את השיר בהופעות אחרי 1999`, difficulty: 'medium' },
    ],
  },
  q002: { // Pumped Up Kicks / Foster the People
    trueStatements: [
      { text_he: `מארק פוסטר, סולן Foster the People, הקליט את השיר ב-Logic Pro בחדר השינה שלו`, difficulty: 'easy' },
      { text_he: `מארק פוסטר עבד ככותב ג'ינגלים לפרסומות בתקופה שכתב את השיר`, difficulty: 'medium' },
      { text_he: `אחרי הטבח בבית הספר היסודי סנדי הוק (דצמבר 2012) תחנות רדיו רבות הסירו את השיר משידור`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 3 במצעד הבילבורד הוט 100`, difficulty: 'hard' },
      { text_he: `הדמו הגולמי שמארק פוסטר הקליט בחדר השינה הוא הגרסה ששוחררה לציבור — בלי שיפוצים באולפן`, difficulty: 'hard' },
      { text_he: `שם השיר מתייחס לנעלי Reebok Pumps שילדים עשירים נעלו בשנות ה-90`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `מארק פוסטר, סולן Foster the People, הקליט את השיר באולפן מקצועי במנהטן`, difficulty: 'easy' },
      { text_he: `מארק פוסטר עבד ככותב פסקולים לסרטי הוליווד בתקופת השיר`, difficulty: 'medium' },
      { text_he: `אחרי הטבח באוניברסיטת וירג'יניה טק ב-2007 תחנות רדיו הסירו את השיר`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 במצעד הבילבורד הוט 100`, difficulty: 'hard' },
      { text_he: `שם השיר מתייחס לנעלי הריצה של הירוי בעלילת השיר`, difficulty: 'easy' },
    ],
  },
  q003: { // Every Breath You Take / The Police
    trueStatements: [
      { text_he: `סטינג כתב את השיר באחוזת גולדן-איי של איאן פלמינג בג'מייקה`, difficulty: 'hard' },
      { text_he: `סטינג עצמו הגדיר את השיר כ"שיר קטן ומרושע — על קנאה, מעקב ובעלות"`, difficulty: 'easy' },
      { text_he: `השיר זכה בגראמי לשיר השנה ב-1984`, difficulty: 'medium' },
      { text_he: `ראפר ההיפ-הופ Puff Daddy והזמרת Faith Evans דגמו את השיר ב-1997 ב-"I'll Be Missing You"`, difficulty: 'easy' },
      { text_he: `סטינג כתב את השיר בתקופה של גירושים מאשתו הראשונה ופירוק להקת The Police`, difficulty: 'medium' },
      { text_he: `השיר מספק לסטינג בין רבע לשליש מהכנסותיו השנתיות מתמלוגים`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `סטינג כתב את השיר בבית הקיץ של ג'ון לנון באיביזה`, difficulty: 'hard' },
      { text_he: `סטינג הגדיר את השיר כ"שיר אהבה אמיתי — על נאמנות והתמסרות"`, difficulty: 'easy' },
      { text_he: `השיר זכה בגראמי לאלבום השנה ב-1984`, difficulty: 'medium' },
      { text_he: `הזמר R. Kelly דגם את השיר ב-1995 ב-"I Believe I Can Fly"`, difficulty: 'medium' },
      { text_he: `סטינג כתב את השיר בתקופת אהבה חדשה אחרי ההצלחה הראשונה של The Police`, difficulty: 'medium' },
    ],
  },
  q004: { // Hotel California / Eagles
    trueStatements: [
      { text_he: `הגיטריסט דון פלדר יצר את הדמו האינסטרומנטלי בבית חוף במאליבו`, difficulty: 'medium' },
      { text_he: `הסולו המפורסם בסוף השיר לקח כשלושה ימים להקליט`, difficulty: 'hard' },
      { text_he: `הגיטריסטים ג'ו וולש ודון פלדר מבצעים יחד את הסולו האיקוני`, difficulty: 'medium' },
      { text_he: `דון הנלי, מתופף וסולן Eagles, תיאר את השיר כ"מסע מתמימות לנסיון"`, difficulty: 'easy' },
      { text_he: `Eagles הכחישו במפורש שמדובר בשיר על התמכרות לסמים`, difficulty: 'easy' },
      { text_he: `דון פלדר השתמש במכונת תופים ובגיטרת 12-מיתרים ביצירת הדמו`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הגיטריסט דון פלדר יצר את הדמו האינסטרומנטלי במלון בלאס וגאס`, difficulty: 'medium' },
      { text_he: `הסולו המפורסם בסוף השיר הוקלט במהלך לילה אחד באולפן`, difficulty: 'hard' },
      { text_he: `הגיטריסט אריק קלפטון מתארח בסולו האיקוני של השיר`, difficulty: 'medium' },
      { text_he: `דון הנלי, מתופף וסולן Eagles, אישר במפורש שהשיר עוסק בהתמכרות לקוקאין`, difficulty: 'easy' },
      { text_he: `דון פלדר השתמש בפסנתר חשמלי וגיטרת בס ביצירת הדמו`, difficulty: 'hard' },
    ],
  },
  q005: { // Born in the USA / Springsteen
    trueStatements: [
      { text_he: `השיר נכתב במקור כדמו אקוסטי עגום במהלך מושבי ההקלטות לאלבום Nebraska (1982)`, difficulty: 'medium' },
      { text_he: `המפיק ג'ון לאנדאו חשב שהמלודיה לא מתאימה לאלבום נברסקה`, difficulty: 'hard' },
      { text_he: `בסופו של דבר השיר עובד מחדש עם להקת ה-E-Street של ספרינגסטין`, difficulty: 'easy' },
      { text_he: `אלבום "Born in the USA" כלל 7 שירים בעשירייה הראשונה של בילבורד`, difficulty: 'medium' },
      { text_he: `באוקטובר 2020 השיר הושמע בעצרות של דונלד טראמפ`, difficulty: 'easy' },
      { text_he: `ספרינגסטין קרא לטראמפ "נרקיסיסט רעיל" ו"איום על הדמוקרטיה"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `השיר נכתב במקור כבלדה רוקנרול עבור האלבום Born to Run`, difficulty: 'medium' },
      { text_he: `המפיק פיל ספקטור עיבד מחדש את הדמו האקוסטי`, difficulty: 'hard' },
      { text_he: `אלבום "Born in the USA" כלל 4 שירים בעשירייה הראשונה`, difficulty: 'medium' },
      { text_he: `ספרינגסטין שיבח את טראמפ על השימוש בשיר בעצרותיו`, difficulty: 'easy' },
    ],
  },
  q006: { // Hey Ya! / OutKast
    trueStatements: [
      { text_he: `השיר עמד 9 שבועות במקום הראשון בבילבורד (דצמבר 2003 – פברואר 2004)`, difficulty: 'medium' },
      { text_he: `הוא היה השיר הראשון ב-iTunes שעבר את רף מיליון ההורדות`, difficulty: 'hard' },
      { text_he: `הביטוי "shake it like a Polaroid picture" בשיר סייע לחברת המצלמות Polaroid לצאת מפשיטת רגל`, difficulty: 'easy' },
      { text_he: `אנדרה 3000, אחד מבני הצמד OutKast, אמר שרצה לבדוק אם אנשים יקשיבו למילים עצובות בגלל המוזיקה השמחה`, difficulty: 'medium' },
      { text_he: `השיר נכלל במקום ה-10 ברשימת 500 השירים הגדולים בכל הזמנים של רולינג סטון (2021)`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר עמד 4 שבועות במקום הראשון בבילבורד`, difficulty: 'medium' },
      { text_he: `הוא היה השיר הראשון ב-Spotify שעבר את רף מיליון ההורדות`, difficulty: 'hard' },
      { text_he: `הביטוי "shake it like a Polaroid picture" גרם לחברת Polaroid לתבוע את OutKast`, difficulty: 'easy' },
      { text_he: `השיר נכלל במקום ה-1 ברשימת 500 השירים הגדולים של רולינג סטון`, difficulty: 'hard' },
    ],
  },
  q007: { // Semi-Charmed Life / Third Eye Blind
    trueStatements: [
      { text_he: `סטפן ג'נקינס, סולן Third Eye Blind, כתב את השיר אחרי שראה חברים משתמשים בקריסטל מת' בהופעה של Primus`, difficulty: 'medium' },
      { text_he: `סטפן ג'נקינס תיאר את השיר כ"שיר על להתפרק"`, difficulty: 'easy' },
      { text_he: `ג'נקינס רצה שהריף "ייצור את ההרגשה הבהירה והמבריקה של ספיד"`, difficulty: 'hard' },
      { text_he: `גרסת הרדיו של השיר השתמשה ב-backmasking כדי לצנזר את המילה "crystal meth"`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 4 בבילבורד והפך לאחד הלהיטים הגדולים של 1997`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `סטפן ג'נקינס, סולן Third Eye Blind, כתב את השיר אחרי שראה חברים משתמשים בהרואין בהופעה של Nirvana`, difficulty: 'medium' },
      { text_he: `סטפן ג'נקינס תיאר את השיר כ"שיר על שיקום והחלמה"`, difficulty: 'easy' },
      { text_he: `גרסת הרדיו של השיר פשוט השמיטה את המילה "crystal meth" בשתיקה`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 בבילבורד והפך לסינגל הנמכר ביותר של 1997`, difficulty: 'easy' },
    ],
  },
  q008: { // Polly / Nirvana
    trueStatements: [
      { text_he: `החוטף בסיפור האמיתי שעליו השיר מבוסס היה ג'רלד פרנד`, difficulty: 'hard' },
      { text_he: `הקורבן ברחה מחוטפה לאחר שהערימה עליו בתחנת דלק וקפצה ממשאיתו`, difficulty: 'medium' },
      { text_he: `קורט קוביין, סולן Nirvana, כתב את הקורבן כמשתפת פעולה לכאורה כדי שהחוטף יוריד את ערנותו`, difficulty: 'easy' },
      { text_he: `המקרה האמיתי של החטיפה התרחש ב-1987`, difficulty: 'easy' },
      { text_he: `ב-1992 קורט קוביין הזדעזע מאונס שבו התוקפים שרו את מילות "Polly"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `החוטף בסיפור האמיתי היה הרוצח הסדרתי ריצ'רד רמירז ("רוצח הלילה")`, difficulty: 'hard' },
      { text_he: `הקורבן ברחה אחרי שצרחה ברחוב ושכנים הזעיקו משטרה`, difficulty: 'medium' },
      { text_he: `קורט קוביין כתב את השיר מנקודת מבט של הקורבן עצמה`, difficulty: 'easy' },
      { text_he: `המקרה האמיתי של החטיפה התרחש ב-1989`, difficulty: 'easy' },
    ],
  },
  q009: { // Tears in Heaven / Clapton
    trueStatements: [
      { text_he: `קונור, בנו של אריק קלפטון, היה בן 4 כשנפל מקומה 53 בניו יורק ב-1991`, difficulty: 'easy' },
      { text_he: `השיר נכתב בשיתוף עם הפזמונאי וויל ג'נינגס עבור פסקול הסרט Rush (1992)`, difficulty: 'medium' },
      { text_he: `הבמאית לילי זאנוק שכנעה את קלפטון לשחרר את השיר באומרה ש"זה אולי יעזור למישהו"`, difficulty: 'hard' },
      { text_he: `השיר זכה ב-3 פרסי גראמי ב-1993`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 2 בבילבורד`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `קונור, בנו של אריק קלפטון, היה בן 6 כשנפל מקומה 30 בלונדון`, difficulty: 'easy' },
      { text_he: `השיר נכתב לבד על ידי קלפטון עבור פסקול הסרט "Rain Man"`, difficulty: 'medium' },
      { text_he: `הבמאי סטיבן ספילברג שכנע את קלפטון לשחרר את השיר`, difficulty: 'hard' },
      { text_he: `השיר זכה בפרס אוסקר לשיר המקורי הטוב ב-1993`, difficulty: 'medium' },
    ],
  },
  q010: { // 99 Luftballons / Nena
    trueStatements: [
      { text_he: `הרעיון לשיר נולד ביוני 1982 כשגיטריסט הלהקה קרלו קרגס ראה בלונים מתעופפים בהופעה של רולינג סטונס בברלין המערבית`, difficulty: 'hard' },
      { text_he: `הגרסה הגרמנית של השיר הגיעה למקום 2 בבילבורד בארה"ב`, difficulty: 'medium' },
      { text_he: `הגרסה האנגלית "99 Red Balloons" הגיעה למקום 1 בבריטניה ובקנדה ב-1984`, difficulty: 'medium' },
      { text_he: `הזמרת ננה הדגישה שהשיר עוסק במודעות לפעולותינו וקריאה לשלום, יותר מאשר במסר פוליטי ישיר`, difficulty: 'hard' },
      { text_he: `הגיטריסט קרלו קרגס דמיין מה יקרה אם הבלונים יחצו את חומת ברלין למזרח`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הרעיון לשיר נולד בהופעה של בוב דילן בברלין המזרחית`, difficulty: 'hard' },
      { text_he: `הגרסה הגרמנית הגיעה למקום 1 בבילבורד בארה"ב`, difficulty: 'medium' },
      { text_he: `הגרסה האנגלית של השיר כונתה "99 Blue Balloons"`, difficulty: 'medium' },
      { text_he: `הזמרת ננה הסבירה שהשיר הוא קריאה ישירה לפירוק נשק גרעיני`, difficulty: 'hard' },
    ],
  },
  q011: { // Macarena / Los del Río
    trueStatements: [
      { text_he: `השיר נכתב על ידי הצמד Los del Río ב-1993, אחרי שאנטוניו רומרו מונחה ראה רקדנית בוונצואלה`, difficulty: 'hard' },
      { text_he: `השם "מקרנה" נבחר לכבוד בתו של אחד מבני הצמד, אנטוניו רומרו מונחה`, difficulty: 'medium' },
      { text_he: `הריקס של הצמד Bayside Boys מ-1995 עמד 14 שבועות במקום הראשון בבילבורד ב-1996`, difficulty: 'medium' },
      { text_he: `השיר מכר מעל 14 מיליון עותקים בעולם`, difficulty: 'hard' },
      { text_he: `במילות השיר, מקרנה מנצלת את ההזדמנות שחבר שלה ויטורינו מתגייס לצבא כדי לבלות עם גברים אחרים`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `אנטוניו רומרו מונחה (מ-Los del Río) ראה את הרקדנית שהיוותה השראה במקסיקו סיטי`, difficulty: 'hard' },
      { text_he: `השם "מקרנה" נבחר לכבוד אמו של אנטוניו רומרו מונחה`, difficulty: 'medium' },
      { text_he: `הריקס של Bayside Boys עמד 4 שבועות במקום הראשון בבילבורד`, difficulty: 'medium' },
      { text_he: `במילות השיר, מקרנה מבגדת בחבר שלה דווקא בלילה שלפני חתונתם`, difficulty: 'easy' },
    ],
  },
  q012: { // Chandelier / Sia
    trueStatements: [
      { text_he: `סיה כתבה את השיר מנסיון עברה האישי עם אלכוהוליזם`, difficulty: 'easy' },
      { text_he: `סיה בתחילה כתבה את השיר עבור ריהאנה או ביונסה`, difficulty: 'medium' },
      { text_he: `הקליפ המפורסם של השיר משוחק על ידי הרקדנית מאדי זיגלר בת ה-11`, difficulty: 'easy' },
      { text_he: `הקליפ של השיר שוחרר במאי 2014`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום 8 בבילבורד וקיבל 4 מועמדויות לגראמי`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `סיה כתבה את השיר מנסיון עברה האישי עם הפרעות אכילה`, difficulty: 'easy' },
      { text_he: `סיה בתחילה כתבה את השיר עבור קייטי פרי או טיילור סוויפט`, difficulty: 'medium' },
      { text_he: `הקליפ של השיר משוחק על ידי הרקדנית מאדי זיגלר בת ה-15`, difficulty: 'easy' },
      { text_he: `השיר הגיע למקום 1 בבילבורד וזכה ב-4 פרסי גראמי`, difficulty: 'hard' },
    ],
  },
  q013: { // Stan / Eminem
    trueStatements: [
      { text_he: `בעלילת השיר, הדמות סטן נופלת עם חברתו ההרה לתוך נהר אחרי נסיעה שיכורה`, difficulty: 'medium' },
      { text_he: `אמינם בשיר עונה לסטן במכתב, אבל מבין באיחור שהסיפור החדשותי שהוא שמע הוא של סטן עצמו`, difficulty: 'easy' },
      { text_he: `השיר דוגם את "Thank You" של הזמרת דיידו`, difficulty: 'easy' },
      { text_he: `המונח "stan" נכנס למילון אוקספורד ב-2017`, difficulty: 'medium' },
      { text_he: `המונח "stan" נכנס למילון מריאם-וובסטר ב-2019`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `בעלילת השיר, הדמות סטן זורקת את חברתו מגשר אחרי ויכוח קשה`, difficulty: 'medium' },
      { text_he: `אמינם בשיר מצליח לעצור את סטן בזכות תשובה מהירה למכתביו`, difficulty: 'easy' },
      { text_he: `השיר דוגם את "Bitter Sweet Symphony" של The Verve`, difficulty: 'easy' },
      { text_he: `המונח "stan" נכנס למילון אוקספורד ב-2008`, difficulty: 'medium' },
    ],
  },
  q014: { // Lucy in the Sky with Diamonds / Beatles
    trueStatements: [
      { text_he: `לוסי וודן, החברה מבית הספר של ג'וליאן לנון (בנו של ג'ון לנון), הייתה ילדה אמיתית ונפטרה ב-2009`, difficulty: 'medium' },
      { text_he: `לפי החוקרים אלן קלייסון וספנסר לי, ה-BBC מעולם לא אסר רשמית את השיר`, difficulty: 'hard' },
      { text_he: `ה-BBC שידר את השיר לראשונה ב-20 במאי 1967`, difficulty: 'hard' },
      { text_he: `השיר היחיד מאלבום Sgt. Pepper שאכן נאסר על ידי ה-BBC היה "A Day in the Life"`, difficulty: 'medium' },
      { text_he: `גרסת הכיסוי של אלטון ג'ון מ-1974 (עם השתתפות ג'ון לנון) הגיעה למקום 1 בארה"ב`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `לוסי וודן הייתה דמות בדויה שג'ון לנון המציא לבנו`, difficulty: 'medium' },
      { text_he: `ה-BBC אסר את השיר רשמית במשך שנתיים אחרי שחרורו`, difficulty: 'hard' },
      { text_he: `השיר הראשון מאלבום Sgt. Pepper שנאסר על ידי ה-BBC היה "Lucy in the Sky"`, difficulty: 'medium' },
      { text_he: `גרסת הכיסוי של דייוויד בואי מ-1974 הגיעה למקום 1 בארה"ב`, difficulty: 'easy' },
    ],
  },
  q015: { // Norwegian Wood / Beatles
    trueStatements: [
      { text_he: `ג'ון לנון הודה: "ניסיתי לכתוב על רומן מבלי לתת לאשתי לדעת שיש לי כזה"`, difficulty: 'easy' },
      { text_he: `פול מקרטני אישר ש"Norwegian Wood" מתייחס לציפוי קיר אורן זול שהיה אופנתי בלונדון`, difficulty: 'medium' },
      { text_he: `פול מקרטני אמר שהבחירה במילה "Norwegian Wood" הייתה לעגנית`, difficulty: 'hard' },
      { text_he: `הסיום "I lit a fire" עשוי להתייחס לחימום ליד אש או לשרוף את הדירה כנקמה`, difficulty: 'medium' },
      { text_he: `שמה של אשתו של ג'ון לנון אז היה סינתיה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ג'ון לנון הודה שהשיר מתאר את הרומן שלו עם יוקו אונו`, difficulty: 'easy' },
      { text_he: `פול מקרטני הסביר ש"Norwegian Wood" מתייחס לעץ יוקרתי שהביא לנון מנורווגיה`, difficulty: 'medium' },
      { text_he: `הסיום "I lit a fire" אישש בראיון רשמי שמתאר נקמה במאהבת`, difficulty: 'medium' },
      { text_he: `שמה של אשתו של ג'ון לנון אז היה ג'יין`, difficulty: 'easy' },
    ],
  },
  q016: { // Forever Young / Alphaville
    trueStatements: [
      { text_he: `Alphaville היא להקה אלקטרונית גרמנית`, difficulty: 'easy' },
      { text_he: `השיר שוחרר בספטמבר 1984`, difficulty: 'medium' },
      { text_he: `השיר עוסק בחרדה הקיומית של חיים בצל איום גרעיני`, difficulty: 'easy' },
      { text_he: `במקור הבית השלישי של השיר נכתב עם תחושה "פאשיסטית" שהמפיקים דרשו מהזמר מריאן גולד לשנות`, difficulty: 'hard' },
      { text_he: `ב-2024 השיר עבר תחייה ויראלית בטיקטוק ועלה למקום 1 בבילבורד ל-10 שבועות`, difficulty: 'hard' },
      { text_he: `השיר צבר מעל 1.1 מיליארד השמעות בספוטיפיי`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Alphaville היא להקה אלקטרונית שוודית`, difficulty: 'easy' },
      { text_he: `השיר שוחרר בספטמבר 1986`, difficulty: 'medium' },
      { text_he: `השיר נכתב כקריאה לאופטימיות ולאמונה בעתיד טוב`, difficulty: 'easy' },
      { text_he: `במקור הבית השני של השיר נכתב עם תחושה "קומוניסטית" שהמפיקים דרשו לשנות`, difficulty: 'hard' },
    ],
  },
  q017: { // It's the End of the World / R.E.M.
    trueStatements: [
      { text_he: `מייקל סטייפ, סולן R.E.M., אמר שהמילים "אוסף של זרם תודעה" שהגיעו אליו מחלומות, טלוויזיה וחיי היומיום`, difficulty: 'medium' },
      { text_he: `חלק ממילות השיר נולדו מחלום של מייקל סטייפ במסיבת יום הולדת של מבקר המוזיקה לסטר באנגס`, difficulty: 'hard' },
      { text_he: `בחלום של סטייפ הופיעו לני ברוס, ליאוניד ברז'נב ולאונרד ברנשטיין — כולם בעלי ראשי תיבות L.B.`, difficulty: 'hard' },
      { text_he: `השיר הושפע מ-"Subterranean Homesick Blues" של בוב דילן בסגנון השירה המהיר`, difficulty: 'medium' },
      { text_he: `בספטמבר 2025 מייקל סטייפ סוף סוף חשף ברשתות החברתיות את המילים הנכונות שהמעריצים שמעו לא נכון 38 שנה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `מייקל סטייפ, סולן R.E.M., אמר שכתב את השיר כדי לבטא תקווה ואופטימיות`, difficulty: 'medium' },
      { text_he: `חלק ממילות השיר נולדו מסיוט של מייקל סטייפ ב-1986 על אסון גרעיני`, difficulty: 'hard' },
      { text_he: `בחלום של סטייפ הופיעו אישים בעלי ראשי תיבות J.K. (כמו ג'ון קנדי וקלי קלרקסון)`, difficulty: 'hard' },
      { text_he: `השיר הושפע מ-"Like a Rolling Stone" של בוב דילן`, difficulty: 'medium' },
    ],
  },
  q018: { // Roxanne / The Police
    trueStatements: [
      { text_he: `סטינג כתב את השיר באוקטובר 1977 כשלהקת The Police שהתה במלון עלוב בפריז ליד רובע האורות האדומים`, difficulty: 'medium' },
      { text_he: `סטינג ראה את הזונות לראשונה בחייו בפריז`, difficulty: 'easy' },
      { text_he: `השיר שוחרר ב-7 באפריל 1978`, difficulty: 'hard' },
      { text_he: `השיר נכשל מסחרית בתחילה — רק שידור של תחנת רדיו באוסטין, טקסס ב-1979 חולל פריצת דרך`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 12 בבריטניה ולמקום 32 בארה"ב במאי 1979`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `סטינג כתב את השיר באמסטרדם ליד רובע האורות האדומים`, difficulty: 'medium' },
      { text_he: `סטינג היה לקוח קבוע של זונות בלונדון לפני שכתב את השיר`, difficulty: 'easy' },
      { text_he: `השיר זכה להצלחה מיידית מיד עם שחרורו ב-1978`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 הן בבריטניה והן בארה"ב`, difficulty: 'hard' },
    ],
  },
  q019: { // Bohemian Rhapsody / Queen
    trueStatements: [
      { text_he: `פרדי מרקורי סירב לאורך כל חייו לפרש את השיר ואמר ש"אנשים צריכים פשוט להאזין ולהחליט בעצמם"`, difficulty: 'easy' },
      { text_he: `בריאן מיי, גיטריסט Queen, הודה שמרקורי "כתב את עצמו לתוך השיר" וכלל בו את המאבקים האישיים שלו`, difficulty: 'medium' },
      { text_he: `אחרי מותו של פרדי מרקורי, אהובו ג'ים האטון אמר שהשיר היה "וידוי של מרקורי על היותו הומוסקסואל"`, difficulty: 'hard' },
      { text_he: `פרדי מרקורי כתב את השיר בתקופת מפנה אישי — אחרי 7 שנים עם בת זוגו מרי אוסטין, כשהתחיל בקשר הראשון שלו עם גבר`, difficulty: 'hard' },
      { text_he: `Queen הסכימו לשמור על פרטיות המשמעות של השיר`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `פרדי מרקורי הסביר במפורש שהשיר עוסק במלחמת העולם השנייה`, difficulty: 'easy' },
      { text_he: `בריאן מיי, גיטריסט Queen, כתב את רוב מילות השיר יחד עם מרקורי`, difficulty: 'medium' },
      { text_he: `אחרי מותו של מרקורי, אחיו דוד הצהיר שהשיר עוסק בילדותם בזנזיבר`, difficulty: 'hard' },
      { text_he: `פרדי מרקורי כתב את השיר בתקופת היכרותו הראשונה עם מרי אוסטין`, difficulty: 'hard' },
    ],
  },
  q020: { // Adam's Song / Blink-182
    trueStatements: [
      { text_he: `מארק הופוס, באסיסט וסולן Blink-182, כתב את השיר אחרי שקרא מכתב התאבדות אמיתי של מתבגר`, difficulty: 'medium' },
      { text_he: `מארק הופוס היה בודד בסיבובי הופעות בעוד שאר חברי הלהקה חזרו הביתה לבני זוג`, difficulty: 'easy' },
      { text_he: `השם "אדם" בכותרת השיר נלקח מסקיצה של הסדרה הקומית Mr. Show, לא ממקרה אמיתי`, difficulty: 'hard' },
      { text_he: `השיר נכלל באלבום Enema of the State (1999)`, difficulty: 'medium' },
      { text_he: `השיר ספג ביקורת בעקבות התאבדות של ניצולת קולומביין שהאזינה לו ב-loop`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `מארק הופוס, סולן Blink-182, כתב את השיר על ניסיון התאבדות של אחיו האמיתי`, difficulty: 'medium' },
      { text_he: `השם "אדם" בכותרת השיר הוא שם של חבר אמיתי של מארק הופוס מילדותו`, difficulty: 'hard' },
      { text_he: `השיר נכלל באלבום Take Off Your Pants and Jacket (2001)`, difficulty: 'medium' },
      { text_he: `Blink-182 הצהירו שזה "שיר של ייאוש" ולא של תקווה`, difficulty: 'easy' },
    ],
  },
  q021: { // Bullet with Butterfly Wings / Smashing Pumpkins
    trueStatements: [
      { text_he: `בילי קורגן, סולן Smashing Pumpkins, ביטא בשיר תסכול מהמאבק לשמור על שליטה אומנותית אחרי הצלחה מסחרית`, difficulty: 'medium' },
      { text_he: `בילי קורגן סיפר שכתב את השורה המפורסמת "rat in a cage" ספונטנית: "פשוט ישבתי, משועמם, הרמתי את הגיטרה והתחלתי לשיר"`, difficulty: 'hard' },
      { text_he: `בילי קורגן דחף את מילות השיר בכוונה "כמעט לפרודיה" כתגובה לתדמית הקודרת שהתקשורת הצמידה לו`, difficulty: 'hard' },
      { text_he: `השיר נכלל באלבום הכפול "Mellon Collie and the Infinite Sadness" מאוקטובר 1995`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `בילי קורגן, סולן Smashing Pumpkins, ביטא בשיר תקווה אחרי מציאת אהבה חדשה`, difficulty: 'medium' },
      { text_he: `בילי קורגן עבד 6 חודשים על השורה המפורסמת "rat in a cage"`, difficulty: 'hard' },
      { text_he: `השיר נכלל באלבום "Siamese Dream" מ-1993`, difficulty: 'easy' },
      { text_he: `בילי קורגן רצה שמילות השיר יישמעו "אופטימיות וצוהלות" כדי להפתיע את התקשורת`, difficulty: 'hard' },
    ],
  },
  q022: { // Under the Bridge / RHCP
    trueStatements: [
      { text_he: `אנתוני קידיס, סולן Red Hot Chili Peppers, כתב את השורה הראשונה של השיר כשהיה בנהיגה, מרגיש מחוץ לחבורה כי חברי הלהקה ג'ון פרושיאנטה ופלי התקרבו זה לזה`, difficulty: 'medium' },
      { text_he: `אנתוני קידיס היה בהרהור על מותו של חברו הילל סלובאק (גיטריסט הלהקה הקודם) מהתמכרות`, difficulty: 'medium' },
      { text_he: `הגשר שעליו אנתוני קידיס שר אכן קיים בלוס אנג'לס במרכז העיר`, difficulty: 'easy' },
      { text_he: `אנתוני קידיס שמר את המיקום המדויק של הגשר בסוד`, difficulty: 'easy' },
      { text_he: `המפיק ריק רובין מצא את השיר במחברת של אנתוני קידיס ולחץ עליו לפתח אותו`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `אנתוני קידיס, סולן Red Hot Chili Peppers, כתב את השיר בתקופה שבה הרגיש קרוב מתמיד לחברי הלהקה`, difficulty: 'medium' },
      { text_he: `הגשר שעליו אנתוני קידיס שר נמצא בסן פרנסיסקו`, difficulty: 'easy' },
      { text_he: `אנתוני קידיס פרסם את כתובת הגשר המדויקת לאוהדים`, difficulty: 'easy' },
      { text_he: `המפיק ריק רובין הציע לקידיס לזרוק את השיר ולכתוב משהו אחר`, difficulty: 'hard' },
    ],
  },
  q023: { // Ring of Fire / Johnny Cash
    trueStatements: [
      { text_he: `הגרסה המקורית של השיר הוקלטה בשנת 1962 על ידי הזמרת אניטה קרטר (אחותה של ג'ון קרטר)`, difficulty: 'hard' },
      { text_he: `ג'וני קאש הקליט את גרסתו ב-1963 והוסיף את התרועות הטרומפט המיאצקיות`, difficulty: 'medium' },
      { text_he: `ג'ון קרטר וג'וני קאש התחתנו רק ב-1968`, difficulty: 'medium' },
      { text_he: `הזמרת ג'ון קרטר כתבה את השיר יחד עם הזמר מרל קילגור`, difficulty: 'easy' },
      { text_he: `בתה של ג'ון קרטר, רוזאן קאש, הדגישה שהשיר מייצג "את כוח הטרנספורמציה של אהבה"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הגרסה המקורית של השיר הוקלטה ב-1959 על ידי אמה של ג'ון קרטר`, difficulty: 'hard' },
      { text_he: `ג'וני קאש הקליט את גרסתו ב-1965 והוסיף סקסופון`, difficulty: 'medium' },
      { text_he: `ג'ון קרטר וג'וני קאש התחתנו ב-1965`, difficulty: 'medium' },
      { text_he: `הזמרת ג'ון קרטר כתבה את השיר לבד`, difficulty: 'easy' },
    ],
  },
  q024: { // Slide / Goo Goo Dolls
    trueStatements: [
      { text_he: `בהופעה ב-VH1 Storytellers ב-2002 ג'ון רז'זניק, סולן Goo Goo Dolls, הסביר שהשיר עוסק בנערה מתבגרת מסביבה קתולית קפדנית שנכנסת להריון`, difficulty: 'medium' },
      { text_he: `במילות השיר, הנערה ההרה וחברה דנים אם להתחתן או לעשות הפלה`, difficulty: 'easy' },
      { text_he: `בראיון ב-2018 ג'ון רז'זניק הוסיף שהשיר מבוסס על ילדותו בבאפלו`, difficulty: 'hard' },
      { text_he: `ג'ון רז'זניק תיאר את הסביבה הקתולית הקפדנית כ"תרבות נוקשה עם הרבה דרישות"`, difficulty: 'hard' },
      { text_he: `על המילה "slide" עצמה ג'ון רז'זניק אמר שזה היה "משהו אקראי שצץ בראש"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `ג'ון רז'זניק, סולן Goo Goo Dolls, הסביר שהשיר עוסק בעימות בין הורים לילדם המתבגר`, difficulty: 'medium' },
      { text_he: `ג'ון רז'זניק חשף שהשיר מבוסס על חוויה משפחתית בילדותו בלוס אנג'לס`, difficulty: 'hard' },
      { text_he: `ג'ון רז'זניק תיאר את סביבת ילדותו כ"ליברלית ופתוחה"`, difficulty: 'hard' },
      { text_he: `ג'ון רז'זניק אמר ש"slide" זו רמיזה ספציפית לתחושה רגעית של אובדן שליטה`, difficulty: 'medium' },
    ],
  },
  q025: { // The One I Love / R.E.M.
    trueStatements: [
      { text_he: `מייקל סטייפ, סולן R.E.M., אמר על השיר: "הוא ממש אלים ונוראי. חשבתי שזה יותר מדי. ברוטלי מדי"`, difficulty: 'easy' },
      { text_he: `המילים "פרופ פשוט להעסיק את זמני" בשיר מתארות שימוש באדם אחר כמטרה רגשית`, difficulty: 'medium' },
      { text_he: `על המאזינים שמתעקשים לשמוע בשיר שיר אהבה, מייקל סטייפ אמר ב-2016: "אנשים לא הבינו, אז זה בסדר"`, difficulty: 'hard' },
      { text_he: `מייקל סטייפ הוסיף ב-2016: "עכשיו זה שיר אהבה, אז זה בסדר"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `מייקל סטייפ, סולן R.E.M., אמר על השיר: "הוא רומנטי ועדין. השיר הכי כן שכתבתי"`, difficulty: 'easy' },
      { text_he: `מילות השיר מתארות מסירות אמיתית של אדם אוהב`, difficulty: 'medium' },
      { text_he: `מייקל סטייפ אמר ב-2016 שהוא מצטער על שכתב שיר ציני שכזה`, difficulty: 'hard' },
      { text_he: `R.E.M. הוציאו גרסה מתוקנת של השיר עם מילים רומנטיות יותר`, difficulty: 'hard' },
    ],
  },
  q026: { // Brown Sugar / Rolling Stones
    trueStatements: [
      { text_he: `השיר יצא באפריל 1971 כסינגל הראשון מאלבום Sticky Fingers`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 בארה"ב ובקנדה`, difficulty: 'easy' },
      { text_he: `בראיון לרולינג סטון מ-1995 מיק ג'אגר אמר: "כיום הייתי מצנזר את עצמי. הייתי חושב — לא, אני לא יכול לכתוב ככה גלמית"`, difficulty: 'hard' },
      { text_he: `Rolling Stones הסירו את השיר מסטליסט ההופעות שלהם ב-2021`, difficulty: 'easy' },
      { text_he: `הגיטריסט קית' ריצ'רדס אמר על ההסרה: "אני מנסה להבין עם הנשים איפה בדיוק הבעיה. הן לא הבינו שזה שיר על זוועות העבדות?"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `השיר יצא ב-1969 כסינגל מאלבום "Let It Bleed"`, difficulty: 'medium' },
      { text_he: `השיר הגיע רק למקום 5 בארה"ב`, difficulty: 'easy' },
      { text_he: `מיק ג'אגר אמר ב-1995: "אני גאה במילים האלה היום כמו שהייתי אז"`, difficulty: 'hard' },
      { text_he: `Rolling Stones הסירו את השיר מסטליסט ההופעות ב-2008`, difficulty: 'easy' },
    ],
  },
  q027: { // Zombie / Cranberries
    trueStatements: [
      { text_he: `הפיגוע שעליו השיר מבוסס התרחש ב-20 במרץ 1993 בעיירה וורינגטון, אנגליה`, difficulty: 'medium' },
      { text_he: `מטעני הנפץ של ה-IRA הוסתרו בפחי אשפה ברחוב מסחרי בוורינגטון`, difficulty: 'hard' },
      { text_he: `ג'ונתן בול בן ה-3 נהרג במקום בפיגוע`, difficulty: 'easy' },
      { text_he: `טים פארי בן ה-12 נפטר בבית החולים 5 ימים אחרי הפיגוע מפצעי ראש`, difficulty: 'medium' },
      { text_he: `הסולנית דולורס אוריורדן הדגישה: "אני לא ה-IRA. כשבשיר נאמר 'זה לא אני, זו לא משפחתי' — זה מה שאני אומרת"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `הפיגוע שעליו השיר מבוסס התרחש בלונדון, לא בוורינגטון`, difficulty: 'medium' },
      { text_he: `מטעני הנפץ הוסתרו במכוניות חניה`, difficulty: 'hard' },
      { text_he: `ג'ונתן בול היה בן 7 בעת הפיגוע`, difficulty: 'easy' },
      { text_he: `הסולנית דולורס אוריורדן הצהירה שהיא תומכת במאבק ה-IRA`, difficulty: 'hard' },
    ],
  },
  q028: { // Sunday Bloody Sunday / U2
    trueStatements: [
      { text_he: `הסולן בונו פתח מסורת של הצהרת "זה לא שיר מורד" ב-1983 בהופעה ב-Red Rocks בקולורדו`, difficulty: 'medium' },
      { text_he: `U2 ספגו ביקורת מכל צדדי המגזר הפוליטי על השיר`, difficulty: 'easy' },
      { text_he: `המתופף לארי מאלן אמר על השיר: "אנשים מתים כל יום מתוך מרירות ושנאה — ואנחנו אומרים למה?"`, difficulty: 'hard' },
      { text_he: `השיר יצא ב-21 במרץ 1983 באלבום War של U2`, difficulty: 'medium' },
      { text_he: `ב'יום ראשון העקוב מדם' ב-1972 חיילים בריטיים הרגו 14 מפגינים בצפון אירלנד`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `בונו פתח את מסורת ה"לא שיר מורד" בהופעה בלונדון ב-1985`, difficulty: 'medium' },
      { text_he: `הציטוט "אנשים מתים כל יום" נאמר על ידי הגיטריסט אדג', לא על ידי לארי מאלן`, difficulty: 'hard' },
      { text_he: `השיר יצא באוגוסט 1984 באלבום The Unforgettable Fire`, difficulty: 'medium' },
      { text_he: `ב'יום ראשון העקוב מדם' ב-1972 הרגו חיילים 21 מפגינים`, difficulty: 'easy' },
    ],
  },
  q029: { // Lola / The Kinks
    trueStatements: [
      { text_he: `אחת הגרסאות שריי דייוויס, סולן The Kinks, סיפר על מקור השיר היא על המנהל רוברט וייס שרקד עם אישה במועדון וגילה בסוף הערב שזה גבר עם זיפי זקן`, difficulty: 'medium' },
      { text_he: `גרסה נוספת שריי דייוויס סיפר היא על חוויה שלו עצמו במועדון בפריז`, difficulty: 'hard' },
      { text_he: `ה-BBC אסר את השיר בגלל אזכור "Coca-Cola" שהפר את מדיניות פרסום המוצרים`, difficulty: 'easy' },
      { text_he: `ריי דייוויס נאלץ להקליט מחדש את המילים כ-"cherry cola"`, difficulty: 'medium' },
      { text_he: `נושאי הזהות המגדרית בשיר עצמם לא היו הסיבה לאיסור ב-BBC`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `מנהל הלהקה רוברט וייס היה זה ששר את השיר במקור`, difficulty: 'medium' },
      { text_he: `ריי דייוויס תמיד הכחיש שהיה לו קשר אישי לסיפור`, difficulty: 'hard' },
      { text_he: `ה-BBC אסר את השיר בגלל אזכור הזהות המגדרית של לולה`, difficulty: 'easy' },
      { text_he: `ריי דייוויס נאלץ להקליט מחדש את המילים כ-"diet cola"`, difficulty: 'medium' },
    ],
  },
  q030: { // Afternoon Delight / Starland Vocal Band
    trueStatements: [
      { text_he: `ביל דנוף, הכותב של השיר, אמר ש"לא רציתי לכתוב שיר סקס מוחלט, רק משהו כיפי שמרמז על סקס"`, difficulty: 'medium' },
      { text_he: `הרעיון לשיר נולד מתפריט מסעדת Clyde's of Georgetown שבה "Afternoon Delight" הופיע כשם של מנת פתיחה`, difficulty: 'hard' },
      { text_he: `הגיטרה הפדל-סטיל אחרי השורה "skyrockets in flight" עוצבה במכוון לדמות זיקוקים`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום הראשון בבילבורד ב-10 ביולי 1976`, difficulty: 'medium' },
      { text_he: `השיר הגיע למקום 1 בשיא חגיגות 200 שנה לארה"ב`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ביל דנוף, הכותב, הצהיר שכתב את השיר במכוון כשיר סקס גלוי`, difficulty: 'medium' },
      { text_he: `הרעיון לשיר נולד משלט פרסומת לבית הארחה בורמונט`, difficulty: 'hard' },
      { text_he: `הגיטרה הפדל-סטיל בשיר הוספה במקרה ולא בקשר למילים`, difficulty: 'hard' },
      { text_he: `השיר הגיע למקום הראשון בבילבורד בדצמבר 1976`, difficulty: 'medium' },
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
