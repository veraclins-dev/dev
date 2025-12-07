/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { CodeMirror } from './code-mirror';

const meta: Meta<typeof CodeMirror> = {
  component: CodeMirror,
  title: 'Code Editor/CodeMirror',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CodeMirror>;

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
    const [code, setCode] = useState(args.value || exampleCode);
    return (
      <CodeMirror
        {...args}
        value={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    value: exampleCode,
    theme: 'dark',
    padding: 16,
    readOnly: false,
    showLineNumbers: false,
    wrapLine: false,
  },
};

export const ReadOnly: Story = {
  args: {
    value: exampleCode,
    theme: 'dark',
    padding: 16,
    readOnly: true,
    showLineNumbers: false,
    wrapLine: false,
  },
};

export const WithLineNumbers: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.value || exampleCode);
    return (
      <CodeMirror
        {...args}
        value={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    value: exampleCode,
    theme: 'dark',
    padding: 16,
    readOnly: false,
    showLineNumbers: true,
    wrapLine: false,
  },
};

export const WithLineWrapping: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.value || exampleCode);
    return (
      <CodeMirror
        {...args}
        value={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    value: exampleCode,
    theme: 'dark',
    padding: 16,
    readOnly: false,
    showLineNumbers: false,
    wrapLine: true,
  },
};

export const DarkTheme: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.value || exampleCode);
    return (
      <CodeMirror
        {...args}
        value={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    value: exampleCode,
    theme: 'dark',
    padding: 16,
    readOnly: false,
    showLineNumbers: false,
    wrapLine: false,
  },
};

export const LightTheme: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.value || exampleCode);
    return (
      <CodeMirror
        {...args}
        value={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    value: exampleCode,
    theme: 'light',
    padding: 16,
    readOnly: false,
    showLineNumbers: false,
    wrapLine: false,
  },
};

export const AutoTheme: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.value || exampleCode);
    return (
      <CodeMirror
        {...args}
        value={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    value: exampleCode,
    theme: 'dark',
    padding: 16,
    readOnly: false,
    showLineNumbers: false,
    wrapLine: false,
  },
};

export const CustomPadding: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.value || exampleCode);
    return (
      <CodeMirror
        {...args}
        value={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    value: exampleCode,
    theme: 'dark',
    padding: 24,
    readOnly: false,
    showLineNumbers: false,
    wrapLine: false,
  },
};

export const TypeScriptFile: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.value || '');
    return (
      <CodeMirror
        {...args}
        value={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    value: `interface User {
  name: string;
  age: number;
}

function createUser(name: string, age: number): User {
  return { name, age };
}`,
    theme: 'dark',
    padding: 16,
    readOnly: false,
    showLineNumbers: true,
    wrapLine: false,
    filename: 'file.ts',
  },
};

export const CSSFile: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.value || '');
    return (
      <CodeMirror
        {...args}
        value={code}
        onChange={(newCode) => setCode(newCode)}
      />
    );
  },
  args: {
    value: `.container {
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
    theme: 'dark',
    padding: 16,
    readOnly: false,
    showLineNumbers: false,
    wrapLine: false,
    filename: 'file.css',
  },
};
