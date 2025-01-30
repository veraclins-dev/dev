import { createId as cuid } from '@paralleldrive/cuid2'
import { redirect } from '@remix-run/node'
import { Twitter1Strategy } from 'remix-auth-socials'
import TwitterApi from 'twitter-api-v2'
import { getCallback } from '../connections/common.ts'
import { connectionSessionStorage } from '../connections/connection.server.ts'
import { type AuthProvider } from './provider.ts'
import { emailToUserName, invariant } from '../../misc.ts'
import { redirectWithToast } from '../../toast.server.ts'

const shouldMock = process.env.TWITTER_CONSUMER_KEY?.startsWith('MOCK_')

const callbackURL = getCallback('twitter')

export class TwitterProvider implements AuthProvider {
	getAuthStrategy() {
		invariant(
			process.env.TWITTER_CONSUMER_KEY,
			'TWITTER CONSUMER KEY must be set',
		)
		invariant(
			process.env.TWITTER_CONSUMER_SECRET,
			'TWITTER CONSUMER SECRET must be set',
		)
		return new Twitter1Strategy(
			{
				consumerKey: process.env.TWITTER_CONSUMER_KEY,
				consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
				callbackURL,
				alwaysReauthorize: false,
			},
			async ({ accessToken, accessTokenSecret, profile: first, ...rest }) => {
				console.log('before', first, rest)

				const userClient = new TwitterApi({
					appKey: process.env.TWITTER_CONSUMER_KEY,
					appSecret: process.env.TWITTER_CONSUMER_SECRET,
					accessToken,
					accessSecret: accessTokenSecret,
				})
				const profile = await userClient.currentUser()
				const { email, screen_name, profile_image_url_https, name, id_str } =
					profile

				if (!email) {
					throw redirectWithToast('/auth/login', {
						title: 'Cannot connect Twitter Account',
						description: 'You may not have a Twitter email',
						type: 'error',
					})
				}
				return {
					email: email,
					id: id_str,
					username: screen_name ?? emailToUserName(email),
					imageUrl: profile_image_url_https,
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
		const code = 'MOCK_CODE_TWITTER_CLIENT'
		const searchParams = new URLSearchParams({ code, state })
		throw redirect(`${callbackURL}?${searchParams}`, {
			headers: {
				'set-cookie':
					await connectionSessionStorage.commitSession(connectionSession),
			},
		})
	}
}
