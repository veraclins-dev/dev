'use client';

import { memo } from 'react';
import React from 'react';

import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';

import { CalendarProvider } from './calendar-context';
import { useCalendarContext } from './calendar-context';
import { CalendarFooter } from './calendar-footer';
import { CalendarGrid } from './calendar-grid';
import { CalendarHeader } from './calendar-header';
import type { CalendarProps, DateValue } from './types';

/**
 * Calendar component with advanced range selection features
 */
export const Calendar = memo(function Calendar<
  T extends DateValue = DateValue,
>({
  value,
  onValueChange,
  defaultValue,
  mode = 'single',
  numberOfMonths = 1,
  showOutsideDays = true,
  showTodayButton = false,
  showTimePicker = false,
  onTimePickerBlur,
  disabled,
  minDate,
  maxDate,
  className,
  classNames,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  locale = 'en-US',
  weekStartsOn = 0,
  ref,
  ...props
}: CalendarProps<T> & { ref?: React.Ref<HTMLDivElement> }) {
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
        showTodayButton={showTodayButton}
        showTimePicker={showTimePicker}
        onTimePickerBlur={onTimePickerBlur}
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
  showTodayButton,
  showTimePicker,
  timePickerProps,
  onTimePickerBlur,
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
  | 'disabled'
  | 'minDate'
  | 'maxDate'
  | 'locale'
  | 'weekStartsOn'
  | 'numberOfMonths'
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
          onTimePickerBlur={onTimePickerBlur}
          timePickerProps={timePickerProps}
          className={classNames?.calendarFooter}
          classNames={classNames}
        />
      )}
    </Box>
  );
});

Calendar.displayName = 'Calendar';
