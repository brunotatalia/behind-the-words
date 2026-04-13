'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScoreSummaryProps {
  score: number;
  correctCount: number;
  totalQuestions: number;
  maxStreak: number;
}

export function ScoreSummary({ score, correctCount, totalQuestions, maxStreak }: ScoreSummaryProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const stars = percentage >= 90 ? 5 : percentage >= 70 ? 4 : percentage >= 50 ? 3 : percentage >= 30 ? 2 : 1;

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [score]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      {/* Stars */}
      <div className="text-4xl tracking-widest">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}
          >
            {i < stars ? '⭐' : '☆'}
          </motion.span>
        ))}
      </div>

      {/* Score */}
      <div>
        <div className="text-6xl font-bold text-accent-light tabular-nums">
          {displayScore}
        </div>
        <div className="text-text-muted text-sm mt-1">נקודות</div>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 text-center">
        <div>
          <div className="text-2xl font-bold text-correct">{correctCount}/{totalQuestions}</div>
          <div className="text-xs text-text-muted">תשובות נכונות</div>
        </div>
        <div className="w-px bg-surface-tertiary" />
        <div>
          <div className="text-2xl font-bold text-gold">{maxStreak}</div>
          <div className="text-xs text-text-muted">רצף מקסימלי</div>
        </div>
        <div className="w-px bg-surface-tertiary" />
        <div>
          <div className="text-2xl font-bold text-accent-light">{percentage}%</div>
          <div className="text-xs text-text-muted">דיוק</div>
        </div>
      </div>
    </motion.div>
  );
}
