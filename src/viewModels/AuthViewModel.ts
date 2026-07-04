import { useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { isValidEmail, isValidPassword } from '../utils/validationUtils';
import { AuthService } from '../services/AuthService';

interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthViewModel {
  login: (email: string, password: string) => void;
  signup: (data: SignupPayload) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useAuthViewModel = (): AuthViewModel => {
  const { login, isLoading, error } = useAuth();

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
      const validationError = validateLogin(email, password);
      if (validationError) {
        return;
      }

      login(email, password);
    },
    [login, validateLogin],
  );

  const signup = useCallback(async (data: SignupPayload): Promise<void> => {
    await AuthService.signup(data);
  }, []);

  return {
    login: handleLogin,
    signup,
    isLoading,
    error,
  };
};
