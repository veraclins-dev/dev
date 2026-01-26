import path from 'node:path'

import { imageLoader as baseImageLoader } from '@veraclins-dev/image/server'

export const imageLoader = async ({ request }: { request: Request }) => {
	const isDev = process.env.NODE_ENV === 'development'
	const basePath = isDev ? '' : path.join(process.cwd(), 'build', 'client')

	return baseImageLoader(request, {
		cacheDir: '.cache/images',
		isDev,
		basePath,
	})
}
