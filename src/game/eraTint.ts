// Era tint — given a song's year (or a Journey's `era` hint), return a
// subtle accent gradient that "feels" like the era.
//
// Used by the Journey cover card and outro to color-code the run, and could
// be wired into the in-question card backdrop later for finer texture.
// Subtle on purpose — these are accents, not flood colors.

import type { Journey } from '@/types/journey';

export type EraKey =
  | 'sixties'
  | 'seventies'
  | 'eighties'
  | 'nineties'
  | 'twothousands'
  | 'modern'
  | 'mixed';

interface EraTint {
  /** Tailwind class for a subtle background gradient. */
  bgGradient: string;
  /** Tailwind text class for the era accent. */
  accentText: string;
  /** A small label naming the era (Hebrew). */
  label: string;
}

const TINTS: Record<EraKey, EraTint> = {
  sixties: {
    bgGradient: 'from-amber-900/20 via-amber-950/30 to-transparent',
    accentText: 'text-amber-400',
    label: 'שנות ה-60',
  },
  seventies: {
    bgGradient: 'from-orange-900/20 via-rose-950/30 to-transparent',
    accentText: 'text-orange-400',
    label: 'שנות ה-70',
  },
  eighties: {
    bgGradient: 'from-fuchsia-900/25 via-purple-950/30 to-transparent',
    accentText: 'text-fuchsia-400',
    label: 'שנות ה-80',
  },
  nineties: {
    bgGradient: 'from-cyan-900/20 via-blue-950/30 to-transparent',
    accentText: 'text-cyan-400',
    label: 'שנות ה-90',
  },
  twothousands: {
    bgGradient: 'from-emerald-900/20 via-teal-950/30 to-transparent',
    accentText: 'text-emerald-400',
    label: 'שנות ה-2000',
  },
  modern: {
    bgGradient: 'from-indigo-900/25 via-violet-950/30 to-transparent',
    accentText: 'text-indigo-400',
    label: 'עכשווי',
  },
  mixed: {
    bgGradient: 'from-accent/15 via-accent/5 to-transparent',
    accentText: 'text-accent',
    label: 'מגוון',
  },
};

export function eraFromYear(year: number | undefined): EraKey {
  if (!year) return 'mixed';
  if (year < 1970) return 'sixties';
  if (year < 1980) return 'seventies';
  if (year < 1990) return 'eighties';
  if (year < 2000) return 'nineties';
  if (year < 2010) return 'twothousands';
  return 'modern';
}

export function tintForJourney(journey: Pick<Journey, 'era'>): EraTint {
  return TINTS[journey.era ?? 'mixed'];
}

export function tintForEra(era: EraKey): EraTint {
  return TINTS[era];
}
