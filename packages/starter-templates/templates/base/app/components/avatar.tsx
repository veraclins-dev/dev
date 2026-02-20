import { Image } from '@veraclins-dev/image'
import { Box, ComposedTooltip, Icon, type IconName } from '@veraclins-dev/ui'
import { cn, getSize, getSizeClasses, type Size } from '@veraclins-dev/utils'

import type { MaybeString } from '../common/types'

export interface AvatarProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
	size?: Size
	src?: MaybeString
	icon?: IconName
	square?: boolean
	alt?: string
	tooltip?: string
	containerClass?: string
}

interface CompProps
	extends Pick<AvatarProps, 'src' | 'icon' | 'square' | 'alt' | 'className'> {
	sizeValue: number
	square?: boolean
	classes: string
}

const Comp = ({
	sizeValue,
	src,
	icon,
	square,
	classes,
	className,
	alt,
}: CompProps) => {
	const iconClasses = classes
		.replace(/\s*(?:xs:|sm:|md:|lg:|xl:|2xl:)?(?:size|h|w)-\d+\s*/g, ' ')
		.trim()

	return (
		<Box
			display="flex"
			items="center"
			justify="center"
			className={cn(
				'bg-neutral-soft text-neutral-foreground hover:bg-neutral-soft-hover flex max-h-full max-w-full items-center justify-center rounded-full border-[1px] p-0.5',
				classes,
				className,
			)}
		>
			{src ? (
				<Image
					src={src}
					height={sizeValue}
					width={sizeValue}
					className={cn(
						'aspect-square size-full object-cover object-center',
						square ? 'rounded-md' : 'rounded-full',
					)}
					alt={alt ?? 'User avatar'}
				/>
			) : (
				<Icon
					name={icon ?? 'avatar'}
					className={cn('size-full p-0.5', iconClasses)}
				/>
			)}
		</Box>
	)
}

export const Avatar = ({
	size: height = 12,
	src,
	square,
	className,
	alt,
	tooltip,
	icon,
	containerClass,
	...props
}: AvatarProps) => {
	const size = getSize(height)
	const classes = getSizeClasses(height, 'max')

	return (
		<Box
			display="flex"
			items="center"
			{...props}
			className={cn('h-full w-full', classes, containerClass)}
			role="img"
		>
			{tooltip ? (
				<ComposedTooltip
					content={tooltip}
					Trigger={Comp}
					TriggerProps={{
						sizeValue: size.height,
						icon,
						square,
						classes,
						className,
						alt,
						src,
					}}
				/>
			) : (
				<Comp
					sizeValue={size.height}
					icon={icon}
					square={square}
					classes={classes}
					className={className}
					alt={alt}
					src={src}
				/>
			)}
		</Box>
	)
}
