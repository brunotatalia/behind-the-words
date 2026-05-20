'use client';

// Two Truths One Lie — show 3 statements about the song, player taps the lie.
// More cognitively demanding than T/F (compare and contrast vs. evaluate one),
// so we score it slightly higher than T/F base.

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import type { TwoTruthsOneLieRound as TwoTruthsOneLieRoundType } from '@/types/round';
import { SongHeader } from './SongHeader';

interface TwoTruthsOneLieRoundProps {
  round: TwoTruthsOneLieRoundType;
  isAudioPlaying: boolean;
  streak: number;
  onAnswer: (result: { correct: boolean; scoreDelta: number }) => void;
}

type CardState = 'default' | 'selected-correct' | 'selected-wrong' | 'reveal-lie' | 'reveal-truth';

const cardStyles: Record<CardState, string> = {
  default:
    'bg-surface-secondary hover:bg-surface-tertiary border-surface-tertiary cursor-pointer',
  'selected-correct': 'bg-correct/20 border-correct text-correct',
  'selected-wrong': 'bg-wrong/20 border-wrong text-wrong',
  'reveal-lie': 'bg-wrong/10 border-wrong/50 text-wrong',
  'reveal-truth': 'bg-surface-secondary border-surface-tertiary opacity-50',
};

export function TwoTruthsOneLieRound({
  round,
  isAudioPlaying,
  streak,
  onAnswer,
}: TwoTruthsOneLieRoundProps) {
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);

  const handlePick = useCallback(
    (idx: number) => {
      if (pickedIndex !== null) return;
      const correct = idx === round.lieIndex;
      setPickedIndex(idx);
      // 2T1L base is +15 (vs +10 for T/F) because 1-of-3 is harder than binary.
      const scoreDelta = correct ? 15 + streak * 2 : 0;
      onAnswer({ correct, scoreDelta });
    },
    [pickedIndex, round.lieIndex, streak, onAnswer]
  );

  function stateForCard(idx: number): CardState {
    if (pickedIndex === null) return 'default';
    if (idx === pickedIndex) {
      return idx === round.lieIndex ? 'selected-correct' : 'selected-wrong';
    }
    if (idx === round.lieIndex) return 'reveal-lie';
    return 'reveal-truth';
  }

  return (
    <div className="space-y-6">
      <SongHeader
        songTitle={round.question.songTitle}
        artist={round.question.artist}
        year={round.question.year}
        isPlaying={isAudioPlaying}
      />

      <div className="space-y-2.5 px-2">
        {round.statements.map((s, idx) => {
          const cardState = stateForCard(idx);
          return (
            <motion.button
              key={`${round.question.id}-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 * idx }}
              whileTap={pickedIndex === null ? { scale: 0.985 } : undefined}
              onClick={() => handlePick(idx)}
              disabled={pickedIndex !== null}
              className={`w-full text-right p-4 rounded-xl border-2 transition-all leading-relaxed ${cardStyles[cardState]}`}
              aria-label={`קביעה ${idx + 1}`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    cardState === 'selected-correct' || cardState === 'reveal-lie'
                      ? 'bg-wrong/30'
                      : cardState === 'selected-wrong'
                        ? 'bg-wrong/30'
                        : cardState === 'reveal-truth'
                          ? 'bg-correct/15 text-correct'
                          : 'bg-surface-tertiary text-text-muted'
                  }`}
                >
                  {cardState === 'reveal-lie' || cardState === 'selected-correct'
                    ? '✗'
                    : cardState === 'reveal-truth'
                      ? '✓'
                      : cardState === 'selected-wrong'
                        ? '✗'
                        : idx + 1}
                </span>
                <span className="text-sm md:text-base font-medium">{s.text_he}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
