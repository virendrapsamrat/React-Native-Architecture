export const env = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com',
  API_VERSION: process.env.EXPO_PUBLIC_API_VERSION !== undefined ? process.env.EXPO_PUBLIC_API_VERSION : 'v1',
  DEMO_API_BASE_URL: process.env.EXPO_PUBLIC_DEMO_API_URL ?? 'https://dummyjson.com',
  ENVIRONMENT: process.env.EXPO_PUBLIC_ENV ?? 'development',
  IS_DEV: __DEV__,
} as const;
