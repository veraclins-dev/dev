// ============================================================================
// MONITORING SERVICE ABSTRACTION
// ============================================================================

import { initClient as initSentryClient,SentryMonitoringProvider } from './sentry'
import { type MonitoringConfig, type MonitoringProvider, type MonitoringProviderInterface } from './types'

let monitoringProviderInstance: MonitoringProviderInterface | null = null

export function initializeMonitoringProvider(
	provider: MonitoringProvider,
	config: MonitoringConfig,
) {
	switch (provider) {
		case 'sentry':
			monitoringProviderInstance = new SentryMonitoringProvider()
			monitoringProviderInstance.init(config)
			break
		case 'none':
			monitoringProviderInstance = {
				init() {
					console.log('Monitoring disabled')
				},
				captureException() {
					// No-op
				},
				captureMessage() {
					// No-op
				},
				setUser() {
					// No-op
				},
			}
			break
		default:
			throw new Error(`Unknown monitoring provider: ${provider}`)
	}
}

export function initializeMonitoringClient(
	provider: MonitoringProvider,
	config: MonitoringConfig,
) {
	switch (provider) {
		case 'sentry':
			initSentryClient(config)
			break
		case 'none':
			// No-op
			break
		default:
			throw new Error(`Unknown monitoring provider: ${provider}`)
	}
}

export function captureException(error: Error, context?: Record<string, unknown>) {
	if (monitoringProviderInstance) {
		monitoringProviderInstance.captureException(error, context)
	}
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
	if (monitoringProviderInstance) {
		monitoringProviderInstance.captureMessage(message, level)
	}
}

export function setUser(user: { id: string; email?: string; username?: string }) {
	if (monitoringProviderInstance) {
		monitoringProviderInstance.setUser(user)
	}
}

// Re-export types
export type { MonitoringConfig,MonitoringProvider } from './types'
