# Components

The UI layer is organized with an atomic design-inspired structure.

## Structure

- `atoms`: small building blocks such as icons, buttons, loaders, and text wrappers
- `molecules`: composed UI units such as form fields, profile info, and search bars
- `organisms`: more complex sections such as profile headers, profile stats, product cards, and settings sections
- `templates`: layout-level compositions used by screens

## Guideline

Keep components presentational and push business logic to hooks, view models, or feature modules. Feature-specific UI that is not reusable across the app can live inside the owning feature instead of this shared component tree.
