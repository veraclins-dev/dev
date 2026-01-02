import { redirect } from 'react-router'
import { db } from '#app/utils/db/db.server'
import { getUserById } from '#app/utils/user/user.server'
import { type Route } from '../../+types/root'
import { getDbSession, SESSION_HEARTBEAT_INTERVAL } from './auth.server'
import { sessionContext, userContext, userIdContext } from './context.server'
import { getSession, sessionKey, authSessionStorage } from './session.server'

export const authMiddleware: Route.MiddlewareFunction = async (
	{ request, context },
	next,
) => {
	const cookieSession = await getSession(request)
	const sessionId = cookieSession.get(sessionKey)

	if (!sessionId) {
		context.set(sessionContext, null)
		context.set(userContext, null)
		context.set(userIdContext, null)
		return next()
	}

	const session = await getDbSession(sessionId)

	if (!session?.userId) {
		context.set(sessionContext, null)
		context.set(userContext, null)
		context.set(userIdContext, null)

		throw redirect('/', {
			headers: {
				'set-cookie': await authSessionStorage.destroySession(cookieSession),
			},
		})
	}

	if (session.lastSeenAt < new Date(Date.now() - SESSION_HEARTBEAT_INTERVAL)) {
		db.session
			.update({
				where: { id: sessionId },
				data: { lastSeenAt: new Date() },
			})
			.catch(console.error)
	}

	context.set(sessionContext, session)
	context.set(userIdContext, session.userId)

	const user = await getUserById(session.userId)

	if (!user) {
		context.set(sessionContext, null)
		context.set(userContext, null)
		context.set(userIdContext, null)

		throw redirect('/', {
			headers: {
				'set-cookie': await authSessionStorage.destroySession(cookieSession),
			},
		})
	}

	context.set(userContext, user)

	return next()
}
