import * as React from 'react';
import { useMemo } from 'react';

import type { CodeDemoScope } from '../components/code-demo-types';

export interface UseCodeDemoScopeOptions {
  /**
   * Additional scope items to merge with default scope
   */
  additionalScope?: CodeDemoScope;

  /**
   * Custom scope provider function
   * If provided, this will be used instead of default scope
   * Note: This should only be called on the client side (when used with ClientOnly)
   */
  scopeProvider?: () => CodeDemoScope;
}

/**
 * Hook to get code demo scope
 * Allows projects to customize the scope while providing sensible defaults
 * This hook should be used within ClientOnly components to avoid SSR issues
 */
export function useCodeDemoScope(
  options: UseCodeDemoScopeOptions = {},
): CodeDemoScope {
  const { additionalScope, scopeProvider } = options;
  const [isClient, setIsClient] = React.useState(false);

  // Only create scope on client side
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return useMemo(() => {
    // Return empty scope during SSR
    if (!isClient) {
      return {};
    }

    if (scopeProvider) {
      try {
        const customScope = scopeProvider();
        const finalScope = additionalScope
          ? { ...customScope, ...additionalScope }
          : customScope;

        return finalScope;
      } catch (error) {
        console.error('[useCodeDemoScope] Error creating scope:', error);
        return {};
      }
    }

    // Default scope - projects should override this
    // Provide React - @veraclins-dev/react-code-runner resolves 'react' import from scope['react']
    // String keys are required to match import paths exactly
    const defaultScope: CodeDemoScope = {
      React,
      react: React, // String key required for import resolution
      useState: React.useState,
      useEffect: React.useEffect,
    };

    const finalDefaultScope = additionalScope
      ? { ...defaultScope, ...additionalScope }
      : defaultScope;

    return finalDefaultScope;
  }, [additionalScope, scopeProvider, isClient]);
}
