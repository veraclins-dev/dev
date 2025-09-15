import { DateTime } from 'luxon';

import {
  CATEGORIZED_DATE_PATTERNS,
  type CategorizedDatePattern,
  type DateFormatPattern,
} from './definitions';

/**
 * Parses a date string, number, or Date object into a Luxon DateTime object
 *
 * @param date - The date to parse. Can be a Date object, timestamp number, or ISO string
 * @returns A Luxon DateTime object
 *
 * @example
 * ```typescript
 * parseToDateTime(new Date()) // DateTime object
 * parseToDateTime('2023-12-25') // DateTime object
 * parseToDateTime(1703520000000) // DateTime object
 * ```
 */
export const parseToDateTime = (date: Date | number | string): DateTime => {
  if (date instanceof Date) {
    return DateTime.fromJSDate(date);
  }
  if (typeof date === 'string') {
    return DateTime.fromISO(date);
  }
  return DateTime.fromMillis(date);
};

/**
 * Parses a date string, number, or Date object into a JavaScript Date object
 *
 * @param date - The date to parse. Can be a Date object, timestamp number, or ISO string
 * @returns A JavaScript Date object
 *
 * @example
 * ```typescript
 * parseDate(new Date()) // Date object
 * parseDate('2023-12-25') // Date object
 * parseDate(1703520000000) // Date object
 * ```
 */
export const parseDate = (date: Date | number | string): Date => {
  return toDate(parseToDateTime(date));
};

/**
 * Converts a Luxon DateTime object back to a JavaScript Date object
 *
 * @param dt - The Luxon DateTime object to convert
 * @returns A JavaScript Date object
 *
 * @example
 * ```typescript
 * const dt = DateTime.now();
 * const date = toDate(dt); // Date object
 * ```
 */
export const toDate = (dt: DateTime): Date => {
  return dt.toJSDate();
};

/**
 * Checks if a date is within the current week
 *
 * @param date - The date to check. Can be a Date object or ISO string
 * @returns True if the date is in the current week, false otherwise
 *
 * @example
 * ```typescript
 * isThisWeek(new Date()) // true
 * isThisWeek('2023-12-25') // depends on current date
 * ```
 */
export const isThisWeek = (date: Date | string): boolean => {
  const dt = parseToDateTime(date);
  const now = DateTime.now();
  return dt.hasSame(now, 'week');
};

/**
 * Adds hours to a date
 *
 * @param date - The base date. Can be a Date object or ISO string
 * @param amount - The number of hours to add (default: 1)
 * @returns A new Date object with the hours added
 *
 * @example
 * ```typescript
 * addHours(new Date(), 2) // Date 2 hours later
 * addHours('2023-12-25T10:00:00Z', 3) // Date 3 hours later
 * ```
 */
export const addHours = (date: Date | string, amount = 1): Date => {
  const dt = parseToDateTime(date);
  return toDate(dt.plus({ hours: amount }));
};

/**
 * Checks if a date is from last week
 *
 * @param date - The date to check. Can be a Date object or ISO string
 * @returns True if the date is from last week, false otherwise
 *
 * @example
 * ```typescript
 * isLastWeek(new Date()) // false (current week)
 * isLastWeek('2023-12-18') // depends on current date
 * ```
 */
export const isLastWeek = (date: Date | string): boolean => {
  const dt = parseToDateTime(date);
  const lastWeek = DateTime.now().minus({ weeks: 1 });
  return dt.hasSame(lastWeek, 'week');
};

/**
 * Checks if a date is today
 *
 * @param date - The date to check. Can be a Date object, number, or string
 * @returns True if the date is today, false otherwise
 *
 * @example
 * ```typescript
 * isToday(new Date()) // true
 * isToday('2023-12-25') // depends on current date
 * isToday(1703520000000) // depends on current date
 * ```
 */
export const isToday = (date: Date | number | string): boolean => {
  const dt = parseToDateTime(date);
  return dt.hasSame(DateTime.now(), 'day');
};

/**
 * Formats a date in a relative format with a connector
 *
 * @param date - The date to format. Can be a Date object, number, string, or null
 * @param connector - The connector string to use (default: '•')
 * @returns A formatted relative date string
 *
 * @example
 * ```typescript
 * formatRelativeDate(new Date()) // "today • 2:30 PM"
 * formatRelativeDate('2023-12-24') // "yesterday • 10:00 AM"
 * formatRelativeDate('2023-12-20') // "Dec 20 • 10:00 AM"
 * ```
 */
