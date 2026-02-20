import { Box, Typography } from '@veraclins-dev/ui'

import { cn } from '@veraclins-dev/utils'

interface TabsProps {
	tabs: string[]
	activeTab: string
	onTabChange: (tab: string) => void
	heading?: string
	className?: string
	plain?: boolean
}

export function Tabs({
	tabs,
	activeTab,
	onTabChange,
	heading,
	className,
}: TabsProps) {
	return (
		<Box className={className}>
			{heading && (
				<Typography variant="h5" className="mb-2">
					{heading}
				</Typography>
			)}
			<Box display="flex" gap={2}>
				{tabs.map((tab) => (
					<button
						key={tab}
						type="button"
						onClick={() => onTabChange(tab)}
						className={cn(
							'rounded px-3 py-1.5 text-sm font-medium',
							activeTab === tab
								? 'bg-primary text-primary-foreground'
								: 'bg-muted text-muted-foreground hover:bg-muted/80',
						)}
					>
						{tab.charAt(0).toUpperCase() + tab.slice(1)}
					</button>
				))}
			</Box>
		</Box>
	)
}
