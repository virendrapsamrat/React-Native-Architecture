# API layer

This folder contains the shared API client, endpoint definitions, interceptors, and React Query client setup.

## Responsibilities

- centralize HTTP configuration
- define reusable endpoints
- attach shared interceptors
- provide a query client for data fetching

Use `queryClient.ts` for shared React Query configuration and `ApiClient.ts`/`DemoApiClient.ts` for HTTP access boundaries.