export const formatRelativeDate = (
  date: Date | number | string | null,
  connector = '\u2022',
): string => {
  if (!date) return '';
  const dt = parseToDateTime(date);
  const now = DateTime.now();

  if (dt.hasSame(now, 'day')) {
    return `today ${connector} ${dt.toFormat('hh:mm a')}`;
  }
  if (dt.hasSame(now.minus({ days: 1 }), 'day')) {
    return `yesterday ${connector} ${dt.toFormat('hh:mm a')}`;
  }
  if (!dt.hasSame(now, 'year')) {
    return `${dt.toFormat('MMM dd, yyyy')} ${connector} ${dt.toFormat('hh:mm a')}`;
  }
  return `${dt.toFormat('MMM dd')} ${connector} ${dt.toFormat('hh:mm a')}`;
};

/**
 * Subtracts days from a date
 *
 * @param date - The base date. Can be a Date object, number, or string
 * @param days - The number of days to subtract
 * @returns A new Date object with the days subtracted
 *
 * @example
 * ```typescript
 * subtractDays(new Date(), 7) // Date 7 days ago
 * subtractDays('2023-12-25', 1) // Date 1 day before
 * ```
 */
export const subtractDays = (
  date: Date | number | string,
  days: number,
): Date => {
  const dt = parseToDateTime(date);
  return toDate(dt.minus({ days }));
};

type TimeUnit = 'year' | 'quarter' | 'month' | 'week';
type TimeUnits = `${TimeUnit}s`;

type HourNumbers = 12 | 24 | 72;
type DayNumbers = 2 | 3 | 7 | 14 | 28 | 30 | 90;
type WeekNumbers = 2 | 4 | 6 | 8 | 10;
type MonthNumbers = 3 | 6 | 12;
type YearNumbers = 2 | 3 | 5;

type Predefined = 'Today' | `This ${TimeUnit}`;

export type StartOfPeriod =
  | `Last ${HourNumbers} hours`
  | `Last ${DayNumbers} days`
  | `Last ${WeekNumbers} weeks`
  | `Last ${MonthNumbers} months`
  | `Last ${YearNumbers} quarters`
  | `Last ${YearNumbers} years`
  | Predefined;

export type EndOfPeriod =
  | `Next ${HourNumbers} hours`
  | `Next ${DayNumbers} days`
  | `Next ${WeekNumbers} weeks`
  | `Next ${MonthNumbers} months`
  | `Next ${YearNumbers} quarters`
  | `Next ${YearNumbers} years`
  | Predefined;

/**
 * Gets the start date of a predefined period
 *
 * @param period - The period to get the start date for. Supports:
 *   - "Today" - Start of current day
 *   - "This {unit}" - Start of current period (year, quarter, month, week)
 *   - "Last {amount} {unit}s" - Start of period {amount} units ago
 * @returns The start date for the specified period
 *
 * @example
 * ```typescript
 * startOfPeriod('Today') // Start of current day
 * startOfPeriod('This month') // First day of current month
 * startOfPeriod('This year') // First day of current year
 * startOfPeriod('Last 7 days') // Date 7 days ago
 * startOfPeriod('Last 3 months') // Date 3 months ago
 * startOfPeriod('Last 2 quarters') // Date 2 quarters ago
 * ```
 */
export const startOfPeriod = (period: StartOfPeriod): Date => {
  const now = DateTime.now();

  if (period === 'Today') {
    return toDate(now.startOf('day'));
  }

  if (period.includes('Last')) {
    const [, amountStr, unit] = period.split(' ') as [
      string,
      string,
      `${TimeUnits}`,
    ];
    const amount = Number(amountStr);
    return toDate(now.minus({ [unit]: amount }));
  }
  if (period.includes('This')) {
    const [, unit] = period.split(' ') as [string, TimeUnit];
    return toDate(now.startOf(unit));
  }
  return toDate(now.minus({ days: 7 }));
};

/**
 * Gets the end date of a predefined period
 *
 * @param period - The period to get the end date for. Supports:
 *   - "Today" - End of current day
 *   - "This {unit}" - End of current period (year, quarter, month, week)
 *   - "Next {amount} {unit}s" - End of period {amount} units from now
 * @returns The end date for the specified period
 *
 * @example
 * ```typescript
 * endOfPeriod('Today') // End of current day
 * endOfPeriod('This month') // Last day of current month
 * endOfPeriod('This year') // Last day of current year
 * endOfPeriod('Next 7 days') // Date 7 days from now
 * endOfPeriod('Next 3 months') // Date 3 months from now
 * endOfPeriod('Next 2 quarters') // Date 2 quarters from now
 * ```
 */
export const endOfPeriod = (period: EndOfPeriod): Date => {
  const now = DateTime.now();

  if (period === 'Today') {
    return toDate(now.endOf('day'));
  }

  if (period.includes('Next')) {
    const [, amountStr, unit] = period.split(' ') as [
      string,
      string,
      `${TimeUnits}`,
    ];
    const amount = Number(amountStr);
    return toDate(now.plus({ [unit]: amount }));
  }

  if (period.includes('This')) {
    const [, unit] = period.split(' ') as [string, TimeUnit];
    return toDate(now.endOf(unit));
  }
  return toDate(now.plus({ days: 7 }));
};

