# Configuration

This folder centralizes environment-aware settings and feature toggles.

## Includes

- appConfig.ts for app-wide runtime config
- brandConfig.ts for branding data
- env.ts for environment variables
- featureFlags.ts for feature gating

## Principle

Use configuration values here instead of hard-coding behavior that may differ by environment or brand.

Configuration should stay data-focused. Runtime behavior that belongs to a feature should remain in that feature's hooks, services, or screens.
