import { type User } from '../utils/db/types'

import { useRootLoaderData } from './use-root-loader'

function isUser<T extends User>(user: T | null): user is T {
	return (
		user !== null &&
		typeof user === 'object' &&
		'email' in user &&
		'username' in user
	)
}

export function useOptionalUser() {
	const data = useRootLoaderData()

	if (!data || !isUser(data.user)) {
		return undefined
	}
	return data.user
}
