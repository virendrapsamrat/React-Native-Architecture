import { logger } from '../utils/logger';

export const requestCameraPermission = async (): Promise<boolean> => {
  logger.info('Requesting camera permission');
  // Integrate with expo-camera
  return true;
};

export const checkCameraPermission = async (): Promise<boolean> => {
  return true;
};
