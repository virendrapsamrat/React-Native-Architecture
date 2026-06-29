# Constants

Static, app-wide constant values.

## Files

| File | Contents |
|------|----------|
| `Colors.ts` | Color palette (primary, secondary, error, etc.) |
| `Fonts.ts` | Font families and size scale |
| `Strings.ts` | Static English strings (prefer i18n for UI text) |
| `AppConstants.ts` | App name, version, pagination limits |
| `Regex.ts` | Validation regex patterns |
| `StorageKeys.ts` | AsyncStorage / SecureStore key names |

## Usage

```tsx
import { Colors } from '../constants/Colors';
import { StorageKeys } from '../constants/StorageKeys';
```

## Guidelines

- Use `as const` for type narrowing
- Never mutate constants at runtime
- UI strings should use `localization/i18n.ts` instead of `Strings.ts`
