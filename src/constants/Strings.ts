import { brandConfig } from '../config/brandConfig';

export const Strings = {
  appName: brandConfig.appName ?? 'RN Architecture App',
  login: 'Login',
  signup: 'Sign Up',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  forgotPassword: 'Forgot Password?',
  home: 'Home',
  profile: 'Profile',
  settings: 'Settings',
  logout: 'Logout',
  loading: 'Loading...',
  error: 'Something went wrong',
  retry: 'Retry',
  search: 'Search',
  save: 'Save',
  cancel: 'Cancel',
} as const;
