// ============================================================================
// SENTRY MONITORING PROVIDER
// ============================================================================

import { PrismaInstrumentation } from '@prisma/instrumentation'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import * as Sentry from '@sentry/react-router'

import {
	type MonitoringConfig,
	type MonitoringProviderInterface,
} from './types'

export class SentryMonitoringProvider implements MonitoringProviderInterface {
	init(config: MonitoringConfig) {
		if (!config.dsn) {
			console.warn('Sentry DSN not provided. Monitoring disabled.')
			return
		}

		Sentry.init({
			dsn: config.dsn,
			environment: config.environment || process.env.NODE_ENV || 'development',
			tracesSampleRate: config.tracesSampleRate ?? (config.environment === 'production' ? 1.0 : 0),
			replaysSessionSampleRate: config.replaysSessionSampleRate ?? 0.1,
			replaysOnErrorSampleRate: config.replaysOnErrorSampleRate ?? 1.0,
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
				return config.environment === 'production' ? 1 : 0
			},
			beforeSendTransaction(event) {
				if (event.request?.headers?.['x-healthcheck'] === 'true') {
					return null
				}
				return event
			},
			beforeSend(event) {
				if (event.request?.url) {
					const url = new URL(event.request.url)
					if (
						url.protocol === 'chrome-extension:' ||
						url.protocol === 'moz-extension:'
					) {
						return null
					}
				}
				return event
			},
		})
	}

	captureException(error: Error, context?: Record<string, unknown>) {
		Sentry.captureException(error, { extra: context })
	}

	captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
		Sentry.captureMessage(message, { level })
	}

	setUser(user: { id: string; email?: string; username?: string }) {
		Sentry.setUser({
			id: user.id,
			email: user.email,
			username: user.username,
		})
	}
}

// Client-side initialization (for browser)
export function initClient(config: MonitoringConfig) {
	if (!config.dsn) {
		console.warn('Sentry DSN not provided. Monitoring disabled.')
		return
	}

	Sentry.init({
		dsn: config.dsn,
		environment: config.environment || process.env.NODE_ENV || 'development',
		beforeSend(event) {
			if (event.request?.url) {
				const url = new URL(event.request.url)
				if (
					url.protocol === 'chrome-extension:' ||
					url.protocol === 'moz-extension:'
				) {
					return null
				}
			}
			return event
		},
		integrations: [
			Sentry.replayIntegration(),
			Sentry.browserProfilingIntegration(),
		],
		tracesSampleRate: config.tracesSampleRate ?? 1.0,
		replaysSessionSampleRate: config.replaysSessionSampleRate ?? 0.1,
		replaysOnErrorSampleRate: config.replaysOnErrorSampleRate ?? 1.0,
	})
}
