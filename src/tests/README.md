# Tests

Test utilities, mocks, and test suites.

## Structure

```
tests/
├── unit/           # Unit tests for utils, hooks, reducers
├── integration/    # Integration tests for services, navigation
└── mocks/          # Shared mock data and store fixtures

e2e/                # Detox end-to-end tests (see e2e/README.md)
```

## Mocks

```tsx
import { testMocks, mockStore } from '../tests/mocks';

// Use in tests
const user = testMocks.user;
```

## Unit tests (Recommended)

Install testing dependencies:

```bash
npm install --save-dev jest @testing-library/react-native
```

Add to `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

## E2E tests (Detox)

Detox is configured for native iOS/Android builds via `expo-detox-config-plugin`. See [`e2e/README.md`](../../e2e/README.md) for setup and run instructions.

- Test IDs: `src/constants/TestIds.ts`
- Mock credentials: `tests/mocks/index.ts` (`test@example.com` / `Password123`)
- Config: `.detoxrc.js`

```bash
npm run e2e:prebuild
npm run e2e:ios        # or e2e:android
```

## Guidelines

- Unit test pure functions in `utils/`
- Test Redux slices with mock store
- Test components with React Native Testing Library
- Keep mocks in `tests/mocks/` — one file per domain
- Use `TestIds` constants for Detox selectors — avoid hard-coded strings in e2e specs
