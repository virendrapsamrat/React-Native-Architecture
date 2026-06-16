# Context

React Context providers for cross-cutting concerns.

## Providers

| File | Purpose |
|------|---------|
| `AuthContext.tsx` | Auth state wrapper around `useAuth` hook |
| `ThemeContext.tsx` | Re-exports `ThemeProvider` from theme module |

## Usage

```tsx
// App.tsx
<AuthProvider>
  <AppNavigator />
</AuthProvider>

// In components
import { useAuthContext } from '../context/AuthContext';
const { isAuthenticated, logout } = useAuthContext();
```

## Guidelines

- Prefer Redux for global app state
- Use Context for providers that wrap the component tree (auth, theme)
- Keep context values minimal to avoid unnecessary re-renders
