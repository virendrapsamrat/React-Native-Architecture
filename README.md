# RN Architecture App

A production-ready React Native (Expo + TypeScript) starter with a scalable, feature-based architecture.

> This repository is designed to work as a reusable boilerplate/template for new React Native apps.

## Boilerplate / Template Usage

### Option 1: Use as a GitHub template

1. Mark this repository as a template in GitHub settings.
2. Use **Use this template** to create a new repository.
3. Clone the new repository and update the app metadata.

### Option 2: Clone and reuse directly

```bash
git clone https://github.com/<your-org>/rn-architecture-app.git my-new-app
cd my-new-app
npm install
```

Then customize the app name, bundle IDs, API URLs, and branding.

## What this template includes

- Expo + React Native starter setup
- TypeScript support
- React Navigation with bottom tabs + native stack
- Redux Toolkit state management
- React Query v5 for API caching and data fetching
- MVVM-style ViewModels
- Feature-based folder structure
- Localization support for `en`, `hi`, `te`
- Analytics + notifications service hooks
- Secure storage and async storage utilities for auth persistence
- Permission manager modules
- Organized README docs inside `src/`

## Architecture Overview

```
src/
├── assets/          # Static assets (images, icons, fonts, animations)
├── components/      # Atomic Design UI components
├── screens/         # Screen-level views
├── navigation/      # React Navigation setup
├── viewModels/      # Screen business logic (MVVM pattern)
├── services/        # API & external service layer
├── store/           # Redux Toolkit state management
├── hooks/           # Custom React hooks
├── utils/           # Pure utility functions
├── constants/       # App-wide constants
├── types/           # TypeScript type definitions
├── theme/           # Light/dark theme system
├── localization/    # i18n translations (en, hi, te)
├── context/         # React Context providers
├── permissions/     # Device permission handlers
├── storage/         # Local & secure storage
├── analytics/       # Analytics integrations
├── notifications/   # Push notification handlers
├── config/          # Environment & feature flags
└── tests/           # Unit, integration tests & mocks
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native (Expo SDK 56) |
| Language | TypeScript |
| Navigation | React Navigation v7 |
| State | Redux Toolkit |
| API | Axios |
| State Management | Redux Toolkit |
| Data Fetching | React Query v5 |
| i18n | i18n-js + expo-localization |
| Storage | AsyncStorage + Expo SecureStore (auth token saved securely) |

## Getting Started

```bash
cd rn-architecture-app
npm install
npm start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

## Environment Variables

Create a `.env` file in the project root:

```
EXPO_PUBLIC_API_URL=https://your-api.com
EXPO_PUBLIC_ENV=development
EXPO_PUBLIC_BRAND=default
EXPO_PUBLIC_APP_NAME=My App
EXPO_PUBLIC_APP_SLUG=my-app
EXPO_PUBLIC_APP_ICON=./assets/icon.png
EXPO_PUBLIC_SPLASH_IMAGE=./assets/splash-icon.png
EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER=com.example.myapp
EXPO_PUBLIC_ANDROID_PACKAGE=com.example.myapp
```

### White-label / brand builds

This project supports per-brand Expo configuration through `app.config.ts`.
- Set `EXPO_PUBLIC_BRAND` to the brand key you want to use.
- Add brand metadata under `brandMeta` in `app.config.ts`.
- Override any default value with the `EXPO_PUBLIC_*` variables.

Example build commands:

```bash
EXPO_PUBLIC_BRAND=default npm run start
EXPO_PUBLIC_BRAND=default npm run build:brand:ios
EXPO_PUBLIC_BRAND=default npm run build:brand:android
```

## Project Conventions

- **Atomic Design**: Components follow atoms → molecules → organisms → templates hierarchy
- **MVVM**: Screens use ViewModels for business logic, keeping UI components thin
- **Feature slices**: Redux state is organized by feature (auth, user, profile, settings)
- **Barrel exports**: Each component folder has an `index.ts` for clean imports

## Template customization checklist

- Update `app.json` metadata: `name`, `slug`, `version`, icon files
- Update `package.json` `name` and version if needed
- Replace `src/localization/*` strings and translations, especially `appName`
- Replace hard-coded app labels in `src/constants/AppConstants.ts` and `src/constants/Strings.ts`
- Update API endpoints and `.env` settings
- Rename analytics / notification configs if needed
- Remove sample screens or add your own feature screens
- Check `src/navigation` for route names and flows

## Folder Documentation

Each module has its own `README.md` with detailed usage guidelines. See the `src/` directory.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server |
| `npm run ios` | Run on iOS |
| `npm run android` | Run on Android |
| `npm run web` | Run on web |

## Commit Rules

This project uses [Husky](https://typicode.github.io/husky/) and [Commitlint](https://commitlint.js.org/) to enforce conventional commit messages. Your commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

Example: `feat: add new feature` or `fix: resolve crash on login`

## License

MIT
