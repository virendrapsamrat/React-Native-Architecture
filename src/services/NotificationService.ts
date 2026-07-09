import ApiClient from './api/ApiClient';
import { Endpoints } from './api/Endpoints';
import type { ApiResponse } from '@/types/ApiResponse';

export const NotificationService = {
  registerDevice: async (token: string) => {
    const response = await ApiClient.post<ApiResponse<void>>(
      Endpoints.NOTIFICATIONS.REGISTER,
      { token },
    );
    return response.data;
  },

  getNotifications: async () => {
    const response = await ApiClient.get(Endpoints.NOTIFICATIONS.LIST);
    return response.data;
  },
};
