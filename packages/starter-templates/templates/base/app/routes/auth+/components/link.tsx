import { Box } from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'
import { LinkWithRedirect, type LinkProps } from '../../../components/link'

interface Props extends LinkProps {
	text?: React.ReactNode
	linkText: React.ReactNode
	linkClassName?: string
}

export const AuthLink = ({
	text,
	linkText,
	className,
	linkClassName,
	...rest
}: Props) => {
	return (
		<Box display="flex" gapX={2} className={cn('text-center', className)}>
			{text && <Box component="span">{text}</Box>}
			<LinkWithRedirect
				{...rest}
				className={cn(
					'border-brand-slate hover:border-primary hover:text-primary border-b-2',
					linkClassName,
				)}
			>
				{linkText}
			</LinkWithRedirect>
		</Box>
	)
}
