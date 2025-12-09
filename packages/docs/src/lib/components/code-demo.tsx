import { CodeBlock } from '../codemirror';

import type { CodeDemoComponentProps } from './code-demo-types';
import { InteractiveCodeDemo } from './interactive-code-demo';

export function CodeDemo({
  code,
  language = 'tsx',
  scope = {},
  className,
  mode = 'interactive',
  defaultCode,
  theme,
}: CodeDemoComponentProps) {
  return mode === 'static' ? (
    <CodeBlock
      code={code}
      language={language}
      theme={theme}
      className={className}
      showCopyButton
    />
  ) : (
    <InteractiveCodeDemo
      className={className}
      code={code}
      scope={scope}
      theme={theme}
      defaultCode={defaultCode}
    />
  );
}
