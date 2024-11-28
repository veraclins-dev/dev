import { useFetcher } from '@remix-run/react';

export const useCustomFetcher = <T extends Record<string, any>>() => {
  const fetcher = useFetcher<T>();

  return {
    ...fetcher,
    loading: fetcher.state !== 'idle',
  };
};
