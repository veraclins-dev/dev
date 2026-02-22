import {
	Box,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@veraclins-dev/ui'

import { Avatar, type AvatarProps } from '#app/components/avatar'
import { Link, LinkWithRedirect, type LinkProps } from '#app/components/link'
import { UserCard } from '#app/components/user-card'
import { useUserPermissions } from '#app/hooks/use-user-permissions'
import { getDisplayName } from '#app/utils/misc'
import { type UserProfile } from '#app/utils/user/types'

type Props = {
	profile: UserProfile
	tooltip?: string
}

export function Item({
	to,
	icon,
	label,
	redirect,
}: {
	to: LinkProps['to']
	icon: Required<AvatarProps['icon']>
	label: React.ReactNode
	redirect?: boolean
}) {
	const Comp = redirect ? LinkWithRedirect : Link
	return (
		<DropdownMenuItem asChild>
			<Comp className="flex w-full items-center gap-x-2" to={to}>
				<Avatar size={6} icon={icon} />
				{label}
			</Comp>
		</DropdownMenuItem>
	)
}

function ProfileLabel({ profile }: Props) {
	const name = getDisplayName(profile, false)

	return (
		<DropdownMenuGroup>
			<DropdownMenuItem asChild>
				<Link
					className="flex gap-2 rounded-md px-1 py-1.5 text-left text-sm hover:bg-neutral-soft"
					to={`/profiles/${profile.username}`}
				>
					<UserCard
						size={9}
						className="flex cursor-pointer items-center justify-center"
						titleClass="w-40"
						alt="Profile avatar"
						src={profile?.profileImage ?? ''}
						title={name}
						byline={profile?.email}
					/>
				</Link>
			</DropdownMenuItem>
		</DropdownMenuGroup>
	)
}

export function UserDropdown({ profile, tooltip }: Props) {
	const { isAModerator } = useUserPermissions({ user: profile })

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="plain"
					className="p-0 focus:ring-0 focus:ring-offset-0"
				>
					<Box component="span" className="sr-only">
						{tooltip}
					</Box>
					<Avatar
						size={9}
						className="flex cursor-pointer items-center justify-center"
						alt="Profile avatar"
						src={profile?.profileImage ?? ''}
						tooltip={tooltip}
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				side="bottom"
				align="end"
				sideOffset={4}
			>
				<ProfileLabel profile={profile} />
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Item to="/profiles" icon="eye-open" label="View Profile" />
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Item
						to={`/profiles/${profile.username}/settings`}
						icon="cog-6-tooth"
						label="Profile Settings"
					/>
					<Item
						to={`/profiles/${profile.username}/settings/theme`}
						icon="moon"
						label="Display Settings"
					/>
					{isAModerator && (
						<Item
							to="/admin"
							icon="shield-exclamation"
							label="Admin Dashboard"
						/>
					)}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<Item
					to="/logout"
					icon="arrow-right-on-rectangle"
					label="Log out"
					redirect
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
