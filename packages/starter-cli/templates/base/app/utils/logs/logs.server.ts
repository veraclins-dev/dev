import { type Prisma } from '#app/utils/db/db.server'
import { db } from '#app/utils/db/db.server'
import { type AuditLogAction, type ActionSource, type TriggeredBy, type RoleType } from '#app/utils/db/enums'

export interface CreateAuditLogInput {
	action: AuditLogAction
	entityType: string
	entityId: string
	actorId: string
	role?: RoleType
	actionSource?: ActionSource
	triggeredBy?: TriggeredBy
	details?: Prisma.JsonValue
	groupId?: string | null
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
			groupId: data.groupId ?? null,
			role: data.role ?? 'member',
			actionSource: data.actionSource ?? 'user',
			triggeredBy: data.triggeredBy ?? 'manual',
		},
	})
}
