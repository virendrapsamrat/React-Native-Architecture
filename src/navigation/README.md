# Navigation

React Navigation v7 setup with auth-gated routing.

## Files

| File | Purpose |
|------|---------|
| `AppNavigator.tsx` | Root navigator — switches between Auth and Main |
| `AuthNavigator.tsx` | Login & Signup stack |
| `BottomTabNavigator.tsx` | Home, Profile, Settings tabs |
| `RouteNames.ts` | Centralized route name constants |

## Flow

```
AppNavigator
├── Auth (unauthenticated)
│   ├── Login
│   └── Signup
└── Main (authenticated)
    ├── Home (tab)
    ├── Profile (tab)
    └── Settings (tab)
```

## Usage

```tsx
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
navigation.navigate('Signup');
```

## Type Safety

All route params are typed in `types/Navigation.ts`. Use `RouteNames` constants instead of string literals.
