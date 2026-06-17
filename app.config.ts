import { ConfigContext } from '@expo/config';
import type { ExpoConfig } from '@expo/config-types';

type SplashConfig = {
  image?: string;
  resizeMode?: 'cover' | 'contain';
  backgroundColor?: string;
  [k: string]: unknown;
};

type BrandMeta = {
  name: string;
  slug: string;
  icon: string;
  splashImage: string;
  splashBackgroundColor: string;
  iosBundleIdentifier: string;
  androidPackage: string;
};

type DynamicExpoConfig = ExpoConfig & {
  splash?: SplashConfig;
};

const brand = process.env.EXPO_PUBLIC_BRAND ?? 'default';

const brandMeta: Record<string, BrandMeta> = {
  default: {
    name: 'RN Architecture App',
    slug: 'rn-architecture-app',
    icon: './assets/icon.png',
    splashImage: './assets/splash-icon.png',
    splashBackgroundColor: '#FFFFFF',
    iosBundleIdentifier: 'com.rnarchitecture.app',
    androidPackage: 'com.rnarchitecture.app',
  },
  // Add other brands here. Example:
  // brandA: {
  //   name: 'Brand A App',
  //   slug: 'brand-a-app',
  //   icon: './assets/brand-a/icon.png',
  //   splashImage: './assets/brand-a/splash.png',
  //   splashBackgroundColor: '#0A1F44',
  //   iosBundleIdentifier: 'com.brandA.rnapp',
  //   androidPackage: 'com.brandA.rnapp',
  // },
};

export default ({ config }: ConfigContext): DynamicExpoConfig => {
  const selectedBrand = brandMeta[brand] ?? brandMeta.default;

  return {
    ...config,
    name: process.env.EXPO_PUBLIC_APP_NAME ?? selectedBrand.name,
    slug: process.env.EXPO_PUBLIC_APP_SLUG ?? selectedBrand.slug,
    icon: process.env.EXPO_PUBLIC_APP_ICON ?? selectedBrand.icon,
    splash: {
      image: process.env.EXPO_PUBLIC_SPLASH_IMAGE ?? selectedBrand.splashImage,
      resizeMode: 'contain',
      backgroundColor: selectedBrand.splashBackgroundColor,
    },
    ios: {
      ...config.ios,
      bundleIdentifier:
        process.env.EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER ?? selectedBrand.iosBundleIdentifier,
    },
    android: {
      ...config.android,
      package: process.env.EXPO_PUBLIC_ANDROID_PACKAGE ?? selectedBrand.androidPackage,
    },
  };
};
