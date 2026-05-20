'use client';

// JourneyCard — magazine-cover-style tile shown on the home page that links
// into a Journey run. Era tint colors the kicker.

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Journey } from '@/types/journey';
import { tintForJourney } from '@/game/eraTint';

interface JourneyCardProps {
  journey: Journey;
  index?: number; // for stagger anim
}

export function JourneyCard({ journey, index = 0 }: JourneyCardProps) {
  const tint = tintForJourney(journey);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
    >
      <Link
        href={`/journey/${journey.slug}`}
        className={`block rounded-2xl border border-surface-tertiary bg-gradient-to-br ${tint.bgGradient} p-5 text-right hover:border-accent/40 transition-colors group`}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <div
            className={`text-[10px] uppercase tracking-[0.25em] font-bold ${tint.accentText}`}
          >
            מסע · {journey.stops.length} סודות
          </div>
          <div className="text-text-muted text-xs">{tint.label}</div>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-text-primary leading-tight mb-1.5">
          {journey.title}
        </h3>
        <p className="text-sm text-text-secondary leading-snug">
          {journey.subtitle}
        </p>
        <div
          className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${tint.accentText} group-hover:translate-x-[-2px] transition-transform`}
        >
          התחל מסע <span aria-hidden>←</span>
        </div>
      </Link>
    </motion.div>
  );
}
