import { logoutCoordinator } from '@/utils/logoutCoordinator';

describe('logoutCoordinator', () => {
  it('notifies registered handlers once', () => {
    const handler = jest.fn();
    const unregister = logoutCoordinator.registerHandler(handler);

    logoutCoordinator.triggerLogout();

    expect(handler).toHaveBeenCalledTimes(1);

    unregister();
    logoutCoordinator.triggerLogout();

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
