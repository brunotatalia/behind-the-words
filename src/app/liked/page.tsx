'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStatsStore } from '@/store/statsStore';

export default function LikedSongsPage() {
  const router = useRouter();
  const likedSongs = useStatsStore((s) => s.likedSongs);
  const toggleLikedSong = useStatsStore((s) => s.toggleLikedSong);

  const spotifySongs = likedSongs.filter((s) => s.spotifyId);

  const handleOpenPlaylist = () => {
    // Open all songs in Spotify - user can add them to a playlist
    // For multiple songs, we link to search
    if (spotifySongs.length === 1) {
      window.open(`https://open.spotify.com/track/${spotifySongs[0].spotifyId}`, '_blank');
    } else if (spotifySongs.length > 1) {
      // No direct Spotify playlist creation API from client-side,
      // so we open the first song and provide the list
      window.open(`https://open.spotify.com/track/${spotifySongs[0].spotifyId}`, '_blank');
    }
  };

  return (
    <main className="flex-1 flex flex-col min-h-dvh" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        <button
          onClick={() => router.push('/')}
          aria-label="חזרה לדף הבית"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-tertiary text-text-muted hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary"
        >
          <span aria-hidden="true">✕</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">💚</span>
          <h1 className="text-xl font-bold">שירים שאהבתי</h1>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-4 pb-8 max-w-lg mx-auto w-full">
        {likedSongs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center py-20 space-y-4"
          >
            <div className="text-5xl">🎵</div>
            <h2 className="text-xl font-bold text-text-secondary">עוד לא אהבתם שירים</h2>
            <p className="text-text-muted text-sm max-w-xs">
              שחקו במשחק או גללו ב&quot;גלה שירים&quot; ולחצו על 💚 כדי לשמור שירים שאהבתם
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 rounded-xl bg-accent text-white font-bold mt-4"
            >
              חזרה לדף הבית
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {/* Summary */}
            <div className="text-center text-text-muted text-sm">
              {likedSongs.length} שירים שמורים
              {spotifySongs.length > 0 && ` · ${spotifySongs.length} זמינים בספוטיפיי`}
            </div>

            {/* Open in Spotify button */}
            {spotifySongs.length > 0 && (
              <button
                onClick={handleOpenPlaylist}
                className="w-full py-3 rounded-xl bg-[#1DB954]/15 text-[#1DB954] hover:bg-[#1DB954]/25 transition-colors text-sm font-bold flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                פתח בספוטיפיי
              </button>
            )}

            {/* Song list */}
            <AnimatePresence>
              {likedSongs.map((song, i) => (
                <motion.div
                  key={song.questionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface-secondary hover:bg-surface-card transition-colors group"
                >
                  {/* Song info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-inter font-bold text-accent-light truncate">
                      {song.songTitle}
                    </div>
                    <div className="font-inter text-sm text-text-secondary truncate">
                      {song.artist}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {song.spotifyId && (
                      <a
                        href={`https://open.spotify.com/track/${song.spotifyId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`פתח את ${song.songTitle} בספוטיפיי`}
                        className="w-8 h-8 rounded-full bg-[#1DB954]/15 flex items-center justify-center hover:bg-[#1DB954]/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1DB954] focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                      </a>
                    )}
                    <button
                      onClick={() =>
                        toggleLikedSong({
                          questionId: song.questionId,
                          songTitle: song.songTitle,
                          artist: song.artist,
                          spotifyId: song.spotifyId,
                          deezerId: song.deezerId,
                        })
                      }
                      aria-label={`הסר את ${song.songTitle} מהרשימה`}
                      className="w-8 h-8 rounded-full bg-wrong/10 flex items-center justify-center hover:bg-wrong/20 transition-colors opacity-60 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-wrong focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary"
                    >
                      <span className="text-wrong text-sm" aria-hidden="true">✕</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
