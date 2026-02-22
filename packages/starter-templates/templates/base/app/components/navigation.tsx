import { useNavigateWithRedirect } from '@veraclins-dev/react-utils'
import { Box, Icon } from '@veraclins-dev/ui'

import { Avatar } from '#app/components/avatar'
import { NavLink } from '#app/components/nav-link'
import { NotificationDropdown } from '#app/components/notification-dropdown'
import { SearchField } from '#app/components/search-field'
import { UserDropdown } from '#app/components/user-dropdown'
import { useOptionalUser } from '#app/hooks/use-user'

export const Navigation = () => {
	const profile = useOptionalUser()
	const navigateWithRedirect = useNavigateWithRedirect()
	const login = () => navigateWithRedirect('/auth/login')

	return (
		<Box
			display="flex"
			items="center"
			justify="end"
			className="min-h-[4rem] flex-1 space-x-6 md:space-x-0"
		>
			<Box
				justify="between"
				items="center"
				flex="1"
				className="hidden space-x-2 md:flex lg:space-x-4"
			>
				<Box />
				<Box
					display="flex"
					items="center"
					justify="center"
					gap={{ sm: 3, xl: 4 }}
				>
					<NavLink to="/admin" className="cursor-pointer px-6 py-3 lg:py-[18px]" tooltip="Admin">
						<Icon size="md" name="cog" />
					</NavLink>
				</Box>

				{profile ? (
					<Box display="flex" items="center" justify="end" gap={4}>
						<SearchField />
						<NotificationDropdown username={profile.username} />
						<UserDropdown tooltip="Open profile menu" profile={profile} />
					</Box>
				) : (
					<Box display="flex" items="center" justify="end" gap={4}>
						<SearchField />
						<Avatar
							tooltip="Login or signup"
							onClick={login}
							icon="login"
							size={9}
							className="cursor-pointer"
						/>
					</Box>
				)}
			</Box>
		</Box>
	)
}
