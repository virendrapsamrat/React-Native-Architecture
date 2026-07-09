# Home Feature

The home feature owns the main Home tab screen.

## Main pieces

- `screens/HomeScreen`: Hacker News feed UI, filters, sorting, loading states, and story cards
- `hooks/useHomeViewModel.ts`: Home screen state, feed query orchestration, sorting, refresh, and pagination actions
- `index.ts`: public export for navigation

The screen uses shared hooks such as `useDebounce`, while Home-only behavior lives in this feature's hooks folder.
