'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '@/store/gameStore';
import { categories } from '@/data/categories';
import { QUESTION_COUNT, countQuestions } from '@/data/questions-meta';
import type { Category, Difficulty } from '@/types/question';
import type { GameMode } from '@/types/game';
import { useStatsStore } from '@/store/statsStore';
import { useSettingsStore } from '@/store/settingsStore';

function Equalizer() {
  const bars = [0, 1, 2, 3, 4, 5, 6];
  return (
    <div
      aria-hidden="true"
      className="flex items-end justify-center gap-1 h-10 mx-auto"
    >
      {bars.map((i) => (
        <span
          key={i}
          className="w-1.5 h-full origin-bottom rounded-full bg-gradient-to-t from-accent/60 to-accent-light"
          style={{
            animation: `eq-bar ${1.1 + ((i * 31) % 7) * 0.12}s ease-in-out infinite`,
            animationDelay: `${((i * 17) % 9) * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

const CTA_FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary';

export default function HomePage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const startGame = useGameStore((s) => s.startGame);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [mode, setMode] = useState<GameMode>('classic');
  const [showOptions, setShowOptions] = useState(false);
  const stats = useStatsStore(
    useShallow((s) => ({
      gamesPlayed: s.gamesPlayed,
      bestScore: s.bestScore,
      bestStreak: s.bestStreak,
      totalCorrect: s.totalCorrect,
      totalQuestions: s.totalQuestions,
    }))
  );
  const { gamesPlayed, bestScore, bestStreak, totalCorrect, totalQuestions } = stats;
  const likedSongsCount = useStatsStore((s) => s.likedSongs.length);
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const toggleSound = useSettingsStore((s) => s.toggleSound);

  const handleStart = async () => {
    // True/False mode loads its own questions; gameStore startGame kept for stats compatibility
    await startGame(selectedCategory ?? undefined, mode, selectedDifficulty ?? undefined);
    router.push('/play');
  };

  const handleDaily = async () => {
    await startGame(undefined, 'daily');
    router.push('/play');
  };

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const dailyPlayed = useStatsStore((s) =>
    s.recentGames.some((g) => g.mode === 'daily' && g.date.startsWith(today))
  );

  const hasCustomization =
    selectedCategory !== null || selectedDifficulty !== null || mode !== 'classic';

  const categoryCount = useMemo(
    () => countQuestions(selectedCategory, selectedDifficulty),
    [selectedCategory, selectedDifficulty]
  );

  return (
    <main className="flex-1 flex flex-col items-center px-6 py-8 max-w-lg mx-auto w-full">
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative z-10 text-center w-full space-y-5">
        {/* Hero */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <Equalizer />
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            מאחורי{' '}
            <span className="bg-gradient-to-l from-accent to-accent-light bg-clip-text text-transparent">
              המילים
            </span>
          </motion.h1>
          <p className="text-text-primary/90 text-lg leading-relaxed">
            ?מה באמת מסתתר מאחורי השירים שאתם שומעים
          </p>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="space-y-1.5"
        >
          <button
            onClick={handleStart}
            disabled={categoryCount < 4}
            className={`group relative w-full px-12 py-5 rounded-2xl bg-gradient-to-br from-accent to-accent-light text-white font-bold text-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed ${CTA_FOCUS_RING}`}
          >
            <span className="relative z-10">!בואו נתחיל</span>
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent to-accent-light opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
            />
          </button>
          {hasCustomization && (
            <p className="text-xs text-text-muted">
              {categoryCount} שאלות · התאמה אישית
            </p>
          )}
        </motion.div>

        {/* Customize toggle */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => setShowOptions(!showOptions)}
            aria-expanded={showOptions}
            aria-controls="home-options-panel"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            <motion.span
              animate={{ rotate: showOptions ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              ▾
            </motion.span>
            {showOptions ? 'הסתר אפשרויות' : 'התאמה אישית'}
            {hasCustomization && (
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-accent" />
            )}
          </button>
        </motion.div>

        {/* Expandable Options */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              id="home-options-panel"
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
                    <span aria-hidden="true">🎲</span> כל הקטגוריות
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
                          <span aria-hidden="true">{cat.icon}</span> {cat.label}
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
                        <span aria-hidden="true">⏱️</span> קלאסי
                      </button>
                      <button
                        onClick={() => setMode('learn')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          mode === 'learn'
                            ? 'bg-accent text-white shadow-md'
                            : 'text-text-muted hover:text-text-secondary'
                        }`}
                      >
                        <span aria-hidden="true">📚</span> למידה
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-text-muted text-xs font-medium">רמת קושי</h3>
                  <div className="flex justify-center">
                    <div className="inline-flex rounded-xl bg-surface-secondary p-1 gap-1">
                      {([null, 'easy', 'medium', 'hard'] as (Difficulty | null)[]).map((diff) => {
                        const labels: Record<string, { icon: string; text: string }> = {
                          easy: { icon: '🟢', text: 'קל' },
                          medium: { icon: '🟡', text: 'בינוני' },
                          hard: { icon: '🔴', text: 'קשה' },
                        };
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
                            <span aria-hidden="true">{diff ? labels[diff].icon : '🎯'}</span>{' '}
                            {diff ? labels[diff].text : 'מיקס'}
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
                    aria-pressed={soundEnabled}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-secondary text-text-muted hover:text-text-secondary text-xs transition-colors"
                  >
                    <span aria-hidden="true">{soundEnabled ? '🔊' : '🔇'}</span>{' '}
                    {soundEnabled ? 'צלילים מופעלים' : 'צלילים כבויים'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Secondary actions chip row */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex items-stretch gap-2"
        >
          <button
            onClick={handleDaily}
            disabled={dailyPlayed}
            aria-label={
              dailyPlayed
                ? 'האתגר היומי הושלם היום'
                : 'אתגר יומי - אותן 10 שאלות לכל השחקנים היום'
            }
            className={`relative flex-1 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all duration-200 ${
              dailyPlayed
                ? 'border-surface-tertiary bg-surface-secondary text-text-muted opacity-70 cursor-not-allowed'
                : 'border-gold/30 bg-gold/5 hover:bg-gold/10 hover:border-gold/50 text-gold'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <span aria-hidden="true">{dailyPlayed ? '✅' : '📅'}</span>
              אתגר יומי
            </span>
            {!dailyPlayed && (
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-gold animate-pulse"
              />
            )}
          </button>
          <button
            onClick={() => router.push('/explore')}
            aria-label="גלה שירים — עובדות מפתיעות עם מוזיקה ברקע"
            className="flex-1 px-3 py-2.5 rounded-xl border border-accent/20 bg-accent/5 hover:bg-accent/10 hover:border-accent/40 text-xs font-medium text-accent-light transition-all duration-200"
          >
            <span className="flex items-center justify-center gap-1.5">
              <span aria-hidden="true">🎧</span>
              גלה שירים
            </span>
          </button>
          {likedSongsCount > 0 && (
            <button
              onClick={() => router.push('/liked')}
              aria-label={`${likedSongsCount} שירים שאהבתי`}
              className="flex-1 px-3 py-2.5 rounded-xl border border-surface-tertiary bg-surface-secondary hover:bg-surface-card text-xs font-medium text-text-secondary transition-all duration-200"
            >
              <span className="flex items-center justify-center gap-1.5">
                <span aria-hidden="true">💚</span>
                אהבתי · {likedSongsCount}
              </span>
            </button>
          )}
        </motion.div>

        {/* Personal Stats */}
        {gamesPlayed > 0 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="space-y-2"
          >
            <h3 className="text-text-muted text-xs font-medium">הסטטיסטיקות שלך</h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-surface-secondary rounded-xl p-2.5 text-center">
                <div className="text-lg font-bold text-accent-light">{gamesPlayed}</div>
                <div className="text-[11px] text-text-muted">משחקים</div>
              </div>
              <div className="bg-surface-secondary rounded-xl p-2.5 text-center">
                <div className="text-lg font-bold text-correct">{bestScore}</div>
                <div className="text-[11px] text-text-muted">שיא ניקוד</div>
              </div>
              <div className="bg-surface-secondary rounded-xl p-2.5 text-center">
                <div className="text-lg font-bold text-gold">{bestStreak}x</div>
                <div className="text-[11px] text-text-muted">שיא רצף</div>
              </div>
              <div className="bg-surface-secondary rounded-xl p-2.5 text-center">
                <div className="text-lg font-bold text-accent-light">
                  {totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0}%
                </div>
                <div className="text-[11px] text-text-muted">דיוק</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* How it works — first time only */}
        {gamesPlayed === 0 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3 pt-2"
          >
            <h3 className="text-text-muted text-xs font-medium">?איך זה עובד</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1.5">
                <div className="text-2xl" aria-hidden="true">❓</div>
                <p className="text-xs text-text-muted leading-snug">קראו את השאלה על שיר מפורסם</p>
              </div>
              <div className="space-y-1.5">
                <div className="text-2xl" aria-hidden="true">🤔</div>
                <p className="text-xs text-text-muted leading-snug">בחרו תשובה מתוך 4 אפשרויות</p>
              </div>
              <div className="space-y-1.5">
                <div className="text-2xl" aria-hidden="true">💡</div>
                <p className="text-xs text-text-muted leading-snug">גלו את הסיפור האמיתי מאחורי השיר</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer info */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-text-muted text-xs pt-2"
        >
          <span aria-hidden="true">🎯</span> {QUESTION_COUNT} שאלות · 6 קטגוריות · 3-5 דקות
        </motion.div>
      </div>
    </main>
  );
}
