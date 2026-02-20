import * as cookie from 'cookie'
import { redirect } from 'react-router'

import { combineHeaders } from '@veraclins-dev/react-utils/server'

import type { MaybeString } from '../common/types'

const cookieName = 'en_confetti'

export function getConfetti(request: Request) {
	const cookieHeader = request.headers.get('cookie')
	const confettiId = cookieHeader
		? cookie.parse(cookieHeader)[cookieName]
		: null
	return {
		confettiId,
		headers: confettiId ? createConfettiHeaders(null) : null,
	}
}

export function createConfettiHeaders(value: MaybeString = String(Date.now())) {
	return new Headers({
		'set-cookie': cookie.serialize(cookieName, value ? value : '', {
			path: '/',
			maxAge: value ? 60 : -1,
		}),
	})
}

export async function redirectWithConfetti(url: string, init?: ResponseInit) {
	return redirect(url, {
		...init,
		headers: combineHeaders(init?.headers, createConfettiHeaders()),
	})
}
