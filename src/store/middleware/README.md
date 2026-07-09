# Middleware

Custom middleware should be added here when cross-cutting Redux behavior is needed. Keep it focused and avoid placing UI concerns inside middleware.

Good candidates include logging, persistence coordination, or app-wide side effects that truly apply across slices. Feature-specific behavior should stay in feature hooks, view models, thunks, or services.
