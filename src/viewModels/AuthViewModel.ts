import { useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { isValidEmail, isValidPassword } from '../utils/validationUtils';
import { AuthService } from '../services/AuthService';

export const useAuthViewModel = () => {
  const { login, isLoading, error, clearError } = useAuth();

  const validateLogin = useCallback((email: string, password: string) => {
    if (!isValidEmail(email)) return 'Invalid email address';
    if (!isValidPassword(password)) return 'Password must be at least 8 characters';
    return null;
  }, []);

  const handleLogin = useCallback(
    (email: string, password: string) => {
      const validationError = validateLogin(email, password);
      if (validationError) {
        // Validation error will be displayed in the UI
        return;
      }
      login(email, password);
    },
    [login, validateLogin],
  );

  const signup = useCallback(
    async (data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }) => {
      await AuthService.signup(data);
    },
    [],
  );

  return {
    login: handleLogin,
    signup,
    isLoading,
    error,
  };
};
