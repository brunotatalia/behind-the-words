'use client';

// Journey cover card — the magazine "splash page" the player sees before
// starting a themed run. Editorial typography, era-tinted backdrop, single
// call-to-action.

import { motion } from 'framer-motion';
import type { Journey } from '@/types/journey';
import { tintForJourney } from '@/game/eraTint';

interface JourneyCoverProps {
  journey: Journey;
  onStart: () => void;
}

export function JourneyCover({ journey, onStart }: JourneyCoverProps) {
  const tint = tintForJourney(journey);
  return (
    <div
      className={`relative flex-1 flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b ${tint.bgGradient}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md w-full text-center space-y-6"
      >
        <div
          className={`text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold ${tint.accentText}`}
        >
          מסע · {journey.stops.length} סודות
        </div>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-text-primary">
          {journey.title}
        </h1>

        <div className="text-base md:text-lg text-text-secondary font-medium leading-relaxed">
          {journey.subtitle}
        </div>

        <div
          className="text-sm md:text-base text-text-muted leading-relaxed text-right max-w-prose mx-auto pt-4 border-t border-surface-tertiary/50"
          dir="rtl"
        >
          {journey.intro}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-accent text-white font-bold text-base hover:bg-accent-light transition-colors shadow-lg"
        >
          בוא נצא לדרך
          <span>←</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
