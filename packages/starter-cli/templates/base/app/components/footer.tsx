import { Box, Icon, Typography } from '@veraclins-dev/ui'

import { Link } from './link'
import { Logo } from './logo'

export const Footer = () => {
	return (
		<Box
			component="footer"
			className="border-t border-border/40 bg-background"
		>
			<Box className="container">
				<Box
					display="flex"
					flexDirection="column"
					gap={12}
					className="py-12 md:flex-row md:py-16"
				>
					<Box
						display="flex"
						flexDirection="column"
						gap={4}
						className="md:w-1/3"
					>
						<Link
							to="/"
							className="mb-2 flex border-b-0 font-medium"
						>
							<Logo height={32} />
						</Link>
						<Typography variant="body2" className="max-w-sm text-foreground/70">
							{{PROJECT_DESCRIPTION}} Build faster with a production-ready
							foundation.
						</Typography>
					</Box>

					<Box
						display="grid"
						gap={8}
						className="grid-cols-2 flex-1 md:grid-cols-4"
					>
						<Box display="flex" flexDirection="column" gap={4}>
							<Typography variant="h4" className="font-semibold">
								Product
							</Typography>
							<Box display="flex" flexDirection="column" gap={2}>
								<Link
									to="#features"
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									Features
								</Link>
								<Link
									to="/pricing"
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									Pricing
								</Link>
								<Link
									to="/docs"
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									Documentation
								</Link>
							</Box>
						</Box>

						<Box display="flex" flexDirection="column" gap={4}>
							<Typography variant="h4" className="font-semibold">
								Company
							</Typography>
							<Box display="flex" flexDirection="column" gap={2}>
								<Link
									to="/about"
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									About
								</Link>
								<Link
									to="/blog"
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									Blog
								</Link>
								<Link
									to="/contact"
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									Contact
								</Link>
							</Box>
						</Box>

						<Box display="flex" flexDirection="column" gap={4}>
							<Typography variant="h4" className="font-semibold">
								Resources
							</Typography>
							<Box display="flex" flexDirection="column" gap={2}>
								<Link
									to="/docs/getting-started"
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									Getting Started
								</Link>
								<Link
									to="/docs/api"
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									API Reference
								</Link>
								<Link
									to="/support"
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									Support
								</Link>
							</Box>
						</Box>

						<Box display="flex" flexDirection="column" gap={4}>
							<Typography variant="h4" className="font-semibold">
								Legal
							</Typography>
							<Box display="flex" flexDirection="column" gap={2}>
								<Link
									to="/terms"
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									Terms & Conditions
								</Link>
								<Link
									to="/privacy"
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									Privacy Policy
								</Link>
								<Link
									to="/cookies"
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									Cookie Policy
								</Link>
							</Box>
						</Box>
					</Box>
				</Box>

				<Box
					display="flex"
					flexDirection="column"
					items="center"
					justify="between"
					gap={4}
					className="border-t border-border/40 py-8 md:flex-row"
				>
					<Typography variant="body2" className="text-foreground/60">
						© {new Date().getFullYear()} {{PROJECT_NAME}}. All rights reserved.
					</Typography>
					<Box display="flex" items="center" gap={4}>
						<Link
							to="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground/60 transition-colors hover:text-foreground"
							aria-label="Twitter"
						>
							<Icon name="envelope-closed" size="sm" />
						</Link>
						<Link
							to="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground/60 transition-colors hover:text-foreground"
							aria-label="GitHub"
						>
							<Icon name="envelope-closed" size="sm" />
						</Link>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
