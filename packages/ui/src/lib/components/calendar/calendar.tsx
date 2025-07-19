'use client';

import { memo, useCallback, useState } from 'react';
import React from 'react';

import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';

import { CalendarProvider } from './calendar-context';
import { useCalendarContext } from './calendar-context';
import { CalendarFooter } from './calendar-footer';
import { CalendarGrid } from './calendar-grid';
import { CalendarHeader } from './calendar-header';
import type {
  CalendarClassNames,
  CalendarMode,
  DateRange,
  WeekStartsOn,
} from './calendar-types';

export interface CalendarProps {
  // Date handling
  value?: Date | Date[] | DateRange;
  onValueChange?: (value: Date | Date[] | DateRange) => void;
  defaultValue?: Date | Date[] | DateRange;

  // Display options
  mode?: CalendarMode;
  showOutsideDays?: boolean;
  showTodayButton?: boolean;
  showNavigation?: boolean;

  // Time selection
  showTimePicker?: boolean;

  // Navigation constraints
  disabled?: Date[] | ((date: Date) => boolean);
  minDate?: Date;
  maxDate?: Date;

  // Styling
  className?: string;
  classNames?: CalendarClassNames;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;

  // Advanced options
  locale?: string;
  weekStartsOn?: WeekStartsOn;
  fixedWeeks?: boolean;
  numberOfMonths?: number;
}

/**
 * Calendar component with advanced range selection features
 */
export const Calendar = memo(function Calendar({
  value,
  onValueChange,
  defaultValue,
  mode = 'single',
  numberOfMonths = 1,
  showOutsideDays = true,
  showTodayButton = false,
  showNavigation = true,
  showTimePicker = false,
  disabled,
  minDate,
  maxDate,
  className,
  classNames,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  locale = 'en-US',
  weekStartsOn = 0,
  fixedWeeks = false,
  ref,
  ...props
}: CalendarProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <CalendarProvider
      mode={mode}
      numberOfMonths={numberOfMonths}
      showOutsideDays={showOutsideDays}
      locale={locale}
      weekStartsOn={weekStartsOn}
      disabled={disabled}
      minDate={minDate}
      maxDate={maxDate}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <CalendarContent
        ref={ref}
        numberOfMonths={numberOfMonths}
        showTodayButton={showTodayButton}
        showTimePicker={showTimePicker}
        className={className}
        classNames={classNames}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        {...props}
      />
    </CalendarProvider>
  );
});

/**
 * Calendar content component that uses context - optimized with memoization
 */
const CalendarContent = memo(function CalendarContent({
  numberOfMonths,
  showTodayButton,
  showTimePicker,
  className,
  classNames,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  ref,
  ...props
}: Omit<
  CalendarProps,
  | 'value'
  | 'onValueChange'
  | 'defaultValue'
  | 'mode'
  | 'showOutsideDays'
  | 'showNavigation'
  | 'disabled'
  | 'minDate'
  | 'maxDate'
  | 'locale'
  | 'weekStartsOn'
  | 'fixedWeeks'
> & { ref?: React.Ref<HTMLDivElement> }) {
  const context = useCalendarContext();

  return (
    <Box
      ref={ref}
      onBlur={context.onDayBlur}
      className={cn(
        'inline-flex flex-col rounded-lg border gap-2 p-3 w-full max-w-fit',
        className,
        classNames?.calendar,
      )}
      role="application"
      aria-label={ariaLabel || 'Calendar'}
      aria-describedby={ariaDescribedby}
      {...props}
    >
      {/* Navigation Header */}
      <CalendarHeader
        className={classNames?.calendarHeader}
        classNames={classNames}
      />

      {/* Calendar Grid */}
      <CalendarGrid
        className={classNames?.calendarGrid}
        classNames={classNames}
      />

      {/* Calendar Footer */}
      {(showTodayButton || showTimePicker) && (
        <CalendarFooter
          showTimePicker={showTimePicker}
          className={classNames?.calendarFooter}
          classNames={classNames}
        />
      )}
    </Box>
  );
});

Calendar.displayName = 'Calendar';
