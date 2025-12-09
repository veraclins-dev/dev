import { useState } from 'react';

import { toast } from '@veraclins-dev/react-utils';
import { Box, Button, Icon } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import { CodeMirror } from './code-mirror';
import { type CodeMirrorProps } from './code-mirror-types';
import { getFilenameFromLanguage } from './utils';

export interface CodeBlockProps extends Pick<CodeMirrorProps, 'theme'> {
  code: string;
  language?: string;
  className?: string;
  showCopyButton?: boolean;
}

export function CodeBlock({
  code,
  language = 'tsx',
  className,
  showCopyButton = true,
  theme,
}: CodeBlockProps) {
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
    <Box
      className={cn('relative rounded-lg border overflow-hidden', className)}
    >
      {showCopyButton && (
        <Box className="absolute top-2 right-2 z-10">
          <Button
            buttonSize="icon"
            variant="outline"
            onClick={handleCopy}
            className="h-8 w-8 bg-background/80 backdrop-blur-sm"
          >
            <Icon name={copied ? 'check' : 'copy'} className="size-4" />
          </Button>
        </Box>
      )}
      <CodeMirror
        value={code}
        onChange={() => {
          // Read-only, no-op
        }}
        theme={theme}
        filename={getFilenameFromLanguage(language)}
        padding={10}
        readOnly={true}
        showLineNumbers={false}
        className="focus:outline-none"
      />
    </Box>
  );
}
