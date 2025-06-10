import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router';

type UseRemixSubmitStatus = ReturnType<typeof useFetcher>['state'];

export const useCustomFetcher = <T extends Record<string, any>>() => {
  const fetcher = useFetcher<T>();
  const [transitionLog, setTransitionLog] = useState<UseRemixSubmitStatus[]>([
    'idle',
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const shouldAppend = !transitionLog.includes(fetcher.state);
    const shouldReset = transitionLog.length > 1 && fetcher.state === 'idle';

    if (shouldAppend) {
      setSubmitted(false);
      setLoaded(false);
      setTransitionLog((curr) => [...curr, fetcher.state]);
    } else if (shouldReset) {
      setTransitionLog(['idle']);
      setLoaded(false);
      setSubmitted(transitionLog.includes('submitting'));
      setLoaded(transitionLog.includes('loading'));
    }
  }, [fetcher.state]);

  return {
    ...fetcher,
    loading: fetcher.state !== 'idle',
    submitted,
    loaded,
  };
};
