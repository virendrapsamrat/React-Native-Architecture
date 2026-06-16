import { logger } from '../utils/logger';
import { NotificationService } from '../services/NotificationService';

export const FirebaseMessaging = {
  getToken: async (): Promise<string | null> => {
    logger.info('[FCM] Getting token');
    // Integrate with @react-native-firebase/messaging or expo-notifications
    return null;
  },

  registerDevice: async () => {
    const token = await FirebaseMessaging.getToken();
    if (token) {
      await NotificationService.registerDevice(token);
    }
  },

  onMessage: (callback: (message: unknown) => void) => {
    logger.info('[FCM] Message listener registered');
    return () => logger.info('[FCM] Message listener removed');
  },
};
