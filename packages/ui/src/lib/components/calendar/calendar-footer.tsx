'use client';

import { memo, useCallback } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';
import { Button } from '../../ui/button';
import { TimePicker } from '../../ui/time-picker';

import { useCalendarContext } from './calendar-context';
import { type CalendarClassNames } from './calendar-types';
import { calendarFooterVariants } from './calendar-variants';

/**
 * Calendar footer component props
 */
export interface CalendarFooterProps {
  onTodayClick?: () => void;
  showTimePicker?: boolean;
  className?: string;
  classNames?: CalendarClassNames;
}

/**
 * Calendar footer component with Today button and time selection
 */
export const CalendarFooter = memo(function CalendarFooter({
  onTodayClick,
  showTimePicker = false,
  className,
  classNames,
  ref,
  ...props
}: CalendarFooterProps & { ref?: React.Ref<HTMLDivElement> }) {
  const context = useCalendarContext();

  // Extract date from selected dates
  const getDateFromSelectedDates = (): Date | undefined => {
    if (!context.selectedDates) return undefined;

    if (context.selectedDates instanceof Date) {
      return context.selectedDates;
    } else if (Array.isArray(context.selectedDates)) {
      if (context.selectedDates.length === 0) return undefined;
      return context.selectedDates[0];
    } else {
      // DateRange
      if (!context.selectedDates.from) return undefined;
      return context.selectedDates.from;
    }
  };

  const handleTodayClick = useCallback(() => {
    if (onTodayClick) {
      onTodayClick();
    } else {
      // Default behavior: navigate to today and select today's date
      context.gotoToday();
      const today = new Date();
      if (!context.isDisabled(today)) {
        context.onDayClick(today, context.currentMonth);
      }
    }
  }, [onTodayClick, context]);

  const selectedDate = getDateFromSelectedDates();

  return (
    <Box
      ref={ref}
      className={cn(calendarFooterVariants({ size: 'md' }), className)}
      {...props}
    >
      <Box className="flex items-center justify-between w-full gap-2">
        {/* Today Button */}
        <Button
          variant="text"
          color="primary"
          buttonSize="sm"
          onClick={handleTodayClick}
          className={cn(classNames?.todayButton)}
        >
          Today
        </Button>

        {/* Time Picker (optional) */}
        {showTimePicker && (
          <Box className="flex items-center gap-2">
            <TimePicker
              value={selectedDate}
              onChange={context.onTimeChange}
              placeholder="Select time"
              use24Hour
              inputProps={{ className: 'w-28' }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
});

CalendarFooter.displayName = 'CalendarFooter';
