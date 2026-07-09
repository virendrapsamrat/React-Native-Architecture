# Navigation

Navigation is built with React Navigation and is responsible for switching between auth and main app flows.

## Main pieces

- `AppNavigator.tsx` selects the root flow based on auth state.
- `AuthNavigator.tsx` hosts auth feature screens: Login and Signup.
- `BottomTabNavigator.tsx` hosts main feature screens: Home, Profile, and Settings.
- `RouteNames.tsx` centralizes route constants.

## Flow

Unauthenticated users see the auth stack. Authenticated users see the main tab stack.

## Import rule

Navigators should import screens from feature barrels, for example `../features/home`, instead of reaching into screen files directly. Keep navigation focused on route composition, tab options, and flow selection.

`App.tsx` keys `AppNavigator` by the selected language so changing the locale remounts navigation and refreshes translated tab labels.
