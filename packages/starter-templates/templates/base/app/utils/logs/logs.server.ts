import { db, type Prisma } from '../db/db.server'
import { type ActionSource, type AuditLogAction, type RoleType, type TriggeredBy } from '../db/enums'

export interface CreateAuditLogInput {
	action: AuditLogAction
	entityType: string
	entityId: string
	actorId: string
	role?: RoleType
	actionSource?: ActionSource
	triggeredBy?: TriggeredBy
	details?: Prisma.JsonValue
}

export const createAuditLog = async (
	data: CreateAuditLogInput,
	tx?: Prisma.TransactionClient,
) => {
	const dbInstance = tx || db
	return dbInstance.auditLog.create({
		data: {
			action: data.action,
			entityType: data.entityType,
			entityId: data.entityId,
			actorId: data.actorId,
			details: data.details ?? {},
			role: data.role ?? 'member',
			actionSource: data.actionSource ?? 'user',
			triggeredBy: data.triggeredBy ?? 'manual',
		},
	})
}

/** Log a user action (e.g. login, signup) to the audit log. */
export async function logUserAction(
	params: CreateAuditLogInput & { details?: Prisma.JsonValue },
) {
	return createAuditLog(params)
}
