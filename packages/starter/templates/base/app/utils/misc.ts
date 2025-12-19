import { createRandomString } from '@veraclins-dev/utils'

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

export const generateReferralCode = () => {
	return createRandomString(8).toUpperCase()
}
