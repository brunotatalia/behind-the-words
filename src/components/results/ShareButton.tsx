'use client';

import { useState } from 'react';
import type { AnswerRecord } from '@/types/game';

interface ShareButtonProps {
  score: number;
  answers: AnswerRecord[];
}

export function ShareButton({ score, answers }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const correctCount = answers.filter(a => a.isCorrect).length;
  // Two rows of 5 for visual appeal
  const row1 = answers.slice(0, 5).map(a => a.isCorrect ? '🟩' : '🟥').join('');
  const row2 = answers.slice(5).map(a => a.isCorrect ? '🟩' : '🟥').join('');
  const stars = correctCount >= 9 ? '⭐⭐⭐' : correctCount >= 7 ? '⭐⭐' : correctCount >= 5 ? '⭐' : '';

  const text = `🎵 מאחורי המילים ${stars}

${row1}
${row2}

${correctCount}/${answers.length} | ${score} נקודות
behind-the-words.com`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full py-3 rounded-xl border-2 border-accent text-accent hover:bg-accent hover:text-white font-bold transition-all duration-200 active:scale-[0.98]"
    >
      {copied ? '!הועתק' : '📤 שתף תוצאות'}
    </button>
  );
}
