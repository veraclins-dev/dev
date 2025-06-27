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

  // Ref to track if we're updating from props
  const isUpdatingFromProps = useRef(false);
  const previousValue = useRef(value);

  // Update selected dates when value prop changes
  useEffect(() => {
    if (value !== undefined && value !== previousValue.current) {
      isUpdatingFromProps.current = true;
      setSelectedDates(value);
      previousValue.current = value;
      isUpdatingFromProps.current = false;
    }
  }, [value]);

  // Call onValueChange when selectedDates changes (but not when updating from props)
  // useEffect(() => {
  //   if (
  //     selectedDates !== undefined &&
  //     onValueChange &&
  //     !isUpdatingFromProps.current
  //   ) {
  //     onValueChange(selectedDates);
  //   }
  // }, [selectedDates, onValueChange]);

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
  }, [selectedDates]);

  // Check if a date is selected
  const isSelected = useCallback(
    (date: Date): boolean => {
      if (!selectedDates) return false;

      switch (mode) {
        case 'single':
          return dateUtils.isSameDay(date, selectedDates as Date);
        case 'multiple':
          return (selectedDates as Date[]).some((selectedDate) =>
            dateUtils.isSameDay(date, selectedDate),
          );
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

  // Check if a date is in range (for range selection)
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

  // Check if a date is the start of a range
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

  // Check if a date is the end of a range
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

  // Check if a date is disabled
  const isDisabled = useCallback(
    (date: Date): boolean => {
      // Check min/max date constraints
      if (minDate && dateUtils.isBefore(date, minDate)) return true;
      if (maxDate && dateUtils.isAfter(date, maxDate)) return true;

      // Check disabled dates array
      if (Array.isArray(disabled)) {
        return disabled.some((disabledDate) =>
          dateUtils.isSameDay(date, disabledDate),
        );
      }

      // Check disabled function
      if (typeof disabled === 'function') {
        return disabled(date);
      }

      return false;
    },
    [disabled, minDate, maxDate],
  );

  // Check if a date is today
  const isToday = useCallback((date: Date): boolean => {
    return dateUtils.isToday(date);
  }, []);

  // Check if a date is outside the current month
  const isOutsideMonth = useCallback(
    (date: Date): boolean => {
      return !dateUtils.isSameMonth(date, currentMonth);
    },
    [currentMonth],
  );

  const contextValue = useMemo<CalendarContextValue>(
    () => ({
      // State
      currentMonth,
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
      showOutsideDays,
      locale,
      weekStartsOn,
    }),
    [
      currentMonth,
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
