# src directory

This folder contains the application implementation. It is structured so that each layer has a distinct responsibility:

- entry and app bootstrap
- navigation and routing
- feature modules and feature-owned screens
- feature hooks and reusable shared hooks
- services and storage
- shared UI, theme, localization, and constants

## Main flow

1. The app shell in `App.tsx` initializes Redux, React Query, theme, startup restore, and status bar handling.
2. `AppNavigator` chooses auth or main navigation from auth state.
3. Feature screens under `src/features/*/screens` compose shared UI and call feature hooks and services.
4. Redux stores app-wide settings/auth state and React Query manages remote data.
5. Localization is configured in `src/localization`; language changes remount the navigator so translated route labels and screens refresh.

## Suggested mental model

- UI layer: feature screens and shared components
- Logic layer: feature hooks and shared hooks
- Data layer: services, storage, Redux, and React Query
- Platform layer: navigation, permissions, notifications, localization, and analytics

## Folder guide

- `features`: domain-owned screens and feature logic
- `components`: reusable atomic UI pieces
- `navigation`: route composition only
- `hooks`: generic reusable React hooks
- `services`: API and integration boundaries
- `store`: Redux store, slices, and typed hooks
- `localization`: translations and i18n helpers
