import {
	type ButtonProps,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'
import { useCallback } from 'react'
import { CancelButton } from './cancel-button'
import { ConfirmButton } from './confirm-button'
import { type SubmitButtonProps } from '#app/components/submit-button'

export type ModalDialogProps = Readonly<{
	open: boolean
	onOpenChange: (open: boolean) => void
	title?: React.ReactNode
	subtitle?: string
	children: React.ReactNode
	confirmButtonProps?: SubmitButtonProps & { hidden?: boolean }
	cancelButtonProps?: ButtonProps & { hidden?: boolean }
	className?: string
	preventDefault?: boolean
}>

export function ModalDialog({
	open,
	onOpenChange,
	title,
	subtitle,
	children,
	preventDefault = true,
	cancelButtonProps: { hidden: cancelHidden, ...cancelButtonProps } = {},
	confirmButtonProps: { hidden: confirmHidden, ...confirmButtonProps } = {
		text: 'Confirm',
	},
	className,
}: ModalDialogProps) {
	const hasFooter = !cancelHidden || !confirmHidden

	const handleOnClick = useCallback(
		(e: React.MouseEvent) => {
			if (preventDefault) {
				e.preventDefault()
			}
		},
		[preventDefault],
	)

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className={cn(className)} onClick={handleOnClick}>
				<DialogHeader>
					{title && <DialogTitle>{title}</DialogTitle>}
					{subtitle && <DialogDescription>{subtitle}</DialogDescription>}
				</DialogHeader>
				{children}
				{hasFooter && (
					<DialogFooter>
						{!cancelHidden && (
							<DialogClose asChild>
								<CancelButton {...cancelButtonProps} />
							</DialogClose>
						)}
						{!confirmHidden && <ConfirmButton {...confirmButtonProps} />}
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	)
}
