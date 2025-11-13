import { useRouteLoaderData } from 'react-router';

import { invariant } from '@veraclins-dev/utils';

/**
 * Generic hook to get request info from a route loader.
 * The loader data must have a `requestInfo` property.
 *
 * @param routeId - The route ID to get loader data from (defaults to 'root')
 * @returns The request info from the loader
 */
export function useRequestInfo<T extends { requestInfo: unknown }>(
  routeId = 'root',
): T['requestInfo'] {
  const data = useRouteLoaderData<T>(routeId);
  invariant(data?.requestInfo, `No requestInfo found in ${routeId} loader`);

  return data.requestInfo;
}
