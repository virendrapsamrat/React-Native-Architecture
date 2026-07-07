import authReducer, { logoutUser, setUser } from '../authSlice';
import { AuthService } from '../../services/authService';
import { storageUtils } from '../../../../utils/storageUtils';
import type { AuthState } from '../../types';
import type { AuthUser } from '../../../../types/User';

jest.mock('../../services/authService', () => ({
  AuthService: {
    logout: jest.fn(),
  },
}));

jest.mock('../../../../utils/storageUtils', () => ({
  storageUtils: {
    clearAuthData: jest.fn(),
  },
}));

const user: AuthUser = {
  id: '1',
  email: 'user@example.com',
  firstName: 'Test',
  lastName: 'User',
  token: 'token',
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
    const state = authReducer(undefined, setUser(user));

    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBeNull();
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
      isAuthenticated: true,
      isLoading: true,
      error: null,
    };

    const state = authReducer(authenticatedState, {
      type: logoutUser.rejected.type,
    });

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });
});
