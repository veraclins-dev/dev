import { useMatchesPath } from '@veraclins-dev/react-utils'
import {
	Box,
	ComposedTooltip,
	Link as VeraclinsLink,
	type LinkProps as VeraclinsLinkProps,
} from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'
import { useMemo } from 'react'
import { NavLink as RemixNavLink } from 'react-router'

export interface NavLinkProps extends VeraclinsLinkProps<typeof RemixNavLink> {
	tooltip?: string
}

interface LinkProps extends NavLinkProps {
	isActive: boolean
}

const Base = ({
	type = 'link',
	underline = 'none',
	...props
}: Omit<LinkProps, 'isActive'>) => {
	return (
		<VeraclinsLink
			component={RemixNavLink}
			type={type}
			underline={underline}
			{...props}
		/>
	)
}

const Link = ({ className, isActive, tooltip, ...props }: LinkProps) => {
	const classes = 'flex w-full items-center no-underline'
	return (
		<Box
			display="flex"
			items="center"
			className={cn(
				'rounded-md border border-solid capitalize md:rounded-none md:border-0 md:border-b-4',
				isActive
					? 'border-primary text-primary'
					: 'hover:border-primary hover:text-primary border-transparent',
				className,
			)}
			role="navigation"
		>
			{tooltip ? (
				<ComposedTooltip
					Trigger={Base}
					TriggerProps={{
						...props,
						className: classes,
					}}
					content={tooltip}
				/>
			) : (
				<Base {...props} className={classes} />
			)}
		</Box>
	)
}

export const NavLink = ({ children, ...props }: NavLinkProps) => {
	const matches = useMatchesPath()
	const isActive = useMemo(() => {
		const pathname = props.to.toString().split('#')[0]
		return matches.some((match) => match === pathname)
	}, [matches, props.to])

	return (
		<Link isActive={isActive} {...props}>
			{children}
		</Link>
	)
}
