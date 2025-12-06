# React Runner CodeMirror - Analysis & Implementation Plan

## Executive Summary

This document provides a comprehensive analysis of the `react-runner-codemirror` library and a detailed implementation plan for creating a fork within the `veraclins-dev` monorepo. The fork will be adapted to align with our project standards, React 19 compatibility, and integration with our existing `@veraclins-dev/react-code-runner` package.

---

## 1. Source Repository Analysis

### 1.1 Overview

**Repository**: `react-runner-codemirror`
**Version**: `0.3.4`
**License**: MIT
**Author**: Neo Nie (nihgwu@live.com)
**Homepage**: https://react-runner-codemirror.vercel.app/

### 1.2 Purpose

`react-runner-codemirror` is a React wrapper for CodeMirror 6, specifically designed for editing React code. It provides:

- **CodeMirror 6 Integration**: Full-featured code editor with syntax highlighting
- **React Component API**: Simple React component interface
- **Theme Support**: Dark and light themes
- **Language Support**: JavaScript, TypeScript, TSX, and CSS
- **Editor Features**: Line numbers, line wrapping, autocomplete, history, etc.

### 1.3 Architecture

#### Core Components

1. **`CodeMirror.tsx`** - Main React component
   - Uses `forwardRef` to expose `EditorView` instance
   - Manages controlled/uncontrolled value patterns
   - Handles theme styling
   - Props: `value`, `defaultValue`, `onChange`, `theme`, `padding`, `readOnly`, `showLineNumbers`, `wrapLine`, `extensions`, `filename`

2. **`useCodeMirror.ts`** - Core hook
   - Manages `EditorView` lifecycle
   - Implements state caching for multi-file scenarios
   - Handles code updates and configuration changes
   - Uses CodeMirror's `Compartment` API for dynamic configuration

3. **`basicSetup.ts`** - Default editor configuration
   - History (undo/redo)
   - Tab size (2 spaces)
   - Multiple selections
   - Indentation on input
   - Syntax highlighting
   - Auto-close brackets
   - Autocompletion
   - Custom keybindings (Tab, Escape)

4. **`javascript.ts`** - JavaScript/TypeScript language support
   - Uses `@codemirror/lang-javascript` (tsxLanguage, javascriptLanguage)
   - Provides code snippets (try/catch, import, export)
   - Autocomplete integration

5. **`config.ts`** - Configuration system
   - Theme configuration (dark/light/custom)
   - Padding configuration
   - Read-only mode
   - Line numbers toggle
   - Line wrapping toggle
   - Custom extensions support
   - Filename-based language detection

### 1.4 Dependencies

#### Production Dependencies

```json
{
  "@codemirror/autocomplete": "^0.19.0",
  "@codemirror/closebrackets": "^0.19.0",
  "@codemirror/commands": "^0.19.0",
  "@codemirror/comment": "^0.19.0",
  "@codemirror/gutter": "^0.19.0",
  "@codemirror/highlight": "^0.19.0",
  "@codemirror/history": "^0.19.0",
  "@codemirror/lang-css": "^0.19.0",
  "@codemirror/lang-javascript": "^0.19.0",
  "@codemirror/language": "^0.19.0",
  "@codemirror/state": "^0.19.8",
  "@codemirror/theme-one-dark": "^0.19.0",
  "@codemirror/view": "^0.19.31"
}
```

#### Peer Dependencies

```json
{
  "react": "^16.8.0 || ^17 || ^18",
  "react-dom": "^16.8.0 || ^17 || ^18"
}
```

### 1.5 Build System

- **Bundler**: `microbundle`
- **Build Output**: CommonJS, ESM, UMD formats
- **TypeScript**: Full TypeScript support with type definitions
- **Testing**: Jest with jsdom environment

### 1.6 Key Features

1. **Multi-file Support**: State caching per filename
2. **Dynamic Configuration**: Uses CodeMirror compartments for runtime config changes
3. **Theme System**: Built-in dark/light themes + custom extension support
4. **Language Detection**: Automatic language detection based on filename
5. **Editor Features**: Line numbers, wrapping, read-only mode, custom extensions

---

## 2. Current State in Veraclins-Dev

### 2.1 Existing Package

