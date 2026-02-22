import { Button, ComposedPopover, Typography } from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'
import { useState } from 'react'

import { Avatar } from '#app/components/avatar'
import { Link } from '#app/components/link'

const NotificationTrigger = ({
	count,
	className,
	...props
}: {
	count?: number | string
	className?: string
}) => (
	<Button
		className={cn(
			'relative w-fit cursor-pointer p-0 focus:ring-0 focus:ring-offset-0',
			className,
		)}
		aria-label="Open notifications"
		variant="plain"
		{...props}
	>
		<Avatar icon="notification" size={9} />
		{count ? (
			<Typography
				variant="caption"
				className="bg-destructive absolute -top-1 -right-3 z-10 flex h-6 w-7 items-center justify-center rounded-full font-semibold text-gray-50"
			>
				{count}
			</Typography>
		) : null}
	</Button>
)

/**
 * Notifications dropdown shell. Add a notifications API and list component
 * (e.g. under /profiles/:username/notifications) to show live notifications.
 * This provides the nav trigger and a "See all" link without app-specific
 * notification types.
 */
export function NotificationDropdown({
	className,
	username,
}: {
	className?: string
	username: string
}) {
	const [open, setOpen] = useState(false)

	return (
		<ComposedPopover
			open={open}
			onOpenChange={setOpen}
			Trigger={NotificationTrigger}
			TriggerProps={{ count: 0, className }}
			className="bg-card main-height flex max-h-screen min-w-72 flex-col gap-y-3 p-3"
		>
			<Typography variant="subtitle2" className="px-2">
				Notifications
			</Typography>
			<Typography variant="caption" className="px-2 text-foreground/80">
				Add a notifications feature to show items here.
			</Typography>
			<Link
				to={`/profiles/${username}/notifications`}
				className="text-primary px-2 text-sm font-semibold"
				onClick={() => setOpen(false)}
			>
				See all
			</Link>
		</ComposedPopover>
	)
}
