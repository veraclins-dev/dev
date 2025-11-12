'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { getDateTimeFromParts, type Time, toDate } from '@veraclins-dev/utils';

import { dateUtils } from './calendar-utils';
import type {
  CalendarMode,
  CalendarProviderProps,
  DateRange,
  DateValue,
  WeekStartsOn,
} from './types';

/**
 * Calendar context value
 */
export interface CalendarContextValue {
  // State
  currentMonth: Date;
  currentMonths: Date[]; // Array of months for multi-month display
  selectedDates: Date | Date[] | DateRange | undefined;
  hoveredDate: Date | undefined;
  focusedDate: Date | undefined;

  // Actions
  onDayClick: (date: Date, month: Date) => void;
  onDayMouseEnter: (date: Date) => void;
  onDayMouseLeave: () => void;
  onDayFocus: (date: Date) => void;
  onDayBlur: () => void;
  onDayKeyDown: (event: React.KeyboardEvent) => void;
  gotoPreviousMonth: () => void;
  gotoNextMonth: () => void;
  gotoToday: () => void;
  onMonthSelect: (month: number, monthIndex?: number) => void;
  onYearSelect: (year: number, monthIndex?: number) => void;
  onTimeChange: (time: Time) => void;

  // Utilities
  isSelected: (date: Date) => boolean;
  isInRange: (date: Date) => boolean;
  isRangeStart: (date: Date) => boolean;
  isRangeEnd: (date: Date) => boolean;
  isDisabled: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
  isOutsideMonth: (date: Date, month: Date) => boolean;

  // Configuration
  mode: CalendarMode;
  showOutsideDays: boolean;
  locale: string;
  weekStartsOn: WeekStartsOn;
  numberOfMonths: number;
}

const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined,
);

// ===== UTILITY FUNCTIONS (Pure functions outside component scope) =====

/**
 * Check if a date is today
 */
const isToday = (date: Date): boolean => {
  return dateUtils.isToday(date);
};

/**
 * Check if a date is outside the specified month
 */
const isOutsideMonth = (date: Date, month: Date): boolean => {
  return !dateUtils.isSameMonth(date, month);
};

/**
 * Check if a date is selected based on mode and selected dates
 */
const isSelected = (
  date: Date,
  selectedDates: Date | Date[] | DateRange | undefined,
  mode: CalendarMode,
): boolean => {
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
};

/**
 * Check if a date is in range (for range selection mode)
 */
const isInRange = (
  date: Date,
  selectedDates: Date | Date[] | DateRange | undefined,
  hoveredDate: Date | undefined,
  mode: CalendarMode,
): boolean => {
  if (mode !== 'range' || !selectedDates || !('from' in selectedDates)) {
    return false;
  }

  const range = selectedDates as DateRange;
  if (!range.from) return false;

  if (hoveredDate && !range.to) {
    if (dateUtils.isBefore(hoveredDate, range.from)) {
      return dateUtils.isBetween(date, hoveredDate, range.from);
    } else {
      return dateUtils.isBetween(date, range.from, hoveredDate);
    }
  }

  if (range.to) {
    return dateUtils.isBetween(date, range.from, range.to);
  }

  return false;
};

/**
 * Check if a date is the start of a range
 */
const isRangeStart = (
  date: Date,
  selectedDates: Date | Date[] | DateRange | undefined,
  hoveredDate: Date | undefined,
  mode: CalendarMode,
): boolean => {
  if (mode !== 'range' || !selectedDates || !('from' in selectedDates)) {
    return false;
  }

  const range = selectedDates as DateRange;
  if (!range.from) return false;

  if (hoveredDate && !range.to) {
    return dateUtils.isSameDay(date, range.from);
  }

  if (range.to) {
    return dateUtils.isSameDay(date, range.from);
  }

  return dateUtils.isSameDay(date, range.from);
};

/**
 * Check if a date is the end of a range
 */
const isRangeEnd = (
  date: Date,
  selectedDates: Date | Date[] | DateRange | undefined,
  hoveredDate: Date | undefined,
  mode: CalendarMode,
): boolean => {
  if (mode !== 'range' || !selectedDates || !('from' in selectedDates)) {
    return false;
  }

  const range = selectedDates as DateRange;
  if (!range.from) return false;

  if (hoveredDate && !range.to) {
    return dateUtils.isSameDay(date, hoveredDate);
  }

  if (range.to) {
    return dateUtils.isSameDay(date, range.to);
  }

  return false;
};

