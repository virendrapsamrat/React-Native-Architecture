# Profile Feature

The profile feature owns the main Profile tab screen.

## Main pieces

- `screens/ProfileScreen`: profile route UI composition
- `hooks/useProfileViewModel.ts`: Profile screen data selection and localized profile stats
- `index.ts`: public export for navigation

The screen composes shared profile UI components and keeps profile-only presentation logic in this feature's hooks folder.
