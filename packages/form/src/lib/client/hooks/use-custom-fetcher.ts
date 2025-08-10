import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router';

type UseRemixSubmitStatus = ReturnType<typeof useFetcher>['state'];

export const useCustomFetcher = <T extends Record<string, any>>() => {
  const fetcher = useFetcher<T>();
  const [transitionLog, setTransitionLog] = useState<UseRemixSubmitStatus[]>([
    'idle',
  ]);
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
  };
};
