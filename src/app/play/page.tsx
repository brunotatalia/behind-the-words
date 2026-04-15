'use client';

import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useTimer } from '@/hooks/useTimer';
import { TIME_LIMITS } from '@/lib/gameLogic';
import { GameHeader } from '@/components/game/GameHeader';
import { QuestionCard } from '@/components/game/QuestionCard';
import { AnswerOption } from '@/components/game/AnswerOption';
import { AnswerFeedback } from '@/components/game/AnswerFeedback';
import { DidYouKnow } from '@/components/game/DidYouKnow';
import { useSound } from '@/hooks/useSound';
import { useSongPreview, prefetchPreview } from '@/hooks/useSongPreview';

export default function PlayPage() {
  const router = useRouter();
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [readingPhase, setReadingPhase] = useState(false);
  const {
    phase,
    questions,
    currentIndex,
    selectedAnswer,
    isCorrect,
    score,
    streak,
    answers,
    mode,
    selectAnswer,
    proceedToExplanation,
    nextQuestion,
    resetGame,
  } = useGameStore();

  const playSound = useSound();
  const isLearnMode = mode === 'learn';
  const isPlaying = phase === 'playing';
  const isDaily = mode === 'daily';
  const currentQuestion = questions[currentIndex];
  const timeLimit = currentQuestion ? TIME_LIMITS[currentQuestion.difficulty] : 15;

  // Background song preview - plays during question, fades out on answer
  const { isAudioPlaying } = useSongPreview({
    deezerId: currentQuestion?.deezerId,
    itunesPreviewUrl: currentQuestion?.itunesPreviewUrl,
    play: isPlaying,
    volume: 0.25,
  });

  // Prefetch next question's song preview for instant playback
  const nextQuestion_q = questions[currentIndex + 1];
  useEffect(() => {
    prefetchPreview(nextQuestion_q?.deezerId, nextQuestion_q?.itunesPreviewUrl);
  }, [nextQuestion_q?.deezerId, nextQuestion_q?.itunesPreviewUrl]);

  const handleExpire = useCallback(() => {
    if (phase === 'playing' && !isLearnMode) {
      selectAnswer('__expired__', 0);
    }
  }, [phase, selectAnswer, isLearnMode]);

  const { timeRemaining, start: startTimer, stop: stopTimer, reset: resetTimer } = useTimer({
    duration: timeLimit,
    onExpire: handleExpire,
  });

  // Redirect to home if no game started
  useEffect(() => {
    if (phase === 'idle' && questions.length === 0) {
      router.replace('/');
    }
  }, [phase, questions.length, router]);

  // Redirect to results when finished
  useEffect(() => {
    if (phase === 'finished') {
      router.push('/results');
    }
  }, [phase, router]);

  // Calculate reading delay based on question length (3-5 seconds)
  const getReadingDelay = (question: typeof currentQuestion) => {
    if (!question) return 3000;
    const len = question.question_he.length;
    if (len > 80) return 5000;
    if (len > 50) return 4000;
    return 3000;
  };

  // Reading phase: show question without answers, then reveal and start timer
  useEffect(() => {
    if (phase === 'playing' && currentQuestion && !isLearnMode) {
      setShowAnswers(false);
      setReadingPhase(true);
      resetTimer(TIME_LIMITS[currentQuestion.difficulty]);

      const readDelay = getReadingDelay(currentQuestion);
      const timeout = setTimeout(() => {
        setShowAnswers(true);
        setReadingPhase(false);
        startTimer();
      }, readDelay);

      return () => clearTimeout(timeout);
    }
    if (phase === 'playing' && isLearnMode) {
      setShowAnswers(true);
      setReadingPhase(false);
    }
    if (phase === 'answered') {
      stopTimer();
    }
  }, [phase, currentIndex, currentQuestion, startTimer, stopTimer, resetTimer, isLearnMode]);

  const lastAnswer = answers[answers.length - 1];

  // Play sounds on phase transitions
  useEffect(() => {
    if (phase === 'answered' && lastAnswer) {
      if (lastAnswer.isCorrect) {
        if (streak >= 3) {
          playSound('streak');
        } else {
          playSound('correct');
        }
      } else {
        playSound('wrong');
      }
    }
    if (phase === 'finished') {
      playSound('gameComplete');
    }
  }, [phase, currentIndex]);

  // Timer warning sound at 3 seconds
  useEffect(() => {
    if (!isLearnMode && phase === 'playing' && timeRemaining <= 3 && timeRemaining > 0) {
      playSound('timerWarning');
    }
  }, [Math.ceil(timeRemaining)]);

  const handleSelectAnswer = (answerId: string) => {
    if (phase !== 'playing') return;
    playSound('click');
    selectAnswer(answerId, isLearnMode ? timeLimit : timeRemaining);
  };

  const handleFeedbackContinue = () => {
    proceedToExplanation();
  };

  const handleNextQuestion = () => {
    nextQuestion();
  };

  if (!currentQuestion) {
    return null;
  }

  const getAnswerState = (optionId: string) => {
    if (phase === 'playing') return 'default' as const;
    if (phase !== 'answered' && phase !== 'explaining') return 'disabled' as const;

    if (optionId === selectedAnswer) {
      return isCorrect ? 'selected-correct' as const : 'selected-wrong' as const;
    }
    if (optionId === currentQuestion.correctAnswer && !isCorrect) {
      return 'reveal-correct' as const;
    }
    return 'disabled' as const;
  };

  return (
    <main className="flex-1 flex flex-col min-h-dvh">
      <GameHeader
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        score={score}
        streak={streak}
        timeRemaining={isLearnMode ? timeLimit : timeRemaining}
        timeLimit={timeLimit}
        isLearnMode={isLearnMode}
        isReadingPhase={readingPhase}
        onQuit={() => setShowQuitConfirm(true)}
      />

      <div className="flex-1 flex flex-col justify-center p-4 max-w-lg mx-auto w-full space-y-6">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            isPlaying={isAudioPlaying}
          />
        </AnimatePresence>

        <AnimatePresence>
          {showAnswers && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <AnswerOption
                  key={option.id}
                  id={option.id}
                  text={option.text_he}
                  index={index}
                  state={getAnswerState(option.id)}
                  onSelect={() => handleSelectAnswer(option.id)}
                  disabled={phase !== 'playing' || !showAnswers}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reading phase indicator */}
        {readingPhase && !isLearnMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <span className="animate-pulse">🎵</span>
              <span>הקשיבו לשיר וקראו את השאלה...</span>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {phase === 'answered' && lastAnswer && (
          <AnswerFeedback
            isCorrect={lastAnswer.isCorrect}
            pointsEarned={lastAnswer.pointsEarned}
            streak={streak}
            onContinue={handleFeedbackContinue}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'explaining' && (
          <DidYouKnow
            question={currentQuestion}
            onContinue={handleNextQuestion}
            isLast={currentIndex === questions.length - 1}
          />
        )}
      </AnimatePresence>

      {/* Quit Confirmation */}
      <AnimatePresence>
        {showQuitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface-secondary rounded-2xl p-6 max-w-sm w-full space-y-4 text-center"
            >
              <div className="text-3xl">🚪</div>
              <h3 className="text-xl font-bold">?לצאת מהמשחק</h3>
              <p className="text-text-secondary text-sm">
                ההתקדמות שלך לא תישמר
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowQuitConfirm(false)}
                  className="flex-1 py-3 rounded-xl bg-surface-tertiary text-text-secondary font-medium hover:bg-surface-card transition-colors"
                >
                  המשך לשחק
                </button>
                <button
                  onClick={() => {
                    resetGame();
                    router.push('/');
                  }}
                  className="flex-1 py-3 rounded-xl bg-wrong/20 text-wrong font-bold hover:bg-wrong/30 transition-colors"
                >
                  יציאה
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
