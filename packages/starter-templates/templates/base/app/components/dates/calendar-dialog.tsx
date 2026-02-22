import { Calendar, type DateValue, type CalendarProps } from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'
import { useEffect, useState } from 'react'

import { ModalDialog, type ModalDialogProps } from '#app/components/dialogs/modal'

interface CalendarDialogProps
	extends Pick<ModalDialogProps, 'open' | 'title' | 'subtitle'>,
		Pick<
			CalendarProps,
			'mode' | 'numberOfMonths' | 'value' | 'className' | 'maxDate'
		> {
	onClose: () => void
	onConfirm: (value?: DateValue) => void
}

const getValue = (
	value: DateValue | undefined,
	mode: CalendarDialogProps['mode'],
) => {
	if (mode === 'single' && typeof value === 'object' && 'from' in value) {
		return value.from
	}
	return value
}

export function CalendarDialog({
	open,
	title = 'Select Date',
	subtitle,
	onClose,
	onConfirm,
	mode = 'range',
	numberOfMonths,
	value: initialValue,
	className,
	maxDate,
}: CalendarDialogProps) {
	const [value, setValue] = useState<DateValue | undefined>(initialValue)

	const handleRangeChange = (value?: DateValue) => {
		if (!value) return
		setValue(value)
	}

	const handleConfirm = () => {
		onConfirm(value)
	}

	useEffect(() => {
		if (!initialValue) return
		setValue(initialValue)
	}, [initialValue])

	return (
		<ModalDialog
			open={open}
			subtitle={subtitle}
			title={title}
			onOpenChange={onClose}
			confirmButtonProps={{
				onClick: handleConfirm,
				text: 'Apply',
				variant: 'soft',
				disabled: !value,
				id: 'apply',
			}}
			className={cn('w-fit max-w-fit gap-6', className)}
		>
			<Calendar
				mode={mode}
				value={getValue(value, mode)}
				onValueChange={handleRangeChange}
				numberOfMonths={numberOfMonths}
				maxDate={maxDate}
			/>
		</ModalDialog>
	)
}
