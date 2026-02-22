import { useSearchParams } from 'react-router'

import { Box, Icon } from '@veraclins-dev/ui'

import { useOptionalUser } from '#app/hooks/use-user'

import { Link, LinkButton  } from './link'
import { Logo } from './logo'

export const MarketingHeader = () => {
	const [searchParams] = useSearchParams()
	const user = useOptionalUser()

	const to = user?.id
		? '/dashboard'
		: {
				pathname: '/auth/signup',
				search: searchParams.toString(),
			}

	return (
		<Box
			component="header"
			display="flex"
			items="center"
			justify="between"
			className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
		>
			<Box className="container">
				<Box
					display="flex"
					items="center"
					justify="between"
					className="h-16 w-full"
				>
					<Link
						to="/"
						className="flex items-center border-b-0 font-medium"
					>
						<Logo height={32} />
					</Link>

					<Box
						display="flex"
						items="center"
						gap={8}
						className="hidden md:flex"
					>
						<Link
							to="#features"
							className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
						>
							Features
						</Link>
						<Link
							to="/docs"
							className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
						>
							Documentation
						</Link>
						<Link
							to="/pricing"
							className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
						>
							Pricing
						</Link>
					</Box>

					<Box display="flex" items="center" gap={4}>
						{user?.id ? (
							<>
								<LinkButton
									to="/dashboard"
									variant="outline"
									className="hidden sm:flex"
								>
									Dashboard
								</LinkButton>
								<LinkButton to="/dashboard" variant="outline" className="sm:hidden">
									<Icon name="plus" size="sm" />
								</LinkButton>
							</>
						) : (
							<>
								<LinkButton
									to="/auth/login"
									variant="outline"
									className="hidden sm:flex"
								>
									Sign In
								</LinkButton>
								<LinkButton to={to} variant="solid" color="primary">
									Get Started
								</LinkButton>
							</>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
