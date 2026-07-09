# Context

The context layer is reserved for shared React context providers that need to be available across multiple parts of the app.

Theme is currently provided from `src/theme/ThemeProvider.tsx`. Add new context here only when Redux, props, or a feature-local provider are not a better fit.
