export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  check: (stats: AchievementStats) => boolean;
}

export interface AchievementStats {
  gamesPlayed: number;
  totalCorrect: number;
  totalQuestions: number;
  bestScore: number;
  bestStreak: number;
  currentCorrect: number;
  currentTotal: number;
  currentStreak: number;
  currentScore: number;
}

export const achievements: Achievement[] = [
  {
    id: 'first-game',
    icon: '🎮',
    title: 'צעד ראשון',
    description: 'השלמת את המשחק הראשון',
    check: (s) => s.gamesPlayed >= 1,
  },
  {
    id: 'five-games',
    icon: '🎯',
    title: 'שחקן מנוסה',
    description: 'שיחקת 5 משחקים',
    check: (s) => s.gamesPlayed >= 5,
  },
  {
    id: 'ten-games',
    icon: '🏆',
    title: 'מכור למוזיקה',
    description: 'שיחקת 10 משחקים',
    check: (s) => s.gamesPlayed >= 10,
  },
  {
    id: 'perfect-game',
    icon: '💯',
    title: 'פרפקט!',
    description: '10 מתוך 10 במשחק אחד',
    check: (s) => s.currentCorrect === s.currentTotal && s.currentTotal === 10,
  },
  {
    id: 'streak-5',
    icon: '🔥',
    title: 'על אש',
    description: 'רצף של 5 תשובות נכונות',
    check: (s) => s.bestStreak >= 5,
  },
  {
    id: 'streak-10',
    icon: '🌋',
    title: 'בלתי ניתן לעצירה',
    description: 'רצף של 10 תשובות נכונות',
    check: (s) => s.bestStreak >= 10,
  },
  {
    id: 'score-200',
    icon: '⭐',
    title: 'כוכב עולה',
    description: 'הגעת ל-200 נקודות במשחק אחד',
    check: (s) => s.currentScore >= 200,
  },
  {
    id: 'score-500',
    icon: '🌟',
    title: 'סופרסטאר',
    description: 'הגעת ל-500 נקודות במשחק אחד',
    check: (s) => s.currentScore >= 500,
  },
  {
    id: 'accuracy-80',
    icon: '🎓',
    title: 'מלומד',
    description: 'דיוק של 80% לאורך 50+ שאלות',
    check: (s) => s.totalQuestions >= 50 && (s.totalCorrect / s.totalQuestions) >= 0.8,
  },
  {
    id: 'hundred-questions',
    icon: '📚',
    title: 'אנציקלופדיה מוזיקלית',
    description: 'ענית על 100 שאלות',
    check: (s) => s.totalQuestions >= 100,
  },
];

export function getUnlockedAchievements(
  stats: AchievementStats,
  previouslyUnlocked: string[]
): { all: Achievement[]; newlyUnlocked: Achievement[] } {
  const all = achievements.filter((a) => a.check(stats));
  const newlyUnlocked = all.filter((a) => !previouslyUnlocked.includes(a.id));
  return { all, newlyUnlocked };
}