There is already a placeholder package at:

```
packages/react-runner-codemirror/
```

**Current State**:

- Basic Nx project structure
- Placeholder component (`ReactRunnerCodemirror`)
- Vite build configuration
- ESLint configuration
- TypeScript configuration
- Empty test file

### 2.2 Related Packages

1. **`@veraclins-dev/react-code-runner`**
   - React 19 compatible fork of `react-runner`
   - Provides `useRunner` hook and `Runner` component
   - Handles code transformation and execution
   - Used by `@veraclins-dev/docs` for interactive code demos

2. **`@veraclins-dev/docs`**
   - Documentation package
   - Uses `react-code-runner` for live code execution
   - Currently uses `react-simple-code-editor` for code editing
   - Has `CodeEditor` component with Prism.js highlighting

### 2.3 Integration Points

The new `react-runner-codemirror` package should:

- Replace or complement `react-simple-code-editor` in `@veraclins-dev/docs`
- Work seamlessly with `@veraclins-dev/react-code-runner`
- Follow project standards (React 19, no forwardRef, etc.)
- Match existing code style and architecture patterns

---

## 3. Implementation Plan

### 3.1 Phase 1: Project Setup & Dependencies

#### 3.1.1 Update Package Configuration

**File**: `packages/react-runner-codemirror/package.json`

```json
{
  "name": "@veraclins-dev/react-runner-codemirror",
  "version": "1.0.0",
  "description": "CodeMirror 6 wrapper for React code editing - React 19 compatible",
  "main": "./index.js",
  "types": "./index.d.ts",
  "type": "module",
  "repository": "https://github.com/veraclins-dev/dev.git",
  "license": "MIT",
  "keywords": ["react", "codemirror", "editor", "code-editor", "syntax-highlighting", "react-19"],
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "import": "./index.js",
      "require": "./index.js"
    }
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "dependencies": {
    "@codemirror/autocomplete": "^6.21.0",
    "@codemirror/closebrackets": "^6.0.0",
    "@codemirror/commands": "^6.5.0",
    "@codemirror/comment": "^6.3.0",
    "@codemirror/gutter": "^6.1.0",
    "@codemirror/highlight": "^6.1.0",
    "@codemirror/history": "^6.3.0",
    "@codemirror/lang-css": "^6.2.0",
    "@codemirror/lang-javascript": "^6.2.0",
    "@codemirror/language": "^6.10.0",
    "@codemirror/state": "^6.4.0",
    "@codemirror/theme-one-dark": "^6.1.0",
    "@codemirror/view": "^6.32.0"
  }
}
```

**Key Changes**:

- Update to latest CodeMirror 6 versions (v6.x instead of v0.19.x)
- React 19 peer dependency
- Package name with `@veraclins-dev/` prefix
- Updated description

#### 3.1.2 Update Vite Configuration

**File**: `packages/react-runner-codemirror/vite.config.ts`

Add CodeMirror packages to external dependencies:

```typescript
rollupOptions: {
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@codemirror/autocomplete',
    '@codemirror/closebrackets',
    '@codemirror/commands',
    '@codemirror/comment',
    '@codemirror/gutter',
    '@codemirror/highlight',
    '@codemirror/history',
    '@codemirror/lang-css',
    '@codemirror/lang-javascript',
    '@codemirror/language',
    '@codemirror/state',
    '@codemirror/theme-one-dark',
    '@codemirror/view',
    '@veraclins-dev/utils',
    '@veraclins-dev/ui',
    '@veraclins-dev/react-utils',
    '@veraclins-dev/cva',
  ],
}
```

### 3.2 Phase 2: Core Implementation

#### 3.2.1 File Structure

```
packages/react-runner-codemirror/
├── src/
│   ├── index.ts                    # Main exports
│   ├── lib/
│   │   ├── code-mirror.tsx         # Main CodeMirror component
│   │   ├── use-code-mirror.ts      # Core hook
│   │   ├── basic-setup.ts          # Default editor configuration
│   │   ├── javascript.ts           # JavaScript/TypeScript support
│   │   ├── config.ts               # Configuration system
│   │   ├── code-mirror-types.ts    # Type definitions
│   │   └── code-mirror.spec.tsx    # Tests
│   ├── tsconfig.json
│   └── tsconfig.lib.json
├── package.json
├── project.json
├── vite.config.ts
└── README.md
```

