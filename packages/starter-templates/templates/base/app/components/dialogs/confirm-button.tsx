import { Button as BaseButton } from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'
import {
	type SubmitButtonProps,
	SubmitButton,
} from '../submit-button'

interface ConfirmButtonProps extends SubmitButtonProps {}

const Button = ({ text, color = 'primary', ...props }: ConfirmButtonProps) => (
	<BaseButton color={color} {...props}>
		{text}
	</BaseButton>
)

export const ConfirmButton = ({
	className,
	type = 'submit',
	...props
}: ConfirmButtonProps) => {
	const Comp = type === 'submit' ? SubmitButton : Button
	return <Comp {...props} className={cn('px-6 py-2', className)} />
}
