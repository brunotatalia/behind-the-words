'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

interface UseSongPreviewOptions {
  deezerId: number | undefined;
  itunesPreviewUrl: string | undefined;
  play: boolean;
  volume?: number;
  fadeDuration?: number;
}

// Cache fetched preview URLs for the session
const previewCache = new Map<number, string | null>();
// Cache preloaded Audio elements
const audioCache = new Map<number, HTMLAudioElement>();

async function fetchPreviewUrl(deezerId: number): Promise<string | null> {
  if (previewCache.has(deezerId)) {
    return previewCache.get(deezerId) ?? null;
  }

  try {
    const res = await fetch(`/api/deezer/${deezerId}`);
    if (!res.ok) return null;
    const data = await res.json();
    const url = data.preview || null;
    previewCache.set(deezerId, url);
    return url;
  } catch {
    return null;
  }
}

/** Prefetch preview URL and preload audio for a deezerId */
export function prefetchPreview(deezerId: number | undefined) {
  if (!deezerId) return;
  if (audioCache.has(deezerId)) return;

  fetchPreviewUrl(deezerId).then((url) => {
    if (!url || audioCache.has(deezerId)) return;
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = 0;
    audioCache.set(deezerId, audio);
  });
}

function getOrCreateAudio(deezerId: number, url: string): HTMLAudioElement {
  const cached = audioCache.get(deezerId);
  if (cached) {
    // Reset for reuse
    cached.currentTime = 0;
    cached.volume = 0;
    return cached;
  }
  const audio = new Audio(url);
  audio.loop = true;
  audio.volume = 0;
  audio.preload = 'auto';
  audioCache.set(deezerId, audio);
  return audio;
}

export function useSongPreview({
  deezerId,
  itunesPreviewUrl,
  play,
  volume = 0.3,
  fadeDuration = 800,
}: UseSongPreviewOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const clearFade = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeOut = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    const steps = 20;
    const stepTime = fadeDuration / steps;
    const volumeStep = audio.volume / steps;

    fadeIntervalRef.current = setInterval(() => {
      const audio = audioRef.current;
      if (!audio) {
        clearFade();
        return;
      }
      audio.volume = Math.max(0, audio.volume - volumeStep);
      if (audio.volume <= 0.01) {
        audio.pause();
        audio.volume = 0;
        setIsAudioPlaying(false);
        clearFade();
      }
    }, stepTime);
  }, [fadeDuration, clearFade]);

  const fadeIn = useCallback((targetVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    audio.volume = 0;
    audio.play().then(() => {
      setIsAudioPlaying(true);
    }).catch(() => {/* autoplay blocked */});

    const steps = 20;
    const stepTime = fadeDuration / steps;
    const volumeStep = targetVolume / steps;

    fadeIntervalRef.current = setInterval(() => {
      const audio = audioRef.current;
      if (!audio) {
        clearFade();
        return;
      }
      audio.volume = Math.min(targetVolume, audio.volume + volumeStep);
      if (audio.volume >= targetVolume - 0.01) {
        audio.volume = targetVolume;
        clearFade();
      }
    }, stepTime);
  }, [fadeDuration, clearFade]);

  // Fetch preview URL when deezerId changes, fall back to itunesPreviewUrl
  useEffect(() => {
    setPreviewUrl(null);
    setIsAudioPlaying(false);

    if (!deezerId && !itunesPreviewUrl) return;

    // iTunes URLs don't expire and work directly (no CORS issues)
    if (!deezerId && itunesPreviewUrl) {
      setPreviewUrl(itunesPreviewUrl);
      return;
    }

    let cancelled = false;
    fetchPreviewUrl(deezerId!).then((url) => {
      if (cancelled) return;
      // If Deezer fails, try iTunes fallback
      if (!url && itunesPreviewUrl) {
        setPreviewUrl(itunesPreviewUrl);
      } else {
        setPreviewUrl(url);
      }
    });

    return () => { cancelled = true; };
  }, [deezerId, itunesPreviewUrl]);

  // Create/update audio element when URL changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.volume = 0;
      audioRef.current = null;
    }
    clearFade();
    setIsAudioPlaying(false);

    if (!previewUrl) return;

    const cacheKey = deezerId ?? 0;
    const audio = getOrCreateAudio(cacheKey, previewUrl);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.volume = 0;
      audioRef.current = null;
      clearFade();
    };
  }, [previewUrl, deezerId, clearFade]);

  // Handle play/pause with fade
  useEffect(() => {
    if (!audioRef.current || !previewUrl) return;

    if (play && soundEnabled) {
      fadeIn(volume);
    } else {
      fadeOut();
    }
  }, [play, soundEnabled, previewUrl, volume, fadeIn, fadeOut]);

  // If sound is toggled off mid-play, fade out
  useEffect(() => {
    if (!soundEnabled && audioRef.current && !audioRef.current.paused) {
      fadeOut();
    }
  }, [soundEnabled, fadeOut]);

  return { isAudioPlaying };
}
