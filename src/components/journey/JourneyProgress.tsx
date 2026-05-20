'use client';

// Progress dots that sit at the top of a Journey run. Replaces the
// "X/Y" counter from endless mode with a more journey-shaped visual.
// Each dot represents one stop. Status: pending / current / correct / wrong.

import { motion } from 'framer-motion';

export type StopStatus = 'pending' | 'current' | 'correct' | 'wrong';

interface JourneyProgressProps {
  statuses: StopStatus[];
}

export function JourneyProgress({ statuses }: JourneyProgressProps) {
  return (
    <div
      className="flex items-center justify-center gap-1.5"
      aria-label={`התקדמות: ${statuses.filter((s) => s === 'correct').length} מתוך ${statuses.length}`}
    >
      {statuses.map((status, idx) => {
        const baseStyles =
          'h-1.5 rounded-full transition-all duration-300';
        const widthStyles =
          status === 'current' ? 'w-8' : 'w-5';
        const colorStyles =
          status === 'correct'
            ? 'bg-correct'
            : status === 'wrong'
              ? 'bg-wrong'
              : status === 'current'
                ? 'bg-accent'
                : 'bg-surface-tertiary';
        return (
          <motion.div
            key={idx}
            initial={false}
            animate={
              status === 'current'
                ? { opacity: [0.6, 1, 0.6] }
                : { opacity: 1 }
            }
            transition={
              status === 'current'
                ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
            className={`${baseStyles} ${widthStyles} ${colorStyles}`}
          />
        );
      })}
    </div>
  );
}
