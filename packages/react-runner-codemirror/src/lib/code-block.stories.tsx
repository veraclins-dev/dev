import type { Meta, StoryObj } from '@storybook/react-vite';

import { CodeBlock } from './code-block';

const meta: Meta<typeof CodeBlock> = {
  component: CodeBlock,
  title: 'Code Editor/CodeBlock',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

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
  args: {
    code: exampleCode,
    language: 'tsx',
    showCopyButton: true,
  },
};

export const WithoutCopyButton: Story = {
  args: {
    code: exampleCode,
    language: 'tsx',
    showCopyButton: false,
  },
};

export const JavaScript: Story = {
  args: {
    code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`,
    language: 'js',
    showCopyButton: true,
  },
};

export const TypeScript: Story = {
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
  },
};

export const CSS: Story = {
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
  },
};

export const DarkTheme: Story = {
  args: {
    code: exampleCode,
    language: 'tsx',
    theme: 'dark',
    showCopyButton: true,
  },
};

export const LightTheme: Story = {
  args: {
    code: exampleCode,
    language: 'tsx',
    theme: 'light',
    showCopyButton: true,
  },
};

export const AutoTheme: Story = {
  args: {
    code: exampleCode,
    language: 'tsx',
    theme: 'auto',
    showCopyButton: true,
  },
};

export const LongCode: Story = {
  args: {
    code: `import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@veraclins-dev/ui';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = useCallback(() => {
    if (input.trim()) {
      setTodos(prev => [...prev, {
        id: Date.now().toString(),
        text: input,
        completed: false,
      }]);
      setInput('');
    }
  }, [input]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const completedCount = useMemo(() =>
    todos.filter(todo => todo.completed).length,
    [todos]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo List ({completedCount}/{todos.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <input value={input} onChange={e => setInput(e.target.value)} />
          <Button onClick={addTodo}>Add</Button>
        </div>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              {todo.text}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}`,
    language: 'tsx',
    showCopyButton: true,
  },
};
