import { type ImageProps, Image } from '@veraclins-dev/image'
import { getResponsiveValues, useBreakpoint } from '@veraclins-dev/react-utils'
import { Box, Icon, Typography } from '@veraclins-dev/ui'
import bottomIllustration from '../../../assets/images/bg-bottom-mask.svg'
import topMask from '../../../assets/images/top-mask.svg'
import { type Breakpoint } from '../../../common/types'
import { Link, LinkButton } from '../../../components/link'
import { Logo } from '../../../components/logo'

export type AuthPageHeading = {
	title: string
	subtitle?: string
}

type Props = {
	children: React.ReactNode
	illustration: ImageProps['src']
	altText: ImageProps['alt']
} & AuthPageHeading

const ratios: { [key in Breakpoint]: number } = {
	xs: 0.5,
	sm: 0.5,
	md: 0.5,
	lg: 0.75,
	xl: 1,
	'2xl': 2,
}

const Header = () => {
	return (
		<Box display="flex" justify="between" items="center" className="w-full">
			<Link to="/">
				<Logo />
			</Link>
			<LinkButton to="/" className="text-foreground rounded-full border p-1.5">
				<Icon name="chevron-left" size="sm" />
			</LinkButton>
		</Box>
	)
}

const Content = ({
	children,
	title,
	subtitle,
}: Pick<Props, 'children' | 'title' | 'subtitle'>) => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			gapY={4}
			justify="center"
			p={4}
			items="center"
			className="w-full max-w-lg flex-1 overflow-y-auto overscroll-y-contain lg:gap-y-6 xl:px-10"
		>
			<Box display="flex" flexDirection="column" gapY={3}>
				<Typography variant="h1" className="text-3xl">
					{title}
				</Typography>
				{subtitle && (
					<Typography className="text-center text-base">{subtitle}</Typography>
				)}
			</Box>
			{children}
		</Box>
	)
}

const Main: typeof Content = ({ children, title, subtitle }) => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			p={4}
			items="center"
			className="bg-card col-span-12 h-full max-h-screen md:col-span-6 md:rounded-r-[20px] lg:col-span-5 lg:rounded-r-[30px] lg:p-6 xl:rounded-r-[40px] xl:p-8"
		>
			<Header />
			<Content title={title} subtitle={subtitle}>
				{children}
			</Content>
		</Box>
	)
}

const bottomMaskHeight = 322.5
const bottomMaskWidth = 346
const topMaskHeight = 350
const topMaskWidth = 370
const illustrationHeight = 500
const illustrationWidth = 480

const bottomMaskSizes = {
	h: getResponsiveValues(bottomMaskHeight, ratios),
	w: getResponsiveValues(bottomMaskWidth, ratios),
}

const topMaskSizes = {
	h: getResponsiveValues(topMaskHeight, ratios),
	w: getResponsiveValues(topMaskWidth, ratios),
}

const illustrationSizes = {
	h: getResponsiveValues(illustrationHeight, ratios),
	w: getResponsiveValues(illustrationWidth, ratios),
}

const Illustrations = ({
	illustration,
	altText,
}: Pick<Props, 'illustration' | 'altText'>) => {
	const breakpoint = useBreakpoint()

	return (
		<>
			<Box
				items="center"
				display="hidden"
				className="col-span-6 h-full max-h-full justify-center md:flex lg:col-span-7"
			>
				<Image
					src={illustration}
					alt={altText}
					width={illustrationSizes.w[breakpoint]}
					height={illustrationSizes.h[breakpoint]}
					priority
					className="h-full"
				/>
			</Box>
			<Box display="hidden" className="absolute top-0 right-0 md:block">
				<Image
					src={topMask}
					alt="Top mask"
					width={topMaskSizes.w[breakpoint]}
					height={topMaskSizes.h[breakpoint]}
					priority
				/>
			</Box>
			<Box display="hidden" className="absolute right-0 -bottom-1 md:block">
				<Image
					src={bottomIllustration}
					alt="Bottom mask"
					width={bottomMaskSizes.w[breakpoint]}
					height={bottomMaskSizes.h[breakpoint]}
					priority
				/>
			</Box>
		</>
	)
}

export const AuthLayout = ({
	children,
	illustration,
	altText,
	title,
	subtitle,
}: Props) => {
	return (
		<Box
			display="grid"
			className="bg-brand-gradient-hero relative min-h-full w-full grid-cols-1 md:grid-cols-12 md:gap-4"
		>
			<Main title={title} subtitle={subtitle}>
				{children}
			</Main>
			<Illustrations illustration={illustration} altText={altText} />
		</Box>
	)
}
