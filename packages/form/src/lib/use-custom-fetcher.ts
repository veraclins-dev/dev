import { useEffect, useState } from 'react';
import { type FetcherWithComponents, useFetcher } from 'react-router';

import { type SchemaType, type Values } from '@veraclins-dev/utils';

type Fetcher<T extends SchemaType> = FetcherWithComponents<Values<T>>;
type UseRemixSubmitStatus<T extends SchemaType> = Fetcher<T>['state'];

export type UseCustomFetcherReturn<T extends SchemaType> = Fetcher<T> & {
  loading: boolean;
  submitted: boolean;
  loaded: boolean;
};

export const useCustomFetcher = <
  T extends SchemaType,
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

  const data = fetcher as UseCustomFetcherReturn<T>;

  data.loading = fetcher.state !== 'idle';
  data.loaded = loaded;

  return data;
};
