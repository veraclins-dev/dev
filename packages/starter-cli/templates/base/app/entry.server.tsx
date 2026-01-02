import crypto from 'node:crypto'
import { PassThrough } from 'node:stream'
import { styleText } from 'node:util'
import { contentSecurity } from '@nichtsam/helmet/content'
import { createReadableStreamFromReadable } from '@react-router/node'
import * as Sentry from '@sentry/react-router'
import { NonceProvider } from '@veraclins-dev/react-utils'
import { isbot } from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'
import { ServerRouter, type HandleDocumentRequestFunction } from 'react-router'
import { getEnv, init } from '#app/utils/env.server.ts'
import { makeTimings } from '#app/utils/timing.server.ts'
import { type Route } from './+types/root'

export const streamTimeout = 20_000

init()
global.ENV = getEnv()
const MODE = process.env.NODE_ENV ?? 'development'

type DocRequestArgs = Parameters<HandleDocumentRequestFunction>

export default async function handleRequest(...args: DocRequestArgs) {
	const [request, responseStatusCode, responseHeaders, reactRouterContext] =
		args

	if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
		responseHeaders.append('Document-Policy', 'js-profiling')
	}
	const callbackName = isbot(request.headers.get('user-agent'))
		? 'onAllReady'
		: 'onShellReady'

	const nonce = crypto.randomBytes(16).toString('hex')
	return new Promise((resolve, reject) => {
		let didError = false
		const timings = makeTimings('render', 'renderToPipeableStream')

		const { pipe, abort } = renderToPipeableStream(
			<NonceProvider value={nonce}>
				<ServerRouter
					nonce={nonce}
					context={reactRouterContext}
					url={request.url}
				/>
			</NonceProvider>,
			{
				[callbackName]: () => {
					const body = new PassThrough()
					responseHeaders.set('Content-Type', 'text/html')
					responseHeaders.append('Server-Timing', timings.toString())

					contentSecurity(responseHeaders, {
						crossOriginEmbedderPolicy: false,
						contentSecurityPolicy: {
							directives: {
								fetch: {
									'connect-src': [
										MODE === 'development' ? 'ws:' : undefined,
										process.env.SENTRY_DSN ? '*.sentry.io' : undefined,
										"'self'",
									],
									'font-src': [
										"'self'",
										'fonts.gstatic.com',
										'fonts.googleapis.com',
									],
									'frame-src': ["'self'"],
									'img-src': ["'self'", 'data:'],
									'script-src': [
										"'strict-dynamic'",
										"'self'",
										`'nonce-${nonce}'`,
									],
									'script-src-attr': [`'nonce-${nonce}'`],
								},
							},
						},
					})

					resolve(
						new Response(createReadableStreamFromReadable(body), {
							headers: responseHeaders,
							status: didError ? 500 : responseStatusCode,
						}),
					)
					pipe(body)
				},
				onShellError: (err: unknown) => {
					reject(err)
				},
				onError: (error: unknown) => {
					didError = true
					console.error(error)
				},
				nonce,
			},
		)

		setTimeout(abort, streamTimeout + 5000)
	})
}

export async function handleError(
	error: unknown,
	{ request }: Route.LoaderArgs | Route.ActionArgs,
) {
	if (request.signal.aborted) {
		return
	}
	if (error instanceof Error) {
		console.error(styleText('red', String(error.stack)))
	} else {
		console.error(styleText('red', String(error)))
	}

	if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
		Sentry.captureException(error)
	}
}
