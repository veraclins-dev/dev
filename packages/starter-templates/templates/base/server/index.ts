import { helmet } from '@nichtsam/helmet/node-http'
import { createRequestHandler } from '@react-router/express'
import { ip as ipAddress } from 'address'
import closeWithGrace from 'close-with-grace'
import compression from 'compression'
import express from 'express'
import { ipKeyGenerator, rateLimit } from 'express-rate-limit'
import getPort, { portNumbers } from 'get-port'
import morgan from 'morgan'
import { styleText } from 'node:util'
import { RouterContextProvider, type ServerBuild } from 'react-router'

import { serverBuildContext } from './utils/context.js'

const MODE = process.env.NODE_ENV ?? 'development'
const IS_PROD = MODE === 'production'
const IS_DEV = MODE === 'development'
const ALLOW_INDEXING = process.env.ALLOW_INDEXING !== 'false'
const SENTRY_ENABLED = IS_PROD && process.env.SENTRY_DSN

if (SENTRY_ENABLED) {
	void import('./utils/monitoring.js').then(({ init }) => init())
}

const viteDevServer = IS_PROD
	? undefined
	: await import('vite').then((vite) =>
			vite.createServer({
				server: { middlewareMode: true },
			}),
		)

const app = express()

const getHost = (req: { get: (key: string) => string | undefined }) =>
	req.get('X-Forwarded-Host') ?? req.get('host') ?? ''

app.set('trust proxy', true)

app.use((req, res, next) => {
	const proto = req.get('X-Forwarded-Proto')
	const host = getHost(req)
	global.ENV = global.ENV ?? {}
	ENV.HOST = host
	ENV.SCHEME = proto ?? 'https'
	if (proto === 'http') {
		res.set('X-Forwarded-Proto', 'https')
		res.redirect(`https://${host}${req.originalUrl}`)
		return
	}
	next()
})

app.get('*', (req, res, next) => {
	if (req.path.endsWith('/') && req.path.length > 1) {
		const query = req.url.slice(req.path.length)
		const safepath = req.path.slice(0, -1).replace(/\/+/g, '/')
		res.redirect(302, safepath + query)
	} else {
		next()
	}
})

app.use(compression())

app.disable('x-powered-by')

app.use((_, res, next) => {
	helmet(res, { general: { referrerPolicy: false } })
	next()
})

if (viteDevServer) {
	app.use(viteDevServer.middlewares)
} else {
	app.use(
		'/assets',
		express.static('build/client/assets', { immutable: true, maxAge: '1y' }),
	)

	app.use(express.static('build/client', { maxAge: '2h' }))
}

app.get(['/img/*', '/favicons/*'], (_req, res) => {
	return res.status(404).send('Not found')
})

morgan.token('url', (req) => {
	try {
		return decodeURIComponent(req.url ?? '')
	} catch {
		return req.url ?? ''
	}
})

app.use(
	morgan('tiny', {
		skip: (req, res) =>
			res.statusCode === 200 && req.url?.startsWith('/resources/healthcheck'),
	}),
)

const maxMultiple =
	!IS_PROD || process.env.PLAYWRIGHT_TEST_BASE_URL ? 10_000 : 1
const rateLimitDefault = {
	windowMs: 60 * 1000,
	limit: 1000 * maxMultiple,
	standardHeaders: true,
	legacyHeaders: false,
	validate: { trustProxy: false },
	keyGenerator: (req: express.Request) => {
		return req.get('fly-client-ip') ?? ipKeyGenerator(`${req.ip}`)
	},
}

const strongestRateLimit = rateLimit({
	...rateLimitDefault,
	windowMs: 60 * 1000,
	limit: 10 * maxMultiple,
})

const strongRateLimit = rateLimit({
	...rateLimitDefault,
	windowMs: 60 * 1000,
	limit: 100 * maxMultiple,
})

const generalRateLimit = rateLimit(rateLimitDefault)

app.use((req, res, next) => {
	const strongPaths = [
		'/auth/login',
		'/auth/signup',
		'/auth/verify',
		'/auth/forgot-password',
		'/auth/onboarding',
		'/auth/reset-password',
		'/resources/login',
		'/resources/verify',
	]
	if (req.method !== 'GET' && req.method !== 'HEAD') {
		if (strongPaths.some((p) => req.path.includes(p))) {
			return strongestRateLimit(req, res, next)
		}
		return strongRateLimit(req, res, next)
	}

	if (req.path.includes('/verify')) {
		return strongestRateLimit(req, res, next)
	}

	return generalRateLimit(req, res, next)
})

async function getBuild() {
	try {
		const build = viteDevServer
			? await viteDevServer.ssrLoadModule('virtual:react-router/server-build')
			: await import('../build/server/index.js')

		return { build: build as unknown as ServerBuild, error: null }
	} catch (error) {
		console.error('Error creating build:', error)
		return { error, build: null as unknown as ServerBuild }
	}
}

if (!ALLOW_INDEXING) {
	app.use((_, res, next) => {
		res.set('X-Robots-Tag', 'noindex, nofollow')
		next()
	})
}

app.all(
	'*',
	createRequestHandler({
		getLoadContext: () => {
			const context = new RouterContextProvider()
			context.set(serverBuildContext, getBuild)
			return context
		},
		mode: MODE,
		build: async () => {
			const { error, build } = await getBuild()
			if (error) {
				throw error
			}
			return build
		},
	}),
)

const desiredPort = Number(process.env.PORT || 3000)
const portToUse = await getPort({
	port: portNumbers(desiredPort, desiredPort + 100),
})
const portAvailable = desiredPort === portToUse
if (!portAvailable && !IS_DEV) {
	console.log(`⚠️ Port ${desiredPort} is not available.`)
	process.exit(1)
}

const server = app.listen(portToUse, () => {
	if (!portAvailable) {
		console.warn(
			styleText(
				'yellow',
				`⚠️  Port ${desiredPort} is not available, using ${portToUse} instead.`,
			),
		)
	}
	console.log(`🚀  We have liftoff!`)
	const localUrl = `http://localhost:${portToUse}`
	let lanUrl: MaybeString = null
	const localIp = ipAddress() ?? 'Unknown'
	if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(localIp)) {
		lanUrl = `http://${localIp}:${portToUse}`
	}

	console.log(
		`
		${styleText('bold', 'Local:')}            ${styleText('cyan', localUrl)}
		${lanUrl ? `${styleText('bold', 'On Your Network:')}  ${styleText('cyan', lanUrl)}` : ''}
		${styleText('bold', 'Press Ctrl+C to stop')}
		`.trim(),
	)
})

closeWithGrace(async ({ err }) => {
	await new Promise((resolve, reject) => {
		server.close((e) => (e ? reject(e) : resolve('ok')))
	})
	if (err) {
		console.error(styleText('red', String(err)))
		console.error(styleText('red', String(err.stack)))
		if (SENTRY_ENABLED) {
			const Sentry = await import('@sentry/react-router')
			Sentry.captureException(err)
			await Sentry.flush(500)
		}
	}
})
