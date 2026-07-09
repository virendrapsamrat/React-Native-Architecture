import axios from 'axios';
import { env } from '@/config/env';
import { AppConstants } from '@/constants/AppConstants';

export const DemoApiClient = axios.create({
  baseURL: env.DEMO_API_BASE_URL,
  timeout: AppConstants.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
