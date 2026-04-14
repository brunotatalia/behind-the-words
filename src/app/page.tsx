'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { categories } from '@/data/categories';
import { questions } from '@/data/questions';
import type { Category, Difficulty } from '@/types/question';
import type { GameMode } from '@/types/game';
import { useStatsStore } from '@/store/statsStore';
import { useSettingsStore } from '@/store/settingsStore';

export default function HomePage() {
  const router = useRouter();
  const startGame = useGameStore((s) => s.startGame);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [mode, setMode] = useState<GameMode>('classic');
  const [showOptions, setShowOptions] = useState(false);
  const { gamesPlayed, bestScore, bestStreak, totalCorrect, totalQuestions } = useStatsStore();
  const { soundEnabled, toggleSound } = useSettingsStore();

  const handleStart = () => {
    startGame(selectedCategory ?? undefined, mode, selectedDifficulty ?? undefined);
    router.push('/play');
  };

  const handleDaily = () => {
    startGame(undefined, 'daily');
    router.push('/play');
  };

  // Check if daily was already played today
  const today = new Date().toISOString().slice(0, 10);
  const dailyPlayed = useStatsStore((s) =>
    s.recentGames.some((g) => g.mode === 'daily' && g.date.startsWith(today))
  );

  const hasCustomization = selectedCategory !== null || selectedDifficulty !== null || mode !== 'classic';

  const filteredQuestions = questions.filter(q => {
    if (selectedCategory && q.category !== selectedCategory) return false;
    if (selectedDifficulty && q.difficulty !== selectedDifficulty) return false;
    return true;
  });
  const categoryCount = filteredQuestions.length;

  return (
    <main className="flex-1 flex flex-col items-center px-6 py-8 max-w-lg mx-auto w-full">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative z-10 text-center w-full space-y-5">
        {/* Logo / Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.1 }}
            className="text-5xl"
          >
            🎵
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            מאחורי{' '}
            <span className="bg-gradient-to-l from-accent to-accent-light bg-clip-text text-transparent">
              המילים
            </span>
          </motion.h1>
          <p className="text-text-secondary text-base">
            ?מה באמת מסתתר מאחורי השירים שאתם שומעים
          </p>
        </motion.div>

        {/* Start Button — always visible above fold */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <button
            onClick={handleStart}
            disabled={categoryCount < 4}
            className="group relative w-full px-12 py-5 rounded-2xl bg-gradient-to-l from-accent to-accent-light text-white font-bold text-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {hasCustomization ? `${categoryCount} שאלות - !בואו נתחיל` : '!בואו נתחיל'}
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-accent to-accent-light opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
          </button>
        </motion.div>

        {/* Customize toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            <motion.span
              animate={{ rotate: showOptions ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▾
            </motion.span>
            {showOptions ? 'הסתר אפשרויות' : 'התאמה אישית'}
            {hasCustomization && (
              <span className="w-2 h-2 rounded-full bg-accent" />
            )}
          </button>
        </motion.div>

        {/* Expandable Options */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pb-2">
                {/* Category Selection */}
                <div className="space-y-2">
                  <h3 className="text-text-muted text-xs font-medium">קטגוריה</h3>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border-2 ${
                      selectedCategory === null
                        ? 'border-accent bg-accent/15 text-accent-light'
                        : 'border-surface-tertiary bg-surface-secondary text-accent-light/70 hover:border-accent/30'
                    }`}
                  >
                    🎲 כל הקטגוריות
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 border-2 ${
                            isSelected
                              ? 'border-accent bg-accent/15 text-accent-light'
                              : 'border-surface-tertiary bg-surface-secondary text-text-secondary hover:border-accent/30'
                          }`}
                        >
                          {cat.icon} {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mode & Difficulty */}
                <div className="space-y-2">
                  <h3 className="text-text-muted text-xs font-medium">מצב משחק</h3>
                  <div className="flex justify-center">
                    <div className="inline-flex rounded-xl bg-surface-secondary p-1 gap-1">
                      <button
                        onClick={() => setMode('classic')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          mode === 'classic'
                            ? 'bg-accent text-white shadow-md'
                            : 'text-text-muted hover:text-text-secondary'
                        }`}
                      >
                        ⏱️ קלאסי
                      </button>
                      <button
                        onClick={() => setMode('learn')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          mode === 'learn'
                            ? 'bg-accent text-white shadow-md'
                            : 'text-text-muted hover:text-text-secondary'
                        }`}
                      >
                        📚 למידה
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-text-muted text-xs font-medium">רמת קושי</h3>
                  <div className="flex justify-center">
                    <div className="inline-flex rounded-xl bg-surface-secondary p-1 gap-1">
                      {([null, 'easy', 'medium', 'hard'] as (Difficulty | null)[]).map((diff) => {
                        const labels: Record<string, string> = { easy: '🟢 קל', medium: '🟡 בינוני', hard: '🔴 קשה' };
                        const label = diff ? labels[diff] : '🎯 מיקס';
                        const isActive = selectedDifficulty === diff;
                        return (
                          <button
                            key={diff ?? 'all'}
                            onClick={() => setSelectedDifficulty(diff)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                              isActive
                                ? 'bg-accent text-white shadow-md'
                                : 'text-text-muted hover:text-text-secondary'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Sound Toggle */}
                <div className="flex justify-center">
                  <button
                    onClick={toggleSound}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-secondary text-text-muted hover:text-text-secondary text-xs transition-colors"
                  >
                    {soundEnabled ? '🔊 צלילים מופעלים' : '🔇 צלילים כבויים'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Daily Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <button
            onClick={handleDaily}
            disabled={dailyPlayed}
            className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-200 ${
              dailyPlayed
                ? 'border-surface-tertiary bg-surface-secondary opacity-60'
                : 'border-gold/30 bg-gold/5 hover:bg-gold/10 hover:border-gold/50'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-xl">{dailyPlayed ? '✅' : '📅'}</span>
              <div className="text-start">
                <div className="font-bold text-gold text-sm">
                  {dailyPlayed ? 'האתגר היומי הושלם!' : 'אתגר יומי'}
                </div>
                <div className="text-[11px] text-text-muted">
                  {dailyPlayed ? 'חזרו מחר לאתגר חדש' : 'אותן 10 שאלות לכולם - מי יגיע לניקוד הגבוה ביותר?'}
                </div>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Personal Stats */}
        {gamesPlayed > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="space-y-2"
          >
            <h3 className="text-text-muted text-xs font-medium">הסטטיסטיקות שלך</h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-surface-secondary rounded-xl p-2.5 text-center">
                <div className="text-lg font-bold text-accent-light">{gamesPlayed}</div>
                <div className="text-[10px] text-text-muted">משחקים</div>
              </div>
              <div className="bg-surface-secondary rounded-xl p-2.5 text-center">
                <div className="text-lg font-bold text-correct">{bestScore}</div>
                <div className="text-[10px] text-text-muted">שיא ניקוד</div>
              </div>
              <div className="bg-surface-secondary rounded-xl p-2.5 text-center">
                <div className="text-lg font-bold text-gold">{bestStreak}x</div>
                <div className="text-[10px] text-text-muted">שיא רצף</div>
              </div>
              <div className="bg-surface-secondary rounded-xl p-2.5 text-center">
                <div className="text-lg font-bold text-accent-light">
                  {totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0}%
                </div>
                <div className="text-[10px] text-text-muted">דיוק</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* How it works — first time only */}
        {gamesPlayed === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3 pt-2"
          >
            <h3 className="text-text-muted text-xs font-medium">?איך זה עובד</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1.5">
                <div className="text-2xl">❓</div>
                <p className="text-[11px] text-text-muted leading-snug">קראו את השאלה על שיר מפורסם</p>
              </div>
              <div className="space-y-1.5">
                <div className="text-2xl">🤔</div>
                <p className="text-[11px] text-text-muted leading-snug">בחרו תשובה מתוך 4 אפשרויות</p>
              </div>
              <div className="space-y-1.5">
                <div className="text-2xl">💡</div>
                <p className="text-[11px] text-text-muted leading-snug">גלו את הסיפור האמיתי מאחורי השיר</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-text-muted text-[11px] pt-2"
        >
          🎯 {questions.length} שאלות · 6 קטגוריות · 3-5 דקות
        </motion.div>
      </div>
    </main>
  );
}
