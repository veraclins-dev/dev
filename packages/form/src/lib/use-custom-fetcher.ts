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

  const data = fetcher as UseCustomFetcherReturn<T>;

  data.loading = fetcher.state !== 'idle';
  data.submitted = submitted;
  data.loaded = loaded;

  return data;
};
