# Types

Shared TypeScript interfaces and type definitions.

## Files

| File | Types |
|------|-------|
| `User.ts` | `User`, `AuthUser` |
| `Profile.ts` | `Profile`, `ProfileStat` |
| `Product.ts` | `Product` |
| `ApiResponse.ts` | `ApiResponse<T>`, `PaginatedResponse<T>`, `ApiError` |
| `Navigation.ts` | `AuthStackParamList`, `BottomTabParamList`, `RootStackParamList` |

## Guidelines

- One domain entity per file
- Use `interface` for object shapes
- Navigation types must match `RouteNames.ts` exactly
- Export all types as named exports
