# Permissions

Device permission request and check utilities.

## Files

| File | Permission |
|------|-----------|
| `CameraPermission.ts` | Camera access |
| `LocationPermission.ts` | GPS / location access |
| `NotificationPermission.ts` | Push notification access |

## Usage

```tsx
import { requestCameraPermission } from '../permissions/CameraPermission';

const granted = await requestCameraPermission();
if (granted) {
  // Open camera
}
```

## Integration

Replace stub implementations with:
- `expo-camera` for camera permissions
- `expo-location` for location permissions
- `expo-notifications` for notification permissions

Or use `react-native-permissions` for bare workflow.
