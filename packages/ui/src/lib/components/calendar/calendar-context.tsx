'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type {
  CalendarContextValue,
  CalendarMode,
  DateRange,
  WeekStartsOn,
} from './calendar-types';
import { dateUtils } from './calendar-utils';

const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined,
);

interface CalendarProviderProps {
  children: React.ReactNode;
  // Calendar configuration
  mode?: CalendarMode;
  numberOfMonths?: number;
  showOutsideDays?: boolean;
  locale?: string;
  weekStartsOn?: WeekStartsOn;
  disabled?: Date[] | ((date: Date) => boolean);
  minDate?: Date;
  maxDate?: Date;
  // Calendar state
  value?: Date | Date[] | DateRange;
  defaultValue?: Date | Date[] | DateRange;
  onValueChange?: (value: Date | Date[] | DateRange) => void;
}

/**
 * Calendar context provider with built-in state management
 */
export function CalendarProvider({
  children,
  mode = 'single',
  numberOfMonths = 1,
  showOutsideDays = true,
  locale = 'en-US',
  weekStartsOn = 0,
  disabled,
  minDate,
  maxDate,
  value,
  defaultValue,
  onValueChange,
}: CalendarProviderProps) {
  // State management
  const [currentMonth, setCurrentMonth] = useState(() => {
    return dateUtils.getDefaultMonth(value, defaultValue);
  });

  // Generate array of months for multi-month display - memoized
  const currentMonths = useMemo(() => {
    const months: Date[] = [];
    for (let i = 0; i < numberOfMonths; i++) {
      months.push(dateUtils.addMonths(currentMonth, i));
    }
    return months;
  }, [currentMonth, numberOfMonths]);

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

  // Ref to track if we're updating from props
  const isUpdatingFromProps = useRef(false);
  const previousValue = useRef(value);

  // Memoize disabled dates set for faster lookups
  const disabledDatesSet = useMemo(() => {
    if (Array.isArray(disabled)) {
      return new Set(
        disabled.map((date) => dateUtils.formatDate(date, 'yyyy-MM-dd')),
      );
    }
    return null;
  }, [disabled]);

  // Memoize min/max date constraints
  const dateConstraints = useMemo(
    () => ({
      minDate: minDate ? minDate : null,
      maxDate: maxDate ? maxDate : null,
    }),
    [minDate, maxDate],
  );

  // Update selected dates when value prop changes
  useEffect(() => {
    if (value !== undefined && value !== previousValue.current) {
      isUpdatingFromProps.current = true;
      setSelectedDates(value);
      previousValue.current = value;
      isUpdatingFromProps.current = false;
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

      setCurrentMonth(newMonth);
    }
  }, [selectedDates]);

  // Optimized isSelected function with memoization
  const isSelected = useCallback(
    (date: Date): boolean => {
      if (!selectedDates) return false;

      switch (mode) {
        case 'single':
          return dateUtils.isSameDay(date, selectedDates as Date);
        case 'multiple': {
          const dates = selectedDates as Date[];
          return dates.some((selectedDate) =>
            dateUtils.isSameDay(date, selectedDate),
          );
        }
        case 'range': {
          const range = selectedDates as DateRange;
          if (!range.from) return false;
          if (range.to) {
            return dateUtils.isBetween(date, range.from, range.to);
          }
          return dateUtils.isSameDay(date, range.from);
        }
        default:
          return false;
      }
    },
    [selectedDates, mode],
  );

  // Optimized isInRange function
  const isInRange = useCallback(
    (date: Date): boolean => {
      if (mode !== 'range' || !selectedDates || !('from' in selectedDates)) {
        return false;
      }

      const range = selectedDates as DateRange;
      if (!range.from) return false;

      // If we have a hovered date and no end date, show preview range
      if (hoveredDate && !range.to) {
        if (dateUtils.isBefore(hoveredDate, range.from)) {
          return dateUtils.isBetween(date, hoveredDate, range.from);
        } else {
          return dateUtils.isBetween(date, range.from, hoveredDate);
        }
      }

      // If we have a complete range
      if (range.to) {
        return dateUtils.isBetween(date, range.from, range.to);
      }

      return false;
    },
    [mode, selectedDates, hoveredDate],
  );

  // Optimized isRangeStart function
  const isRangeStart = useCallback(
    (date: Date): boolean => {
      if (mode !== 'range' || !selectedDates || !('from' in selectedDates)) {
        return false;
      }

      const range = selectedDates as DateRange;
      if (!range.from) return false;

      // If we have a hovered date and no end date, show preview range
      if (hoveredDate && !range.to) {
        if (dateUtils.isBefore(hoveredDate, range.from)) {
          return dateUtils.isSameDay(date, hoveredDate);
        } else {
          return dateUtils.isSameDay(date, range.from);
        }
      }

      // If we have a complete range
      if (range.to) {
        return dateUtils.isSameDay(date, range.from);
      }

      return dateUtils.isSameDay(date, range.from);
    },
    [mode, selectedDates, hoveredDate],
  );

  // Optimized isRangeEnd function
  const isRangeEnd = useCallback(
    (date: Date): boolean => {
      if (mode !== 'range' || !selectedDates || !('from' in selectedDates)) {
        return false;
      }

      const range = selectedDates as DateRange;
      if (!range.from) return false;

      // If we have a hovered date and no end date, show preview range
      if (hoveredDate && !range.to) {
        if (dateUtils.isBefore(hoveredDate, range.from)) {
          return dateUtils.isSameDay(date, range.from);
        } else {
          return dateUtils.isSameDay(date, hoveredDate);
        }
      }

      // If we have a complete range
      if (range.to) {
        return dateUtils.isSameDay(date, range.to);
      }

      return false;
    },
    [mode, selectedDates, hoveredDate],
  );

  // Optimized isDisabled function with fast path for common cases
  const isDisabled = useCallback(
    (date: Date): boolean => {
      // Fast path: check disabled dates set first
      if (disabledDatesSet) {
        const dateKey = dateUtils.formatDate(date, 'yyyy-MM-dd');
        if (disabledDatesSet.has(dateKey)) return true;
      }

      // Check min/max date constraints
      if (
        dateConstraints.minDate &&
        dateUtils.isBefore(date, dateConstraints.minDate)
      )
        return true;
      if (
        dateConstraints.maxDate &&
        dateUtils.isAfter(date, dateConstraints.maxDate)
      )
        return true;

      // Check disabled function
      if (typeof disabled === 'function') {
        return disabled(date);
      }

      return false;
    },
    [disabledDatesSet, dateConstraints, disabled],
  );

  // Optimized isToday function - memoized
  const isToday = useCallback((date: Date): boolean => {
    return dateUtils.isToday(date);
  }, []);

  // Optimized isOutsideMonth function
  const isOutsideMonth = useCallback((date: Date, month: Date): boolean => {
    return !dateUtils.isSameMonth(date, month);
  }, []);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo<CalendarContextValue>(
    () => ({
      // State
      currentMonth,
      currentMonths,
      selectedDates,
      hoveredDate,
      focusedDate,

      // Actions
      setCurrentMonth,
      setSelectedDates,
      setHoveredDate,
      setFocusedDate,

      // Utilities
      isSelected,
      isInRange,
      isRangeStart,
      isRangeEnd,
      isDisabled,
      isToday,
      isOutsideMonth,

      // Configuration
      mode,
      numberOfMonths,
      showOutsideDays,
      locale,
      weekStartsOn,
    }),
    [
      currentMonth,
      currentMonths,
      selectedDates,
      hoveredDate,
      focusedDate,
      setCurrentMonth,
      setSelectedDates,
      setHoveredDate,
      setFocusedDate,
      isSelected,
      isInRange,
      isRangeStart,
      isRangeEnd,
      isDisabled,
      isToday,
      isOutsideMonth,
      mode,
      numberOfMonths,
      showOutsideDays,
      locale,
      weekStartsOn,
    ],
  );

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
}

/**
 * Hook to use calendar context
 */
export function useCalendarContext(): CalendarContextValue {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'useCalendarContext must be used within a CalendarProvider',
    );
  }
  return context;
}
