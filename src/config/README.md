# Config

Application configuration and feature flags.

## Files

| File | Purpose |
|------|---------|
| `env.ts` | Environment variables (API URL, environment name) |
| `appConfig.ts` | Static app settings (name, version, languages) |
| `featureFlags.ts` | Toggle features on/off |

## Environment Variables

Set in `.env` (loaded by Expo):

```
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_ENV=production
```

Access via `env.API_BASE_URL`.

## Feature Flags

```tsx
import { featureFlags } from '../config/featureFlags';

if (featureFlags.enableAnalytics) {
  EventTracker.trackScreenView('Home');
}
```

## Guidelines

- Never commit secrets to `env.ts` — use `.env` files
- Add `.env` to `.gitignore`
- Feature flags allow gradual rollouts without code changes
