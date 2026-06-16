# Utils

Pure utility functions with no side effects.

## Files

| File | Functions |
|------|-----------|
| `dateUtils.ts` | `formatDate`, `formatRelativeTime` |
| `stringUtils.ts` | `capitalize`, `truncate`, `slugify`, `getInitials` |
| `validationUtils.ts` | `isValidEmail`, `isValidPassword`, `isValidPhone` |
| `numberUtils.ts` | `formatCurrency`, `formatNumber`, `clamp` |
| `storageUtils.ts` | `saveAuthToken`, `getAuthToken`, `clearAll` |
| `logger.ts` | `logger.debug/info/warn/error` (dev-only) |

## Guidelines

- Functions must be pure (no API calls, no Redux)
- Export named functions, not default exports
- Add unit tests in `tests/unit/`
