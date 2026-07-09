# Theme

The theme layer provides light and dark theme definitions and a shared theme provider. Screens and components should consume theme values from this layer instead of hard-coding colors.

Theme mode is stored in Redux settings and persisted through `storageUtils`. Components should use `useTheme()` when they need current theme colors or dark-mode state.
