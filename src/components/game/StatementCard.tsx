'use client';

import { motion } from 'framer-motion';

interface StatementCardProps {
  statement: string;
  isPlaying?: boolean;
  isMystery?: boolean;
}

export function StatementCard({ statement, isPlaying, isMystery = true }: StatementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-6"
    >
      {/* Mystery placeholder where song title used to be */}
      {isMystery && (
        <div className="space-y-1">
          <div className="text-5xl">🎵</div>
          <div className="text-text-muted text-xs uppercase tracking-wider">
            השיר חבוי
          </div>
        </div>
      )}

      {/* Now playing indicator */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-medium"
        >
          <div className="flex items-end gap-0.5 h-3">
            <motion.div
              className="w-0.5 bg-accent rounded-full"
              animate={{ height: ['4px', '12px', '6px', '10px', '4px'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="w-0.5 bg-accent rounded-full"
              animate={{ height: ['10px', '4px', '12px', '6px', '10px'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            />
            <motion.div
              className="w-0.5 bg-accent rounded-full"
              animate={{ height: ['6px', '10px', '4px', '12px', '6px'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
          </div>
          מתנגן ברקע
        </motion.div>
      )}

      {/* The statement */}
      <div className="px-4">
        <div className="text-xs text-text-muted uppercase tracking-wider mb-2">
          האם הקביעה הבאה נכונה?
        </div>
        <p className="text-lg md:text-xl font-bold leading-relaxed text-text-primary">
          {statement}
        </p>
      </div>
    </motion.div>
  );
}
