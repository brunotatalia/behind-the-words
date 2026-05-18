'use client';

// Shared header for formats that REVEAL the song (T/F, 2T1L, YearLadder).
// AudioShrinker hides the song until after the answer, so it does NOT use this.
//
// Visual choices:
//  - Title + artist are LTR (English in mostly-Hebrew UI), in a compact chip
//    at the top of the question area. Not the visual hero — the question is.
//  - "Now playing" equalizer bars appear only when audio is actively playing,
//    so the indicator never lies during the brief "no audio" gap.

import { motion } from 'framer-motion';

interface SongHeaderProps {
  songTitle: string;
  artist: string;
  year?: number;
  isPlaying?: boolean;
}

export function SongHeader({ songTitle, artist, year, isPlaying }: SongHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-center gap-3 text-center"
    >
      <div className="flex flex-col items-center gap-0.5">
        <h2
          className="text-base md:text-lg font-bold text-text-primary leading-tight"
          dir="ltr"
        >
          &quot;{songTitle}&quot;
        </h2>
        <div className="text-text-secondary text-sm">
          <span className="font-medium" dir="ltr">
            {artist}
          </span>
          {year && <span className="text-text-muted"> · {year}</span>}
        </div>
      </div>

      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-0.5 px-2 py-1 rounded-full bg-accent/15 text-accent"
          aria-label="מתנגן ברקע"
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
        </motion.div>
      )}
    </motion.div>
  );
}
