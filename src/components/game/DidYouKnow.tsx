'use client';

import { motion } from 'framer-motion';
import type { Question } from '@/types/question';
import { useStatsStore } from '@/store/statsStore';

interface DidYouKnowProps {
  question: Question;
  onContinue: () => void;
  isLast: boolean;
}

export function DidYouKnow({ question, onContinue, isLast }: DidYouKnowProps) {
  const { favoriteQuestions, toggleFavorite } = useStatsStore();
  const isFav = favoriteQuestions.includes(question.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onContinue}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-surface-secondary rounded-t-3xl sm:rounded-3xl p-6 pb-8 sm:pb-6 space-y-5 shadow-2xl max-h-[80dvh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(question.id); }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-tertiary transition-colors"
            aria-label={isFav ? 'הסר ממועדפים' : 'הוסף למועדפים'}
          >
            {isFav ? '❤️' : '🤍'}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <h3 className="text-xl font-bold text-gold">?הידעת</h3>
          </div>
          <div className="w-8" />
        </div>

        {/* Song Info */}
        <div className="text-center space-y-1">
          <div className="font-inter text-2xl font-bold text-accent-light">
            &quot;{question.songTitle}&quot;
          </div>
          <div className="font-inter text-lg text-text-secondary">
            {question.artist}
          </div>
          <div className="inline-block px-2 py-0.5 rounded-full bg-surface-tertiary text-text-muted text-xs">
            {question.year}
          </div>
        </div>

        {/* Lyric Quote */}
        {question.lyricQuote && (
          <div className="mx-4 px-4 py-3 border-s-2 border-accent/40 bg-accent/5 rounded-e-lg">
            <p className="font-inter text-sm text-accent-light/80 italic leading-relaxed" dir="ltr">
              &quot;{question.lyricQuote}&quot;
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-surface-tertiary" />

        {/* Explanation */}
        <p className="text-text-primary text-base leading-relaxed text-center">
          {question.explanation_he}
        </p>

        {/* Spotify Link */}
        {question.spotifyId && (
          <a
            href={`https://open.spotify.com/track/${question.spotifyId}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1DB954]/15 text-[#1DB954] hover:bg-[#1DB954]/25 transition-colors text-sm font-medium"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            להאזין בספוטיפיי
          </a>
        )}

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-light text-white font-bold text-lg transition-colors duration-200 active:scale-[0.98]"
        >
          {isLast ? 'לתוצאות' : 'שאלה הבאה'}
        </button>
      </motion.div>
    </motion.div>
  );
}
