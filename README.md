# RN Architecture App

This repository is a React Native + Expo TypeScript starter that follows a layered architecture for scalable app development. The app is organized around navigation, state, services, screens, and reusable UI components.

## Current architecture at a glance

- App bootstrap starts in src/App.tsx.
- The app restores persisted theme and auth state before rendering navigation.
- Authenticated users enter the main tab flow; unauthenticated users go to the auth flow.
- Screens are kept thin and delegate business logic to view models where applicable.
- Remote data is handled through service modules and React Query.
- Local persistence uses storage helpers for theme, auth, and user data.

## Request flow

1. App startup loads persisted settings and auth data.
2. AppNavigator decides whether to show AuthNavigator or BottomTabNavigator.
3. AuthNavigator handles login/signup screens.
4. BottomTabNavigator routes to Home, Profile, and Settings.
5. Screens use view models and services to fetch or update data.
6. Redux stores app-wide state and React Query caches server data.

## Main folders

- src/app entry, providers, and startup logic
- src/navigation for route and tab composition
- src/features for domain-specific modules such as auth
- src/screens for screen-level UI
- src/viewModels for screen/business logic
- src/services for API and integration layers
- src/store for Redux slices and store configuration
- src/components for reusable UI building blocks
- src/theme, localization, config, and storage for app-wide support

## Development commands

```bash
npm install
npm start
npm run ios
npm run android
npm run web
npm run test
npm run lint
npm run typecheck
```

## Notes for customization

Update branding, environment variables, navigation routes, and feature modules before using this project as a starter for a new app.
