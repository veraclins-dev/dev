import { createId as cuid } from '@paralleldrive/cuid2'
import { redirect } from '@remix-run/node'
import { FacebookStrategy } from 'remix-auth-socials'
import { getCallback } from '../connections/common.ts'
import { connectionSessionStorage } from '../connections/connection.server.ts'
import { type AuthProvider } from './provider.ts'
import { emailToUserName, invariant } from '../../misc.ts'
import { redirectWithToast } from '../../toast.server.ts'

const shouldMock = process.env.FACEBOOK_CLIENT_ID?.startsWith('MOCK_')

const callbackURL = getCallback('facebook')

export class FacebookProvider implements AuthProvider {
	getAuthStrategy() {
		invariant(process.env.FACEBOOK_CLIENT_ID, 'FACEBOOK CLIENT ID must be set')
		invariant(
			process.env.FACEBOOK_CLIENT_SECRET,
			'FACEBOOK CLIENT SECRET must be set',
		)
		return new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_CLIENT_ID,
				clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
				callbackURL,
			},
			async ({ profile }) => {
				const {
					displayName,
					_json: {
						email,
						name,
						picture: {
							data: { url },
						},
						id,
					},
				} = profile

				if (!email) {
					throw redirectWithToast('/auth/login', {
						title: 'Cannot connect Facebook Account',
						description: 'You may not have a Facebook email',
						type: 'error',
					})
				}
				return {
					email,
					id,
					username: displayName ?? emailToUserName(email),
					imageUrl: url,
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
		const code = 'MOCK_CODE_FACEBOOK_CLIENT'
		const searchParams = new URLSearchParams({ code, state })
		throw redirect(`${callbackURL}?${searchParams}`, {
			headers: {
				'set-cookie':
					await connectionSessionStorage.commitSession(connectionSession),
			},
		})
	}
}
