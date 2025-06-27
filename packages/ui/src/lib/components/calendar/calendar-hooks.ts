'use client';

import { useCallback, useEffect, useState } from 'react';

import { useCalendarContext } from './calendar-context';
import type { CalendarMode, DateRange } from './calendar-types';
import { dateUtils } from './calendar-utils';

/**
 * Hook for managing calendar state
 */
export function useCalendarState(props: {
  value?: Date | Date[] | DateRange;
  defaultValue?: Date | Date[] | DateRange;
  mode?: CalendarMode;
  weekStartsOn?: number;
  locale?: string;
  showOutsideDays?: boolean;
}) {
  const {
    value,
    defaultValue,
    mode = 'single',
    weekStartsOn = 0,
    locale = 'en-US',
    showOutsideDays = true,
  } = props;

  const [currentMonth, setCurrentMonth] = useState(() => {
    return dateUtils.getInitialMonth(value, defaultValue);
  });

  const [selectedDates, setSelectedDates] = useState(() => {
    return value || defaultValue;
  });

  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();
  const [focusedDate, setFocusedDate] = useState<Date | undefined>(() => {
    // Set initial focused date to today or first day of current month
    const today = new Date();
    const firstDayOfMonth = dateUtils.getFirstDayOfMonth(currentMonth);
    return dateUtils.isSameMonth(today, currentMonth) ? today : firstDayOfMonth;
  });

  // Update selected dates when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedDates(value);
    }
  }, [value]);

  // Update current month when selected dates change
  useEffect(() => {
    if (selectedDates) {
      let newMonth: Date;
      if (selectedDates instanceof Date) {
        newMonth = selectedDates;
      } else if (Array.isArray(selectedDates) && selectedDates.length > 0) {
        newMonth = selectedDates[0];
      } else if ('from' in selectedDates && selectedDates.from) {
        newMonth = selectedDates.from;
      } else {
        return;
      }

      if (!dateUtils.isSameMonth(newMonth, currentMonth)) {
        setCurrentMonth(newMonth);
      }
    }
  }, [selectedDates, currentMonth]);

  return {
    currentMonth,
    setCurrentMonth,
    selectedDates,
    setSelectedDates,
    hoveredDate,
    setHoveredDate,
    focusedDate,
    setFocusedDate,
    mode,
    weekStartsOn,
    locale,
    showOutsideDays,
  };
}

/**
 * Hook for date range selection
 */
export function useDateRange(
  value: DateRange | undefined,
  onValueChange?: (range: DateRange | undefined) => void,
) {
  const [range, setRange] = useState<DateRange | undefined>(value);
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();

  // Update range when value prop changes
  useEffect(() => {
    setRange(value);
  }, [value]);

  const handleDayClick = useCallback(
    (date: Date) => {
      if (!range?.from || (range.from && range.to)) {
        // Start new range
        const newRange = { from: date, to: undefined };
        setRange(newRange);
        onValueChange?.(newRange);
      } else {
        // Complete range
        let newRange: DateRange;
        if (dateUtils.isBefore(date, range.from!)) {
          newRange = { from: date, to: range.from };
        } else {
          newRange = { from: range.from, to: date };
        }
        setRange(newRange);
        onValueChange?.(newRange);
      }
    },
    [range, onValueChange],
  );

  const handleDayHover = useCallback((date: Date) => {
    setHoveredDate(date);
  }, []);

  return {
    range,
    hoveredDate,
    handleDayClick,
    handleDayHover,
  };
}

/**
 * Hook for keyboard navigation
 */
export function useCalendarKeyboard({
  onMonthChange,
  onDaySelect,
  onDayNavigate,
  isDateAllowed,
}: {
  onMonthChange: (date: Date) => void;
  onDaySelect: (date: Date) => void;
  onDayNavigate: (date: Date) => void;
  isDateAllowed?: (date: Date) => boolean;
}) {
  const { currentMonth, weekStartsOn, focusedDate } = useCalendarContext();
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!focusedDate) return;
      let newDate: Date;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          newDate = dateUtils.addDays(focusedDate, -1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          newDate = dateUtils.addDays(focusedDate, 1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          newDate = dateUtils.addDays(focusedDate, -7);
          break;
        case 'ArrowDown':
          event.preventDefault();
          newDate = dateUtils.addDays(focusedDate, 7);
          break;
        case 'Home':
          event.preventDefault();
          newDate = dateUtils.getFirstDayOfMonth(currentMonth);
          break;
        case 'End':
          event.preventDefault();
          newDate = dateUtils.getLastDayOfMonth(currentMonth);
          break;
        case 'PageUp':
          event.preventDefault();
          newDate = dateUtils.addMonths(focusedDate, -1);
          break;
        case 'PageDown':
          event.preventDefault();
          newDate = dateUtils.addMonths(focusedDate, 1);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          onDaySelect(focusedDate);
          return;
        case 'Escape':
          // Let the parent component handle escape
          return;
        default:
          return;
      }

      // Check if new date is within allowed range
      if (!isDateAllowed || isDateAllowed(newDate)) {
        // For navigation keys, just move focus without selecting
        onDayNavigate(newDate);
      }
    },
    [currentMonth, focusedDate, onDaySelect, onDayNavigate, isDateAllowed],
  );

  return { handleKeyDown };
}

/**
 * Hook for month navigation
 */
export function useMonthNavigation(
  currentMonth: Date,
  onMonthChange: (date: Date) => void,
  minDate?: Date,
  maxDate?: Date,
) {
  const goToPreviousMonth = useCallback(() => {
    const newMonth = dateUtils.addMonths(currentMonth, -1);
    if (!minDate || !dateUtils.isBefore(newMonth, minDate)) {
      onMonthChange(newMonth);
    }
  }, [currentMonth, onMonthChange, minDate]);

  const goToNextMonth = useCallback(() => {
    const newMonth = dateUtils.addMonths(currentMonth, 1);
    if (!maxDate || !dateUtils.isAfter(newMonth, maxDate)) {
      onMonthChange(newMonth);
    }
  }, [currentMonth, onMonthChange, maxDate]);

  const goToToday = useCallback(() => {
    const today = new Date();
    if (!minDate || !dateUtils.isBefore(today, minDate)) {
      if (!maxDate || !dateUtils.isAfter(today, maxDate)) {
        onMonthChange(today);
      }
    }
  }, [onMonthChange, minDate, maxDate]);

  return {
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  };
}
