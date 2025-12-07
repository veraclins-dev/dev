# @veraclins-dev/react-runner-codemirror

CodeMirror 6 wrapper for React code editing - React 19 compatible.

## Features

- ✅ **React 19 Compatible** - Updated for React 19 with proper ref handling
- ✅ **CodeMirror 6** - Full-featured code editor with syntax highlighting
- ✅ **Theme Support** - Dark, light, and auto (system preference) themes
- ✅ **Language Support** - JavaScript, TypeScript, TSX, CSS, and more
- ✅ **Editor Features** - Line numbers, line wrapping, autocomplete, history, undo/redo
- ✅ **Custom Themes** - Built-in custom themes matching your design system

## Installation

This package is part of the `@veraclins-dev` monorepo. Import it directly:

```tsx
import { CodeMirror, CodeEditor, CodeBlock } from '@veraclins-dev/react-runner-codemirror';
```

## Components

### `CodeMirror`

Low-level CodeMirror editor component. Use when you need full control over the editor configuration.

```tsx
import { CodeMirror } from '@veraclins-dev/react-runner-codemirror';

function App() {
  const [code, setCode] = useState('const x = 1;');

  return <CodeMirror value={code} onChange={setCode} theme="dark" filename="file.tsx" showLineNumbers={true} padding={16} />;
}
```

**Props**:

- `value` / `defaultValue`: Code content (string)
- `onChange`: Callback when code changes `(code: string) => void`
- `theme`: `'dark' | 'light'` - Editor theme (default: `'dark'`)
- `padding`: Number or string for content padding (default: `10`)
- `readOnly`: Boolean to make editor read-only (default: `false`)
- `showLineNumbers`: Boolean to show line numbers (default: `false`)
- `wrapLine`: Boolean to enable line wrapping (default: `false`)
- `extensions`: Custom CodeMirror extensions
- `filename`: Filename for language detection (e.g., `'file.tsx'`)

---

### `CodeEditor`

High-level interactive code editor with copy button and edit hints. Use for editable code examples in documentation or playgrounds.

```tsx
import { CodeEditor } from '@veraclins-dev/react-runner-codemirror';

function App() {
  const [code, setCode] = useState('const x = 1;');

  return <CodeEditor code={code} onChange={setCode} language="tsx" showCopyButton={true} showHint={true} theme="dark" />;
}
```

**Props**:

- `code`: Code content (required, string)
- `onChange`: Callback when code changes (required, `(code: string) => void`)
- `onFocus`: Optional focus callback `() => void`
- `language`: Language identifier (default: `'tsx'`)
- `showCopyButton`: Show copy button (default: `true`)
- `showHint`: Show "Click anywhere to start editing" hint (default: `true`)
- `theme`: `'dark' | 'light'` (default: `'dark'`)
- `className`: Additional CSS classes

---

### `CodeBlock`

Static code display with syntax highlighting. Use for displaying code examples that users can copy but not edit.

```tsx
import { CodeBlock } from '@veraclins-dev/react-runner-codemirror';

function App() {
  const exampleCode = `function greet(name) {
  return \`Hello, \${name}!\`;
}`;

  return <CodeBlock code={exampleCode} language="tsx" showCopyButton={true} theme="dark" />;
}
```

**Props**:

- `code`: Code content (required, string)
- `language`: Language identifier (default: `'tsx'`)
- `showCopyButton`: Show copy button (default: `true`)
- `theme`: `'dark' | 'light'` (default: `'dark'`)
- `className`: Additional CSS classes

**Features**:

- Read-only CodeMirror editor
- Auto-detects system theme (when `theme="dark"`)
- Copy to clipboard functionality
- Syntax highlighting for multiple languages

---

## Utilities

### `getFilenameFromLanguage`

Converts language identifier to filename for CodeMirror language detection.

```tsx
import { getFilenameFromLanguage } from '@veraclins-dev/react-runner-codemirror';

const filename = getFilenameFromLanguage('tsx'); // Returns 'file.tsx'
const cssFile = getFilenameFromLanguage('css'); // Returns 'file.css'
```

**Supported Languages**:

- `tsx`, `ts` - TypeScript/TSX
- `jsx`, `js` - JavaScript/JSX
- `css` - CSS
- `json` - JSON
- `html` - HTML
- `md`, `markdown` - Markdown
- Other languages will return `file.{language}`

---

## Types

### `Theme`

```tsx
type Theme = 'dark' | 'light';
```

**Note**: For custom themes, use the `extensions` prop to provide custom CodeMirror theme extensions.

### `CodeMirrorProps`

Props interface for `CodeMirror` component. Extends `HTMLAttributes<HTMLDivElement>`.

### `CodeEditorProps`

Props interface for `CodeEditor` component.

### `CodeBlockProps`

Props interface for `CodeBlock` component.

---

## Examples

### Basic Editor

```tsx
import { CodeEditor } from '@veraclins-dev/react-runner-codemirror';

function MyEditor() {
  const [code, setCode] = useState('');

  return <CodeEditor code={code} onChange={setCode} language="tsx" theme="dark" />;
}
```

### Read-only Code Display

```tsx
import { CodeBlock } from '@veraclins-dev/react-runner-codemirror';

function CodeExample() {
  return <CodeBlock code="const x = 1;" language="tsx" showCopyButton={true} />;
}
```

### Custom Configuration

```tsx
import { CodeMirror } from '@veraclins-dev/react-runner-codemirror';

function CustomEditor() {
  return <CodeMirror value="const x = 1;" theme="light" showLineNumbers={true} wrapLine={true} padding={20} filename="file.tsx" />;
}
```

---

## Integration with `@veraclins-dev/docs`

This package is designed to work seamlessly with `@veraclins-dev/docs` for creating interactive code demos:

```tsx
import { InteractiveCodeDemo } from '@veraclins-dev/docs';
import { useCodeDemoScope } from '@veraclins-dev/docs';

const scope = useCodeDemoScope({
  additionalScope: { Button, useState },
});

<InteractiveCodeDemo code={exampleCode} scope={scope} title="Button Example" />;
```

---

## Dependencies

- `@codemirror/*` - CodeMirror 6 core packages
- `@lezer/highlight` - Syntax highlighting
- `@veraclins-dev/ui` - UI components (Button, Icon, Box)
- `@veraclins-dev/utils` - Utility functions
- `@veraclins-dev/react-utils` - React utilities (toast)

---

## License

MIT
