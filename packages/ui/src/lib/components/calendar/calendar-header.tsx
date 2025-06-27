'use client';

import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';
import { Button } from '../../ui/button';

import { useCalendarContext } from './calendar-context';
import type { CalendarHeaderProps } from './calendar-types';
import { dateUtils } from './calendar-utils';
import {
  calendarHeaderVariants,
  calendarNavButtonVariants,
} from './calendar-variants';

/**
 * Calendar header component with navigation
 */
export function CalendarHeader({
  className,
  classNames,
  ref,
  ...props
}: CalendarHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  const context = useCalendarContext();

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2024, i, 1);
    return {
      value: i,
      label: dateUtils.formatMonth(date, context.locale),
    };
  });

  // Generate year options (current year ± 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => {
    const year = currentYear - 10 + i;
    return {
      value: year,
      label: year.toString(),
    };
  });

  const handlePreviousMonth = () => {
    const newMonth = dateUtils.subtractMonths(context.currentMonth, 1);
    console.log('newMonth', newMonth);
    context.setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = dateUtils.addMonths(context.currentMonth, 1);
    context.setCurrentMonth(newMonth);
  };

  const handleMonthSelect = (month: number) => {
    const newMonth = new Date(context.currentMonth.getFullYear(), month, 1);
    context.setCurrentMonth(newMonth);
  };

  const handleYearSelect = (year: number) => {
    const newMonth = new Date(year, context.currentMonth.getMonth(), 1);
    context.setCurrentMonth(newMonth);
  };

  return (
    <Box
      ref={ref}
      className={cn(calendarHeaderVariants({ size: 'md' }), className)}
      {...props}
    >
      {/* Previous Month Button */}
      <Button
        type="button"
        variant="text"
        color="neutral"
        size="sm"
        onClick={handlePreviousMonth}
        className={cn(
          calendarNavButtonVariants({ size: 'md', variant: 'ghost' }),
          classNames?.navigationButtonPrevious,
        )}
        aria-label="Go to previous month"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Button>

      {/* Month/Year Display */}
      <Box className="flex items-center gap-2">
        {/* Month Select */}
        <select
          value={context.currentMonth.getMonth()}
          onChange={(e) => handleMonthSelect(parseInt(e.target.value, 10))}
          className={cn(
            'bg-transparent border-none text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1',
            classNames?.monthSelect,
          )}
          aria-label="Select month"
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>

        {/* Year Select */}
        <select
          value={context.currentMonth.getFullYear()}
          onChange={(e) => handleYearSelect(parseInt(e.target.value, 10))}
          className={cn(
            'bg-transparent border-none text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1',
            classNames?.yearSelect,
          )}
          aria-label="Select year"
        >
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
      </Box>

      {/* Next Month Button */}
      <Button
        type="button"
        variant="text"
        color="neutral"
        size="sm"
        onClick={handleNextMonth}
        className={cn(
          calendarNavButtonVariants({ size: 'md', variant: 'ghost' }),
          classNames?.navigationButtonNext,
        )}
        aria-label="Go to next month"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Button>
    </Box>
  );
}

CalendarHeader.displayName = 'CalendarHeader';
