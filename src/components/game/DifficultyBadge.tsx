'use client';

import type { Difficulty } from '@/types/question';
import { cn } from '@/lib/utils';

const config: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: 'קל', className: 'bg-correct/20 text-correct' },
  medium: { label: 'בינוני', className: 'bg-gold/20 text-gold' },
  hard: { label: 'קשה', className: 'bg-wrong/20 text-wrong' },
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { label, className } = config[difficulty];
  return (
    <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium', className)}>
      {label}
    </span>
  );
}
