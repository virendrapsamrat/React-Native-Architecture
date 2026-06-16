# Molecules

Simple UI groups composed of two or more atoms.

## Available Components

| Component | Atoms Used | Description |
|-----------|-----------|-------------|
| `ProfileInfo` | Avatar, Text | User name + email with avatar |
| `UserStat` | Text | Numeric stat with label |
| `SearchBar` | Icon, TextInput | Search input with icon |
| `FormField` | Text, TextInput | Label + input + error message |

## Example

```tsx
import { FormField } from '../molecules/FormField';
import { SearchBar } from '../molecules/SearchBar';

<FormField label="Email" value={email} onChangeText={setEmail} error={emailError} />
<SearchBar value={query} onChangeText={setQuery} placeholder="Search..." />
```

## Guidelines

- Molecules handle simple local UI state only
- Validation display (error text) is OK; validation logic belongs in viewModels
- Reuse atoms — never duplicate atom styling in molecules
