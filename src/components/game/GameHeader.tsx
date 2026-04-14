'use client';

import { cn } from '@/lib/utils';
import { useSettingsStore } from '@/store/settingsStore';

interface GameHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  score: number;
  streak: number;
  timeRemaining: number;
  timeLimit: number;
  isLearnMode?: boolean;
  isReadingPhase?: boolean;
  onQuit?: () => void;
}

export function GameHeader({
  currentIndex,
  totalQuestions,
  score,
  streak,
  timeRemaining,
  timeLimit,
  isLearnMode = false,
  isReadingPhase = false,
  onQuit,
}: GameHeaderProps) {
  const { soundEnabled, toggleSound } = useSettingsStore();
  const progress = timeRemaining / timeLimit;
  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference * (1 - progress);

  const timerColor =
    progress > 0.5 ? 'text-correct' : progress > 0.25 ? 'text-gold' : 'text-wrong';

  const strokeColor =
    progress > 0.5 ? '#22c55e' : progress > 0.25 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex items-center justify-between px-4 py-3">
      {/* Quit button + Progress */}
      <div className="flex items-center gap-2">
        {onQuit && (
          <button
            onClick={onQuit}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-tertiary text-text-muted hover:text-text-primary hover:bg-surface-secondary transition-colors text-sm"
            aria-label="חזרה לדף הבית"
          >
            ✕
          </button>
        )}
        <button
          onClick={toggleSound}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-tertiary text-text-muted hover:text-text-primary hover:bg-surface-secondary transition-colors text-sm"
          aria-label={soundEnabled ? 'השתק צלילים' : 'הפעל צלילים'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        <div className="flex items-center gap-1.5">
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              i < currentIndex
                ? 'bg-accent'
                : i === currentIndex
                ? 'bg-accent-light w-3 h-3'
                : 'bg-surface-tertiary'
            )}
          />
        ))}
        </div>
      </div>

      {/* Timer or Learn Mode indicator */}
      {isLearnMode ? (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-tertiary">
          <span className="text-sm">📚</span>
          <span className="text-xs font-medium text-text-secondary">מצב למידה</span>
        </div>
      ) : isReadingPhase ? (
        <div className="relative flex items-center justify-center">
          <svg width="48" height="48" className="-rotate-90 animate-spin-slow">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="var(--color-surface-tertiary)"
              strokeWidth="3"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * 0.75}
              className="transition-all duration-100"
            />
          </svg>
          <span className="absolute text-sm">🎵</span>
        </div>
      ) : (
        <div className="relative flex items-center justify-center">
          <svg width="48" height="48" className="-rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="var(--color-surface-tertiary)"
              strokeWidth="3"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-100"
            />
          </svg>
          <span className={cn('absolute text-xs font-bold', timerColor)}>
            {Math.ceil(timeRemaining)}
          </span>
        </div>
      )}

      {/* Score & Streak */}
      <div className="flex items-center gap-3">
        {streak >= 2 && (
          <span className="text-sm font-bold text-gold animate-pulse">
            {streak}x 🔥
          </span>
        )}
        <div className="text-left min-w-[50px]">
          <div className="text-xs text-text-muted">ניקוד</div>
          <div className="text-sm font-bold text-accent-light">{score}</div>
        </div>
      </div>
    </div>
  );
}
