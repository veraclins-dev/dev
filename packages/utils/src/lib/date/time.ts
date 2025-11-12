import { DateTime } from 'luxon';

import { parseToDateTime, toDate } from './date';
import {
  getFilteredPatterns,
  type Hour,
  type Millisecond,
  type Minute,
  type Period,
  type Time,
  type TimeFormatPattern,
  timeUtil,
} from './definitions';

/**
 * Parse a time string into a DateTime object using Luxon's fromFormat
 *
 * @param timeString - The time string to parse (e.g., "12:30 AM", "00:23", "2:45:30 pm", "14:30:45")
 * @param format - Optional specific format pattern to use instead of auto-detection. Must be one of the supported patterns.
 * @returns A DateTime object with the parsed time, or null if parsing fails
 *
 * @example
 * ```typescript
 * parseTimeString('12:30 AM') // DateTime object with 12:30 AM
 * parseTimeString('00:23') // DateTime object with 12:23 AM
 * parseTimeString('2:45:30 pm') // DateTime object with 2:45:30 PM
 * parseTimeString('14:30:45') // DateTime object with 2:30:45 PM
 * parseTimeString('2:30 PM', 'h:mm A') // Use specific format
 * ```
 */
export const parseTimeString = (
  timeString: string,
  format?: TimeFormatPattern,
  use24Hour?: boolean,
  showSeconds?: boolean,
): DateTime | null => {
  if (!timeString || typeof timeString !== 'string') {
    return null;
  }

  // Normalize the time string
  let normalizedTime = timeString.trim().toLowerCase();
  normalizedTime = normalizedTime
    .replace(/\b(p|P)\b$/, ($1) => ($1 === 'p' ? 'pm' : 'PM'))
    .replace(/\b(a|A)\b$/, ($1) => ($1 === 'a' ? 'am' : 'AM'))
    .replace(/(\s|:)(p|P)$/, (_$1, $2, $3) => $2 + ($3 === 'p' ? 'pm' : 'PM'))
    .replace(/(\s|:)(a|A)$/, (_$1, $2, $3) => $2 + ($3 === 'a' ? 'am' : 'AM'));
  // If a specific format is provided, use it directly
  if (format) {
    try {
      const parsedTime = DateTime.fromFormat(normalizedTime, format);
      if (parsedTime.isValid) {
        return parsedTime;
      }
    } catch {
      // Return null if the specific format fails
      return null;
    }
    return null;
  }
  // Use smart filtering to reduce the number of patterns to try
  const filteredPatterns = getFilteredPatterns(
    normalizedTime,
    use24Hour,
    showSeconds,
  );

  // Try filtered format patterns for auto-detection
  for (const { pattern } of filteredPatterns) {
    try {
      const parsedTime = DateTime.fromFormat(normalizedTime, pattern);

      if (parsedTime.isValid) {
        return parsedTime;
      }
    } catch {
      // Continue to next pattern if this one fails
      continue;
    }
  }

  return null;
};

/**
 * Parse a time string into a Date object using Luxon's fromFormat
 *
 * @param timeString - The time string to parse (e.g., "12:30 AM", "00:23", "2:45:30 pm", "14:30:45")
 * @param baseDate - The base date to use for the time (default: today)
 * @param format - Optional specific format pattern to use instead of auto-detection. Must be one of the supported patterns.
 * @returns A Date object with the parsed time, or null if parsing fails
 *
 * @example
 * ```typescript
 * parseTimeStringToDate('12:30 AM') // Date object with today's date and 12:30 AM
 * parseTimeStringToDate('00:23') // Date object with today's date and 12:23 AM
 * parseTimeStringToDate('2:45:30 pm') // Date object with today's date and 2:45:30 PM
 * parseTimeStringToDate('14:30:45') // Date object with today's date and 2:30:45 PM
 * parseTimeStringToDate('12:30:45 AM', new Date('2023-12-25')) // Date object with 2023-12-25 and 12:30:45 AM
 * parseTimeStringToDate('2:30 PM', undefined, 'h:mm A') // Use specific format
 * ```
 */
export const parseTimeStringToDate = (
  timeString: string,
  baseDate: Date | number | string = new Date(),
  format?: TimeFormatPattern,
): Date | null => {
  if (!timeString || typeof timeString !== 'string') {
    return null;
  }

  // Normalize the time string
  const normalizedTime = timeString.trim().toLowerCase();

  // Get the base date as DateTime
  const baseDateTime = parseToDateTime(baseDate);

  const parsedTime = parseTimeString(normalizedTime, format);

  if (!parsedTime) {
    return null;
  }

  const result = baseDateTime.set({
    hour: parsedTime.hour,
    minute: parsedTime.minute,
    second: parsedTime.second || 0,
    millisecond: parsedTime.millisecond || 0,
  });

  return toDate(result);
};

