export const featureFlags = {
  enablePushNotifications: true,
  enableAnalytics: true,
  enableDynatrace: process.env.EXPO_PUBLIC_DYNATRACE_ENABLED === 'true',
  enableDarkMode: true,
  enableBiometricAuth: false,
  enableOfflineMode: false,
} as const;
