import { asyncStorage } from './AsyncStorage';

/**
 * MMKV-style fast storage wrapper using AsyncStorage.
 * Replace with react-native-mmkv when using bare React Native workflow.
 */
export const mmkvStorage = {
  getString: async (key: string): Promise<string | null> => {
    const value = await asyncStorage.getItem<string>(key);
    return value;
  },

  setString: async (key: string, value: string): Promise<void> => {
    await asyncStorage.setItem(key, value);
  },

  getBoolean: async (key: string): Promise<boolean> => {
    const value = await asyncStorage.getItem<boolean>(key);
    return value ?? false;
  },

  setBoolean: async (key: string, value: boolean): Promise<void> => {
    await asyncStorage.setItem(key, value);
  },

  delete: async (key: string): Promise<void> => {
    await asyncStorage.removeItem(key);
  },
};
