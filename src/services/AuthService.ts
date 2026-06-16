import ApiClient from './api/ApiClient';
import { Endpoints } from './api/Endpoints';
import type { ApiResponse } from '../types/ApiResponse';
import type { AuthUser } from '../types/User';

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await ApiClient.post<ApiResponse<AuthUser>>(
      Endpoints.AUTH.LOGIN,
      { email, password },
    );
    return response.data;
  },

  signup: async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    const response = await ApiClient.post<ApiResponse<AuthUser>>(
      Endpoints.AUTH.SIGNUP,
      data,
    );
    return response.data;
  },

  logout: async () => {
    const response = await ApiClient.post(Endpoints.AUTH.LOGOUT);
    return response.data;
  },
};
