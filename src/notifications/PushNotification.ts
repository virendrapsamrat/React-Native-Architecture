import { logger } from '@/utils/logger';
import { featureFlags } from '@/config/featureFlags';

export const PushNotification = {
  scheduleLocal: async (title: string, body: string) => {
    if (!featureFlags.enablePushNotifications) return;
    logger.info(`[Push] Local notification: ${title} - ${body}`);
    // Integrate with expo-notifications
  },

  cancelAll: async () => {
    logger.info('[Push] Cancel all notifications');
  },
};