/**
 * Get time parts from a DateTime object
 *
 * @param date - The DateTime object to extract time parts from
 * @param format - Optional specific format pattern (not used in current implementation)
 * @param use24Hour - Whether to use 24-hour format (default: false)
 * @param showSeconds - Whether to include seconds in the output (default: false)
 * @returns Time object with parts
 *
 * @example
 * ```typescript
 * getPartsFromDateTime({
 *   date: DateTime.fromObject({ hour: 14, minute: 30 }),
 *   use24Hour: false
 * })
 * // { hr: '02', min: '30', period: 'PM', string: '02:30 PM' }
 * ```
 */
export const getPartsFromDateTime = ({
  date,
  use24Hour,
  showSeconds,
}: {
  date: DateTime;
  use24Hour?: boolean;
  showSeconds?: boolean;
}): Time => {
  const { hour, minute, second, millisecond } = date;
  let period: Period = 'AM';

  if (!use24Hour) {
    period = hour >= 12 ? 'PM' : 'AM';
  } else {
    period = 'AM';
  }

  const hour12 = hour % 12 || 12;

  const time: Time = {
    hr: (use24Hour ? hour : hour12).toString().padStart(2, '0') as Hour,
    min: minute.toString().padStart(2, '0') as Minute,
    sec: second?.toString().padStart(2, '0') as Minute,
    period,
    mil: millisecond?.toString().padStart(3, '0') as Millisecond,
    string: '',
  };
  time.string = getTimeStringFromParts(time, use24Hour, showSeconds);
  return time;
};

/**
 * Get time parts from a JavaScript Date or ISO string
 *
 * @param date - The Date object or ISO string to extract time parts from
 * @param use24Hour - Whether to use 24-hour format (default: false)
 * @param showSeconds - Whether to include seconds in the output (default: false)
 * @returns Time object with parts
 *
 * @example
 * ```typescript
 * getPartsFromDate({
 *   date: new Date('2023-12-25T14:30:45'),
 *   use24Hour: false
 * })
 * // { hr: '02', min: '30', period: 'PM', string: '02:30 PM' }
 *
 * getPartsFromDate({
 *   date: '2023-12-25T14:30:45.123Z',
 *   use24Hour: true,
 *   showSeconds: true
 * })
 * // { hr: '14', min: '30', sec: '45', string: '14:30:45' }
 * ```
 */
export const getPartsFromDate = ({
  date,
  use24Hour = false,
  showSeconds = false,
}: {
  date: Date | string;
  use24Hour?: boolean;
  showSeconds?: boolean;
}): Time => {
  const dateTime = parseToDateTime(date);
  return getPartsFromDateTime({ date: dateTime, use24Hour, showSeconds });
};

/**
 * Get time parts from a time string or date ISO string
 *
 * @param timeString - The time string to parse (e.g., "2:30 PM", "14:30") or date ISO string (e.g., "2024-03-20T14:30:45.123Z")
 * @param format - Optional specific format pattern
 * @param use24Hour - Whether to use 24-hour format
 * @param showSeconds - Whether to include seconds in the output
 * @returns Time object with parts
 *
 * @example
 * ```typescript
 * getPartsFromTimeString({ timeString: '2:30 PM', use24Hour: false })
 * // { hr: '02', min: '30', period: 'PM', string: '02:30 PM' }
 *
 * getPartsFromTimeString({ timeString: '2024-03-20T14:30:45.123Z', use24Hour: true, showSeconds: true })
 * // { hr: '14', min: '30', sec: '45', string: '14:30:45' }
 * ```
 */
export const getPartsFromTimeString = ({
  timeString,
  format,
  use24Hour,
  showSeconds,
}: {
  timeString: string;
  format?: TimeFormatPattern;
  use24Hour?: boolean;
  showSeconds?: boolean;
}): Time => {
  // Check if the input looks like a date ISO string (contains 'T' and time components)
  const normalizedTime = timeString.trim().toLowerCase();
  if (
    normalizedTime.includes('t') &&
    /^\d{4}-\d{2}-\d{2}t\d{2}:\d{2}/i.test(normalizedTime)
  ) {
    // Use getPartsFromDate for ISO strings
    return getPartsFromDate({
      date: timeString,
      use24Hour,
      showSeconds,
    });
  }

  // Use parseTimeString for regular time strings
  const date = parseTimeString(timeString, format, use24Hour, showSeconds);
  if (!date) {
    const time: Time = {
      hr: use24Hour ? '00' : '01',
      min: '00',
      sec: '00',
      mil: '000',
      period: 'AM',
      string: '',
    };

    return {
      hr: use24Hour ? '00' : '01',
      min: '00',
      sec: '00',
      mil: '000',
      period: 'AM',
      string: getTimeStringFromParts(time, use24Hour, showSeconds),
    };
  }

  return getPartsFromDateTime({ date, use24Hour, showSeconds });
};

