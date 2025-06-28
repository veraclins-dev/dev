'use client';

import { memo, useCallback, useMemo } from 'react';

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
import { CalendarWeekHeader } from './calendar-week-header';

interface MonthGridProps {
  month: Date;
  monthIndex: number;
  onDayClick?: (date: Date) => void;
  onDayMouseEnter?: (date: Date) => void;
  onDayMouseLeave?: (date: Date) => void;
  className?: string;
  classNames?: CalendarGridProps['classNames'];
}

/**
 * Standalone month grid component - optimized with memoization
 */
export const MonthGrid = memo(function MonthGrid({
  month,
  monthIndex,
  onDayClick,
  onDayMouseEnter,
  onDayMouseLeave,
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

  // Optimized day click handler
  const handleDayClick = useCallback(
    (date: Date) => {
      // Skip if date is disabled or outside month
      if (context.isDisabled(date) || context.isOutsideMonth(date, month)) {
        return;
      }

      let newSelectedDates:
        | Date
        | Date[]
        | { from: Date; to?: Date }
        | undefined;

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
    },
    [context, month, onDayClick],
  );

  // Keyboard navigation
  const { handleKeyDown } = useCalendarKeyboard({
    onMonthChange: context.setCurrentMonth,
    onDaySelect: handleDayClick,
    onDayNavigate: useCallback(
      (date: Date) => {
        context.setFocusedDate(date);
      },
      [context],
    ),
    isDateAllowed: useCallback(
      (date: Date) => !context.isDisabled(date),
      [context],
    ),
  });

  // Optimized mouse event handlers
  const handleDayMouseEnter = useCallback(
    (date: Date) => {
      context.setHoveredDate(date);
      onDayMouseEnter?.(date);
    },
    [context, onDayMouseEnter],
  );

  const handleDayMouseLeave = useCallback(
    (date: Date) => {
      context.setHoveredDate(undefined);
      onDayMouseLeave?.(date);
    },
    [context, onDayMouseLeave],
  );

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

  const handleDayBlur = useCallback(() => {
    // Don't clear focus immediately to allow for keyboard navigation
  }, []);

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
    ));
  }, [
    monthGrid,
    month,
    context,
    classNames,
    handleDayClick,
    handleDayMouseEnter,
    handleDayMouseLeave,
    handleDayKeyDown,
    handleDayFocus,
    handleDayBlur,
  ]);

  return (
    <Box
      className={cn(
        'flex flex-col',
        monthIndex > 0 && 'ml-4', // Add spacing between months
      )}
    >
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
