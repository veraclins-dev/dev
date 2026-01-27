import {
	Link as RemixLink,
	type LinkProps as RemixLinkProps,
} from 'react-router'

import { usePathWithRedirect } from '@veraclins-dev/react-utils'
import {
	ComposedTooltip,
	Link as VeraclinsLink,
	type LinkProps as VeraclinsLinkProps,
} from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'

export interface LinkProps extends VeraclinsLinkProps<typeof RemixLink> {
	tooltip?: string
	disabled?: boolean
}

const Base = ({
	children,
	type = 'link',
	underline = 'none',
	className,
	to,
	...props
}: LinkProps) => {
	const handleClick: RemixLinkProps['onClick'] = (e) => {
		if (props.onClick) {
			props.onClick(e)
		} else {
			e.stopPropagation()
		}
	}

	const classes = cn('inline-flex max-w-full items-center', className)
	return (
		<VeraclinsLink
			component={RemixLink}
			to={to}
			type={type}
			underline={underline}
			{...props}
			className={classes}
			onClick={handleClick}
		>
			{children}
		</VeraclinsLink>
	)
}

export const Link = ({ tooltip, ...props }: LinkProps) =>
	tooltip ? (
		<ComposedTooltip
			Trigger={Base}
			TriggerProps={{
				...props,
			}}
			content={tooltip}
		/>
	) : (
		<Base {...props} />
	)

export const LinkWithRedirect = ({ to, ...props }: LinkProps) => {
	const path = usePathWithRedirect(to)

	return <Base to={path} {...props} />
}

LinkWithRedirect.displayName = 'LinkWithRedirect'

export const LinkButton = ({
	variant = 'text',
	children,
	...props
}: LinkProps) => (
	<Link variant={variant} type="button" {...props}>
		{children}
	</Link>
)

export const LinkButtonWithRedirect = ({
	variant = 'text',
	children,
	...props
}: LinkProps) => (
	<LinkWithRedirect variant={variant} type="button" {...props}>
		{children}
	</LinkWithRedirect>
)
