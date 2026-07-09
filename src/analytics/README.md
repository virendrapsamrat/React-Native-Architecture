# Analytics

Analytics logic is isolated in this folder so instrumentation can be changed without touching screen code.

## What is here

- EventTracker.ts for shared event helpers
- FirebaseAnalytics.ts for Firebase-based analytics integration
- Mixpanel.ts for Mixpanel tracking
- DynatraceAnalytics.ts for Dynatrace RUM events, screen views, user tagging, privacy options, and error reporting

## Usage

Use the analytics helpers from screens or services when a user action or important lifecycle event should be tracked.

## Guideline

Keep analytics calls thin and event-focused. Do not place business decisions in analytics adapters; feature screens, hooks, or view models should decide when an event happened, and this layer should handle how it is sent.

## Dynatrace

Dynatrace is disabled by default unless `EXPO_PUBLIC_DYNATRACE_ENABLED=true`.
Native OneAgent values are read by `dynatrace.config.js` from `DYNATRACE_APPLICATION_ID` and `DYNATRACE_BEACON_URL`.

After changing Dynatrace configuration, run:

```bash
npm run dynatrace:instrument
npx expo start --clear
```

Then rebuild the native app with `npm run ios` or `npm run android`.
