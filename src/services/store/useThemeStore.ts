import { create } from 'zustand';

import { LocalStorageKey, ThemeMode } from '@root/constants';
import { ThemeState } from '@root/interfaces';

import storageService from '../storage/storage.service';

const useThemeStore = create<ThemeState>((set) => ({
  appTheme: storageService.get(LocalStorageKey.Theme) || ThemeMode.Dark,
  setTheme: (appTheme: string) => set(() => ({ appTheme })),
}));

export default useThemeStore;