type DatePeriod =
  | { start: StartOfPeriod; end?: EndOfPeriod }
  | { start?: StartOfPeriod; end: EndOfPeriod };

export const getDatePeriod = (period: DatePeriod) => {
  if (period.start && period.end) {
    return { start: startOfPeriod(period.start), end: endOfPeriod(period.end) };
  }
  if (period.start) {
    return { start: startOfPeriod(period.start), end: endOfPeriod('Today') };
  }
  return { end: endOfPeriod(period.end), start: startOfPeriod('Today') };
};

/**
 * Get the default month for calendar display
 *
 * @param value - The primary value to get the month from
 * @param defaultValue - The fallback value if primary is not available
 * @returns A Date object representing the month to display
 *
 * @example
 * ```typescript
 * getDefaultMonth(new Date('2023-12-25')) // Date object for December 2023
 * getDefaultMonth(null, new Date()) // Current date
 * getDefaultMonth({ from: new Date('2023-12-25') }) // Date object for December 2023
 * getDefaultMonth([new Date('2023-12-25'), new Date('2023-12-26')]) // Date object for December 2023
 * ```
 */
export const getDefaultMonth = (
  value?: Date | Date[] | { from: Date; to?: Date },
  defaultValue?: Date | Date[] | { from: Date; to?: Date },
): Date => {
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
};

/**
 * Formats a date and time with smart formatting based on the date
 *
 * @param date - The date to format. Can be a Date object, number, or string
 * @returns A formatted date-time string
 *
 * @example
 * ```typescript
 * formatDateTime(new Date()) // "2:30 PM" (if today)
 * formatDateTime('2023-12-25T10:00:00Z') // "Dec 25, 10:00 AM"
 * formatDateTime('2022-12-25T10:00:00Z') // "Dec 25, 2022, 10:00 AM"
 * ```
 */
export const formatDateTime = (date: Date | number | string): string => {
  if (!date) return '';
  const dt = parseToDateTime(date);
  const now = DateTime.now();

  if (dt.hasSame(now, 'day')) {
    return dt.toFormat('hh:mm a');
  }
  if (!dt.hasSame(now, 'year')) {
    return dt.toFormat('MMM dd, yyyy, hh:mm a');
  }
  return dt.toFormat('MMM dd, hh:mm a');
};

/**
 * Gets a human-readable relative time string (e.g., "2 hours ago")
 *
 * @param date - The date to format. Can be a Date object, number, or string
 * @returns A relative time string
 *
 * @example
 * ```typescript
 * formatRelativeTime(new Date()) // "a few seconds ago"
 * formatRelativeTime('2023-12-24T10:00:00Z') // "1 day ago"
 * formatRelativeTime('2023-12-20T10:00:00Z') // "5 days ago"
 * ```
 */
export const formatRelativeTime = (date: Date | number | string): string => {
  const dt = parseToDateTime(date);
  return dt.toRelative() || '';
};

/**
 * Get the number of days in a month
 *
 * @param date - The date to get the month for. Can be a Date object, number, or string
 * @returns The number of days in the month (28, 29, 30, or 31)
 *
 * @example
 * ```typescript
 * getDaysInMonth('2023-12-25') // 31
 * getDaysInMonth('2023-02-15') // 28 (or 29 in leap year)
 * getDaysInMonth('2023-04-01') // 30
 * ```
 */
export const getDaysInMonth = (date: Date | number | string): number => {
  const dt = parseToDateTime(date);
  return dt.daysInMonth || 0;
};

/**
 * Get the first day of a month
 *
 * @param date - The date to get the month for. Can be a Date object, number, or string
 * @returns The first day of the month as a Date object
 *
 * @example
 * ```typescript
 * getFirstDayOfMonth('2023-12-25') // Date object for 2023-12-01
 * getFirstDayOfMonth(new Date()) // First day of current month
 * ```
 */
export const getFirstDayOfMonth = (date: Date | number | string): Date => {
  const dt = parseToDateTime(date);
  return toDate(dt.startOf('month'));
};

/**
 * Get the last day of a month
 *
 * @param date - The date to get the month for. Can be a Date object, number, or string
 * @returns The last day of the month as a Date object
 *
 * @example
 * ```typescript
 * getLastDayOfMonth('2023-12-25') // Date object for 2023-12-31
 * getLastDayOfMonth('2023-02-15') // Date object for 2023-02-28 (or 29 in leap year)
 * ```
 */
export const getLastDayOfMonth = (date: Date | number | string): Date => {
  const dt = parseToDateTime(date);
  return toDate(dt.endOf('month'));
};

