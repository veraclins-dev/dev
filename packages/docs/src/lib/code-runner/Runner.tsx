import { memo, useEffect, useMemo } from 'react';

import type { RunnerOptions } from './types';
import { generateElement } from './utils';

export type RunnerProps = RunnerOptions & {
  /** callback on code be rendered, returns error message when code is invalid */
  onRendered?: (error?: Error) => void;
};

export const Runner = memo(function Runner({
  code,
  scope,
  onRendered,
}: RunnerProps) {
  // Generate element when code or scope changes
  const { element, error } = useMemo(() => {
    try {
      const generatedElement = generateElement({ code, scope });
      return { element: generatedElement, error: null };
    } catch (err: unknown) {
      return {
        element: null,
        error: err as Error,
      };
    }
  }, [code, scope]);

  // Call onRendered callback when error state changes
  useEffect(() => {
    onRendered?.(error || undefined);
  }, [error, onRendered]);

  // Return null if there's an error, otherwise return the element
  return error ? null : element;
});

