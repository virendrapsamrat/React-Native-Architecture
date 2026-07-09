# RN Architecture App

This repository is a React Native + Expo TypeScript starter that follows a feature-first layered architecture for scalable app development. Navigation, shared state, services, and reusable UI stay centralized, while route-level screens live inside their owning feature modules.

## Current architecture at a glance

- App bootstrap starts in `src/App.tsx`.
- The app restores persisted theme, language, and auth state before rendering navigation.
- Authenticated users enter the main tab flow; unauthenticated users go to the auth flow.
- Screens live under `src/features/<feature>/screens` and stay focused on UI composition.
- Screen-specific logic is delegated to feature hooks where applicable.
- Remote data is handled through service modules and React Query.
- Local persistence uses storage helpers for theme, auth, and user data.
- Language changes are confirmed in Settings, saved, and applied by remounting the navigator with the selected locale.

## Request flow

1. App startup loads persisted settings, locale, and auth data.
2. `AppNavigator` decides whether to show `AuthNavigator` or `BottomTabNavigator`.
3. `AuthNavigator` routes to auth feature screens.
4. `BottomTabNavigator` routes to home, profile, and settings feature screens.
5. Feature screens use hooks, services, Redux, and React Query to render current state.
6. Settings language changes update i18n, persist the locale, and remount navigation so visible labels refresh.

## Main folders

- `src/App.tsx` for providers, startup restore, and app readiness
- `src/navigation` for root, auth, and tab navigation composition
- `src/features` for domain modules and feature-owned screens
- `src/services` for API and integration layers
- `src/store` for Redux slices and store configuration
- `src/components` for reusable UI building blocks
- `src/theme`, `src/localization`, `src/config`, and `src/storage` for app-wide support

## Feature layout

New feature work should follow this shape when the feature needs those pieces:

```txt
src/features/<feature>/
  index.ts
  screens/
  hooks/
  services/
  store/
  types.ts
```

Current feature screens:

- `src/features/auth/screens/LoginScreen`
- `src/features/auth/screens/SignupScreen`
- `src/features/home/screens/HomeScreen`
- `src/features/profile/screens/ProfileScreen`
- `src/features/settings/screens/SettingsScreen`

Current feature hooks:

- `src/features/auth/hooks/useAuthViewModel`
- `src/features/home/hooks/useHomeViewModel`
- `src/features/profile/hooks/useProfileViewModel`

## Import aliases

Use `@/` for imports that cross folders under `src`:

```ts
import { Button } from '@/components/atoms/Button';
import { useHomeViewModel } from '@/features/home/hooks/useHomeViewModel';
```

Keep `./` imports for files in the same local folder, such as styles or index exports. The alias is configured in `tsconfig.json`, `babel.config.js`, and `jest.config.js`.

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

Update branding, environment variables, navigation routes, translations, and feature modules before using this project as a starter for a new app.
