import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ThemeMode } from '../../../types/ThemeMode';

interface SettingsState {
  language: string;
  notificationsEnabled: boolean;
  darkMode: boolean;
  themeMode: ThemeMode;
}

const initialState: SettingsState = {
  language: 'en',
  notificationsEnabled: true,
  darkMode: false,
  themeMode: 'system',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
      state.darkMode = action.payload === 'dark';
    },
    toggleDarkMode: (state) => {
      state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark';
      state.darkMode = state.themeMode === 'dark';
    },
  },
});

export const { setLanguage, toggleNotifications, toggleDarkMode, setThemeMode } =
  settingsSlice.actions;
export default settingsSlice.reducer;
