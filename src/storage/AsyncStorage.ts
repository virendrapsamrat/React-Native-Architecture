import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from '../utils/logger';

export const asyncStorage = {
  getItem: async <T>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      logger.error(`AsyncStorage getItem error [${key}]`, error);
      return null;
    }
  },

  setItem: async <T>(key: string, value: T): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      logger.error(`AsyncStorage setItem error [${key}]`, error);
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      logger.error(`AsyncStorage removeItem error [${key}]`, error);
    }
  },

  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      logger.error('AsyncStorage clear error', error);
    }
  },
};
