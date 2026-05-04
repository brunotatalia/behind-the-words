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
  q306: {
    verified: true,
    sources: [
      wiki('La_Tortura', 'La Tortura'),
      sf('shakira/la-tortura', 'La Tortura by Shakira'),
    ],
    extendedInfo_he: `השיר יצא ב-11 באפריל 2005 כסינגל הראשון מאלבום "Fijación Oral, Vol. 1". זהו הדואט הראשון של שאקירה ואלחנדרו סאנז (יחזרו לעבוד יחד שוב). השיר עמד 25 שבועות במקום 1 ב-Hot Latin Songs — שיא בילבורד שנשבר רק על ידי "Despacito" ב-2017. הקליפ של מייקל הוסמן זכה ב-Latin Grammy לקליפ הטוב ביותר.`,
  },
  q308: {
    verified: true,
    sources: [
      wiki('The_Ketchup_Song', 'The Ketchup Song'),
      sf('las-ketchup/the-ketchup-song-asereje', 'The Ketchup Song by Las Ketchup'),
    ],
    extendedInfo_he: `השיר עוסק בבחור בשם דייגו שמגיע למועדון, ה-DJ (חבר שלו) משמיע לו את "Rapper's Delight" של Sugarhill Gang, ודייגו מנסה לרקוד ולשיר יחד אבל מעוות את המילים לג'יבריש ספרדי — "Aserejé Ja De Jé". הפזמון הוא חיקוי לא מדויק של המקור: "I said a hip-hop, the hippie the hippie to the hip hip hop". יצא ב-10 ביוני 2002, מכר מעל 7 מיליון עותקים בעולם.`,
  },
  q328: {
    verified: true,
    sources: [
      wiki('Ah_W_Noss', 'Ah W Noss'),
      wiki('Nancy_Ajram', 'Nancy Ajram'),
    ],
    extendedInfo_he: `האלבום "Ah W Noss" יצא ב-14 באפריל 2004 והיה נקודת ציון חשובה בקריירה של ננסי עג'רם — לאחר ההצלחה הראשונית שלה ב"Akhasmak Ah" (2002), אלבום זה ביסס אותה כסטאר אל"ף בעולם הערבי. עוד שירים בולטים באלבום: "Lawn Ouyounak" (צבע עיניך) ו-"Inta Eyh?". הקליפ הצבעוני של "Ah W Noss" נחשב לאחד מסימני ההיכר של עידן הפופ הערבי החדש.`,
  },
  q351: {
    verified: true,
    sources: [
      wiki('Formidable_(song)', 'Formidable (song)'),
      sf('stromae/formidable', 'Formidable by Stromae'),
    ],
    extendedInfo_he: `הקליפ של 'פורמידבל' צולם בתחנת המטרו לואיז בבריסל במצלמות נסתרות, כשסטרומאה העמיד פנים שהוא שיכור. תגובות עוברי האורח אמיתיות לגמרי — חלקם תיעדו אותו בטלפון, אחד אפילו ניסה למנוע ממנו להתיישב על מסילת החשמלית, ושלושה שוטרים ניגשו אליו (לא ידעו שמדובר בצילומים). השיר עוסק בלילה אחרי פרידה — סטרומאה שיכור מנסה להתמודד עם הבדידות.`,
  },
  q353: {
    verified: true,
    explanation_he: `אייה נקמורה, ממוצא צרפתי-מאלי, שילבה בשיר סלנג צרפתי המושפע משפות אפריקאיות (כולל בנמברה). השיר יצא ב-2018 והפך להיט ענק בצרפת — עמד שבועיים במקום 1 ובדורג מצוין בכל אירופה. אייה נקמורה הפכה לאחת הזמרות הצרפתיות הנשמעות ביותר בעולם, וזוכה לציטוטים בהפגנות נגד אלימות מינית בצרפת.`,
    sources: [
      wiki('Djadja_(Aya_Nakamura_song)', 'Djadja (Aya Nakamura song)'),
      wiki('Aya_Nakamura', 'Aya Nakamura'),
    ],
    extendedInfo_he: `במילים נקמורה משתמשת בארגוט (סלנג) צרפתי שמשלב ביטויים אנגליים, ערביים ו-בנמברה (שפת מאלי). השיר עוסק בדחייה של גבר שמשקר ושמתגאה בקשר שלכאורה היה לו עם הזמרת. הקליפ זכה למעל 1 מיליארד צפיות, מה שהפך אותו לאחד הראשונים מצרפת. נקמורה נחשבת לחלוצה בז'אנר afro-pop צרפתי מודרני.`,
  },
  q354: {
    verified: true,
    sources: [
      wiki('Volare_(Domenico_Modugno_song)', 'Volare (Domenico Modugno song)'),
      sf('domenico-modugno/volare', 'Volare by Domenico Modugno'),
    ],
    extendedInfo_he: `המילה "Volare" (לעוף) נכללה בפזמון בעקבות סערה שפתחה את חלון מודוניו ונתנה לו את ההשראה לשנות את הפזמון. הוא זכה במקום 1 בפסטיבל סן רמו של 1958 ובאירוויזיון אותה שנה הגיע למקום 3. השיר עמד 5 שבועות במקום 1 בבילבורד הוט 100 בארה"ב — דבר נדיר ביותר לשיר באיטלקית. הוא זכה בגראמי הראשון אי פעם להקלטה ולשיר השנה (1959).`,
  },
  q355: {
    verified: true,
    sources: [
      wiki('Prisencolinensinainciusol', 'Prisencolinensinainciusol'),
      sf('adriano-celentano/prisencolinensinainciusol', 'Prisencolinensinainciusol by Adriano Celentano'),
    ],
    extendedInfo_he: `אדריאנו צ'לנטאנו אמר שכוונתו הייתה להראות "את חוסר היכולת לתקשר" ואיך אנגלית נשמעת לאוזניים שלא מבינות אותה. השיר יצא ב-3 בנובמבר 1972 והפך לוויראלי שנים מאוחר יותר באינטרנט (במיוחד ב-2009 אחרי שהבלוג Boing Boing פרסם אותו). אפילו תוכניות בריטיות וגרמניות התחילו להראות אותו כדוגמה לאיך שפתם נשמעת בחוץ.`,
  },
  q356: {
    verified: true,
    explanation_he: `אנדראה בוצ'לי ביצע את "Con te partirò" (איתך אעזוב) בפסטיבל סן רמו ב-1995. שנה מאוחר יותר, הוא הקליט גרסת דואט עם שרה ברייטמן בשם "Time to Say Goodbye" (1996), שהפכה לסינגל הנמכר ביותר בהיסטוריה של גרמניה — מעל 2.75 מיליון עותקים. הגרסה הוקדשה במקור לפרידה של מתאגרף הענקים גרהארד הנטגס מהזירה.`,
    sources: [
      wiki(`Con_te_partir%C3%B2`, 'Con te partirò'),
      sf('andrea-bocelli/con-te-partiro', 'Con te partirò by Andrea Bocelli'),
    ],
    extendedInfo_he: `השיר נכתב על ידי לוצ'יו קוורנטוטו (מילים) ופרנצ'סקו סארטורי (מנגינה). הגרסה האנגלית/איטלקית של 1996 עם ברייטמן זכתה ל-11x פלטיניום בגרמניה. המילים מתארות אדם שמזמין את אהובתו לעזוב יחד למקומות שמעולם לא ראתה. למרות הכותרת באנגלית, רוב השיר עדיין באיטלקית — בוצ'לי שר רק חלקים מועטים באנגלית.`,
  },
  q357: {
    verified: true,
    explanation_he: `"La Solitudine" של לאורה פאוזיני יצא ב-1993, כשהיא הייתה בת 18. בניגוד לאמונה הרווחת, פאוזיני עצמה לא כתבה את השיר — הוא נכתב על ידי פדריקו קוואלי, פייטרו קרמונזי ואנג'לו ולסיג'יו. אבל המילים שונו בכוונה כדי להתאים לחוויה האישית שלה — שמו של החבר שעזב את העיירה הקטנה שלהם הוחלף מ"אנה" ל"מרקו" כי כך באמת קראו לחבר שלה דאז. השיר זכה במקום 1 בקטגוריית הצעירים בפסטיבל סן רמו 1993, וקיבל 7,464 קולות.`,
    sources: [
      wiki('La_solitudine', 'La solitudine'),
      sf('laura-pausini/la-solitudine', 'La Solitudine by Laura Pausini'),
    ],
    extendedInfo_he: `פאוזיני אמרה: "הסיפור היה בדיוק תצלום של חיי באותה תקופה". השיר הפך אותה בן לילה לכוכבת איטלקית, ואחר כך לכוכבת בינלאומית — היא הראשונה שזכתה בגראמי לאלבום הפופ הלטיני ב-2007. השיר זכה לתרגומים לספרדית, צרפתית ופורטוגזית.`,
  },
  q358: {
    verified: true,
    explanation_he: `"L'Italiano" של טוטו קוטוניו יצא ב-1983 כשיר שמשתמש בקלישאות איטלקיות (ספגטי, מנדולינה, הים) — אבל לא כסאטירה ביקורתית. ויקיפדיה והעיתונות האיטלקית של אותה תקופה מתארות את השיר כמחווה כנה לאיטלקים מהגרים — קוטוניו הושפע מהופעה בטורונטו, קנדה. השיר משקף "אופטימיות איטלקית של תחילת שנות ה-80 וסנטימנט לאומי", ולא ביקורת. השיר הגיע למקום 5 בפסטיבל סן רמו 1983.`,
    sources: [
      wiki(`L%27Italiano`, "L'Italiano"),
      sf('toto-cutugno/litaliano', "L'Italiano by Toto Cutugno"),
    ],
    extendedInfo_he: `קוטוניו (1943-2023) זכה אחר כך באירוויזיון 1990 עם השיר "Insieme: 1992". "L'Italiano" הפך לאחד מסמלי הזיכרון הקולקטיבי של איטליה ושל קהילות מהגרים איטלקיים בעולם. נכלל בפסקולים, פרסומות ואירועי ספורט עד היום.`,
  },
  q359: {
    verified: true,
    sources: [
      wiki('Caruso_(song)', 'Caruso (song)'),
      sf('lucio-dalla/caruso', 'Caruso by Lucio Dalla'),
    ],
    extendedInfo_he: `לוצ'ו דאלה הקליט את השיר ב-1986 ושוחרר ב-1990 באלבום "Lucio Dalla". הוא חיבר אותו אחרי שבעלי מלון Excelsior Vittoria בסורנטו סיפרו לו על ימיו האחרונים של הטנור אנריקו קארוזו (שנפטר ב-1921), כולל הקשר הרגשי שלו עם תלמידה צעירה. בוצ'לי כיסה את השיר ב-1986 וגם פאברוטי ב-1988 — אבל גרסת דאלה המקורית נחשבת לקלאסית.`,
  },
  q360: {
    verified: true,
    explanation_he: `השיר "A Far l'Amore Comincia Tu" של רפאלה קארא מ-1977 היה מהפכני בזמנו כי אישה שרה בגלוי על יוזמה מינית. קארא הפכה לאייקון של חירות מינית ואייקון להט"ב — ב-2017 קיבלה פרס "Gay Icon" ב-World Pride Madrid. כבר ב-1971 היא יצרה סקנדל בטלוויזיה האיטלקית כשחשפה את הטבור ב"Tuca tuca", מה שגרם לעיתון הוותיקן לתאר אותה כ"פרובוקטיבית מדי".`,
    sources: [
      wiki('A_far_l%27amore_comincia_tu', "A far l'amore comincia tu"),
      wiki(`Raffaella_Carr%C3%A0`, 'Raffaella Carrà'),
    ],
    extendedInfo_he: `אחרי מותה ב-2021 קארא זכתה לכבוד רב ברחבי אירופה — במיוחד באיטליה ובספרד. בויקיפדיה מתועד פרס ה"Gay Icon" שלה אך לא מתועדת רחבה ספציפית שנקראה על שמה בספרד (כפי שלעיתים נטען). היא הייתה גם חלוצה של פמיניזם בתעשיית הטלוויזיה האיטלקית.`,
  },
  q361: {
    verified: true,
    explanation_he: `השיר המקורי של אומברטו טוצי מ-1979 עוסק באישה בשם גלוריה שגורמת לזמר לאבד שליטה. לורה בראניגן הקליטה גרסה אנגלית ב-1982 עם מילים שונות לחלוטין — שלה הוא "פורטרט של בחורה שרצה מהר מדי לקצב הצעדים שלה". הגרסה של בראניגן הגיעה למקום 2 בבילבורד הוט 100 (לא 1, מאחורי "Truly" של ליונל ריצ'י) ועמדה שם 3 שבועות. רוב האמריקאים לא יודעים שמדובר בשיר איטלקי מקורי.`,
    sources: [
      wiki('Gloria_(Umberto_Tozzi_song)', 'Gloria (Umberto Tozzi song)'),
      wiki('Gloria_(Laura_Branigan_song)', 'Gloria (Laura Branigan song)'),
    ],
    extendedInfo_he: `אומברטו טוצי שאל את הפרגמנט המלודי שלו מ"Missa solemnis" של בטהובן (החלק "Gloria"). גרסת בראניגן זכתה במועמדות לגראמי לביצוע פופ נשי ב-1983. השיר הפך לאחת הקלאסיקות של מוזיקת הפופ של שנות ה-80 — והוא משמש להמנון של נבחרת בייסבול White Sox של שיקגו.`,
  },
  q362: {
    verified: true,
    sources: [
      wiki('Nessun_dorma', 'Nessun dorma'),
      sf('luciano-pavarotti/nessun-dorma', 'Nessun dorma by Luciano Pavarotti'),
    ],
    extendedInfo_he: `האריה מהאופרה "טורנדוט" של פוצ'יני משנת 1926 עוסקת בנסיך קלאף שחייב לפתור שלוש חידות שהציגה לו הנסיכה טורנדוט או למות. הוא ניצח, אז הוא נתן לה אתגר משלו: לגלות את שמו עד שחר. ב"Nessun dorma" ("שאף אחד לא יישן") הוא בטוח שהוא ינצח. הקלטת פאברוטי מ-1972 שימשה כשיר הנושא של שידור ה-BBC ממונדיאל איטליה 1990, וזה הפך אותה ללהיט עולמי שהגיע למקום 2 במצעדי בריטניה.`,
  },
  q363: {
    verified: true,
    explanation_he: `"Azzurro" (תכלת) של אדריאנו צ'לנטאנו מ-1968 מתאר אדם בודד בעיר הקיצית — לא בהכרח עיר ריקה (זה לא מצוין במפורש). השיר הולחן על ידי פאולו קונטה (יחד עם ויטו פלאוויצ'יני ומיקלה ויראנו), והמילים נכתבו על ידי קונטה ופלאוויצ'יני. המילה "azzurro" באיטלקית לא נושאת את הקונוטציה השלילית של "כחול" באנגלית — היא יותר ניטרלית. השיר הפך לאחד מסמלי האיטלקיות הקיצית.`,
    sources: [
      wiki('Azzurro_(song)', 'Azzurro (song)'),
      sf('adriano-celentano/azzurro', 'Azzurro by Adriano Celentano'),
    ],
    extendedInfo_he: `פאולו קונטה, מהכותבים החשובים של איטליה, הפך אחר כך למבצע סולו ידוע. השיר נכלל בפסקולים רבים ובאחרונה בסרט "Buongiorno Notte" של מרקו בלוקיו (2003). הוא משמש לעיתים כסמל של אהדה בתחרויות ספורט איטלקיות.`,
  },
  q364: {
    verified: true,
    explanation_he: `אל באנו ורומינה פאוור שרו "Felicità" (אושר) ב-1982, ובאירוויזיון 1985 הם השתתפו בפועל עם השיר "Magic Oh Magic". בשנת 1994 בתם ילניה נעלמה בנסיבות מסתוריות בניו אורלינס — מעולם לא נמצאה. הזוג נפרד ב-1999 והתגרש רק ב-2012, מה שהופך את שיר ה"אושר" הזה למזכרת מכאיבה מחיים שהתמוטטו.`,
    sources: [
      wiki(`Felicit%C3%A0_(Al_Bano_and_Romina_Power_song)`, 'Felicità (Al Bano and Romina Power song)'),
      wiki('Al_Bano_and_Romina_Power', 'Al Bano and Romina Power'),
    ],
    extendedInfo_he: `אל באנו ורומינה (בתו של השחקן טיירון פאוור) היו מהזוגות המוזיקליים המוכרים ביותר באירופה משנות ה-70 ועד שנות ה-90. הם הופיעו באירוויזיון פעמיים — ב-1976 עם "Noi lo rivivremo di nuovo" (מקום 7) וב-1985 עם "Magic Oh Magic" (מקום 7). אחרי הפרידה, אל באנו המשיך קריירה סולו ולעיתים גם הופיעו יחד.`,
  },
  q365: {
    verified: true,
    sources: [
      {
        url: 'https://en.wikipedia.org/wiki/In_ogni_senso',
        title: 'In ogni senso (album) — Wikipedia',
        type: 'wikipedia',
        accessed: TODAY,
      },
      {
        url: 'https://radio.callmefred.com/en/song_story/se-bastasse-una-canzone-eros-ramazzotti/',
        title: 'The story and meaning of "Se bastasse una canzone" — Radio Call Me Fred',
        type: 'article',
        accessed: TODAY,
      },
    ],
    extendedInfo_he: `השיר נכתב על ידי פיירו קסאנו וארוס רמאצוטי (מנגינה) ועל ידי רמאצוטי ואדליו קוליאטי (מילים). השיר הוקדש "לחריגים, לחולמים, ולאלה שעדיין מחכים להזדמנות שלהם". הוא נכלל באלבום "In ogni senso" משנת 1990 שהפך לאחד האלבומים הנמכרים ביותר בקריירה של רמאצוטי. השיר הופיע באנדרטה של מנדלה ב-1991 ובמופע "Pavarotti & Friends".`,
  },
  q366: {
    verified: true,
    sources: [
      wiki('Quando,_quando,_quando', 'Quando, quando, quando'),
      sf('tony-renis/quando-quando-quando', 'Quando, quando, quando by Tony Renis'),
    ],
    extendedInfo_he: `השיר יצא ב-1962 כיצירה של טוני רניס בסגנון בוסה נובה, והוצג בפסטיבל סן רמו אותה שנה. הגרסה האנגלית הצליחה הודות לפט בון ובהמשך לדואטים כמו של פאט אלן וסטיבי וונדר עם ג'יימי קולום. המילה "quando" שחוזרת על עצמה הפכה את מחסום השפה ליתרון — גם מי שלא מבין איטלקית יכול לשיר עם השיר.`,
  },
  q367: {
    verified: true,
    sources: [
      wiki(`Sar%C3%A0_perch%C3%A9_ti_amo`, 'Sarà perché ti amo'),
      wiki('Ricchi_e_Poveri', 'Ricchi e Poveri'),
    ],
    extendedInfo_he: `הלהקה Ricchi e Poveri (עשירים ועניים) הוקמה במקור כרביעיה — אנג'לה ברמבטי, אנג'לו סוטג'ו, פרנקו גאטי ומרינה אוקיינה. ב-1981 מרינה עזבה והם הפכו לשלישייה. ב-2020 הרכב הרביעיה המקורי התאחד מחדש בפסטיבל סן רמו לציון 50 שנה ללהקה. השיר "Sarà Perché Ti Amo" יצא בפברואר 1981 והפך ללהיט אירופי ענק.`,
  },
  q368: {
    verified: true,
    sources: [
      wiki('Gangnam_Style', 'Gangnam Style'),
      sf('psy/gangnam-style', 'Gangnam Style by PSY'),
    ],
    extendedInfo_he: `PSY הסביר: "השיר הזה למעשה לועג לאנשים שמנסים מאוד להיות משהו שהם לא". הקליפ סוקרס את הדימוי של גנגנאם — שכונת היוקרה של סיאול — דרך עיני "PSY הלא-גנגנאמי". הקליפ היה הראשון אי פעם להגיע למיליארד צפיות ביוטיוב (דצמבר 2012), והפך ל-K-Pop הראשון שפרץ למיינסטרים העולמי. הריקוד "אופפ-גנגנאם-סטייל" שיחק תפקיד כמו ויראלי גלובלי.`,
  },
  q370: {
    verified: true,
    explanation_he: `"Fake Love" של BTS (2018) עוסק באובדן זהות עצמית ובחבישת מסכות כדי לרצות אחרים — מילים כמו "אפילו הפכתי לא בטוח לגבי מי שאני" ו-"לנסות למחוק את עצמי ולהפוך לבובה שלך" ביטאו זאת. הוא חלק מסדרת "Love Yourself" של BTS (לא ספציפית מבוסס על קארל יונג, כפי שלעיתים נטען). הסדרה משקפת את הרעיון ש"כל אהבה שאינה מובילה לאהוב את עצמך אינה אהבה אמיתית".`,
    sources: [
      wiki('Fake_Love_(BTS_song)', 'Fake Love (BTS song)'),
      sf('bts/fake-love', 'Fake Love by BTS'),
    ],
    extendedInfo_he: `השיר יצא ב-18 במאי 2018 כסינגל הראשון מאלבום "Love Yourself: Tear" וזכה בפלטינום מ-RIAA — הסינגל הראשון של BTS שזכה בכך. הוא הגיע למקום 10 בבילבורד הוט 100 — באותה תקופה השיא של אמן קוריאני בארה"ב. הקליפ של אש הפך ל-"בית" של מסע BTS דרך גן הילדות.`,
  },
  q371: {
    verified: true,
    sources: [
      wiki('Lucifer_(Shinee_song)', 'Lucifer (Shinee song)'),
      sf('shinee/lucifer', 'Lucifer by SHINee'),
    ],
    extendedInfo_he: `השיר יצא ב-19 ביולי 2010 דרך SM Entertainment והפך ללהיט מוקדם של SHINee. המילים משוות אישה דו-פרצופית לשטן — "הלחישה שלה היא לוציפר". הכוריאוגרפיה המורכבת עם תזוזות ידיים מהירות הפכה לאחת הסימנים של SHINee, ועד היום היא נחשבת לאחת הכוריאוגרפיות הקשות ביותר ב-K-Pop.`,
  },
  q372: {
    verified: true,
    explanation_he: `"דם, זיעה ודמעות" של BTS מבוסס על "דמיאן" (1919) של הרמן הסה — RM אפילו דקלם ציטוט מהספר בקליפ. השיר עוסק בפיתוי, חטא וקריסת התמימות. הקליפ מלא בהפניות ליצירות של פיטר ברויחל ("נפילת איקרוס", "נפילת המלאכים המורדים") והרברט ג'יימס דרייפר ("הקינה לאיקרוס") — לא מיכלאנג'לו כפי שלעיתים נטען. חברי הלהקה מוצגים כמלאכים נופלים. השיר יצא ב-10 באוקטובר 2016.`,
    sources: [
      wiki('Blood_Sweat_%26_Tears_(BTS_song)', 'Blood Sweat & Tears (BTS song)'),
      sf('bts/blood-sweat-tears', 'Blood Sweat & Tears by BTS'),
    ],
    extendedInfo_he: `האלבום "Wings" מ-2016 שאליו הוא שייך נחשב לאלבום הקונספט הראשון של BTS. הקליפ זכה לעשרות מיליוני צפיות ביוטיוב בשבוע הראשון. הסיפור של "דמיאן" — חיפוש זהות אצל נער שמגלה את הצד החשוך והאסור בעצמו — מקביל למסע הקונספטואלי של BTS באותה תקופה.`,
  },
  q373: {
    verified: true,
    sources: [
      wiki('Good_Day_(IU_song)', 'Good Day (IU song)'),
      wiki('IU_(singer)', 'IU (singer)'),
    ],
    extendedInfo_he: `IU (לי ג'י-און) הייתה בת 17 כשהקליטה את השיר ב-2010. בסיום השיר ישנה סדרה של שלושה תווים גבוהים בעלייה של חצאי-טון, שמסתיימים ב-F♯5 — הביצוע נחשב לאחד הרגעים הוואקליים האיקוניים של K-Pop. המבקרים ציינו את "יציבות התדר" שלה ואת "קיבולת הריאות". השיר הפך אותה לכוכבת על מספר 1 בקוריאה והוא משמש עד היום כסטנדרט להערכת זמרות K-Pop צעירות.`,
  },
  q374: {
    verified: true,
    sources: [
      wiki(`God%27s_Menu`, "God's Menu"),
      sf('stray-kids/gods-menu', "God's Menu by Stray Kids"),
    ],
    extendedInfo_he: `חברי הלהקה Bang Chan, Changbin ו-Han (תחת שם 3Racha) היו אחראים על כתיבת והפקת השיר. הסגנון תואר כ"חלוץ של מאלה-טייסט מיוזיק" (mala = פלפל סצ'ואני חריף) — מטאפורה לחריפות הצליל. הסטיינג'ר עזרים: סכינים מתחדדות, סירים שכופרים, צלילי בישול. הקליפ מציג את הלהקה כשפים ב"מסעדה אלוהית". יצא ב-17 ביוני 2020.`,
  },
  q375: {
    verified: true,
    sources: [
      {
        url: 'https://colorcodedlyrics.com/2016/04/24/twice-cheer-up/',
        title: 'TWICE - CHEER UP Lyrics — Color Coded Lyrics',
        type: 'article',
        accessed: TODAY,
      },
      {
        url: 'https://lyricstranslate.com/en/cheer-cheer.html',
        title: 'TWICE - CHEER UP English translation — LyricsTranslate',
        type: 'article',
        accessed: TODAY,
      },
    ],
    extendedInfo_he: `השיר יצא באפריל 2016 והפך לסינגל השני של TWICE. הפזמון מבטא את האסטרטגיה: "בחורה לא יכולה לתת את לבה בקלות. ככה תאהב אותי יותר. אעמיד פנים שאני קרירה, כאילו אין שום דבר לא בסדר. כך לא תדע כמה אני אוהבת אותך". השיר זכה ב-Korean Music Awards לשיר השנה ב-2017 והוא אחד מסמלי תור הזהב של TWICE.`,
  },
  q376: {
    verified: true,
    explanation_he: `הקליפ של "פנטסטיק בייבי" של BIGBANG (2012) ידוע בדימויים הקיצוניים שלו — צבעים זוהרים, אופקים בלתי-אפשריים, דמויות מוזרות בחליפות מטורפות. ביוטיוב הוא הפך לאחד הקליפים הראשונים של K-Pop שעבר את 300 מיליון צפיות (וב-2018 כבר נחצה על ידי קליפ קוריאני אחר), ו-500 מיליון בינואר 2022. השיר עוסק במהפכה, מרידה וחירות מדיכוי — לא ויראלי בגלל הימצאו במצעדי בילבורד אלא בגלל ההצלחה ההמונית באסיה.`,
    sources: [
      wiki('Fantastic_Baby', 'Fantastic Baby'),
      wiki('BIGBANG', 'BIGBANG (South Korean band)'),
    ],
    extendedInfo_he: `השיר נכלל באלבום "Alive" (2012). הוא הפך לסינגל הראשון של BIGBANG שהגיע ל-Top 100 בבילבורד. ב-K-Pop נחשב לאחד הסינגלים שגיבשו את הז'אנר של אנדרגראונד-פופ קוריאני. כתב יד הריקוד "פנטסטיק בייבי" של LIA KIM הפך לקלאסיקה של השנים האלו.`,
  },
  q377: {
    verified: true,
    explanation_he: `השם "DDU-DU DDU-DU" מחקה את צליל הירי בקוריאנית — "דו-דו דו-דו". השיר עוסק בביטחון עצמי נשי ובתגובה לביקורת, כשהבנות "יורות" במבקרים שלהן. הקליפ הפך בנובמבר 2019 לקליפ הראשון של להקת K-Pop כלשהי (לא ספציפית להקת בנות) שחצה מיליארד צפיות ביוטיוב.`,
    sources: [
      wiki('Ddu-Du_Ddu-Du', 'Ddu-Du Ddu-Du'),
      sf('blackpink/ddu-du-ddu-du', 'Ddu-Du Ddu-Du by BLACKPINK'),
    ],
    extendedInfo_he: `השיר יצא ביוני 2018 כסינגל מאלבום ה-EP "Square Up" של BLACKPINK. המבקרת מ-Business Insider אמרה שהוא חסר את "המהות התמטית" של שירים אחרים, אבל רוב הביקורות היו חיוביות. ההצלחה של השיר הביאה את BLACKPINK לפסטיבלים גדולים בעולם, כולל קוצ'לה (כראשון מ-K-Pop ב-2019).`,
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
