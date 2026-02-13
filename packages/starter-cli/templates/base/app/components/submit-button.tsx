import { type FormProps } from '@veraclins-dev/form'
import { useIsPending } from '@veraclins-dev/react-utils'
import { type ButtonProps, Box, Button } from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'
import { Loader } from './loader'

export interface SubmitButtonProps
	extends ButtonProps,
		Pick<FormProps, 'action'> {
	text: React.ReactNode
	loading?: boolean
}

export const SubmitButton = ({
	text,
	className,
	loading,
	disabled,
	id,
	action,
	...props
}: SubmitButtonProps) => {
	const isPending = useIsPending({
		formAction: action,
	})

	const isLoading = loading || isPending
	return (
		<Button
			{...props}
			id={id ?? ''}
			className={className}
			type="submit"
			disabled={disabled ?? isLoading}
			variant="solid"
			color="primary"
		>
			<Box
				component="span"
				display="flex"
				className={cn('whitespace-nowrap', { 'pr-2': isLoading })}
			>
				{text}
			</Box>
			{isLoading && <Loader />}
		</Button>
	)
}
