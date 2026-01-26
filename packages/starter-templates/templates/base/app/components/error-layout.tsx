import { Image,type ImageProps } from '@veraclins-dev/image'
import { getResponsiveValues, useBreakpoint } from '@veraclins-dev/react-utils'
import { Box, Icon, Typography } from '@veraclins-dev/ui'
import { type Breakpoint } from '@veraclins-dev/utils'

import { Card } from './card'
import { LinkButton } from './link'

const illustrationHeight = 158
const illustrationWidth = 183
const ratios: { [key in Breakpoint]: number } = {
	xs: 0.5,
	sm: 0.5,
	md: 0.5,
	lg: 0.75,
	xl: 1,
	'2xl': 2,
}

const illustrationSizes = {
	h: getResponsiveValues(illustrationHeight, ratios),
	w: getResponsiveValues(illustrationWidth, ratios),
}

interface Props {
	illustration?: ImageProps['src']
	altText?: ImageProps['alt']
	title?: string
	message?: React.ReactNode
	action?: React.ReactNode
	name?: string
	redirectTo?: string
}

export const ErrorLayout = ({
	illustration,
	altText,
	title,
	message,
	action,
	redirectTo,
}: Props) => {
	const breakpoint = useBreakpoint()

	return (
		<Card
			display="flex"
			flexDirection="column"
			paddingY={5}
			items="center"
			gapY={4}
			justify="center"
			className="h-full w-full"
			contentProps={{
				paddingX: 4,
				paddingY: 5,
				gapY: 4,
				justify: 'center',
				items: 'center',
			}}
		>
			<Box
				display="flex"
				flexDirection="column"
				items="center"
				justify="center"
				gapY={3}
				marginBottom={5}
			>
				{illustration && (
					<Image
						src={illustration}
						alt={altText ?? 'Error'}
						width={illustrationSizes.w[breakpoint]}
						height={illustrationSizes.h[breakpoint]}
						priority
						className="h-full"
					/>
				)}

				<Typography variant="h1" className="text-3xl md:text-4xl">
					{title ?? 'Server Error'}
				</Typography>

				<Box className="max-w-80 text-center text-lg">
					{message ?? (
						<Typography variant="body2">
							Something went wrong on our end. Please try again later
						</Typography>
					)}
				</Box>
			</Box>

			{action ?? (
				<LinkButton
					to={redirectTo ?? '/'}
					type="button"
					className="h-16 w-80 px-5 py-1"
					variant="solid"
					color="primary"
				>
					<Icon name="arrow-left">
						{redirectTo ? 'Go back' : 'Go back home'}
					</Icon>
				</LinkButton>
			)}
		</Card>
	)
}