/**
 * Check if a date is disabled based on constraints
 */
const isDisabled = (
  date: Date,
  disabledDatesSet: Set<string> | null,
  dateConstraints: { minDate: Date | null; maxDate: Date | null },
  disabled?: Date[] | ((date: Date) => boolean) | boolean,
): boolean => {
  if (disabledDatesSet) {
    const dateKey = dateUtils.formatDate(date, 'yyyy-MM-dd');
    if (disabledDatesSet.has(dateKey)) return true;
  }

  if (
    dateConstraints.minDate &&
    dateUtils.isBefore(date, dateConstraints.minDate)
  ) {
    return true;
  }
  if (
    dateConstraints.maxDate &&
    dateUtils.isAfter(date, dateConstraints.maxDate)
  ) {
    return true;
  }

  if (typeof disabled === 'function') {
    return disabled(date);
  }

  return !!disabled;
};

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
  numberOfMonths = 1,
}: CalendarProviderProps) {
  // ===== STATE VARIABLES =====
  const [currentMonth, setCurrentMonth] = useState(() => {
    return dateUtils.getDefaultMonth(value, defaultValue);
  });

  const [selectedDates, setSelectedDates] = useState(() => {
    return value || defaultValue;
  });

  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();

  const [focusedDate, setFocusedDate] = useState<Date | undefined>(() => {
    const today = new Date();
    const firstDayOfMonth = dateUtils.getFirstDayOfMonth(currentMonth);
    return dateUtils.isSameMonth(today, currentMonth) ? today : firstDayOfMonth;
  });

  // ===== USE MEMO VARIABLES =====
  // Generate array of months for multi-month display - memoized
  const currentMonths = useMemo(() => {
    const months: Date[] = [];
    for (let i = 0; i < numberOfMonths; i++) {
      months.push(dateUtils.addMonths(currentMonth, i));
    }
    return months;
  }, [currentMonth, numberOfMonths]);

  const disabledDatesSet = useMemo(() => {
    if (Array.isArray(disabled)) {
      return new Set(
        disabled.map((date) => dateUtils.formatDate(date, 'yyyy-MM-dd')),
      );
    }
    return null;
  }, [disabled]);

  const dateConstraints = useMemo(
    () => ({
      minDate: minDate ? minDate : null,
      maxDate: maxDate ? maxDate : null,
    }),
    [minDate, maxDate],
  );

  // ===== HANDLERS =====
  // Helper function to navigate to a date
  const navigateToDate = useCallback(
    (date: Date, month = currentMonth) => {
      // Check if date is outside current month
      const isOutside = !isOutsideMonth(date, month);

      if (isOutside) {
        // For multiple months view, check if the date is in any of the visible months
        if (numberOfMonths > 1) {
          const visibleMonths = currentMonths;
          const isDateInAnyVisibleMonth = visibleMonths.some((visibleMonth) =>
            dateUtils.isSameMonth(date, visibleMonth),
          );

          // Only navigate if the date is not in any visible month
          if (!isDateInAnyVisibleMonth) {
            // Determine navigation direction based on date position
            const firstVisibleMonth = visibleMonths[0];

            let targetMonth: Date;
            if (dateUtils.isBefore(date, firstVisibleMonth)) {
              // Date is before visible range - navigate to show the date at the start
              targetMonth = dateUtils.getFirstDayOfMonth(date);
            } else {
              // Date is after visible range - navigate to show the date at the end
              // Calculate the offset to maintain the same number of months
              const offset = numberOfMonths - 1;
              targetMonth = dateUtils.subtractMonths(
                dateUtils.getFirstDayOfMonth(date),
                offset,
              );
            }

            setCurrentMonth(targetMonth);
          }
        } else {
          // Single month view - simple navigation
          const targetMonth = dateUtils.getFirstDayOfMonth(date);
          setCurrentMonth(targetMonth);
        }
      }
    },
    [currentMonth, numberOfMonths, currentMonths, setCurrentMonth],
  );

  // Centralized day click handler with automatic navigation
  const onDayClick = useCallback(
    (date: Date, month: Date) => {
      // Skip if date is disabled
      if (isDisabled(date, disabledDatesSet, dateConstraints, disabled)) {
        return;
      }

      let newSelectedDates: DateValue;

      switch (mode) {
        case 'single':
          newSelectedDates = date;
          break;

        case 'multiple': {
          const currentMultiple = (selectedDates as Date[]) || [];
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
          const currentRange = (selectedDates as DateRange) || {};
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

      setSelectedDates(newSelectedDates);

      // Handle navigation for outside month dates
      navigateToDate(date, month);
      onValueChange?.(newSelectedDates);
    },

    [
      disabledDatesSet,
      dateConstraints,
      disabled,
      mode,
      selectedDates,
      navigateToDate,
      onValueChange,
    ],
  );

  const onDayBlur = useCallback(() => {
    setFocusedDate(undefined);
  }, []);

  // Centralized keyboard navigation handler
  const onDayKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
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
        case ' ': {
          event.preventDefault();
          // Use the first visible month for selection
          const firstMonth = currentMonths[0];
          onDayClick(focusedDate, firstMonth);
          return;
        }
        case 'Escape':
          // Let the parent component handle escape
          return;
        default:
          return;
      }

      if (!isDisabled(newDate, disabledDatesSet, dateConstraints, disabled)) {
        setFocusedDate(newDate);
      }
    },
    [
      currentMonth,
      currentMonths,
      disabledDatesSet,
      dateConstraints,
      disabled,
      onDayClick,
      setFocusedDate,
      focusedDate,
    ],
  );

  // Month navigation handlers
  const gotoPreviousMonth = useCallback(() => {
    const newMonth = dateUtils.subtractMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
  }, [currentMonth, setCurrentMonth]);

  const gotoNextMonth = useCallback(() => {
    const newMonth = dateUtils.addMonths(currentMonth, 1);
    setCurrentMonth(dateUtils.getFirstDayOfMonth(newMonth));
  }, [currentMonth, setCurrentMonth]);

  const gotoToday = useCallback(() => {
    const today = new Date();
    if (!isDisabled(today, disabledDatesSet, dateConstraints, disabled)) {
      setCurrentMonth(today);
      setFocusedDate(today);
    }
  }, [
    disabledDatesSet,
    dateConstraints,
    disabled,
    setCurrentMonth,
    setFocusedDate,
  ]);

  // Month and year selection handlers
  const onMonthSelect = useCallback(
    (month: number, monthIndex = 0) => {
      if (monthIndex === 0) {
        // First month selection - navigate directly to the selected month
        const year = currentMonths[0].getFullYear();
        const newMonth = dateUtils.createDateFromYearMonth(year, month);
        setCurrentMonth(newMonth);
      } else if (monthIndex > 0 && currentMonths[monthIndex]) {
        // Other month selection - calculate offset to maintain the same gap
        const currentMonth = currentMonths[monthIndex];
        const currentYear = currentMonth.getFullYear();
        const newTargetMonth = dateUtils.createDateFromYearMonth(
          currentYear,
          month,
        );
        const offset = monthIndex;
        const newFirstMonth = dateUtils.subtractMonths(newTargetMonth, offset);
        setCurrentMonth(newFirstMonth);
      }
    },
    [currentMonths, setCurrentMonth],
  );

  const onYearSelect = useCallback(
    (year: number, monthIndex = 0) => {
      if (monthIndex === 0) {
        // First month year selection - navigate to the selected year with current month
        const currentMonth = currentMonths[0].getMonth();
        const newMonth = dateUtils.createDateFromYearMonth(year, currentMonth);
        setCurrentMonth(newMonth);
      } else if (monthIndex > 0 && currentMonths[monthIndex]) {
        // Other month year selection - calculate offset to maintain the same gap
        const currentMonth = currentMonths[monthIndex];
        const currentMonthNumber = currentMonth.getMonth();
        const newTargetMonth = dateUtils.createDateFromYearMonth(
          year,
          currentMonthNumber,
        );
        const offset = monthIndex;
        const newFirstMonth = dateUtils.subtractMonths(newTargetMonth, offset);
        setCurrentMonth(newFirstMonth);
      }
    },
    [currentMonths, setCurrentMonth],
  );

  // Time change handler
  const onTimeChange = useCallback(
    (time: Time) => {
      if (!selectedDates) return;

      let newSelectedDates: DateValue;

      switch (mode) {
        case 'single': {
          const singleDate = selectedDates as Date;
          const dateTime = getDateTimeFromParts({
            time,
            baseDate: singleDate,
          });
          newSelectedDates = toDate(dateTime);
          break;
        }
        case 'multiple': {
          const multipleDates = selectedDates as Date[];
          newSelectedDates = multipleDates.map((date) => {
            const dateTime = getDateTimeFromParts({ time, baseDate: date });
            return toDate(dateTime);
          });
          break;
        }
        case 'range': {
          const range = selectedDates as DateRange;

          if (!range.from) {
            return; // Cannot set time without a from date
          }

          const fromDateTime = getDateTimeFromParts({
            time,
            baseDate: range.from,
          });

          const newRange: DateRange = {
            from: toDate(fromDateTime),
          };

          if (range.to) {
            const toDateTime = getDateTimeFromParts({
              time,
              baseDate: range.to,
            });
            newRange.to = toDate(toDateTime);
          }

          newSelectedDates = newRange;
          break;
        }
        default:
          return;
      }

      setSelectedDates(newSelectedDates);
      onValueChange?.(newSelectedDates);
    },
    [selectedDates, mode, onValueChange],
  );

  // ===== USE EFFECTS =====

  // Navigate to selected date when value changes externally
  // useEffect(() => {
  if (value !== undefined && value !== selectedDates) {
    setSelectedDates(value);
    // Extract the date to navigate to based on the value type
    let dateToNavigate: Date | undefined;

    if (value instanceof Date) {
      dateToNavigate = value;
    } else if (Array.isArray(value) && value.length > 0) {
      // For multiple or range mode, navigate to the first date
      dateToNavigate = value[0];
    } else if (value && typeof value === 'object' && 'from' in value) {
      // For range mode, navigate to the from date
      dateToNavigate = (value as DateRange).from;
    }

    if (dateToNavigate) {
      navigateToDate(dateToNavigate);
    }
  }
  // }, [value]);

  // ===== CONTEXT VALUE =====
  const contextValue = useMemo<CalendarContextValue>(
    () =>
      ({
        // State
        currentMonth,
        currentMonths,
        selectedDates,
        hoveredDate,
        focusedDate,
        // Actions
        onDayClick,
        onDayMouseEnter: setHoveredDate,
        onDayMouseLeave: () => setHoveredDate(undefined),
        onDayFocus: setFocusedDate,
        onDayBlur,
        onDayKeyDown,
        gotoPreviousMonth,
        gotoNextMonth,
        gotoToday,
        onMonthSelect,
        onYearSelect,
        onTimeChange,

        // Utilities
        isSelected: (date: Date) => isSelected(date, selectedDates, mode),
        isInRange: (date: Date) =>
          isInRange(date, selectedDates, hoveredDate, mode),
        isRangeStart: (date: Date) =>
          isRangeStart(date, selectedDates, hoveredDate, mode),
        isRangeEnd: (date: Date) =>
          isRangeEnd(date, selectedDates, hoveredDate, mode),
        isDisabled: (date: Date) =>
          isDisabled(date, disabledDatesSet, dateConstraints, disabled),
        isToday,
        isOutsideMonth,

        // Configuration
        mode,
        numberOfMonths,
        showOutsideDays,
        locale,
        weekStartsOn,
      }) satisfies CalendarContextValue,
    [
      currentMonth,
      currentMonths,
      selectedDates,
      hoveredDate,
      focusedDate,
      setHoveredDate,
      setFocusedDate,
      onDayClick,
      onDayKeyDown,
      gotoPreviousMonth,
      gotoNextMonth,
      gotoToday,
      onMonthSelect,
      onYearSelect,
      onTimeChange,
      disabledDatesSet,
      dateConstraints,
      disabled,
      mode,
      numberOfMonths,
      showOutsideDays,
      locale,
      weekStartsOn,
      onDayBlur,
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
