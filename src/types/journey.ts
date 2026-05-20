// A Journey is a curated, themed run of 5-7 "secrets" (questions). Unlike the
// endless mode, each stop has an *intentional* format pick by us — not
// randomized — chosen to best showcase that song's particular twist.
//
// This is the core of the "מאחורי המילים" rethink: the player isn't taking
// a quiz, they're walking through a curated set of musical secrets bound by
// a theme.

import type { RoundFormat } from './round';

export interface JourneyStop {
  /** Reference to a question's `id` in src/data/questions.json. */
  questionId: string;
  /** The format we hand-picked for this song's specific twist. */
  format: RoundFormat;
  /**
   * Optional override of the "pull-quote" headline shown in the reveal card.
   * If absent the reveal card falls back to the question's explanation_he.
   */
  pullQuote?: string;
}

export interface Journey {
  /** URL slug. */
  slug: string;
  /** Display title — keep it punchy, magazine-headline style. */
  title: string;
  /** One-sentence editorial subtitle that sets the theme. */
  subtitle: string;
  /** 1-2 sentence intro paragraph shown on the cover card. */
  intro: string;
  /** Era hint used for accent color tinting. */
  era?: 'sixties' | 'seventies' | 'eighties' | 'nineties' | 'twothousands' | 'modern' | 'mixed';
  /** The ordered list of stops. 5 is the standard length; 4-7 acceptable. */
  stops: JourneyStop[];
}
