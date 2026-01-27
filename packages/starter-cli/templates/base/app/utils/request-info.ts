import { useRouteLoaderData } from 'react-router';

import { invariant } from '@veraclins-dev/utils';

import { type loader as rootLoader } from '../root';

export function useRequestInfo() {
	const data = useRouteLoaderData<typeof rootLoader>('root')
	invariant(data?.requestInfo, 'No requestInfo found in root loader')

	return data.requestInfo
}
