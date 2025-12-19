// ============================================================================
// ADMIN API TYPES
// ============================================================================

// Base types for admin dashboard
// Extend these types based on your project's specific analytics needs

export interface SystemHealthMetrics {
	overallHealth: 'healthy' | 'warning' | 'critical'
	startDate: Date
	content: {
		moderationQueue: number
	}
}

export interface OperationsTrends {
	data: (number | null)[][]
	labels: Array<{ label: string; start: string; end: string }>
	intervals: number
}

export interface OperationsQuickOverviewData {
	totalOperations: number
	successRate: number
	averageResponseTime: number
	errorRate: number
}

// Add your project-specific types here
// Example:
// export type UserActivityTrends = ...
// export type ContentTrends = ...
