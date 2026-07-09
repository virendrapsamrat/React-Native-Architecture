# Store

Redux Toolkit is used for app-wide state such as auth, user data, profile data, and user settings. The store is wired in the app shell and remains available to all screens and features.

## Structure

- redux for slice definitions and store wiring
- hooks.ts for typed Redux hooks
- middleware for custom middleware if needed

## Settings

The settings slice stores theme mode, notification preference, and active language. Language changes should update Redux, call `setLocale`, and persist through `storageUtils`.
