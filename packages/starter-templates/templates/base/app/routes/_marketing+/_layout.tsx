import { Outlet } from 'react-router'

import { Box } from '@veraclins-dev/ui'

import { Footer } from '../../components/footer.tsx'
import { MarketingHeader } from '../../components/marketing-header.tsx'

export default function Layout() {
	return (
		<>
			<MarketingHeader />
			<Box className="w-full flex-1">
				<Outlet />
			</Box>
			<Footer />
		</>
	)
}
