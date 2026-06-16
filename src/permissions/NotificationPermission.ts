import { logger } from '../utils/logger';

export const requestNotificationPermission = async (): Promise<boolean> => {
  logger.info('Requesting notification permission');
  // Integrate with expo-notifications
  return true;
};

export const checkNotificationPermission = async (): Promise<boolean> => {
  return true;
};
