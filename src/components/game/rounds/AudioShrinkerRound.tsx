'use client';

// Audio Shrinker (Heardle עברי) — play a tiny clip, guess the song from 4
// options. Wrong guess → extends the next clip's length. Player has up to
// `clipStepsSec.length` guesses (default 4: 1s, 2s, 4s, 8s).
//
// Important: this format does NOT use the background `useSongPreview` from
// /play — it owns its own <audio> so it has precise control over start/stop
// and so the BG audio doesn't keep playing during the question.

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { AudioShrinkerRound as AudioShrinkerRoundType } from '@/types/round';
import type { Question } from '@/types/question';

interface AudioShrinkerRoundProps {
  round: AudioShrinkerRoundType;
  streak: number;
  onAnswer: (result: { correct: boolean; scoreDelta: number }) => void;
}

// Score per clip step at which the player guessed correctly. Length must
// match the clipStepsSec length in buildRound.ts. (Defensive: indexed by step.)
const SCORE_BY_STEP = [50, 30, 15, 5];

export function AudioShrinkerRound({
  round,
  streak,
  onAnswer,
}: AudioShrinkerRoundProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [step, setStep] = useState(0); // index into clipStepsSec
  const [tried, setTried] = useState<Set<number>>(new Set());
  const [picked, setPicked] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const settled = picked !== null; // game over for this round

  const previewUrl = round.question.itunesPreviewUrl ?? '';
  const currentClipSec =
    round.clipStepsSec[Math.min(step, round.clipStepsSec.length - 1)];

  // Create/replace audio element when the round changes.
  useEffect(() => {
    if (!previewUrl) return;
    const audio = new Audio(previewUrl);
    audio.preload = 'auto';
    audio.volume = 0.5;
    audioRef.current = audio;
    return () => {
      audio.pause();
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      audioRef.current = null;
    };
  }, [previewUrl]);

  const stopPlayback = useCallback(() => {
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const playClip = useCallback(
    (durationSec: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      // Always start from 0 — keeps the "first N seconds" semantics consistent.
      audio.currentTime = 0;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          /* autoplay blocked — user already tapped though, so should be fine */
        });
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = setTimeout(() => {
        const a = audioRef.current;
        if (a) {
          a.pause();
          a.currentTime = 0;
        }
        setIsPlaying(false);
      }, durationSec * 1000);
    },
    []
  );

  const handlePick = useCallback(
    (idx: number) => {
      if (settled || tried.has(idx)) return;
      stopPlayback();
      if (idx === round.correctIndex) {
        // Won: score depends on which step the player won at.
        const base = SCORE_BY_STEP[step] ?? 0;
        const scoreDelta = base + streak * 2;
        setPicked(idx);
        onAnswer({ correct: true, scoreDelta });
        return;
      }
      // Wrong guess: extend clip length for the next try.
      const nextTried = new Set(tried);
      nextTried.add(idx);
      setTried(nextTried);
      const lastStep = round.clipStepsSec.length - 1;
      if (step >= lastStep) {
        // Out of tries: settled as a loss, reveal correct.
        setPicked(idx);
        onAnswer({ correct: false, scoreDelta: 0 });
        return;
      }
      setStep(step + 1);
    },
    [
      settled,
      tried,
      stopPlayback,
      round.correctIndex,
      round.clipStepsSec.length,
      step,
      streak,
      onAnswer,
    ]
  );

  function optionState(idx: number): {
    classes: string;
    icon: string | null;
  } {
    if (!settled) {
      if (tried.has(idx)) {
        return {
          classes:
            'bg-wrong/10 border-wrong/40 text-wrong/80 cursor-not-allowed',
          icon: '✗',
        };
      }
      return {
        classes:
          'bg-surface-secondary hover:bg-surface-tertiary border-surface-tertiary cursor-pointer',
        icon: null,
      };
    }
    // Settled — show truth.
    if (idx === round.correctIndex) {
      return {
        classes: 'bg-correct/20 border-correct text-correct',
        icon: '✓',
      };
    }
    if (idx === picked) {
      return { classes: 'bg-wrong/20 border-wrong text-wrong', icon: '✗' };
    }
    return {
      classes: 'bg-surface-secondary border-surface-tertiary opacity-40',
      icon: null,
    };
  }

  return (
    <div className="space-y-6">
      <div className="text-center px-2">
        <div className="text-xs text-text-muted uppercase tracking-wider mb-1">
          זהה את השיר
        </div>
        <div className="text-sm md:text-base text-text-secondary">
          {settled
            ? 'הנה התשובה'
            : `קליפ של ${currentClipSec} שני${currentClipSec === 1 ? 'ה' : 'ות'} · ${
                round.clipStepsSec.length - step
              } ניסיון${round.clipStepsSec.length - step === 1 ? '' : 'ות'} שנשארו`}
        </div>
      </div>

      <div className="flex justify-center">
        <motion.button
          whileTap={!settled ? { scale: 0.96 } : undefined}
          onClick={() => !settled && playClip(currentClipSec)}
          disabled={settled || isPlaying}
          aria-label={`נגן ${currentClipSec} שניות`}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl border-2 transition-all ${
            settled
              ? 'bg-surface-secondary border-surface-tertiary opacity-50 cursor-not-allowed'
              : isPlaying
                ? 'bg-accent/30 border-accent text-accent'
                : 'bg-accent/15 border-accent text-accent hover:bg-accent/25 cursor-pointer'
          }`}
        >
          {isPlaying ? '⏸' : '▶'}
        </motion.button>
      </div>

      <div className="space-y-2.5 px-2">
        {round.options.map((opt: Question, idx: number) => {
          const { classes, icon } = optionState(idx);
          return (
            <motion.button
              key={`${round.question.id}-opt-${opt.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 * idx }}
              whileTap={!settled && !tried.has(idx) ? { scale: 0.985 } : undefined}
              onClick={() => handlePick(idx)}
              disabled={settled || tried.has(idx)}
              className={`w-full text-right p-3.5 rounded-xl border-2 transition-all ${classes}`}
            >
              <div className="flex items-center gap-3" dir="ltr">
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-surface-tertiary/50">
                  {icon ?? String.fromCharCode(65 + idx)}
                </span>
                <div className="flex-1 text-right">
                  <div className="font-bold text-sm md:text-base" dir="ltr">
                    &quot;{opt.songTitle}&quot;
                  </div>
                  <div
                    className="text-xs text-text-secondary opacity-80"
                    dir="ltr"
                  >
                    {opt.artist}
                    {opt.year ? ` · ${opt.year}` : ''}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
