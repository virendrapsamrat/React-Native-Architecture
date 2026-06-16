# Storage

Data persistence layer with multiple storage backends.

## Files

| File | Backend | Use Case |
|------|---------|----------|
| `AsyncStorage.ts` | @react-native-async-storage | General key-value storage |
| `SecureStorage.ts` | expo-secure-store | Sensitive data (tokens, credentials) |
| `MMKVStorage.ts` | AsyncStorage wrapper | Fast key-value (swap for react-native-mmkv in bare workflow) |

## Usage

```tsx
import { asyncStorage } from '../storage/AsyncStorage';
import { secureStorage } from '../storage/SecureStorage';
import { storageUtils } from '../utils/storageUtils';

// High-level helpers
await storageUtils.saveAuthToken(token);
const token = await storageUtils.getAuthToken();

// Low-level
await asyncStorage.setItem('key', { foo: 'bar' });
await secureStorage.setItem('secret', 'value');
```

## Guidelines

- Tokens and credentials → `SecureStorage`
- User preferences, cache → `AsyncStorage`
- Use `storageUtils` for common auth operations
