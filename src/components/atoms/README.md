# Atoms

The smallest, indivisible UI building blocks.

## Available Components

| Component | Description |
|-----------|-------------|
| `Button` | Pressable button with variants (primary, secondary, outline, ghost) |
| `Avatar` | User avatar with image or initials fallback |
| `Text` | Typography component with variants (h1, h2, h3, body, caption, label) |
| `Icon` | Icon display (replace with @expo/vector-icons in production) |
| `Loader` | Loading spinner with optional overlay |

## Example

```tsx
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';

<Button title="Submit" onPress={handleSubmit} variant="primary" loading={isLoading} />
<Text variant="h1">Welcome</Text>
```

## Creating New Atoms

1. Create folder: `atoms/NewAtom/`
2. Add `NewAtom.tsx`, `NewAtom.styles.ts`, `index.ts`
3. Keep atoms generic and reusable — no business logic
