# Hooks

Reusable custom React hooks shared across the app.

## Available Hooks

| Hook | Description |
|------|-------------|
| `useAuth` | Auth state, login/logout actions |
| `useNetwork` | Network connectivity status |
| `useDebounce` | Debounce a value by delay |
| `usePermissions` | Camera, location, notification permissions |

## Example

```tsx
import { useAuth } from '../hooks/useAuth';
import { useDebounce } from '../hooks/useDebounce';
import { useNetwork } from '../hooks/useNetwork';

const { isAuthenticated, login, logout } = useAuth();
const debouncedSearch = useDebounce(searchQuery, 300);
const { isConnected } = useNetwork();
```

## Guidelines

- Prefix all hooks with `use`
- One hook per file
- Hooks can use Redux, context, or other hooks
- Keep hooks focused on a single concern
