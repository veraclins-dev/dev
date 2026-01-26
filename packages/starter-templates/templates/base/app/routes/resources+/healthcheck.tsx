import { db } from '../../utils/db/db.server'
import { type Route } from './+types/healthcheck'

export async function loader({ request }: Route.LoaderArgs) {
	const host =
		request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')

	try {
		await Promise.all([
			db.$queryRaw`SELECT 1`,
			fetch(`${new URL(request.url).protocol}${host}`, {
				method: 'HEAD',
				headers: { 'X-Healthcheck': 'true' },
			}).then((r) => {
				if (!r.ok) return Promise.reject(r)
				return r.text()
			}),
		])
		return new Response('OK')
	} catch (error: unknown) {
		console.log('healthcheck ❌', { error })
		return new Response('ERROR', { status: 500 })
	}
}
