import { type FormProps, Form } from '@veraclins-dev/form'
import {
	ModalDialog,
	type ModalDialogProps,
} from './modal'

type FormModalProps = ModalDialogProps & {
	formProps: FormProps
}

export function FormModal({
	open,
	onOpenChange,
	children,
	formProps: { noButtons = true, ...formProps },
	confirmButtonProps = { text: 'Submit' },
	...modalDialogProps
}: FormModalProps) {
	return (
		<ModalDialog
			open={open}
			preventDefault={false}
			onOpenChange={onOpenChange}
			{...modalDialogProps}
			confirmButtonProps={{
				...confirmButtonProps,
				form: formProps.form.id,
				id: undefined,
			}}
		>
			<Form {...formProps} noButtons={noButtons}>
				{children}
			</Form>
		</ModalDialog>
	)
}
