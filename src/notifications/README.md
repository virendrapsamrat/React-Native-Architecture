# Notifications

Notification handling is isolated here so push and local notification behavior does not leak into the UI layer.

## What is covered

- Firebase messaging setup
- notification handlers
- push notification helpers

## Guideline

Feature screens should ask this layer to register, handle, or display notifications instead of importing platform notification APIs directly.
