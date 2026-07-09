import { useCallback, useState } from 'react';
import { useAuth } from './useAuth';
import { isValidEmail, isValidPassword } from '@/utils/validationUtils';
import type { AuthViewModel, SignupPayload } from '@/features/auth/types';

export const useAuthViewModel = (): AuthViewModel => {
  const { login, signup, isLoading, error, clearError: clearAuthError } = useAuth();
  const [validationError, setValidationError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setValidationError(null);
    clearAuthError();
  }, [clearAuthError]);

  const validateLogin = useCallback((email: string, password: string): string | null => {
    if (!isValidEmail(email)) {
      return 'Invalid email address';
    }

    if (!isValidPassword(password)) {
      return 'Password must be at least 8 characters';
    }

    return null;
  }, []);

  const handleLogin = useCallback(
    (email: string, password: string): void => {
      const nextValidationError = validateLogin(email, password);

      if (nextValidationError) {
        setValidationError(nextValidationError);
        return;
      }

      setValidationError(null);
      login(email, password);
    },
    [login, validateLogin],
  );

  const handleSignup = useCallback(
    (data: SignupPayload): void => {
      setValidationError(null);
      signup(data);
    },
    [signup],
  );

  return {
    login: handleLogin,
    signup: handleSignup,
    clearError,
    isLoading,
    error: validationError ?? error,
  };
};
