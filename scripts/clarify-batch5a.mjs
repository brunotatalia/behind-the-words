#!/usr/bin/env node
// Self-contained statements pass — batch 5a: q300-q345
// Rule: every statement readable in isolation given only the song header.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const fixed = {
  q300: { // Despacito / Luis Fonsi ft. Daddy Yankee
    trueStatements: [
      { text_he: `Despacito היה הסינגל השני הגדול של 2017 ב-Billboard Hot 100`, difficulty: 'medium' },
      { text_he: `Despacito עמד 16 שבועות במקום 1 בבילבורד הוט 100`, difficulty: 'medium' },
      { text_he: `הקליפ של Despacito בבימוי בריאן פרס היה הראשון אי פעם להגיע ל-3 מיליארד צפיות ב-YouTube (אוגוסט 2017)`, difficulty: 'easy' },
      { text_he: `לואיס פונסי ודאדי יאנקי כתבו את Despacito בפורטו ריקו על מקצב רגאטון איטי`, difficulty: 'medium' },
      { text_he: `הרמיקס של Despacito עם ג'סטין ביבר תרם לחזרת המוזיקה הלטינית למיינסטרים העולמי`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Despacito עמד 30 שבועות במקום 1 בבילבורד`, difficulty: 'medium' },
      { text_he: `הקליפ של Despacito היה הראשון להגיע ל-1 מיליארד צפיות בלבד`, difficulty: 'hard' },
      { text_he: `לואיס פונסי ודאדי יאנקי כתבו את Despacito ביוסטון, טקסס`, difficulty: 'medium' },
      { text_he: `Despacito היה הסינגל היחיד בספרדית בעשירייה הראשונה של 2017`, difficulty: 'hard' },
    ],
  },
  q302: { // Hijo de la Luna / Mecano
    trueStatements: [
      { text_he: `השיר נכתב על ידי חוסה מריה קאנו, חבר Mecano`, difficulty: 'medium' },
      { text_he: `הסולנית של Mecano, אנה תורוחה, היא ששרה את השיר אבל לא כתבה אותו`, difficulty: 'medium' },
      { text_he: `Hijo de la Luna יצא ב-1986 מאלבום Mecano "Entre el cielo y el suelo"`, difficulty: 'easy' },
      { text_he: `בעלילת Hijo de la Luna, התינוק נולד לבקן (אלבינו) בגלל היותו "בן הירח"`, difficulty: 'hard' },
      { text_he: `בעלילת Hijo de la Luna, האב חושב שהעור הלבן של התינוק הוא עדות לבגידה ורוצח את האם בסכין`, difficulty: 'hard' },
      { text_he: `הסיפור של Hijo de la Luna מבוסס על אגדה רומאני (צוענים) קלאסית`, difficulty: 'medium' },
      { text_he: `Hijo de la Luna זכה לכיסויים ב-12 שפות`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Hijo de la Luna נכתב על ידי הסולנית אנה תורוחה`, difficulty: 'medium' },
      { text_he: `Hijo de la Luna יצא ב-1990 מאלבום Mecano "Aidalai"`, difficulty: 'medium' },
      { text_he: `בעלילת Hijo de la Luna התינוק נולד שחור, מה שגרם לחשד הבגידה`, difficulty: 'hard' },
      { text_he: `הסיפור של Hijo de la Luna מבוסס על אגדה יוונית עתיקה`, difficulty: 'medium' },
    ],
  },
  q303: { // Gasolina / Daddy Yankee
    trueStatements: [
      { text_he: `דאדי יאנקי הכחיש במפורש כל פרשנות מינית של Gasolina: "השיר לחלוטין מילולי. זה השיר הכי תמים שכתבתי"`, difficulty: 'medium' },
      { text_he: `Gasolina יצא ב-2004 ונחשב למבשר הפריצה הגלובלית של ז'אנר הרגאטון`, difficulty: 'easy' },
      { text_he: `Gasolina הגיע למקום 32 בבילבורד הוט 100 — דבר נדיר ביותר לשיר ספרדית בלעדית באותה תקופה`, difficulty: 'hard' },
      { text_he: `ב-2008 הסנאטור הרפובליקני ג'ון מקיין השתמש ב-Gasolina בקמפיין הנשיאות שלו`, difficulty: 'medium' },
      { text_he: `השימוש של ג'ון מקיין ב-Gasolina עורר ויכוח אם הוא וצוותו "הבינו את הדאבל-אנטנדרים"`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `דאדי יאנקי אישר ש-Gasolina הוא מטאפורה מינית`, difficulty: 'medium' },
      { text_he: `Gasolina הגיע למקום 1 בבילבורד הוט 100`, difficulty: 'easy' },
      { text_he: `ב-2008 ברק אובמה השתמש ב-Gasolina בקמפיין הנשיאות שלו`, difficulty: 'medium' },
      { text_he: `Gasolina נכתב במקור באנגלית ותורגם לספרדית`, difficulty: 'hard' },
    ],
  },
  q305: { // Lambada / Kaoma
    trueStatements: [
      { text_he: `הלהקה Kaoma זקפה את הקרדיט של Lambada ל"שיקו דה אוליבירה" המומצא במקום למחברים האמיתיים`, difficulty: 'medium' },
      { text_he: `המחברים האמיתיים של Lambada הם חברי הלהקה הבוליביאנית Los Kjarkas`, difficulty: 'medium' },
      { text_he: `Los Kjarkas רישמו את היצירה ב-1981 במכון התרבות הבוליביאני (IBC)`, difficulty: 'hard' },
      { text_he: `אחרי מספר תביעות שהחלו ב-1990, חברי Los Kjarkas זכו בזכויות היוצרים על Lambada`, difficulty: 'medium' },
      { text_he: `המקור של Lambada הוא בעצמו עיבוד למוזיקה אנדינית מסורתית בסגנון "סיאוי"`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `Kaoma זקפו את הקרדיט הראשוני של Lambada לעצמם ולא אזכרו אף מקור`, difficulty: 'medium' },
      { text_he: `Los Kjarkas היא להקה ארגנטינאית, לא בוליביאנית`, difficulty: 'medium' },
      { text_he: `Los Kjarkas הפסידו לבסוף את התביעה לזכויות היוצרים על Lambada`, difficulty: 'hard' },
      { text_he: `המקור של Lambada הוא יצירה מקורית לחלוטין של Los Kjarkas, ללא מקור מוקדם`, difficulty: 'hard' },
    ],
  },
  q306: { // La Tortura / Shakira ft. Alejandro Sanz
    trueStatements: [
      { text_he: `La Tortura יצא ב-11 באפריל 2005 כסינגל הראשון מאלבום שאקירה "Fijación Oral, Vol. 1"`, difficulty: 'medium' },
      { text_he: `La Tortura היה הדואט הראשון של שאקירה ואלחנדרו סאנז`, difficulty: 'medium' },
      { text_he: `La Tortura עמד 25 שבועות במקום 1 ב-Billboard Hot Latin Songs`, difficulty: 'hard' },
      { text_he: `שיא ה-25 שבועות של La Tortura ב-Hot Latin Songs נשבר רק על ידי "Despacito" ב-2017`, difficulty: 'hard' },
      { text_he: `הקליפ של La Tortura בבימוי מייקל הוסמן זכה ב-Latin Grammy לקליפ הטוב ביותר`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `La Tortura יצא ב-2003 כסינגל מאלבום שאקירה "Laundry Service"`, difficulty: 'medium' },
      { text_he: `La Tortura היה הדואט החמישי של שאקירה ואלחנדרו סאנז`, difficulty: 'hard' },
      { text_he: `La Tortura עמד 5 שבועות במקום 1 בלבד ב-Hot Latin Songs`, difficulty: 'medium' },
      { text_he: `הקליפ של La Tortura זכה ב-MTV VMA לקליפ הטוב`, difficulty: 'medium' },
    ],
  },
  q308: { // Aserejé / Las Ketchup
    trueStatements: [
      { text_he: `Aserejé עוסק בבחור בשם דייגו שמגיע למועדון`, difficulty: 'medium' },
      { text_he: `בעלילת Aserejé, ה-DJ של המועדון, חבר של דייגו, משמיע לו את "Rapper's Delight" של Sugarhill Gang`, difficulty: 'hard' },
      { text_he: `דייגו ב-Aserejé מנסה לרקוד ולשיר יחד עם "Rapper's Delight" אבל מעוות את המילים האנגליות לג'יבריש ספרדי`, difficulty: 'medium' },
      { text_he: `הפזמון "Aserejé Ja De Jé" הוא חיקוי לא מדויק של "I said a hip-hop, the hippie the hippie to the hip hip hop" מ-"Rapper's Delight"`, difficulty: 'hard' },
      { text_he: `Aserejé יצא ב-10 ביוני 2002`, difficulty: 'easy' },
      { text_he: `Aserejé מכר מעל 7 מיליון עותקים בעולם`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הפזמון "Aserejé Ja De Jé" הוא חיקוי של שיר מקורי בספרדית`, difficulty: 'medium' },
      { text_he: `Aserejé יצא ב-2005`, difficulty: 'easy' },
      { text_he: `Aserejé מכר מיליון עותקים בלבד בעולם`, difficulty: 'medium' },
      { text_he: `הסיפור ב-Aserejé עוסק בבחורה בשם פאולה ולא בבחור בשם דייגו`, difficulty: 'hard' },
    ],
  },
  q309: { // Como La Flor / Selena
    trueStatements: [
      { text_he: `Como La Flor יצא ביוני 1992 כסינגל השני מאלבום סלנה "Entre a Mi Mundo"`, difficulty: 'medium' },
      { text_he: `Como La Flor נכנס למקום 36 ב-Billboard Hot Latin Songs`, difficulty: 'medium' },
      { text_he: `סלנה קוונטנייה הייתה בת 23 כשנרצחה`, difficulty: 'easy' },
      { text_he: `סלנה קוונטנייה נורתה למוות ב-31 במרץ 1995`, difficulty: 'medium' },
      { text_he: `הרוצחת של סלנה הייתה יולנדה סלדיוואר, מי שהקימה את מועדון המעריצים של סלנה ב-1991`, difficulty: 'hard' },
      { text_he: `יולנדה סלדיוואר ניהלה את חנויות הבוטיקס של סלנה לפני שרצחה אותה`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Como La Flor יצא ב-1990 כסינגל הראשון של סלנה`, difficulty: 'medium' },
      { text_he: `סלנה הייתה בת 25 כשנרצחה`, difficulty: 'easy' },
      { text_he: `סלנה נרצחה על ידי בעלה לשעבר ב-1995`, difficulty: 'medium' },
      { text_he: `יולנדה סלדיוואר, רוצחת סלנה, הייתה אחותה`, difficulty: 'hard' },
    ],
  },
  q310: { // Obsesión / Aventura
    trueStatements: [
      { text_he: `Aventura, מבצעי Obsesión, הם להקה של צעירים דומיניקנים-אמריקאים מהברונקס`, difficulty: 'medium' },
      { text_he: `Aventura הפכו את הבצ'אטה (סגנון מסורתי דומיניקני) ללהיט פופ עולמי`, difficulty: 'medium' },
      { text_he: `Obsesión אומר במפורש "זו לא אהבה, זו אובססיה"`, difficulty: 'easy' },
      { text_he: `הקצב הקליל של Obsesión גרם לו להפוך לקלאסיקה של חתונות`, difficulty: 'medium' },
      { text_he: `Obsesión עמד 16 שבועות במקום 1 ב-Billboard Hot Latin Songs ב-2002`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `Aventura היא להקה פורטוריקנית מסן חואן`, difficulty: 'medium' },
      { text_he: `Aventura המציאו את הז'אנר הבצ'אטה`, difficulty: 'medium' },
      { text_he: `Obsesión עמד 4 שבועות במקום 1 ב-Hot Latin Songs`, difficulty: 'medium' },
      { text_he: `המילים ב-Obsesión אומרות "זו אהבה אמיתית"`, difficulty: 'hard' },
    ],
  },
  q311: { // La Bamba / Ritchie Valens
    trueStatements: [
      { text_he: `משפחת ולנזואלה (משפחתו של ריצ'י ולנס) דיברה רק אנגלית בבית`, difficulty: 'medium' },
      { text_he: `ריצ'י ולנס ידע מעט מאוד ספרדית — הוא למד את המילים של "La Bamba" פונטית`, difficulty: 'medium' },
      { text_he: `"La Bamba" הוא קלאסיקה של "סון חרוצ'ו" מוורה קרוז שבמקסיקו`, difficulty: 'hard' },
      { text_he: `ריצ'י ולנס נהרג בגיל 17 בהתרסקות מטוס באיווה`, difficulty: 'easy' },
      { text_he: `התאונה שבה נהרג ריצ'י ולנס הייתה ב-3 בפברואר 1959`, difficulty: 'medium' },
      { text_he: `ריצ'י ולנס נהרג יחד עם באדי הולי ו-Big Bopper באותה התרסקות מטוס`, difficulty: 'easy' },
      { text_he: `דון מקלין הנציח את התרסקות המטוס שבה נהרג ריצ'י ולנס כ"היום שבו המוזיקה מתה" בשירו "American Pie"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ריצ'י ולנס דיבר ספרדית בבית מקטנותו`, difficulty: 'medium' },
      { text_he: `"La Bamba" הוא שיר אהבה מקסיקני קלאסי`, difficulty: 'hard' },
      { text_he: `ריצ'י ולנס נהרג בגיל 19 בתאונת מכונית`, difficulty: 'easy' },
      { text_he: `ריצ'י ולנס נהרג בתאונת המטוס ב-3 בפברואר 1962`, difficulty: 'medium' },
    ],
  },
  q312: { // Clandestino / Manu Chao
    trueStatements: [
      { text_he: `הוריו של מאנו צ'או היגרו מספרד לפריז כדי להימלט מדיקטטורת פרנקו`, difficulty: 'medium' },
      { text_he: `סבו של מאנו צ'או נידון למוות במשטר פרנקו בספרד`, difficulty: 'hard' },
      { text_he: `אביו של מאנו צ'או היה הכותב והעיתונאי רמון צ'או`, difficulty: 'medium' },
      { text_he: `מאנו צ'או הסביר על Clandestino: "כתבתי אותו על הגבול בין אירופה לאלה שמגיעים ממדינות עניות יותר"`, difficulty: 'medium' },
      { text_he: `אלבום מאנו צ'או "Clandestino" יצא ב-1998`, difficulty: 'easy' },
      { text_he: `הסינגל Clandestino יצא ב-2000`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `הוריו של מאנו צ'או היגרו מקובה לפריז`, difficulty: 'medium' },
      { text_he: `אביו של מאנו צ'או היה רופא במקצועו`, difficulty: 'medium' },
      { text_he: `מאנו צ'או הצהיר ש-Clandestino עוסק ספציפית במקסיקנים בארה"ב`, difficulty: 'hard' },
      { text_he: `אלבום מאנו צ'או "Clandestino" יצא ב-1995`, difficulty: 'medium' },
    ],
  },
  q313: { // Suavemente / Elvis Crespo
    trueStatements: [
      { text_he: `המרנגה (סגנון הריקוד שעליו בנוי Suavemente) היא סגנון ריקוד מסורתי דומיניקני`, difficulty: 'medium' },
      { text_he: `Suavemente עזר להפוך את המרנגה ללהיט מיינסטרים בארה"ב`, difficulty: 'medium' },
      { text_he: `אלביס קרספו, יליד פורטו ריקו, הצליח דרך Suavemente להחזיר את המרנגה לרדיו אחרי שנים שבהן הסלסה דחקה אותה`, difficulty: 'hard' },
      { text_he: `Suavemente הגיע למקום 1 ב-Billboard Hot Latin Songs ב-16 במאי 1998`, difficulty: 'medium' },
      { text_he: `אלביס קרספו היה זמר המרנגה הראשון מאז חואן לואיס גוורה ב-1992 שהגיע למקום 1 ב-Hot Latin Songs`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `המרנגה היא סגנון ריקוד פורטוריקני מסורתי`, difficulty: 'medium' },
      { text_he: `אלביס קרספו נולד וגדל בקובה`, difficulty: 'medium' },
      { text_he: `Suavemente הגיע למקום 1 ב-Billboard Hot 100 (לא Hot Latin Songs)`, difficulty: 'hard' },
      { text_he: `אלביס קרספו היה הזמר הראשון אי פעם להגיע למקום 1 ב-Hot Latin Songs`, difficulty: 'medium' },
    ],
  },
  q314: { // Danza Kuduro / Don Omar ft. Lucenzo
    trueStatements: [
      { text_he: `קודורו, סגנון המוזיקה של Danza Kuduro, נולד בלואנדה שבאנגולה בסוף שנות ה-80`, difficulty: 'medium' },
      { text_he: `קודורו פופולרי בקרב קהילות אנגוליות בפרברי ליסבון`, difficulty: 'medium' },
      { text_he: `השכונות העיקריות בליסבון בהן פופולרי הקודורו הן אמדורה וקלוז`, difficulty: 'hard' },
      { text_he: `השם "קודורו" מתייחס לתנועה שבה הרקדנים נראים עם "ישבן קשה" (Cu Duro בפורטוגזית)`, difficulty: 'hard' },
      { text_he: `Danza Kuduro מערבב ספרדית מפי דון אומר עם פורטוגזית אירופית מפי לוצ'נזו`, difficulty: 'medium' },
      { text_he: `Danza Kuduro נכלל באלבום "Lucenzo" משנת 2010`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `קודורו הוא סגנון ברזילאי מהפבלות של ריו דה ז'נירו`, difficulty: 'medium' },
      { text_he: `קודורו, סגנון המוזיקה של Danza Kuduro, נולד בקייפ ורדה`, difficulty: 'medium' },
      { text_he: `השם "קודורו" פירושו "ריקוד אש" בפורטוגזית`, difficulty: 'hard' },
      { text_he: `Danza Kuduro משלב צרפתית וערבית בנוסף לספרדית`, difficulty: 'medium' },
    ],
  },
  q315: { // Oye Como Va / Tito Puente
    trueStatements: [
      { text_he: `טיטו פואנטה (1923-2000) גדל בהארלם הספרדי בניו יורק להורים פורטוריקניים`, difficulty: 'medium' },
      { text_he: `טיטו פואנטה נחשב ל"מלך הטימבאלס" — תוף עומד אופייני למוזיקה הקובנית`, difficulty: 'hard' },
      { text_he: `כשקרלוס סנטנה הוציא ב-1970 את גרסתו ל-Oye Como Va, טיטו פואנטה תחילה כעס שלא ביקשו רשות`, difficulty: 'medium' },
      { text_he: `אחר כך טיטו פואנטה אמר שגרסת קרלוס סנטנה ל-Oye Como Va "הביאה את המוזיקה הלטינית לעולם"`, difficulty: 'medium' },
      { text_he: `התמלוגים שטיטו פואנטה קיבל מגרסת סנטנה ל-Oye Como Va הביאו לו פנסיה נוחה`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `טיטו פואנטה גדל בקובה לפני שעלה לארה"ב`, difficulty: 'medium' },
      { text_he: `טיטו פואנטה נחשב ל"מלך הקונגה"`, difficulty: 'hard' },
      { text_he: `טיטו פואנטה תבע את קרלוס סנטנה על השימוש ב-Oye Como Va ללא רשות`, difficulty: 'medium' },
      { text_he: `טיטו פואנטה לא קיבל תמלוגים מגרסת סנטנה ל-Oye Como Va`, difficulty: 'medium' },
    ],
  },
  q316: { // Bamboleo / Gipsy Kings
    trueStatements: [
      { text_he: `אלבום הבכורה של Gipsy Kings (שכלל את Bamboléo) יצא ב-1987 (1989 בארה"ב)`, difficulty: 'medium' },
      { text_he: `אלבום הבכורה של Gipsy Kings כלל את "Bamboléo", "Djobi Djoba" ו-"Un Amor"`, difficulty: 'medium' },
      { text_he: `אלבום הבכורה של Gipsy Kings עמד 40 שבועות במצעדי ארה"ב — הישג נדיר לאלבום בספרדית`, difficulty: 'hard' },
      { text_he: `Gipsy Kings, להקת Bamboléo, הפכה את הפלמנקו לז'אנר מיינסטרים עולמי`, difficulty: 'easy' },
      { text_he: `בני המשפחות Reyes ו-Baliardo הם הגרעין של Gipsy Kings`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `אלבום הבכורה של Gipsy Kings יצא ב-1985`, difficulty: 'medium' },
      { text_he: `אלבום הבכורה של Gipsy Kings עמד שבועיים בלבד במצעדי ארה"ב`, difficulty: 'medium' },
      { text_he: `Gipsy Kings התמחתה במוזיקה אלקטרונית מודרנית`, difficulty: 'hard' },
      { text_he: `Gipsy Kings מורכבת מבני משפחה אחת בלבד — Reyes`, difficulty: 'medium' },
    ],
  },
  q317: { // Bidi Bidi Bom Bom / Selena
    trueStatements: [
      { text_he: `הצלילים "בידי בידי בום בום" בשיר הם אונומטופאה — חיקוי של דפיקות לב מהירות`, difficulty: 'medium' },
      { text_he: `סלנה קוונטנייה נולדה ב-1971 ב-Lake Jackson שבטקסס`, difficulty: 'medium' },
      { text_he: `סלנה קוונטנייה גדלה בבית דובר אנגלית בלבד`, difficulty: 'medium' },
      { text_he: `אביה של סלנה קוונטנייה לימד אותה ספרדית פונטית כדי שתוכל לשיר מוזיקה טחאנו`, difficulty: 'hard' },
      { text_he: `Bidi Bidi Bom Bom יצא ב-31 ביולי 1994 מאלבום סלנה "Amor Prohibido"`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `הצלילים "בידי בידי בום בום" הם תרגום של ביטוי מקסיקני`, difficulty: 'medium' },
      { text_he: `סלנה קוונטנייה נולדה ב-1969 בקליפורניה`, difficulty: 'medium' },
      { text_he: `סלנה קוונטנייה דיברה ספרדית מבית כשפת אם`, difficulty: 'medium' },
      { text_he: `Bidi Bidi Bom Bom יצא ב-1992 מאלבום סלנה "Entre a Mi Mundo"`, difficulty: 'hard' },
    ],
  },
  q318: { // Conga / Gloria Estefan
    trueStatements: [
      { text_he: `משפחת פאחארדו של גלוריה אסטפן ברחה מקובה אחרי המהפכה הקובנית והתיישבה במיאמי ב-1959`, difficulty: 'medium' },
      { text_he: `אביה של גלוריה אסטפן השתתף בכישלון פלישת מפרץ החזירים ב-1961`, difficulty: 'hard' },
      { text_he: `Conga הגיע למקום 10 בבילבורד הוט 100 ב-1985`, difficulty: 'medium' },
      { text_he: `Conga היה הראשון מתוך ארבעה להיטים שגלוריה אסטפן ולהקתה Miami Sound Machine הגיעו עמם לעשירייה הראשונה של בילבורד`, difficulty: 'hard' },
      { text_he: `גלוריה אסטפן גרה עד היום באיי הכוכבים במיאמי ביץ'`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `משפחת פאחארדו של גלוריה אסטפן ברחה מקובה ב-1965`, difficulty: 'medium' },
      { text_he: `Conga הגיע למקום 1 בבילבורד הוט 100 ב-1985`, difficulty: 'medium' },
      { text_he: `אביה של גלוריה אסטפן היה רופא במאיאמי`, difficulty: 'hard' },
      { text_he: `גלוריה אסטפן עברה לחיות בקובה אחרי המהפכה ההפוכה`, difficulty: 'medium' },
    ],
  },
  q319: { // Ella Baila Sola / Eslabon Armado & Peso Pluma
    trueStatements: [
      { text_he: `Ella Baila Sola מתאר שני צעירים במסיבה שרואים אישה שרוקדת לבד`, difficulty: 'medium' },
      { text_he: `מילי Ella Baila Sola עצמן לא מכילות רמזים לסמים`, difficulty: 'hard' },
      { text_he: `הז'אנר של Ella Baila Sola ושירים אחרים של פסו פלומה שמתייחסים ל"אל צ'אפו" גוזמן ולקרטל סינלואה הם שגרמו לאיומי הקרטל על פסו פלומה`, difficulty: 'hard' },
      { text_he: `ב-2023 פסו פלומה הפך, בעקבות הצלחת Ella Baila Sola, לאמן הלטיני האזורי הראשון אי פעם להגיע למקום 1 בבילבורד 200`, difficulty: 'medium' },
      { text_he: `פסו פלומה ביטל הופעה בטיחואנה ב-14 באוקטובר 2023 בעקבות איומי קרטל ז'אליסקו`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Ella Baila Sola מכיל במילותיו רמזים מפורשים לסחר בקוקאין`, difficulty: 'medium' },
      { text_he: `איומי המוות על פסו פלומה היו מקרטל סינלואה`, difficulty: 'hard' },
      { text_he: `פסו פלומה לעולם לא ביטל הופעה בעקבות איומים`, difficulty: 'medium' },
      { text_he: `Ella Baila Sola היה הסינגל הראשון בז'אנר ה-reggaeton להגיע למקום 1 בבילבורד 200`, difficulty: 'hard' },
    ],
  },
  q320: { // Bailando / Enrique Iglesias
    trueStatements: [
      { text_he: `Bailando יצא ב-11 באפריל 2014`, difficulty: 'easy' },
      { text_he: `Bailando יצא בשתי גרסאות עיקריות — ספרדית ואנגלית`, difficulty: 'medium' },
      { text_he: `הגרסה הספרדית של Bailando היא של אנריקה איגלסיאס עם הקובנים Descemer Bueno ו-Gente de Zona`, difficulty: 'medium' },
      { text_he: `הגרסה האנגלית של Bailando היא של אנריקה איגלסיאס עם הזמר הג'מייקני שון פול`, difficulty: 'medium' },
      { text_he: `הגרסה הספרדית של Bailando עמדה 41 שבועות במקום 1 ב-Billboard Hot Latin Songs — שיא בכל הזמנים`, difficulty: 'hard' },
      { text_he: `Bailando הפך לאחד השירים המזוהים ביותר עם תקופת הגל הלטיני השני בארה"ב`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Bailando יצא ב-2012 ביוזמת אנריקה איגלסיאס`, difficulty: 'medium' },
      { text_he: `הגרסה הספרדית של Bailando היא של אנריקה איגלסיאס עם שאקירה`, difficulty: 'medium' },
      { text_he: `הגרסה האנגלית של Bailando היא של אנריקה איגלסיאס עם פיטבול`, difficulty: 'medium' },
      { text_he: `הגרסה הספרדית של Bailando עמדה 4 שבועות במקום 1 ב-Hot Latin Songs`, difficulty: 'hard' },
    ],
  },
  q321: { // Corazón Partío / Alejandro Sanz
    trueStatements: [
      { text_he: `Corazón Partío יצא ב-3 בנובמבר 1997 מאלבום אלחנדרו סאנז "Más"`, difficulty: 'medium' },
      { text_he: `אלבום אלחנדרו סאנז "Más" הפך לאלבום הספרדי הנמכר ביותר בכל הזמנים בספרד`, difficulty: 'hard' },
      { text_he: `Corazón Partío עיצב מחדש את סאונד הפופ הספרדי בשילוב פלמנקו וג'אז`, difficulty: 'medium' },
      { text_he: `Corazón Partío פתח את הקריירה הבינלאומית של אלחנדרו סאנז`, difficulty: 'medium' },
      { text_he: `Corazón Partío נחשב ל"היט שגרם למהפכה" בפופ הספרדי של שנות ה-90`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `Corazón Partío יצא ב-1995 מאלבום הבכורה של אלחנדרו סאנז`, difficulty: 'medium' },
      { text_he: `אלבום אלחנדרו סאנז "Más" נכשל מסחרית בספרד`, difficulty: 'medium' },
      { text_he: `אלחנדרו סאנז שילב ב-Corazón Partío בעיקר רגאי וסקה בסאונד`, difficulty: 'hard' },
      { text_he: `Corazón Partío היה הסינגל האחרון של אלחנדרו סאנז לפני יציאתו לפנסיה`, difficulty: 'medium' },
    ],
  },
  q324: { // Aïcha / Khaled
    trueStatements: [
      { text_he: `Aïcha יצא ב-1996 והפך להיט עולמי`, difficulty: 'easy' },
      { text_he: `הכותב הצרפתי החשוב ז'אן-ז'אק גולדמן כתב את הגרסה הצרפתית של Aïcha`, difficulty: 'medium' },
      { text_he: `חאלד הוסיף ושינה את המילים בערבית של Aïcha באלתור`, difficulty: 'medium' },
      { text_he: `Aïcha זכה ב-Victoires de la Musique לשיר הצרפתי הטוב של 1997`, difficulty: 'hard' },
      { text_he: `הקליפ של Aïcha עם חאלד שר ברחובות פריז הפך לאיקוני`, difficulty: 'medium' },
      { text_he: `Aïcha נחשב להמנון של תרבות "ראי-פופ" הצרפתית של שנות ה-90`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Aïcha נכתב על ידי המלחין הסרבי גוראן ברגוביץ'`, difficulty: 'hard' },
      { text_he: `חאלד כתב את כל מילות Aïcha בעצמו`, difficulty: 'medium' },
      { text_he: `Aïcha זכה בגראמי לשיר עולמי הטוב ב-1997`, difficulty: 'medium' },
      { text_he: `הקליפ של Aïcha צולם באלג'יריה ולא בפריז`, difficulty: 'medium' },
    ],
  },
  q325: { // Nour El Ain / Amr Diab
    trueStatements: [
      { text_he: `עמרו דיאב הוא אחד מאמני הפופ הערביים המצליחים בכל הזמנים — מעל 100 מיליון אלבומים נמכרו`, difficulty: 'medium' },
      { text_he: `עמרו דיאב השפיע על אסתטיקת קליפים ערבית מודרנית`, difficulty: 'medium' },
      { text_he: `הקליפ של Nour El Ain צולם בנופים אגדיים`, difficulty: 'easy' },
      { text_he: `Nour El Ain זכה לכיסויים בעשרות שפות, כולל בהינדי לבוליווד`, difficulty: 'medium' },
      { text_he: `אלבום Nour El Ain של עמרו דיאב זכה בפרס World Music Award כאלבום הנמכר ביותר במזרח התיכון לשנת 1996`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `עמרו דיאב מכר 10 מיליון אלבומים בלבד בכל הקריירה`, difficulty: 'medium' },
      { text_he: `הקליפ של Nour El Ain צולם באולפן בלי תפאורה מורכבת`, difficulty: 'easy' },
      { text_he: `Nour El Ain לא זכה לכיסויים בשפות אחרות`, difficulty: 'medium' },
      { text_he: `עמרו דיאב זכה ב-MTV VMA לסרטון בינלאומי הטוב על Nour El Ain`, difficulty: 'hard' },
    ],
  },
  q326: { // Ya Rayah / Rachid Taha
    trueStatements: [
      { text_he: `המקור של "יא ראיח" נכתב ובוצע ב-1973 על ידי הזמר האלג'יראי דחמאן אל-חראשי`, difficulty: 'hard' },
      { text_he: `דחמאן אל-חראשי, כותב המקור של Ya Rayah, נחשב לאגדת הצ'עבי האלג'יראי`, difficulty: 'medium' },
      { text_he: `רשיד טאהא ביצע את גרסתו ל-Ya Rayah ב-1993 באלבומו הראשון`, difficulty: 'medium' },
      { text_he: `רשיד טאהא הוציא את Ya Rayah כסינגל ב-1997`, difficulty: 'medium' },
      { text_he: `Ya Rayah בביצוע רשיד טאהא הגיע למקום 11 במצעדים הצרפתיים`, difficulty: 'easy' },
      { text_he: `Ya Rayah זכה לכיסויים בעשרות שפות וגרסאות, ושימש כסמל לדור שלם של מהגרים מגרבים`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `המקור של "יא ראיח" הוא של רשיד טאהא עצמו מ-1980`, difficulty: 'medium' },
      { text_he: `דחמאן אל-חראשי הוא זמר ישראלי-יהודי-מרוקאי`, difficulty: 'hard' },
      { text_he: `רשיד טאהא הוציא את Ya Rayah כסינגל ב-2003`, difficulty: 'medium' },
      { text_he: `Ya Rayah הגיע למקום 1 במצעדים הצרפתיים`, difficulty: 'medium' },
    ],
  },
  q328: { // Ah W Noss / Nancy Ajram
    trueStatements: [
      { text_he: `אלבום Nancy Ajram "Ah W Noss" יצא ב-14 באפריל 2004`, difficulty: 'medium' },
      { text_he: `אלבום "Ah W Noss" היה נקודת ציון חשובה בקריירה של ננסי עג'רם`, difficulty: 'easy' },
      { text_he: `ההצלחה הראשונית של ננסי עג'רם הייתה דווקא בשיר "Akhasmak Ah" (2002)`, difficulty: 'medium' },
      { text_he: `אלבום "Ah W Noss" ביסס את ננסי עג'רם כסטאר אל"ף בעולם הערבי`, difficulty: 'medium' },
      { text_he: `שירים בולטים נוספים באלבום ננסי עג'רם "Ah W Noss" כוללים את "Lawn Ouyounak" (צבע עיניך) ו-"Inta Eyh?"`, difficulty: 'hard' },
      { text_he: `הקליפ הצבעוני של "Ah W Noss" נחשב לאחד מסימני ההיכר של עידן הפופ הערבי החדש`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `אלבום ננסי עג'רם "Ah W Noss" יצא ב-1999 — בתחילת הקריירה שלה`, difficulty: 'medium' },
      { text_he: `ההצלחה הראשונית של ננסי עג'רם הייתה דווקא במצרים`, difficulty: 'hard' },
      { text_he: `אלבום ננסי עג'רם "Ah W Noss" כלל רק שיר אחד מצליח`, difficulty: 'medium' },
      { text_he: `הקליפ של "Ah W Noss" צולם בשחור-לבן`, difficulty: 'medium' },
    ],
  },
  q329: { // Didi / Khaled
    trueStatements: [
      { text_he: `Didi של חאלד מ-1992 הפך אותו לסופרסטאר בין-לאומי`, difficulty: 'easy' },
      { text_he: `Didi חדר לאירופה, אסיה ואפריקה אחרי 1992`, difficulty: 'medium' },
      { text_he: `בשנות ה-90 קבוצות אסלאמיסטיות באלג'יריה איימו על זמרי הראי, הז'אנר של Didi`, difficulty: 'hard' },
      { text_he: `זמר הראי שב חסני נרצח ב-29 בספטמבר 1994 בגיל 26`, difficulty: 'medium' },
      { text_he: `שב חסני, זמר ראי מחבריו של חאלד, נרצח מחוץ לבית הוריו באוראן`, difficulty: 'medium' },
      { text_he: `המפיק רשיד באבא-אחמד, מפיק רבים משירי הראי כולל ל-חאלד, נורה ב-1995`, difficulty: 'hard' },
      { text_he: `חאלד עזב לצרפת מתישהו אחרי הקלטת אלבומו "Kutché" ב-1988`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Didi יצא ב-1985`, difficulty: 'medium' },
      { text_he: `שב חסני נרצח באלג'יר בגיל 35`, difficulty: 'medium' },
      { text_he: `המפיק רשיד באבא-אחמד היה הראשון מבין הראי שנרצח`, difficulty: 'hard' },
      { text_he: `חאלד מעולם לא עזב את אלג'יריה`, difficulty: 'medium' },
    ],
  },
  q332: { // Batwanes Beek / Warda
    trueStatements: [
      { text_he: `הזמרת וורדה הייתה נשואה למלחין המצרי בלאל חמדי בין השנים שאחרי 1972 ועד 1990`, difficulty: 'hard' },
      { text_he: `הנישואים בין וורדה לבלאל חמדי הם מה שיכול להסביר את הבלבול לגבי בלאל חמדי ככותב Batwanes Beek`, difficulty: 'medium' },
      { text_he: `בלאל חמדי כן הלחין שירים אחרים של וורדה — אבל לא את Batwanes Beek`, difficulty: 'medium' },
      { text_he: `את Batwanes Beek הלחין סלאח א-שרנובי`, difficulty: 'medium' },
      { text_he: `את מילי Batwanes Beek כתב המשורר עומאר בטיישה`, difficulty: 'medium' },
      { text_he: `Batwanes Beek נחשב לאחד הביצועים הקלאסיים של ז'אנר הטרב הערבי המודרני`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `וורדה ובלאל חמדי לעולם לא היו נשואים`, difficulty: 'hard' },
      { text_he: `בלאל חמדי הוא שהלחין את Batwanes Beek`, difficulty: 'medium' },
      { text_he: `המילים של Batwanes Beek נכתבו על ידי הזמרת וורדה עצמה`, difficulty: 'medium' },
      { text_he: `סלאח א-שרנובי הוא משורר ולא מלחין`, difficulty: 'hard' },
    ],
  },
  q337: { // Rock El Casbah / Rachid Taha
    trueStatements: [
      { text_he: `רשיד טאהא ביצע גרסה ערבית-אלקטרונית ל-Rock The Casbah של The Clash`, difficulty: 'easy' },
      { text_he: `Rock The Casbah המקורי של The Clash משנת 1982 עסק באיסור על מוזיקת רוק באיראן של חומייני`, difficulty: 'medium' },
      { text_he: `רשיד טאהא, מהגר אלג'יראי בצרפת, נתן לגרסה הערבית של Rock El Casbah ממד נוסף של מחאה על חיי המהגרים בפרברי צרפת`, difficulty: 'hard' },
      { text_he: `רשיד טאהא היה חבר אישי של ג'ו סטראמר מ-The Clash`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `Rock The Casbah המקורי של The Clash עסק באיסור על מוזיקה בסעודיה`, difficulty: 'medium' },
      { text_he: `רשיד טאהא הוא מהגר מרוקאי בצרפת`, difficulty: 'medium' },
      { text_he: `רשיד טאהא וג'ו סטראמר מ-The Clash מעולם לא נפגשו אישית`, difficulty: 'hard' },
      { text_he: `רשיד טאהא ביצע את Rock El Casbah באנגלית בלבד`, difficulty: 'medium' },
    ],
  },
  q339: { // Ne Me Quitte Pas / Jacques Brel
    trueStatements: [
      { text_he: `ז'אק ברל אמר בראיון מ-1966 ש-Ne Me Quitte Pas הוא "המנון לפחדנות של גברים" — ולא שיר אהבה`, difficulty: 'medium' },
      { text_he: `ז'אק ברל ביקש להראות ב-Ne Me Quitte Pas עד כמה גבר מוכן להשפיל את עצמו`, difficulty: 'medium' },
      { text_he: `הגבר ב-Ne Me Quitte Pas מבטיח להפוך ל"צל של הצל שלך" ול"כלב לכלב שלך"`, difficulty: 'hard' },
      { text_he: `Ne Me Quitte Pas נכתב במקור ב-1959 אחרי שאהובתו של ברל, סוזאן גבריאלו, נטשה אותו`, difficulty: 'medium' },
      { text_he: `סוזאן גבריאלו עזבה את ז'אק ברל אחרי שהכריח אותה לעבור הפלה`, difficulty: 'hard' },
      { text_he: `Ne Me Quitte Pas כוסה על ידי כ-200 אמנים — כולל אדית פיאף, ניק קייב ושינא איסטון`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `ז'אק ברל הצהיר ש-Ne Me Quitte Pas הוא "השיר הרומנטי הכי כן שכתבתי"`, difficulty: 'medium' },
      { text_he: `הגבר ב-Ne Me Quitte Pas מבטיח להפוך ל"צל של אהבתך"`, difficulty: 'hard' },
      { text_he: `סוזאן גבריאלו עזבה את ז'אק ברל אחרי שהוא בגד בה`, difficulty: 'medium' },
      { text_he: `Ne Me Quitte Pas נכתב ב-1965`, difficulty: 'medium' },
    ],
  },
  q340: { // Papaoutai / Stromae
    trueStatements: [
      { text_he: `שם השיר Papaoutai הוא הצמדה פונטית של "Papa, où t'es?" — "אבא, איפה אתה?" בצרפתית של בלגיה`, difficulty: 'easy' },
      { text_he: `אביו של סטרומאה היה ארכיטקט ממוצא טוצי שנשאר ברואנדה`, difficulty: 'medium' },
      { text_he: `אביו של סטרומאה לא היה נוכח ברוב חיי סטרומאה`, difficulty: 'medium' },
      { text_he: `אביו של סטרומאה נרצח ברצח העם ברואנדה ב-1994`, difficulty: 'medium' },
      { text_he: `סטרומאה היה בן 9 כשאביו נרצח ברואנדה (לא 5 כפי שלעיתים מצוטט)`, difficulty: 'hard' },
      { text_he: `הקליפ של Papaoutai בבימוי ססיל פאיגנרט, עם הבובה של "אבא הפלסטיק", הפך לאיקוני`, difficulty: 'easy' },
    ],
    falseStatements: [
      { text_he: `שם השיר Papaoutai הוא צירוף מילים בקריאולית בלגית`, difficulty: 'medium' },
      { text_he: `אביו של סטרומאה היה רופא ממוצא הוטו`, difficulty: 'medium' },
      { text_he: `אביו של סטרומאה נרצח באתיופיה ב-1991`, difficulty: 'hard' },
      { text_he: `סטרומאה היה בן 5 כשאביו נרצח`, difficulty: 'medium' },
    ],
  },
  q341: { // Je t'aime moi non plus / Serge Gainsbourg
    trueStatements: [
      { text_he: `Je t'aime moi non plus נכתב במקור ב-1967 עבור בריג'יט בארדו, אהובתו של סרז' גנסבור באותה תקופה`, difficulty: 'medium' },
      { text_he: `בריג'יט בארדו ביקשה מסרז' גנסבור לא לפרסם את ההקלטה המקורית של Je t'aime moi non plus`, difficulty: 'medium' },
      { text_he: `הסיבה לבקשת בריג'יט בארדו: ההקלטה גרמה למשבר עם בעלה גונתר זאקס`, difficulty: 'hard' },
      { text_he: `סרז' גנסבור הקליט גרסה חדשה של Je t'aime moi non plus ב-1968 עם השחקנית ג'יין בירקין`, difficulty: 'medium' },
      { text_he: `ג'יין בירקין סיפרה על הקלטת Je t'aime moi non plus: "נסחפתי קצת עם הנשימות הכבדות — כל כך, שאמרו לי להירגע"`, difficulty: 'hard' },
      { text_he: `Je t'aime moi non plus נאסר ברדיו בספרד, שוודיה, ברזיל, בריטניה ואיטליה`, difficulty: 'easy' },
      { text_he: `באיטליה, המנכ"ל של חברת התקליטים שהפיצה את Je t'aime moi non plus נכלא בעוון פגיעה במוסר הציבורי`, difficulty: 'hard' },
    ],
    falseStatements: [
      { text_he: `Je t'aime moi non plus נכתב במקור עבור השחקנית איזבל אדג'אני`, difficulty: 'medium' },
      { text_he: `בריג'יט בארדו ביקשה לפרסם את Je t'aime moi non plus אבל סרז' גנסבור סירב`, difficulty: 'medium' },
      { text_he: `סרז' גנסבור הקליט את הגרסה הסופית של Je t'aime moi non plus עם איש משלו, לא עם בירקין`, difficulty: 'hard' },
      { text_he: `Je t'aime moi non plus התקבל בכבוד בכל אירופה ולא נאסר באף מדינה`, difficulty: 'medium' },
    ],
  },
  q345: { // La Bohème / Charles Aznavour
    trueStatements: [
      { text_he: `שארל אזנבור (1924-2018) נולד באיסטנבול להורים ארמנים`, difficulty: 'medium' },
      { text_he: `שארל אזנבור נחשב לאחד מאמני השאנסון הצרפתי הגדולים בכל הזמנים`, difficulty: 'easy' },
      { text_he: `La Bohème נכלל באלבום שארל אזנבור "Charles Aznavour 65"`, difficulty: 'medium' },
      { text_he: `La Bohème זכה לכיסויים בעשרות שפות`, difficulty: 'easy' },
      { text_he: `La Bohème נחשב לאחד הסמלים של הזיכרון הקולקטיבי של פריז של תחילת המאה ה-20`, difficulty: 'medium' },
    ],
    falseStatements: [
      { text_he: `שארל אזנבור נולד בפריז להורים צרפתיים`, difficulty: 'medium' },
      { text_he: `שארל אזנבור התמחה במוזיקת אופרה ולא בשאנסון`, difficulty: 'medium' },
      { text_he: `La Bohème זכה לכיסוי בערבית בלבד`, difficulty: 'hard' },
      { text_he: `שארל אזנבור נפטר ב-2002`, difficulty: 'medium' },
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
