import { brandConfig } from '../config/brandConfig';

export const AppConstants = {
  APP_NAME: brandConfig.appName ?? 'RN Architecture App',
  APP_VERSION: '1.0.0',
  DEFAULT_LANGUAGE: 'en',
  SUPPORTED_LANGUAGES: ['en', 'es', 'hi', 'te'] as const,
  API_TIMEOUT: 30000,
  DEBOUNCE_DELAY: 300,
  PAGINATION_LIMIT: 20,
} as const;
