import { logger } from '@/utils/logger';
import { featureFlags } from '@/config/featureFlags';

export const Mixpanel = {
  track: (event: string, properties?: Record<string, unknown>) => {
    if (!featureFlags.enableAnalytics) return;
    logger.info(`[Mixpanel] Track: ${event}`, properties);
    // Integrate with mixpanel-react-native
  },

  identify: (userId: string) => {
    if (!featureFlags.enableAnalytics) return;
    logger.info(`[Mixpanel] Identify: ${userId}`);
  },

  reset: () => {
    if (!featureFlags.enableAnalytics) return;
    logger.info('[Mixpanel] Reset');
  },
};
