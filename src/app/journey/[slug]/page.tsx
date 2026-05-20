'use client';

// Journey runner — guides the player through a curated themed run of secrets.
// Phases:
//   cover       → editorial splash
//   playing     → render the current stop's round, framed by LensHeader
//   answered    → quick feedback + "reveal the story" CTA
//   explaining  → DidYouKnow modal (existing component) for the pull-quote
//   outro       → results card + share
//
// Differences from /play (endless mode):
//   - The format for each stop is HAND-PICKED by the journey curator, not
//     randomized — buildRound() is called with `forceFormat`.
//   - Progress is shown as a dot row (not a "n/m" counter), each dot encoding
//     correct/wrong/current/pending status.
//   - The cover, the LensHeader on each question, and the outro share one
//     editorial visual identity.

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { use as usePromise } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from '@/types/question';
import type { Round } from '@/types/round';
import { findJourney } from '@/data/journeys';
import { buildRound } from '@/game/buildRound';
import { TrueFalseRound } from '@/components/game/rounds/TrueFalseRound';
import { TwoTruthsOneLieRound } from '@/components/game/rounds/TwoTruthsOneLieRound';
import { AudioShrinkerRound } from '@/components/game/rounds/AudioShrinkerRound';
import { YearLadderRound } from '@/components/game/rounds/YearLadderRound';
import { LensHeader } from '@/components/game/rounds/LensHeader';
import { DidYouKnow } from '@/components/game/DidYouKnow';
import { JourneyCover } from '@/components/journey/JourneyCover';
import { JourneyOutro } from '@/components/journey/JourneyOutro';
import { JourneyProgress, type StopStatus } from '@/components/journey/JourneyProgress';
import { useSongPreview, prefetchPreview } from '@/hooks/useSongPreview';
import { useSound } from '@/hooks/useSound';

type Phase = 'loading' | 'cover' | 'playing' | 'answered' | 'explaining' | 'outro';

interface JourneyPageProps {
  params: Promise<{ slug: string }>;
}

