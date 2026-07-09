# View Models

View models hold screen-level business logic so screens remain focused on rendering. They work well for state preparation, action dispatching, query orchestration, and data transformation before it reaches the UI.

## Relationship to hooks

- Generic reusable behavior belongs in `src/hooks`.
- Feature-specific behavior can live in `src/features/<feature>/hooks`.
- Screen-specific presentation logic can live here while it is still shared at the app layer.

As the app becomes more feature-owned, new view models should usually be placed beside their feature unless they are intentionally shared.

## Current view models

- HomeViewModel
- ProfileViewModel
