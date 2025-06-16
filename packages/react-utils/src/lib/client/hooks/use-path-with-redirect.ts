import { useMemo } from 'react';
import { type LinkProps, useLocation } from 'react-router';

export const getPathWithRedirect = (
  to: LinkProps['to'],
  currentPath: string,
  REDIRECT_TO_FIELD = 'redirectTo',
) => {
  if (typeof to === 'number') return to;
  const redirectTo = new URLSearchParams([[REDIRECT_TO_FIELD, currentPath]]);
  let path = to;
  if (typeof path === 'string') {
    const hash = path.includes('#') ? path.split('#')[1] : '';
    path = path.split('#')[0] || '';
    path = path.includes('?')
      ? `${path}&${redirectTo}`
      : `${path}?${redirectTo}`;
    if (hash) {
      path = `${path}#${hash}`;
    }
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
