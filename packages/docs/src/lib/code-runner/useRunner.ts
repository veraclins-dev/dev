import { type ReactElement, useMemo } from 'react';

import type { RunnerOptions } from './types';
import { generateElement } from './utils';

export type UseRunnerProps = RunnerOptions & {
  /** whether to cache previous element when error occurs with current code */
  disableCache?: boolean;
};

export type UseRunnerReturn = {
  element: ReactElement | null;
  error: Error | string | null;
};

export const useRunner = ({
  code,
  scope,
  disableCache,
}: UseRunnerProps): UseRunnerReturn => {
  return useMemo(() => {
    try {
      const element = generateElement({ code, scope });
      return { element, error: null };
    } catch (err: unknown) {
      return {
        element: disableCache ? null : null, // Could cache previous element here if needed
        error: err instanceof Error ? err : new Error(String(err)),
      };
    }
  }, [code, scope, disableCache]);
};

