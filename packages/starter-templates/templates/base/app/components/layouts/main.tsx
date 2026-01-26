import { Box } from '@veraclins-dev/ui'

export const Layout = ({ children }: { children: React.ReactNode }) => {

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
				className='main-height w-full flex-1 overflow-y-scroll'
			>
				{children}
			</Box>
		</Box>
	)
}
