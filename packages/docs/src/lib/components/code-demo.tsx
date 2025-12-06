import { useState } from 'react';

import { CodeBlock } from '@veraclins-dev/react-runner-codemirror';
import { Box, Button, Typography } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import type { CodeDemoComponentProps } from './code-demo-types';
import { InteractiveCodeDemo } from './interactive-code-demo';

export function CodeDemo({
  code,
  language = 'tsx',
  scope = {},
  className,
  title,
  description,
  defaultMode = 'static',
  showModeToggle = false,
  defaultCode,
  theme,
}: CodeDemoComponentProps) {
  const [mode, setMode] = useState<'static' | 'interactive'>(defaultMode);

  return (
    <Box className={cn('space-y-4', className)}>
      {(title || description || showModeToggle) && (
        <Box
          display="flex"
          flexDirection="row"
          items="center"
          justify="between"
          flexWrap="wrap"
          gap={4}
        >
          <Box display="flex" flexDirection="column" gap={2} flex="1">
            {title && (
              <Typography variant="h4" className="font-semibold">
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="body2" className="text-muted-foreground">
                {description}
              </Typography>
            )}
          </Box>

          {showModeToggle && (
            <Box display="flex" gap={2}>
              <Button
                buttonSize="sm"
                variant={mode === 'static' ? 'solid' : 'outline'}
                color={mode === 'static' ? 'primary' : 'neutral'}
                onClick={() => setMode('static')}
              >
                Static
              </Button>
              <Button
                buttonSize="sm"
                variant={mode === 'interactive' ? 'solid' : 'outline'}
                color={mode === 'interactive' ? 'primary' : 'neutral'}
                onClick={() => setMode('interactive')}
              >
                Interactive
              </Button>
            </Box>
          )}
        </Box>
      )}

      {mode === 'static' ? (
        <CodeBlock
          code={code}
          language={language}
          theme={theme}
          showCopyButton
        />
      ) : (
        <InteractiveCodeDemo
          code={code}
          scope={scope}
          theme={theme}
          title={undefined}
          description={undefined}
          defaultCode={defaultCode}
        />
      )}
    </Box>
  );
}
