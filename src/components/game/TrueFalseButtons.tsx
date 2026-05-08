'use client';

import { motion } from 'framer-motion';

type ButtonState = 'default' | 'selected-correct' | 'selected-wrong' | 'reveal-correct' | 'disabled';

interface TrueFalseButtonsProps {
  state: { trueState: ButtonState; falseState: ButtonState };
  onSelect: (answer: 'true' | 'false') => void;
  disabled?: boolean;
}

const stateStyles: Record<ButtonState, string> = {
  default: 'bg-surface-secondary hover:bg-surface-tertiary border-surface-tertiary',
  'selected-correct': 'bg-correct/25 border-correct text-correct',
  'selected-wrong': 'bg-wrong/25 border-wrong text-wrong',
  'reveal-correct': 'bg-correct/15 border-correct/50 text-correct',
  disabled: 'bg-surface-secondary border-surface-tertiary opacity-40',
};

export function TrueFalseButtons({ state, onSelect, disabled }: TrueFalseButtonsProps) {
  return (
    <div className="flex gap-3 px-4">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        whileTap={!disabled && state.trueState === 'default' ? { scale: 0.96 } : undefined}
        onClick={() => !disabled && state.trueState === 'default' && onSelect('true')}
        disabled={disabled || state.trueState !== 'default'}
        className={`flex-1 py-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 ${stateStyles[state.trueState]}`}
        aria-label="הקביעה נכונה"
      >
        <div className="text-3xl">✓</div>
        <div className="font-bold text-base">נכון</div>
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        whileTap={!disabled && state.falseState === 'default' ? { scale: 0.96 } : undefined}
        onClick={() => !disabled && state.falseState === 'default' && onSelect('false')}
        disabled={disabled || state.falseState !== 'default'}
        className={`flex-1 py-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 ${stateStyles[state.falseState]}`}
        aria-label="הקביעה שגויה"
      >
        <div className="text-3xl">✗</div>
        <div className="font-bold text-base">לא נכון</div>
      </motion.button>
    </div>
  );
}
