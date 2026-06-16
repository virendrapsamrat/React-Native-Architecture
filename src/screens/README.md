# Screens

Full-screen views mapped to navigation routes.

## Structure

```
screens/
├── Auth/
│   ├── LoginScreen/
│   └── SignupScreen/
├── Home/
├── Profile/
└── Settings/
```

## Conventions

- Each screen folder contains `ScreenName.tsx` and `index.ts`
- Screens compose templates, organisms, and molecules
- Business logic is delegated to **viewModels** — screens stay thin
- Use `t()` from localization for all user-facing strings

## Example

```tsx
// screens/Home/HomeScreen.tsx
export const HomeScreen = () => {
  const { products, isLoading } = useHomeViewModel(search);
  return (
    <MainTemplate>
      <SearchBar ... />
      <FlatList data={products} ... />
    </MainTemplate>
  );
};
```

## Adding a New Screen

1. Create folder under `screens/`
2. Create a viewModel in `viewModels/`
3. Register route in the appropriate navigator
4. Add route name to `navigation/RouteNames.ts` and `types/Navigation.ts`
