import { Box, SidebarProvider } from '@veraclins-dev/ui'

import { Outlet } from 'react-router'
import { type PageHandle } from '#app/common/types'
import { Navigation } from '#app/components/navigation'
import { PageHeader } from '#app/components/page-header'
import { AdminSidebar } from '#app/routes/admin+/components/sidebar'
import { AdminSidebarTrigger } from '#app/routes/admin+/components/sidebar-trigger'
import { getPageTitle } from '#app/utils/misc'
import { requireAdminUser } from '#app/utils/permissions/permissions.server'
import { type Route } from './+types/_layout'

export const handle: PageHandle = {
	breadcrumb: 'Admin Panel',
}

export async function loader({ request, context }: Route.LoaderArgs) {
	const user = await requireAdminUser(request, context)

	// Note: MFA enforcement can be added here if MFA module is enabled
	// if (ENV.FEATURES?.MFA) {
	//   await requireMFA(request, context)
	// }

	return { user }
}

export default function AdminLayout() {
	return (
		<SidebarProvider sidebarWidth="16rem">
			<Box className="flex h-screen w-full">
				<AdminSidebar />
				<Box className="flex flex-1 flex-col">
					<Box className="bg-card flex items-center gap-2 border-b px-4">
						<AdminSidebarTrigger />
						<Navigation />
					</Box>
					<PageHeader />
					<Box
						display="flex"
						flexDirection="column"
						gap={6}
						flex="1"
						overflow="auto"
						px={6}
						py={2}
					>
						<Outlet />
					</Box>
				</Box>
			</Box>
		</SidebarProvider>
	)
}

export const meta: Route.MetaFunction = () => {
	return [{ title: getPageTitle('Admin Panel') }]
}
