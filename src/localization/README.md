# Localization

Multi-language support using **i18n-js** and **expo-localization**.

## Supported Languages

| Code | Language |
|------|----------|
| `en` | English |
| `hi` | Hindi |
| `te` | Telugu |

## Usage

```tsx
import { t, setLocale } from '../localization/i18n';

<Text>{t('auth.login')}</Text>
<Text>{t('home.searchPlaceholder')}</Text>

// Change language
setLocale('hi');
```

## Adding Translations

1. Add key to `en.json`
2. Mirror the key in `hi.json` and `te.json`
3. Use dot notation: `t('section.key')`

## JSON Structure

```json
{
  "auth": { "login": "Login", "signup": "Sign Up" },
  "home": { "title": "Home" },
  "common": { "loading": "Loading..." }
}
```

## Guidelines

- Never hardcode user-facing strings in components
- Keep keys organized by screen/feature
- Default locale is detected from device settings
