'use client';

import { memo, useMemo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';

import { useCalendarContext } from './calendar-context';
import { CalendarDay } from './calendar-day';
import { dateUtils } from './calendar-utils';
import {
  calendarGridVariants,
  calendarWeekVariants,
} from './calendar-variants';
import { CalendarWeekHeader } from './calendar-week-header';
import { type CalendarClassNames } from './types';

interface MonthGridProps {
  month: Date;
  className?: string;
  classNames?: CalendarClassNames;
}

/**
 * Standalone month grid component - optimized with memoization
 */
export const MonthGrid = memo(function MonthGrid({
  month,
  className,
  classNames,
}: MonthGridProps) {
  const context = useCalendarContext();

  // Memoize month grid generation
  const monthGrid = useMemo(() => {
    return dateUtils.getMonthGrid(
      month,
      context.weekStartsOn,
      context.showOutsideDays,
    );
  }, [month, context.weekStartsOn, context.showOutsideDays]);

  // Memoize aria label
  const ariaLabel = useMemo(() => {
    return `Calendar for ${dateUtils.formatMonth(month, context.locale)} ${dateUtils.formatYear(month, context.locale)}`;
  }, [month, context.locale]);

  // Memoize the week rows to prevent unnecessary re-renders
  const weekRows = useMemo(() => {
    return monthGrid.map((week, weekIndex) => (
      <Box
        key={weekIndex}
        className={cn(
          calendarWeekVariants({ size: 'md' }),
          classNames?.weekRow,
        )}
        role="row"
      >
        {week.map((date, dayIndex) => {
          const isOutsideMonth = context.isOutsideMonth(date, month);

          // Skip outside days if not showing them
          if (!context.showOutsideDays && isOutsideMonth) {
            return (
              <Box
                key={dayIndex}
                className={cn('p-1', classNames?.dayCell)}
                role="gridcell"
              />
            );
          }

          return (
            <Box
              key={dayIndex}
              className={cn('p-1', classNames?.dayCell)}
              role="gridcell"
            >
              <CalendarDay
                date={date}
                month={month}
                className={classNames?.dayButton}
              />
            </Box>
          );
        })}
      </Box>
    ));
  }, [monthGrid, month, context, classNames]);

  return (
    <Box className={cn('flex flex-col')}>
      {/* Week header */}
      <CalendarWeekHeader
        className={classNames?.weekHeader}
        classNames={classNames}
      />

      {/* Month grid */}
      <Box
        className={cn(calendarGridVariants({ size: 'md' }), className)}
        role="grid"
        aria-label={ariaLabel}
      >
        {weekRows}
      </Box>
    </Box>
  );
});

MonthGrid.displayName = 'MonthGrid';
