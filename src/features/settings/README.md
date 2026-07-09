# Settings Feature

The settings feature owns the main Settings tab screen.

## Main pieces

- `screens/SettingsScreen`: settings route UI
- `index.ts`: public export for navigation

## Current behavior

- Toggles notifications in Redux settings.
- Switches theme mode and persists it through `storageUtils`.
- Opens a confirmation modal before changing language.
- Renders the language confirmation modal in the language the user selected.
- Applies language changes through `setLocale`, Redux settings, persistence, and the app-level navigator remount.
- Calls the auth feature logout action through `useAuth`.
