'use client';

import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';

import { useCalendarContext } from './calendar-context';
import { MonthGrid } from './month-grid';
import type {
  CalendarClassNames,
  CalendarGridProps,
  CalendarMode,
  DateRange,
} from './types';

/**
 * Calendar grid component
 */
export function CalendarGrid({
  className,
  classNames,
  ref,
  ...props
}: Omit<
  CalendarGridProps,
  'monthGrid' | 'value' | 'mode' | 'showOutsideDays' | 'disabled'
> & { ref?: React.Ref<HTMLDivElement> }) {
  const { numberOfMonths, currentMonths } = useCalendarContext();

  return (
    <Box
      ref={ref}
      className={cn(
        'flex w-full max-w-fit overflow-x-auto',
        numberOfMonths > 1 ? 'gap-8' : 'flex-col',
        className,
      )}
      role="application"
      aria-label="Calendar"
      {...props}
    >
      {currentMonths.map((month, index) => (
        <MonthGrid
          key={index}
          month={month}
          className={classNames?.calendarGrid}
          classNames={classNames}
        />
      ))}
    </Box>
  );
}

CalendarGrid.displayName = 'CalendarGrid';
