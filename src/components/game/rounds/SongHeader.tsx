'use client';

// Shared header for formats that REVEAL the song (T/F, 2T1L, YearLadder).
// AudioShrinker hides the song until after the answer, so it does NOT use this.
//
// Editorial choices:
//  - The vinyl spinner is the *only* now-playing indicator. It rotates while
//    audio is live, rests when paused. Replaces the old eq bars.
//  - Title + artist sit in LTR text on the right of the spinner (RTL container)
//    in a compact magazine-byline format.

import { motion } from 'framer-motion';
import { VinylSpinner } from './VinylSpinner';

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
      className="flex items-center justify-center gap-3"
    >
      <VinylSpinner isPlaying={isPlaying} size={36} />
      <div className="flex flex-col items-start gap-0">
        <h2
          className="text-sm md:text-base font-bold text-text-primary leading-tight"
          dir="ltr"
        >
          &quot;{songTitle}&quot;
        </h2>
        <div className="text-text-secondary text-xs leading-tight">
          <span className="font-medium" dir="ltr">
            {artist}
          </span>
          {year && <span className="text-text-muted"> · {year}</span>}
        </div>
      </div>
    </motion.div>
  );
}
