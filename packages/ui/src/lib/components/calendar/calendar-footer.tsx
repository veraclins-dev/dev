'use client';

import { memo, useCallback } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';
import { Button } from '../../ui/button';
import { TimePicker } from '../input-fields/time-picker';

import { useCalendarContext } from './calendar-context';
import type { CalendarFooterProps } from './calendar-types';
import {
  calendarFooterVariants,
  calendarTodayButtonVariants,
} from './calendar-variants';

/**
 * Calendar footer component with Today button and time selection
 */
export const CalendarFooter = memo(function CalendarFooter({
  onTodayClick,
  showTimePicker = false,
  timeValue,
  onTimeChange,
  className,
  classNames,
  ref,
  ...props
}: CalendarFooterProps & { ref?: React.Ref<HTMLDivElement> }) {
  const context = useCalendarContext();

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

  return (
    <Box
      ref={ref}
      className={cn(calendarFooterVariants({ size: 'md' }), className)}
      {...props}
    >
      <Box className="flex items-center justify-between w-full gap-2">
        {/* Today Button */}
        <Button
          type="button"
          variant="outline"
          color="neutral"
          size="sm"
          onClick={handleTodayClick}
          className={cn(
            calendarTodayButtonVariants({ size: 'sm', variant: 'outline' }),
            classNames?.todayButton,
          )}
        >
          Today
        </Button>

        {/* Time Picker (optional) */}
        {showTimePicker && (
          <Box className="flex items-center gap-2">
            <TimePicker
              value={timeValue || ''}
              onChange={onTimeChange}
              placeholder="Select time"
              use24Hour
              showSeconds
              className="w-32"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
});

CalendarFooter.displayName = 'CalendarFooter';
