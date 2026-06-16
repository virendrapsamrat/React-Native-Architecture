# ViewModels

Screen-level business logic following the **MVVM** pattern.

## Available ViewModels

| ViewModel | Screen | Responsibilities |
|-----------|--------|-----------------|
| `AuthViewModel` | Login, Signup | Validation, login/signup orchestration |
| `HomeViewModel` | Home | Product fetching, search filtering |
| `ProfileViewModel` | Profile | Profile data, stats formatting |

## Pattern

```tsx
// viewModels/HomeViewModel.ts
export const useHomeViewModel = (searchQuery: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  // fetch, filter, transform data
  return { products, isLoading };
};

// screens/Home/HomeScreen.tsx
const { products, isLoading } = useHomeViewModel(search);
```

## Guidelines

- ViewModels are custom hooks (`useXxxViewModel`)
- Handle data fetching, validation, and state transformations
- Call services for API operations
- Dispatch Redux actions when global state needs updating
- Never import UI components
