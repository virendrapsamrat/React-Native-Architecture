import authReducer, { loginUser, logoutUser, setSession } from '@/features/auth/store/authSlice';
import { AuthService } from '@/features/auth/services/authService';
import { storageUtils } from '@/utils/storageUtils';
import type { AuthState } from '@/features/auth/types';
import type { User } from '@/types/User';

jest.mock('../../services/authService', () => ({
  AuthService: {
    login: jest.fn(),
    logout: jest.fn(),
  },
}));

jest.mock('../../../../utils/storageUtils', () => ({
  storageUtils: {
    clearAuthData: jest.fn(),
    saveAuthToken: jest.fn(),
    saveRefreshToken: jest.fn(),
    saveUserData: jest.fn(),
  },
}));

const user: User = {
  id: '1',
  email: 'user@example.com',
  firstName: 'Test',
  lastName: 'User',
  createdAt: '2026-07-04T00:00:00.000Z',
  updatedAt: '2026-07-04T00:00:00.000Z',
};

describe('authSlice', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('marks the user authenticated when restored from storage', () => {
    const state = authReducer(undefined, setSession({
      user,
      token: 'token',
      refreshToken: 'refresh-token',
    }));

    expect(state.user).toEqual(user);
    expect(state.token).toBe('token');
    expect(state.refreshToken).toBe('refresh-token');
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBeNull();
  });

  it('stores login session with tokens outside the user object', async () => {
    (AuthService.login as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: {
        ...user,
        token: 'token',
        refreshToken: 'refresh-token',
      },
    });

    const loginAction = await loginUser(
      { email: 'user@example.com', password: 'Password123' },
    )(dispatch, getState, undefined);
    const state = authReducer(undefined, loginAction);

    expect(state.user).toEqual(user);
    expect(state.token).toBe('token');
    expect(state.refreshToken).toBe('refresh-token');
    expect(state.isAuthenticated).toBe(true);
    expect(storageUtils.saveAuthToken).toHaveBeenCalledWith('token');
    expect(storageUtils.saveRefreshToken).toHaveBeenCalledWith('refresh-token');
    expect(storageUtils.saveUserData).toHaveBeenCalledWith(user);
  });

  it('clears local auth data even when remote logout fails', async () => {
    (AuthService.logout as jest.Mock).mockRejectedValueOnce(new Error('offline'));

    const action = await logoutUser()(dispatch, getState, undefined);

    expect(action.type).toBe(logoutUser.rejected.type);
    expect(storageUtils.clearAuthData).toHaveBeenCalledTimes(1);
  });

  it('clears auth state after logout rejection', () => {
    const authenticatedState: AuthState = {
      user,
      token: 'token',
      refreshToken: 'refresh-token',
      isAuthenticated: true,
      isLoading: true,
      error: null,
    };

    const state = authReducer(authenticatedState, {
      type: logoutUser.rejected.type,
    });

    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });
});
