import type { DateRange } from '@veraclins-dev/ui'
import type { StartOfPeriod } from '@veraclins-dev/utils'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type NonEmptyArray<T> = [T, ...T[]]

export type Maybe<T> = T | null
export type MaybeString = Maybe<string>

export type Nullable<T> = {
	[P in keyof T]: Maybe<T[P]>
}

export type BreadcrumbType = {
	label: string
	to: string
}

/** Route handle for breadcrumbs and layout (e.g. admin). */
export interface PageHandle {
	header?: string
	description?: string
	breadcrumb?: React.ReactNode
	actions?: React.ReactNode
	skipInBreadcrumb?: boolean
}

/** Start and end date for date-range filters (ISO strings). */
export type DateRangeValue = { from?: string; to?: string }

export type DatePeriodValue =
	| { type: 'period'; value: StartOfPeriod }
	| { type: 'range'; value: DateRange }
	| { type: 'untilNow'; value: DateRange }
