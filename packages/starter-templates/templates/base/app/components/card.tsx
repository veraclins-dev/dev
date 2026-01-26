import {
	Box,
	Card as CardUI,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardImage,
	type CardProps as CardPropsUI,
	CardSubtitle,
	CardTitle,
	type ContainerElement,
	type CustomComponent,
} from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'

type BaseCardProps<P extends ContainerElement | CustomComponent = typeof Box> =
	Omit<CardPropsUI<P>, 'title'>

export type CardProps<
	P extends ContainerElement | CustomComponent = typeof Box,
> = BaseCardProps<P> & {
	contentProps?: React.ComponentProps<typeof CardContent>
	headerProps?: React.ComponentProps<typeof CardHeader>
	title?: React.ReactNode
	titleProps?: React.ComponentProps<typeof CardTitle>
	subtitle?: React.ReactNode
	subtitleProps?: React.ComponentProps<typeof CardSubtitle>
	headerAction?: React.ReactNode
	headerActionProps?: React.ComponentProps<typeof CardAction>
	description?: React.ReactNode
	descriptionProps?: React.ComponentProps<typeof CardDescription>
	footer?: React.ReactNode
	footerProps?: React.ComponentProps<typeof CardFooter>
	action?: React.ReactNode
	actionProps?: React.ComponentProps<typeof CardAction>
	image?: React.ReactNode
	imageProps?: React.ComponentProps<typeof CardImage>
}

export const Card = <
	P extends ContainerElement | CustomComponent = typeof Box,
>({
	children,
	className,
	contentProps,
	headerProps,
	title,
	titleProps,
	subtitle,
	subtitleProps,
	description,
	descriptionProps,
	footer,
	footerProps,
	action,
	actionProps,
	image,
	imageProps,
	headerAction,
	headerActionProps,
	...cardProps
}: CardProps<P>) => {
	const hasHeaderContent = title || subtitle || description || headerAction
	const hasFooter = footer || action
	const hasImage = image

	return (
		<CardUI className={className} {...cardProps}>
			{hasImage && <CardImage {...imageProps}>{image}</CardImage>}

			{hasHeaderContent && (
				<CardHeader
					{...headerProps}
					className={cn(
						'min-w-fit',
						headerAction ? 'flex justify-between' : '',
						headerProps?.className,
					)}
				>
					<Box>
						{title && <CardTitle {...titleProps}>{title}</CardTitle>}
						{subtitle && (
							<CardSubtitle {...subtitleProps}>{subtitle}</CardSubtitle>
						)}
						{description && (
							<CardDescription {...descriptionProps}>
								{description}
							</CardDescription>
						)}
					</Box>
					{headerAction && <Box {...headerActionProps}>{headerAction}</Box>}
				</CardHeader>
			)}

			<CardContent
				display="flex"
				flexDirection="column"
				gapY={3}
				{...contentProps}
			>
				{children}
			</CardContent>

			{hasFooter && (
				<CardFooter {...footerProps}>
					{footer}
					{action && <CardAction {...actionProps}>{action}</CardAction>}
				</CardFooter>
			)}
		</CardUI>
	)
}