/**
 * Get the first day of a week
 *
 * @param date - The date to get the week for. Can be a Date object, number, or string
 * @param weekStartsOn - The day the week starts on (0 = Sunday, 1 = Monday, etc.)
 * @returns The first day of the week as a Date object
 *
 * @example
 * ```typescript
 * getFirstDayOfWeek('2023-12-25', 0) // Sunday of that week
 * getFirstDayOfWeek('2023-12-25', 1) // Monday of that week
 * ```
 */
export const getFirstDayOfWeek = (
  date: Date | number | string,
  weekStartsOn: number,
): Date => {
  const dt = parseToDateTime(date);
  const currentWeekday = dt.weekday; // 1-7 (Monday-Sunday)
  const daysToSubtract = (currentWeekday - weekStartsOn + 7) % 7;

  return toDate(dt.minus({ days: daysToSubtract }).startOf('day'));
};

/**
 * Get the last day of a week
 *
 * @param date - The date to get the week for. Can be a Date object, number, or string
 * @param weekStartsOn - The day the week starts on (0 = Sunday, 1 = Monday, etc.)
 * @returns The last day of the week as a Date object
 *
 * @example
 * ```typescript
 * getLastDayOfWeek('2023-12-25', 0) // Saturday of that week
 * getLastDayOfWeek('2023-12-25', 1) // Sunday of that week
 * ```
 */
export const getLastDayOfWeek = (
  date: Date | number | string,
  weekStartsOn: number,
): Date => {
  const firstDay = getFirstDayOfWeek(date, weekStartsOn);
  const dt = parseToDateTime(firstDay);
  return toDate(dt.plus({ days: 6 }).endOf('day'));
};

/**
 * Get the week number of a date
 *
 * @param date - The date to get the week number for. Can be a Date object, number, or string
 * @returns The week number of the year (1-53)
 *
 * @example
 * ```typescript
 * getWeekNumber('2023-01-01') // 1
 * getWeekNumber('2023-12-25') // 52 (approximately)
 * ```
 */
export const getWeekNumber = (date: Date | number | string): number => {
  const dt = parseToDateTime(date);
  return dt.weekNumber;
};

/**
 * Generate a month grid for calendar display
 *
 * @param date - The date to generate the grid for. Can be a Date object, number, or string
 * @param weekStartsOn - The day the week starts on (0 = Sunday, 1 = Monday, etc.)
 * @param showOutsideDays - Whether to include days from adjacent months
 * @returns A 2D array of Date objects representing the calendar grid (always 6 weeks)
 *
 * @example
 * ```typescript
 * const grid = getMonthGrid('2023-12-25', 0, true);
 * // Returns 6 weeks of dates, including November and January dates
 *
 * const grid = getMonthGrid('2023-12-25', 1, false);
 * // Returns 6 weeks of dates, starting from the first Monday
 * ```
 */
export const getMonthGrid = (
  date: Date | number | string,
  weekStartsOn: number,
  showOutsideDays: boolean,
): Date[][] => {
  const dt = parseToDateTime(date);
  const firstDayOfMonth = toDate(dt.startOf('month'));

  // Get the first day to display (might be from previous month)
  const firstDayToShow = showOutsideDays
    ? getFirstDayOfWeek(firstDayOfMonth, weekStartsOn)
    : firstDayOfMonth;

  const weeks: Date[][] = [];
  let currentDate = new Date(firstDayToShow);

  // Always generate exactly 6 weeks (42 days)
  for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
    const currentWeek: Date[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      currentWeek.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }

    weeks.push(currentWeek);
  }

  return weeks;
};

/**
 * Get week day names for a locale
 *
 * @param locale - The locale to use for day names (default: 'en-US')
 * @param weekStartsOn - The day the week starts on (0 = Sunday, 1 = Monday, etc.)
 * @returns An array of short weekday names
 *
 * @example
 * ```typescript
 * getWeekDays('en-US', 0) // ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
 * getWeekDays('en-US', 1) // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
 * getWeekDays('es-ES', 1) // ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']
 * ```
 */
export const getWeekDays = (locale: string, weekStartsOn: number): string[] => {
  const weekDays = [];
  const baseDate = DateTime.fromISO('2017-01-01').plus({
    days: weekStartsOn,
  });

  for (let i = 0; i < 7; i++) {
    weekDays.push(
      baseDate
        .plus({ days: i })
        .toLocaleString({ weekday: 'short' }, { locale }),
    );
  }

  return weekDays;
};

/**
 * Format a date according to a format string
 *
 * @param date - The date to format. Can be a Date object, number, or string
 * @param format - The format string using Luxon format tokens
 * @param locale - The locale to use (default: 'en-US')
 * @returns A formatted date string
 *
 * @example
 * ```typescript
 * formatDate('2023-12-25', 'yyyy-MM-dd') // "2023-12-25"
 * formatDate('2023-12-25', 'MMM dd, yyyy') // "Dec 25, 2023"
 * formatDate('2023-12-25', 'EEEE, MMMM dd') // "Monday, December 25"
 * ```
 */
