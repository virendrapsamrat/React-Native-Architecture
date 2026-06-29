const iosScheme = process.env.DETOX_IOS_SCHEME ?? 'rnarchitectureapp';
const e2eEnv =
  'EXPO_PUBLIC_API_URL=https://dummyjson.com EXPO_PUBLIC_ENV=e2e EXPO_PUBLIC_BRAND=default';

/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: `ios/build/Build/Products/Debug-iphonesimulator/${iosScheme}.app`,
      build: `${e2eEnv} xcodebuild -workspace ios/${iosScheme}.xcworkspace -scheme ${iosScheme} -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build`,
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: `ios/build/Build/Products/Release-iphonesimulator/${iosScheme}.app`,
      build: `${e2eEnv} xcodebuild -workspace ios/${iosScheme}.xcworkspace -scheme ${iosScheme} -configuration Release -sdk iphonesimulator -derivedDataPath ios/build`,
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: `${e2eEnv} cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug`,
      reversePorts: [8081],
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: `${e2eEnv} cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release`,
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: process.env.DETOX_IOS_DEVICE ?? 'iPhone 16',
      },
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: process.env.DETOX_ANDROID_AVD ?? 'Pixel_6_API_34',
      },
    },
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release',
    },
    'android.att.debug': {
      device: 'attached',
      app: 'android.debug',
    },
    'android.att.release': {
      device: 'attached',
      app: 'android.release',
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release',
    },
  },
};
