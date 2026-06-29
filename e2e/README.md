# E2E Tests (Detox)

End-to-end tests run against native iOS/Android builds. Detox does not work with Expo Go.

## Prerequisites

- Node.js 20.19.4+
- Xcode with an iOS simulator (for iOS tests)
- Android Studio with an AVD (for Android tests)
- Native projects generated via Expo prebuild

## First-time setup

```bash
# Install dependencies (already in package.json)
npm install

# Generate native ios/ and android/ folders with Detox plugin applied
npm run e2e:prebuild

# iOS only: install CocoaPods
npx pod-install
```

Configure your Android emulator name if it differs from the default (`Pixel_6_API_34`):

```bash
export DETOX_ANDROID_AVD=Your_AVD_Name
```

Configure iOS scheme if prebuild produces a different name (default: `rnarchitectureapp`):

```bash
export DETOX_IOS_SCHEME=your-xcode-scheme
```

## Running tests

E2E builds inject `EXPO_PUBLIC_API_URL=https://dummyjson.com` so the Home screen product API works during tests. Auth uses the built-in mock credentials from `src/tests/mocks/`.

```bash
# iOS: build app + run tests
npm run e2e:ios

# Android: build app + run tests (start emulator first)
npm run e2e:android

# Or run build and test separately
npm run e2e:build:ios && npm run e2e:test:ios
npm run e2e:build:android && npm run e2e:test:android
```

## Test IDs

UI elements are located via `testID` props defined in `src/constants/TestIds.ts`. When adding new screens or flows, add IDs there and wire them through atoms/molecules (e.g. `Button`, `FormField`, `SearchBar`).

## Structure

```
e2e/
├── auth.flow.e2e.ts   # Login, tab navigation, logout flows
└── jest.config.js     # Detox Jest runner config
```

Detox configuration lives in `.detoxrc.js` at the project root.

## Troubleshooting

- **App binary not found**: Run `npm run e2e:prebuild` first, then `npm run e2e:build:*`.
- **Wrong emulator**: Set `DETOX_ANDROID_AVD` to a name from `emulator -list-avds`.
- **Network errors on Home**: Ensure the E2E build env includes a reachable API URL (configured in `.detoxrc.js`).
- **Peer dependency warning for expo-detox-config-plugin**: Install with `npm install --legacy-peer-deps` (plugin targets Expo SDK 54+; SDK 56 is supported).
