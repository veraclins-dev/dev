'use client';

import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';

import { useCalendarContext } from './calendar-context';
import type {
  CalendarClassNames,
  CalendarMode,
  DateRange,
} from './calendar-types';
import { MonthGrid } from './month-grid';

/**
 * Calendar grid component props
 */
export interface CalendarGridProps {
  monthGrid: Date[][];
  value?: Date | Date[] | DateRange;
  mode?: CalendarMode;
  showOutsideDays?: boolean;
  disabled?: Date[] | ((date: Date) => boolean);
  className?: string;
  classNames?: CalendarClassNames;
}
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
