'use client';

// Journey outro — closing card after the player completes (or quits) a run.
// Shows the score, secrets revealed, and a WhatsApp share CTA.

import { motion } from 'framer-motion';
import type { Journey } from '@/types/journey';
import { tintForJourney } from '@/game/eraTint';

interface JourneyOutroProps {
  journey: Journey;
  correctCount: number;
  totalScore: number;
  bestStreak: number;
  onShare: () => void;
  onReplay: () => void;
  onHome: () => void;
}

export function JourneyOutro({
  journey,
  correctCount,
  totalScore,
  bestStreak,
  onShare,
  onReplay,
  onHome,
}: JourneyOutroProps) {
  const tint = tintForJourney(journey);
  const total = journey.stops.length;
  // Editorial flavor for the headline based on how well they did.
  const headline =
    correctCount === total
      ? 'מסע מושלם'
      : correctCount >= Math.ceil(total * 0.6)
        ? 'מסע מוצלח'
        : correctCount > 0
          ? 'המסע נחתם'
          : 'מסע ראשון';

  return (
    <div
      className={`relative flex-1 flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b ${tint.bgGradient}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-6"
      >
        <div
          className={`text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold ${tint.accentText}`}
        >
          המסע הושלם
        </div>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-text-primary">
          {headline}
        </h1>

        <div className="text-text-secondary text-base">
          חשפת <span className={`font-bold ${tint.accentText}`}>{correctCount}</span> מתוך{' '}
          <span className="font-bold">{total}</span> סודות במסע
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="rounded-2xl border border-surface-tertiary bg-surface-secondary/40 p-4">
            <div className="text-3xl font-bold text-accent">{totalScore}</div>
            <div className="text-xs text-text-muted mt-1">ניקוד</div>
          </div>
          <div className="rounded-2xl border border-surface-tertiary bg-surface-secondary/40 p-4">
            <div className="text-3xl font-bold text-orange-400">
              🔥 {bestStreak}
            </div>
            <div className="text-xs text-text-muted mt-1">רצף שיא</div>
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <button
            onClick={onShare}
            className="w-full py-4 rounded-2xl bg-green-600 text-white font-bold text-base hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
          >
            <span>שתף בוואטסאפ</span>
            <span aria-hidden>↗</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onReplay}
              className="flex-1 py-3 rounded-2xl border border-surface-tertiary text-text-secondary font-medium hover:bg-surface-secondary transition-colors"
            >
              שוב
            </button>
            <button
              onClick={onHome}
              className="flex-1 py-3 rounded-2xl border border-surface-tertiary text-text-secondary font-medium hover:bg-surface-secondary transition-colors"
            >
              למסעות אחרים
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
