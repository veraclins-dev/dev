import { useRouteLoaderData } from 'react-router'

import { type loader } from '../root'

export function useRootLoaderData() {
	return useRouteLoaderData<typeof loader>('root')
}
