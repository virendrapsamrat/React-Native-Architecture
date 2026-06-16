# API Layer

Axios HTTP client configuration and interceptors.

## Files

| File | Purpose |
|------|---------|
| `ApiClient.ts` | Pre-configured Axios instance |
| `Endpoints.ts` | Centralized API route constants |
| `Interceptors.ts` | Auth token injection, error handling |

## ApiClient

- Base URL: `config/env.ts` → `API_BASE_URL`
- Timeout: 30 seconds
- Auto-attaches Bearer token from secure storage
- Auto-clears auth on 401 responses

## Adding Endpoints

```ts
// Endpoints.ts
export const Endpoints = {
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
  },
};
```
