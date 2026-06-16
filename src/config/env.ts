export const env = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com',
  API_VERSION: 'v1',
  ENVIRONMENT: process.env.EXPO_PUBLIC_ENV ?? 'development',
  IS_DEV: __DEV__,
} as const;
