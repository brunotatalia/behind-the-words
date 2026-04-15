'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useStatsStore } from '@/store/statsStore';
import { getUnlockedAchievements } from '@/lib/achievements';
import { ScoreSummary } from '@/components/results/ScoreSummary';
import { AchievementToast } from '@/components/results/AchievementToast';
import { QuestionReview } from '@/components/results/QuestionReview';
import { ShareButton } from '@/components/results/ShareButton';

export default function ResultsPage() {
  const router = useRouter();
  const { phase, score, answers, questions, maxStreak, selectedCategory, mode, startGame, resetGame } = useGameStore();
  const statsStore = useStatsStore();
  const [newAchievements, setNewAchievements] = useState<ReturnType<typeof getUnlockedAchievements>['newlyUnlocked']>([]);

  // Record game stats and check achievements on mount
  useEffect(() => {
    if (phase === 'finished' && answers.length > 0) {
      const correctCount = answers.filter((a) => a.isCorrect).length;
      statsStore.recordGame({
        score,
        correct: correctCount,
        total: answers.length,
        maxStreak,
        category: selectedCategory,
        mode,
      });

      // Check achievements with updated stats
      const updatedStats = useStatsStore.getState();
      const { newlyUnlocked } = getUnlockedAchievements(
        {
          gamesPlayed: updatedStats.gamesPlayed,
          totalCorrect: updatedStats.totalCorrect,
          totalQuestions: updatedStats.totalQuestions,
          bestScore: updatedStats.bestScore,
          bestStreak: updatedStats.bestStreak,
          currentCorrect: correctCount,
          currentTotal: answers.length,
          currentStreak: maxStreak,
          currentScore: score,
        },
        updatedStats.unlockedAchievements
      );

      if (newlyUnlocked.length > 0) {
        setNewAchievements(newlyUnlocked);
        statsStore.addAchievements(newlyUnlocked.map((a) => a.id));
      }
    }
  }, []);

  useEffect(() => {
    if (phase !== 'finished' || answers.length === 0) {
      router.replace('/');
    }
  }, [phase, answers.length, router]);

  if (phase !== 'finished' || answers.length === 0) {
    return null;
  }

  const correctCount = answers.filter((a) => a.isCorrect).length;

  const handlePlayAgain = async () => {
    await startGame();
    router.push('/play');
  };

  const handleHome = () => {
    resetGame();
    router.push('/');
  };

  return (
    <main className="flex-1 flex flex-col min-h-dvh">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <button onClick={handleHome} className="text-text-muted text-sm hover:text-text-primary transition-colors">
          ← דף הבית
        </button>
        <h2 className="text-lg font-bold text-accent-light">תוצאות</h2>
        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 max-w-lg mx-auto w-full space-y-8">
        {/* Score Summary */}
        <div className="pt-4">
          <ScoreSummary
            score={score}
            correctCount={correctCount}
            totalQuestions={questions.length}
            maxStreak={maxStreak}
          />
        </div>

        {/* Achievements */}
        {newAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <AchievementToast achievements={newAchievements} />
          </motion.div>
        )}

        {/* Share */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <ShareButton score={score} answers={answers} />
        </motion.div>

        {/* Question Review */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <QuestionReview questions={questions} answers={answers} />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-3 pb-8"
        >
          <button
            onClick={handlePlayAgain}
            className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-light text-white font-bold text-lg transition-colors duration-200 active:scale-[0.98]"
          >
            🔄 שחק שוב
          </button>
          <button
            onClick={handleHome}
            className="w-full py-3 rounded-xl bg-surface-secondary hover:bg-surface-tertiary text-text-secondary font-medium transition-colors duration-200"
          >
            חזרה לדף הבית
          </button>
        </motion.div>
      </div>
    </main>
  );
}
