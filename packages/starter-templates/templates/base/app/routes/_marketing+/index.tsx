import { useSearchParams } from 'react-router'

import {
	Box,
	Card,
	CardContent,
	Icon,
	type IconName,
	Typography,
} from '@veraclins-dev/ui'

import { Link, LinkButton } from '../../components/link'
import { useOptionalUser } from '../../hooks/use-user'

interface FeatureCardProps {
	icon: IconName
	title: string
	description: string
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
	return (
		<Card className="h-full">
			<CardContent className="p-6">
				<Box display="flex" flexDirection="column" gap={3}>
					<Box display="flex" items="center" gap={3}>
						<Box className="p-3 rounded-lg bg-primary/10">
							<Icon name={icon} className="size-6 text-primary" />
						</Box>
						<Typography variant="h4" className="font-semibold">
							{title}
						</Typography>
					</Box>
					<Typography className="text-foreground/80">
						{description}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	)
}

const HeroSection = () => {
	const [searchParams] = useSearchParams()
	const user = useOptionalUser()

	const primaryCta = user?.id ? (
		<Icon name="plus" size="xs">
			Go to Dashboard
		</Icon>
	) : (
		'Get Started Free'
	)

	const primaryTo = user?.id
		? '/dashboard'
		: {
				pathname: '/auth/signup',
				search: searchParams.toString(),
			}

	return (
		<Box className="container">
			<Box
				display="flex"
				flexDirection="column"
				items="center"
				gap={8}
				className="text-foreground lg:items-center lg:justify-center"
			>
				<Box
					display="flex"
					flexDirection="column"
					items="center"
					gap={6}
					className="text-center"
				>
					<Box
						display="flex"
						items="center"
						gap={2}
						className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary-foreground"
					>
						<Icon name="check" size="sm" />
						<Typography variant="body2" className="font-medium">
							Production-ready template
						</Typography>
					</Box>
					<Typography
						variant="h1"
						className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
					>
						Build faster with{' '}
						<span className="text-primary">modern tools</span>
					</Typography>
					<Typography
						variant="body1"
						className="max-w-2xl text-lg text-foreground/90 md:text-xl"
					>
						{{PROJECT_DESCRIPTION}} Get started in minutes with a
						complete, production-ready foundation.
					</Typography>
				</Box>
				<Box
					display="flex"
					items="center"
					justify="center"
					gap={4}
					className="w-full flex-col sm:flex-row"
				>
					<LinkButton
						className="w-full px-10 py-4 text-lg sm:w-auto"
						to={primaryTo}
						color="primary"
						variant="solid"
					>
						{primaryCta}
					</LinkButton>
					<LinkButton
						variant="outline"
						color="neutral"
						className="w-full px-10 py-4 text-lg sm:w-auto"
						to="#features"
					>
						Learn More
					</LinkButton>
				</Box>
				<Box
					display="flex"
					items="center"
					gap={6}
					className="flex-wrap justify-center"
				>
					<Box display="flex" flexDirection="column" gap={1}>
						<Typography variant="h3" className="font-bold">
							100+
						</Typography>
						<Typography variant="body2" className="text-foreground/70">
							Pre-built components
						</Typography>
					</Box>
					<Box display="flex" flexDirection="column" gap={1}>
						<Typography variant="h3" className="font-bold">
							<Icon name="check" size="sm">
								Type-safe
							</Icon>
						</Typography>
						<Typography variant="body2" className="text-foreground/70">
							Full TypeScript
						</Typography>
					</Box>
					<Box display="flex" flexDirection="column" gap={1}>
						<Typography variant="h3" className="font-bold">
							⚡ Fast
						</Typography>
						<Typography variant="body2" className="text-foreground/70">
							Optimized performance
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

const CoreFeaturesSection = () => {
	const coreFeatures = [
		{
			icon: 'lock-closed',
			title: 'Authentication & Authorization',
			description:
				'Complete auth system with email/password, OAuth providers, WebAuthn/Passkeys, and role-based access control.',
		},
		{
			icon: 'document-text',
			title: 'Database & ORM',
			description:
				'Prisma ORM with PostgreSQL support, migrations, seeding, and type-safe database operations.',
		},
		{
			icon: 'chart-bar',
			title: 'Server Infrastructure',
			description:
				'Express server with security headers, rate limiting, compression, and health check endpoints.',
		},
		{
			icon: 'pencil',
			title: 'UI Foundation',
			description:
				'Tailwind CSS with a complete design system, theme support, and responsive components.',
		},
		{
			icon: 'envelope-closed',
			title: 'Email System',
			description:
				'Email integration with Resend, React Email templates, and verification flows.',
		},
		{
			icon: 'camera',
			title: 'File Upload',
			description:
				'Image processing, storage integration (Firebase/S3), and file validation utilities.',
		},
		{
			icon: 'document-text',
			title: 'Form Handling',
			description:
				'Conform integration with Zod validation, honeypot spam protection, and error handling.',
		},
		{
			icon: 'check',
			title: 'Testing',
			description:
				'Vitest for unit tests, Playwright for E2E tests, and comprehensive test utilities.',
		},
	] satisfies FeatureCardProps[]

	return (
		<Box id="features" className="container py-20">
			<Box display="flex" flexDirection="column" gap={12}>
				<Box
					display="flex"
					flexDirection="column"
					items="center"
					gap={4}
					className="text-center"
				>
					<Typography variant="h2" className="text-3xl font-bold md:text-4xl">
						Everything you need to build
					</Typography>
					<Typography
						variant="body1"
						className="max-w-2xl text-lg text-foreground/80"
					>
						Production-ready features included out of the box. Focus on
						building your product, not the infrastructure.
					</Typography>
				</Box>
				<Box
					display="grid"
					gap={6}
					className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
				>
					{coreFeatures.map((feature) => (
						<FeatureCard key={feature.title} {...feature} />
					))}
				</Box>
			</Box>
		</Box>
	)
}

const BenefitsSection = () => {
	const benefits = [
		{
			icon: 'check',
			title: 'Save weeks of development',
			description:
				'Start with a complete foundation instead of building from scratch. Authentication, database, email, and more are ready to use.',
		},
		{
			icon: 'lock-closed',
			title: 'Security built-in',
			description:
				'Best practices for authentication, authorization, CSRF protection, and data validation are implemented from day one.',
		},
		{
			icon: 'chart-bar',
			title: 'Scalable architecture',
			description:
				'Built with scalability in mind. Clean code structure, proper separation of concerns, and performance optimizations included.',
		},
		{
			icon: 'pencil',
			title: 'Easy to customize',
			description:
				'Well-organized codebase with clear patterns makes it simple to adapt and extend for your specific needs.',
		},
	] satisfies FeatureCardProps[]

	return (
		<Box className="bg-muted/30 py-20">
			<Box className="container">
				<Box display="flex" flexDirection="column" gap={12}>
					<Box
						display="flex"
						flexDirection="column"
						items="center"
						gap={4}
						className="text-center"
					>
						<Typography variant="h2" className="text-3xl font-bold md:text-4xl">
							Why choose this template?
						</Typography>
						<Typography
							variant="body1"
							className="max-w-2xl text-lg text-foreground/80"
						>
							Built by developers, for developers. Get a head start on your
							next project.
						</Typography>
					</Box>
					<Box
						display="grid"
						gap={6}
						className="grid-cols-1 md:grid-cols-2"
					>
						{benefits.map((benefit) => (
							<Box
								key={benefit.title}
								display="flex"
								items="start"
								gap={4}
								p={6}
								className="rounded-lg bg-background"
							>
								<Icon
									name={benefit.icon}
									size="lg"
									className="mt-1 shrink-0 text-primary"
								/>
								<Box display="flex" flexDirection="column" gap={2}>
									<Typography variant="h4" className="font-semibold">
										{benefit.title}
									</Typography>
									<Typography variant="body2" className="text-foreground/80">
										{benefit.description}
									</Typography>
								</Box>
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

const OptionalFeaturesSection = () => {
	const optionalFeatures = [
		{
			icon: 'envelope-closed',
			title: 'Notifications System',
			description:
				'Real-time notifications with in-app and email delivery, notification preferences, and read/unread tracking.',
		},
		{
			icon: 'chart-bar',
			title: 'Admin Dashboard',
			description:
				'Complete admin interface for user management, content moderation, and system configuration.',
		},
		{
			icon: 'search',
			title: 'Search Functionality',
			description:
				'Full-text search with indexing, filtering, and advanced query capabilities.',
		},
		{
			icon: 'clock',
			title: 'Activity Logging',
			description:
				'Track user actions, system events, and audit trails for compliance and debugging.',
		},
		{
			icon: 'user-add',
			title: 'Multi-tenant Support',
			description:
				'Build SaaS applications with tenant isolation, organization management, and billing integration.',
		},
		{
			icon: 'user-add',
			title: 'Invitation System',
			description:
				'Invite users via email, manage invitations, and track invitation acceptance rates.',
		},
		{
			icon: 'bookmark',
			title: 'Referral System',
			description:
				'User referral tracking, referral codes, channel attribution, and referral analytics.',
		},
		{
			icon: 'flag',
			title: 'Reporting & Moderation',
			description:
				'Content reporting, moderation workflows, automated flagging, and admin review tools.',
		},
	] satisfies FeatureCardProps[]

	return (
		<Box className="container py-20">
			<Box display="flex" flexDirection="column" gap={12}>
				<Box
					display="flex"
					flexDirection="column"
					items="center"
					gap={4}
					className="text-center"
				>
					<Typography variant="h2" className="text-3xl font-bold md:text-4xl">
						Extend with optional features
					</Typography>
					<Typography
						variant="body1"
						className="max-w-2xl text-lg text-foreground/80"
					>
						Add powerful capabilities as you grow. Enable only what you need,
						when you need it.
					</Typography>
				</Box>
				<Box
					display="grid"
					gap={6}
					className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
				>
					{optionalFeatures.map((feature) => (
						<FeatureCard key={feature.title} {...feature} />
					))}
				</Box>
			</Box>
		</Box>
	)
}

const TechStackSection = () => {
	const technologies = [
		{
			name: 'React Router 7',
			description: 'Modern web framework',
			url: 'https://reactrouter.com',
		},
		{
			name: 'TypeScript',
			description: 'Type-safe development',
			url: 'https://www.typescriptlang.org',
		},
		{
			name: 'Prisma',
			description: 'Next-generation ORM',
			url: 'https://www.prisma.io',
		},
		{
			name: 'PostgreSQL',
			description: 'Powerful database',
			url: 'https://www.postgresql.org',
		},
		{
			name: 'Tailwind CSS',
			description: 'Utility-first styling',
			url: 'https://tailwindcss.com',
		},
		{
			name: 'Vitest',
			description: 'Fast unit testing',
			url: 'https://vitest.dev',
		},
		{
			name: 'Playwright',
			description: 'E2E testing',
			url: 'https://playwright.dev',
		},
		{
			name: 'Express',
			description: 'Server framework',
			url: 'https://expressjs.com',
		},
	]

	return (
		<Box className="bg-muted/30 py-20">
			<Box className="container">
				<Box display="flex" flexDirection="column" gap={12}>
					<Box
						display="flex"
						flexDirection="column"
						items="center"
						gap={4}
						className="text-center"
					>
						<Typography variant="h2" className="text-3xl font-bold md:text-4xl">
							Built with modern technology
						</Typography>
						<Typography
							variant="body1"
							className="max-w-2xl text-lg text-foreground/80"
						>
							Leveraging the best tools and frameworks for a fast, scalable,
							and maintainable codebase.
						</Typography>
					</Box>
					<Box
						display="grid"
						gap={6}
						className="grid-cols-2 md:grid-cols-4 lg:grid-cols-4"
					>
					{technologies.map((tech) => (
						<Box
							key={tech.name}
							display="flex"
							flexDirection="column"
							items="center"
							gap={2}
							p={6}
							className="rounded-lg bg-background text-center"
						>
							<Link
								to={tech.url}
								target="_blank"
								rel="noopener noreferrer"
								className="border-b-0 transition-colors hover:text-primary"
							>
								<Typography variant="h4" className="font-semibold">
									{tech.name}
								</Typography>
							</Link>
							<Typography variant="body2" className="text-foreground/70">
								{tech.description}
							</Typography>
						</Box>
					))}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

const CTASection = () => {
	const [searchParams] = useSearchParams()
	const user = useOptionalUser()

	const to = user?.id
		? '/dashboard'
		: {
				pathname: '/auth/signup',
				search: searchParams.toString(),
			}

	return (
		<Box className="bg-muted/30 py-20">
			<Box className="container">
				<Box
					display="flex"
					flexDirection="column"
					items="center"
					gap={8}
					className="text-center"
				>
					<Typography
						variant="h2"
						className="text-3xl font-bold md:text-4xl lg:text-5xl"
					>
						Ready to build something amazing?
					</Typography>
					<Typography
						variant="body1"
						className="max-w-2xl text-lg text-foreground/80"
					>
						Start building your application today with a solid foundation and
						best practices built-in. Get started in minutes, not weeks.
					</Typography>
					<Box display="flex" items="center" gap={4} className="flex-col sm:flex-row">
						<LinkButton
							className="px-10 py-4 text-lg"
							to={to}
							color="primary"
							variant="solid"
						>
							{user?.id ? 'Go to Dashboard' : 'Get Started Free'}
						</LinkButton>
						<LinkButton
							variant="outline"
							className="px-10 py-4 text-lg"
							to="#features"
						>
							View Features
						</LinkButton>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default function Index() {
	return (
		<Box
			display="flex"
			flexDirection="column"
			items="center"
			className="w-full"
		>
			<Box
				display="flex"
				flexDirection="column"
				items="center"
				pt={16}
				className="bg-brand-gradient-hero w-full text-foreground sm:pt-20 md:pt-24"
			>
				<HeroSection />
			</Box>

			<CoreFeaturesSection />

			<BenefitsSection />

			<OptionalFeaturesSection />

			<TechStackSection />

			<CTASection />
		</Box>
	)
}
