'use client';

import { memo, useCallback, useMemo } from 'react';

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
 * Calendar component - optimized with memoization
 */
export const Calendar = memo(function Calendar({
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
  // Memoize provider props to prevent unnecessary re-renders
  const providerProps = useMemo(
    () => ({
      value,
      onValueChange,
      defaultValue,
      mode,
      numberOfMonths,
      showOutsideDays,
      disabled,
      minDate,
      maxDate,
      locale,
      weekStartsOn,
    }),
    [
      value,
      onValueChange,
      defaultValue,
      mode,
      numberOfMonths,
      showOutsideDays,
      disabled,
      minDate,
      maxDate,
      locale,
      weekStartsOn,
    ],
  );

  // Memoize content props
  const contentProps = useMemo(
    () => ({
      numberOfMonths,
      className,
      classNames,
      size,
      theme,
      onDayClick,
      onDayMouseEnter,
      onDayMouseLeave,
      onMonthChange,
      onYearChange,
      ariaLabel,
      ariaDescribedby,
      ref,
      ...props,
    }),
    [
      numberOfMonths,
      className,
      classNames,
      size,
      theme,
      onDayClick,
      onDayMouseEnter,
      onDayMouseLeave,
      onMonthChange,
      onYearChange,
      ariaLabel,
      ariaDescribedby,
      ref,
      props,
    ],
  );

  return (
    <CalendarProvider {...providerProps}>
      <CalendarContent {...contentProps} />
    </CalendarProvider>
  );
});

/**
 * Calendar content component that uses context - optimized with memoization
 */
const CalendarContent = memo(function CalendarContent({
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

  // Memoize calendar variants
  const calendarClassName = useMemo(() => {
    return cn(
      calendarVariants({
        size,
        theme,
        layout: context.mode,
        multiMonth: numberOfMonths > 1,
      }),
      className,
      classNames?.calendar,
    );
  }, [
    size,
    theme,
    context.mode,
    numberOfMonths,
    className,
    classNames?.calendar,
  ]);

  return (
    <Box
      ref={ref}
      onBlur={handleBlur}
      className={calendarClassName}
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
        onDayClick={onDayClick}
        onDayMouseEnter={onDayMouseEnter}
        onDayMouseLeave={onDayMouseLeave}
        className={classNames?.calendarGrid}
        classNames={classNames}
      />
    </Box>
  );
});

Calendar.displayName = 'Calendar';
