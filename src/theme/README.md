# Theme

Light and dark theme system with React Context.

## Files

| File | Purpose |
|------|---------|
| `lightTheme.ts` | Light mode color tokens |
| `darkTheme.ts` | Dark mode color tokens |
| `ThemeProvider.tsx` | Context provider + `useTheme` hook |

## Usage

```tsx
import { useTheme } from '../theme/ThemeProvider';

const { theme, isDark } = useTheme();

<View style={{ backgroundColor: theme.colors.background }}>
  <Text style={{ color: theme.colors.text }}>Hello</Text>
</View>
```

## Theme Shape

```ts
{
  mode: 'light' | 'dark',
  colors: { primary, secondary, background, surface, text, ... },
  fonts: { regular, medium, bold, sizes: { xs, sm, md, ... } }
}
```

## Guidelines

- Always use theme colors in components — never hardcode hex values
- System color scheme is detected automatically via `useColorScheme()`
