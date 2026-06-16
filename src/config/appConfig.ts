import { AppConstants } from '../constants/AppConstants';
import { brandConfig } from './brandConfig';

export const appConfig = {
  name: brandConfig.appName ?? AppConstants.APP_NAME,
  version: AppConstants.APP_VERSION,
  defaultLanguage: AppConstants.DEFAULT_LANGUAGE,
  supportedLanguages: AppConstants.SUPPORTED_LANGUAGES,
  paginationLimit: AppConstants.PAGINATION_LIMIT,
  apiTimeout: AppConstants.API_TIMEOUT,
} as const;
