'use client';

// True/False round — the original mechanic, factored out so /play can dispatch
// on round.format. The component owns the "have they answered yet?" state and
// reports the result via `onAnswer`.

import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { TrueFalseRound as TrueFalseRoundType } from '@/types/round';
import { SongHeader } from './SongHeader';

type ButtonState =
  | 'default'
  | 'selected-correct'
  | 'selected-wrong'
  | 'reveal-correct'
  | 'disabled';

const stateStyles: Record<ButtonState, string> = {
  default:
    'bg-surface-secondary hover:bg-surface-tertiary border-surface-tertiary',
  'selected-correct': 'bg-correct/25 border-correct text-correct',
  'selected-wrong': 'bg-wrong/25 border-wrong text-wrong',
  'reveal-correct': 'bg-correct/15 border-correct/50 text-correct',
  disabled: 'bg-surface-secondary border-surface-tertiary opacity-40',
};

interface TrueFalseRoundProps {
  round: TrueFalseRoundType;
  isAudioPlaying: boolean;
  streak: number;
  /** Called once when the player picks an answer. */
  onAnswer: (result: { correct: boolean; scoreDelta: number }) => void;
}

export function TrueFalseRound({
  round,
  isAudioPlaying,
  streak,
  onAnswer,
}: TrueFalseRoundProps) {
  const [answer, setAnswer] = useState<'true' | 'false' | null>(null);

  const handleAnswer = useCallback(
    (chosen: 'true' | 'false') => {
      if (answer !== null) return; // already answered
      const correct =
        (chosen === 'true' && round.isStatementTrue) ||
        (chosen === 'false' && !round.isStatementTrue);
      setAnswer(chosen);
      const scoreDelta = correct ? 10 + streak * 2 : 0;
      onAnswer({ correct, scoreDelta });
    },
    [answer, round.isStatementTrue, streak, onAnswer]
  );

  const buttonStates = useMemo(() => {
    if (answer === null) {
      return {
        trueState: 'default' as ButtonState,
        falseState: 'default' as ButtonState,
      };
    }
    const correctSide: 'true' | 'false' = round.isStatementTrue ? 'true' : 'false';
    const userCorrect = answer === correctSide;
    return {
      trueState:
        answer === 'true'
          ? userCorrect
            ? ('selected-correct' as ButtonState)
            : ('selected-wrong' as ButtonState)
          : correctSide === 'true' && !userCorrect
            ? ('reveal-correct' as ButtonState)
            : ('disabled' as ButtonState),
      falseState:
        answer === 'false'
          ? userCorrect
            ? ('selected-correct' as ButtonState)
            : ('selected-wrong' as ButtonState)
          : correctSide === 'false' && !userCorrect
            ? ('reveal-correct' as ButtonState)
            : ('disabled' as ButtonState),
    };
  }, [answer, round.isStatementTrue]);

  return (
    <div className="space-y-6">
      <SongHeader
        songTitle={round.question.songTitle}
        artist={round.question.artist}
        year={round.question.year}
        isPlaying={isAudioPlaying}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-2"
      >
        <div className="text-xs text-text-muted uppercase tracking-wider mb-3 text-center">
          האם הקביעה נכונה?
        </div>
        <p className="text-lg md:text-xl font-bold leading-relaxed text-text-primary text-center">
          {round.statement.text_he}
        </p>
      </motion.div>

      <div className="flex gap-3 px-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileTap={
            answer === null ? { scale: 0.96 } : undefined
          }
          onClick={() => handleAnswer('true')}
          disabled={answer !== null}
          className={`flex-1 py-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 ${stateStyles[buttonStates.trueState]}`}
          aria-label="הקביעה נכונה"
        >
          <div className="text-3xl">✓</div>
          <div className="font-bold text-base">נכון</div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileTap={
            answer === null ? { scale: 0.96 } : undefined
          }
          onClick={() => handleAnswer('false')}
          disabled={answer !== null}
          className={`flex-1 py-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 ${stateStyles[buttonStates.falseState]}`}
          aria-label="הקביעה שגויה"
        >
          <div className="text-3xl">✗</div>
          <div className="font-bold text-base">לא נכון</div>
        </motion.button>
      </div>
    </div>
  );
}
