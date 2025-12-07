# Package Components & Use Cases

This document provides a comprehensive overview of all available components, hooks, types, and utilities in each package.

---

## 📦 `@veraclins-dev/react-runner-codemirror`

**Purpose**: CodeMirror 6 wrapper for React code editing with syntax highlighting and theme support.

### Components

#### `CodeMirror`

**Location**: `src/lib/code-mirror.tsx`
**Type**: `CodeMirrorProps`
**Use Case**: Low-level CodeMirror editor component. Use when you need full control over the editor configuration.

**Props**:

- `value` / `defaultValue`: Code content
- `onChange`: Callback when code changes
- `theme`: `'dark' | 'light' | 'auto' | Extension` - Editor theme
- `padding`: Number or string for content padding
- `readOnly`: Boolean to make editor read-only
- `showLineNumbers`: Boolean to show line numbers
- `wrapLine`: Boolean to enable line wrapping
- `extensions`: Custom CodeMirror extensions
- `filename`: Filename for language detection (e.g., `'file.tsx'`)

**Example**:

```tsx
import { CodeMirror } from '@veraclins-dev/react-runner-codemirror';

<CodeMirror value={code} onChange={setCode} theme="dark" filename="file.tsx" showLineNumbers={true} />;
```

---

#### `CodeEditor`

**Location**: `src/lib/code-editor.tsx`
**Type**: `CodeEditorProps`
**Use Case**: High-level interactive code editor with copy button and edit hints. Use for editable code examples in documentation or playgrounds.

**Props**:

- `code`: Code content (required)
- `language`: Language identifier (default: `'tsx'`)
- `onChange`: Callback when code changes (required)
- `onFocus`: Optional focus callback
- `showCopyButton`: Show copy button (default: `true`)
- `showHint`: Show "Press Enter to edit" hint (default: `true`)
- `theme`: `'light' | 'dark' | 'auto'` (default: `'auto'`)
- `className`: Additional CSS classes

**Example**:

```tsx
import { CodeEditor } from '@veraclins-dev/react-runner-codemirror';

<CodeEditor code={code} onChange={setCode} language="tsx" showCopyButton={true} theme="dark" />;
```

---

#### `CodeBlock`

**Location**: `src/lib/code-block.tsx`
**Type**: `CodeBlockProps`
**Use Case**: Static code display with syntax highlighting. Use for displaying code examples that users can copy but not edit.

**Props**:

- `code`: Code content (required)
- `language`: Language identifier (default: `'tsx'`)
- `showCopyButton`: Show copy button (default: `true`)
- `theme`: `'dark' | 'light' | 'auto'` (default: `'auto'`)
- `className`: Additional CSS classes

**Features**:

- Read-only CodeMirror editor
- Auto-detects system theme (when `theme="dark"`)
- Copy to clipboard functionality
- Syntax highlighting for multiple languages

**Example**:

```tsx
import { CodeBlock } from '@veraclins-dev/react-runner-codemirror';

<CodeBlock code={exampleCode} language="tsx" showCopyButton={true} theme="dark" />;
```

---

### Hooks

#### `useCodeMirror`

**Location**: `src/lib/use-code-mirror.ts`
**Type**: Internal hook
**Use Case**: Internal hook for managing CodeMirror view lifecycle. Not typically used directly.

---

### Utilities

#### `getFilenameFromLanguage`

**Location**: `src/lib/utils.ts`
**Signature**: `(language: string) => string`
**Use Case**: Converts language identifier to filename for CodeMirror language detection.

**Example**:

```tsx
import { getFilenameFromLanguage } from '@veraclins-dev/react-runner-codemirror';

const filename = getFilenameFromLanguage('tsx'); // Returns 'file.tsx'
```

---

#### `basicSetup`

**Location**: `src/lib/basic-setup.ts`
**Type**: `Extension`
**Use Case**: Default CodeMirror extensions (history, autocomplete, keymaps, etc.). Used internally by CodeMirror component.

---

#### `javascript`

**Location**: `src/lib/javascript.ts`
**Type**: `() => LanguageSupport`
**Use Case**: JavaScript/TypeScript language support with snippets. Used internally for language detection.

