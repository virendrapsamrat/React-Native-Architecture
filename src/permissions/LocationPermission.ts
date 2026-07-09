import { logger } from '@/utils/logger';

export const requestLocationPermission = async (): Promise<boolean> => {
  logger.info('Requesting location permission');
  // Integrate with expo-location
  return true;
};

export const checkLocationPermission = async (): Promise<boolean> => {
  return true;
};
