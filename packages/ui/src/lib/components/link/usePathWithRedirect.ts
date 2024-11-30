import { useLocation } from '@remix-run/react';
import { useMemo } from 'react';

import { type LinkProps } from './utils';

export const getPathWithRedirect = (
  to: LinkProps['to'],
  currentPath: string,
  redirectToField = 'redirectTo',
) => {
  if (typeof to === 'number') return to;
  const redirectTo = new URLSearchParams([[redirectToField, currentPath]]);
  let path = to;
  if (typeof path === 'string') {
    path = path.includes('?')
      ? `${path}&${redirectTo}`
      : `${path}?${redirectTo}`;
  } else {
    path.search =
      typeof path.search === 'string' && path.search.includes('?')
        ? `${path.search}&${redirectTo}`
        : `?${redirectTo}`;
  }
  return path;
};

export const usePathWithRedirect = (to: LinkProps['to']) => {
  const location = useLocation();

  const path = useMemo(() => {
    return getPathWithRedirect(to, location.pathname);
  }, [location.pathname, to]);
  return path;
};
