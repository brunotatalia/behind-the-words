'use client';

import { motion } from 'framer-motion';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  pointsEarned: number;
  streak: number;
  onContinue: () => void;
}

export function AnswerFeedback({ isCorrect, pointsEarned, streak, onContinue }: AnswerFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onContinue}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="text-center space-y-3"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1, stiffness: 200 }}
          className="text-7xl"
        >
          {isCorrect ? '✅' : '❌'}
        </motion.div>

        <h3 className="text-3xl font-bold">
          {isCorrect ? '!נכון' : 'לא נכון'}
        </h3>

        {isCorrect && pointsEarned > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent-light text-xl font-bold"
          >
            +{pointsEarned} נקודות
          </motion.div>
        )}

        {streak >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="text-gold text-lg font-bold"
          >
            🔥 רצף של {streak}!
          </motion.div>
        )}

        <p className="text-text-muted text-sm mt-4">לחץ להמשיך</p>
      </motion.div>
    </motion.div>
  );
}
