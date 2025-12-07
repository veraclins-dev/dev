import * as React from 'react';
import { createElement, isValidElement, type ReactElement } from 'react';

import { normalizeCode, transform } from './transform';
import type { RunnerOptions, Scope } from './types';

// Check if a string is a valid JavaScript identifier
const isValidIdentifier = (str: string): boolean => {
  // Must start with letter, $, or _, and contain only letters, digits, $, or _
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(str);
};

const evalCode = (code: string, scope: Scope) => {
  // `default` is not allowed in `new Function`
  // `exports` needs to be available for CommonJS-style code from sucrase
  const { default: _, import: imports, exports: scopeExports, ...rest } = scope;
  const finalScope: Scope = {
    React,
    require: createRequire(imports),
    exports: scopeExports || {},
    ...rest,
  };

  // Filter out invalid identifiers - Function constructor requires valid JS identifiers
  const scopeKeys = Object.keys(finalScope).filter(isValidIdentifier);
  const scopeValues = scopeKeys.map((key) => finalScope[key]);

  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(...scopeKeys, code);
    return fn(...scopeValues);
  } catch (error) {
    // Re-throw with more context
    if (error instanceof Error) {
      throw new Error(
        `evalCode failed: ${error.message}\nCode (first 300 chars): ${code.substring(0, 300)}\nAt position: ${(error as Error & { position?: number }).position || 'unknown'}`,
      );
    }
    throw error;
  }
};

export const generateElement = (
  options: RunnerOptions,
): ReactElement | null => {
  const { code, scope } = options;

  if (!code.trim()) return null;

  try {
    const normalized = normalizeCode(code);
    let transformed: string;
    try {
      transformed = transform(normalized);
    } catch (transformError) {
      throw new Error(
        `Transform failed: ${transformError instanceof Error ? transformError.message : String(transformError)}\nCode: ${normalized.substring(0, 300)}`,
      );
    }

    const exports: Scope = {};
    const render = (value: unknown) => {
      exports.default = value;
    };

    // Set up imports for require() calls - sucrase transforms imports to require()
    const imports: Scope = {};
    if (scope?.import) {
      Object.assign(imports, scope.import);
    }
    // Also add scope keys that match import paths (like '@veraclins-dev/ui')
    if (scope) {
      for (const [key, value] of Object.entries(scope)) {
        if (
          key.startsWith('@') ||
          (key.includes('/') && key !== 'react' && key !== 'React')
        ) {
          imports[key] = value;
        }
      }

      // Make sure 'react' is available for require() calls too
      if (scope.react) {
        imports.react = scope.react;
      }
    }

    evalCode(transformed, { render, ...scope, exports, import: imports });

    const result = exports.default;
    if (!result) return null;
    if (isValidElement(result)) return result;
    if (typeof result === 'function') return createElement(result);
    if (typeof result === 'string') {
      return result as unknown as ReactElement;
    }
    return null;
  } catch (error) {
    // Re-throw with more context
    if (error instanceof Error) {
      try {
        const normalized = normalizeCode(code);
        const transformed = transform(normalized);
        // Log full transformed code in development for debugging
        if (process.env.NODE_ENV === 'development') {
          console.error(
            '[generateElement] Full transformed code:',
            transformed,
          );
        }
        throw new Error(
          `Failed to generate element: ${error.message}\nOriginal code: ${code.substring(0, 200)}\nTransformed code (first 500 chars): ${transformed.substring(0, 500)}`,
        );
      } catch (innerError) {
        throw new Error(
          `Failed to generate element: ${error.message}\nAlso failed to get transformed code: ${innerError instanceof Error ? innerError.message : String(innerError)}`,
        );
      }
    }
    throw error;
  }
};

export const createRequire =
  (imports: Scope = {}) =>
  (module: string): Scope => {
    if (!Object.prototype.hasOwnProperty.call(imports, module)) {
      throw new Error(`Module not found: '${module}'`);
    }
    return imports[module];
  };