#### 3.2.2 Implementation Adaptations

**Key Changes from Original**:

1. **Remove `forwardRef`**: Use React 19 ref prop pattern

   ```typescript
   // Original
   export const CodeMirror = forwardRef<EditorView, CodeMirrorProps>(...)

   // Adapted
   export interface CodeMirrorProps {
     ref?: React.Ref<EditorView>;
     // ... other props
   }
   export function CodeMirror({ ref, ...props }: CodeMirrorProps) { ... }
   ```

2. **Update CodeMirror API**: Adapt to v6.x API changes
   - Check for breaking changes in API
   - Update import paths if needed
   - Verify extension API compatibility

3. **Type Safety**: Use strict TypeScript
   - Remove `any` types
   - Add proper type guards
   - Use proper type assertions

4. **Component Structure**: Follow project patterns
   - Use `memo()` for expensive components
   - Include `data-slot` attributes
   - Extend HTML element props properly

5. **Styling**: Integrate with design system
   - Use CVA for variants if needed
   - Match existing theme colors
   - Support theme switching (light/dark/auto)

#### 3.2.3 Core Files Implementation

**`src/lib/code-mirror-types.ts`**

```typescript
import type { Extension } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import type { HTMLAttributes } from 'react';

export type Theme = 'dark' | 'light' | 'auto' | Extension;

export interface CodeMirrorConfig {
  theme?: Theme;
  padding?: number | string;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  wrapLine?: boolean;
  extensions?: Extension;
  filename?: string;
}

export interface CodeMirrorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'value' | 'onChange'>, CodeMirrorConfig {
  defaultValue?: string;
  value?: string;
  onChange?: (code: string) => void;
  ref?: React.Ref<EditorView>;
}
```

**`src/lib/config.ts`**

- Adapt to CodeMirror 6.x API
- Update theme configuration
- Ensure compartment API compatibility

**`src/lib/basic-setup.ts`**

- Update to CodeMirror 6.x keymap API
- Verify extension compatibility
- Maintain tab size (2 spaces) or make configurable

**`src/lib/javascript.ts`**

- Update to CodeMirror 6.x language API
- Verify tsxLanguage and javascriptLanguage exports
- Update snippet completion API

**`src/lib/use-code-mirror.ts`**

- Adapt to CodeMirror 6.x EditorView API
- Update state management
- Verify compartment reconfiguration API

**`src/lib/code-mirror.tsx`**

- Remove forwardRef, use React 19 ref pattern
- Add memo() wrapper
- Add data-slot attribute
- Integrate with design system styling
- Support theme='auto' for system preference

### 3.3 Phase 3: Integration with Existing Packages

#### 3.3.1 Update `@veraclins-dev/docs`

**Option A: Replace `CodeEditor`**

- Replace `react-simple-code-editor` with `CodeMirror`
- Maintain same API surface
- Update `InteractiveCodeDemo` to use new editor

**Option B: Add as Alternative**

- Keep `CodeEditor` for simple use cases
- Add `CodeMirrorEditor` for advanced use cases
- Allow users to choose

**Recommendation**: Option A - Replace for consistency and better features

#### 3.3.2 Integration Points

1. **`packages/docs/src/lib/components/code-demo/code-editor.tsx`**
   - Replace `SimpleCodeEditor` with `CodeMirror`
   - Maintain props compatibility
   - Update theme integration

2. **`packages/docs/src/lib/components/code-demo/interactive-code-demo.tsx`**
   - Update to use new `CodeMirror` component
   - Ensure onChange handler compatibility

3. **`packages/docs/src/lib/components/code-demo/code-demo-types.ts`**
   - Update `CodeEditorProps` if needed
   - Add CodeMirror-specific props if required

### 3.4 Phase 4: Testing & Quality Assurance

#### 3.4.1 Unit Tests

