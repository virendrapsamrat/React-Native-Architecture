# src directory

This folder contains the application implementation. It is structured so that each layer has a distinct responsibility:

- entry and app bootstrap
- navigation and routing
- feature modules
- screens and view models
- services and storage
- shared UI, theme, localization, and constants

## Main flow

1. The app shell in App.tsx initializes providers.
2. AppNavigator chooses auth or main navigation.
3. Feature screens consume hooks, view models, and services.
4. Redux and React Query manage local and remote state.

## Suggested mental model

- UI layer: screens and components
- Logic layer: hooks, view models, and feature modules
- Data layer: services, storage, and Redux
- Platform layer: navigation, permissions, notifications, and analytics
