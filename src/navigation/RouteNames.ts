export const RouteNames = {
  AUTH: {
    LOGIN: 'Login' as const,
    SIGNUP: 'Signup' as const,
  },
  MAIN: {
    HOME: 'Home' as const,
    PROFILE: 'Profile' as const,
    SETTINGS: 'Settings' as const,
  },
  ROOT: {
    AUTH: 'Auth' as const,
    MAIN: 'Main' as const,
  },
} as const;
