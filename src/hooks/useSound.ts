'use client';

import { useCallback } from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import { sounds } from '@/lib/sounds';

export function useSound() {
  const enabled = useSettingsStore((s) => s.soundEnabled);

  const play = useCallback(
    (sound: keyof typeof sounds) => {
      if (enabled) {
        sounds[sound]();
      }
    },
    [enabled]
  );

  return play;
}
