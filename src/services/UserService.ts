import ApiClient from './api/ApiClient';
import { Endpoints } from './api/Endpoints';
import type { ApiResponse } from '../types/ApiResponse';
import type { User } from '../types/User';
import type { Profile } from '../types/Profile';

export const UserService = {
  getProfile: async () => {
    const response = await ApiClient.get<ApiResponse<Profile>>(
      Endpoints.USER.PROFILE,
    );
    return response.data;
  },

  updateProfile: async (data: Partial<Profile>) => {
    const response = await ApiClient.put<ApiResponse<Profile>>(
      Endpoints.USER.UPDATE,
      data,
    );
    return response.data;
  },

  getUser: async (id: string) => {
    const response = await ApiClient.get<ApiResponse<User>>(
      `${Endpoints.USER.PROFILE}/${id}`,
    );
    return response.data;
  },
};
