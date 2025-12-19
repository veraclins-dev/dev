import { combineResponseInits } from '@veraclins-dev/react-utils/server'
import { invariant } from '@veraclins-dev/utils'
import { createCookieSessionStorage, redirect } from 'react-router'
import { safeRedirect } from 'remix-utils/safe-redirect'
import {
	getVerification,
	getVerificationRedirectToUrl,
	verifySessionStorage,
} from '#app/utils/auth/verification.server.tsx'
import {
	twoFAVerificationType,
	unverifiedSessionIdKey,
} from '#app/utils/auth/verification.utils.ts'
import { type Session } from '#app/utils/db/types.ts'

export const sessionKey = 'sessionId'

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set')

export const USER_SESSION_KEY = 'userId'

export const authSessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'en_session',
		httpOnly: true,
		path: '/',
		sameSite: 'lax',
		secrets: process.env.SESSION_SECRET.split(','),
		secure: process.env.NODE_ENV === 'production',
	},
})

const originalCommitSession = authSessionStorage.commitSession

Object.defineProperty(authSessionStorage, 'commitSession', {
	value: async function commitSession(
		...args: Parameters<typeof originalCommitSession>
	) {
		const [session, options] = args
		if (options?.expires) {
			session.set('expires', options.expires)
		}
		if (options?.maxAge) {
			session.set('expires', new Date(Date.now() + options.maxAge * 1000))
		}
		const expires = session.has('expires')
			? new Date(session.get('expires'))
			: undefined
		const setCookieHeader = await originalCommitSession(session, {
			...options,
			expires,
		})
		return setCookieHeader
	},
})

export function getSession(request: Request) {
	const cookie = request.headers.get('Cookie')
	return authSessionStorage.getSession(cookie)
}

export const rememberKey = 'remember'

export async function handleNewSession(
	{
		request,
		session,
		redirectTo,
		remember,
	}: {
		request: Request
		session: Session
		redirectTo?: string
		remember: boolean
	},
	responseInit?: ResponseInit,
) {
	const verification = await getVerification({
		target: session.userId,
		type: twoFAVerificationType,
	})

	const userHasTwoFactor = Boolean(verification)

	if (userHasTwoFactor) {
		const verifySession = await verifySessionStorage.getSession()
		verifySession.set(unverifiedSessionIdKey, session.id)
		verifySession.set(rememberKey, remember)
		const redirectUrl = getVerificationRedirectToUrl({
			request,
			type: twoFAVerificationType,
			target: session.userId,
			redirectTo,
		})
		return redirect(
			`${redirectUrl.pathname}?${redirectUrl.searchParams}`,
			combineResponseInits(
				{
					headers: {
						'set-cookie':
							await verifySessionStorage.commitSession(verifySession),
					},
				},
				responseInit,
			),
		)
	} else {
		const cookieSession = await getSession(request)
		cookieSession.set(sessionKey, session.id)

		return redirect(
			safeRedirect(redirectTo),
			combineResponseInits(
				{
					headers: {
						'set-cookie': await authSessionStorage.commitSession(
							cookieSession,
							{ expires: remember ? session.expiresAt : undefined },
						),
					},
				},
				responseInit,
			),
		)
	}
}
