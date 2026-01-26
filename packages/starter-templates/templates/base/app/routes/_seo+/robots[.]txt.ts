import { generateRobotsTxt } from '@veraclins-dev/remix-seo'
import { getDomainUrl } from '@veraclins-dev/utils'

import { type Route } from './+types/robots[.]txt'

export function loader({ request }: Route.LoaderArgs) {
	return generateRobotsTxt([
		{ type: 'sitemap', value: `${getDomainUrl(request)}/sitemap.xml` },
	])
}
