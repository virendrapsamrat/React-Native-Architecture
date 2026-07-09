# Home Feature

The home feature owns the main Home tab screen.

## Main pieces

- `screens/HomeScreen`: Hacker News feed UI, filters, sorting, loading states, and story cards
- `index.ts`: public export for navigation

The screen currently uses shared `useHomeViewModel`, `useDebounce`, and Hacker News types/services. If home logic grows, move home-only hooks or view models into this feature.
