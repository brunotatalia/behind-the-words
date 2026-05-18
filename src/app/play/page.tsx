'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from '@/types/question';
import type { Round } from '@/types/round';
import { buildRound } from '@/game/buildRound';
import { TrueFalseRound } from '@/components/game/rounds/TrueFalseRound';
import { TwoTruthsOneLieRound } from '@/components/game/rounds/TwoTruthsOneLieRound';
import { AudioShrinkerRound } from '@/components/game/rounds/AudioShrinkerRound';
import { YearLadderRound } from '@/components/game/rounds/YearLadderRound';
import { DidYouKnow } from '@/components/game/DidYouKnow';
import { useSongPreview, prefetchPreview } from '@/hooks/useSongPreview';
import { useSound } from '@/hooks/useSound';

type Phase = 'loading' | 'playing' | 'answered' | 'explaining' | 'finished';

export default function PlayPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');
  const [round, setRound] = useState<Round | null>(null);
  const [lastResult, setLastResult] = useState<{
    correct: boolean;
    scoreDelta: number;
  } | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const playSound = useSound();

  // Load eligible questions and pick the first round.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { questions: all } = await import('@/data/questions');
      const eligible = all.filter(
        (q) =>
          (q.trueStatements && q.trueStatements.length > 0) ||
          (q.falseStatements && q.falseStatements.length > 0)
      );
      if (cancelled) return;
      const shuffled = [...eligible].sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
      const first = shuffled[0];
      if (first) {
        setRound(buildRound(first, shuffled));
        setPhase('playing');
      } else {
        setPhase('finished');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const currentQuestion = questions[currentIndex];

  // BG audio is suppressed for AudioShrinker — that format owns its own audio.
  const bgAudioEnabled = round?.format !== 'audio-shrinker';

  const { isAudioPlaying } = useSongPreview({
    deezerId: bgAudioEnabled ? currentQuestion?.deezerId : undefined,
    itunesPreviewUrl: bgAudioEnabled ? currentQuestion?.itunesPreviewUrl : undefined,
    play: bgAudioEnabled && (phase === 'playing' || phase === 'answered'),
    volume: phase === 'playing' ? 0.25 : 0.15,
  });

  // Prefetch next song's audio for instant playback when round advances.
  useEffect(() => {
    const next = questions[currentIndex + 1];
    prefetchPreview(next?.deezerId, next?.itunesPreviewUrl);
  }, [currentIndex, questions]);

  const handleAnswer = useCallback(
    (result: { correct: boolean; scoreDelta: number }) => {
      if (phase !== 'playing') return;
      setLastResult(result);
      setPhase('answered');
      if (result.correct) {
        playSound(streak >= 2 ? 'streak' : 'correct');
        setScore((s) => s + result.scoreDelta);
        setStreak((s) => s + 1);
      } else {
        playSound('wrong');
        setStreak(0);
      }
    },
    [phase, streak, playSound]
  );

  const handleContinueToExplanation = useCallback(() => {
    setPhase('explaining');
  }, []);

  const handleNextQuestion = useCallback(() => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= questions.length) {
      setPhase('finished');
      return;
    }
    setCurrentIndex(nextIdx);
    // Avoid serving the same format twice in a row when possible.
    const nextRound = buildRound(questions[nextIdx], questions, {
      exclude: round ? [round.format] : undefined,
    });
    setRound(nextRound);
    setLastResult(null);
    setPhase('playing');
  }, [currentIndex, questions, round]);

  // -------- early returns for loading / finished --------

  if (phase === 'loading') {
    return (
      <main className="flex-1 flex items-center justify-center min-h-dvh">
        <div className="text-text-muted">טוען שאלות...</div>
      </main>
    );
  }

  if (phase === 'finished' || !currentQuestion || !round) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-dvh p-6">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-5xl">🎉</div>
          <h2 className="text-2xl font-bold">סיימת את כל השאלות!</h2>
          <div className="text-text-secondary">
            ניקוד סופי: <span className="text-accent font-bold">{score}</span>
          </div>
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

  return (
    <main className="flex-1 flex flex-col min-h-dvh">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-surface-tertiary">
        <button
          onClick={() => router.push('/')}
          className="text-text-muted hover:text-text-primary text-sm"
          aria-label="חזרה לדף הבית"
        >
          ✕
        </button>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-text-muted">
            {currentIndex + 1}/{questions.length}
          </div>
          <div className="font-bold text-accent">{score}</div>
          {streak > 0 && (
            <div className="flex items-center gap-1 text-orange-400">
              🔥 <span className="font-bold">{streak}</span>
            </div>
          )}
        </div>
        <div className="w-6" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center p-4 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${round.format}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Format dispatch */}
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

        {/* Quick feedback after answer */}
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
                onClick={handleContinueToExplanation}
                className="px-6 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent-light transition-colors"
              >
                גלה את הסיפור המלא ←
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reveal modal */}
      <AnimatePresence>
        {phase === 'explaining' && (
          <DidYouKnow
            question={currentQuestion}
            onContinue={handleNextQuestion}
            isLast={currentIndex === questions.length - 1}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
