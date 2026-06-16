# Notifications

Push notification setup and handling.

## Files

| File | Purpose |
|------|---------|
| `PushNotification.ts` | Local notification scheduling |
| `FirebaseMessaging.ts` | FCM token management |
| `NotificationHandler.ts` | Route notifications to handlers by type |

## Usage

```tsx
import { FirebaseMessaging } from '../notifications/FirebaseMessaging';
import { NotificationHandler } from '../notifications/NotificationHandler';

// Register device for push
await FirebaseMessaging.registerDevice();

// Handle typed notifications
NotificationHandler.register('order_update', (data) => {
  navigation.navigate('OrderDetail', { id: data.orderId });
});
```

## Integration

Replace stubs with `expo-notifications` or `@react-native-firebase/messaging`.

Toggle via `config/featureFlags.ts` → `enablePushNotifications`.
