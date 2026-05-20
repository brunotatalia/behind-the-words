'use client';

// LensHeader — the small magazine "kicker" that names the investigation tool
// in use for this question. Sits above every round so the player always knows
// what lens they're looking through. This is what makes 4 different formats
// feel like 4 lenses on ONE game, instead of 4 different games.

import { motion } from 'framer-motion';
import type { RoundFormat } from '@/types/round';

interface LensHeaderProps {
  format: RoundFormat;
}

interface LensMeta {
  /** Hebrew display name — magazine-section style, all caps in original. */
  label: string;
  /** One-line instruction, shown beneath the label. */
  instruction: string;
  /** Tailwind color class for the kicker tint. */
  tint: string;
}

const LENS: Record<RoundFormat, LensMeta> = {
  tf: {
    label: 'הטוויסט',
    instruction: 'האם הקביעה הבאה היא האמת?',
    tint: 'text-accent',
  },
  'two-truths-one-lie': {
    label: 'שלושה עדים',
    instruction: 'שתי קביעות אמת, אחת משקרת. סמן את השקרית.',
    tint: 'text-orange-400',
  },
  'audio-shrinker': {
    label: 'זיהוי עיוור',
    instruction: 'קליפ קצר. ארבעה חשודים. אחד הוא השיר הנכון.',
    tint: 'text-cyan-400',
  },
  'year-ladder': {
    label: 'מכונת זמן',
    instruction: 'הזז את הסקאלה לשנה שבה זה קרה.',
    tint: 'text-fuchsia-400',
  },
};

export function LensHeader({ format }: LensHeaderProps) {
  const meta = LENS[format];
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="text-center space-y-1"
    >
      <div className={`inline-block text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold ${meta.tint}`}>
        {meta.label}
      </div>
      <div className="text-xs md:text-sm text-text-muted">
        {meta.instruction}
      </div>
    </motion.div>
  );
}
