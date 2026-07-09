import { StorageKeys } from '@/constants/StorageKeys';
import { asyncStorage } from '@/storage/AsyncStorage';
import { secureStorage } from '@/storage/SecureStorage';
import type { ThemeMode } from '@/types/ThemeMode';

export const storageUtils = {
  saveAuthToken: (token: string) =>
    secureStorage.setItem(StorageKeys.AUTH_TOKEN, token),

  getAuthToken: () => secureStorage.getItem(StorageKeys.AUTH_TOKEN),

  removeAuthToken: () => secureStorage.removeItem(StorageKeys.AUTH_TOKEN),

  saveRefreshToken: (token: string) =>
    secureStorage.setItem(StorageKeys.REFRESH_TOKEN, token),

  getRefreshToken: () => secureStorage.getItem(StorageKeys.REFRESH_TOKEN),

  removeRefreshToken: () => secureStorage.removeItem(StorageKeys.REFRESH_TOKEN),

  saveUserData: <T>(data: T) =>
    asyncStorage.setItem(StorageKeys.USER_DATA, data),

  getUserData: <T>() => asyncStorage.getItem<T>(StorageKeys.USER_DATA),

  removeUserData: () => asyncStorage.removeItem(StorageKeys.USER_DATA),

  saveThemeMode: (mode: ThemeMode) =>
    asyncStorage.setItem(StorageKeys.THEME_MODE, mode),

  saveLanguage: (language: string) =>
    asyncStorage.setItem(StorageKeys.LANGUAGE, language),

  getLanguage: () => asyncStorage.getItem<string>(StorageKeys.LANGUAGE),

  getThemeMode: async (): Promise<ThemeMode | null> => {
    const mode = await asyncStorage.getItem<string>(StorageKeys.THEME_MODE);
    return mode === 'light' || mode === 'dark' || mode === 'system' ? mode : null;
  },

  removeThemeMode: () => asyncStorage.removeItem(StorageKeys.THEME_MODE),

  clearAuthData: async () => {
    await asyncStorage.removeItem(StorageKeys.USER_DATA);
    await secureStorage.removeItem(StorageKeys.AUTH_TOKEN);
    await secureStorage.removeItem(StorageKeys.REFRESH_TOKEN);
  },

  clearAll: async () => {
    await asyncStorage.clear();
    await secureStorage.removeItem(StorageKeys.AUTH_TOKEN);
    await secureStorage.removeItem(StorageKeys.REFRESH_TOKEN);
  },
};
