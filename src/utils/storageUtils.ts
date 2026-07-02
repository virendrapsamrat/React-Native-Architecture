import { StorageKeys } from '../constants/StorageKeys';
import { asyncStorage } from '../storage/AsyncStorage';
import { secureStorage } from '../storage/SecureStorage';

export const storageUtils = {
  saveAuthToken: (token: string) =>
    secureStorage.setItem(StorageKeys.AUTH_TOKEN, token),

  getAuthToken: () => secureStorage.getItem(StorageKeys.AUTH_TOKEN),

  removeAuthToken: () => secureStorage.removeItem(StorageKeys.AUTH_TOKEN),

  saveUserData: <T>(data: T) =>
    asyncStorage.setItem(StorageKeys.USER_DATA, data),

  getUserData: <T>() => asyncStorage.getItem<T>(StorageKeys.USER_DATA),

  removeUserData: () => asyncStorage.removeItem(StorageKeys.USER_DATA),

  saveThemeMode: (mode: 'light' | 'dark') =>
    asyncStorage.setItem(StorageKeys.THEME_MODE, mode),

  getThemeMode: () => asyncStorage.getItem<string>(StorageKeys.THEME_MODE),

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
