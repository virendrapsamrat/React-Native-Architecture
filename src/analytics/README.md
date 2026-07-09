# Analytics

Analytics logic is isolated in this folder so instrumentation can be changed without touching screen code.

## What is here

- EventTracker.ts for shared event helpers
- FirebaseAnalytics.ts for Firebase-based analytics integration
- Mixpanel.ts for Mixpanel tracking

## Usage

Use the analytics helpers from screens or services when a user action or important lifecycle event should be tracked.

## Guideline

Keep analytics calls thin and event-focused. Do not place business decisions in analytics adapters; feature screens, hooks, or view models should decide when an event happened, and this layer should handle how it is sent.
