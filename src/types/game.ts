import type { Category, Difficulty, Question } from './question';

export type GamePhase = 'idle' | 'playing' | 'answered' | 'explaining' | 'finished';

export interface AnswerRecord {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeRemaining: number;
  pointsEarned: number;
}

export type GameMode = 'classic' | 'learn' | 'daily';

export interface GameState {
  phase: GamePhase;
  questions: Question[];
  currentIndex: number;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  timeRemaining: number;
  score: number;
  streak: number;
  maxStreak: number;
  answers: AnswerRecord[];
  selectedCategory: Category | null;
  selectedDifficulty: Difficulty | null;
  mode: GameMode;
}

export interface GameActions {
  startGame: (category?: Category, mode?: GameMode, difficulty?: Difficulty) => Promise<void>;
  selectAnswer: (answerId: string, timeRemaining: number) => void;
  proceedToExplanation: () => void;
  nextQuestion: () => void;
  resetGame: () => void;
}
