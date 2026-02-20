import {
	Box,
	Button,
	type DateRange,
	type DateValue,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@veraclins-dev/ui'
import {
	endOfPeriod,
	getDateRange,
	isSameDay,
	isToday,
	type StartOfPeriod,
} from '@veraclins-dev/utils'
import { useEffect, useState } from 'react'

import type { DatePeriodValue } from '../../common/types'
import { CalendarDialog } from './calendar-dialog'

const periodOptions: { value: StartOfPeriod; label: string }[] = [
	{ value: 'Today', label: 'Today' },
	{ value: 'Last 7 days', label: 'Last 7 days' },
	{ value: 'Last 14 days', label: 'Last 14 days' },
	{ value: 'Last 30 days', label: 'Last 30 days' },
	{ value: 'This month', label: 'This month' },
	{ value: 'Last 60 days', label: 'Last 60 days' },
	{ value: 'Last 90 days', label: 'Last 90 days' },
	{ value: 'This quarter', label: 'This quarter' },
	{ value: 'Last 6 months', label: 'Last 6 months' },
	{ value: 'Last 12 months', label: 'Last 12 months' },
	{ value: 'This year', label: 'This year' },
]

export type DateDropdownValue = ReturnType<typeof getDateRange>

interface DateDropdownProps {
	value?: DateDropdownValue
	onValueChange?: (value: DateDropdownValue) => void
	className?: string
	allowFutureDates?: boolean
}

export const detectPeriodFromValue = (
	value: DateDropdownValue,
): StartOfPeriod | null => {
	if (!value || typeof value !== 'object' || !('from' in value)) {
		return null
	}
	const fromDate = new Date(value.from)
	const toDate = new Date(value.to)
	for (const option of periodOptions) {
		const expectedRange = getDateRange({ from: option.value })
		if (
			isSameDay(fromDate, new Date(expectedRange.from)) &&
			isSameDay(toDate, new Date(expectedRange.to))
		) {
			return option.value
		}
	}
	return null
}

const detectCustomValue = (
	value: DateDropdownValue,
):
	| { type: 'range'; value: DateRange }
	| { type: 'untilNow'; value: DateRange }
	| null => {
	if (!value || typeof value !== 'object' || !('from' in value)) {
		return null
	}
	if (isToday(value.to)) {
		return {
			type: 'untilNow',
			value: { from: new Date(value.from), to: new Date(value.to) },
		}
	}
	return {
		type: 'range',
		value: { from: new Date(value.from), to: new Date(value.to) },
	}
}

type CustomMode = {
	type: 'range' | 'untilNow' | undefined
	isOpen: boolean
}

function DateDropdownTrigger({ displayValue }: { displayValue: string }) {
	return (
		<DropdownMenuTrigger asChild>
			<Button
				variant="outline"
				className="w-fit justify-between px-3 py-2 text-left"
				leadingIcon="calendar"
				trailingIcon="chevron-down"
			>
				{displayValue}
			</Button>
		</DropdownMenuTrigger>
	)
}

function DateDropdownContent({
	currentPeriodValue,
	selectionType,
	onPeriodSelect,
	onCustomSelect,
}: {
	currentPeriodValue: string | undefined
	selectionType: DatePeriodValue['type']
	onPeriodSelect: (value: string) => void
	onCustomSelect: (type: 'untilNow' | 'range') => void
}) {
	return (
		<DropdownMenuContent className="w-80" align="start">
			<DropdownMenuRadioGroup
				value={currentPeriodValue}
				onValueChange={onPeriodSelect}
			>
				{periodOptions.map((option) => (
					<DropdownMenuRadioItem key={option.value} value={option.value}>
						{option.label}
					</DropdownMenuRadioItem>
				))}
			</DropdownMenuRadioGroup>
			<DropdownMenuSeparator />
			<DropdownMenuRadioGroup value={selectionType}>
				<DropdownMenuRadioItem
					key="untilNow"
					value="untilNow"
					onClick={() => onCustomSelect('untilNow')}
				>
					From date until now
				</DropdownMenuRadioItem>
				<DropdownMenuRadioItem
					key="range"
					value="range"
					onClick={() => onCustomSelect('range')}
				>
					Fixed date range
				</DropdownMenuRadioItem>
			</DropdownMenuRadioGroup>
		</DropdownMenuContent>
	)
}

function DateDropdownMenu({
	displayValue,
	currentPeriodValue,
	selectionType,
	onPeriodSelect,
	onCustomSelect,
}: {
	displayValue: string
	currentPeriodValue: string | undefined
	selectionType: DatePeriodValue['type']
	onPeriodSelect: (value: string) => void
	onCustomSelect: (type: 'untilNow' | 'range') => void
}) {
	return (
		<DropdownMenu>
			<DateDropdownTrigger displayValue={displayValue} />
			<DateDropdownContent
				currentPeriodValue={currentPeriodValue}
				selectionType={selectionType}
				onPeriodSelect={onPeriodSelect}
				onCustomSelect={onCustomSelect}
			/>
		</DropdownMenu>
	)
}

export function DateDropdown({
	value = getDateRange({ from: 'Last 7 days' }),
	onValueChange,
	className,
	allowFutureDates = false,
}: DateDropdownProps) {
	const [customMode, setCustomMode] = useState<CustomMode>({
		type: undefined,
		isOpen: false,
	})
	const [selection, setSelection] = useState<DatePeriodValue>(() => ({
		type: 'period' as const,
		value: 'Last 7 days',
	}))

	useEffect(() => {
		if (!value) return
		const detectedPeriod = detectPeriodFromValue(value)
		if (detectedPeriod) {
			setSelection({ type: 'period', value: detectedPeriod })
			return
		}
		const detectedCustom = detectCustomValue(value)
		if (detectedCustom) {
			setSelection(detectedCustom)
			setCustomMode((current) => ({ ...current, type: detectedCustom.type }))
			return
		}
		setSelection({ type: 'period', value: 'Last 7 days' })
	}, [value])

	const handlePeriodSelect = (selectedValue: string) => {
		const period = selectedValue as StartOfPeriod
		setSelection({ type: 'period', value: period })
		onValueChange?.(getDateRange({ from: period }))
	}

	const handleDateSelect = (selectedValue?: DateValue) => {
		if (!selectedValue) return
		if (
			selectedValue &&
			typeof selectedValue === 'object' &&
			'from' in selectedValue
		) {
			const range = selectedValue
			setSelection({ type: 'range', value: range })
			onValueChange?.(getDateRange({ from: range.from, to: range.to }))
		} else if (selectedValue instanceof Date) {
			setSelection({
				type: 'untilNow',
				value: {
					from: selectedValue,
					to: endOfPeriod('Today'),
				},
			})
			onValueChange?.(getDateRange({ from: selectedValue }))
		}
		setCustomMode((current) => ({ ...current, isOpen: false }))
	}

	const getDisplayValue = () => {
		switch (selection.type) {
			case 'period':
				return (
					periodOptions.find((option) => option.value === selection.value)
						?.label || selection.value
				)
			case 'untilNow':
			case 'range':
				return `${selection.value.from.toLocaleDateString()} - ${selection.value.to?.toLocaleDateString()}`
			default:
				return 'Select date range'
		}
	}

	const getCurrentPeriodValue = () =>
		selection.type === 'period' ? selection.value : undefined

	const getCurrentCustomValue = (): DateValue | undefined => {
		switch (selection.type) {
			case 'untilNow':
				return selection.value.from
			case 'range':
				return selection.value
			default:
				return undefined
		}
	}

	const maxDate = allowFutureDates ? undefined : new Date()

	return (
		<Box className={className}>
			<DateDropdownMenu
				displayValue={getDisplayValue()}
				currentPeriodValue={getCurrentPeriodValue()}
				selectionType={selection.type}
				onPeriodSelect={handlePeriodSelect}
				onCustomSelect={(type) => {
					setCustomMode((current) => ({
						...current,
						type,
						isOpen: true,
					}))
				}}
			/>
			<CalendarDialog
				open={customMode.isOpen && customMode.type === 'untilNow'}
				onClose={() =>
					setCustomMode((current) => ({ ...current, isOpen: false }))
				}
				onConfirm={handleDateSelect}
				mode="single"
				value={getCurrentCustomValue()}
				maxDate={maxDate}
				title="Select the start date"
			/>
			<CalendarDialog
				open={customMode.isOpen && customMode.type === 'range'}
				onClose={() =>
					setCustomMode((current) => ({ ...current, isOpen: false }))
				}
				onConfirm={handleDateSelect}
				mode="range"
				value={getCurrentCustomValue()}
				numberOfMonths={2}
				maxDate={maxDate}
				title="Select the date range"
			/>
		</Box>
	)
}
