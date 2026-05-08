'use client';

import { motion } from 'framer-motion';

interface StatementCardProps {
  statement: string;
  songTitle: string;
  artist: string;
  year?: number;
  isPlaying?: boolean;
}

export function StatementCard({ statement, songTitle, artist, year, isPlaying }: StatementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-5"
    >
      {/* Song info — what the trivia is about */}
      <div className="space-y-1.5">
        <div className="text-3xl">🎵</div>
        <h2 className="text-xl md:text-2xl font-bold text-text-primary leading-tight" dir="ltr">
          &quot;{songTitle}&quot;
        </h2>
        <div className="text-text-secondary text-base">
          <span className="font-medium" dir="ltr">{artist}</span>
          {year && <span className="text-text-muted"> · {year}</span>}
        </div>
      </div>

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
