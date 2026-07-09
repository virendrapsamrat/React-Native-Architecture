import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { logger } from '@/utils/logger';

const isWeb = Platform.OS === 'web';

const getWebStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.sessionStorage;
};

export const secureStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (isWeb) {
        const webStorage = getWebStorage();
        return webStorage ? webStorage.getItem(key) : null;
      }
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      logger.error(`SecureStorage getItem error [${key}]`, error);
      return null;
    }
  },

  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (isWeb) {
        const webStorage = getWebStorage();
        if (webStorage) {
          webStorage.setItem(key, value);
          return;
        }
      }
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      logger.error(`SecureStorage setItem error [${key}]`, error);
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      if (isWeb) {
        const webStorage = getWebStorage();
        if (webStorage) {
          webStorage.removeItem(key);
          return;
        }
      }
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      logger.error(`SecureStorage removeItem error [${key}]`, error);
    }
  },
};
