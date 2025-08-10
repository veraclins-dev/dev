import { useEffect, useState } from 'react';
import { type FetcherWithComponents, useFetcher } from 'react-router';

type Fetcher<T extends Record<string, any>> = FetcherWithComponents<T>;

type UseRemixSubmitStatus<T extends Record<string, any>> = Fetcher<T>['state'];

export type UseCustomFetcherReturn<T extends Record<string, any>> =
  Fetcher<T> & {
    loading: boolean;
    submitted: boolean;
    loaded: boolean;
  };

export const useCustomFetcher = <
  T extends Record<string, any>,
>(): UseCustomFetcherReturn<T> => {
  const fetcher = useFetcher<T>();
  const [transitionLog, setTransitionLog] = useState<UseRemixSubmitStatus<T>[]>(
    ['idle'],
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const shouldAppend = !transitionLog.includes(fetcher.state);
    const shouldReset = transitionLog.length > 1 && fetcher.state === 'idle';
    if (shouldAppend) {
      setLoaded(false);
      setTransitionLog((curr) => [...curr, fetcher.state]);
    } else if (shouldReset) {
      const hadLoading =
        transitionLog.includes('submitting') ||
        transitionLog.includes('loading');

      setTransitionLog(['idle']);
      setLoaded(hadLoading);
    }
  }, [fetcher.state, transitionLog]);

  return {
    ...fetcher,
    loading: fetcher.state !== 'idle',
    loaded,
  } as UseCustomFetcherReturn<T>;
};
