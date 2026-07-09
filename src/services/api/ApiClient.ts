import axios from 'axios';
import { env } from '@/config/env';
import { AppConstants } from '@/constants/AppConstants';
import { setupRequestInterceptor, setupResponseInterceptor } from './Interceptors';

const baseURL = env.API_VERSION
  ? `${env.API_BASE_URL}/${env.API_VERSION}`
  : env.API_BASE_URL;

const ApiClient = axios.create({
  baseURL,
  timeout: AppConstants.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

setupRequestInterceptor(ApiClient);
setupResponseInterceptor(ApiClient);

export default ApiClient;
