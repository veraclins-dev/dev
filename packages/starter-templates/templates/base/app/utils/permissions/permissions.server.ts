import { forbidden } from '@veraclins-dev/react-utils/server'
import type { RouterContextProvider } from 'react-router'

import { requireUserId } from '../auth/auth.server'
import { userContext } from '../auth/context.server'
import { RoleLevel } from '../db/enums'
import { getUserWithRelations } from '../user/user.server'

export async function requireUserWithRole(
	request: Request,
	level: RoleLevel,
	context?: Readonly<RouterContextProvider>,
) {
	if (context && typeof context === 'object' && 'get' in context) {
		const routerContext = context
		const user = routerContext.get(userContext)
		if (user?.role) {
			if (user.role.level < level) {
				throw forbidden(
					'Access denied: you do not have the required role to perform this action.',
				)
			}
			return user
		}
	}

	const userId = await requireUserId(request, context)
	const user = await getUserWithRelations({
		id: userId,
		role: { level: { gte: level } },
	})
	if (!user) {
		throw forbidden(
			'Access denied: you do not have the required role to perform this action.',
		)
	}
	return user
}

export async function requireAdminUser(
	request: Request,
	context?: Readonly<RouterContextProvider>,
) {
	return requireUserWithRole(request, RoleLevel.admin, context)
}
