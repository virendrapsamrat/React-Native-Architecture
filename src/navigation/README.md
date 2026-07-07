# Navigation

Navigation is built with React Navigation and is responsible for switching between auth and main app flows.

## Main pieces

- AppNavigator.tsx selects the root flow based on auth state.
- AuthNavigator.tsx hosts login and signup screens.
- BottomTabNavigator.tsx hosts Home, Profile, and Settings.
- RouteNames.tsx centralizes route constants.

## Flow

Unauthenticated users see the auth stack. Authenticated users see the main tab stack.
