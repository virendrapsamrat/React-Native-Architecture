import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { storageUtils } from '../../utils/storageUtils';
import { logger } from '../../utils/logger';

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
      logger.error(`API Error [${status}]:`, error.message);

      if (status === 401) {
        await storageUtils.clearAll();
      }

      return Promise.reject(error);
    },
  );
};
