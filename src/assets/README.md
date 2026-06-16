# Assets

Static media files used across the app.

## Structure

```
assets/
├── images/       # PNG, JPG, WebP images
├── icons/        # App icons, tab bar icons
├── fonts/        # Custom font files (.ttf, .otf)
└── animations/   # Lottie JSON files
```

## Usage

```tsx
import logo from '../assets/images/logo.png';

<Image source={logo} />
```

## Guidelines

- Use WebP for images when possible (smaller file size)
- Keep icon sets consistent (same stroke width, size grid)
- Register custom fonts in `app.json` or via `expo-font`
- Store Lottie animations in `animations/` and load with `lottie-react-native`
