import { useState } from 'react';

import { toast } from '@veraclins-dev/react-utils';
import { Box, Button, Icon } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import { CodeMirror } from './code-mirror';
import { type CodeMirrorProps } from './code-mirror-types';
import { getFilenameFromLanguage } from './utils';

export interface CodeEditorProps extends Pick<
  CodeMirrorProps,
  'theme' | 'onChange' | 'onFocus'
> {
  code: string;
  language?: string;
  className?: string;
  showCopyButton?: boolean;
  showHint?: boolean;
}

export function CodeEditor({
  code,
  language = 'tsx',
  onChange,
  onFocus,
  className,
  showCopyButton = true,
  showHint = true,
  theme,
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast({
        type: 'success',
        title: 'Copied to clipboard',
        description: 'Code example copied successfully',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        type: 'error',
        title: 'Failed to copy',
        description: 'Unable to copy code to clipboard',
      });
    }
  };

  return (
    <Box className={cn('relative group/code-editor', className)}>
      {showCopyButton && (
        <Box className="absolute top-2 right-2 z-10">
          <Button
            buttonSize="sm"
            variant="plain"
            onClick={handleCopy}
            className="gap-2"
          >
            <Icon name={copied ? 'check' : 'copy'} className="size-4" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
      )}

      {showHint && (
        <Box
          tabIndex={0}
          className={cn(
            'absolute top-2 left-1/2 -translate-x-1/2 z-10',
            'px-3 py-1 rounded-md text-xs',
            'border border-border bg-card',
            'transition-all duration-300',
            'opacity-0 pointer-events-none',
            'group-hover/code-editor:opacity-100 group-hover/code-editor:pointer-events-auto',
          )}
        >
          Click anywhere to start editing
        </Box>
      )}

      <Box
        className={cn(
          'rounded-lg border overflow-hidden',
          'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
        )}
      >
        <CodeMirror
          value={code}
          onChange={onChange}
          onFocus={onFocus}
          theme={theme}
          filename={getFilenameFromLanguage(language)}
          padding={16}
          showLineNumbers={false}
          className="min-h-[200px]"
        />
      </Box>
    </Box>
  );
}
