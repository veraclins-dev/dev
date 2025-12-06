import * as React from 'react';

import { useRunner } from '@veraclins-dev/react-code-runner';

import type { ReactRunnerWrapperProps } from './code-demo-types';

/**
 * Wrapper around @veraclins-dev/react-code-runner's useRunner hook
 * Provides error handling and scope management
 */
export function ReactRunnerWrapper({
  code,
  scope,
  onError,
}: ReactRunnerWrapperProps) {
  const { element, error } = useRunner({
    code,
    scope: scope || {},
  });

  React.useEffect(() => {
    if (onError) {
      onError(error?.toString() ?? null);
    }
  }, [error, onError]);

  return element ? <>{element}</> : null;
}
