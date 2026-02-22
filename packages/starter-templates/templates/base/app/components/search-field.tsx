import { Button, TextField, Box, Typography } from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'
import { useCallback, useState } from 'react'

import { Avatar } from '#app/components/avatar'
import { ModalDialog } from '#app/components/dialogs/modal'

export interface SearchFieldProps {
	isMobile?: boolean
	toggleMenu?: () => void
}

/**
 * Search trigger and modal. Add a `/resources/search` (or similar) route and
 * wire it to enable actual search. This provides the nav UI without
 * app-specific search logic (questions, groups, etc.).
 */
export function SearchField({ isMobile, toggleMenu }: SearchFieldProps) {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')

	const handleOpen = useCallback(() => {
		setOpen(true)
		toggleMenu?.()
	}, [toggleMenu])

	const handleClose = useCallback(() => {
		setOpen(false)
		setValue('')
		toggleMenu?.()
	}, [toggleMenu])

	const handleOpenChange = useCallback(
		(newOpen: boolean) => {
			if (!newOpen) handleClose()
		},
		[handleClose],
	)

	return (
		<>
			<Button
				className={cn('p-0 focus:ring-0 focus:ring-offset-0', {
					'flex justify-start gap-4': isMobile,
				})}
				onClick={handleOpen}
				variant="plain"
				aria-label="Search"
			>
				{isMobile ? (
					<Typography>Search</Typography>
				) : (
					<Avatar icon="search" size={9} />
				)}
			</Button>
			<ModalDialog
				open={open}
				onOpenChange={handleOpenChange}
				title="Search"
				subtitle="Add a search resource route to enable global search."
				cancelButtonProps={{ hidden: true }}
				confirmButtonProps={{ hidden: true, text: '' }}
				className="min-h-[12rem]"
			>
				<TextField
					name="search"
					placeholder="Search..."
					value={value}
					onChange={(e) => setValue(e.target.value)}
					leftIcon="search"
					className="flex-nowrap"
					autoFocus
				/>
				<Box className="py-2 text-foreground/80">
					<Typography variant="caption">
						Configure a search loader and wire this input to enable results.
					</Typography>
				</Box>
			</ModalDialog>
		</>
	)
}
