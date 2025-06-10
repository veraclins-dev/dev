import { useCallback } from 'react';
import {
  type LinkProps,
  type NavigateFunction,
  type NavigateOptions,
  useLocation,
  useNavigate,
} from 'react-router';

import { getPathWithRedirect } from './use-path-with-redirect';

export const useNavigateWithRedirect = (): NavigateFunction => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateWithRedirect: NavigateFunction = useCallback(
    (to: LinkProps['to'] | number, options: NavigateOptions = {}) => {
      if (typeof to === 'number') return navigate(to);
      const path = getPathWithRedirect(to, location.pathname);
      return navigate(path, options);
    },
    [location.pathname, navigate],
  );
  return navigateWithRedirect;
};
