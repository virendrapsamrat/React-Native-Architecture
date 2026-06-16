import React, { createContext, useContext, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, login, logout } = useAuth();

  const value = {
    isAuthenticated,
    login: useCallback(
      (email: string, password: string) => login(email, password),
      [login],
    ),
    logout: useCallback(() => logout(), [logout]),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
