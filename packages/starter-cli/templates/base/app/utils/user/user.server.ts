import { db, type Prisma } from '#app/utils/db/db.server'
import { type User } from '#app/utils/db/types'

export const userInclude = {
	role: { include: { permissions: true } },
} satisfies Prisma.UserInclude

export type UserInclude = typeof userInclude

export const getUser: Prisma.UserDelegate['findFirst'] = (options) =>
	db.user.findFirst(options)

export const getUsers: Prisma.UserDelegate['findMany'] = (options) =>
	db.user.findMany(options)

export const getUserCount = (where?: Prisma.UserCountArgs['where']) =>
	db.user.count({ where })

export const getUserOrThrow: Prisma.UserDelegate['findFirstOrThrow'] = (
	options,
) => db.user.findFirstOrThrow(options)

export function getUserWithRelations(
	where: Prisma.UserWhereInput,
	include: UserInclude = userInclude,
) {
	return getUser({ where, include })
}

export function getUserById<T extends UserInclude>(
	id: User['id'],
	include: T = userInclude as T,
) {
	return getUserWithRelations({ id }, include)
}

export type UserProfile = Awaited<ReturnType<typeof getUserById>>

export function getUserByIdOrUsername(id: User['id']) {
	return getUserWithRelations({ OR: [{ id }, { username: id }] })
}

export function getUserByEmail(email: User['email']) {
	return getUserWithRelations({ email })
}
