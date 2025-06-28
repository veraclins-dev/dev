/**
 * Core date utilities for calendar component
 * Re-exports from @veraclins-dev/utils for convenience
 */

import {
  addDays,
  addMonths,
  addYears,
  formatDate,
  formatMonth,
  formatMonthShort,
  formatYear,
  getDaysInMonth,
  getDefaultMonth,
  getFirstDayOfMonth,
  getFirstDayOfWeek,
  getLastDayOfMonth,
  getLastDayOfWeek,
  getMonthGrid,
  getWeekDays,
  getWeekNumber,
  isAfter,
  isBefore,
  isBetween,
  isSameDay,
  isSameMonth,
  isSameYear,
  isToday,
  isValidDate,
  isWeekend,
  parseDate,
  parseToDateTime,
  subtractDays,
  subtractMonths,
  subtractYears,
  toDate,
} from '@veraclins-dev/utils';

/**
 * Date range type for range selection mode
 *
 * @property from - The start date of the range (required)
 * @property to - The end date of the range (optional)
 *
 * @example
 * ```typescript
 * const range: DateRange = {
 *   from: new Date('2023-12-25'),
 *   to: new Date('2023-12-31')
 * };
 *
 * const singleDate: DateRange = {
 *   from: new Date('2023-12-25')
 * };
 * ```
 */
export interface DateRange {
  from: Date;
  to?: Date;
}

/**
 * Comprehensive date utilities object for calendar operations
 *
 * This object provides easy access to all date utility functions
 * organized by category for calendar component usage.
 *
 * @example
 * ```typescript
 * // Date arithmetic
 * const tomorrow = dateUtils.addDays(new Date(), 1);
 * const nextMonth = dateUtils.addMonths(new Date(), 1);
 *
 * // Date comparisons
 * const isToday = dateUtils.isToday(someDate);
 * const isSameDay = dateUtils.isSameDay(date1, date2);
 *
 * // Calendar operations
 * const daysInMonth = dateUtils.getDaysInMonth(new Date());
 * const monthGrid = dateUtils.getMonthGrid(new Date(), 0, true);
 *
 * // Formatting
 * const formattedDate = dateUtils.formatDate(new Date(), 'yyyy-MM-dd');
 * const monthName = dateUtils.formatMonth(new Date());
 * ```
 */
export const dateUtils = {
  // Date arithmetic
  addDays,
  addMonths,
  addYears,
  subtractDays,
  subtractMonths,
  subtractYears,

  // Date comparisons
  isSameDay,
  isSameMonth,
  isSameYear,
  isBefore,
  isAfter,
  isBetween,

  // Calendar operations
  getDaysInMonth,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  getWeekNumber,
  getMonthGrid,
  getWeekDays,

  // Formatting
  formatDate,
  formatMonth,
  formatYear,
  formatMonthShort,
  // Validation and checks
  isValidDate,
  isWeekend,
  isToday,

  // Calendar display
  getDefaultMonth,

  // Parsing and conversion
  parseToDateTime,
  toDate,
  parseDate,
};
