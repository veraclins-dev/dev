import { Box } from '@veraclins-dev/ui'
import { type ReactNode } from 'react'
import {
	type StatCard,
	StatsCards,
} from '#app/routes/admin+/components/dashboard/stats-cards'

interface DashboardLayoutProps {
	stats: StatCard[]
	children: ReactNode
	className?: string
	header?: ReactNode
}

export function DashboardLayout({
	stats,
	children,
	className,
	header,
}: DashboardLayoutProps) {
	return (
		<Box display="flex" flexDirection="column" gapY={5} className={className}>
			{header}
			<StatsCards stats={stats} />
			{children}
		</Box>
	)
}
