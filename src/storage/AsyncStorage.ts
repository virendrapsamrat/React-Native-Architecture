import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { logger } from '@/utils/logger';

const isWeb = Platform.OS === 'web';

export const asyncStorage = {
  getItem: async <T>(key: string): Promise<T | null> => {
    try {
      const value = isWeb ? localStorage.getItem(key) : await AsyncStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      logger.error(`AsyncStorage getItem error [${key}]`, error);
      return null;
    }
  },

  setItem: async <T>(key: string, value: T): Promise<void> => {
    try {
      const stringValue = JSON.stringify(value);
      if (isWeb) {
        localStorage.setItem(key, stringValue);
        return;
      }
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      logger.error(`AsyncStorage setItem error [${key}]`, error);
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      if (isWeb) {
        localStorage.removeItem(key);
        return;
      }
      await AsyncStorage.removeItem(key);
    } catch (error) {
      logger.error(`AsyncStorage removeItem error [${key}]`, error);
    }
  },

  clear: async (): Promise<void> => {
    try {
      if (isWeb) {
        localStorage.clear();
        return;
      }
      await AsyncStorage.clear();
    } catch (error) {
      logger.error('AsyncStorage clear error', error);
    }
  },
};
