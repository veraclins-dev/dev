import { imageLoader } from '../../utils/image/image.server'

import { type Route } from './+types/image'

export const loader = async ({ request }: Route.LoaderArgs) => {
	return imageLoader({ request })
}
