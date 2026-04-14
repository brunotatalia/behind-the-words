'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AnswerRecord } from '@/types/game';

interface ShareButtonProps {
  score: number;
  answers: AnswerRecord[];
}

export function ShareButton({ score, answers }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const correctCount = answers.filter(a => a.isCorrect).length;
  const accuracy = Math.round((correctCount / answers.length) * 100);
  const stars = accuracy >= 90 ? '⭐⭐⭐' : accuracy >= 70 ? '⭐⭐' : accuracy >= 50 ? '⭐' : '';

  // Visual grid
  const row1 = answers.slice(0, 5).map(a => a.isCorrect ? '🟩' : '🟥').join('');
  const row2 = answers.slice(5).map(a => a.isCorrect ? '🟩' : '🟥').join('');

  const shareText = `🎵 מאחורי המילים ${stars}

${row1}
${row2}

${correctCount}/${answers.length} | ${score} נק׳ | ${accuracy}% דיוק

🎶 כמה אתם באמת מכירים את השירים שאתם שומעים?
👉 behind-the-words.com`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'מאחורי המילים - תוצאות',
          text: shareText,
          url: 'https://behind-the-words.com',
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShowCard = () => setShowCard(true);

  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={handleShare}
          className="flex-1 py-3 rounded-xl border-2 border-accent text-accent hover:bg-accent hover:text-white font-bold transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>📤</span>
          <span>{copied ? '!הועתק' : 'שתף תוצאות'}</span>
        </button>
      </div>

      {/* Share Preview Card */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
            onClick={() => setShowCard(false)}
          >
            <motion.div
              ref={cardRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-gradient-to-b from-surface-secondary to-surface-primary rounded-3xl p-6 max-w-sm w-full space-y-4 text-center shadow-2xl border border-accent/20"
            >
              <div className="text-3xl">🎵</div>
              <h3 className="text-xl font-bold text-accent-light">מאחורי המילים</h3>
              <div className="text-3xl tracking-wider">{row1}<br/>{row2}</div>
              <div className="text-2xl font-bold text-gold">{score} נקודות</div>
              <div className="text-text-secondary">{correctCount}/{answers.length} תשובות נכונות</div>
              {stars && <div className="text-2xl">{stars}</div>}
              <div className="text-xs text-text-muted">behind-the-words.com</div>
              <button
                onClick={handleShare}
                className="w-full py-3 rounded-xl bg-accent text-white font-bold"
              >
                {copied ? '!הועתק' : '📤 שתף'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
