import { createId as cuid } from '@paralleldrive/cuid2'
import { redirect } from '@remix-run/node'
import { GitHubStrategy } from 'remix-auth-socials'
import { getCallback } from '../connections/common.ts'
import { connectionSessionStorage } from '../connections/connection.server.ts'
import { type AuthProvider } from './provider.ts'
import { invariant } from '../../misc.ts'

const shouldMock = process.env.GIT_AUTH_CLIENT_ID?.startsWith('MOCK_')

const callbackURL = getCallback('github')

export class GitHubProvider implements AuthProvider {
	getAuthStrategy() {
		invariant(process.env.GIT_AUTH_CLIENT_ID, 'GITHUB CLIENT ID must be set')
		invariant(
			process.env.GIT_AUTH_CLIENT_SECRET,
			'GITHUB CLIENT SECRET must be set',
		)
		return new GitHubStrategy(
			{
				clientID: process.env.GIT_AUTH_CLIENT_ID,
				clientSecret: process.env.GIT_AUTH_CLIENT_SECRET,
				callbackURL,
			},
			async ({ profile }) => {
				const email = profile.emails[0]?.value.trim().toLowerCase() ?? ''
				const username = profile.displayName
				const imageUrl = profile.photos[0]?.value
				return {
					email,
					id: profile.id,
					username,
					name: profile.name.givenName,
					imageUrl,
				}
			},
		)
	}

	async handleMockAction(request: Request) {
		if (!shouldMock) return

		const connectionSession = await connectionSessionStorage.getSession(
			request.headers.get('cookie'),
		)
		const state = cuid()
		connectionSession.set('oauth2:state', state)
		const code = 'MOCK_CODE_GIT_AUTH_CLIENT'
		const searchParams = new URLSearchParams({ code, state })
		throw redirect(`${callbackURL}?${searchParams}`, {
			headers: {
				'set-cookie':
					await connectionSessionStorage.commitSession(connectionSession),
			},
		})
	}
}
