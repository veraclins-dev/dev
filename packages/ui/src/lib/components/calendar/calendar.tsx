'use client';

import { useCallback, useMemo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';

import { CalendarProvider } from './calendar-context';
import { useCalendarContext } from './calendar-context';
import { CalendarGrid } from './calendar-grid';
import { CalendarHeader } from './calendar-header';
import type { CalendarProps } from './calendar-types';
import { calendarVariants } from './calendar-variants';
import { CalendarWeekHeader } from './calendar-week-header';

/**
 * Calendar component
 */
export function Calendar({
  value,
  onValueChange,
  defaultValue,
  mode = 'single',
  numberOfMonths = 1,
  showOutsideDays = true,
  showWeekNumbers = false,
  showTodayButton = false,
  showNavigation = true,
  fromDate,
  toDate,
  disabled,
  minDate,
  maxDate,
  className,
  classNames,
  size = 'md',
  theme = 'default',
  onDayClick,
  onDayMouseEnter,
  onDayMouseLeave,
  onMonthChange,
  onYearChange,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  locale = 'en-US',
  weekStartsOn = 0,
  fixedWeeks = false,
  pagedNavigation = false,
  ref,
  ...props
}: CalendarProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <CalendarProvider
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      mode={mode}
      showOutsideDays={showOutsideDays}
      disabled={disabled}
      minDate={minDate}
      maxDate={maxDate}
      locale={locale}
      weekStartsOn={weekStartsOn}
    >
      <CalendarContent
        numberOfMonths={numberOfMonths}
        className={className}
        classNames={classNames}
        size={size}
        theme={theme}
        onDayClick={onDayClick}
        onDayMouseEnter={onDayMouseEnter}
        onDayMouseLeave={onDayMouseLeave}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        ref={ref}
        {...props}
      />
    </CalendarProvider>
  );
}

/**
 * Calendar content component that uses context
 */
function CalendarContent({
  numberOfMonths = 1,
  className,
  classNames,
  size = 'md',
  theme = 'default',
  onDayClick,
  onDayMouseEnter,
  onDayMouseLeave,
  onMonthChange,
  onYearChange,
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
  | 'showWeekNumbers'
  | 'showTodayButton'
  | 'showNavigation'
  | 'fromDate'
  | 'toDate'
  | 'disabled'
  | 'minDate'
  | 'maxDate'
  | 'locale'
  | 'weekStartsOn'
  | 'fixedWeeks'
  | 'pagedNavigation'
> & { ref?: React.Ref<HTMLDivElement> }) {
  const context = useCalendarContext();

  const handleBlur = useCallback(() => {
    context.setFocusedDate(undefined);
  }, [context]);

  return (
    <Box
      ref={ref}
      onBlur={handleBlur}
      className={cn(
        calendarVariants({ size, theme, layout: context.mode }),
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

      {/* Week Header */}
      <CalendarWeekHeader
        className={classNames?.weekHeader}
        classNames={classNames}
      />

      {/* Calendar Grid */}
      <CalendarGrid
        onDayClick={onDayClick}
        onDayMouseEnter={onDayMouseEnter}
        onDayMouseLeave={onDayMouseLeave}
        className={classNames?.calendarGrid}
        classNames={classNames}
      />
    </Box>
  );
}

Calendar.displayName = 'Calendar';
