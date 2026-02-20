export {
	type ActionSource,
	type AuditLogAction,
	type RoleType,
	type TriggeredBy,
} from '#generated/prisma/client'

export const enum RoleLevel {
	user = 1,
	moderator = 5,
	admin = 10,
	superAdmin = 20,
	systemAdmin = 50,
}
