'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseTimerOptions {
  duration: number;
  onExpire?: () => void;
  tickInterval?: number;
}

export function useTimer({ duration, onExpire, tickInterval = 100 }: UseTimerOptions) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number>(0);
  const durationRef = useRef(duration);
  const onExpireRef = useRef(onExpire);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  onExpireRef.current = onExpire;

  const stop = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
    durationRef.current = duration;
    setTimeRemaining(duration);
    setIsRunning(true);
  }, [duration]);

  const reset = useCallback((newDuration?: number) => {
    stop();
    const d = newDuration ?? duration;
    durationRef.current = d;
    setTimeRemaining(d);
  }, [duration, stop]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, durationRef.current - elapsed);
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        stop();
        onExpireRef.current?.();
      }
    }, tickInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, tickInterval, stop]);

  return { timeRemaining, isRunning, start, stop, reset };
}
