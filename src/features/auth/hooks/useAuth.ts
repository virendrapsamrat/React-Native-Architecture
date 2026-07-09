import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearAuthError,
  loginUser,
  logoutUser,
  signupUser,
} from '@/features/auth/store/authSlice';
import type { LoginPayload, SignupPayload } from '@/features/auth/types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, refreshToken, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth,
  );

  const login = useCallback(
    (email: string, password: string) => dispatch(loginUser({ email, password } satisfies LoginPayload)),
    [dispatch],
  );

  const signup = useCallback(
    (payload: SignupPayload) => dispatch(signupUser(payload)),
    [dispatch],
  );

  const logout = useCallback(() => dispatch(logoutUser()), [dispatch]);

  const clearError = useCallback(() => dispatch(clearAuthError()), [dispatch]);

  return {
    user,
    token,
    refreshToken,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout,
    clearError,
  };
};
