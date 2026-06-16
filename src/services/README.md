# Services

API communication and external service integrations.

## Structure

```
services/
├── api/
│   ├── ApiClient.ts      # Axios instance with base config
│   ├── Endpoints.ts      # API endpoint constants
│   └── Interceptors.ts   # Request/response interceptors
├── AuthService.ts
├── UserService.ts
├── ProductService.ts
└── NotificationService.ts
```

## API Client

The `ApiClient` is a pre-configured Axios instance with:
- Base URL from `config/env.ts`
- Auth token injection via request interceptor
- 401 auto-logout via response interceptor

## Adding a New Service

```tsx
// services/OrderService.ts
import ApiClient from './api/ApiClient';
import { Endpoints } from './api/Endpoints';

export const OrderService = {
  getOrders: async () => {
    const response = await ApiClient.get(Endpoints.ORDERS.LIST);
    return response.data;
  },
};
```

## Guidelines

- One service per domain entity
- Return typed `ApiResponse<T>` from all methods
- No UI logic or Redux dispatches in services
