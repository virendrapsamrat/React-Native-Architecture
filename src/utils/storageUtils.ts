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

  clearAll: async () => {
    await asyncStorage.clear();
    await secureStorage.removeItem(StorageKeys.AUTH_TOKEN);
    await secureStorage.removeItem(StorageKeys.REFRESH_TOKEN);
  },
};