export const formatDate = (
  date: Date | number | string,
  format = 'MMM dd, yyyy',
  locale = 'en-US',
): string => {
  const dt = parseToDateTime(date);
  return dt.toFormat(format, { locale });
};

/**
 * Format a month name
 *
 * @param date - The date to get the month for. Can be a Date object, number, or string
 * @param locale - The locale to use (default: 'en-US')
 * @returns The full month name
 *
 * @example
 * ```typescript
 * formatMonth('2023-12-25') // "December"
 * formatMonth('2023-12-25', 'es-ES') // "diciembre"
 * ```
 */
export const formatMonth = (
  date: Date | number | string,
  locale = 'en-US',
): string => {
  const dt = parseToDateTime(date);
  return dt.toLocaleString({ month: 'long' }, { locale });
};

/**
 * Format a month name in short form
 *
 * @param date - The date to get the month for. Can be a Date object, number, or string
 * @param locale - The locale to use (default: 'en-US')
 * @returns The short month name
 *
 * @example
 * ```typescript
 * formatMonthShort('2023-12-25') // "Dec"
 * formatMonthShort('2023-12-25', 'es-ES') // "dic"
 * ```
 */
export const formatMonthShort = (
  date: Date | number | string,
  locale = 'en-US',
): string => {
  const dt = parseToDateTime(date);
  return dt.toLocaleString({ month: 'short' }, { locale });
};

/**
 * Format a year
 *
 * @param date - The date to get the year for. Can be a Date object, number, or string
 * @param locale - The locale to use (default: 'en-US')
 * @returns The year as a string
 *
 * @example
 * ```typescript
 * formatYear('2023-12-25') // "2023"
 * formatYear(new Date()) // Current year
 * ```
 */
export const formatYear = (
  date: Date | number | string,
  locale = 'en-US',
): string => {
  const dt = parseToDateTime(date);
  return dt.toLocaleString({ year: 'numeric' }, { locale });
};

/**
 * Validate if a value is a valid Date
 *
 * @param date - The value to validate
 * @returns True if the value is a valid Date object, false otherwise
 *
 * @example
 * ```typescript
 * isValidDate(new Date()) // true
 * isValidDate('2023-12-25') // false (not a Date object)
 * isValidDate(new Date('invalid')) // false (invalid date)
 * ```
 */
export const isValidDate = (date: unknown): date is Date => {
  if (!(date instanceof Date)) return false;
  const dt = DateTime.fromJSDate(date);
  return dt.isValid;
};

/**
 * Check if a date is a weekend
 *
 * @param date - The date to check. Can be a Date object, number, or string
 * @returns True if the date is Saturday or Sunday, false otherwise
 *
 * @example
 * ```typescript
 * isWeekend('2023-12-23') // true (Saturday)
 * isWeekend('2023-12-24') // true (Sunday)
 * isWeekend('2023-12-25') // false (Monday)
 * ```
 */
export const isWeekend = (date: Date | number | string): boolean => {
  const dt = parseToDateTime(date);
  const weekday = dt.weekday; // 1-7 (Monday-Sunday)
  return weekday === 6 || weekday === 7; // Saturday or Sunday
};

/**
 * Gets the start of today
 *
 * @returns A Date object representing the start of today (midnight)
 *
 * @example
 * ```typescript
 * startOfToday() // Date object for today at 00:00:00
 * ```
 */
export const startOfToday = (): Date => {
  return toDate(DateTime.now().startOf('day'));
};

/**
 * Creates a date from year and month
 *
 * @param year - The year (e.g., 2023)
 * @param month - The month (0-11, where 0 is January)
 * @param day - The day of the month (default: 1)
 * @returns A Date object representing the first day of the specified month and year
 *
 * @example
 * ```typescript
 * createDateFromYearMonth(2023, 11) // December 1, 2023
 * createDateFromYearMonth(2024, 0, 15) // January 15, 2024
 * createDateFromYearMonth(2023, 1) // February 1, 2023
 * ```
 */
export const createDateFromYearMonth = (
  year: number,
  month: number,
  day = 1,
): Date => {
  return toDate(DateTime.fromObject({ year, month: month + 1, day }));
};

/**
 * Adds days to a date
 *
 * @param date - The base date. Can be a Date object, number, or string
 * @param days - The number of days to add
 * @returns A new Date object with the days added
 *
 * @example
 * ```typescript
 * addDays(new Date(), 7) // Date 7 days from now
 * addDays('2023-12-25', 1) // Date 1 day after
 * ```
 */
export const addDays = (date: Date | number | string, days: number): Date => {
  const dt = parseToDateTime(date);
  return toDate(dt.plus({ days }));
};

