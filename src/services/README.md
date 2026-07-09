# Services

The services layer wraps API calls and integrations so screens do not directly depend on network logic.

## Current modules

- HNService.ts for Hacker News-related requests
- ProductService.ts for product data access
- UserService.ts for user-related operations
- NotificationService.ts for notification integration helpers

## Guideline

Keep services framework-light and easy to test. Screens and view models should call services or React Query hooks rather than constructing URLs or handling low-level API details directly.
