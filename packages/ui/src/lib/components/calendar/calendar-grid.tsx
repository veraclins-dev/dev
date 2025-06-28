'use client';

import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';

import { useCalendarContext } from './calendar-context';
import type { CalendarGridProps } from './calendar-types';
import { MonthGrid } from './month-grid';

/**
 * Calendar grid component
 */
export function CalendarGrid({
  onDayClick,
  onDayMouseEnter,
  onDayMouseLeave,
  className,
  classNames,
  ref,
  ...props
}: Omit<
  CalendarGridProps,
  'monthGrid' | 'value' | 'mode' | 'showOutsideDays' | 'disabled'
> & { ref?: React.Ref<HTMLDivElement> }) {
  const context = useCalendarContext();

  return (
    <Box
      ref={ref}
      className={cn(
        'flex',
        context.numberOfMonths > 1 ? 'justify-start' : 'flex-col',
        className,
      )}
      role="application"
      aria-label="Calendar"
      {...props}
    >
      {context.currentMonths.map((month, index) => (
        <MonthGrid
          key={index}
          month={month}
          monthIndex={index}
          onDayClick={onDayClick}
          onDayMouseEnter={onDayMouseEnter}
          onDayMouseLeave={onDayMouseLeave}
          className={classNames?.calendarGrid}
          classNames={classNames}
          showMonthHeader={context.numberOfMonths > 1}
        />
      ))}
    </Box>
  );
}

CalendarGrid.displayName = 'CalendarGrid';
