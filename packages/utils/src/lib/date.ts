import { DateTime } from 'luxon';

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
 * Gets a formatted time string from a Luxon DateTime object
 *
 * @param dt - The Luxon DateTime object
 * @returns A formatted time string (e.g., "2:30 PM")
 */
const getTimeString = (dt: DateTime): string => {
  return dt.toLocaleString(DateTime.TIME_SIMPLE);
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
    return `today ${connector} ${getTimeString(dt)}`;
  }
  if (dt.hasSame(now.minus({ days: 1 }), 'day')) {
    return `yesterday ${connector} ${getTimeString(dt)}`;
  }
  if (!dt.hasSame(now, 'year')) {
    return `${dt.toFormat('MMM dd, yyyy')} ${connector} ${getTimeString(dt)}`;
  }
  return `${dt.toFormat('MMM dd')} ${connector} ${getTimeString(dt)}`;
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

/**
 * Predefined date periods for filtering
 */
export type DatePeriod =
  | 'Last 24 hours'
  | 'Last 7 days'
  | 'Last 14 days'
  | 'Last 30 days'
  | 'Last 90 days'
  | 'Last 6 months'
  | 'Last year'
  | 'This month'
  | 'Last month'
  | 'This year'
  | 'Previous year';

/**
 * Gets a date based on a predefined period
 *
 * @param period - The period to get the date for
 * @returns The date for the specified period, or null if period is invalid
 *
 * @example
 * ```typescript
 * getPeriodStartDate('Last 7 days') // Date 7 days ago
 * getPeriodStartDate('This month') // First day of current month
 * getPeriodStartDate('Last year') // Date 1 year ago
 * ```
 */
export const getPeriodStartDate = (period: DatePeriod): Date | null => {
  const now = DateTime.now();
  switch (period) {
    case 'Last 24 hours':
      return toDate(now.minus({ days: 1 }));
    case 'Last 7 days':
      return toDate(now.minus({ days: 7 }));
    case 'Last 14 days':
      return toDate(now.minus({ days: 14 }));
    case 'Last 30 days':
      return toDate(now.minus({ days: 30 }));
    case 'Last 90 days':
      return toDate(now.minus({ days: 90 }));
    case 'Last 6 months':
      return toDate(now.minus({ months: 6 }));
    case 'Last year':
      return toDate(now.minus({ years: 1 }));
    case 'This month':
      return toDate(now.startOf('month'));
    case 'Last month':
      return toDate(now.minus({ months: 1 }).startOf('month'));
    case 'This year':
      return toDate(now.startOf('year'));
    case 'Previous year':
      return toDate(now.minus({ years: 1 }).startOf('year'));
    default:
      return null;
  }
};

/**
 * Creates a DateTimeFormat instance for custom formatting
 *
 * @param locale - The locale to use (default: 'en-US')
 * @param timeZone - The timezone to use (default: 'UTC')
 * @param options - Additional DateTimeFormat options
 * @returns A configured Intl.DateTimeFormat instance
 *
 * @example
 * ```typescript
 * const formatter = createDateTimeFormatter('en-US', 'America/New_York');
 * formatter.format(new Date()) // "12/25/2023"
 *
 * const customFormatter = createDateTimeFormatter('en-US', 'UTC', {
 *   year: 'numeric',
 *   month: 'long',
 *   day: 'numeric'
 * });
 * customFormatter.format(new Date()) // "December 25, 2023"
 * ```
 */
export const createDateTimeFormatter = (
  locale = 'en-US',
  timeZone = 'UTC',
  options?: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat => {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    ...options,
  });
};

/**
 * Predefined future date periods for filtering
 */
export type FutureDatePeriod =
  | 'Next 24 hours'
  | 'Next 7 days'
  | 'Next 14 days'
  | 'Next 30 days'
  | 'Next 90 days'
  | 'Next 6 months'
  | 'Next year'
  | 'Next month'
  | 'End of this year';

/**
 * Gets a future date based on a predefined period
 *
 * @param period - The period to get the date for
 * @returns The date for the specified period, or null if period is invalid
 *
 * @example
 * ```typescript
 * getPeriodEndDate('Next 7 days') // Date 7 days from now
 * getPeriodEndDate('Next month') // First day of next month
 * getPeriodEndDate('End of this year') // Last day of current year
 * ```
 */
export const getPeriodEndDate = (period: FutureDatePeriod): Date | null => {
  const now = DateTime.now();
  switch (period) {
    case 'Next 24 hours':
      return toDate(now.plus({ days: 1 }));
    case 'Next 7 days':
      return toDate(now.plus({ days: 7 }));
    case 'Next 14 days':
      return toDate(now.plus({ days: 14 }));
    case 'Next 30 days':
      return toDate(now.plus({ days: 30 }));
    case 'Next 90 days':
      return toDate(now.plus({ days: 90 }));
    case 'Next 6 months':
      return toDate(now.plus({ months: 6 }));
    case 'Next year':
      return toDate(now.plus({ years: 1 }));
    case 'Next month':
      return toDate(now.plus({ months: 1 }).startOf('month'));
    case 'End of this year':
      return toDate(now.endOf('year'));
    default:
      return null;
  }
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
 * Formats only the time portion of a date
 *
 * @param date - The date to format. Can be a Date object, number, or string
 * @returns A formatted time string
 *
 * @example
 * ```typescript
 * formatTime(new Date()) // "2:30 PM"
 * formatTime('2023-12-25T10:00:00Z') // "10:00 AM"
 * formatTime(1703520000000) // Time based on timestamp
 * ```
 */
export const formatTime = (date: Date | number | string): string => {
  const dt = parseToDateTime(date);
  return getTimeString(dt);
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
  return toDate(dt.minus({ days: daysToSubtract }));
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
  return toDate(dt.plus({ days: 6 }));
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
 * @returns A 2D array of Date objects representing the calendar grid
 *
 * @example
 * ```typescript
 * const grid = getMonthGrid('2023-12-25', 0, true);
 * // Returns 6 weeks of dates, including November and January dates
 *
 * const grid = getMonthGrid('2023-12-25', 1, false);
 * // Returns only December dates, starting from the first Monday
 * ```
 */
export const getMonthGrid = (
  date: Date | number | string,
  weekStartsOn: number,
  showOutsideDays: boolean,
): Date[][] => {
  const dt = parseToDateTime(date);
  const firstDayOfMonth = toDate(dt.startOf('month'));
  const lastDayOfMonth = toDate(dt.endOf('month'));

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
    days: weekStartsOn - 1,
  }); // Adjust for weekStartsOn

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
  format: string,
  locale = 'en-US',
): string => {
  const dt = parseToDateTime(date);
  return dt.toFormat(format);
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
 * addDays(1703520000000, 30) // Date 30 days after
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
