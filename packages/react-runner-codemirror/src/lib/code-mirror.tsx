import { memo, useEffect, useMemo, useRef } from 'react';

import { Box } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import type { CodeMirrorProps } from './code-mirror-types';
import { useCodeMirror } from './use-code-mirror';

function CodeMirrorComponent({
  defaultValue,
  value,
  onChange,
  theme = 'dark',
  padding = 10,
  readOnly,
  showLineNumbers,
  wrapLine,
  extensions,
  filename,
  style,
  className,
  ref,
  ...rest
}: CodeMirrorProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const unControlledValue = useMemo(() => defaultValue, [defaultValue]);

  const viewRef = useCodeMirror({
    parentRef: parentRef,
    code: value !== undefined ? value : unControlledValue,
    onChange,
    theme,
    padding,
    readOnly,
    showLineNumbers,
    wrapLine,
    extensions,
    filename,
  });

  useEffect(() => {
    if (!ref) {
      return;
    }

    if (typeof ref === 'function') {
      ref(viewRef.current);
    } else {
      ref.current = viewRef.current;
    }

    return () => {
      if (typeof ref === 'function') {
        ref(null);
      } else if (ref) {
        ref.current = null;
      }
    };
  }, [ref, viewRef]);
  const mergedStyle = useMemo(
    () => ({
      fontFamily:
        'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      // CodeMirror themes handle their own styling, so we don't need to set colors here
      ...style,
    }),
    [style],
  );

  return (
    <Box
      ref={parentRef}
      data-slot="code-mirror"
      className={cn(className)}
      style={mergedStyle}
      {...rest}
    />
  );
}

export const CodeMirror = memo(CodeMirrorComponent);