---

### Types

#### `CodeMirrorProps`

**Location**: `src/lib/code-mirror-types.ts`
**Use Case**: Props interface for `CodeMirror` component.

#### `CodeMirrorConfig`

**Location**: `src/lib/code-mirror-types.ts`
**Use Case**: Configuration options for CodeMirror editor.

#### `Theme`

**Location**: `src/lib/code-mirror-types.ts`
**Type**: `'dark' | 'light' | 'auto' | Extension`
**Use Case**: Theme type for CodeMirror editor.

#### `CodeEditorProps`

**Location**: `src/lib/code-editor.tsx`
**Use Case**: Props interface for `CodeEditor` component.

#### `CodeBlockProps`

**Location**: `src/lib/code-block.tsx`
**Use Case**: Props interface for `CodeBlock` component.

---

## 📦 `@veraclins-dev/react-code-runner`

**Purpose**: Execute and preview React code in the browser. Transforms and evaluates React code strings.

### Components

#### `Runner`

**Location**: `src/lib/Runner.tsx`
**Type**: `RunnerProps`
**Use Case**: Component-based code execution. Use when you need a simple component that renders code execution results.

**Props**:

- `code`: Code string to execute (required)
- `scope`: Object with globals available to the code
- `onRendered`: Callback when code is rendered (receives error if any)

**Returns**: `null` if error, otherwise the rendered React element

**Example**:

```tsx
import { Runner } from '@veraclins-dev/react-code-runner';

<Runner
  code={code}
  scope={{ Button, useState }}
  onRendered={(error) => {
    if (error) console.error(error);
  }}
/>;
```

---

### Hooks

#### `useRunner`

**Location**: `src/lib/useRunner.ts`
**Type**: `UseRunnerProps => UseRunnerReturn`
**Use Case**: Hook-based code execution. Preferred over `Runner` component for better React 19 compatibility and flexibility.

**Props**:

- `code`: Code string to execute (required)
- `scope`: Object with globals available to the code
- `disableCache`: Whether to disable caching (default: `false`)

**Returns**:

```typescript
{
  element: ReactElement | null;
  error: Error | string | null;
}
```

**Example**:

```tsx
import { useRunner } from '@veraclins-dev/react-code-runner';

const { element, error } = useRunner({
  code: codeString,
  scope: { Button, useState, React },
});

if (error) {
  return <div>Error: {error.message}</div>;
}

return <>{element}</>;
```

---

### Types

#### `RunnerOptions`

**Location**: `src/lib/types.ts`
**Use Case**: Options for code execution.

**Properties**:

- `code`: `string` - The code to run
- `scope?`: `Scope` - Globals available to the code

#### `Scope`

**Location**: `src/lib/types.ts`
**Use Case**: Type for scope object with import support.

**Properties**:

- `import?`: `Record<string, any>` - Modules available for import statements
- `[key: string]`: `any` - Other globals

#### `RunnerProps`

**Location**: `src/lib/Runner.tsx`
**Use Case**: Props interface for `Runner` component.

#### `UseRunnerProps`

**Location**: `src/lib/useRunner.ts`
**Use Case**: Props interface for `useRunner` hook.

#### `UseRunnerReturn`

**Location**: `src/lib/useRunner.ts`
**Use Case**: Return type for `useRunner` hook.

---

## 📦 `@veraclins-dev/docs`

**Purpose**: Documentation components for creating interactive code demos and documentation pages.

### Components

#### `CodeDemo`

**Location**: `src/lib/components/code-demo.tsx`
**Type**: `CodeDemoComponentProps`
**Use Case**: Combined component that can display code in static or interactive mode with a toggle. Use for documentation pages where you want to show both static code examples and interactive demos.

**Props**:

- `code`: Code string (required)
- `language`: Language identifier (default: `'tsx'`)
- `scope`: Scope object for code execution
- `title`: Optional title
- `description`: Optional description
- `defaultMode`: `'static' | 'interactive'` (default: `'static'`)
- `showModeToggle`: Show toggle between static/interactive (default: `true`)
- `defaultCode`: Default code for interactive mode
- `theme`: `'dark' | 'light' | 'auto'` (default: `'auto'`)
- `className`: Additional CSS classes