/**
 * Convert hour and period to 24-hour format
 */
const getHour = (hour: number, period: Period) => {
  if (hour > 12) {
    return hour;
  }
  if (period === 'PM') {
    if (hour < 12) {
      return hour + 12;
    }
    return hour;
  }
  if (hour === 12) {
    return 0;
  }
  return hour;
};

/**
 * Create a DateTime from time parts
 *
 * @param time - Time object with parts
 * @param baseDate - Base date to use
 * @returns DateTime object
 *
 * @example
 * ```typescript
 * getDateTimeFromParts({
 *   time: { hr: '02', min: 30, period: 'PM' },
 *   baseDate: new Date('2023-12-25')
 * })
 * ```
 */
export const getDateTimeFromParts = ({
  time,
  baseDate = new Date(),
}: {
  time: Time;
  baseDate?: Date | number | string;
}) => {
  const date = parseToDateTime(baseDate);
  const {
    hr: supplied,
    min: minute,
    sec: second,
    mil: millisecond,
    period,
  } = time;
  const hour = getHour(parseInt(supplied, 10), period);
  const result = date.set({
    hour,
    minute: parseInt(minute, 10),
    second: second ? parseInt(second, 10) : undefined,
    millisecond: millisecond ? parseInt(millisecond, 10) : undefined,
  });

  return result;
};

/**
 * Format a DateTime object to a time string
 *
 * @param dt - DateTime object to format
 * @param use24Hour - Whether to use 24-hour format
 * @param showSeconds - Whether to show seconds
 * @returns Formatted time string
 *
 * @example
 * ```typescript
 * formatTimeString(
 *   DateTime.fromObject({ hour: 14, minute: 30 }),
 *   false,
 *   false
 * ) // "2:30 PM"
 * ```
 */
export function formatTimeString(
  dt: DateTime,
  use24Hour?: boolean,
  showSeconds?: boolean,
): string {
  if (use24Hour && showSeconds) {
    return dt.toFormat(timeUtil['24h-with-seconds']);
  }
  if (use24Hour) {
    return dt.toFormat(timeUtil['24h']);
  }
  if (showSeconds) {
    return dt.toFormat(timeUtil['12h-with-seconds']);
  }

  return dt.toFormat(timeUtil['12h']);
}

/**
 * Format time string from parts
 *
 * @param time - Time object with parts
 * @param use24Hour - Whether to use 24-hour format
 * @param showSeconds - Whether to show seconds
 * @returns Formatted time string
 *
 * @example
 * ```typescript
 * formatTimeStringFromParts(
 *   { hr: '02', min: 30, period: 'PM' },
 *   false,
 *   false
 * ) // "2:30 PM"
 * ```
 */
export function formatTimeStringFromParts(
  time: Time,
  use24Hour: boolean,
  showSeconds: boolean,
): string {
  const dt = getDateTimeFromParts({ time });

  return formatTimeString(dt, use24Hour, showSeconds);
}

export function getTimeStringFromParts(
  time: Time,
  use24Hour?: boolean,
  showSeconds?: boolean,
): string {
  if (use24Hour && showSeconds) {
    return `${time.hr}:${time.min}:${time.sec ?? '00'}`;
  }
  if (use24Hour) {
    return `${time.hr}:${time.min}`;
  }
  if (showSeconds) {
    return `${time.hr}:${time.min}:${time.sec ?? '00'} ${time.period}`;
  }
  return `${time.hr}:${time.min} ${time.period}`;
}

/**
 * Get the current time as a Time object
 *
 * @param use24Hour - Whether to use 24-hour format
 * @param showSeconds - Whether to include seconds
 * @returns Time object with current time parts
 *
 * @example
 * ```typescript
 * getCurrentTime(false, false) // { hr: '02', min: '30', period: 'PM', ... }
 * getCurrentTime(true, true) // { hr: '14', min: '30', sec: '45', ... }
 * ```
 */
export const getCurrentTime = ({
  use24Hour = true,
  showSeconds = false,
  useLocalTime = true,
}: {
  use24Hour?: boolean;
  showSeconds?: boolean;
  useLocalTime?: boolean;
} = {}): Time => {
  const now = useLocalTime ? DateTime.now() : DateTime.utc();
  const currentTimeString = use24Hour
    ? now.toFormat(showSeconds ? 'HH:mm:ss' : 'HH:mm')
    : now.toFormat(showSeconds ? 'hh:mm:ss a' : 'hh:mm a');

  return getPartsFromTimeString({
    timeString: currentTimeString,
    use24Hour,
    showSeconds,
  });
};
