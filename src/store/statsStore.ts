'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Category } from '@/types/question';
import type { GameMode } from '@/types/game';

interface GameRecord {
  date: string;
  score: number;
  correct: number;
  total: number;
  maxStreak: number;
  category: Category | null;
  mode: GameMode;
}

interface StatsState {
  gamesPlayed: number;
  totalCorrect: number;
  totalQuestions: number;
  bestScore: number;
  bestStreak: number;
  recentGames: GameRecord[];
  favoriteQuestions: string[];
  unlockedAchievements: string[];
  recentQuestionIds: string[];
  // Actions
  recordGame: (record: Omit<GameRecord, 'date'>) => void;
  trackQuestions: (questionIds: string[]) => void;
  toggleFavorite: (questionId: string) => void;
  addAchievements: (ids: string[]) => void;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      gamesPlayed: 0,
      totalCorrect: 0,
      totalQuestions: 0,
      bestScore: 0,
      bestStreak: 0,
      recentGames: [],
      favoriteQuestions: [],
      unlockedAchievements: [],
      recentQuestionIds: [],

      recordGame: (record) => {
        const state = get();
        const gameRecord: GameRecord = {
          ...record,
          date: new Date().toISOString(),
        };
        set({
          gamesPlayed: state.gamesPlayed + 1,
          totalCorrect: state.totalCorrect + record.correct,
          totalQuestions: state.totalQuestions + record.total,
          bestScore: Math.max(state.bestScore, record.score),
          bestStreak: Math.max(state.bestStreak, record.maxStreak),
          recentGames: [gameRecord, ...state.recentGames].slice(0, 20),
        });
      },

      trackQuestions: (questionIds) => {
        const state = get();
        // Keep a rolling window of last 150 question IDs to avoid repeats
        // but not exhaust the pool (303 total questions)
        const updated = [...questionIds, ...state.recentQuestionIds].slice(0, 150);
        set({ recentQuestionIds: updated });
      },

      toggleFavorite: (questionId) => {
        const state = get();
        const exists = state.favoriteQuestions.includes(questionId);
        set({
          favoriteQuestions: exists
            ? state.favoriteQuestions.filter((id) => id !== questionId)
            : [...state.favoriteQuestions, questionId],
        });
      },

      addAchievements: (ids) => {
        const state = get();
        const newSet = new Set([...state.unlockedAchievements, ...ids]);
        set({ unlockedAchievements: [...newSet] });
      },
    }),
    { name: 'btw-stats' }
  )
);
