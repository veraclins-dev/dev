'use client';

import { memo, useCallback, useMemo } from 'react';

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
 * Calendar header component with navigation - optimized with memoization
 */
export const CalendarHeader = memo(function CalendarHeader({
  className,
  classNames,
  ref,
  ...props
}: CalendarHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  const context = useCalendarContext();

  // Memoize month options
  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(2024, i, 1);
      return {
        value: i,
        label: dateUtils.formatMonth(date, context.locale),
      };
    });
  }, [context.locale]);

  // Memoize year options (current year ± 10 years)
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 21 }, (_, i) => {
      const year = currentYear - 10 + i;
      return {
        value: year,
        label: year.toString(),
      };
    });
  }, []);

  // Memoize end month display for multi-month
  const endMonthDisplay = useMemo(() => {
    if (context.numberOfMonths <= 1) return null;

    const endMonth = dateUtils.addMonths(
      context.currentMonth,
      context.numberOfMonths - 1,
    );
    return `${dateUtils.formatMonth(endMonth, context.locale)} ${dateUtils.formatYear(endMonth, context.locale)}`;
  }, [context.numberOfMonths, context.currentMonth, context.locale]);

  // Optimized navigation handlers
  const handlePreviousMonth = useCallback(() => {
    const newMonth = dateUtils.subtractMonths(context.currentMonth, 1);
    context.setCurrentMonth(newMonth);
  }, [context]);

  const handleNextMonth = useCallback(() => {
    const newMonth = dateUtils.addMonths(context.currentMonth, 1);
    context.setCurrentMonth(newMonth);
  }, [context]);

  const handleMonthSelect = useCallback(
    (month: number) => {
      const newMonth = new Date(context.currentMonth.getFullYear(), month, 1);
      context.setCurrentMonth(newMonth);
    },
    [context.currentMonth, context.setCurrentMonth],
  );

  const handleYearSelect = useCallback(
    (year: number) => {
      const newMonth = new Date(year, context.currentMonth.getMonth(), 1);
      context.setCurrentMonth(newMonth);
    },
    [context.currentMonth, context],
  );

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
        {context.numberOfMonths > 1 ? (
          // Multi-month display: show range
          <Box className="flex items-center gap-1">
            <select
              value={context.currentMonth.getMonth()}
              onChange={(e) => handleMonthSelect(parseInt(e.target.value, 10))}
              className={cn(
                'bg-transparent border-none text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1',
                classNames?.monthSelect,
              )}
              aria-label="Select start month"
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>

            <select
              value={context.currentMonth.getFullYear()}
              onChange={(e) => handleYearSelect(parseInt(e.target.value, 10))}
              className={cn(
                'bg-transparent border-none text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1',
                classNames?.yearSelect,
              )}
              aria-label="Select start year"
            >
              {years.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>

            <span className="text-muted-foreground">-</span>

            <span className="text-sm font-medium">{endMonthDisplay}</span>
          </Box>
        ) : (
          // Single month display
          <>
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
          </>
        )}
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
});

CalendarHeader.displayName = 'CalendarHeader';
