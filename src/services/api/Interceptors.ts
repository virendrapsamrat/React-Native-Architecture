import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { storageUtils } from '../../utils/storageUtils';
import { logger } from '../../utils/logger';
import { devAuthAdapter } from '../../features/auth/services/devAuthAdapter';

export const setupRequestInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await storageUtils.getAuthToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      logger.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => Promise.reject(error),
  );
};

export const setupResponseInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      const config = error.config as InternalAxiosRequestConfig;

      if (config) {
        const devLoginResponse = devAuthAdapter.handleLogin(config, error.response?.headers);
        if (devLoginResponse) {
          return devLoginResponse;
        }

        const devLogoutResponse = devAuthAdapter.handleLogout(config, error.response?.headers);
        if (devLogoutResponse) {
          return devLogoutResponse;
        }
      }

      logger.error(`API Error [${status}]:`, error.message);

      if (status === 401) {
        await storageUtils.clearAuthData();
      }

      return Promise.reject(error);
    },
  );
};