**File**: `src/lib/code-mirror.spec.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { CodeMirror } from './code-mirror';

describe('CodeMirror', () => {
  test('renders correctly', () => {
    render(<CodeMirror value="const x = 1;" />);
    // Assertions
  });

  test('handles onChange', () => {
    const handleChange = vi.fn();
    render(<CodeMirror value="const x = 1;" onChange={handleChange} />);
    // Test user interaction
  });

  test('supports theme switching', () => {
    // Test dark/light/auto themes
  });

  test('supports readOnly mode', () => {
    // Test read-only functionality
  });
});
```

#### 3.4.2 Integration Tests

- Test with `@veraclins-dev/react-code-runner`
- Test in `InteractiveCodeDemo` component
- Test theme switching
- Test multi-file scenarios

#### 3.4.3 Manual Testing Checklist

- [ ] Basic editing works
- [ ] Syntax highlighting works (JS/TS/TSX/CSS)
- [ ] Theme switching works (dark/light/auto)
- [ ] Line numbers toggle works
- [ ] Line wrapping toggle works
- [ ] Read-only mode works
- [ ] Autocomplete works
- [ ] History (undo/redo) works
- [ ] Tab indentation works
- [ ] Integration with react-code-runner works
- [ ] Performance is acceptable

### 3.5 Phase 5: Documentation

#### 3.5.1 README.md

```markdown
# @veraclins-dev/react-runner-codemirror

CodeMirror 6 wrapper for React code editing - React 19 compatible.

## Installation

\`\`\`bash
pnpm add @veraclins-dev/react-runner-codemirror
\`\`\`

## Usage

\`\`\`tsx
import { CodeMirror } from '@veraclins-dev/react-runner-codemirror';

function App() {
const [code, setCode] = useState('const x = 1;');

return (
<CodeMirror
      value={code}
      onChange={setCode}
      theme="auto"
      showLineNumbers
      language="tsx"
    />
);
}
\`\`\`

## API Reference

### Props

| Prop         | Type                                     | Default | Description                |
| ------------ | ---------------------------------------- | ------- | -------------------------- |
| value        | string                                   | -       | Controlled value           |
| defaultValue | string                                   | -       | Uncontrolled default value |
| onChange     | (code: string) => void                   | -       | Change handler             |
| theme        | 'dark' \| 'light' \| 'auto' \| Extension | 'auto'  | Theme                      |
| ...          | ...                                      | ...     | ...                        |

## Examples

See [@veraclins-dev/docs](../docs/README.md) for usage examples.
```

#### 3.5.2 Code Comments

- Add JSDoc comments to all public APIs
- Document complex logic
- Include usage examples in comments

### 3.6 Phase 6: Migration & Rollout

#### 3.6.1 Migration Strategy

1. **Create new package** (Phase 1-2)
2. **Test in isolation** (Phase 4)
3. **Integrate with docs package** (Phase 3)
4. **Update playground examples** (if needed)
5. **Remove old CodeEditor** (after verification)

#### 3.6.2 Rollout Plan

1. **Week 1**: Implementation (Phase 1-2)
2. **Week 2**: Testing & Integration (Phase 3-4)
3. **Week 3**: Documentation & Polish (Phase 5)
4. **Week 4**: Migration & Rollout (Phase 6)

---

## 4. Technical Considerations

### 4.1 CodeMirror 6.x Migration

**Potential Breaking Changes**:

- API changes between v0.19.x and v6.x
- Extension API updates
- Theme API changes
- Language support updates

**Migration Strategy**:

1. Review CodeMirror 6.x changelog
2. Test each component individually
3. Update imports and API calls
4. Verify all features work

### 4.2 React 19 Compatibility

**Key Changes**:

- Remove `forwardRef` usage
- Use new ref prop pattern
- Verify hook compatibility
- Test with React 19 strict mode

### 4.3 Performance Considerations

- **Lazy Loading**: Consider lazy loading CodeMirror for better initial load
- **Memoization**: Use `memo()` for CodeMirror component
- **State Management**: Optimize state updates
- **Bundle Size**: Monitor bundle size impact

### 4.4 Accessibility

- **Keyboard Navigation**: Ensure all keyboard shortcuts work
- **Screen Readers**: Test with screen readers
- **Focus Management**: Proper focus handling
- **ARIA Attributes**: Add appropriate ARIA attributes

### 4.5 Browser Support