**Example**:

```tsx
import { CodeDemo } from '@veraclins-dev/docs';

<CodeDemo code={exampleCode} scope={demoScope} title="Button Example" description="A simple button component" defaultMode="interactive" showModeToggle={true} />;
```

---

#### `InteractiveCodeDemo`

**Location**: `src/lib/components/interactive-code-demo.tsx`
**Type**: `InteractiveCodeDemoProps`
**Use Case**: Full-featured interactive code demo with live preview and editable code editor. Use when you want users to edit code and see live results.

**Props**:

- `code`: Initial code string (required)
- `scope`: Scope object for code execution (required)
- `defaultCode`: Default code if different from `code`
- `language`: Language identifier (default: `'tsx'`)
- `title`: Optional title
- `description`: Optional description
- `theme`: `'dark' | 'light' | 'auto'` (default: `'auto'`)
- `className`: Additional CSS classes

**Features**:

- Live preview of code execution
- Editable code editor (collapsible, collapsed by default)
- Error display
- Copy code button
- SSR-safe (wrapped in `ClientOnly`)

**Example**:

```tsx
import { InteractiveCodeDemo } from '@veraclins-dev/docs';

<InteractiveCodeDemo code={initialCode} scope={demoScope} title="Interactive Example" description="Edit the code to see changes" />;
```

---

#### `ReactRunnerWrapper`

**Location**: `src/lib/components/react-runner-wrapper.tsx`
**Type**: `ReactRunnerWrapperProps`
**Use Case**: Simple wrapper around `useRunner` hook with error handling. Use when you need a component that executes code and handles errors.

**Props**:

- `code`: Code string to execute (required)
- `scope`: Scope object (required)
- `onError`: Optional error callback

**Example**:

```tsx
import { ReactRunnerWrapper } from '@veraclins-dev/docs';

<ReactRunnerWrapper code={code} scope={scope} onError={(error) => console.error(error)} />;
```

---

### Hooks

#### `useCodeDemoScope`

**Location**: `src/lib/hooks/use-code-demo-scope.ts`
**Type**: `UseCodeDemoScopeOptions => CodeDemoScope`
**Use Case**: Hook to get code demo scope with sensible defaults. Use to provide React and common hooks to code demos.

**Options**:

- `additionalScope?`: Additional scope items to merge
- `scopeProvider?`: Custom scope provider function

**Returns**: `CodeDemoScope` object with React and common hooks

**Example**:

```tsx
import { useCodeDemoScope } from '@veraclins-dev/docs';

const scope = useCodeDemoScope({
  additionalScope: {
    Button: MyButton,
    '@veraclins-dev/ui': UIPackage,
  },
});
```

---

### Types

#### `CodeDemoProps`

**Location**: `src/lib/components/code-demo-types.ts`
**Use Case**: Base props for code demo components.

**Properties**:

- `code`: `string` - Code content
- `language?`: `string` - Language identifier
- `className?`: `string` - CSS classes
- `title?`: `string` - Title
- `description?`: `string` - Description
- `theme?`: `'light' | 'dark' | 'auto'` - Theme preference

#### `CodeDemoScope`

**Location**: `src/lib/components/code-demo-types.ts`
**Type**: `Record<string, unknown>`
**Use Case**: Type for scope object used in code demos.

#### `CodeDemoComponentProps`

**Location**: `src/lib/components/code-demo-types.ts`
**Use Case**: Props for `CodeDemo` component (extends `CodeDemoProps`).

**Additional Properties**:

- `scope?`: `CodeDemoScope` - Scope for code execution
- `defaultMode?`: `'static' | 'interactive'` - Default display mode
- `showModeToggle?`: `boolean` - Show mode toggle
- `defaultCode?`: `string` - Default code for interactive mode

#### `InteractiveCodeDemoProps`

**Location**: `src/lib/components/interactive-code-demo.tsx`
**Use Case**: Props for `InteractiveCodeDemo` component (extends `CodeDemoProps`).

