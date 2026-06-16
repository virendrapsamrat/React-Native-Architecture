import { logger } from '../utils/logger';
import { featureFlags } from '../config/featureFlags';

export const FirebaseAnalytics = {
  logEvent: (eventName: string, params?: Record<string, unknown>) => {
    if (!featureFlags.enableAnalytics) return;
    logger.info(`[Firebase] Event: ${eventName}`, params);
    // Integrate with @react-native-firebase/analytics
  },

  setUserId: (userId: string) => {
    if (!featureFlags.enableAnalytics) return;
    logger.info(`[Firebase] Set user: ${userId}`);
  },

  setUserProperty: (name: string, value: string) => {
    if (!featureFlags.enableAnalytics) return;
    logger.info(`[Firebase] Property: ${name} = ${value}`);
  },
};