export default function JourneyPage({ params }: JourneyPageProps) {
  const router = useRouter();
  const { slug } = usePromise(params);
  const journey = useMemo(() => findJourney(slug), [slug]);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [stopIdx, setStopIdx] = useState(0);
  const [round, setRound] = useState<Round | null>(null);
  const [phase, setPhase] = useState<Phase>('loading');
  const [lastResult, setLastResult] = useState<{ correct: boolean; scoreDelta: number } | null>(
    null
  );
  const [results, setResults] = useState<StopStatus[]>([]); // per-stop status
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const playSound = useSound();

  // Load the full deck so buildRound has distractors for Audio Shrinker.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { questions: all } = await import('@/data/questions');
      if (cancelled) return;
      setQuestions(all);
      if (journey) {
        setResults(new Array(journey.stops.length).fill('pending') as StopStatus[]);
        setPhase('cover');
      } else {
        // bad slug
        setPhase('cover'); // will fall through to the "not found" early-return
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [journey]);

  const currentStop = journey?.stops[stopIdx];
  const currentQuestion = useMemo(() => {
    if (!currentStop) return undefined;
    return questions.find((q) => q.id === currentStop.questionId);
  }, [questions, currentStop]);

  // Build the round whenever the stop changes (and we're in playing phase).
  useEffect(() => {
    if (!currentQuestion || !currentStop) {
      setRound(null);
      return;
    }
    const built = buildRound(currentQuestion, questions, {
      forceFormat: currentStop.format,
    });
    setRound(built);
  }, [currentQuestion, currentStop, questions]);

  // BG audio is suppressed for Audio Shrinker (the round owns its own audio).
  const bgAudioEnabled = round?.format !== 'audio-shrinker' && phase !== 'cover' && phase !== 'outro';

  const { isAudioPlaying } = useSongPreview({
    deezerId: bgAudioEnabled ? currentQuestion?.deezerId : undefined,
    itunesPreviewUrl: bgAudioEnabled ? currentQuestion?.itunesPreviewUrl : undefined,
    play: bgAudioEnabled && (phase === 'playing' || phase === 'answered'),
    volume: phase === 'playing' ? 0.25 : 0.15,
  });

  // Prefetch the next stop's preview so playback starts instantly when we advance.
  useEffect(() => {
    if (!journey) return;
    const nextStop = journey.stops[stopIdx + 1];
    if (!nextStop) return;
    const nextQ = questions.find((q) => q.id === nextStop.questionId);
    prefetchPreview(nextQ?.deezerId, nextQ?.itunesPreviewUrl);
  }, [stopIdx, journey, questions]);

  // ----- Handlers -----

  const handleStart = useCallback(() => {
    setPhase('playing');
  }, []);

  const handleAnswer = useCallback(
    (result: { correct: boolean; scoreDelta: number }) => {
      if (phase !== 'playing') return;
      setLastResult(result);
      setResults((prev) => {
        const next = [...prev];
        next[stopIdx] = result.correct ? 'correct' : 'wrong';
        return next;
      });
      setPhase('answered');
      if (result.correct) {
        playSound(streak >= 2 ? 'streak' : 'correct');
        setScore((s) => s + result.scoreDelta);
        setStreak((s) => {
          const next = s + 1;
          setBestStreak((b) => Math.max(b, next));
          return next;
        });
      } else {
        playSound('wrong');
        setStreak(0);
      }
    },
    [phase, streak, playSound, stopIdx]
  );

  const handleReveal = useCallback(() => {
    setPhase('explaining');
  }, []);

  const handleNext = useCallback(() => {
    if (!journey) return;
    const nextIdx = stopIdx + 1;
    if (nextIdx >= journey.stops.length) {
      setPhase('outro');
      return;
    }
    setStopIdx(nextIdx);
    setLastResult(null);
    setPhase('playing');
  }, [journey, stopIdx]);

  const handleShare = useCallback(() => {
    if (!journey) return;
    // Wordle-style result line: 🟩/🟥 per stop.
    const grid = results
      .map((s) => (s === 'correct' ? '🟩' : s === 'wrong' ? '🟥' : '⬜'))
      .join('');
    const text = [
      `🎵 מאחורי המילים — ${journey.title}`,
      `${grid}  ${results.filter((s) => s === 'correct').length}/${journey.stops.length}`,
      `🔥 רצף שיא: ${bestStreak} · ${score} נקודות`,
      ``,
      `behind-the-words.com/journey/${journey.slug}`,
    ].join('\n');
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [journey, results, bestStreak, score]);

  const handleReplay = useCallback(() => {
    if (!journey) return;
    setStopIdx(0);
    setResults(new Array(journey.stops.length).fill('pending') as StopStatus[]);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setLastResult(null);
    setPhase('cover');
  }, [journey]);

  const handleGoHome = useCallback(() => {
    router.push('/');
  }, [router]);

  // ----- Render branches -----

  if (!journey) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-dvh p-6">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-5xl">🗺️</div>
          <h2 className="text-2xl font-bold">המסע לא נמצא</h2>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent-light transition-colors"
          >
            חזרה לדף הבית
          </button>
        </div>
      </main>
    );
  }

  if (phase === 'loading') {
    return (
      <main className="flex-1 flex items-center justify-center min-h-dvh">
        <div className="text-text-muted">טוען מסע…</div>
      </main>
    );
  }

  if (phase === 'cover') {
    return (
      <main className="flex-1 flex flex-col min-h-dvh">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={handleGoHome}
            className="text-text-muted hover:text-text-primary text-sm"
            aria-label="חזרה לדף הבית"
          >
            ✕
          </button>
          <div className="w-6" />
          <div className="w-6" />
        </div>
        <JourneyCover journey={journey} onStart={handleStart} />
      </main>
    );
  }

  if (phase === 'outro') {
    const correctCount = results.filter((s) => s === 'correct').length;
    return (
      <main className="flex-1 flex flex-col min-h-dvh">
        <JourneyOutro
          journey={journey}
          correctCount={correctCount}
          totalScore={score}
          bestStreak={bestStreak}
          onShare={handleShare}
          onReplay={handleReplay}
          onHome={handleGoHome}
        />
      </main>
    );
  }

  // playing / answered / explaining
  if (!round || !currentQuestion) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-dvh">
        <div className="text-text-muted">מכין את הסוד הבא…</div>
      </main>
    );
  }

  // Compose the visual progress array: dots before stopIdx keep their result;
  // dot at stopIdx is "current"; dots after are pending.
  const visualStatuses: StopStatus[] = results.map((s, i) => {
    if (i < stopIdx) return s;
    if (i === stopIdx) return phase === 'answered' || phase === 'explaining' ? s : 'current';
    return 'pending';
  });

  return (
    <main className="flex-1 flex flex-col min-h-dvh">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between gap-3 border-b border-surface-tertiary">
        <button
          onClick={handleGoHome}
          className="text-text-muted hover:text-text-primary text-sm shrink-0"
          aria-label="חזרה לדף הבית"
        >
          ✕
        </button>
        <div className="flex-1 max-w-xs">
          <JourneyProgress statuses={visualStatuses} />
        </div>
        <div className="flex items-center gap-3 text-sm shrink-0">
          <div className="font-bold text-accent">{score}</div>
          {streak > 0 && (
            <div className="flex items-center gap-1 text-orange-400">
              🔥<span className="font-bold">{streak}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-4 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${stopIdx}-${round.format}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <LensHeader format={round.format} />
            {round.format === 'tf' && (
              <TrueFalseRound
                round={round}
                isAudioPlaying={isAudioPlaying}
                streak={streak}
                onAnswer={handleAnswer}
              />
            )}
            {round.format === 'two-truths-one-lie' && (
              <TwoTruthsOneLieRound
                round={round}
                isAudioPlaying={isAudioPlaying}
                streak={streak}
                onAnswer={handleAnswer}
              />
            )}
            {round.format === 'audio-shrinker' && (
              <AudioShrinkerRound
                round={round}
                streak={streak}
                onAnswer={handleAnswer}
              />
            )}
            {round.format === 'year-ladder' && (
              <YearLadderRound
                round={round}
                isAudioPlaying={isAudioPlaying}
                streak={streak}
                onAnswer={handleAnswer}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'answered' && lastResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-3 mt-6"
            >
              <div
                className={`text-2xl font-bold ${
                  lastResult.correct ? 'text-correct' : 'text-wrong'
                }`}
              >
                {lastResult.correct
                  ? `🎯 צדקת! +${lastResult.scoreDelta}`
                  : '❌ טעית'}
              </div>
              <button
                onClick={handleReveal}
                className="px-6 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent-light transition-colors"
              >
                גלה את הסוד ←
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {phase === 'explaining' && (
          <DidYouKnow
            question={currentQuestion}
            onContinue={handleNext}
            isLast={stopIdx === journey.stops.length - 1}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
