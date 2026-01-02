// ============================================================================
// ADMIN API CLIENT UTILITIES
// ============================================================================

export function calculateGrowthType(
	growth: number,
): 'positive' | 'negative' | 'neutral' {
	if (growth > 0) return 'positive'
	if (growth < 0) return 'negative'
	return 'neutral'
}

export function calculateGrowth(current: number, previous: number): number {
	if (previous === 0) {
		return current > 0 ? 100 : 0
	}
	return Math.round(((current - previous) / previous) * 100)
}

export function formatDurationFromHours(hours: number): string {
	if (!isFinite(hours) || hours < 0) return '—'
	const minutes = Math.round(hours * 60)
	if (minutes < 60) return `${minutes}m`
	if (hours < 24) return `${hours.toFixed(hours < 10 ? 1 : 0)}h`
	const days = hours / 24
	if (days < 7) return `${days.toFixed(days < 10 ? 1 : 0)}d`
	const weeks = days / 7
	if (weeks < 4) return `${weeks.toFixed(weeks < 10 ? 1 : 0)}w`
	const months = days / 30
	if (months < 12) return `${months.toFixed(months < 10 ? 1 : 0)}mo`
	const years = days / 365
	return `${years.toFixed(years < 10 ? 1 : 0)}y`
}
