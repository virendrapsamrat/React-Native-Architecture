import { Platform as RNPlatform } from 'react-native';
import {
  DataCollectionLevel,
  Dynatrace,
  EventData,
  UserPrivacyOptions,
} from '@dynatrace/react-native-plugin';
import { featureFlags } from '@/config/featureFlags';
import { logger } from '@/utils/logger';

type DynatraceEventValue = string | number | boolean;

const sanitizePropertyName = (key: string) =>
  key
    .replace(/[^a-zA-Z0-9_.]/g, '_')
    .replace(/_+/g, '_')
    .replace(/\.+/g, '.')
    .replace(/(^[^a-zA-Z]+|[^a-zA-Z0-9]+$)/g, '') || 'value';

const isDynatraceEnabled = () =>
  featureFlags.enableAnalytics &&
  featureFlags.enableDynatrace &&
  RNPlatform.OS !== 'web';

const runSafely = (operation: () => void) => {
  if (!isDynatraceEnabled()) return;

  try {
    operation();
  } catch (error) {
    logger.warn('[Dynatrace] Operation failed', error);
  }
};

export const DynatraceAnalytics = {
  trackScreenView: (screenName: string) => {
    runSafely(() => {
      Dynatrace.startView(screenName);
    });
  },

  trackEvent: (eventName: string, properties?: Record<string, unknown>) => {
    runSafely(() => {
      const event = new EventData().addEventProperty(
        'event_properties.event_name',
        eventName,
      );

      Object.entries(properties ?? {}).forEach(([key, value]) => {
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          event.addEventProperty(
            `event_properties.${sanitizePropertyName(key)}`,
            value as DynatraceEventValue,
          );
        }
      });

      Dynatrace.sendEvent(event);
    });
  },

  identifyUser: (userId: string) => {
    runSafely(() => {
      Dynatrace.identifyUser(userId);
    });
  },

  resetUser: () => {
    runSafely(() => {
      Dynatrace.endSession();
    });
  },

  reportError: (error: Error, context = 'UnhandledError') => {
    runSafely(() => {
      Dynatrace.reportErrorStacktrace(
        context,
        error.message,
        context,
        error.stack ?? 'No stack trace available',
      );
    });
  },

  applyPrivacyOptions: (
    dataCollectionLevel: DataCollectionLevel,
    crashReportingOptedIn: boolean,
  ) => {
    runSafely(() => {
      Dynatrace.applyUserPrivacyOptions(
        new UserPrivacyOptions(dataCollectionLevel, crashReportingOptedIn),
      );
    });
  },
};

export { DataCollectionLevel };
