// ============================================================================
// MONITORING SERVICE TYPES
// ============================================================================

export type MonitoringProvider = 'sentry' | 'none'

export interface MonitoringConfig {
	dsn?: string
	environment?: string
	tracesSampleRate?: number
	replaysSessionSampleRate?: number
	replaysOnErrorSampleRate?: number
}

export interface MonitoringProviderInterface {
	init(config: MonitoringConfig): void
	captureException(error: Error, context?: Record<string, unknown>): void
	captureMessage(message: string, level?: 'info' | 'warning' | 'error'): void
	setUser(user: { id: string; email?: string; username?: string }): void
}
