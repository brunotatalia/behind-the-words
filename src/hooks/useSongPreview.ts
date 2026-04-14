'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

interface UseSongPreviewOptions {
  deezerId: number | undefined;
  play: boolean;
  volume?: number;
  fadeDuration?: number;
}

// Cache fetched preview URLs for the session
const previewCache = new Map<number, string | null>();

async function fetchPreviewUrl(deezerId: number): Promise<string | null> {
  if (previewCache.has(deezerId)) {
    return previewCache.get(deezerId) ?? null;
  }

  try {
    const res = await fetch(`https://api.deezer.com/track/${deezerId}`);
    if (!res.ok) return null;
    const data = await res.json();
    const url = data.preview || null;
    previewCache.set(deezerId, url);
    return url;
  } catch {
    return null;
  }
}

export function useSongPreview({
  deezerId,
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

  // Fetch preview URL when deezerId changes
  useEffect(() => {
    setPreviewUrl(null);
    setIsAudioPlaying(false);

    if (!deezerId) return;

    let cancelled = false;
    fetchPreviewUrl(deezerId).then((url) => {
      if (!cancelled) setPreviewUrl(url);
    });

    return () => { cancelled = true; };
  }, [deezerId]);

  // Create/update audio element when URL changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    clearFade();
    setIsAudioPlaying(false);

    if (!previewUrl) return;

    const audio = new Audio(previewUrl);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
      clearFade();
    };
  }, [previewUrl, clearFade]);

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
