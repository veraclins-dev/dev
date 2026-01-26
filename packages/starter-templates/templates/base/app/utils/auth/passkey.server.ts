import { db, type Prisma } from '../db/db.server'

export const getUserPasskeys = async (userId: string) =>
	db.passkey.findMany({
		where: { userId },
		select: { id: true, name: true },
	})

type PassKeyOptions = Omit<Parameters<typeof db.passkey.findUnique>[0], 'where'>

export const getPasskey = async (
	id: string,
	options: PassKeyOptions = { select: { id: true } },
) => {
	return db.passkey.findUnique({
		where: { id },
		...options,
	})
}

type Data = Prisma.PasskeyCreateArgs['data']

type Option<
	T extends
		| Prisma.PasskeyCreateArgs
		| Prisma.PasskeyUpdateArgs = Prisma.PasskeyCreateArgs,
> = Omit<T, 'data' | 'where'>

export const createPasskey = async (data: Data, option: Option = {}) => {
	const passkey = await db.passkey.create({ data, ...option })
	return passkey
}

export const updatePasskey = async (
	id: string,
	data: Prisma.PasskeyUpdateArgs['data'],
	options: Option<Prisma.PasskeyUpdateArgs> = {},
) => {
	const passkey = await db.passkey.update({
		where: { id },
		data,
		...options,
	})
	return passkey
}

export const deletePasskey = async (id: string) => {
	return db.passkey.delete({
		where: { id },
	})
}
