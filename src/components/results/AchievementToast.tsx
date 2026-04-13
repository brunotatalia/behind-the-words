'use client';

import { motion } from 'framer-motion';
import type { Achievement } from '@/lib/achievements';

interface AchievementToastProps {
  achievements: Achievement[];
}

export function AchievementToast({ achievements }: AchievementToastProps) {
  if (achievements.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gold text-center">!הישגים חדשים</h4>
      {achievements.map((a, i) => (
        <motion.div
          key={a.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.15 }}
          className="flex items-center gap-3 p-3 rounded-xl bg-gold/10 border border-gold/20"
        >
          <span className="text-2xl">{a.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm text-gold">{a.title}</div>
            <div className="text-xs text-text-secondary">{a.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
