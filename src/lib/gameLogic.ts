import type { Difficulty, Question, Category } from '@/types/question';

// Simple seeded random for daily challenge
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

export function selectDailyQuestions(pool: Question[], count: number = 10): Question[] {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const rng = seededRandom(seed);

  // Fisher-Yates with seeded random
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

const BASE_POINTS: Record<Difficulty, number> = {
  easy: 10,
  medium: 30,
  hard: 50,
};

export const TIME_LIMITS: Record<Difficulty, number> = {
  easy: 15,
  medium: 12,
  hard: 10,
};

export function calculateScore(
  difficulty: Difficulty,
  timeRemaining: number,
  streak: number
): number {
  const base = BASE_POINTS[difficulty];
  const timeLimit = TIME_LIMITS[difficulty];
  const timeFraction = Math.max(0, timeRemaining) / timeLimit;
  const timeBonus = Math.round(base * 0.5 * timeFraction);
  const streakMultiplier = Math.min(1 + (streak - 1) * 0.25, 2.5);
  return Math.round((base + timeBonus) * (streak > 0 ? streakMultiplier : 1));
}

export function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function selectQuestions(
  pool: Question[],
  count: number = 10,
  category?: Category | null,
  difficulty?: Difficulty | null
): Question[] {
  let filtered = category ? pool.filter(q => q.category === category) : pool;
  if (difficulty) {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }

  if (filtered.length <= count) {
    return shuffle(filtered);
  }

  // If a specific difficulty is selected, just shuffle and pick
  if (difficulty) {
    return shuffle(filtered).slice(0, count);
  }

  const easy = shuffle(filtered.filter(q => q.difficulty === 'easy'));
  const medium = shuffle(filtered.filter(q => q.difficulty === 'medium'));
  const hard = shuffle(filtered.filter(q => q.difficulty === 'hard'));

  // Target distribution: 30% easy, 50% medium, 20% hard
  const targetEasy = Math.round(count * 0.3);
  const targetHard = Math.round(count * 0.2);
  const targetMedium = count - targetEasy - targetHard;

  const selected = [
    ...easy.slice(0, targetEasy),
    ...medium.slice(0, targetMedium),
    ...hard.slice(0, targetHard),
  ];

  // Fill remaining if a difficulty tier was short
  if (selected.length < count) {
    const selectedIds = new Set(selected.map(q => q.id));
    const remaining = shuffle(filtered.filter(q => !selectedIds.has(q.id)));
    selected.push(...remaining.slice(0, count - selected.length));
  }

  return shuffle(selected).slice(0, count);
}
