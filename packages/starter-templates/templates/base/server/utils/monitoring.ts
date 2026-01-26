import { PrismaInstrumentation } from '@prisma/instrumentation'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import * as Sentry from '@sentry/react-router'

export function init() {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		environment: process.env.NODE_ENV,
		tracesSampleRate: process.env.NODE_ENV === 'production' ? 1 : 0,
		denyUrls: [
			/\/resources\/healthcheck/,
			/\/build\//,
			/\/favicons\//,
			/\/img\//,
			/\/fonts\//,
			/\/favicon.ico/,
			/\/site\.webmanifest/,
		],
		integrations: [
			Sentry.prismaIntegration({
				prismaInstrumentation: new PrismaInstrumentation(),
			}),
			Sentry.httpIntegration(),
			nodeProfilingIntegration(),
		],
		tracesSampler(samplingContext) {
			if (samplingContext.request?.url?.includes('/resources/healthcheck')) {
				return 0
			}
			return 1
		},
		beforeSendTransaction(event) {
			if (event.request?.headers?.['x-healthcheck'] === 'true') {
				return null
			}

			return event
		},
	})
}
