# RN Architecture App

A production-ready React Native (Expo + TypeScript) starter with a scalable, feature-based architecture.

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
| i18n | i18n-js + expo-localization |
| Storage | AsyncStorage + Expo SecureStore |

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
```

## Project Conventions

- **Atomic Design**: Components follow atoms → molecules → organisms → templates hierarchy
- **MVVM**: Screens use ViewModels for business logic, keeping UI components thin
- **Feature slices**: Redux state is organized by feature (auth, user, profile, settings)
- **Barrel exports**: Each component folder has an `index.ts` for clean imports

## Folder Documentation

Each module has its own `README.md` with detailed usage guidelines. See the `src/` directory.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server |
| `npm run ios` | Run on iOS |
| `npm run android` | Run on Android |
| `npm run web` | Run on web |

## License

MIT
