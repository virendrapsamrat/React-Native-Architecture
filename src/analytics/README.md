# Analytics

Event tracking integrations for Firebase and Mixpanel.

## Files

| File | Purpose |
|------|---------|
| `FirebaseAnalytics.ts` | Firebase Analytics event logging |
| `Mixpanel.ts` | Mixpanel event tracking |
| `EventTracker.ts` | Unified facade for both providers |

## Usage

```tsx
import { EventTracker } from '../analytics/EventTracker';

EventTracker.trackScreenView('Home');
EventTracker.trackLogin('email');
EventTracker.trackProductView(product.id);
```

## Integration

Replace stub implementations with:
- `@react-native-firebase/analytics` for Firebase
- `mixpanel-react-native` for Mixpanel

Toggle via `config/featureFlags.ts` → `enableAnalytics`.
