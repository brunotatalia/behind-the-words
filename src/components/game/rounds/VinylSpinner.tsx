'use client';

// Vinyl record spinner — replaces the equalizer bars as the "audio is playing"
// indicator. More distinctively musical, and ties into the magazine/vinyl
// editorial identity of the redesigned game.
//
// The spinner spins at 33⅓ rpm (a full rotation every 1.8s) while playing,
// and rests when paused. Pure CSS animation — cheap, smooth, no JS frame loop.

import { motion } from 'framer-motion';

interface VinylSpinnerProps {
  isPlaying?: boolean;
  size?: number; // px
}

export function VinylSpinner({ isPlaying = false, size = 32 }: VinylSpinnerProps) {
  return (
    <motion.div
      aria-label={isPlaying ? 'מתנגן ברקע' : 'אודיו מושהה'}
      animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
      transition={
        isPlaying
          ? { repeat: Infinity, duration: 1.8, ease: 'linear' }
          : { duration: 0.3, ease: 'easeOut' }
      }
      style={{ width: size, height: size }}
      className="relative shrink-0"
    >
      {/* Outer vinyl */}
      <div
        className={`absolute inset-0 rounded-full ${
          isPlaying ? 'bg-text-primary/90' : 'bg-text-muted/70'
        } shadow-inner`}
      />
      {/* Grooves */}
      <div className="absolute inset-[14%] rounded-full border border-text-muted/30" />
      <div className="absolute inset-[22%] rounded-full border border-text-muted/25" />
      <div className="absolute inset-[30%] rounded-full border border-text-muted/20" />
      {/* Label */}
      <div
        className={`absolute inset-[36%] rounded-full ${
          isPlaying ? 'bg-accent' : 'bg-surface-secondary'
        } transition-colors`}
      />
      {/* Center dot */}
      <div
        className="absolute rounded-full bg-surface"
        style={{
          width: '14%',
          height: '14%',
          top: '43%',
          left: '43%',
        }}
      />
    </motion.div>
  );
}
