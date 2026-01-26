import { type RouterContextProvider } from 'react-router'

import { generateSitemap } from '@veraclins-dev/remix-seo'
import { getDomainUrl } from '@veraclins-dev/utils'

import { serverBuildContext } from '../../../server/utils/context'

import { type Route } from './+types/sitemap[.]xml'

export async function loader({ request, context }: Route.LoaderArgs) {
	const routerContext = context as unknown as RouterContextProvider
	const getServerBuild = routerContext.get(serverBuildContext)
	if (!getServerBuild) {
		throw new Error('serverBuild context not available')
	}
	const { build: serverBuild } = await getServerBuild()
	return generateSitemap(request, serverBuild.routes, {
		siteUrl: getDomainUrl(request),
		headers: {
			'Cache-Control': `public, max-age=${60 * 5}`,
		},
	})
}