/**
 * Adds months to a date
 *
 * @param date - The base date. Can be a Date object, number, or string
 * @param months - The number of months to add
 * @returns A new Date object with the months added
 *
 * @example
 * ```typescript
 * addMonths(new Date(), 1) // Date 1 month from now
 * addMonths('2023-12-25', 3) // Date 3 months after
 * ```
 */
export const addMonths = (
  date: Date | number | string,
  months: number,
): Date => {
  const dt = parseToDateTime(date);
  return toDate(dt.plus({ months }));
};

/**
 * Adds years to a date
 *
 * @param date - The base date. Can be a Date object, number, or string
 * @param years - The number of years to add
 * @returns A new Date object with the years added
 *
 * @example
 * ```typescript
 * addYears(new Date(), 1) // Date 1 year from now
 * addYears('2023-12-25', 5) // Date 5 years after
 * ```
 */
export const addYears = (date: Date | number | string, years: number): Date => {
  const dt = parseToDateTime(date);
  return toDate(dt.plus({ years }));
};

/**
 * Subtracts months from a date
 *
 * @param date - The base date. Can be a Date object, number, or string
 * @param months - The number of months to subtract
 * @returns A new Date object with the months subtracted
 *
 * @example
 * ```typescript
 * subtractMonths(new Date(), 1) // Date 1 month ago
 * subtractMonths('2023-12-25', 3) // Date 3 months before
 * ```
 */
export const subtractMonths = (
  date: Date | number | string,
  months: number,
): Date => {
  const dt = parseToDateTime(date);
  return toDate(dt.minus({ months }));
};

/**
 * Subtracts years from a date
 *
 * @param date - The base date. Can be a Date object, number, or string
 * @param years - The number of years to subtract
 * @returns A new Date object with the years subtracted
 *
 * @example
 * ```typescript
 * subtractYears(new Date(), 1) // Date 1 year ago
 * subtractYears('2023-12-25', 5) // Date 5 years before
 * ```
 */
export const subtractYears = (
  date: Date | number | string,
  years: number,
): Date => {
  const dt = parseToDateTime(date);
  return toDate(dt.minus({ years }));
};

/**
 * Check if two dates are the same day
 *
 * @param date1 - The first date. Can be a Date object, number, or string
 * @param date2 - The second date. Can be a Date object, number, or string
 * @returns True if both dates are the same day, false otherwise
 *
 * @example
 * ```typescript
 * isSameDay(new Date(), new Date()) // true
 * isSameDay('2023-12-25', '2023-12-25T10:00:00Z') // true
 * isSameDay('2023-12-25', '2023-12-26') // false
 * ```
 */
export const isSameDay = (
  date1: Date | number | string,
  date2: Date | number | string,
): boolean => {
  const dt1 = parseToDateTime(date1);
  const dt2 = parseToDateTime(date2);
  return dt1.hasSame(dt2, 'day');
};

/**
 * Check if two dates are in the same month
 *
 * @param date1 - The first date. Can be a Date object, number, or string
 * @param date2 - The second date. Can be a Date object, number, or string
 * @returns True if both dates are in the same month, false otherwise
 *
 * @example
 * ```typescript
 * isSameMonth('2023-12-01', '2023-12-25') // true
 * isSameMonth('2023-12-25', '2024-01-01') // false
 * ```
 */
export const isSameMonth = (
  date1: Date | number | string,
  date2: Date | number | string,
): boolean => {
  const dt1 = parseToDateTime(date1);
  const dt2 = parseToDateTime(date2);
  return dt1.hasSame(dt2, 'month');
};

/**
 * Check if two dates are in the same year
 *
 * @param date1 - The first date. Can be a Date object, number, or string
 * @param date2 - The second date. Can be a Date object, number, or string
 * @returns True if both dates are in the same year, false otherwise
 *
 * @example
 * ```typescript
 * isSameYear('2023-01-01', '2023-12-25') // true
 * isSameYear('2023-12-25', '2024-01-01') // false
 * ```
 */
export const isSameYear = (
  date1: Date | number | string,
  date2: Date | number | string,
): boolean => {
  const dt1 = parseToDateTime(date1);
  const dt2 = parseToDateTime(date2);
  return dt1.hasSame(dt2, 'year');
};

/**
 * Check if date1 is before date2
 *
 * @param date1 - The first date. Can be a Date object, number, or string
 * @param date2 - The second date. Can be a Date object, number, or string
 * @returns True if date1 is before date2, false otherwise
 *
 * @example
 * ```typescript
 * isBefore('2023-12-25', '2023-12-26') // true
 * isBefore('2023-12-26', '2023-12-25') // false
 * ```
 */
