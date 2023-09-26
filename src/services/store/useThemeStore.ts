import { create } from 'zustand';

import { LocalStorageKey, ThemeMode } from '@root/constants';

import storageService from '../storage/storage.service';

interface ThemeState {
  appTheme: string;
  setTheme: (appTheme: string) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  appTheme: storageService.get(LocalStorageKey.Theme) || ThemeMode.Light,
  setTheme: (appTheme: string) => set(() => ({ appTheme })),
}));

export default useThemeStore;
