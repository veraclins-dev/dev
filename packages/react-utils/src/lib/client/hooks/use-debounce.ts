import { useEffect, useMemo, useRef } from 'react';

import { debounce, type DebouncedFunc } from '@veraclins-dev/utils';

// type DebouncedFunction<Callback extends (...args: never[]) => unknown> = ((
//   ...args: Parameters<Callback>
// ) => void) & {
//   cancel: () => void;
// };

export function useDebounce<
  Callback extends (...args: Parameters<Callback>) => ReturnType<Callback>,
>(callback: Callback, delay = 400): DebouncedFunc<Callback> {
  const callbackRef = useRef(callback);
  const debouncedFnRef = useRef<DebouncedFunc<Callback> | null>(null);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Create or update debounced function when delay changes
  useEffect(() => {
    // Cancel any pending calls from the previous debounced function
    if (debouncedFnRef.current) {
      debouncedFnRef.current.cancel();
    }

    // Create new debounced function with current delay
    debouncedFnRef.current = debounce(
      (...args: Parameters<Callback>) => callbackRef.current(...args),
      delay,
    );

    // Cleanup: cancel pending calls on unmount or delay change
    return () => {
      if (debouncedFnRef.current) {
        debouncedFnRef.current.cancel();
      }
    };
  }, [delay]);

  // Create stable wrapper function with cancel method
  // Use useMemo to create once and maintain stable reference
  const stableFn = useMemo(() => {
    const wrapper = ((...args: Parameters<Callback>) => {
      if (debouncedFnRef.current) {
        debouncedFnRef.current(...args);
      }
    }) as DebouncedFunc<Callback>;

    wrapper.cancel = () => {
      if (debouncedFnRef.current) {
        debouncedFnRef.current.cancel();
      }
    };

    return wrapper;
  }, []);

  return stableFn;
}