export const isBefore = (
  date1: Date | number | string,
  date2: Date | number | string,
): boolean => {
  const dt1 = parseToDateTime(date1);
  const dt2 = parseToDateTime(date2);
  return dt1 < dt2;
};

/**
 * Check if date1 is after date2
 *
 * @param date1 - The first date. Can be a Date object, number, or string
 * @param date2 - The second date. Can be a Date object, number, or string
 * @returns True if date1 is after date2, false otherwise
 *
 * @example
 * ```typescript
 * isAfter('2023-12-26', '2023-12-25') // true
 * isAfter('2023-12-25', '2023-12-26') // false
 * ```
 */
export const isAfter = (
  date1: Date | number | string,
  date2: Date | number | string,
): boolean => {
  const dt1 = parseToDateTime(date1);
  const dt2 = parseToDateTime(date2);
  return dt1 > dt2;
};

/**
 * Check if a date is between two other dates (inclusive)
 *
 * @param date - The date to check. Can be a Date object, number, or string
 * @param start - The start date. Can be a Date object, number, or string
 * @param end - The end date. Can be a Date object, number, or string
 * @returns True if the date is between start and end (inclusive), false otherwise
 *
 * @example
 * ```typescript
 * isBetween('2023-12-25', '2023-12-20', '2023-12-30') // true
 * isBetween('2023-12-25', '2023-12-25', '2023-12-25') // true (inclusive)
 * isBetween('2023-12-19', '2023-12-20', '2023-12-30') // false
 * ```
 */
export const isBetween = (
  date: Date | number | string,
  start: Date | number | string,
  end: Date | number | string,
): boolean => {
  const dt = parseToDateTime(date);
  const startDt = parseToDateTime(start);
  const endDt = parseToDateTime(end);
  return dt >= startDt && dt <= endDt;
};

/**
 * Get time zone offset for a specific timezone
 *
 * @param timezone - The timezone (e.g., 'America/New_York')
 * @param date - The date to get offset for (default: current date)
 * @returns Offset in minutes
 *
 * @example
 * ```typescript
 * getTimezoneOffset('America/New_York') // -300 (EST) or -240 (EDT)
 * getTimezoneOffset('Europe/London') // 0 (GMT) or 60 (BST)
 * ```
 */
export const getTimezoneOffset = (
  timezone: string,
  date: Date | number | string = new Date(),
): number => {
  const dt = parseToDateTime(date);
  const zoned = dt.setZone(timezone);
  return zoned.offset;
};

/**
 * Analyze the structure of a date input string
 */
interface DateStructure {
  hasYear: boolean;
  hasMonth: boolean;
  hasDay: boolean;
  isISO: boolean;
  isNumeric: boolean;
  isText: boolean;
  separatorCount: number;
  separatorType: 'slash' | 'dash' | 'space' | 'comma' | 'none';
  length: number;
}

/**
 * Analyze the structure of a date input string
 */
