// Curated Journeys — themed runs of 5 musical secrets, each with a hand-picked
// format chosen to best showcase that song's particular twist. NOT randomized.
//
// Editorial principles when curating:
//   1. Every stop must genuinely fit the theme — no padding.
//   2. Vary formats within a journey (don't string 5 T/Fs).
//   3. Open with an EASY win, close with the MOST POWERFUL secret.
//   4. Don't ship a stop whose chosen format the data can't support — the
//     `lint:journeys` script catches this at build time.

import type { Journey } from '@/types/journey';

export const journeys: Journey[] = [
  // ---------------------------------------------------------------------------
  // Bedroom Hits — low-budget origin stories of massive hits
  // ---------------------------------------------------------------------------
  {
    slug: 'bedroom-hits',
    title: 'הוקלט בחדר השינה',
    subtitle: '5 להיטי ענק שנולדו בלי תקציב, בלי אולפן, ובלי תקווה גדולה',
    intro:
      'לפני שהם פגעו במאות מיליוני אוזניים, השירים האלה הוקלטו בחדר ילדים, בבקתת יער, או בערב מיקרופון פתוח. הסיפור מאחורי כל אחד הוא הוכחה שהפעם שבה אתה הכי בודד היא לפעמים בדיוק הפעם שבה אתה כותב את הדבר הכי גדול בחיים שלך.',
    era: 'modern',
    stops: [
      {
        questionId: 'q002',
        format: 'tf',
        pullQuote:
          'מארק פוסטר הקליט את "Pumped Up Kicks" ב-Logic Pro בחדר השינה שלו. הדמו הגולמי הוא הגרסה ששוחררה — בלי שיפוצים באולפן.',
      },
      {
        questionId: 'q093',
        format: 'year-ladder',
        pullQuote:
          'ג\'סטין ורנון בילה 3 חודשים לבד בבקתת יערות בויסקונסין, חולה במונונוקלאוזיס. כשיצא, היה לו אלבום שלם של Bon Iver.',
      },
      {
        questionId: 'q062',
        format: 'tf',
        pullQuote:
          'לורד הייתה בת 15 כשכתבה את "Royals" בחופשת בית-ספר בניו זילנד. שנה אחר כך היא הייתה האמנית הצעירה בהיסטוריה שזכתה בגראמי לשיר השנה.',
      },
      {
        questionId: 'q038',
        format: 'two-truths-one-lie',
        pullQuote:
          'ברנדון פלאוורס וגיטריסט The Killers דייב קיונינג ביצעו את "Mr. Brightside" לראשונה בערב מיקרופון פתוח בבית קפה בלאס וגאס בינואר 2002.',
      },
      {
        questionId: 'q043',
        format: 'audio-shrinker',
        pullQuote:
          '"bad guy" הוקלט בבית של הוריה של בילי אייליש על ידי אחיה פיניאס. הוא היה הסינגל שזכה לכל ארבעת הפרסים הגדולים בגראמי 2020 — לראשונה מאז 1981.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Not What You Think — songs whose meaning everyone got wrong
  // ---------------------------------------------------------------------------
  {
    slug: 'not-what-you-think',
    title: 'זה לא מה שאתה חושב',
    subtitle: '5 שירים שכולם מכירים — ושכולם מבינים לא נכון',
    intro:
      'יש שירים שכל המשמעות שלהם נחטפה. שיר מחאה הופך להמנון פטריוטי. שיר על מעקב הופך לבלדה רומנטית. שיר על אובססיה הופך לשיר אמונה דתית. בחמש העצירות הבאות נחשוף את הפער בין מה שכל אחד חושב שהשיר אומר — לבין מה שהאמן באמת התכוון.',
    era: 'mixed',
    stops: [
      {
        questionId: 'q076',
        format: 'tf',
        pullQuote:
          'ג\'יימס בלאנט אמר על "You\'re Beautiful": "הוא על בחור שמסומם לחלוטין, עוקב אחרי החברה של מישהו אחר. אם זה מה שאתם חושבים שזה רומנטיקה — אתם די מוזרים."',
      },
      {
        questionId: 'q005',
        format: 'two-truths-one-lie',
        pullQuote:
          '"Born in the USA" בכלל לא המנון פטריוטי. ברוס ספרינגסטין כתב אותו ככתב אישום על מה שעשתה אמריקה לוטרני וייטנאם. הריגן ניסה לאמץ אותו לקמפיין ב-1984. ספרינגסטין סירב.',
      },
      {
        questionId: 'q030',
        format: 'year-ladder',
        pullQuote:
          'ביל דנוף, כותב "Afternoon Delight", הודה ש"לא רציתי לכתוב שיר סקס מוחלט, רק משהו כיפי שמרמז על סקס". הרעיון נולד מתפריט מסעדה.',
      },
      {
        questionId: 'q303',
        format: 'tf',
        pullQuote:
          'דאדי יאנקי הכחיש במפורש את הפרשנות המינית של "Gasolina": "השיר לחלוטין מילולי. זה השיר הכי תמים שכתבתי." ב-2008, ג\'ון מקיין השתמש בו בקמפיין הנשיאות.',
      },
      {
        questionId: 'q099',
        format: 'audio-shrinker',
        pullQuote:
          '"Losing My Religion" של R.E.M. אינו עוסק באובדן אמונה דתית. הביטוי בדיאלקט הדרומי של ארצות הברית פירושו "לאבד שליטה" או "להגיע לקצה הסבלנות". מייקל סטייפ הסביר: זה שיר אובססיה קלאסי.',
      },
    ],
  },
];

export function findJourney(slug: string): Journey | undefined {
  return journeys.find((j) => j.slug === slug);
}
