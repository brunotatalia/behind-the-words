'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { questions } from '@/data/questions';
import { useStatsStore } from '@/store/statsStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useSongPreview } from '@/hooks/useSongPreview';
import type { Question } from '@/types/question';

// Shuffle questions for a fresh explore experience
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function ExploreCard({
  question,
  isActive,
  onSwipeUp,
  onSwipeDown,
}: {
  question: Question;
  isActive: boolean;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
}) {
  const { likedSongs, toggleLikedSong } = useStatsStore();
  const isLiked = likedSongs.some((s) => s.questionId === question.id);

  // Audio plays only when active
  const { isAudioPlaying } = useSongPreview({
    deezerId: question.deezerId,
    itunesPreviewUrl: question.itunesPreviewUrl,
    play: isActive,
    volume: 0.3,
  });

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLikedSong({
      questionId: question.id,
      songTitle: question.songTitle,
      artist: question.artist,
      spotifyId: question.spotifyId,
      deezerId: question.deezerId,
    });
  };

  const y = useMotionValue(0);
  const opacity = useTransform(y, [-200, 0, 200], [0.5, 1, 0.5]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y < -80) {
      onSwipeUp();
    } else if (info.offset.y > 80) {
      onSwipeDown();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center p-6"
      style={{ y, opacity }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Song Info */}
        <div className="space-y-2">
          <div className="text-5xl mb-4">🎵</div>
          <h2 className="font-inter text-3xl font-bold text-accent-light">
            &quot;{question.songTitle}&quot;
          </h2>
          <p className="font-inter text-xl text-text-secondary">{question.artist}</p>
          <span className="inline-block px-3 py-1 rounded-full bg-surface-tertiary text-text-muted text-sm">
            {question.year}
          </span>
        </div>

        {/* Audio indicator */}
        {isAudioPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-1"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-accent rounded-full"
                animate={{ height: [8, 20, 8] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Lyric Quote */}
        {question.lyricQuote && (
          <div className="mx-4 px-5 py-4 border-s-2 border-accent/40 bg-accent/5 rounded-e-xl">
            <p className="font-inter text-base text-accent-light/80 italic leading-relaxed" dir="ltr">
              &quot;{question.lyricQuote}&quot;
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-surface-tertiary mx-8" />

        {/* The fun fact / explanation */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">💡</span>
            <h3 className="text-lg font-bold text-gold">?הידעת</h3>
          </div>
          <p className="text-text-primary text-lg leading-relaxed px-2">
            {question.explanation_he}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-6 pt-4">
          {/* Like button */}
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
                isLiked
                  ? 'bg-correct/20 scale-110'
                  : 'bg-surface-tertiary group-hover:bg-surface-card'
              }`}
            >
              <span className={`text-2xl transition-transform duration-200 ${isLiked ? 'scale-125' : ''}`}>
                {isLiked ? '💚' : '🤍'}
              </span>
            </div>
            <span className="text-xs text-text-muted">{isLiked ? 'אהבתי!' : 'אהבתי'}</span>
          </button>

          {/* Spotify link */}
          {question.spotifyId && (
            <a
              href={`https://open.spotify.com/track/${question.spotifyId}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center gap-1 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#1DB954]/15 flex items-center justify-center group-hover:bg-[#1DB954]/25 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1DB954">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </div>
              <span className="text-xs text-text-muted">Spotify</span>
            </a>
          )}

          {/* Share */}
          <button
            onClick={async (e) => {
              e.stopPropagation();
              const text = `🎵 ${question.songTitle} - ${question.artist}\n\n💡 ${question.explanation_he}\n\n👉 behind-the-words.com`;
              if (navigator.share) {
                try {
                  await navigator.share({ text, url: 'https://behind-the-words.com' });
                } catch { /* cancelled */ }
              } else {
                await navigator.clipboard.writeText(text);
              }
            }}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-14 h-14 rounded-full bg-surface-tertiary flex items-center justify-center group-hover:bg-surface-card transition-colors">
              <span className="text-2xl">📤</span>
            </div>
            <span className="text-xs text-text-muted">שיתוף</span>
          </button>
        </div>
      </div>

      {/* Swipe hint */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 text-text-muted">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-lg">↑</span>
        </motion.div>
        <span className="text-xs">החליקו למעלה להמשיך</span>
      </div>
    </motion.div>
  );
}

export default function ExplorePage() {
  const router = useRouter();
  const { soundEnabled, toggleSound } = useSettingsStore();
  const [shuffled, setShuffled] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setShuffled(shuffleArray(questions));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % shuffled.length);
  }, [shuffled.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + shuffled.length) % shuffled.length);
  }, [shuffled.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') handleNext();
      if (e.key === 'Escape') router.push('/');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleNext, handlePrev, router]);

  if (shuffled.length === 0) return null;

  const currentQuestion = shuffled[currentIndex];

  return (
    <main className="fixed inset-0 bg-surface-primary overflow-hidden" dir="rtl">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3">
        <button
          onClick={() => router.push('/')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-tertiary/80 backdrop-blur-sm text-text-muted hover:text-text-primary transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-tertiary/80 backdrop-blur-sm">
          <span className="text-sm">🎵</span>
          <span className="text-sm font-medium text-text-secondary">גלה שירים</span>
        </div>

        <button
          onClick={toggleSound}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-tertiary/80 backdrop-blur-sm text-text-muted hover:text-text-primary transition-colors"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>

      {/* Progress indicator */}
      <div className="absolute top-16 left-4 right-4 z-10">
        <div className="h-0.5 bg-surface-tertiary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentIndex + 1) / shuffled.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-center mt-1 text-xs text-text-muted">
          {currentIndex + 1} / {shuffled.length}
        </div>
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <ExploreCard
          key={currentQuestion.id}
          question={currentQuestion}
          isActive={true}
          onSwipeUp={handleNext}
          onSwipeDown={handlePrev}
        />
      </AnimatePresence>
    </main>
  );
}
