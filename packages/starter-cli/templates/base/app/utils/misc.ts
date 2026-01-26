import { type User } from '../db/types'

export function getQueryParams<T extends Record<string, string>>(
	request: Request,
) {
	const url = new URL(request.url)
	return Object.fromEntries(url.searchParams.entries()) as T
}

export const getPageTitle = (page: string) => {
	const appName = globalThis.ENV?.APP_NAME ?? 'App'
	return `${page} | ${appName}`
}

export function getBaseURL() {
	return globalThis.ENV ? ENV.HOST : 'http://localhost:3000'
}

type NameFields = Pick<User, 'name' | 'username' | 'deletedAt'>

export const getProfileIdentifier = <T extends NameFields>(
	{ name, deletedAt, username }: T,
	withUserName = true,
) => {
	if (deletedAt) return 'Unavailable'

	return name ? (withUserName ? `${name} (${username})` : name) : username
}

export const getDisplayName = <T extends NameFields>(
	profile?: T | null,
	withUserName = true,
) => {
	if (!profile) return 'Anonymous'
	return getProfileIdentifier(profile, withUserName)
}