**Additional Properties**:

- `scope?`: `CodeDemoScope` - Scope for code execution
- `defaultCode?`: `string` - Default code

#### `ReactRunnerWrapperProps`

**Location**: `src/lib/components/code-demo-types.ts`
**Use Case**: Props for `ReactRunnerWrapper` component.

**Properties**:

- `code`: `string` - Code to execute
- `scope`: `Record<string, unknown>` - Scope object
- `onError?`: `(error: string | null) => void` - Error callback

#### `UseCodeDemoScopeOptions`

**Location**: `src/lib/hooks/use-code-demo-scope.ts`
**Use Case**: Options for `useCodeDemoScope` hook.

---

## 🔄 Package Dependencies

### `@veraclins-dev/react-runner-codemirror`

- **Depends on**: `@veraclins-dev/ui`, `@veraclins-dev/utils`, `@veraclins-dev/react-utils`
- **Used by**: `@veraclins-dev/docs`

### `@veraclins-dev/react-code-runner`

- **Depends on**: `sucrase` (for code transformation)
- **Used by**: `@veraclins-dev/docs`

### `@veraclins-dev/docs`

- **Depends on**:
  - `@veraclins-dev/react-runner-codemirror` (for code editing/display)
  - `@veraclins-dev/react-code-runner` (for code execution)
  - `@veraclins-dev/ui` (for UI components)
  - `remix-utils` (for `ClientOnly` component)

---

## 📋 Quick Reference

### When to Use Each Component

| Component             | Use Case                    | Editable | Preview |
| --------------------- | --------------------------- | -------- | ------- |
| `CodeMirror`          | Low-level editor control    | ✅       | ❌      |
| `CodeEditor`          | Interactive code editing    | ✅       | ❌      |
| `CodeBlock`           | Static code display         | ❌       | ❌      |
| `Runner`              | Simple code execution       | ❌       | ✅      |
| `useRunner`           | Code execution (hook)       | ❌       | ✅      |
| `CodeDemo`            | Static + Interactive toggle | ✅       | ✅      |
| `InteractiveCodeDemo` | Full interactive demo       | ✅       | ✅      |
| `ReactRunnerWrapper`  | Simple execution wrapper    | ❌       | ✅      |

### Common Patterns

#### Pattern 1: Static Code Display

```tsx
import { CodeBlock } from '@veraclins-dev/react-runner-codemirror';

<CodeBlock code={exampleCode} language="tsx" />;
```

#### Pattern 2: Editable Code Editor

```tsx
import { CodeEditor } from '@veraclins-dev/react-runner-codemirror';

<CodeEditor code={code} onChange={setCode} language="tsx" />;
```

#### Pattern 3: Code Execution Only

```tsx
import { useRunner } from '@veraclins-dev/react-code-runner';

const { element, error } = useRunner({ code, scope });
return error ? <ErrorDisplay /> : <>{element}</>;
```

#### Pattern 4: Full Interactive Demo

```tsx
import { InteractiveCodeDemo } from '@veraclins-dev/docs';
import { useCodeDemoScope } from '@veraclins-dev/docs';

const scope = useCodeDemoScope({ additionalScope: { Button } });

<InteractiveCodeDemo code={code} scope={scope} />;
```

#### Pattern 5: Toggle Between Static/Interactive

```tsx
import { CodeDemo } from '@veraclins-dev/docs';

<CodeDemo code={code} scope={scope} defaultMode="interactive" showModeToggle={true} />;
```

---

## 🎯 Best Practices

1. **Use `CodeEditor` for editable code** - Provides copy button and edit hints
2. **Use `CodeBlock` for static examples** - Read-only with syntax highlighting
3. **Use `useRunner` hook** - Preferred over `Runner` component for React 19
4. **Use `InteractiveCodeDemo`** - For full-featured interactive demos
5. **Use `useCodeDemoScope`** - To provide React and common hooks to demos
6. **Wrap in `ClientOnly`** - For SSR-safe code execution (already done in `InteractiveCodeDemo`)
