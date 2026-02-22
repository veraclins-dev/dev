import {
	hasAdminRole,
	hasModeratorRole,
	hasSuperAdminRole,
	hasSystemAdminRole,
	type PermissionString,
	userHasPermission,
} from '#app/utils/permissions/permissions'
import  { type UserProfile } from '#app/utils/user/types'

type UsePermissionsOptions<T extends UserProfile> = {
	user?: T | null
}

export const useUserPermissions = <T extends UserProfile>({
	user,
}: UsePermissionsOptions<T>) => {
	const hasPermission = (permission: PermissionString) =>
		Boolean(user && userHasPermission(user, permission))

	const isAModerator = hasModeratorRole(user)
	const isAnAdmin = hasAdminRole(user)
	const isASuperAdmin = hasSuperAdminRole(user)
	const isASystemAdmin = hasSystemAdminRole(user)
	return {
		hasPermission,
		isAModerator,
		isAnAdmin,
		isASuperAdmin,
		isASystemAdmin,
	}
}
