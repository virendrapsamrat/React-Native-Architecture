# Tests

Test utilities, mocks, and test suites.

## Structure

```
tests/
├── unit/           # Unit tests for utils, hooks, reducers
├── integration/    # Integration tests for services, navigation
└── mocks/          # Shared mock data and store fixtures
```

## Mocks

```tsx
import { testMocks, mockStore } from '../tests/mocks';

// Use in tests
const user = testMocks.user;
```

## Setup (Recommended)

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

## Guidelines

- Unit test pure functions in `utils/`
- Test Redux slices with mock store
- Test components with React Native Testing Library
- Keep mocks in `tests/mocks/` — one file per domain
