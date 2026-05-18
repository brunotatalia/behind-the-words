'use client';

// Year Ladder — show a true statement with the year replaced by ____, player
// uses a slider to pick the year. Closer guesses = more points.
//
// The song plays in the background (the page hands us isAudioPlaying), which
// is intentional as an *audible* hint about the era.
//
// Scoring is graded by distance from the correct year:
//   |Δ| === 0 → +50, |Δ| ≤ 2 → +30, |Δ| ≤ 5 → +15, else 0
// + streak bonus on any positive score.

import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { YearLadderRound as YearLadderRoundType } from '@/types/round';
import { SongHeader } from './SongHeader';

interface YearLadderRoundProps {
  round: YearLadderRoundType;
  isAudioPlaying: boolean;
  streak: number;
  onAnswer: (result: { correct: boolean; scoreDelta: number }) => void;
}

function scoreForDelta(delta: number, streak: number): { score: number; correct: boolean } {
  const abs = Math.abs(delta);
  let base = 0;
  if (abs === 0) base = 50;
  else if (abs <= 2) base = 30;
  else if (abs <= 5) base = 15;
  return { score: base > 0 ? base + streak * 2 : 0, correct: abs <= 2 };
}

export function YearLadderRound({
  round,
  isAudioPlaying,
  streak,
  onAnswer,
}: YearLadderRoundProps) {
  // Default the slider to the middle of the range so the player must commit a
  // real move — defaulting to the correct year would obviously give it away.
  const midYear = useMemo(
    () => Math.floor((round.minYear + round.maxYear) / 2),
    [round.minYear, round.maxYear]
  );
  const [guess, setGuess] = useState<number>(midYear);
  const [settled, setSettled] = useState<{
    guess: number;
    delta: number;
    score: number;
    correct: boolean;
  } | null>(null);

  const handleSubmit = useCallback(() => {
    if (settled) return;
    const delta = guess - round.correctYear;
    const { score, correct } = scoreForDelta(delta, streak);
    setSettled({ guess, delta, score, correct });
    onAnswer({ correct, scoreDelta: score });
  }, [settled, guess, round.correctYear, streak, onAnswer]);

  // Color the visible year label by how close the user is currently sitting —
  // gives just enough feedback to make the slider feel responsive without
  // giving away the answer.
  const guessHueClass = useMemo(() => {
    if (settled) {
      const abs = Math.abs(settled.delta);
      if (abs === 0) return 'text-correct';
      if (abs <= 2) return 'text-correct/80';
      if (abs <= 5) return 'text-orange-400';
      return 'text-wrong';
    }
    return 'text-text-primary';
  }, [settled]);

  return (
    <div className="space-y-6">
      <SongHeader
        songTitle={round.question.songTitle}
        artist={round.question.artist}
        year={settled ? round.question.year : undefined /* hide year until done */}
        isPlaying={isAudioPlaying}
      />

      <div className="text-center px-2">
        <div className="text-xs text-text-muted uppercase tracking-wider mb-3">
          באיזו שנה זה היה?
        </div>
        <p className="text-lg md:text-xl font-bold leading-relaxed text-text-primary">
          {round.maskedStatement}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="px-4 space-y-3"
      >
        <div className={`text-center text-4xl md:text-5xl font-bold tabular-nums transition-colors ${guessHueClass}`}>
          {settled ? settled.guess : guess}
        </div>

        <input
          type="range"
          min={round.minYear}
          max={round.maxYear}
          step={1}
          value={settled ? settled.guess : guess}
          onChange={(e) => setGuess(Number(e.target.value))}
          disabled={settled !== null}
          aria-label="בחר שנה"
          className="w-full accent-accent disabled:opacity-60"
        />
        <div className="flex justify-between text-xs text-text-muted tabular-nums">
          <span>{round.minYear}</span>
          <span>{round.maxYear}</span>
        </div>

        {settled ? (
          <div
            className={`text-center text-sm font-medium ${
              Math.abs(settled.delta) === 0
                ? 'text-correct'
                : Math.abs(settled.delta) <= 2
                  ? 'text-correct/80'
                  : Math.abs(settled.delta) <= 5
                    ? 'text-orange-400'
                    : 'text-wrong'
            }`}
          >
            {Math.abs(settled.delta) === 0
              ? '🎯 בול! '
              : settled.delta > 0
                ? `מאוחר ב-${settled.delta} שנים. השיר מ-${round.correctYear}.`
                : `מוקדם ב-${-settled.delta} שנים. השיר מ-${round.correctYear}.`}
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl bg-accent text-white font-bold text-base hover:bg-accent-light transition-colors"
          >
            נעלתי את השנה
          </button>
        )}
      </motion.div>
    </div>
  );
}
