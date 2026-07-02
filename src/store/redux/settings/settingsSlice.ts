import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  language: string;
  notificationsEnabled: boolean;
  darkMode: boolean;
}

const initialState: SettingsState = {
  language: 'en',
  notificationsEnabled: true,
  darkMode: false,
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
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setLanguage, toggleNotifications, toggleDarkMode, setDarkMode } =
  settingsSlice.actions;
export default settingsSlice.reducer;
