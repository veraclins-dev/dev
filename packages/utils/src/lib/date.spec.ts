import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  addHours,
  formatAsDate,
  formatAsDateTime,
  formatAsTime,
  formatRelativeDate,
  fromNow,
  getDateFromPeriod,
  getDateTimeFormat,
  getFutureDateFromPeriod,
  isLastWeek,
  isThisWeek,
  isToday,
  subtractDays,
} from './date';

describe('Date Utilities', () => {
  const now = new Date('2024-03-20T12:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getDateFromPeriod', () => {
    it('should return correct date for Last 24 hours', () => {
      const result = getDateFromPeriod('Last 24 hours');
      expect(result).toEqual(new Date('2024-03-19T12:00:00Z'));
    });

    it('should return correct date for Last 7 days', () => {
      const result = getDateFromPeriod('Last 7 days');
      expect(result).toEqual(new Date('2024-03-13T12:00:00Z'));
    });

    it('should return correct date for This month', () => {
      const result = getDateFromPeriod('This month');
      expect(result).toEqual(new Date('2024-03-01T00:00:00Z'));
    });

    it('should return correct date for This year', () => {
      const result = getDateFromPeriod('This year');
      expect(result).toEqual(new Date('2024-01-01T00:00:00Z'));
    });

    it('should return null for invalid period', () => {
      const result = getDateFromPeriod('Invalid Period' as any);
      expect(result).toBeNull();
    });
  });

  describe('getFutureDateFromPeriod', () => {
    it('should return correct date for Next 24 hours', () => {
      const result = getFutureDateFromPeriod('Next 24 hours');
      expect(result).toEqual(new Date('2024-03-21T12:00:00Z'));
    });

    it('should return correct date for Next 7 days', () => {
      const result = getFutureDateFromPeriod('Next 7 days');
      expect(result).toEqual(new Date('2024-03-27T12:00:00Z'));
    });

    it('should return correct date for Next month', () => {
      const result = getFutureDateFromPeriod('Next month');
      expect(result).toEqual(new Date('2024-04-01T00:00:00Z'));
    });

    it('should return correct date for End of this year', () => {
      const result = getFutureDateFromPeriod('End of this year');
      expect(result).toEqual(new Date('2024-12-31T23:59:59.999Z'));
    });

    it('should return null for invalid period', () => {
      const result = getFutureDateFromPeriod('Invalid Period' as any);
      expect(result).toBeNull();
    });
  });

  describe('formatAsDate', () => {
    it('should format date with default format', () => {
      const result = formatAsDate(now);
      expect(result).toBe('Mar 20, 2024');
    });

    it('should format date with custom format', () => {
      const result = formatAsDate(now, 'yyyy-MM-dd');
      expect(result).toBe('2024-03-20');
    });

    it('should return empty string for invalid date', () => {
      const result = formatAsDate('invalid-date');
      expect(result).toBe('');
    });
  });

  describe('formatAsDateTime', () => {
    it('should format today with time only', () => {
      const result = formatAsDateTime(now);
      expect(result).toBe('12:00 PM');
    });

    it('should format date with full datetime for non-current year', () => {
      const pastDate = new Date('2023-03-20T12:00:00Z');
      const result = formatAsDateTime(pastDate);
      expect(result).toBe('Mar 20, 2023, 12:00 PM');
    });
  });

  describe('formatAsTime', () => {
    it('should format time correctly', () => {
      const result = formatAsTime(now);
      expect(result).toBe('12:00 PM');
    });
  });

  describe('formatRelativeDate', () => {
    it('should format today with time', () => {
      const result = formatRelativeDate(now);
      expect(result).toBe('today • 12:00 PM');
    });

    it('should format yesterday with time', () => {
      const yesterday = new Date('2024-03-19T12:00:00Z');
      const result = formatRelativeDate(yesterday);
      expect(result).toBe('yesterday • 12:00 PM');
    });

    it('should format date with year for non-current year', () => {
      const pastDate = new Date('2023-03-20T12:00:00Z');
      const result = formatRelativeDate(pastDate);
      expect(result).toBe('Mar 20, 2023 • 12:00 PM');
    });
  });

  describe('fromNow', () => {
    it('should return relative time string', () => {
      const pastDate = new Date('2024-03-19T12:00:00Z');
      const result = fromNow(pastDate);
      expect(result).toBe('1 day ago');
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
  });

  describe('subtractDays', () => {
    it('should subtract days correctly', () => {
      const result = subtractDays(now, 1);
      expect(result).toEqual(new Date('2024-03-19T12:00:00Z'));
    });
  });

  describe('getDateTimeFormat', () => {
    it('should create formatter with default options', () => {
      const formatter = getDateTimeFormat();
      expect(formatter.format(now)).toBe('3/20/2024, 12:00 PM');
    });

    it('should create formatter with custom locale', () => {
      const formatter = getDateTimeFormat('fr-FR');
      expect(formatter.format(now)).toBe('20/03/2024 12:00');
    });

    it('should create formatter with custom timezone', () => {
      const formatter = getDateTimeFormat('en-US', 'America/New_York');
      expect(formatter.format(now)).toBe('3/20/2024, 8:00 AM');
    });
  });
});
