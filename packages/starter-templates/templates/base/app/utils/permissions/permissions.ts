import { RoleLevel } from '#app/utils/db/enums'
import type { UserProfile } from '#app/utils/user/types'

/**
 * Permission string format: "action:entity:access"
 * Matches Prisma Permission model (action, entity, access).
 */
export type PermissionString = string

export function parseUserPermissionString(string: PermissionString) {
	const [action, entity, access] = string.split(':')
	return { action, entity, access }
}

export function userHasPermission(
	user: UserProfile | null | undefined,
	permission: PermissionString,
) {
	if (!user) return false
	const { action, entity, access } = parseUserPermissionString(permission)
	return user.role.permissions.some(
		(p) =>
			p.entity === entity && p.action === action && p.access === access,
	)
}

type WithRole = Pick<UserProfile, 'role'>

export function userHasRole<T extends WithRole>(
	user: T | null,
	level: RoleLevel,
) {
	if (!user) return false
	return user.role.level >= level
}

export function hasHigherRole<T extends WithRole>(user: T, level: RoleLevel) {
	return user.role.level > level
}

export function hasModeratorRole<T extends WithRole>(user?: T | null) {
	return Boolean(user && userHasRole(user, RoleLevel.moderator))
}

export function hasAdminRole<T extends WithRole>(user?: T | null) {
	return Boolean(user && userHasRole(user, RoleLevel.admin))
}

export function hasSuperAdminRole<T extends WithRole>(user?: T | null) {
	return Boolean(user && userHasRole(user, RoleLevel.superAdmin))
}

export function hasSystemAdminRole<T extends WithRole>(user?: T | null) {
	return Boolean(user && userHasRole(user, RoleLevel.systemAdmin))
}