- **Target Browsers**: Chrome > 61, Edge > 16, Firefox > 60, Safari > 10.1
- **Polyfills**: Check if any polyfills needed
- **Feature Detection**: Use feature detection where needed

---

## 5. Risk Assessment

### 5.1 High Risk

1. **CodeMirror 6.x API Changes**: Significant API changes may require extensive refactoring
   - **Mitigation**: Thorough testing, incremental migration

2. **Performance Impact**: CodeMirror is a large library
   - **Mitigation**: Code splitting, lazy loading, bundle analysis

3. **Integration Issues**: Compatibility with existing code
   - **Mitigation**: Comprehensive integration testing

### 5.2 Medium Risk

1. **Theme Integration**: Matching existing design system
   - **Mitigation**: Custom theme configuration

2. **Type Safety**: TypeScript compatibility
   - **Mitigation**: Strict type checking, type tests

### 5.3 Low Risk

1. **Documentation**: Keeping docs up to date
   - **Mitigation**: Documentation as part of implementation

2. **Testing**: Test coverage
   - **Mitigation**: Comprehensive test suite

---

## 6. Success Criteria

### 6.1 Functional Requirements

- [ ] CodeMirror component renders correctly
- [ ] Syntax highlighting works for JS/TS/TSX/CSS
- [ ] Theme switching works (dark/light/auto)
- [ ] All editor features work (line numbers, wrapping, etc.)
- [ ] Integration with react-code-runner works
- [ ] Performance is acceptable (< 100ms for updates)

### 6.2 Non-Functional Requirements

- [ ] TypeScript strict mode passes
- [ ] ESLint passes with no errors
- [ ] Test coverage > 80%
- [ ] Bundle size < 200KB (gzipped)
- [ ] Documentation is complete
- [ ] Follows project coding standards

### 6.3 Integration Requirements

- [ ] Works in `InteractiveCodeDemo`
- [ ] Replaces `CodeEditor` successfully
- [ ] No regressions in existing functionality
- [ ] Theme matches design system

---

## 7. Timeline Estimate

| Phase                   | Duration       | Dependencies  |
| ----------------------- | -------------- | ------------- |
| Phase 1: Setup          | 1 day          | None          |
| Phase 2: Implementation | 3-5 days       | Phase 1       |
| Phase 3: Integration    | 2-3 days       | Phase 2       |
| Phase 4: Testing        | 2-3 days       | Phase 2, 3    |
| Phase 5: Documentation  | 1-2 days       | Phase 2       |
| Phase 6: Migration      | 1-2 days       | Phase 3, 4, 5 |
| **Total**               | **10-16 days** |               |

---

## 8. Next Steps

1. **Review this plan** with the team
2. **Verify CodeMirror 6.x compatibility** - Check for breaking changes
3. **Set up development environment** - Install dependencies
4. **Begin Phase 1** - Project setup
5. **Incremental implementation** - Follow phases sequentially
6. **Continuous testing** - Test as you implement
7. **Documentation** - Document as you go

---

## 9. References

- [CodeMirror 6 Documentation](https://codemirror.net/docs/)
- [CodeMirror 6 Migration Guide](https://codemirror.net/docs/migrate/)
- [React 19 Release Notes](https://react.dev/blog/2024/04/25/react-19)
- [Original react-runner-codemirror](https://github.com/nihgwu/react-runner)
- [Veraclins-Dev Project Standards](../AGENTS.md)

---

## 10. Appendix

### 10.1 CodeMirror 6.x API Reference

Key APIs to verify:

- `EditorView` - Main editor view
- `EditorState` - Editor state management
- `Compartment` - Dynamic configuration
- `Extension` - Extension system
- Language support APIs

### 10.2 Project Standards Checklist

- [ ] No `forwardRef` - Use React 19 ref prop
- [ ] Use `memo()` for expensive components
- [ ] Include `data-slot` attributes
- [ ] Strict TypeScript
- [ ] Follow import order rules
- [ ] Use CVA for variants
- [ ] Proper error handling
- [ ] Comprehensive tests

---

**Document Version**: 1.0
**Last Updated**: 2025-01-XX
**Author**: AI Assistant
**Status**: Draft - Pending Review
