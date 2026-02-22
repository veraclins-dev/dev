import { useTruncated } from '@veraclins-dev/react-utils'
import { Box, ComposedTooltip, Typography } from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'

import { Avatar, type AvatarProps } from '#app/components/avatar'
import type { Maybe, MaybeString } from '#app/common/types'

interface TitleProps {
	title: string
	titleClass?: string
}

interface ContentProps extends TitleProps {
	byline?: Maybe<React.ReactNode>
	badge?: MaybeString
	bylineClass?: string
}

export interface UserCardProps extends AvatarProps, ContentProps {
	title: string
	className?: string
	avatarClass?: string
	squareImage?: boolean
}

export const Title = ({
	title,
	titleClass,
	tooltip,
	ref,
}: TitleProps & {
	tooltip?: React.ReactNode
	ref: React.Ref<HTMLParagraphElement>
}) =>
	tooltip ? (
		<ComposedTooltip
			content={tooltip}
			Trigger={Typography}
			TriggerProps={{
				children: title,
				className: cn('truncate font-semibold', titleClass),
			}}
		/>
	) : (
		<Typography ref={ref} className={cn('truncate font-semibold', titleClass)}>
			{title}
		</Typography>
	)

export const Content = ({
	title,
	byline,
	badge,
	titleClass = 'text-base',
	bylineClass = '',
}: ContentProps) => {
	const { ref, isTruncated } = useTruncated<HTMLParagraphElement>()
	return (
		<Box display="flex" flexDirection="column" className="min-w-0 flex-1">
			<Box display="flex" items="center" className="w-full gap-x-2">
				<Title
					title={title}
					titleClass={titleClass}
					tooltip={isTruncated ? title : undefined}
					ref={ref}
				/>
				{badge && (
					<Box
						component="span"
						px={2}
						py={1}
						className="badge rounded-md text-xs"
					>
						{badge}
					</Box>
				)}
			</Box>
			{byline && (
				<Typography variant="caption" className={cn(bylineClass)}>
					{byline}
				</Typography>
			)}
		</Box>
	)
}

export const UserCard = ({
	src,
	title,
	byline,
	badge,
	size,
	className,
	squareImage,
	avatarClass,
	icon,
	titleClass = 'text-base',
	bylineClass = '',
	...props
}: UserCardProps) => (
	<Box
		display="flex"
		items="center"
		gap={2}
		{...props}
		className={cn('max-w-full', className)}
	>
		<Avatar
			size={size}
			src={src}
			square={squareImage}
			className={avatarClass}
			icon={icon}
		/>
		{title && (
			<Content
				title={title}
				byline={byline}
				badge={badge}
				titleClass={titleClass}
				bylineClass={bylineClass}
			/>
		)}
	</Box>
)
