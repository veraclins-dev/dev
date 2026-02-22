import { type paginate } from '#app/utils/db/db.server'

export {
	type AuditLog,
	type Connection,
	type Passkey,
	type Password,
	type Role,
	type Session,
	type User,
	type Verification,
} from '#generated/prisma/client'

export type PaginateResult<T> = Awaited<ReturnType<typeof paginate<T[]>>>
