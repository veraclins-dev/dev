import crypto from 'node:crypto'
import {
	forbidden,
	combineHeaders,
	getRequestInfo,
} from '@veraclins-dev/react-utils/server'
import { invariant } from '@veraclins-dev/utils'
import bcrypt from 'bcryptjs'
import { redirect, type RouterContextProvider } from 'react-router'
import { safeRedirect } from 'remix-utils/safe-redirect'
import {
	getSession,
	sessionKey,
	authSessionStorage,
} from '#app/utils/auth/session.server'
import { db, type Prisma } from '#app/utils/db/db.server'
import { type User, type Password } from '#app/utils/db/types'
import { generateReferralCode } from '#app/utils/misc'
import { getUserById } from '#app/utils/user/user.server'
import { sessionContext, userContext, userIdContext } from './context.server'

export const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7
export const SESSION_HEARTBEAT_INTERVAL = 1000 * 60 * 5
export const getSessionExpirationDate = () =>
	new Date(Date.now() + SESSION_EXPIRATION_TIME)

invariant(process.env.HOST, 'HOST url is missing')

export async function logout(
	request: Request,
	context?: Readonly<RouterContextProvider>,
	responseInit?: ResponseInit,
) {
	if (context && typeof context === 'object' && 'get' in context) {
		const routerContext = context
		routerContext.set(sessionContext, null)
		routerContext.set(userContext, null)
		routerContext.set(userIdContext, null)
	}

	const searchParams = new URL(request.url).searchParams
	const redirectTo = searchParams.get('redirectTo') ?? '/'
	const cookieSession = await getSession(request)
	const sessionId = cookieSession.get(sessionKey)
	const session = sessionId
		? await db.session.delete({ where: { id: sessionId } })
		: null

	throw redirect(safeRedirect(redirectTo), {
		...responseInit,
		headers: combineHeaders(
			{ 'set-cookie': await authSessionStorage.destroySession(cookieSession) },
			responseInit?.headers,
		),
	})
}

export function getDbSession(id: string) {
	return db.session.findUnique({
		select: {
			id: true,
			userId: true,
			lastSeenAt: true,
			expiresAt: true,
			createdAt: true,
		},
		where: { id, expiresAt: { gt: new Date() } },
	})
}

export async function getUserId(
	request: Request,
	context?: Readonly<RouterContextProvider>,
) {
	if (context && typeof context === 'object' && 'get' in context) {
		const routerContext = context
		const userId = routerContext.get(userIdContext)
		if (userId) return userId
	}

	const cookieSession = await getSession(request)
	const sessionId = cookieSession.get(sessionKey)
	if (!sessionId) return ''
	const session = await db.session.findUnique({
		select: { userId: true, lastSeenAt: true },
		where: { id: sessionId, expiresAt: { gt: new Date() } },
	})
	if (!session?.userId) {
		throw redirect('/', {
			headers: {
				'set-cookie': await authSessionStorage.destroySession(cookieSession),
			},
		})
	}

	if (session.lastSeenAt < new Date(Date.now() - SESSION_HEARTBEAT_INTERVAL)) {
		await db.session.update({
			where: { id: sessionId },
			data: { lastSeenAt: new Date() },
		})
	}

	return session.userId ?? ''
}

export async function getUser(
	request: Request,
	context?: Readonly<RouterContextProvider>,
) {
	if (context && typeof context === 'object' && 'get' in context) {
		const routerContext = context
		const user = routerContext.get(userContext)
		if (user) return user
	}

	const userId = await getUserId(request, context)
	if (!userId) return null

	const user = await getUserById(userId)
	if (!user) throw await logout(request, context)
	return user
}

