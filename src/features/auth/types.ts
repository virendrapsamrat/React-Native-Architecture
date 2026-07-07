import type { AuthUser } from '../../types/User';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthViewModel {
  login: (email: string, password: string) => void;
  signup: (data: SignupPayload) => void;
  clearError: () => void;
  isLoading: boolean;
  error: string | null;
}
