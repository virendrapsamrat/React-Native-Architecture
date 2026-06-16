# Organisms

Complex UI sections built from atoms and molecules.

## Available Components

| Component | Description |
|-----------|-------------|
| `ProfileHeader` | Avatar, name, and bio section |
| `ProfileStats` | Row of follower/following/post stats |
| `SettingsSection` | Grouped settings with title |
| `ProductCard` | Product image, name, price, stock status |

## Example

```tsx
import { ProfileHeader } from '../organisms/ProfileHeader';
import { ProductCard } from '../organisms/ProductCard';

<ProfileHeader name="John Doe" bio="Software developer" avatarUri={uri} />
<ProductCard product={product} onPress={handlePress} />
```

## Guidelines

- Organisms may accept data props and callback handlers
- No direct API calls — receive data from screens/viewModels
- Can manage internal UI state (expand/collapse, etc.)