export async function requireUserId(
	request: Request,
	context?: Readonly<RouterContextProvider>,
	redirectTo?: string,
) {
	const userId = await getUserId(request, context)

	if (!userId) {
		const requestUrl = new URL(request.url)
		redirectTo = redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`

		const loginParams = redirectTo ? new URLSearchParams({ redirectTo }) : null
		const loginRedirect = ['/auth/login', loginParams?.toString()]
			.filter(Boolean)
			.join('?')
		throw redirect(loginRedirect)
	}

	return userId
}

export async function requireUser(
	request: Request,
	context?: Readonly<RouterContextProvider>,
) {
	const user = await getUser(request, context)

	if (!user) {
		throw await redirectToLogin(request)
	}

	return user
}

export async function redirectToLogin(
	request: Request,
	redirectTo?: MaybeString,
) {
	const requestUrl = new URL(request.url)
	redirectTo = redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`
	const cookieSession = await getSession(request)

	const loginParams = redirectTo ? new URLSearchParams({ redirectTo }) : null
	const loginRedirect = ['/auth/login', loginParams?.toString()]
		.filter(Boolean)
		.join('?')
	throw redirect(safeRedirect(loginRedirect), {
		headers: {
			'set-cookie': await authSessionStorage.destroySession(cookieSession),
		},
	})
}

export async function requireOwner(
	request: Request,
	identifier: string,
	context?: Readonly<RouterContextProvider>,
) {
	const user = await requireUser(request, context)

	if (user.username !== identifier && user.id !== identifier) {
		throw forbidden()
	}

	return user
}

export async function requireAnonymous(
	request: Request,
	context?: Readonly<RouterContextProvider>,
) {
	const userId = await getUserId(request, context)
	if (userId) {
		throw redirect('/')
	}
}

export async function hashPassword(password: string) {
	return bcrypt.hash(password, 10)
}

export async function resetUserPassword({
	username,
	password,
}: {
	username: User['username']
	password: string
}) {
	const hashedPassword = await hashPassword(password)

	return db.user.update({
		where: { username },
		data: {
			password: {
				upsert: {
					create: { hash: hashedPassword },
					update: { hash: hashedPassword },
				},
			},
		},
	})
}

export async function createSession(
	user: string | Prisma.UserCreateInput,
	request: Request,
) {
	return await db.$transaction(async (tx) => {
		let session
		if (typeof user === 'string') {
			const [createdSession] = await Promise.all([
				tx.session.create({
					data: {
						expiresAt: getSessionExpirationDate(),
						userId: user,
					},
				}),
				tx.user.update({
					where: { id: user },
					data: { lastLoginAt: new Date() },
				}),
			])
			session = createdSession
		} else {
			session = await tx.session.create({
				data: {
					expiresAt: getSessionExpirationDate(),
					user: { create: { ...user, lastLoginAt: new Date() } },
				},
			})
		}
		return session
	})
}

export async function authenticate(rawEmail: string, password: string) {
	const email = rawEmail.trim()
	return verifyUserPassword(email, password)
}

export async function verifyUserPassword(
	email: string,
	password: Password['hash'],
) {
	const userWithPassword = await db.user.findFirst({
		where: { OR: [{ email }, { username: email }] },
		select: { id: true, password: { select: { hash: true } } },
	})

	if (!userWithPassword?.password) {
		return null
	}

	const isValid = await bcrypt.compare(password, userWithPassword.password.hash)

	if (!isValid) {
		return null
	}

	return userWithPassword.id
}

export async function login(userId: string, request: Request) {
	const session = await createSession(userId, request)
	return session
}

export function getPasswordHashParts(password: string) {
	const hash = crypto
		.createHash('sha1')
		.update(password, 'utf8')
		.digest('hex')
		.toUpperCase()
	return [hash.slice(0, 5), hash.slice(5)] as const
}

export async function checkIsCommonPassword(password: string) {
	const [prefix, suffix] = getPasswordHashParts(password)

	try {
		const response = await fetch(
			`https://api.pwnedpasswords.com/range/${prefix}`,
			{ signal: AbortSignal.timeout(1000) },
		)

		if (!response.ok) return false

		const data = await response.text()
		return data.split(/\r?\n/).some((line) => {
			const [hashSuffix] = line.split(':')
			return hashSuffix === suffix
		})
	} catch (error) {
		if (error instanceof DOMException && error.name === 'TimeoutError') {
			console.warn('Password check timed out')
			return false
		}

		console.warn('Unknown error during password check', error)
		return false
	}
}
