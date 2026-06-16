# Store

Global state management with **Redux Toolkit**.

## Structure

```
store/
├── redux/
│   ├── store.ts          # configureStore
│   ├── rootReducer.ts    # combineReducers
│   ├── auth/             # Auth slice
│   ├── user/             # User slice
│   ├── profile/          # Profile slice
│   └── settings/         # Settings slice
├── middleware/            # Custom Redux middleware
└── hooks.ts              # Typed useAppDispatch / useAppSelector
```

## Usage

```tsx
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser } from '../store/redux/auth/authSlice';

const dispatch = useAppDispatch();
const { isAuthenticated } = useAppSelector((s) => s.auth);
dispatch(loginUser({ email, password }));
```

## Adding a New Slice

1. Create `store/redux/feature/featureSlice.ts`
2. Add reducer to `rootReducer.ts`
3. Create async thunks for API calls
4. Use typed hooks from `store/hooks.ts`

## Guidelines

- Use `createSlice` for synchronous reducers
- Use `createAsyncThunk` for async operations
- Keep slices focused on a single domain
