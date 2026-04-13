'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

interface UseSongPreviewOptions {
  url: string | undefined;
  play: boolean;          // should be playing right now?
  volume?: number;        // 0-1, default 0.3 (background level)
  fadeDuration?: number;  // ms, default 800
}

export function useSongPreview({
  url,
  play,
  volume = 0.3,
  fadeDuration = 800,
}: UseSongPreviewOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);

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
        clearFade();
      }
    }, stepTime);
  }, [fadeDuration, clearFade]);

  const fadeIn = useCallback((targetVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    audio.volume = 0;
    audio.play().catch(() => {/* autoplay blocked */});

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

  // Create/update audio element when URL changes
  useEffect(() => {
    // Clean up previous
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    clearFade();

    if (!url) return;

    const audio = new Audio(url);
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
  }, [url, clearFade]);

  // Handle play/pause with fade
  useEffect(() => {
    if (!audioRef.current || !url) return;

    if (play && soundEnabled) {
      fadeIn(volume);
    } else {
      fadeOut();
    }
  }, [play, soundEnabled, url, volume, fadeIn, fadeOut]);

  // If sound is toggled off mid-play, fade out
  useEffect(() => {
    if (!soundEnabled && audioRef.current && !audioRef.current.paused) {
      fadeOut();
    }
  }, [soundEnabled, fadeOut]);
}
