import { invariant } from '@veraclins-dev/utils'
import { useRouteLoaderData } from 'react-router'
import { type loader as rootLoader } from '#app/root.tsx'

export function useRequestInfo() {
	const data = useRouteLoaderData<typeof rootLoader>('root')
	invariant(data?.requestInfo, 'No requestInfo found in root loader')

	return data.requestInfo
}
