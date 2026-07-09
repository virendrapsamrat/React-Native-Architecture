import ApiClient from '@/services/api/ApiClient';
import { Endpoints } from '@/services/api/Endpoints';
import type { ApiResponse } from '@/types/ApiResponse';
import type { AuthUser } from '@/types/User';
import type { LoginPayload, SignupPayload } from '@/features/auth/types';

export const AuthService = {
  login: async ({ email, password }: LoginPayload) => {
    const response = await ApiClient.post<ApiResponse<AuthUser>>(
      Endpoints.AUTH.LOGIN,
      { email, password },
    );
    return response.data;
  },

  signup: async (data: SignupPayload) => {
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
