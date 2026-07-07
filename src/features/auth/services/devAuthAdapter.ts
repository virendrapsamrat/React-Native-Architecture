import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { logger } from '../../../utils/logger';
import type { ApiResponse } from '../../../types/ApiResponse';
import type { AuthUser } from '../../../types/User';

const TEST_CREDENTIALS = {
  email: 'test@example.com',
  password: 'Password123',
};

const isDevAuthEnabled = __DEV__;

const generateMockAuthResponse = (): AuthUser => ({
  id: '1',
  email: TEST_CREDENTIALS.email,
  firstName: 'Test',
  lastName: 'User',
  token: `mock-jwt-token-${Date.now()}`,
  refreshToken: `mock-refresh-token-${Date.now()}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const createAxiosResponse = <T>(
  data: ApiResponse<T>,
  config: InternalAxiosRequestConfig,
  headers: AxiosResponse['headers'] = {},
): AxiosResponse<ApiResponse<T>> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers,
  config,
});

export const devAuthAdapter = {
  handleLogin: (
    config: InternalAxiosRequestConfig,
    headers?: AxiosResponse['headers'],
  ): AxiosResponse<ApiResponse<AuthUser>> | null => {
    if (!isDevAuthEnabled || config.method !== 'post' || !config.url?.includes('/auth/login')) {
      return null;
    }

    try {
      const data = JSON.parse(config.data || '{}');

      if (data.email !== TEST_CREDENTIALS.email || data.password !== TEST_CREDENTIALS.password) {
        return null;
      }

      logger.debug('Development auth credentials accepted');

      return createAxiosResponse(
        {
          success: true,
          data: generateMockAuthResponse(),
          message: 'Development authentication successful',
        },
        config,
        headers,
      );
    } catch (error) {
      logger.debug('Development auth check failed:', error);
      return null;
    }
  },

  handleLogout: (
    config: InternalAxiosRequestConfig,
    headers?: AxiosResponse['headers'],
  ): AxiosResponse<ApiResponse<{ message: string }>> | null => {
    if (!isDevAuthEnabled || config.method !== 'post' || !config.url?.includes('/auth/logout')) {
      return null;
    }

    logger.debug('Development logout accepted');

    return createAxiosResponse(
      {
        success: true,
        data: { message: 'Logout successful' },
        message: 'Logged out successfully',
      },
      config,
      headers,
    );
  },
};
