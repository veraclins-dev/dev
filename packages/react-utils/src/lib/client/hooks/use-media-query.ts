import { useEffect, useState } from 'react';

function useMediaQuery(queryInput: string): boolean {
  // Wait for jsdom to support the match media feature.
  // All the browsers we support have this built-in.
  // This defensive check is here for simplicity.
  // Most of the time, the match media logic isn't central to people tests.
  const supportMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

  let query = queryInput;
  query = query.replace(/^@media( ?)/m, '');

  const [match, setMatch] = useState(() => {
    if (supportMatchMedia) {
      return matchMedia(query).matches;
    }
    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
    return false;
  });

  useEffect(() => {
    let active = true;

    if (!supportMatchMedia) {
      return undefined;
    }

    const queryList = matchMedia(query);
    const updateMatch = () => {
      // Workaround Safari wrong implementation of matchMedia
      // TODO can we remove it?
      // https://github.com/mui-org/material-ui/pull/17315#issuecomment-528286677
      if (active) {
        setMatch(queryList.matches);
      }
    };
    updateMatch();
    queryList.addEventListener('change', updateMatch);
    return () => {
      active = false;
      queryList.removeEventListener('change', updateMatch);
    };
  }, [query, supportMatchMedia]);
  return match;
}

export { useMediaQuery };
