# Hooks

Hooks encapsulate reusable logic for UI behavior and cross-cutting concerns.

Use this folder for hooks that are generic enough to be reused across multiple features. If a hook exists only for one feature, prefer `src/features/<feature>/hooks`.

## Examples

- useDebounce for delayed input handling
- useHNStoriesQuery for React Query-based story fetching
- useNetwork and usePermissions for platform-aware behavior
