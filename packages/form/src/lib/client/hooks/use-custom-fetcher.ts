import { useEffect, useMemo, useReducer, useRef } from 'react';
import { type FetcherWithComponents, useFetcher } from 'react-router';

type Fetcher<T> = FetcherWithComponents<T>;

export type UseCustomFetcherReturn<T extends Record<string, any>> =
  Fetcher<T> & {
    loading: boolean;
    submitted: boolean; // true briefly after submission completes
    loaded: boolean; // true briefly after any request completes
  };

type Action =
  | { type: 'RESET' }
  | { type: 'SUBMISSION_STARTED' }
  | { type: 'REQUEST_STARTED' }
  | { type: 'SUBMISSION_COMPLETED' }
  | { type: 'REQUEST_COMPLETED' };

interface State {
  submitted: boolean;
  loaded: boolean;
}

const initialState: State = { submitted: false, loaded: false };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET':
      return initialState;
    case 'SUBMISSION_STARTED':
      return { submitted: false, loaded: false };
    case 'REQUEST_STARTED':
      return { submitted: state.submitted, loaded: false };
    case 'SUBMISSION_COMPLETED':
      return { submitted: true, loaded: true };
    case 'REQUEST_COMPLETED':
      return { submitted: state.submitted, loaded: true };
    default:
      return state;
  }
}

export const useCustomFetcher = <
  T extends Record<string, any>,
>(): UseCustomFetcherReturn<T> => {
  const fetcher = useFetcher<T>();
  const prevStateRef = useRef<Fetcher<T>['state'] | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  // This effect ONLY reads and dispatches — NO setState!
  useEffect(() => {
    const current = fetcher.state;
    const prev = prevStateRef.current;

    // Starting a new request
    if ((prev === 'idle' || prev === null) && current !== 'idle') {
      if (current === 'submitting') {
        dispatch({ type: 'SUBMISSION_STARTED' });
      } else {
        dispatch({ type: 'REQUEST_STARTED' });
      }
    }

    // Request completed
    if (prev && prev !== 'idle' && current === 'idle') {
      if (prev === 'submitting') {
        dispatch({ type: 'SUBMISSION_COMPLETED' });
      } else {
        dispatch({ type: 'REQUEST_COMPLETED' });
      }
    }

    prevStateRef.current = current;
  }, [fetcher.state]);

  const loading = fetcher.state !== 'idle';

  return useMemo(
    () =>
      ({
        ...fetcher,
        loading,
        submitted: state.submitted,
        loaded: state.loaded,
      }) as UseCustomFetcherReturn<T>,
    [fetcher, loading, state.submitted, state.loaded],
  );
};
