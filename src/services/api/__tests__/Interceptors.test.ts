import type { AxiosInstance } from 'axios';
import { setupResponseInterceptor } from '../Interceptors';
import { storageUtils } from '../../../utils/storageUtils';
import { logoutCoordinator } from '../../../utils/logoutCoordinator';

jest.mock('../../../utils/storageUtils', () => ({
  storageUtils: {
    getAuthToken: jest.fn(),
    clearAuthData: jest.fn(),
  },
}));

jest.mock('../../../utils/logoutCoordinator', () => ({
  logoutCoordinator: {
    triggerLogout: jest.fn(),
  },
}));

describe('setupResponseInterceptor', () => {
  it('triggers a coordinated logout when a 401 response is received', async () => {
    const registeredHandlers: Array<(error: unknown) => Promise<unknown>> = [];
    const client = {
      interceptors: {
        response: {
          use: jest.fn((_: unknown, errorHandler: (error: unknown) => Promise<unknown>) => {
            registeredHandlers.push(errorHandler);
            return 0;
          }),
        },
      },
    } as unknown as AxiosInstance;
    setupResponseInterceptor(client);

    await expect(
      registeredHandlers[0]({ response: { status: 401 }, config: { url: '/secure' } }),
    ).rejects.toMatchObject({ response: { status: 401 } });

    expect(storageUtils.clearAuthData).toHaveBeenCalled();
    expect(logoutCoordinator.triggerLogout).toHaveBeenCalled();
  });
});
