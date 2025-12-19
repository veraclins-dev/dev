import { Box } from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'
import { useLocation } from 'react-router'

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation()
	const isAuth = location.pathname.includes('/auth')

	return (
		<Box
			display="flex"
			flexDirection="column"
			items="center"
			justify="between"
			className="h-full min-h-screen w-full"
		>
			<Box
				display="flex"
				flexDirection="column"
				className={cn('main-height w-full flex-1 overflow-y-scroll', {
					'pt-4': !isAuth,
				})}
			>
				{children}
			</Box>
		</Box>
	)
}
