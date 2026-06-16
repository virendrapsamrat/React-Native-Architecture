# Components

UI components organized using **Atomic Design** methodology.

## Hierarchy

```
components/
├── atoms/        # Smallest building blocks (Button, Text, Icon)
├── molecules/    # Simple combinations of atoms (FormField, SearchBar)
├── organisms/    # Complex UI sections (ProfileHeader, ProductCard)
└── templates/    # Page-level layouts (MainTemplate, ProfileTemplate)
```

## Component Structure

Each component follows this folder pattern:

```
ComponentName/
├── ComponentName.tsx       # Component logic
├── ComponentName.styles.ts # StyleSheet (when needed)
└── index.ts                # Barrel export
```

## Import Convention

```tsx
import { Button } from '../../components/atoms/Button';
import { FormField } from '../../components/molecules/FormField';
import { ProfileHeader } from '../../components/organisms/ProfileHeader';
import { MainTemplate } from '../../components/templates/MainTemplate';
```

## Rules

1. **Atoms** must not import from molecules, organisms, or templates
2. **Molecules** can import atoms only
3. **Organisms** can import atoms and molecules
4. **Templates** can import all lower levels
5. Keep components stateless when possible — lift state to screens/viewModels

## Sub-module READMEs

- [atoms/README.md](./atoms/README.md)
- [molecules/README.md](./molecules/README.md)
- [organisms/README.md](./organisms/README.md)
- [templates/README.md](./templates/README.md)
