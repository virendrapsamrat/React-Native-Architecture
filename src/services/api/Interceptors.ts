import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { storageUtils } from '../../utils/storageUtils';
import { logger } from '../../utils/logger';
import type { ApiResponse } from '../../types/ApiResponse';
import type { AuthUser } from '../../types/User';

// Test credentials for development
const TEST_CREDENTIALS = {
  email: 'test@example.com',
  password: 'Password123',
};

const generateMockAuthResponse = (): AuthUser => ({
  id: '1',
  email: TEST_CREDENTIALS.email,
  firstName: 'Test',
  lastName: 'User',
  token: 'mock-jwt-token-' + Date.now(),
  refreshToken: 'mock-refresh-token-' + Date.now(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

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

      // Mock login endpoint for test credentials
      if (config?.method === 'post' && config.url?.includes('/auth/login')) {
        try {
          const data = JSON.parse(config.data || '{}');
          if (
            data.email === TEST_CREDENTIALS.email &&
            data.password === TEST_CREDENTIALS.password
          ) {
            logger.debug('✓ Test credentials accepted (mock auth)');
            const mockResponse: AxiosResponse<ApiResponse<AuthUser>> = {
              data: {
                success: true,
                data: generateMockAuthResponse(),
                message: 'Mock authentication successful',
              },
              status: 200,
              statusText: 'OK',
              headers: error.response?.headers || {},
              config: config,
            };
            return mockResponse;
          }
        } catch (e) {
          logger.debug('Mock auth check failed:', e);
        }
      }

      // Mock logout endpoint
      if (config?.method === 'post' && config.url?.includes('/auth/logout')) {
        logger.debug('✓ Mock logout successful');
        const mockResponse: AxiosResponse<ApiResponse<{ message: string }>> = {
          data: {
            success: true,
            data: { message: 'Logout successful' },
            message: 'Logged out successfully',
          },
          status: 200,
          statusText: 'OK',
          headers: error.response?.headers || {},
          config: config,
        };
        return mockResponse;
      }

      logger.error(`API Error [${status}]:`, error.message);

      if (status === 401) {
        await storageUtils.clearAll();
      }

      return Promise.reject(error);
    },
  );
};
