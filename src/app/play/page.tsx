'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question, Statement } from '@/types/question';
import { StatementCard } from '@/components/game/StatementCard';
import { TrueFalseButtons } from '@/components/game/TrueFalseButtons';
import { DidYouKnow } from '@/components/game/DidYouKnow';
import { useSongPreview, prefetchPreview } from '@/hooks/useSongPreview';
import { useSound } from '@/hooks/useSound';

type Phase = 'loading' | 'playing' | 'answered' | 'explaining' | 'finished';

interface RoundData {
  question: Question;
  statement: Statement;
  isStatementTrue: boolean;
}

// Pick one statement at random for a question — equal odds true/false
function pickRound(question: Question): RoundData | null {
  const trues = question.trueStatements ?? [];
  const falses = question.falseStatements ?? [];
  if (trues.length === 0 && falses.length === 0) return null;

  // 50/50 unless one side is empty
  let useTrue: boolean;
  if (trues.length === 0) useTrue = false;
  else if (falses.length === 0) useTrue = true;
  else useTrue = Math.random() < 0.5;

  const pool = useTrue ? trues : falses;
  const statement = pool[Math.floor(Math.random() * pool.length)];
  return { question, statement, isStatementTrue: useTrue };
}

export default function PlayPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');
  const [round, setRound] = useState<RoundData | null>(null);
  const [userAnswer, setUserAnswer] = useState<'true' | 'false' | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const playSound = useSound();

  // Load questions with statements (only those with statements available)
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
      // Take all eligible, shuffled
      const shuffled = [...eligible].sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
      const first = shuffled[0];
      if (first) {
        setRound(pickRound(first));
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

  // Background music
  const { isAudioPlaying } = useSongPreview({
    deezerId: currentQuestion?.deezerId,
    itunesPreviewUrl: currentQuestion?.itunesPreviewUrl,
    play: phase === 'playing' || phase === 'answered',
    volume: phase === 'playing' ? 0.25 : 0.15,
  });

  // Prefetch next song
  useEffect(() => {
    const next = questions[currentIndex + 1];
    prefetchPreview(next?.deezerId, next?.itunesPreviewUrl);
  }, [currentIndex, questions]);

  const handleAnswer = useCallback(
    (answer: 'true' | 'false') => {
      if (!round || phase !== 'playing') return;
      const correct =
        (answer === 'true' && round.isStatementTrue) ||
        (answer === 'false' && !round.isStatementTrue);
      setUserAnswer(answer);
      setPhase('answered');
      if (correct) {
        playSound(streak >= 2 ? 'streak' : 'correct');
        setScore((s) => s + 10 + streak * 2);
        setStreak((s) => s + 1);
      } else {
        playSound('wrong');
        setStreak(0);
      }
    },
    [round, phase, streak, playSound]
  );

  const handleContinueToExplanation = () => {
    setPhase('explaining');
  };

  const handleNextQuestion = () => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= questions.length) {
      setPhase('finished');
      return;
    }
    setCurrentIndex(nextIdx);
    setRound(pickRound(questions[nextIdx]));
    setUserAnswer(null);
    setPhase('playing');
  };

  // Compute button states
  const buttonStates = useMemo(() => {
    if (phase === 'playing' || phase === 'loading') {
      return { trueState: 'default' as const, falseState: 'default' as const };
    }
    // phase === 'answered' or later
    const correctSide = round?.isStatementTrue ? 'true' : 'false';
    const userCorrect = userAnswer === correctSide;
    return {
      trueState:
        userAnswer === 'true'
          ? userCorrect
            ? ('selected-correct' as const)
            : ('selected-wrong' as const)
          : correctSide === 'true' && !userCorrect
            ? ('reveal-correct' as const)
            : ('disabled' as const),
      falseState:
        userAnswer === 'false'
          ? userCorrect
            ? ('selected-correct' as const)
            : ('selected-wrong' as const)
          : correctSide === 'false' && !userCorrect
            ? ('reveal-correct' as const)
            : ('disabled' as const),
    };
  }, [phase, userAnswer, round]);

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
          <div className="text-text-secondary">ניקוד סופי: <span className="text-accent font-bold">{score}</span></div>
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

  const lastAnswerCorrect =
    phase === 'answered' &&
    ((userAnswer === 'true' && round.isStatementTrue) ||
      (userAnswer === 'false' && !round.isStatementTrue));

  return (
    <main className="flex-1 flex flex-col min-h-dvh">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-surface-tertiary">
        <button
          onClick={() => router.push('/')}
          className="text-text-muted hover:text-text-primary text-sm"
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
      <div className="flex-1 flex flex-col justify-center p-4 max-w-lg mx-auto w-full space-y-8">
        <AnimatePresence mode="wait">
          <StatementCard
            key={`${currentIndex}-${round.statement.text_he}`}
            statement={round.statement.text_he}
            isPlaying={isAudioPlaying}
          />
        </AnimatePresence>

        <TrueFalseButtons
          state={buttonStates}
          onSelect={handleAnswer}
          disabled={phase !== 'playing'}
        />

        {/* Quick feedback after answer */}
        <AnimatePresence>
          {phase === 'answered' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-3"
            >
              <div className={`text-2xl font-bold ${lastAnswerCorrect ? 'text-correct' : 'text-wrong'}`}>
                {lastAnswerCorrect ? '🎯 צדקת!' : '❌ טעית'}
              </div>
              <div className="text-text-secondary text-sm">
                הקביעה היא {round.isStatementTrue ? 'נכונה' : 'שגויה'}
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
