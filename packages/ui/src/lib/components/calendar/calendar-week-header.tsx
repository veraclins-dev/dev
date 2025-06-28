'use client';

import { memo, useMemo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';

import { useCalendarContext } from './calendar-context';
import type { CalendarWeekHeaderProps } from './calendar-types';
import { dateUtils } from './calendar-utils';
import {
  calendarWeekHeaderCellVariants,
  calendarWeekHeaderVariants,
} from './calendar-variants';

/**
 * Calendar week header component - optimized with memoization
 */
export const CalendarWeekHeader = memo(function CalendarWeekHeader({
  className,
  classNames,
  ref,
  ...props
}: CalendarWeekHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  const context = useCalendarContext();

  // Memoize week day names
  const weekDays = useMemo(() => {
    return dateUtils.getWeekDays(context.locale, context.weekStartsOn);
  }, [context.locale, context.weekStartsOn]);

  // Memoize week day cells to prevent unnecessary re-renders
  const weekDayCells = useMemo(() => {
    return weekDays.map((day, index) => (
      <Box
        key={index}
        className={cn(
          calendarWeekHeaderCellVariants({ size: 'md' }),
          classNames?.weekHeaderCell,
        )}
      >
        {day}
      </Box>
    ));
  }, [weekDays, classNames?.weekHeaderCell]);

  return (
    <Box
      ref={ref}
      className={cn(calendarWeekHeaderVariants({ size: 'md' }), className)}
      {...props}
    >
      {weekDayCells}
    </Box>
  );
});

CalendarWeekHeader.displayName = 'CalendarWeekHeader';
