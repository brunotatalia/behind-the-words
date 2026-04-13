'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnswerState = 'default' | 'selected-correct' | 'selected-wrong' | 'reveal-correct' | 'disabled';

interface AnswerOptionProps {
  id: string;
  text: string;
  index: number;
  state: AnswerState;
  onSelect: () => void;
  disabled: boolean;
}

const letters = ['A', 'B', 'C', 'D'];

export function AnswerOption({ id, text, index, state, onSelect, disabled }: AnswerOptionProps) {
  const stateStyles: Record<AnswerState, string> = {
    default: 'bg-surface-secondary border-surface-tertiary hover:border-accent/50 hover:bg-surface-tertiary active:scale-[0.98]',
    'selected-correct': 'bg-correct-bg border-correct',
    'selected-wrong': 'bg-wrong-bg border-wrong animate-shake',
    'reveal-correct': 'bg-correct-bg border-correct/50',
    disabled: 'bg-surface-secondary border-surface-tertiary opacity-50',
  };

  const letterStyles: Record<AnswerState, string> = {
    default: 'bg-surface-tertiary text-text-secondary',
    'selected-correct': 'bg-correct text-white',
    'selected-wrong': 'bg-wrong text-white',
    'reveal-correct': 'bg-correct/50 text-white',
    disabled: 'bg-surface-tertiary text-text-muted',
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-start min-h-[56px]',
        stateStyles[state]
      )}
    >
      <span
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200',
          letterStyles[state]
        )}
      >
        {letters[index]}
      </span>
      <span className="font-inter text-sm md:text-base leading-snug" dir="ltr">{text}</span>

      {(state === 'selected-correct' || state === 'reveal-correct') && (
        <span className="ms-auto text-correct text-lg">✓</span>
      )}
      {state === 'selected-wrong' && (
        <span className="ms-auto text-wrong text-lg">✗</span>
      )}
    </motion.button>
  );
}
