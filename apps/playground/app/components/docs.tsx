import * as React from 'react';
import { useState } from 'react';

import {
  CodeDemo,
  Runner,
  useCodeDemoScope,
  useRunner,
} from '@veraclins-dev/docs';
import * as UI from '@veraclins-dev/ui';
import {
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

const basicExample = `import { Button } from '@veraclins-dev/ui';

function App() {
  return (
    <Button variant="solid" color="primary">
      Click me
    </Button>
  );
}

export default App;
`;

const interactiveExample = `import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, CardTitle, Typography } from '@veraclins-dev/ui';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Counter Example</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography>Count: {count}</Typography>
        <Box display="flex" gap={2}>
          <Button onClick={() => setCount(count + 1)}>
            Increment
          </Button>
          <Button onClick={() => setCount(count - 1)}>
            Decrement
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Counter;`;

const formExample = `import { useState, useEffect } from 'react';
import { Box, Button, Input, Label } from '@veraclins-dev/ui';
 type FormExampleProps = {
  name: string;
};

/**
 * FormExample component
 * @param {FormExampleProps} props - The props for the FormExample component
 * @param {string} props.name - The initial name
 * @returns {JSX.Element} The FormExample component
 */
function FormExample({ name: initialName }: FormExampleProps) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        value={name}
        className="w-full"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <Button>Submit</Button>
      {name && <p>Hello, {name}!</p>}
    </Box>
  );
}

export default FormExample;`;

const runnerComponentExample = `import * as React from 'react';
import { Runner } from '@veraclins-dev/docs';
import * as UI from '@veraclins-dev/ui';

function App() {
  const code = \`import { Button } from '@veraclins-dev/ui';

export default function Demo() {
  return <Button variant="solid">Hello from Runner!</Button>;
}\`;

  const scope = {
    '@veraclins-dev/ui': UI,
    ...UI,
  };

  return <Runner code={code} scope={scope} />;
}`;

const runnerHookExample = `import * as React from 'react';
import { useState } from 'react';
import { useRunner } from '@veraclins-dev/docs';
import * as UI from '@veraclins-dev/ui';

function App() {
  const code = \`import { useState } from 'react';
import { Button } from '@veraclins-dev/ui';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  );
}\`;

  const scope = {
    react: React,
    useState,
    '@veraclins-dev/ui': UI,
    ...UI,
  };

  const { element, error } = useRunner({ code, scope });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>{element}</div>;
}`;

export function DocsShowcase() {
  const scope = useCodeDemoScope({
    scopeProvider: () => {
      // react-runner resolves imports by matching the import path to scope keys
      // 'react' import needs scope['react'] (string key)
      return {
        // For direct usage: React.useState
        React,
        // For imports: import { useState } from 'react'
        // react-runner requires string keys that match import paths exactly
        react: React, // String key required for import resolution
        useState,
        // For imports: import { Button } from '@veraclins-dev/ui'
        '@veraclins-dev/ui': UI,
        // For direct usage: Button component
        ...UI,
      };
    },
  });

  return (
    <Box className="space-y-8">
      <PlaygroundBreadcrumb currentPage="Docs" />

      <Box>
        <Typography variant="h1" className="mb-2">
          Docs Package
        </Typography>
        <Typography variant="body1" className="text-muted-foreground">
          Interactive code demo components for documentation with live editing,
          syntax highlighting, and code execution using react-runner.
        </Typography>
      </Box>

      <Card>
        <CardHeader>
          <CardTitle>Basic Usage</CardTitle>
          <CardDescription>
            Simple static code display with syntax highlighting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeDemo code={basicExample} language="tsx" mode="static" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Demo</CardTitle>
          <CardDescription>
            Live code editor with real-time preview and execution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeDemo code={interactiveExample} language="tsx" scope={scope} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Form Example</CardTitle>
          <CardDescription>
            Interactive form component with state management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeDemo code={formExample} language="tsx" scope={scope} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>
            Key features of the @veraclins-dev/docs package
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-4">
            <Box>
              <Typography variant="h4" className="mb-2">
                ✨ Interactive Code Editing
              </Typography>
              <Typography className="text-muted-foreground">
                Users can edit code directly in the browser and see changes in
                real-time using react-runner.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" className="mb-2">
                🎨 Syntax Highlighting
              </Typography>
              <Typography className="text-muted-foreground">
                Beautiful syntax highlighting for multiple languages using
                Prism.js and react-syntax-highlighter.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" className="mb-2">
                📋 Copy to Clipboard
              </Typography>
              <Typography className="text-muted-foreground">
                One-click code copying with toast notifications for better user
                experience.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" className="mb-2">
                🔄 Static & Interactive Modes
              </Typography>
              <Typography className="text-muted-foreground">
                Toggle between static code display and interactive editing modes
                based on your needs.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" className="mb-2">
                🎯 Customizable Scope
              </Typography>
              <Typography className="text-muted-foreground">
                Provide custom scope for code execution, allowing you to include
                your own components and utilities.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* React Code Runner Package Showcase */}
      <Box className="mt-12">
        <Typography variant="h2" className="mb-4">
          @veraclins-dev/docs
        </Typography>
        <Typography variant="body1" className="text-muted-foreground mb-8">
          React 19 compatible fork of react-runner. Run your React code on the
          go with full TypeScript support.
        </Typography>
      </Box>

      <Card>
        <CardHeader>
          <CardTitle>Using the Runner Component</CardTitle>
          <CardDescription>
            Direct component-based approach for running React code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeDemo
            code={runnerComponentExample}
            language="tsx"
            theme="dark"
            mode="static"
          />
          <Box className="p-4 border rounded-lg bg-muted/50">
            <Typography variant="subtitle2" className="mb-2">
              Live Preview:
            </Typography>
            <Runner
              code={`import { Button } from '@veraclins-dev/ui';

            export default function Demo() {
              return <Button variant="solid" color="primary">Hello from Runner!</Button>;
            }`}
              scope={{
                '@veraclins-dev/ui': UI,
                ...UI,
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Using the useRunner Hook</CardTitle>
          <CardDescription>
            Hook-based approach with error handling and caching support
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeDemo code={runnerHookExample} language="tsx" mode="static" />
          <RunnerHookDemo />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>React Code Runner Features</CardTitle>
          <CardDescription>
            Key features of the @veraclins-dev/docs package
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-4">
            <Box>
              <Typography variant="h4" className="mb-2">
                ✅ React 19 Compatible
              </Typography>
              <Typography className="text-muted-foreground">
                Updated peer dependencies to support React 19, ensuring
                compatibility with the latest React features.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" className="mb-2">
                🚀 Functional Components
              </Typography>
              <Typography className="text-muted-foreground">
                Modern functional component implementation using React hooks for
                better performance and developer experience.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" className="mb-2">
                📦 TypeScript Support
              </Typography>
              <Typography className="text-muted-foreground">
                Full TypeScript support with proper type definitions for all
                APIs and components.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" className="mb-2">
                🔧 Flexible API
              </Typography>
              <Typography className="text-muted-foreground">
                Choose between component-based (Runner) or hook-based
                (useRunner) approaches based on your needs.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" className="mb-2">
                🎯 Import Support
              </Typography>
              <Typography className="text-muted-foreground">
                Support for import statements and multi-file code execution with
                custom scope management.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function RunnerHookDemo() {
  const code = `import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@veraclins-dev/ui';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Counter: {count}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
        <Button onClick={() => setCount(count - 1)} variant="outline" className="ml-2">
          Decrement
        </Button>
      </CardContent>
    </Card>
  );
}`;

  const scope = React.useMemo(
    () => ({
      react: React,
      useState,
      '@veraclins-dev/ui': UI,
      ...UI,
    }),
    [],
  );

  const { element, error } = useRunner({ code, scope });

  return (
    <Box className="p-4 border rounded-lg bg-muted/50">
      <Typography variant="subtitle2" className="mb-2">
        Live Preview:
      </Typography>
      {error ? (
        <Box className="p-3 bg-destructive/10 border border-destructive rounded text-destructive text-sm">
          Error: {error.toString()}
        </Box>
      ) : (
        <Box>{element}</Box>
      )}
    </Box>
  );
}
