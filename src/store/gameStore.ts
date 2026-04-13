'use client';

import { create } from 'zustand';
import type { GameState, GameActions, GameMode } from '@/types/game';
import type { Category, Difficulty } from '@/types/question';
import { questions } from '@/data/questions';
import { calculateScore, selectQuestions, selectDailyQuestions } from '@/lib/gameLogic';

type GameStore = GameState & GameActions;

const initialState: GameState = {
  phase: 'idle',
  questions: [],
  currentIndex: 0,
  selectedAnswer: null,
  isCorrect: null,
  timeRemaining: 0,
  score: 0,
  streak: 0,
  maxStreak: 0,
  answers: [],
  selectedCategory: null,
  selectedDifficulty: null,
  mode: 'classic',
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startGame: (category?: Category, mode?: GameMode, difficulty?: Difficulty) => {
    const gameMode = mode ?? 'classic';
    const selected = gameMode === 'daily'
      ? selectDailyQuestions(questions, 10)
      : selectQuestions(questions, 10, category ?? null, difficulty ?? null);
    set({
      ...initialState,
      phase: 'playing',
      questions: selected,
      selectedCategory: category ?? null,
      selectedDifficulty: difficulty ?? null,
      mode: gameMode,
    });
  },

  selectAnswer: (answerId: string, timeRemaining: number) => {
    const state = get();
    if (state.phase !== 'playing') return;

    const question = state.questions[state.currentIndex];
    const isCorrect = answerId === question.correctAnswer;
    const newStreak = isCorrect ? state.streak + 1 : 0;
    const pointsEarned = isCorrect
      ? calculateScore(question.difficulty, timeRemaining, newStreak)
      : 0;

    set({
      phase: 'answered',
      selectedAnswer: answerId,
      isCorrect,
      timeRemaining,
      score: state.score + pointsEarned,
      streak: newStreak,
      maxStreak: Math.max(state.maxStreak, newStreak),
      answers: [
        ...state.answers,
        {
          questionId: question.id,
          selectedAnswer: answerId,
          correctAnswer: question.correctAnswer,
          isCorrect,
          timeRemaining,
          pointsEarned,
        },
      ],
    });
  },

  proceedToExplanation: () => {
    set({ phase: 'explaining' });
  },

  nextQuestion: () => {
    const state = get();
    const nextIndex = state.currentIndex + 1;

    if (nextIndex >= state.questions.length) {
      set({ phase: 'finished' });
    } else {
      set({
        phase: 'playing',
        currentIndex: nextIndex,
        selectedAnswer: null,
        isCorrect: null,
        timeRemaining: 0,
      });
    }
  },

  resetGame: () => {
    set(initialState);
  },
}));
