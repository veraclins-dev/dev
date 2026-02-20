import type { ComponentProps } from 'react'

import { Icon } from '@veraclins-dev/ui'

import { cn } from '@veraclins-dev/utils'

export function MoreButton({
	className,
	...props
}: ComponentProps<'button'> & { className?: string }) {
	return (
		<button
			type="button"
			aria-label="More actions"
			className={cn('rounded p-1', className)}
			{...props}
		>
			<Icon name="dots-horizontal" size="sm" />
		</button>
	)
}
