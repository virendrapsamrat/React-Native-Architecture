# Templates

Page-level layout wrappers that define screen structure.

## Available Components

| Component | Description |
|-----------|-------------|
| `MainTemplate` | Standard screen with SafeAreaView, optional header, content area |
| `ProfileTemplate` | Scrollable profile layout with header, stats, and content slots |

## Example

```tsx
import { MainTemplate } from '../templates/MainTemplate';

<MainTemplate header={<Text variant="h1">Home</Text>}>
  <SearchBar ... />
  <FlatList ... />
</MainTemplate>
```

## Guidelines

- Templates define layout only — no business logic
- Use slot props (`header`, `children`, `stats`) for composition
- Apply theme background colors from `useTheme()`
