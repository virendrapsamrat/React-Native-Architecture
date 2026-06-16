# Redux Middleware

Custom Redux middleware for cross-cutting store concerns.

## Usage

Add middleware in `store/redux/store.ts`:

```tsx
import { loggerMiddleware } from '../middleware/loggerMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
```

## Example Middleware

```tsx
// loggerMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';

export const loggerMiddleware: Middleware = () => (next) => (action) => {
  if (__DEV__) console.log('Action:', action.type);
  return next(action);
};
```

## Common Use Cases

- API error logging
- Analytics event dispatch on certain actions
- Persist state to storage on specific actions
