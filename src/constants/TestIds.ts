import { RouteNames } from '../navigation/RouteNames';

const prefix = (screen: string, id: string) => `${screen}-${id}`;

export const TestIds = {
  AUTH: {
    LOGIN_SCREEN: prefix(RouteNames.AUTH.LOGIN.toLowerCase(), 'screen'),
    EMAIL_INPUT: prefix(RouteNames.AUTH.LOGIN.toLowerCase(), 'email-input'),
    PASSWORD_INPUT: prefix(RouteNames.AUTH.LOGIN.toLowerCase(), 'password-input'),
    SUBMIT_BUTTON: prefix(RouteNames.AUTH.LOGIN.toLowerCase(), 'submit-button'),
    SIGNUP_LINK: prefix(RouteNames.AUTH.LOGIN.toLowerCase(), 'signup-link'),
  },
  MAIN: {
    HOME_SCREEN: prefix(RouteNames.MAIN.HOME.toLowerCase(), 'screen'),
    HOME_TITLE: prefix(RouteNames.MAIN.HOME.toLowerCase(), 'title'),
    SEARCH_INPUT: prefix(RouteNames.MAIN.HOME.toLowerCase(), 'search-input'),
    HOME_TAB: prefix('tab', RouteNames.MAIN.HOME.toLowerCase()),
    PROFILE_TAB: prefix('tab', RouteNames.MAIN.PROFILE.toLowerCase()),
    SETTINGS_TAB: prefix('tab', RouteNames.MAIN.SETTINGS.toLowerCase()),
  },
  SETTINGS: {
    SCREEN: prefix(RouteNames.MAIN.SETTINGS.toLowerCase(), 'screen'),
    LOGOUT_BUTTON: prefix(RouteNames.MAIN.SETTINGS.toLowerCase(), 'logout-button'),
  },
} as const;
