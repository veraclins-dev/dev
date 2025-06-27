/**
 * Core date utilities for calendar component
 */

/**
 * Date range type for range selection mode
 */
export interface DateRange {
  from: Date;
  to?: Date;
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add months to a date
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Add years to a date
 */
export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Subtract days from a date
 */
export function subtractDays(date: Date, days: number): Date {
  return addDays(date, -days);
}

/**
 * Subtract months from a date
 */
export function subtractMonths(date: Date, months: number): Date {
  return addMonths(date, -months);
}

/**
 * Subtract years from a date
 */
export function subtractYears(date: Date, years: number): Date {
  return addYears(date, -years);
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if two dates are in the same month
 */
export function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

/**
 * Check if two dates are in the same year
 */
export function isSameYear(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear();
}

/**
 * Check if date1 is before date2
 */
export function isBefore(date1: Date, date2: Date): boolean {
  return date1.getTime() < date2.getTime();
}

/**
 * Check if date1 is after date2
 */
export function isAfter(date1: Date, date2: Date): boolean {
  return date1.getTime() > date2.getTime();
}

/**
 * Check if a date is between two other dates (inclusive)
 */
export function isBetween(date: Date, start: Date, end: Date): boolean {
  return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
}

/**
 * Get the number of days in a month
 */
export function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Get the first day of a month
 */
export function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Get the last day of a month
 */
export function getLastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Get the first day of a week
 */
export function getFirstDayOfWeek(date: Date, weekStartsOn: number): Date {
  const day = date.getDay();
  const diff = (day - weekStartsOn + 7) % 7;
  return addDays(date, -diff);
}

/**
 * Get the last day of a week
 */
export function getLastDayOfWeek(date: Date, weekStartsOn: number): Date {
  const firstDay = getFirstDayOfWeek(date, weekStartsOn);
  return addDays(firstDay, 6);
}

/**
 * Get the week number of a date
 */
export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

/**
 * Generate a month grid for calendar display
 */
export function getMonthGrid(
  date: Date,
  weekStartsOn: number,
  showOutsideDays: boolean,
): Date[][] {
  const firstDayOfMonth = getFirstDayOfMonth(date);
  const lastDayOfMonth = getLastDayOfMonth(date);
  const daysInMonth = getDaysInMonth(date);

  // Get the first day to display (might be from previous month)
  const firstDayToShow = showOutsideDays
    ? getFirstDayOfWeek(firstDayOfMonth, weekStartsOn)
    : firstDayOfMonth;

  // Get the last day to display (might be from next month)
  const lastDayToShow = showOutsideDays
    ? getLastDayOfWeek(lastDayOfMonth, weekStartsOn)
    : lastDayOfMonth;

  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  let currentDate = new Date(firstDayToShow);

  while (currentDate <= lastDayToShow) {
    currentWeek.push(new Date(currentDate));

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentDate = addDays(currentDate, 1);
  }

  // Add any remaining days to complete the last week
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

/**
 * Get week day names for a locale
 */
export function getWeekDays(locale: string, weekStartsOn: number): string[] {
  // Start with Sunday (0) and add weekStartsOn to get the correct starting day
  const baseDate = new Date(Date.UTC(2017, 0, 1 + weekStartsOn)); // Sunday 2017-01-01 + weekStartsOn
  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'short' }));
    baseDate.setDate(baseDate.getDate() + 1);
  }

  return weekDays;
}

/**
 * Format a date according to a format string
 */
export function formatDate(
  date: Date,
  format: string,
  locale = 'en-US',
): string {
  const formatters: Record<string, Intl.DateTimeFormatOptions> = {
    yyyy: { year: 'numeric' },
    MM: { month: '2-digit' },
    M: { month: 'numeric' },
    MMM: { month: 'short' },
    MMMM: { month: 'long' },
    dd: { day: '2-digit' },
    d: { day: 'numeric' },
    EEEE: { weekday: 'long' },
    EEE: { weekday: 'short' },
  };

  let result = format;
  for (const [key, options] of Object.entries(formatters)) {
    const value = date.toLocaleDateString(locale, options);
    result = result.replace(key, value);
  }

  return result;
}

/**
 * Format a month name
 */
export function formatMonth(date: Date, locale = 'en-US'): string {
  return date.toLocaleDateString(locale, { month: 'long' });
}

/**
 * Format a year
 */
export function formatYear(date: Date, locale = 'en-US'): string {
  return date.toLocaleDateString(locale, { year: 'numeric' });
}

/**
 * Validate if a value is a valid Date
 */
export function isValidDate(date: any): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Check if a date is a weekend
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Get the initial month for calendar display
 */
export function getInitialMonth(
  value?: Date | Date[] | DateRange,
  defaultValue?: Date | Date[] | DateRange,
): Date {
  if (value) {
    if (value instanceof Date) {
      return value;
    }
    if (Array.isArray(value) && value.length > 0) {
      return value[0];
    }
    if ('from' in value && value.from) {
      return value.from;
    }
  }

  if (defaultValue) {
    if (defaultValue instanceof Date) {
      return defaultValue;
    }
    if (Array.isArray(defaultValue) && defaultValue.length > 0) {
      return defaultValue[0];
    }
    if ('from' in defaultValue && defaultValue.from) {
      return defaultValue.from;
    }
  }

  return new Date();
}

/**
 * Export all utilities as a single object for convenience
 */
export const dateUtils = {
  addDays,
  addMonths,
  addYears,
  subtractDays,
  subtractMonths,
  subtractYears,
  isSameDay,
  isSameMonth,
  isSameYear,
  isBefore,
  isAfter,
  isBetween,
  getDaysInMonth,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  getWeekNumber,
  getMonthGrid,
  getWeekDays,
  formatDate,
  formatMonth,
  formatYear,
  isValidDate,
  isWeekend,
  isToday,
  getInitialMonth,
};
