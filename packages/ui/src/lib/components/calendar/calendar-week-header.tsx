'use client';

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
 * Calendar week header component
 */
export function CalendarWeekHeader({
  className,
  classNames,
  ref,
  ...props
}: CalendarWeekHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  const context = useCalendarContext();

  // Generate week day names
  const weekDays = dateUtils.getWeekDays(context.locale, context.weekStartsOn);

  return (
    <Box
      ref={ref}
      className={cn(calendarWeekHeaderVariants({ size: 'md' }), className)}
      {...props}
    >
      {weekDays.map((day, index) => (
        <Box
          key={index}
          className={cn(
            calendarWeekHeaderCellVariants({ size: 'md' }),
            classNames?.weekHeaderCell,
          )}
        >
          {day}
        </Box>
      ))}
    </Box>
  );
}

CalendarWeekHeader.displayName = 'CalendarWeekHeader';
