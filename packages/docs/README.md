# @veraclins-dev/docs

Documentation components for creating interactive code demos and documentation pages.

## Features

- ✅ **Interactive Code Demos** - Live code editing with real-time preview
- ✅ **Static Code Display** - Syntax-highlighted code blocks
- ✅ **Mode Selection** - Display code in static or interactive mode
- ✅ **SSR Safe** - Uses `ClientOnly` for server-side rendering compatibility
- ✅ **React 19 Compatible** - Updated for React 19

## Installation

This package is part of the `@veraclins-dev` monorepo. Import it directly:

```tsx
import { CodeDemo, InteractiveCodeDemo, useCodeDemoScope } from '@veraclins-dev/docs';
```

## Components

### `CodeDemo`

Component that can display code in static or interactive mode. Use for documentation pages where you want to show both static code examples and interactive demos.

```tsx
import { CodeDemo } from '@veraclins-dev/docs';
import { useCodeDemoScope } from '@veraclins-dev/docs';

function Documentation() {
  const scope = useCodeDemoScope({
    additionalScope: { Button, useState },
  });

  return <CodeDemo code={exampleCode} scope={scope} mode="interactive" language="tsx" theme="dark" />;
}
```

**Props**:

- `code`: Code string (required)
- `language`: Language identifier (default: `'tsx'`)
- `scope`: Scope object for code execution (required for interactive mode)
- `mode`: `'static' | 'interactive'` (default: `'interactive'`)
- `defaultCode`: Default code for interactive mode
- `theme`: `'dark' | 'light'` (default: `'dark'`)
- `className`: Additional CSS classes

---

### `InteractiveCodeDemo`

Full-featured interactive code demo with live preview and editable code editor. Use when you want users to edit code and see live results.

```tsx
import { InteractiveCodeDemo } from '@veraclins-dev/docs';
import { useCodeDemoScope } from '@veraclins-dev/docs';

function InteractiveExample() {
  const scope = useCodeDemoScope({
    additionalScope: { Button, Card, CardContent },
  });

  return <InteractiveCodeDemo code={initialCode} scope={scope} language="tsx" theme="dark" />;
}
```

**Props**:

- `code`: Initial code string (required)
- `scope`: Scope object for code execution (required)
- `defaultCode`: Default code if different from `code`
- `language`: Language identifier (default: `'tsx'`)
- `theme`: `'dark' | 'light'` (default: `'dark'`)
- `className`: Additional CSS classes

**Features**:

- Live preview of code execution
- Editable code editor (collapsible, collapsed by default)
- Error display
- Copy code button
- SSR-safe (wrapped in `ClientOnly`)

---

### `ReactRunnerWrapper`

Simple wrapper around `useRunner` hook with error handling. Use when you need a component that executes code and handles errors.

```tsx
import { ReactRunnerWrapper } from '@veraclins-dev/docs';

function CodePreview() {
  const scope = { Button, useState };

  return (
    <ReactRunnerWrapper
      code={code}
      scope={scope}
      onError={(error) => {
        if (error) console.error('Code execution error:', error);
      }}
    />
  );
}
```

**Props**:

- `code`: Code string to execute (required)
- `scope`: Scope object (required)
- `onError`: Optional error callback `(error: string | null) => void`

---

## Hooks

### `useCodeDemoScope`

Hook to get code demo scope with sensible defaults. Use to provide React and common hooks to code demos.

```tsx
import { useCodeDemoScope } from '@veraclins-dev/docs';
import * as UI from '@veraclins-dev/ui';

function MyDocumentation() {
  const scope = useCodeDemoScope({
    additionalScope: {
      Button: UI.Button,
      Card: UI.Card,
      '@veraclins-dev/ui': UI,
    },
  });

  return <InteractiveCodeDemo code={code} scope={scope} />;
}
```

**Options**:

- `additionalScope?`: Additional scope items to merge with default scope
- `scopeProvider?`: Custom scope provider function (replaces default scope)

**Returns**: `CodeDemoScope` object with React and common hooks

**Default Scope**:

- `React` - React library
- `react` - React library (for import resolution)
- `useState` - React.useState
- `useEffect` - React.useEffect

---

## Types

### `CodeDemoProps`

Base props for code demo components.

```tsx
interface CodeDemoProps {
  code: string;
  language?: string;
  className?: string;
  theme?: 'light' | 'dark';
}
```

### `CodeDemoScope`

Type for scope object used in code demos.

```tsx
type CodeDemoScope = Record<string, unknown>;
```

### `CodeDemoComponentProps`

Props for `CodeDemo` component (extends `CodeDemoProps`).

```tsx
interface CodeDemoComponentProps extends CodeDemoProps {
  scope?: CodeDemoScope;
  mode?: 'static' | 'interactive';
  defaultCode?: string;
}
```

### `InteractiveCodeDemoProps`

Props for `InteractiveCodeDemo` component (extends `CodeDemoProps`).

```tsx
interface InteractiveCodeDemoProps extends Pick<CodeDemoProps, 'code' | 'language' | 'className' | 'theme'> {
  scope: CodeDemoScope;
  defaultCode?: string;
}
```

---

## Examples

### Basic Interactive Demo

```tsx
import { InteractiveCodeDemo, useCodeDemoScope } from '@veraclins-dev/docs';
import { Button } from '@veraclins-dev/ui';

function Example() {
  const scope = useCodeDemoScope({
    additionalScope: { Button },
  });

  const code = `
export default function App() {
  return <Button>Click me</Button>;
}
`;

  return <InteractiveCodeDemo code={code} scope={scope} />;
}
```

### Static Code Display

```tsx
import { CodeDemo } from '@veraclins-dev/docs';

function StaticExample() {
  return <CodeDemo code="const x = 1;" mode="static" language="tsx" />;
}
```

### Custom Scope Provider

```tsx
import { InteractiveCodeDemo, useCodeDemoScope } from '@veraclins-dev/docs';

function CustomScopeExample() {
  const scope = useCodeDemoScope({
    scopeProvider: () => ({
      React,
      useState: React.useState,
      Button: MyCustomButton,
      Card: MyCustomCard,
    }),
  });

  return <InteractiveCodeDemo code={code} scope={scope} />;
}
```

---

## Dependencies

- `@codemirror/*` - CodeMirror 6 packages for code editing/display (included in package)
- `sucrase` - Code transformation for React code execution (included in package)
- `@veraclins-dev/ui` - UI components
- `@veraclins-dev/react-utils` - Toast notifications
- `remix-utils` - `ClientOnly` component for SSR safety

**Note:** Code execution (`code-runner`) and code editing (`codemirror`) functionality are now included directly in this package. They were previously separate packages (`@veraclins-dev/react-code-runner` and `@veraclins-dev/react-runner-codemirror`) but have been merged for better maintainability.

---

## Best Practices

1. **Always use `useCodeDemoScope`** - Provides React and common hooks automatically
2. **Wrap in `ClientOnly`** - Already done in `InteractiveCodeDemo`, but remember for custom implementations
3. **Provide proper scope** - Include all components and utilities used in the code
4. **Use `InteractiveCodeDemo`** - For full-featured interactive demos with live editing
5. **Use `CodeDemo`** - When you want to display code in either static or interactive mode

---

## License

MIT
