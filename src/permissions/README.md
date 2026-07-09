# Permissions

Permission helpers live here so screens can request camera, location, or notification access through a single, consistent layer.

Keep platform permission details out of screens. Screens and feature hooks should call permission helpers and render the resulting UI state.
