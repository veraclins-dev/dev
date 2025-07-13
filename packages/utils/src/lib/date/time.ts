import { DateTime } from 'luxon';

import { parseToDateTime, toDate } from './date';
import {
  CATEGORIZED_PATTERNS,
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
  use24Hour = false,
  showSeconds = false,
): DateTime | null => {
  if (!timeString || typeof timeString !== 'string') {
    return null;
  }

  // Normalize the time string
  const normalizedTime = timeString.trim().toLowerCase();

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
 * Get time parts from a time string
 *
 * @param timeString - The time string to parse
 * @param format - Optional specific format pattern
 * @param use24Hour - Whether to use 24-hour format
 * @returns Time object with parts
 *
 * @example
 * ```typescript
 * getPartsFromTimeString({ timeString: '2:30 PM', use24Hour: false })
 * // { hr: '02', min: 30, period: 'PM' }
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
  const date = parseTimeString(timeString, format, use24Hour, showSeconds);
  if (!date) {
    const time: Time = {
      hr: use24Hour ? '00' : '01',
      min: '00',
      sec: '00',
      mil: '000',
      period: 'AM',
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

  const { hour, minute, second, millisecond } = date;

  // For 12-hour format, we need to determine the period from the original string
  // or from the parsed DateTime's period information
  let period: Period = 'AM';

  if (!use24Hour) {
    // Check if the original string contains period information
    const normalizedTime = timeString.trim().toLowerCase();
    if (/[ap]m?/i.test(normalizedTime)) {
      // Extract period from the original string
      const periodMatch = normalizedTime.match(/[ap]m?/i);
      if (periodMatch) {
        const periodStr = periodMatch[0].toUpperCase();
        if (periodStr.startsWith('P')) {
          period = 'PM';
        } else if (periodStr.startsWith('A')) {
          period = 'AM';
        }
      }
    } else {
      // Fallback to hour-based period detection
      period = hour >= 12 ? 'PM' : 'AM';
    }
  } else {
    // For 24-hour format, period is not relevant
    period = 'AM';
  }

  const hour12 = hour % 12 || 12;

  const time: Time = {
    hr: (use24Hour ? hour : hour12).toString().padStart(2, '0') as Hour,
    min: minute.toString().padStart(2, '0') as Minute,
    sec: second?.toString().padStart(2, '0') as Minute,
    period,
    mil: millisecond?.toString().padStart(3, '0') as Millisecond,
  };
  time.string = getTimeStringFromParts(time, use24Hour, showSeconds);

  return time;
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
    return `${time.hr}:${time.min}:${time.sec}`;
  }
  if (use24Hour) {
    return `${time.hr}:${time.min}`;
  }
  if (showSeconds) {
    return `${time.hr}:${time.min}:${time.sec} ${time.period}`;
  }
  return `${time.hr}:${time.min} ${time.period}`;
}
