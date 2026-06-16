import Constants from 'expo-constants';

const appName =
  Constants.manifest?.name ??
  Constants.expoConfig?.name ??
  'RN Architecture App';

export const brandConfig = {
  appName,
};