const analyzeDateStructure = (normalized: string): DateStructure => {
  const length = normalized.length;

  // Check for separators
  const slashCount = (normalized.match(/\//g) || []).length;
  const dashCount = (normalized.match(/-/g) || []).length;
  const spaceCount = (normalized.match(/\s/g) || []).length;
  const commaCount = (normalized.match(/,/g) || []).length;

  const separatorCount = slashCount + dashCount + spaceCount + commaCount;

  let separatorType: 'slash' | 'dash' | 'space' | 'comma' | 'none' = 'none';
  if (slashCount > 0) separatorType = 'slash';
  else if (dashCount > 0) separatorType = 'dash';
  else if (spaceCount > 0) separatorType = 'space';
  else if (commaCount > 0) separatorType = 'comma';

  // Check for ISO format (YYYY-MM-DD or YYYY-M-D)
  const isISO =
    /^\d{4}-\d{1,2}-\d{1,2}$/.test(normalized) ||
    /^\d{4}-\d{1,2}$/.test(normalized) ||
    /^\d{4}$/.test(normalized);

  // Check for numeric format (DD/MM/YYYY, MM/DD/YYYY, etc.)
  const isNumeric =
    /^\d+[/-]\d+([/-]\d+)?$/.test(normalized) || /^\d{1,4}$/.test(normalized);

  // Check for text format (contains letters)
  const isText = /[A-Za-z]/.test(normalized);

  // Determine what parts are present
  const parts = normalized.split(/[/\-\s,]+/);
  const hasYear =
    parts.some((part) => part.length === 4 && /^\d{4}$/.test(part)) ||
    parts.some((part) => part.length === 2 && /^\d{2}$/.test(part));
  const hasMonth =
    parts.some((part) => {
      const num = parseInt(part, 10);
      return !isNaN(num) && num >= 1 && num <= 12;
    }) || /[A-Za-z]/.test(normalized);
  const hasDay = parts.some((part) => {
    const num = parseInt(part, 10);
    return !isNaN(num) && num >= 1 && num <= 31;
  });

  return {
    hasYear,
    hasMonth,
    hasDay,
    isISO,
    isNumeric,
    isText,
    separatorCount,
    separatorType,
    length,
  };
};

/**
 * Check if a pattern is compatible with the input structure
 */
const isDatePatternCompatible = (
  pattern: CategorizedDatePattern,
  structure: DateStructure,
): boolean => {
  // Check separator compatibility
  if (pattern.separatorType !== structure.separatorType) {
    return false;
  }

  // Check separator count compatibility
  if (pattern.separatorCount !== structure.separatorCount) {
    return false;
  }

  // Check length compatibility (allow some flexibility)
  if (
    pattern.length < structure.length - 3 ||
    pattern.length > structure.length + 3
  ) {
    return false;
  }

  // Check component compatibility
  if (pattern.hasYear !== structure.hasYear) {
    return false;
  }
  if (pattern.hasMonth !== structure.hasMonth) {
    return false;
  }
  if (pattern.hasDay !== structure.hasDay) {
    return false;
  }

  // Check format type compatibility
  if (pattern.isISO !== structure.isISO) {
    return false;
  }
  if (pattern.isNumeric !== structure.isNumeric) {
    return false;
  }
  if (pattern.isText !== structure.isText) {
    return false;
  }

  return true;
};

/**
 * Get filtered date patterns based on input structure analysis
 */
export const getFilteredDatePatterns = (
  input: string,
): CategorizedDatePattern[] => {
  const normalized = input.trim();

  // Early exit for obvious cases
  if (normalized.length === 0) return [];
  if (normalized.length > 20) return []; // No pattern is this long

  // Analyze the input structure
  const structure = analyzeDateStructure(normalized);

  // Filter patterns by structure compatibility
  return CATEGORIZED_DATE_PATTERNS.filter((pattern) =>
    isDatePatternCompatible(pattern, structure),
  );
};

/**
 * Parse a date string into a DateTime object using flexible format detection
 *
 * @param dateString - The date string to parse (e.g., "25/12/2023", "2023-12-25", "Dec 25, 2023")
 * @param format - Optional specific format pattern to use instead of auto-detection
 * @returns A DateTime object with the parsed date, or null if parsing fails
 *
 * @example
 * ```typescript
 * parseDateString('25/12/2023') // DateTime object with 25 Dec 2023
 * parseDateString('2023-12-25') // DateTime object with 25 Dec 2023
 * parseDateString('Dec 25, 2023') // DateTime object with 25 Dec 2023
 * parseDateString('25/12/2023', 'dd/MM/yyyy') // Use specific format
 * ```
 */
export const parseDateString = (
  dateString: string,
  format?: DateFormatPattern,
): DateTime | null => {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }

  const normalized = dateString.trim();

  // If a specific format is provided, use it directly
  if (format) {
    try {
      const parsedDate = DateTime.fromFormat(normalized, format);
      if (parsedDate.isValid) {
        return parsedDate;
      }
    } catch {
      // Return null if the specific format fails
      return null;
    }
    return null;
  }

  // Use smart filtering to reduce the number of patterns to try
  const filteredPatterns = getFilteredDatePatterns(normalized);

  // Try filtered format patterns for auto-detection
  for (const { pattern } of filteredPatterns) {
    try {
      const parsedDate = DateTime.fromFormat(normalized, pattern);

      if (parsedDate.isValid) {
        return parsedDate;
      }
    } catch {
      // Continue to next pattern if this one fails
      continue;
    }
  }

  // Fallback to native Date parsing
  try {
    const nativeDate = new Date(normalized);
    if (nativeDate instanceof Date && !isNaN(nativeDate.getTime())) {
      return DateTime.fromJSDate(nativeDate);
    }
  } catch {
    // Return null if all parsing attempts fail
  }

  return null;
};

/**
 * Parse a date string into a Date object using flexible format detection
 *
 * @param dateString - The date string to parse (e.g., "25/12/2023", "2023-12-25", "Dec 25, 2023")
 * @param format - Optional specific format pattern to use instead of auto-detection
 * @returns A Date object with the parsed date, or null if parsing fails
 *
 * @example
 * ```typescript
 * parseDateStringToDate('25/12/2023') // Date object with 25 Dec 2023
 * parseDateStringToDate('2023-12-25') // Date object with 25 Dec 2023
 * parseDateStringToDate('Dec 25, 2023') // Date object with 25 Dec 2023
 * parseDateStringToDate('25/12/2023', 'dd/MM/yyyy') // Use specific format
 * ```
 */
export const parseDateStringToDate = (
  dateString: string,
  format?: DateFormatPattern,
): Date | null => {
  const dt = parseDateString(dateString, format);
  return dt ? toDate(dt) : null;
};
