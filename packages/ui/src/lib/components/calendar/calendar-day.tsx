'use client';

import { memo, useMemo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Button } from '../../ui/button';

import { useCalendarContext } from './calendar-context';
import { dateUtils } from './calendar-utils';

/**
 * Calendar day component props
 */
export interface CalendarDayProps {
  date: Date;
  month: Date;
  className?: string;
}
/**
 * Calendar day component - optimized with memoization
 */
export const CalendarDay = memo(function CalendarDay({
  date,
  month,
  className,
  ref,
  ...props
}: CalendarDayProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const context = useCalendarContext();

  const state = useMemo(() => {
    return {
      isInRange: context.isInRange(date),
      isRangeStart: context.isRangeStart(date),
      isRangeEnd: context.isRangeEnd(date),
      isSelected: context.isSelected(date),
      isOutsideMonth: context.isOutsideMonth(date, month),
      isToday: context.isToday(date),
      isFocused:
        context.focusedDate && dateUtils.isSameDay(date, context.focusedDate),
      isHovered:
        context.hoveredDate && dateUtils.isSameDay(date, context.hoveredDate),
    };
  }, [context, date, month]);
  // Memoize Button variant and color based on day state
  const buttonProps = useMemo(() => {
    if (state.isInRange && !(state.isRangeStart || state.isRangeEnd)) {
      return { variant: 'soft' as const, color: 'primary' as const };
    }

    if (
      (state.isSelected || state.isRangeStart || state.isRangeEnd) &&
      !state.isOutsideMonth
    ) {
      return { variant: 'solid' as const, color: 'primary' as const };
    }

    if (state.isInRange && state.isOutsideMonth) {
      return { variant: 'soft' as const, color: 'primary' as const };
    }
    if (state.isOutsideMonth) {
      return { variant: 'soft' as const, color: 'neutral' as const };
    }

    if (state.isToday) {
      return { variant: 'soft' as const, color: 'secondary' as const };
    }

    return { variant: 'text' as const, color: 'neutral' as const };
  }, [state]);

  // Memoize className to prevent unnecessary re-computations
  const buttonClassName = useMemo(() => {
    return cn(
      // Base calendar day styles
      'size-8 text-sm font-normal',
      // Range start/end rounded corner adjustments
      state.isRangeStart &&
        !state.isRangeEnd &&
        !state.isOutsideMonth &&
        'rounded-r-none',
      state.isRangeEnd &&
        !state.isRangeStart &&
        !state.isOutsideMonth &&
        'rounded-l-none',
      state.isInRange &&
        !state.isRangeStart &&
        !state.isRangeEnd &&
        !state.isOutsideMonth &&
        'rounded-none',
      state.isOutsideMonth && 'opacity-50',
      state.isFocused &&
        !state.isOutsideMonth &&
        'ring-1 ring-foreground ring-offset-0.5',
      className,
    );
  }, [state, className]);

  // Memoize day number
  const dayNumber = useMemo(() => {
    return date.getDate();
  }, [date]);

  // Memoize data attributes
  const dataAttributes = useMemo(() => {
    const ariaLabel = dateUtils.formatDate(date, 'en-US');
    return {
      'data-date': date.toISOString(),
      'aria-label': ariaLabel,
      'aria-selected': state.isSelected,
      'aria-current': state.isToday ? ('date' as const) : undefined,
    };
  }, [date, state]);

  // Determine size based on common calendar sizes
  const size = 'sm' as const;

  return (
    <Button
      ref={ref}
      type="button"
      variant={buttonProps.variant}
      color={buttonProps.color}
      buttonSize={size}
      onClick={() => context.onDayClick(date, month)}
      onMouseEnter={() => context.onDayMouseEnter(date)}
      onMouseLeave={context.onDayMouseLeave}
      onKeyDown={context.onDayKeyDown}
      onFocus={() => context.onDayFocus(date)}
      onBlur={context.onDayBlur}
      disabled={context.isDisabled(date)}
      className={buttonClassName}
      {...dataAttributes}
      {...props}
    >
      {dayNumber}
    </Button>
  );
});

CalendarDay.displayName = 'CalendarDay';
