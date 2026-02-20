import type { ReactNode } from 'react'

import { Box, Typography } from '@veraclins-dev/ui'

import { formatRelativeTime } from '@veraclins-dev/utils'

interface ActivityProps {
	message: string
	target?: string
	profileImage?: string | null
	createdAt: Date
	isRead?: boolean
}

export function Activity({
	message,
	profileImage: _profileImage,
	createdAt,
	isRead,
}: ActivityProps) {
	return (
		<Box display="flex" flexDirection="column" gap={1}>
			<Typography variant="body2" className={isRead ? 'text-foreground/70' : ''}>
				{message}
			</Typography>
			<Typography variant="caption" className="text-foreground/60">
				{formatRelativeTime(createdAt)}
			</Typography>
		</Box>
	)
}

interface ActivityLinkProps {
	children: ReactNode
	targetLink?: string | null
	onClick?: () => void
}

export function ActivityLink({ children, onClick }: ActivityLinkProps) {
	return (
		<Box component="button" type="button" onClick={onClick} className="text-left w-full">
			{children}
		</Box>
	)
}

interface ActionItemProps {
	children: ReactNode
	onClick?: () => void
}

export function ActionItem({ children, onClick }: ActionItemProps) {
	return (
		<Box component="button" type="button" onClick={onClick} className="w-full px-2 py-1.5 text-left text-sm">
			{children}
		</Box>
	)
}
