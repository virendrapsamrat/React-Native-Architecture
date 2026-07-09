# Localization

This folder contains translations and the i18n configuration. The app currently supports English, Spanish, Hindi, and Telugu.

## How to use

Use `t(key)` for text in the active app locale. Use `tForLocale(locale, key)` only when UI must preview a different locale before it becomes active, such as the Settings language confirmation modal.

## Language switching

Settings stores the selected language in Redux and persistence through `storageUtils.saveLanguage`. `setLocale` updates the i18n instance, and `App.tsx` remounts `AppNavigator` with the selected language key so labels and screens refresh without reopening the app.

## Translation files

- `en.json`: English
- `es.json`: Spanish
- `hi.json`: Hindi
- `te.json`: Telugu
