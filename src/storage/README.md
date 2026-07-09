# Storage

The storage module provides wrappers around AsyncStorage and SecureStore so the app can persist auth, user, theme, and language settings safely and consistently.

Use `storageUtils` from `src/utils/storageUtils.ts` for app-level persistence operations instead of accessing storage wrappers directly from screens.
