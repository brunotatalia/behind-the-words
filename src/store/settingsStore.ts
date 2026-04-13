'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      soundEnabled: true,
      toggleSound: () => set({ soundEnabled: !get().soundEnabled }),
    }),
    { name: 'btw-settings' }
  )
);
