'use client';

import { memo, useMemo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Button } from '../../ui/button';

import type { CalendarDayProps } from './calendar-types';
import { dateUtils } from './calendar-utils';

/**
 * Calendar day component - optimized with memoization
 */
export const CalendarDay = memo(function CalendarDay({
  date,
  isSelected,
  isToday,
  isOutsideMonth,
  isDisabled,
  isInRange,
  isRangeStart,
  isRangeEnd,
  isHovered,
  isFocused,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onFocus,
  onBlur,
  className,
  ref,
  ...props
}: CalendarDayProps & { ref?: React.Ref<HTMLButtonElement> }) {
  // Memoize Button variant and color based on day state
  const buttonProps = useMemo(() => {
    if (isInRange && !(isRangeStart || isRangeEnd)) {
      return { variant: 'soft' as const, color: 'primary' as const };
    }

    if (isSelected || isRangeStart || isRangeEnd) {
      return { variant: 'solid' as const, color: 'primary' as const };
    }

    if (isOutsideMonth) {
      return { variant: 'soft' as const, color: 'neutral' as const };
    }

    if (isToday) {
      return { variant: 'soft' as const, color: 'secondary' as const };
    }

    return { variant: 'text' as const, color: 'neutral' as const };
  }, [
    isInRange,
    isRangeStart,
    isRangeEnd,
    isSelected,
    isOutsideMonth,
    isToday,
  ]);

  // Memoize className to prevent unnecessary re-computations
  const buttonClassName = useMemo(() => {
    return cn(
      // Base calendar day styles
      'h-8 w-8 p-0 text-sm font-normal',
      // Range start/end rounded corner adjustments
      isRangeStart && !isRangeEnd && 'rounded-r-none',
      isRangeEnd && !isRangeStart && 'rounded-l-none',
      isRangeStart && isRangeEnd && 'rounded-md',
      isInRange && !isRangeStart && !isRangeEnd && 'rounded-none',
      isOutsideMonth && 'opacity-50',
      isFocused && 'ring-1 ring-foreground ring-offset-0.5',
      className,
    );
  }, [
    isRangeStart,
    isRangeEnd,
    isInRange,
    isOutsideMonth,
    isFocused,
    className,
  ]);

  // Memoize aria label
  const ariaLabel = useMemo(() => {
    return dateUtils.formatDate(date, 'en-US');
  }, [date]);

  // Memoize day number
  const dayNumber = useMemo(() => {
    return date.getDate();
  }, [date]);

  // Memoize data attributes
  const dataAttributes = useMemo(() => {
    return {
      'data-date': date.toISOString(),
      'aria-label': ariaLabel,
      'aria-selected': isSelected,
      'aria-current': isToday ? ('date' as const) : undefined,
    };
  }, [date, ariaLabel, isSelected, isToday]);

  // Determine size based on common calendar sizes
  const size = 'sm' as const;

  const handleClick = () => {
    if (!isDisabled && !isOutsideMonth) {
      onClick?.(date);
    }
  };

  const handleMouseEnter = () => {
    if (!isDisabled) {
      onMouseEnter?.(date);
    }
  };

  const handleMouseLeave = () => {
    if (!isDisabled) {
      onMouseLeave?.(date);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    onKeyDown?.(event);
  };

  const handleFocus = () => {
    if (!isDisabled) {
      onFocus?.(date);
    }
  };

  const handleBlur = () => {
    if (!isDisabled) {
      onBlur?.(date);
    }
  };

  return (
    <Button
      ref={ref}
      type="button"
      variant={buttonProps.variant}
      color={buttonProps.color}
      size={size}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={isDisabled}
      className={buttonClassName}
      {...dataAttributes}
      {...props}
    >
      {dayNumber}
    </Button>
  );
});

CalendarDay.displayName = 'CalendarDay';
