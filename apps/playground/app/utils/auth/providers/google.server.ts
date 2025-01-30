import { createId as cuid } from '@paralleldrive/cuid2'
import { redirect } from '@remix-run/node'
import { GoogleStrategy } from 'remix-auth-socials'
import { getCallback } from '../connections/common.ts'
import { connectionSessionStorage } from '../connections/connection.server.ts'
import { type AuthProvider } from './provider.ts'
import { emailToUserName, invariant } from '../../misc.ts'
import { redirectWithToast } from '../../toast.server.ts'

const shouldMock = process.env.GOOGLE_CLIENT_ID?.startsWith('MOCK_')

const callbackURL = getCallback('google')

export class GoogleProvider implements AuthProvider {
	getAuthStrategy() {
		invariant(process.env.GOOGLE_CLIENT_ID, 'GOOGLE CLIENT ID must be set')
		invariant(
			process.env.GOOGLE_CLIENT_SECRET,
			'GOOGLE CLIENT SECRET must be set',
		)
		return new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL,
			},
			async ({ profile }) => {
				const {
					displayName,
					_json: { email, picture, email_verified, sub, name },
				} = profile

				if (!email || !email_verified) {
					throw redirectWithToast('/auth/login', {
						title: 'Cannot connect Google Account',
						description: 'Your Google Email is Unverified',
						type: 'error',
					})
				}
				return {
					email: email,
					id: sub,
					username: displayName ?? emailToUserName(email),
					imageUrl: picture,
					name,
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
		const code = 'MOCK_CODE_GOOGLE_CLIENT'
		const searchParams = new URLSearchParams({ code, state })
		throw redirect(`${callbackURL}?${searchParams}`, {
			headers: {
				'set-cookie':
					await connectionSessionStorage.commitSession(connectionSession),
			},
		})
	}
}
