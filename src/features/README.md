# Features

Feature folders own route-level screens and feature-specific logic. This keeps the app organized by product area instead of keeping all screens in one global folder.

## Current features

- `auth`: login, signup, auth hooks, auth service, and auth state
- `home`: Hacker News home feed screen
- `profile`: profile screen composition
- `settings`: settings screen, theme toggle, notification toggle, logout, and language switching

## Recommended structure

```txt
src/features/<feature>/
  index.ts
  screens/
  hooks/
  services/
  store/
  types.ts
```

Only create folders a feature actually needs. Export the public feature surface from `index.ts` so navigation and other modules do not import deep implementation paths.
