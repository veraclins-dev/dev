import {
  addHours as addHoursFns,
  addMonths,
  addWeeks,
  addYears,
  endOfYear,
  format,
  formatDistanceToNow,
  isThisWeek as isThisWeekFns,
  isThisYear,
  isToday as isTodayFns,
  isValid,
  isYesterday,
  parseISO,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';

/**
 * Parses a date string, number, or Date object into a Date object
 */
const parseDateString = (date: Date | number | string): Date => {
  if (date instanceof Date) {
    return date;
  }
  if (typeof date === 'string') {
    return parseISO(date);
  }
  return new Date(date);
};

/**
 * Gets a formatted time string from a Date object
 */
const getTimeString = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Checks if a date is within the current week
 */
export const isThisWeek = (date: Date | string): boolean => {
  return isThisWeekFns(new Date(date));
};

/**
 * Adds hours to a date
 */
export const addHours = (date: Date | string, amount = 1): Date => {
  return addHoursFns(new Date(date), amount);
};

/**
 * Checks if a date is from last week
 */
export const isLastWeek = (date: Date | string): boolean => {
  return isThisWeekFns(addWeeks(new Date(date), 1));
};

/**
 * Checks if a date is today
 */
export const isToday = (date: Date | string): boolean => {
  return isTodayFns(new Date(date));
};

/**
 * Formats a date with the specified format
 */
export const formatAsDate = (
  date?: Date | number | string,
  dateFormat?: string,
): string => {
  if (!date) return '';
  const value = parseDateString(date);
  if (!isValid(value)) {
    if (typeof date === 'string') return date;
    return '';
  }
  return format(value, dateFormat || 'MMM dd, yyyy');
};

/**
 * Formats a date and time with smart formatting based on the date
 */
export const formatAsDateTime = (date: Date | number | string): string => {
  if (!date) return '';
  const value = parseDateString(date);
  if (isToday(value)) {
    return format(value, 'hh:mm a');
  }
  if (!isThisYear(value)) {
    return format(value, 'MMM dd, yyyy, hh:mm a');
  }
  return format(value, 'MMM dd, hh:mm a');
};

/**
 * Formats only the time portion of a date
 */
export const formatAsTime = (date: Date | number | string): string => {
  const value = parseDateString(date);
  return getTimeString(value);
};

/**
 * Formats a date in a relative format with a connector
 */
export const formatRelativeDate = (
  date: Date | number | string | null,
  connector = '\u2022',
): string => {
  if (!date) return '';
  const value = parseDateString(date);
  if (isToday(value)) {
    return `today ${connector} ${getTimeString(value)}`;
  }
  if (isYesterday(value)) {
    return `yesterday ${connector} ${getTimeString(value)}`;
  }
  if (!isThisYear(value)) {
    return `${format(value, 'MMM dd, yyyy')} ${connector} ${getTimeString(value)}`;
  }
  return `${format(value, 'MMM dd')} ${connector} ${getTimeString(value)}`;
};

/**
 * Gets a human-readable relative time string (e.g., "2 hours ago")
 */
export const fromNow = (date: Date | number | string): string => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
};

/**
 * Subtracts days from a date
 */
export const subtractDays = (
  date: Date | number | string,
  days: number,
): Date => {
  return subDays(new Date(date), days);
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
 * @param period The period to get the date for
 * @returns The date for the specified period, or null if period is invalid
 */
export const getDateFromPeriod = (period: DatePeriod): Date | null => {
  const now = new Date();
  switch (period) {
    case 'Last 24 hours':
      return subDays(now, 1);
    case 'Last 7 days':
      return subDays(now, 7);
    case 'Last 14 days':
      return subDays(now, 14);
    case 'Last 30 days':
      return subDays(now, 30);
    case 'Last 90 days':
      return subDays(now, 90);
    case 'Last 6 months':
      return subMonths(now, 6);
    case 'Last year':
      return subYears(now, 1);
    case 'This month':
      return startOfMonth(now);
    case 'Last month':
      return startOfMonth(subMonths(now, 1));
    case 'This year':
      return startOfYear(now);
    case 'Previous year':
      return startOfYear(subYears(now, 1));
    default:
      return null;
  }
};

/**
 * Gets a DateTimeFormat object for a specific locale and timezone
 */
export const getDateTimeFormat = (
  locale = 'en-US',
  timeZone = 'UTC',
  options?: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return new Intl.DateTimeFormat(locale, {
    ...defaultOptions,
    ...options,
    timeZone,
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
 * @param period The period to get the future date for
 * @returns The future date for the specified period, or null if period is invalid
 */
export const getFutureDateFromPeriod = (
  period: FutureDatePeriod,
): Date | null => {
  const now = new Date();
  switch (period) {
    case 'Next 24 hours':
      return addHoursFns(now, 24);
    case 'Next 7 days':
      return addWeeks(now, 1);
    case 'Next 14 days':
      return addWeeks(now, 2);
    case 'Next 30 days':
      return addMonths(now, 1);
    case 'Next 90 days':
      return addMonths(now, 3);
    case 'Next 6 months':
      return addMonths(now, 6);
    case 'Next year':
      return addYears(now, 1);
    case 'Next month':
      return startOfMonth(addMonths(now, 1));
    case 'End of this year':
      return endOfYear(now);
    default:
      return null;
  }
};
