/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { CodeEditor } from './code-editor';

const meta: Meta<typeof CodeEditor> = {
  component: CodeEditor,
  title: 'Code Editor/CodeEditor',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CodeEditor>;

const exampleCode = `import { useState } from 'react';
import { Button } from '@veraclins-dev/ui';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </div>
  );
}`;

export const Default: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.code || exampleCode);
    return (
      <CodeEditor
        {...args}
        code={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    code: exampleCode,
    language: 'tsx',
    showCopyButton: true,
    showHint: true,
  },
};

export const WithoutCopyButton: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.code || exampleCode);
    return (
      <CodeEditor
        {...args}
        code={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    code: exampleCode,
    language: 'tsx',
    showCopyButton: false,
    showHint: true,
  },
};

export const WithoutHint: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.code || exampleCode);
    return (
      <CodeEditor
        {...args}
        code={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    code: exampleCode,
    language: 'tsx',
    showCopyButton: true,
    showHint: false,
  },
};

export const JavaScript: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.code || '');
    return (
      <CodeEditor
        {...args}
        code={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`,
    language: 'js',
    showCopyButton: true,
    showHint: true,
  },
};

export const TypeScript: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.code || '');
    return (
      <CodeEditor
        {...args}
        code={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    code: `interface User {
  name: string;
  age: number;
}

function createUser(name: string, age: number): User {
  return { name, age };
}`,
    language: 'ts',
    showCopyButton: true,
    showHint: true,
  },
};

export const CSS: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.code || '');
    return (
      <CodeEditor
        {...args}
        code={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    code: `.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}`,
    language: 'css',
    showCopyButton: true,
    showHint: true,
  },
};

export const DarkTheme: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.code || exampleCode);
    return (
      <CodeEditor
        {...args}
        code={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    code: exampleCode,
    language: 'tsx',
    theme: 'dark',
    showCopyButton: true,
    showHint: true,
  },
};

export const LightTheme: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.code || exampleCode);
    return (
      <CodeEditor
        {...args}
        code={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    code: exampleCode,
    language: 'tsx',
    theme: 'light',
    showCopyButton: true,
    showHint: true,
  },
};

export const AutoTheme: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.code || exampleCode);
    return (
      <CodeEditor
        {...args}
        code={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    code: exampleCode,
    language: 'tsx',
    theme: 'dark',
    showCopyButton: true,
    showHint: true,
  },
};

export const WithOnFocus: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.code || exampleCode);
    const [focused, setFocused] = useState(false);
    return (
      <div>
        <CodeEditor
          {...args}
          code={code}
          onChange={(newCode) => setCode(newCode)}
          onFocus={() => setFocused(true)}
        />
        {focused && <p style={{ marginTop: '1rem' }}>Editor is focused!</p>}
      </div>
    );
  },
  args: {
    code: exampleCode,
    language: 'tsx',
    showCopyButton: true,
    showHint: true,
  },
};
