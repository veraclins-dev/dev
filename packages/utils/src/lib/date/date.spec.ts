import { Settings } from 'luxon';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  addDays,
  addHours,
  addMonths,
  addYears,
  createDateFromYearMonth,
  type EndOfPeriod,
  endOfPeriod,
  formatDate,
  formatDateTime,
  formatMonth,
  formatMonthShort,
  formatRelativeDate,
  formatRelativeTime,
  formatYear,
  getDaysInMonth,
  getDefaultMonth,
  getFirstDayOfMonth,
  getFirstDayOfWeek,
  getLastDayOfMonth,
  getLastDayOfWeek,
  getMonthGrid,
  getTimezoneOffset,
  getWeekDays,
  getWeekNumber,
  isAfter,
  isBefore,
  isBetween,
  isLastWeek,
  isSameDay,
  isSameMonth,
  isSameYear,
  isThisWeek,
  isToday,
  isValidDate,
  isWeekend,
  parseDate,
  parseToDateTime,
  type StartOfPeriod,
  startOfPeriod,
  startOfToday,
  subtractDays,
  subtractMonths,
  subtractYears,
  toDate,
} from './date';
import { getPartsFromDate, getPartsFromTimeString } from './time';

describe('Date Utilities', () => {
  const now = new Date('2024-03-20T12:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
    Settings.defaultZone = 'UTC'; // Force UTC for all DateTime operations
  });

  afterEach(() => {
    vi.useRealTimers();
    Settings.defaultZone = 'system'; // Reset to system time zone
  });

  describe('parseToDateTime', () => {
    it('should parse Date object', () => {
      const result = parseToDateTime(now);
      expect(result.isValid).toBe(true);
      expect(result.toISO()).toBe('2024-03-20T12:00:00.000Z');
    });

    it('should parse ISO string', () => {
      const result = parseToDateTime('2024-03-20T12:00:00Z');
      expect(result.isValid).toBe(true);
      expect(result.toISO()).toBe('2024-03-20T12:00:00.000Z');
    });

    it('should parse timestamp number', () => {
      const timestamp = now.getTime();
      const result = parseToDateTime(timestamp);
      expect(result.isValid).toBe(true);
      expect(result.toISO()).toBe('2024-03-20T12:00:00.000Z');
    });
  });

  describe('parseDate', () => {
    it('should parse Date object', () => {
      const result = parseDate(now);
      expect(result).toEqual(now);
    });

    it('should parse ISO string', () => {
      const result = parseDate('2024-03-20T12:00:00Z');
      expect(result).toEqual(now);
    });

    it('should parse timestamp number', () => {
      const timestamp = now.getTime();
      const result = parseDate(timestamp);
      expect(result).toEqual(now);
    });
  });

  describe('toDate', () => {
    it('should convert DateTime to Date', () => {
      const dt = parseToDateTime(now);
      const result = toDate(dt);
      expect(result).toEqual(now);
    });
  });

  describe('startOfPeriod', () => {
    describe('Today', () => {
      it('should return start of current day', () => {
        const result = startOfPeriod('Today');
        expect(result).toEqual(new Date('2024-03-20T00:00:00Z'));
      });
    });

    describe('This {unit}', () => {
      it('should return start of current year', () => {
        const result = startOfPeriod('This year');
        expect(result).toEqual(new Date('2024-01-01T00:00:00Z'));
      });

      it('should return start of current quarter', () => {
        const result = startOfPeriod('This quarter');
        expect(result).toEqual(new Date('2024-01-01T00:00:00Z'));
      });

      it('should return start of current month', () => {
        const result = startOfPeriod('This month');
        expect(result).toEqual(new Date('2024-03-01T00:00:00Z'));
      });

      it('should return start of current week', () => {
        const result = startOfPeriod('This week');
        expect(result).toEqual(new Date('2024-03-18T00:00:00Z')); // Monday of current week
      });
    });

    describe('Last {amount} {unit}s', () => {
      it('should return correct date for Last 12 hours', () => {
        const result = startOfPeriod('Last 12 hours');
        expect(result).toEqual(new Date('2024-03-20T00:00:00Z'));
      });

      it('should return correct date for Last 24 hours', () => {
        const result = startOfPeriod('Last 24 hours');
        expect(result).toEqual(new Date('2024-03-19T12:00:00Z'));
      });

      it('should return correct date for Last 72 hours', () => {
        const result = startOfPeriod('Last 72 hours');
        expect(result).toEqual(new Date('2024-03-17T12:00:00Z'));
      });

      it('should return correct date for Last 2 days', () => {
        const result = startOfPeriod('Last 2 days');
        expect(result).toEqual(new Date('2024-03-18T12:00:00Z'));
      });

      it('should return correct date for Last 3 days', () => {
        const result = startOfPeriod('Last 3 days');
        expect(result).toEqual(new Date('2024-03-17T12:00:00Z'));
      });

      it('should return correct date for Last 7 days', () => {
        const result = startOfPeriod('Last 7 days');
        expect(result).toEqual(new Date('2024-03-13T12:00:00Z'));
      });

      it('should return correct date for Last 14 days', () => {
        const result = startOfPeriod('Last 14 days');
        expect(result).toEqual(new Date('2024-03-06T12:00:00Z'));
      });

      it('should return correct date for Last 28 days', () => {
        const result = startOfPeriod('Last 28 days');
        expect(result).toEqual(new Date('2024-02-21T12:00:00Z'));
      });

      it('should return correct date for Last 30 days', () => {
        const result = startOfPeriod('Last 30 days');
        expect(result).toEqual(new Date('2024-02-19T12:00:00Z'));
      });

      it('should return correct date for Last 90 days', () => {
        const result = startOfPeriod('Last 90 days');
        expect(result).toEqual(new Date('2023-12-21T12:00:00Z'));
      });

      it('should return correct date for Last 2 weeks', () => {
        const result = startOfPeriod('Last 2 weeks');
        expect(result).toEqual(new Date('2024-03-06T12:00:00Z'));
      });

      it('should return correct date for Last 4 weeks', () => {
        const result = startOfPeriod('Last 4 weeks');
        expect(result).toEqual(new Date('2024-02-21T12:00:00Z'));
      });

      it('should return correct date for Last 6 weeks', () => {
        const result = startOfPeriod('Last 6 weeks');
        expect(result).toEqual(new Date('2024-02-07T12:00:00Z'));
      });

      it('should return correct date for Last 8 weeks', () => {
        const result = startOfPeriod('Last 8 weeks');
        expect(result).toEqual(new Date('2024-01-24T12:00:00Z'));
      });

      it('should return correct date for Last 10 weeks', () => {
        const result = startOfPeriod('Last 10 weeks');
        expect(result).toEqual(new Date('2024-01-10T12:00:00Z'));
      });

      it('should return correct date for Last 3 months', () => {
        const result = startOfPeriod('Last 3 months');
        expect(result).toEqual(new Date('2023-12-20T12:00:00Z'));
      });

      it('should return correct date for Last 6 months', () => {
        const result = startOfPeriod('Last 6 months');
        expect(result).toEqual(new Date('2023-09-20T12:00:00Z'));
      });

      it('should return correct date for Last 12 months', () => {
        const result = startOfPeriod('Last 12 months');
        expect(result).toEqual(new Date('2023-03-20T12:00:00Z'));
      });

      it('should return correct date for Last 2 quarters', () => {
        const result = startOfPeriod('Last 2 quarters');
        expect(result).toEqual(new Date('2023-09-20T12:00:00Z'));
      });

      it('should return correct date for Last 3 quarters', () => {
        const result = startOfPeriod('Last 3 quarters');
        expect(result).toEqual(new Date('2023-06-20T12:00:00Z'));
      });

      it('should return correct date for Last 5 quarters', () => {
        const result = startOfPeriod('Last 5 quarters');
        expect(result).toEqual(new Date('2022-12-20T12:00:00Z'));
      });

      it('should return correct date for Last 2 years', () => {
        const result = startOfPeriod('Last 2 years');
        expect(result).toEqual(new Date('2022-03-20T12:00:00Z'));
      });

      it('should return correct date for Last 3 years', () => {
        const result = startOfPeriod('Last 3 years');
        expect(result).toEqual(new Date('2021-03-20T12:00:00Z'));
      });

      it('should return correct date for Last 5 years', () => {
        const result = startOfPeriod('Last 5 years');
        expect(result).toEqual(new Date('2019-03-20T12:00:00Z'));
      });
    });

    it('should return default fallback for invalid period', () => {
      const result = startOfPeriod('Invalid Period' as StartOfPeriod);
      expect(result).toEqual(new Date('2024-03-13T12:00:00Z')); // 7 days ago fallback
    });
  });

  describe('endOfPeriod', () => {
    describe('Today', () => {
      it('should return end of current day', () => {
        const result = endOfPeriod('Today');
        expect(result).toEqual(new Date('2024-03-20T23:59:59.999Z'));
      });
    });

    describe('This {unit}', () => {
      it('should return end of current year', () => {
        const result = endOfPeriod('This year');
        expect(result).toEqual(new Date('2024-12-31T23:59:59.999Z'));
      });

      it('should return end of current quarter', () => {
        const result = endOfPeriod('This quarter');
        expect(result).toEqual(new Date('2024-03-31T23:59:59.999Z'));
      });

      it('should return end of current month', () => {
        const result = endOfPeriod('This month');
        expect(result).toEqual(new Date('2024-03-31T23:59:59.999Z'));
      });

      it('should return end of current week', () => {
        const result = endOfPeriod('This week');
        expect(result).toEqual(new Date('2024-03-24T23:59:59.999Z')); // Sunday of current week
      });
    });

    describe('Next {amount} {unit}s', () => {
      it('should return correct date for Next 12 hours', () => {
        const result = endOfPeriod('Next 12 hours');
        expect(result).toEqual(new Date('2024-03-21T00:00:00Z'));
      });

      it('should return correct date for Next 24 hours', () => {
        const result = endOfPeriod('Next 24 hours');
        expect(result).toEqual(new Date('2024-03-21T12:00:00Z'));
      });

      it('should return correct date for Next 72 hours', () => {
        const result = endOfPeriod('Next 72 hours');
        expect(result).toEqual(new Date('2024-03-23T12:00:00Z'));
      });

      it('should return correct date for Next 2 days', () => {
        const result = endOfPeriod('Next 2 days');
        expect(result).toEqual(new Date('2024-03-22T12:00:00Z'));
      });

      it('should return correct date for Next 3 days', () => {
        const result = endOfPeriod('Next 3 days');
        expect(result).toEqual(new Date('2024-03-23T12:00:00Z'));
      });

      it('should return correct date for Next 7 days', () => {
        const result = endOfPeriod('Next 7 days');
        expect(result).toEqual(new Date('2024-03-27T12:00:00Z'));
      });

      it('should return correct date for Next 14 days', () => {
        const result = endOfPeriod('Next 14 days');
        expect(result).toEqual(new Date('2024-04-03T12:00:00Z'));
      });

      it('should return correct date for Next 28 days', () => {
        const result = endOfPeriod('Next 28 days');
        expect(result).toEqual(new Date('2024-04-17T12:00:00Z'));
      });

      it('should return correct date for Next 30 days', () => {
        const result = endOfPeriod('Next 30 days');
        expect(result).toEqual(new Date('2024-04-19T12:00:00Z'));
      });

      it('should return correct date for Next 90 days', () => {
        const result = endOfPeriod('Next 90 days');
        expect(result).toEqual(new Date('2024-06-18T12:00:00Z'));
      });

      it('should return correct date for Next 2 weeks', () => {
        const result = endOfPeriod('Next 2 weeks');
        expect(result).toEqual(new Date('2024-04-03T12:00:00Z'));
      });

      it('should return correct date for Next 4 weeks', () => {
        const result = endOfPeriod('Next 4 weeks');
        expect(result).toEqual(new Date('2024-04-17T12:00:00Z'));
      });

      it('should return correct date for Next 6 weeks', () => {
        const result = endOfPeriod('Next 6 weeks');
        expect(result).toEqual(new Date('2024-05-01T12:00:00Z'));
      });

      it('should return correct date for Next 8 weeks', () => {
        const result = endOfPeriod('Next 8 weeks');
        expect(result).toEqual(new Date('2024-05-15T12:00:00Z'));
      });

      it('should return correct date for Next 10 weeks', () => {
        const result = endOfPeriod('Next 10 weeks');
        expect(result).toEqual(new Date('2024-05-29T12:00:00Z'));
      });

      it('should return correct date for Next 3 months', () => {
        const result = endOfPeriod('Next 3 months');
        expect(result).toEqual(new Date('2024-06-20T12:00:00Z'));
      });

      it('should return correct date for Next 6 months', () => {
        const result = endOfPeriod('Next 6 months');
        expect(result).toEqual(new Date('2024-09-20T12:00:00Z'));
      });

      it('should return correct date for Next 12 months', () => {
        const result = endOfPeriod('Next 12 months');
        expect(result).toEqual(new Date('2025-03-20T12:00:00Z'));
      });

      it('should return correct date for Next 2 quarters', () => {
        const result = endOfPeriod('Next 2 quarters');
        expect(result).toEqual(new Date('2024-09-20T12:00:00Z'));
      });

      it('should return correct date for Next 3 quarters', () => {
        const result = endOfPeriod('Next 3 quarters');
        expect(result).toEqual(new Date('2024-12-20T12:00:00Z'));
      });

      it('should return correct date for Next 5 quarters', () => {
        const result = endOfPeriod('Next 5 quarters');
        expect(result).toEqual(new Date('2025-06-20T12:00:00Z'));
      });

      it('should return correct date for Next 2 years', () => {
        const result = endOfPeriod('Next 2 years');
        expect(result).toEqual(new Date('2026-03-20T12:00:00Z'));
      });

      it('should return correct date for Next 3 years', () => {
        const result = endOfPeriod('Next 3 years');
        expect(result).toEqual(new Date('2027-03-20T12:00:00Z'));
      });

      it('should return correct date for Next 5 years', () => {
        const result = endOfPeriod('Next 5 years');
        expect(result).toEqual(new Date('2029-03-20T12:00:00Z'));
      });
    });

    it('should return default fallback for invalid period', () => {
      const result = endOfPeriod('Invalid Period' as EndOfPeriod);
      expect(result).toEqual(new Date('2024-03-27T12:00:00Z')); // 7 days from now fallback
    });
  });

  describe('getDefaultMonth', () => {
    it('should return date from single Date value', () => {
      const date = new Date('2024-01-15');
      const result = getDefaultMonth(date);
      expect(result).toEqual(date);
    });

    it('should return first date from array', () => {
      const dates = [new Date('2024-01-15'), new Date('2024-01-20')];
      const result = getDefaultMonth(dates);
      expect(result).toEqual(dates[0]);
    });

    it('should return from date from object', () => {
      const dateObj = {
        from: new Date('2024-01-15'),
        to: new Date('2024-01-20'),
      };
      const result = getDefaultMonth(dateObj);
      expect(result).toEqual(dateObj.from);
    });

    it('should return default value when primary is not available', () => {
      const defaultValue = new Date('2024-01-15');
      const result = getDefaultMonth(undefined, defaultValue);
      expect(result).toEqual(defaultValue);
    });

    it('should return current date when no values provided', () => {
      const result = getDefaultMonth();
      expect(result).toEqual(now);
    });
  });

  describe('formatDate', () => {
    it('should format date with default format', () => {
      const result = formatDate(now, 'MMM dd, yyyy', 'en-US');
      expect(result).toBe('Mar 20, 2024');
    });

    it('should format date with custom format', () => {
      const result = formatDate(now, 'yyyy-MM-dd', 'en-US');
      expect(result).toBe('2024-03-20');
    });

    it('should format date with custom locale', () => {
      const result = formatDate(now, 'MMM dd, yyyy', 'es-ES');
      expect(result).toBe('mar 20, 2024');
    });

    it('should handle invalid date gracefully', () => {
      const result = formatDate('invalid-date', 'MMM dd, yyyy', 'en-US');
      expect(result).toBe('Invalid DateTime');
    });
  });

  describe('formatDateTime', () => {
    it('should format today with time only', () => {
      const result = formatDateTime(now);
      expect(result).toBe('12:00 PM');
    });

    it('should format date with full datetime for non-current year', () => {
      const pastDate = new Date('2023-03-20T12:00:00Z');
      const result = formatDateTime(pastDate);
      expect(result).toBe('Mar 20, 2023, 12:00 PM');
    });

    it('should format date with month and day for current year', () => {
      const futureDate = new Date('2024-12-25T12:00:00Z');
      const result = formatDateTime(futureDate);
      expect(result).toBe('Dec 25, 12:00 PM');
    });

    it('should handle invalid date gracefully', () => {
      const result = formatDateTime('invalid-date');
      expect(result).toBe('Invalid DateTime');
    });
  });

  describe('formatRelativeDate', () => {
    it('should format today with time', () => {
      const result = formatRelativeDate(now, '•');
      expect(result).toBe('today • 12:00 PM');
    });

    it('should format yesterday with time', () => {
      const yesterday = new Date('2024-03-19T12:00:00Z');
      const result = formatRelativeDate(yesterday, '•');
      expect(result).toBe('yesterday • 12:00 PM');
    });

    it('should format date with year for non-current year', () => {
      const pastDate = new Date('2023-03-20T12:00:00Z');
      const result = formatRelativeDate(pastDate, '•');
      expect(result).toBe('Mar 20, 2023 • 12:00 PM');
    });

    it('should format date with month and day for current year', () => {
      const futureDate = new Date('2024-12-25T12:00:00Z');
      const result = formatRelativeDate(futureDate, '•');
      expect(result).toBe('Dec 25 • 12:00 PM');
    });

    it('should use custom connector', () => {
      const result = formatRelativeDate(now, '|');
      expect(result).toBe('today | 12:00 PM');
    });

    it('should handle null date', () => {
      const result = formatRelativeDate(null, '•');
      expect(result).toBe('');
    });
  });

  describe('formatRelativeTime', () => {
    it('should format relative time', () => {
      const result = formatRelativeTime(now);
      expect(result).toBe('in 0 seconds');
    });

    it('should format past time', () => {
      const pastDate = new Date('2024-03-19T12:00:00Z');
      const result = formatRelativeTime(pastDate);
      expect(result).toBe('1 day ago');
    });
  });

  describe('getDaysInMonth', () => {
    it('should return correct days for March 2024', () => {
      const result = getDaysInMonth(now);
      expect(result).toBe(31);
    });

    it('should return correct days for February 2024 (leap year)', () => {
      const febDate = new Date('2024-02-15');
      const result = getDaysInMonth(febDate);
      expect(result).toBe(29);
    });

    it('should return correct days for April 2024', () => {
      const aprDate = new Date('2024-04-15');
      const result = getDaysInMonth(aprDate);
      expect(result).toBe(30);
    });

    it('should handle invalid date', () => {
      const result = getDaysInMonth('invalid-date');
      expect(result).toBe(0);
    });
  });

  describe('getFirstDayOfMonth', () => {
    it('should return first day of month', () => {
      const result = getFirstDayOfMonth(now);
      expect(result).toEqual(new Date('2024-03-01T00:00:00Z'));
    });
  });

  describe('getLastDayOfMonth', () => {
    it('should return last day of month', () => {
      const result = getLastDayOfMonth(now);
      expect(result).toEqual(new Date('2024-03-31T23:59:59.999Z'));
    });
  });

  describe('getFirstDayOfWeek', () => {
    it('should return first day of week starting Sunday', () => {
      const result = getFirstDayOfWeek(now, 0);
      expect(result).toEqual(new Date('2024-03-17T00:00:00Z'));
    });

    it('should return first day of week starting Monday', () => {
      const result = getFirstDayOfWeek(now, 1);
      expect(result).toEqual(new Date('2024-03-18T00:00:00Z'));
    });
  });

  describe('getLastDayOfWeek', () => {
    it('should return last day of week starting Sunday', () => {
      const result = getLastDayOfWeek(now, 0);
      expect(result).toEqual(new Date('2024-03-23T23:59:59.999Z'));
    });

    it('should return last day of week starting Monday', () => {
      const result = getLastDayOfWeek(now, 1);
      expect(result).toEqual(new Date('2024-03-24T23:59:59.999Z'));
    });
  });

  describe('getWeekNumber', () => {
    it('should return correct week number', () => {
      const result = getWeekNumber(now);
      expect(result).toBe(12);
    });
  });

  describe('getMonthGrid', () => {
    it('should return 6 weeks with outside days', () => {
      const result = getMonthGrid(now, 0, true);
      expect(result).toHaveLength(6);
      expect(result[0]).toHaveLength(7);
      expect(result[5]).toHaveLength(7);
    });

    it('should return 6 weeks without outside days', () => {
      const result = getMonthGrid(now, 1, false);
      expect(result).toHaveLength(6);
      expect(result[0]).toHaveLength(7);
      expect(result[5]).toHaveLength(7);
    });
  });

  describe('getWeekDays', () => {
    it('should return week days starting Sunday', () => {
      const result = getWeekDays('en-US', 0);
      expect(result).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    });

    it('should return week days starting Monday', () => {
      const result = getWeekDays('en-US', 1);
      expect(result).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    });

    it('should return week days in Spanish', () => {
      const result = getWeekDays('es-ES', 1);
      expect(result).toEqual(['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']);
    });
  });

  describe('formatMonth', () => {
    it('should format full month name', () => {
      const result = formatMonth(now, 'en-US');
      expect(result).toBe('March');
    });

    it('should format month in Spanish', () => {
      const result = formatMonth(now, 'es-ES');
      expect(result).toBe('marzo');
    });
  });

  describe('formatMonthShort', () => {
    it('should format short month name', () => {
      const result = formatMonthShort(now, 'en-US');
      expect(result).toBe('Mar');
    });

    it('should format short month in Spanish', () => {
      const result = formatMonthShort(now, 'es-ES');
      expect(result).toBe('mar');
    });
  });

  describe('formatYear', () => {
    it('should format year', () => {
      const result = formatYear(now, 'en-US');
      expect(result).toBe('2024');
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid Date', () => {
      expect(isValidDate(now)).toBe(true);
    });

    it('should return false for invalid Date', () => {
      const invalidDate = new Date('invalid');
      expect(isValidDate(invalidDate)).toBe(false);
    });

    it('should return false for non-Date values', () => {
      expect(isValidDate('2024-03-20')).toBe(false);
      expect(isValidDate(123)).toBe(false);
      expect(isValidDate(null)).toBe(false);
    });
  });

  describe('isWeekend', () => {
    it('should return true for Saturday', () => {
      const saturday = new Date('2024-03-23T12:00:00Z');
      expect(isWeekend(saturday)).toBe(true);
    });

    it('should return true for Sunday', () => {
      const sunday = new Date('2024-03-24T12:00:00Z');
      expect(isWeekend(sunday)).toBe(true);
    });

    it('should return false for weekday', () => {
      expect(isWeekend(now)).toBe(false);
    });
  });

  describe('startOfToday', () => {
    it('should return start of today', () => {
      const result = startOfToday();
      expect(result).toEqual(new Date('2024-03-20T00:00:00Z'));
    });
  });

  describe('createDateFromYearMonth', () => {
    it('should create date from year and month', () => {
      const result = createDateFromYearMonth(2024, 2);
      expect(result).toEqual(new Date('2024-03-01T00:00:00Z'));
    });

    it('should create date with custom day', () => {
      const result = createDateFromYearMonth(2024, 2, 15);
      expect(result).toEqual(new Date('2024-03-15T00:00:00Z'));
    });
  });

  describe('addDays', () => {
    it('should add days correctly', () => {
      const result = addDays(now, 5);
      expect(result).toEqual(new Date('2024-03-25T12:00:00Z'));
    });

    it('should handle negative days', () => {
      const result = addDays(now, -5);
      expect(result).toEqual(new Date('2024-03-15T12:00:00Z'));
    });
  });

  describe('addMonths', () => {
    it('should add months correctly', () => {
      const result = addMonths(now, 2);
      expect(result).toEqual(new Date('2024-05-20T12:00:00Z'));
    });

    it('should handle year boundary', () => {
      const result = addMonths(now, 10);
      expect(result).toEqual(new Date('2025-01-20T12:00:00Z'));
    });
  });

  describe('addYears', () => {
    it('should add years correctly', () => {
      const result = addYears(now, 1);
      expect(result).toEqual(new Date('2025-03-20T12:00:00Z'));
    });
  });

  describe('subtractMonths', () => {
    it('should subtract months correctly', () => {
      const result = subtractMonths(now, 2);
      expect(result).toEqual(new Date('2024-01-20T12:00:00Z'));
    });

    it('should handle year boundary', () => {
      const result = subtractMonths(now, 3);
      expect(result).toEqual(new Date('2023-12-20T12:00:00Z'));
    });
  });

  describe('subtractYears', () => {
    it('should subtract years correctly', () => {
      const result = subtractYears(now, 1);
      expect(result).toEqual(new Date('2023-03-20T12:00:00Z'));
    });
  });

  describe('isSameDay', () => {
    it('should return true for same day', () => {
      const sameDay = new Date('2024-03-20T18:00:00Z');
      expect(isSameDay(now, sameDay)).toBe(true);
    });

    it('should return false for different days', () => {
      const differentDay = new Date('2024-03-21T12:00:00Z');
      expect(isSameDay(now, differentDay)).toBe(false);
    });
  });

  describe('isSameMonth', () => {
    it('should return true for same month', () => {
      const sameMonth = new Date('2024-03-15T12:00:00Z');
      expect(isSameMonth(now, sameMonth)).toBe(true);
    });

    it('should return false for different months', () => {
      const differentMonth = new Date('2024-04-20T12:00:00Z');
      expect(isSameMonth(now, differentMonth)).toBe(false);
    });
  });

  describe('isSameYear', () => {
    it('should return true for same year', () => {
      const sameYear = new Date('2024-06-20T12:00:00Z');
      expect(isSameYear(now, sameYear)).toBe(true);
    });

    it('should return false for different years', () => {
      const differentYear = new Date('2023-03-20T12:00:00Z');
      expect(isSameYear(now, differentYear)).toBe(false);
    });
  });

  describe('isBefore', () => {
    it('should return true when first date is before second', () => {
      const earlier = new Date('2024-03-19T12:00:00Z');
      expect(isBefore(earlier, now)).toBe(true);
    });

    it('should return false when first date is after second', () => {
      const later = new Date('2024-03-21T12:00:00Z');
      expect(isBefore(later, now)).toBe(false);
    });

    it('should return false for same date', () => {
      expect(isBefore(now, now)).toBe(false);
    });
  });

  describe('isAfter', () => {
    it('should return true when first date is after second', () => {
      const later = new Date('2024-03-21T12:00:00Z');
      expect(isAfter(later, now)).toBe(true);
    });

    it('should return false when first date is before second', () => {
      const earlier = new Date('2024-03-19T12:00:00Z');
      expect(isAfter(earlier, now)).toBe(false);
    });

    it('should return false for same date', () => {
      expect(isAfter(now, now)).toBe(false);
    });
  });

  describe('isBetween', () => {
    it('should return true when date is between start and end', () => {
      const start = new Date('2024-03-19T12:00:00Z');
      const end = new Date('2024-03-21T12:00:00Z');
      expect(isBetween(now, start, end)).toBe(true);
    });

    it('should return true when date equals start', () => {
      const end = new Date('2024-03-21T12:00:00Z');
      expect(isBetween(now, now, end)).toBe(true);
    });

    it('should return true when date equals end', () => {
      const start = new Date('2024-03-19T12:00:00Z');
      expect(isBetween(now, start, now)).toBe(true);
    });

    it('should return false when date is before start', () => {
      const start = new Date('2024-03-21T12:00:00Z');
      const end = new Date('2024-03-22T12:00:00Z');
      expect(isBetween(now, start, end)).toBe(false);
    });

    it('should return false when date is after end', () => {
      const start = new Date('2024-03-18T12:00:00Z');
      const end = new Date('2024-03-19T12:00:00Z');
      expect(isBetween(now, start, end)).toBe(false);
    });
  });

  describe('getTimezoneOffset', () => {
    it('should return timezone offset for America/New_York', () => {
      const result = getTimezoneOffset('America/New_York', now);
      expect(result).toBe(-240); // EDT on March 20, 2024
    });

    it('should return timezone offset for UTC', () => {
      const result = getTimezoneOffset('UTC', now);
      expect(result).toBe(0);
    });
  });

  describe('isToday', () => {
    it('should return true for today', () => {
      expect(isToday(now)).toBe(true);
    });

    it('should return false for other days', () => {
      const yesterday = new Date('2024-03-19T12:00:00Z');
      expect(isToday(yesterday)).toBe(false);
    });

    it('should work with string input', () => {
      expect(isToday('2024-03-20T12:00:00Z')).toBe(true);
    });

    it('should work with number input', () => {
      expect(isToday(now.getTime())).toBe(true);
    });
  });

  describe('isThisWeek', () => {
    it('should return true for current week', () => {
      expect(isThisWeek(now)).toBe(true);
    });

    it('should return false for other weeks', () => {
      const lastWeek = new Date('2024-03-13T12:00:00Z');
      expect(isThisWeek(lastWeek)).toBe(false);
    });
  });

  describe('isLastWeek', () => {
    it('should return true for last week', () => {
      const lastWeek = new Date('2024-03-13T12:00:00Z');
      expect(isLastWeek(lastWeek)).toBe(true);
    });

    it('should return false for other weeks', () => {
      expect(isLastWeek(now)).toBe(false);
    });
  });

  describe('addHours', () => {
    it('should add hours correctly', () => {
      const result = addHours(now, 2);
      expect(result).toEqual(new Date('2024-03-20T14:00:00Z'));
    });

    it('should use default amount of 1', () => {
      const result = addHours(now);
      expect(result).toEqual(new Date('2024-03-20T13:00:00Z'));
    });
  });

  describe('subtractDays', () => {
    it('should subtract days correctly', () => {
      const result = subtractDays(now, 1);
      expect(result).toEqual(new Date('2024-03-19T12:00:00Z'));
    });
  });

  describe('getPartsFromDate', () => {
    it('should extract time parts from Date object with 12-hour format', () => {
      const date = new Date('2024-03-20T14:30:45.123Z');
      const result = getPartsFromDate({
        date,
        use24Hour: false,
        showSeconds: false,
      });

      expect(result).toEqual({
        hr: '02',
        min: '30',
        sec: '45',
        period: 'PM',
        mil: '123',
        string: '02:30 PM',
      });
    });

    it('should extract time parts from Date object with 24-hour format', () => {
      const date = new Date('2024-03-20T14:30:45.123Z');
      const result = getPartsFromDate({
        date,
        use24Hour: true,
        showSeconds: false,
      });

      expect(result).toEqual({
        hr: '14',
        min: '30',
        sec: '45',
        period: 'AM',
        mil: '123',
        string: '14:30',
      });
    });

    it('should extract time parts from ISO string with 12-hour format', () => {
      const dateString = '2024-03-20T14:30:45.123Z';
      const result = getPartsFromDate({
        date: dateString,
        use24Hour: false,
        showSeconds: true,
      });

      expect(result).toEqual({
        hr: '02',
        min: '30',
        sec: '45',
        period: 'PM',
        mil: '123',
        string: '02:30:45 PM',
      });
    });

    it('should extract time parts from ISO string with 24-hour format and seconds', () => {
      const dateString = '2024-03-20T14:30:45.123Z';
      const result = getPartsFromDate({
        date: dateString,
        use24Hour: true,
        showSeconds: true,
      });

      expect(result).toEqual({
        hr: '14',
        min: '30',
        sec: '45',
        period: 'AM',
        mil: '123',
        string: '14:30:45',
      });
    });

    it('should handle midnight correctly', () => {
      const date = new Date('2024-03-20T00:00:00.000Z');
      const result = getPartsFromDate({
        date,
        use24Hour: false,
        showSeconds: false,
      });

      expect(result).toEqual({
        hr: '12',
        min: '00',
        sec: '00',
        period: 'AM',
        mil: '000',
        string: '12:00 AM',
      });
    });

    it('should handle noon correctly', () => {
      const date = new Date('2024-03-20T12:00:00.000Z');
      const result = getPartsFromDate({
        date,
        use24Hour: false,
        showSeconds: false,
      });

      expect(result).toEqual({
        hr: '12',
        min: '00',
        sec: '00',
        period: 'PM',
        mil: '000',
        string: '12:00 PM',
      });
    });
  });

  describe('getPartsFromTimeString', () => {
    it('should extract time parts from time string with 12-hour format', () => {
      const result = getPartsFromTimeString({
        timeString: '2:30 PM',
        use24Hour: false,
        showSeconds: false,
      });

      expect(result).toEqual({
        hr: '02',
        min: '30',
        sec: '00',
        period: 'PM',
        mil: '000',
        string: '02:30 PM',
      });
    });

    it('should extract time parts from time string with 24-hour format', () => {
      const result = getPartsFromTimeString({
        timeString: '14:30',
        use24Hour: true,
        showSeconds: false,
      });

      expect(result).toEqual({
        hr: '14',
        min: '30',
        sec: '00',
        period: 'AM',
        mil: '000',
        string: '14:30',
      });
    });

    it('should extract time parts from date ISO string with 12-hour format', () => {
      const result = getPartsFromTimeString({
        timeString: '2024-03-20T14:30:45.123Z',
        use24Hour: false,
        showSeconds: true,
      });

      expect(result).toEqual({
        hr: '02',
        min: '30',
        sec: '45',
        period: 'PM',
        mil: '123',
        string: '02:30:45 PM',
      });
    });

    it('should extract time parts from date ISO string with 24-hour format', () => {
      const result = getPartsFromTimeString({
        timeString: '2024-03-20T14:30:45.123Z',
        use24Hour: true,
        showSeconds: true,
      });

      expect(result).toEqual({
        hr: '14',
        min: '30',
        sec: '45',
        period: 'AM',
        mil: '123',
        string: '14:30:45',
      });
    });

    it('should handle midnight in ISO string', () => {
      const result = getPartsFromTimeString({
        timeString: '2024-03-20T00:00:00.000Z',
        use24Hour: false,
        showSeconds: false,
      });

      expect(result).toEqual({
        hr: '12',
        min: '00',
        sec: '00',
        period: 'AM',
        mil: '000',
        string: '12:00 AM',
      });
    });

    it('should handle noon in ISO string', () => {
      const result = getPartsFromTimeString({
        timeString: '2024-03-20T12:00:00.000Z',
        use24Hour: false,
        showSeconds: false,
      });

      expect(result).toEqual({
        hr: '12',
        min: '00',
        sec: '00',
        period: 'PM',
        mil: '000',
        string: '12:00 PM',
      });
    });

    it('should return default time for invalid input', () => {
      const result = getPartsFromTimeString({
        timeString: 'invalid-time-string',
        use24Hour: false,
        showSeconds: false,
      });

      expect(result).toEqual({
        hr: '01',
        min: '00',
        sec: '00',
        period: 'AM',
        mil: '000',
        string: '01:00 AM',
      });
    });
  });
});
