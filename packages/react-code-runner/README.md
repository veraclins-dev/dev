# @veraclins-dev/react-code-runner

React 19 compatible code execution engine for running and previewing React code in the browser.

## Features

- ✅ **React 19 Compatible** - Updated peer dependencies for React 19
- Execute React components from code strings
- Support for function components, class components, and inline elements
- TypeScript and JSX transformation via Sucrase
- Import statement support with custom scope
- Server Side Rendering compatible

## Install

This package is part of the `@veraclins-dev` monorepo. Import it directly:

```tsx
import { Runner, useRunner } from '@veraclins-dev/react-code-runner';
```

## Usage

### Using the `Runner` component

```tsx
import { Runner } from '@veraclins-dev/react-code-runner';

const element = <Runner code={code} scope={scope} onRendered={handleRendered} />;
```

### Using the `useRunner` hook

```tsx
import { useRunner } from '@veraclins-dev/react-code-runner';

const { element, error } = useRunner({ code, scope });
```

### Using `import` statements with scope

You can provide modules in the scope's `import` property to support `import` statements in your code:

```tsx
import * as YourPkg from 'your-pkg';

const scope = {
  // Other globals
  Button: MyButton,
  // Modules available for import statements
  import: {
    'your-pkg': YourPkg,
    '@veraclins-dev/ui': UIPackage,
  },
};

const { element } = useRunner({
  code: `import { Component } from 'your-pkg';
export default function Demo() {
  return <Component />;
}`,
  scope,
});
```

## Options

- **code** `string`, _required_ - The code to be ran
- **scope** `object` - Globals that could be used in `code`

## Differences from react-runner

- Updated peer dependencies to support React 19 (`^19.0.0`)
- Maintained API compatibility with `react-runner`
- Same features and functionality

## License

MIT
