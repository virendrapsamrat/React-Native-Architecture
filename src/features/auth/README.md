# Auth Feature

The auth feature owns authentication screens, auth-specific hooks, service adapters, types, and auth Redux state.

## Main pieces

- `screens/LoginScreen`: login route UI
- `screens/SignupScreen`: signup route UI
- `hooks/useAuth.ts`: auth state/actions facade
- `hooks/useAuthViewModel.ts`: login/signup screen behavior
- `services/authService.ts`: auth service boundary
- `services/devAuthAdapter.ts`: development auth behavior
- `store/authSlice.ts`: auth Redux state
- `types.ts`: auth feature types

Import shared auth exports from `src/features/auth` when possible.
