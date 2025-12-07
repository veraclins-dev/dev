import * as React from 'react';
import { useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';

import { toast } from '@veraclins-dev/react-utils';
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Icon,
  Separator,
  Typography,
} from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import { useRunner } from '../code-runner';
import { CodeEditor } from '../codemirror';

import type { CodeDemoProps, CodeDemoScope } from './code-demo-types';

export interface InteractiveCodeDemoProps extends Pick<
  CodeDemoProps,
  'code' | 'language' | 'className' | 'theme'
> {
  scope: CodeDemoScope;
  defaultCode?: string;
}

function InteractiveCodeDemoInner({
  code,
  scope = {},
  className,
  defaultCode,
  language = 'tsx',
  theme = 'dark',
}: InteractiveCodeDemoProps) {
  const [liveDemoActive, setLiveDemoActive] = useState(false);
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  const handleEditorFocus = () => {
    setLiveDemoActive(true);
  };

  // Use useRunner hook (MUI's approach) - works better with React 19 than Runner class component
  const initialCodeValue = (defaultCode || code || '').trim();
  const [liveCode, setLiveCode] = useState(initialCodeValue);

  // Memoize scope to prevent unnecessary re-renders (MUI pattern)
  const memoizedScope = React.useMemo(() => scope || {}, [scope]);

  // Use useRunner hook - following MUI's exact pattern
  const { element, error: runnerError } = useRunner({
    code: liveCode,
    scope: memoizedScope,
  });

  // For code editor, we'll manage state ourselves
  const handleCodeChange = (newCode: string) => {
    setLiveCode(newCode.trim());
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(liveCode);
      toast({
        type: 'success',
        title: 'Copied to clipboard',
        description: 'Code example copied successfully',
      });
    } catch {
      toast({
        type: 'error',
        title: 'Failed to copy',
        description: 'Unable to copy code to clipboard',
      });
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={4} className={className}>
      <Card elevated={false} borderless={true}>
        <CardContent
          display="flex"
          flexDirection="column"
          gap={4}
          className="min-h-[200px]"
        >
          {runnerError && (
            <Box
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                backgroundColor: 'hsl(var(--destructive) / 0.1)',
                border: '1px solid hsl(var(--destructive) / 0.2)',
                borderRadius: '0.5rem',
                color: 'hsl(var(--destructive))',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.875rem',
                whiteSpace: 'pre-wrap',
              }}
            >
              {String(runnerError)}
            </Box>
          )}
          <Box style={{ width: '100%' }}>
            {Object.keys(memoizedScope).length === 0 ? (
              <Box
                style={{
                  minHeight: '200px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body2" className="text-muted-foreground">
                  No scope provided. Please set up scope with useCodeDemoScope.
                </Typography>
              </Box>
            ) : (
              // Return element directly - MUI's pattern (works better with React 19)
              element
            )}
          </Box>
          <Separator />
          <Collapsible
            defaultOpen={false}
            open={isCodeExpanded}
            onOpenChange={setIsCodeExpanded}
            className="gap-y-4 flex flex-col"
          >
            <Box
              display="flex"
              flexDirection="row"
              items="center"
              justify="end"
              gap={2}
            >
              <CollapsibleTrigger asChild>
                <Button buttonSize="sm">
                  <Icon
                    name="chevron-down"
                    className={cn(
                      'size-4 transition-transform',
                      isCodeExpanded && 'rotate-180',
                    )}
                  >
                    {isCodeExpanded ? 'Collapse code' : 'Expand code'}
                  </Icon>
                </Button>
              </CollapsibleTrigger>
              <Button
                buttonSize="sm"
                variant="outline"
                onClick={handleCopyCode}
              >
                <Icon name="copy" className="size-4">
                  Copy code
                </Icon>
              </Button>
            </Box>
            <CollapsibleContent>
              <Box
                className="relative rounded-b-lg group"
                onFocus={handleEditorFocus}
              >
                <CodeEditor
                  code={liveCode}
                  language={language}
                  onChange={handleCodeChange}
                  onFocus={handleEditorFocus}
                  showCopyButton={false}
                  showHint={!liveDemoActive}
                  className="rounded-b-lg"
                  theme={theme}
                />
              </Box>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </Box>
  );
}

export function InteractiveCodeDemo(props: InteractiveCodeDemoProps) {
  return (
    <ClientOnly
      fallback={
        <Box className={cn('rounded-lg border bg-muted p-4', props.className)}>
          <Typography variant="body2" className="text-muted-foreground">
            Loading interactive example...
          </Typography>
        </Box>
      }
    >
      {() => <InteractiveCodeDemoInner {...props} />}
    </ClientOnly>
  );
}
