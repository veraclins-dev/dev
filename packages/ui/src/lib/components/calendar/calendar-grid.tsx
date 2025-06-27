'use client';

import { useCallback } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';

import { useCalendarContext } from './calendar-context';
import { CalendarDay } from './calendar-day';
import { useCalendarKeyboard } from './calendar-hooks';
import type { CalendarGridProps } from './calendar-types';
import { dateUtils } from './calendar-utils';
import {
  calendarGridVariants,
  calendarWeekVariants,
} from './calendar-variants';

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

  // Generate month grid using context
  const monthGrid = dateUtils.getMonthGrid(
    context.currentMonth,
    context.weekStartsOn,
    context.showOutsideDays,
  );

  const handleDayClick = (date: Date) => {
    // Skip if date is disabled or outside month
    if (context.isDisabled(date) || context.isOutsideMonth(date)) {
      return;
    }

    let newSelectedDates: Date | Date[] | { from: Date; to?: Date } | undefined;

    switch (context.mode) {
      case 'single':
        newSelectedDates = date;
        break;

      case 'multiple': {
        const currentMultiple = (context.selectedDates as Date[]) || [];
        const isAlreadySelected = currentMultiple.some((selectedDate) =>
          dateUtils.isSameDay(date, selectedDate),
        );
        if (isAlreadySelected) {
          newSelectedDates = currentMultiple.filter(
            (selectedDate) => !dateUtils.isSameDay(date, selectedDate),
          );
        } else {
          newSelectedDates = [...currentMultiple, date];
        }
        break;
      }

      case 'range': {
        const currentRange =
          (context.selectedDates as { from: Date; to?: Date }) || {};
        if (!currentRange.from || (currentRange.from && currentRange.to)) {
          // Start new range
          newSelectedDates = { from: date, to: undefined };
        } else {
          // Complete range
          if (dateUtils.isBefore(date, currentRange.from)) {
            newSelectedDates = { from: date, to: currentRange.from };
          } else {
            newSelectedDates = { from: currentRange.from, to: date };
          }
        }
        break;
      }

      default:
        newSelectedDates = date;
    }

    context.setSelectedDates(newSelectedDates);
    onDayClick?.(date);
  };

  // Keyboard navigation
  const { handleKeyDown } = useCalendarKeyboard({
    onMonthChange: context.setCurrentMonth,
    onDaySelect: (date: Date) => {
      // Handle day selection via keyboard (Enter/Space)
      console.log('handleDaySelect', date, onDayClick);
      handleDayClick(date);
    },
    onDayNavigate: (date: Date) => {
      // Handle day navigation via keyboard (arrows, home, end, page up/down)
      context.setFocusedDate(date);
    },
    isDateAllowed: (date: Date) => !context.isDisabled(date),
  });

  const handleDayMouseEnter = (date: Date) => {
    context.setHoveredDate(date);
    onDayMouseEnter?.(date);
  };

  const handleDayMouseLeave = (date: Date) => {
    context.setHoveredDate(undefined);
    onDayMouseLeave?.(date);
  };

  const handleDayKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      handleKeyDown(event.nativeEvent);
    },
    [handleKeyDown],
  );

  const handleDayFocus = useCallback(
    (date: Date) => {
      context.setFocusedDate(date);
    },
    [context],
  );

  const handleDayBlur = useCallback(
    (date: Date) => {
      // Don't clear focus immediately to allow for keyboard navigation
      // context.setFocusedDate(undefined);
    },
    [context],
  );

  return (
    <Box
      ref={ref}
      className={cn(calendarGridVariants({ size: 'md' }), className)}
      role="grid"
      aria-label="Calendar"
      {...props}
    >
      {monthGrid.map((week, weekIndex) => (
        <Box
          key={weekIndex}
          className={cn(
            calendarWeekVariants({ size: 'md' }),
            classNames?.weekRow,
          )}
          role="row"
        >
          {week.map((date, dayIndex) => {
            const isOutsideMonth = context.isOutsideMonth(date);
            const isToday = context.isToday(date);
            const isSelected = context.isSelected(date);
            const isInRange = context.isInRange(date);
            const isRangeStart = context.isRangeStart(date);
            const isRangeEnd = context.isRangeEnd(date);
            const isDisabled = context.isDisabled(date);

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
                  isSelected={isSelected}
                  isToday={isToday}
                  isOutsideMonth={isOutsideMonth}
                  isDisabled={isDisabled}
                  isInRange={isInRange}
                  isRangeStart={isRangeStart}
                  isRangeEnd={isRangeEnd}
                  isHovered={
                    context.hoveredDate &&
                    dateUtils.isSameDay(date, context.hoveredDate)
                  }
                  isFocused={
                    context.focusedDate &&
                    dateUtils.isSameDay(date, context.focusedDate)
                  }
                  onClick={handleDayClick}
                  onMouseEnter={handleDayMouseEnter}
                  onMouseLeave={handleDayMouseLeave}
                  onKeyDown={handleDayKeyDown}
                  onFocus={handleDayFocus}
                  onBlur={handleDayBlur}
                  className={classNames?.dayButton}
                />
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}

CalendarGrid.displayName = 'CalendarGrid';
