import { DateTime } from 'luxon';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type Time } from './definitions';
import {
  formatTimeString,
  formatTimeStringFromParts,
  getCurrentTime,
  getDateTimeFromParts,
  getPartsFromDate,
  getPartsFromDateTime,
  getPartsFromTimeString,
  getTimeStringFromParts,
  parseTimeString,
  parseTimeStringToDate,
} from './time';

// Helper function to get expected time parts based on current timezone
const getExpectedTimeParts = (
  baseTime: string,
  use24Hour = false,
  showSeconds = false,
) => {
  const dt = DateTime.fromISO(baseTime, {});
  const hour = dt.hour;
  const minute = dt.minute;
  const second = dt.second;
  const millisecond = dt.millisecond;

  let period: 'AM' | 'PM' = 'AM';
  let hr: string;

  if (!use24Hour) {
    period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    hr = hour12.toString().padStart(2, '0');
  } else {
    hr = hour.toString().padStart(2, '0');
  }

  const min = minute.toString().padStart(2, '0');
  const sec = second.toString().padStart(2, '0');
  const mil = millisecond.toString().padStart(3, '0');

  let string = '';
  if (use24Hour && showSeconds) {
    string = `${hr}:${min}:${sec}`;
  } else if (use24Hour) {
    string = `${hr}:${min}`;
  } else if (showSeconds) {
    string = `${hr}:${min}:${sec} ${period}`;
  } else {
    string = `${hr}:${min} ${period}`;
  }

  return {
    hr: hr,
    min: min,
    sec: sec,
    period,
    mil: mil,
    string,
  } as Time;
};

describe('Time Utilities', () => {
  const now = new Date('2024-03-20');
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('parseTimeString', () => {
    it('should parse 12-hour format with AM/PM', () => {
      const result = parseTimeString('2:30 PM');
      expect(result).toBeInstanceOf(DateTime);
      expect(result?.hour).toBe(14);
      expect(result?.minute).toBe(30);
    });

    it('should parse 12-hour format with lowercase am/pm', () => {
      const result = parseTimeString('2:30 pm');
      expect(result).toBeInstanceOf(DateTime);
      expect(result?.hour).toBe(14);
      expect(result?.minute).toBe(30);
    });

    it('should parse 24-hour format', () => {
      const result = parseTimeString('14:30');
      expect(result).toBeInstanceOf(DateTime);
      expect(result?.hour).toBe(14);
      expect(result?.minute).toBe(30);
    });

    it('should parse time with seconds', () => {
      const result = parseTimeString('2:30:45 PM');
      expect(result).toBeInstanceOf(DateTime);
      expect(result?.hour).toBe(14);
      expect(result?.minute).toBe(30);
      expect(result?.second).toBe(45);
    });

    it('should parse midnight correctly', () => {
      const result = parseTimeString('12:00 AM');
      expect(result).toBeInstanceOf(DateTime);
      expect(result?.hour).toBe(0);
      expect(result?.minute).toBe(0);
    });

    it('should parse noon correctly', () => {
      const result = parseTimeString('12:00 PM');
      expect(result).toBeInstanceOf(DateTime);
      expect(result?.hour).toBe(12);
      expect(result?.minute).toBe(0);
    });

    it('should parse single digit hours', () => {
      const result = parseTimeString('9:30 AM');
      expect(result).toBeInstanceOf(DateTime);
      expect(result?.hour).toBe(9);
      expect(result?.minute).toBe(30);
    });

    it('should parse double digit hours', () => {
      const result = parseTimeString('09:30 AM');
      expect(result).toBeInstanceOf(DateTime);
      expect(result?.hour).toBe(9);
      expect(result?.minute).toBe(30);
    });

    it('should parse time without spaces', () => {
      const result = parseTimeString('2:30PM');
      expect(result).toBeInstanceOf(DateTime);
      expect(result?.hour).toBe(14);
      expect(result?.minute).toBe(30);
    });

    it('should return null for invalid time string', () => {
      const result = parseTimeString('invalid-time');
      expect(result).toBeNull();
    });

    it('should return null for empty string', () => {
      const result = parseTimeString('');
      expect(result).toBeNull();
    });

    it('should return null for non-string input', () => {
      const result = parseTimeString(null as unknown as string);
      expect(result).toBeNull();
    });

    it('should use specific format when provided', () => {
      const result = parseTimeString('2:30 PM', 'h:mm a');
      expect(result).toBeInstanceOf(DateTime);
      expect(result?.hour).toBe(14);
      expect(result?.minute).toBe(30);
    });

    it('should return null when specific format fails', () => {
      const result = parseTimeString('2:30 PM', 'HH:mm');
      expect(result).toBeNull();
    });
  });

  describe('parseTimeStringToDate', () => {
    it('should parse time string to Date with today as base', () => {
      const result = parseTimeStringToDate('2:30 PM');
      expect(result).toBeInstanceOf(Date);
      expect(result?.getHours()).toBe(14);
      expect(result?.getMinutes()).toBe(30);
      expect(result?.getDate()).toBe(20); // March 20, 2024
    });

    it('should parse time string to Date with custom base date', () => {
      const baseDate = new Date('2024-12-25T10:00:00Z');
      const result = parseTimeStringToDate('2:30 PM', baseDate);
      expect(result).toBeInstanceOf(Date);
      expect(result?.getHours()).toBe(14);
      expect(result?.getMinutes()).toBe(30);
      expect(result?.getDate()).toBe(25); // December 25, 2024
    });

    it('should parse 24-hour format to Date', () => {
      const result = parseTimeStringToDate('14:30');
      expect(result).toBeInstanceOf(Date);
      expect(result?.getHours()).toBe(14);
      expect(result?.getMinutes()).toBe(30);
    });

    it('should parse time with seconds to Date', () => {
      const result = parseTimeStringToDate('2:30:45 PM');
      expect(result).toBeInstanceOf(Date);
      expect(result?.getHours()).toBe(14);
      expect(result?.getMinutes()).toBe(30);
      expect(result?.getSeconds()).toBe(45);
    });

    it('should return null for invalid time string', () => {
      const result = parseTimeStringToDate('invalid-time');
      expect(result).toBeNull();
    });

    it('should return null for empty string', () => {
      const result = parseTimeStringToDate('');
      expect(result).toBeNull();
    });

    it('should use specific format when provided', () => {
      const result = parseTimeStringToDate('2:30 PM', new Date(), 'h:mm a');
      expect(result).toBeInstanceOf(Date);
      expect(result?.getHours()).toBe(14);
      expect(result?.getMinutes()).toBe(30);
    });
  });

  describe('getPartsFromDateTime', () => {
    it('should extract time parts from DateTime with 12-hour format', () => {
      const dt = DateTime.fromObject({ hour: 14, minute: 30, second: 45 });
      const result = getPartsFromDateTime({
        date: dt,
        use24Hour: false,
        showSeconds: false,
      });

      expect(result).toEqual({
        hr: '02',
        min: '30',
        sec: '45',
        period: 'PM',
        mil: '000',
        string: '02:30 PM',
      });
    });

    it('should extract time parts from DateTime with 24-hour format', () => {
      const dt = DateTime.fromObject({ hour: 14, minute: 30, second: 45 });
      const result = getPartsFromDateTime({
        date: dt,
        use24Hour: true,
        showSeconds: false,
      });

      expect(result).toEqual({
        hr: '14',
        min: '30',
        sec: '45',
        period: 'AM',
        mil: '000',
        string: '14:30',
      });
    });

    it('should extract time parts with seconds shown', () => {
      const dt = DateTime.fromObject({ hour: 14, minute: 30, second: 45 });
      const result = getPartsFromDateTime({
        date: dt,
        use24Hour: false,
        showSeconds: true,
      });

      expect(result).toEqual({
        hr: '02',
        min: '30',
        sec: '45',
        period: 'PM',
        mil: '000',
        string: '02:30:45 PM',
      });
    });

    it('should handle midnight correctly', () => {
      const dt = DateTime.fromObject({ hour: 0, minute: 0, second: 0 });
      const result = getPartsFromDateTime({
        date: dt,
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
      const dt = DateTime.fromObject({ hour: 12, minute: 0, second: 0 });
      const result = getPartsFromDateTime({
        date: dt,
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

    it('should handle milliseconds', () => {
      const dt = DateTime.fromObject({
        hour: 14,
        minute: 30,
        second: 45,
        millisecond: 123,
      });
      const result = getPartsFromDateTime({
        date: dt,
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
  });

  describe('getPartsFromDate', () => {
    it('should extract time parts from Date object with 12-hour format', () => {
      const date = new Date('2024-03-20T14:30:45.123Z');
      const result = getPartsFromDate({
        date,
        use24Hour: false,
        showSeconds: false,
      });

      const expected = getExpectedTimeParts(
        '2024-03-20T14:30:45.123Z',
        false,
        false,
      );
      expect(result).toEqual(expected);
    });

    it('should extract time parts from Date object with 24-hour format', () => {
      const date = new Date('2024-03-20T14:30:45.123Z');
      const result = getPartsFromDate({
        date,
        use24Hour: true,
        showSeconds: false,
      });

      const expected = getExpectedTimeParts(
        '2024-03-20T14:30:45.123Z',
        true,
        false,
      );
      expect(result).toEqual(expected);
    });

    it('should extract time parts from ISO string with 12-hour format', () => {
      const dateString = '2024-03-20T14:30:45.123Z';
      const result = getPartsFromDate({
        date: dateString,
        use24Hour: false,
        showSeconds: true,
      });

      const expected = getExpectedTimeParts(
        '2024-03-20T14:30:45.123Z',
        false,
        true,
      );
      expect(result).toEqual(expected);
    });

    it('should extract time parts from ISO string with 24-hour format and seconds', () => {
      const dateString = '2024-03-20T14:30:45.123Z';
      const result = getPartsFromDate({
        date: dateString,
        use24Hour: true,
        showSeconds: true,
      });

      const expected = getExpectedTimeParts(
        '2024-03-20T14:30:45.123Z',
        true,
        true,
      );
      expect(result).toEqual(expected);
    });

    it('should handle midnight correctly', () => {
      const date = new Date('2024-03-20T00:00:00.000Z');
      const result = getPartsFromDate({
        date,
        use24Hour: false,
        showSeconds: false,
      });

      const expected = getExpectedTimeParts(
        '2024-03-20T00:00:00.000Z',
        false,
        false,
      );
      expect(result).toEqual(expected);
    });

    it('should handle noon correctly', () => {
      const date = new Date('2024-03-20T12:00:00.000Z');
      const result = getPartsFromDate({
        date,
        use24Hour: false,
        showSeconds: false,
      });

      const expected = getExpectedTimeParts(
        '2024-03-20T12:00:00.000Z',
        false,
        false,
      );
      expect(result).toEqual(expected);
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

      const expected = getExpectedTimeParts(
        '2024-03-20T14:30:45.123Z',
        false,
        true,
      );
      expect(result).toEqual(expected);
    });

    it('should extract time parts from date ISO string with 24-hour format', () => {
      const result = getPartsFromTimeString({
        timeString: '2024-03-20T14:30:45.123Z',
        use24Hour: true,
        showSeconds: true,
      });

      const expected = getExpectedTimeParts(
        '2024-03-20T14:30:45.123Z',
        true,
        true,
      );
      expect(result).toEqual(expected);
    });

    it('should handle midnight in ISO string', () => {
      const result = getPartsFromTimeString({
        timeString: '2024-03-20T00:00:00.000Z',
        use24Hour: false,
        showSeconds: false,
      });

      const expected = getExpectedTimeParts(
        '2024-03-20T00:00:00.000Z',
        false,
        false,
      );
      expect(result).toEqual(expected);
    });

    it('should handle noon in ISO string', () => {
      const result = getPartsFromTimeString({
        timeString: '2024-03-20T12:00:00.000Z',
        use24Hour: false,
        showSeconds: false,
      });

      const expected = getExpectedTimeParts(
        '2024-03-20T12:00:00.000Z',
        false,
        false,
      );
      expect(result).toEqual(expected);
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

    it('should return default time for invalid input with 24-hour format', () => {
      const result = getPartsFromTimeString({
        timeString: 'invalid-time-string',
        use24Hour: true,
        showSeconds: false,
      });

      expect(result).toEqual({
        hr: '00',
        min: '00',
        sec: '00',
        period: 'AM',
        mil: '000',
        string: '00:00',
      });
    });

    it('should use specific format when provided', () => {
      const result = getPartsFromTimeString({
        timeString: '2:30 PM',
        format: 'h:mm a',
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
  });

  describe('getDateTimeFromParts', () => {
    it('should create DateTime from time parts with AM', () => {
      const time: Time = {
        hr: '09',
        min: '30',
        sec: '45',
        period: 'AM',
        mil: '123',
        string: '09:30:45 AM',
      };
      const result = getDateTimeFromParts({ time });

      expect(result).toBeInstanceOf(DateTime);
      expect(result.hour).toBe(9);
      expect(result.minute).toBe(30);
      expect(result.second).toBe(45);
      expect(result.millisecond).toBe(123);
    });

    it('should create DateTime from time parts with PM', () => {
      const time: Time = {
        hr: '02',
        min: '30',
        sec: '45',
        period: 'PM',
        mil: '123',
        string: '02:30:45 PM',
      };
      const result = getDateTimeFromParts({ time });

      expect(result).toBeInstanceOf(DateTime);
      expect(result.hour).toBe(14);
      expect(result.minute).toBe(30);
      expect(result.second).toBe(45);
      expect(result.millisecond).toBe(123);
    });

    it('should handle 12 PM correctly', () => {
      const time: Time = {
        hr: '12',
        min: '00',
        sec: '00',
        period: 'PM',
        mil: '000',
        string: '12:00 PM',
      };
      const result = getDateTimeFromParts({ time });

      expect(result).toBeInstanceOf(DateTime);
      expect(result.hour).toBe(12);
      expect(result.minute).toBe(0);
      expect(result.second).toBe(0);
    });

    it('should handle 12 AM correctly', () => {
      const time: Time = {
        hr: '12',
        min: '00',
        sec: '00',
        period: 'AM',
        mil: '000',
        string: '12:00 AM',
      };
      const result = getDateTimeFromParts({ time });

      expect(result).toBeInstanceOf(DateTime);
      expect(result.hour).toBe(0);
      expect(result.minute).toBe(0);
      expect(result.second).toBe(0);
    });

    it('should use custom base date', () => {
      const time: Time = {
        hr: '02',
        min: '30',
        sec: '45',
        period: 'PM',
        mil: '123',
        string: '02:30:45 PM',
      };
      const baseDate = new Date('2024-12-25T10:00:00Z');
      const result = getDateTimeFromParts({ time, baseDate });

      expect(result).toBeInstanceOf(DateTime);
      expect(result.hour).toBe(14);
      expect(result.minute).toBe(30);
      expect(result.second).toBe(45);
      expect(result.millisecond).toBe(123);
      expect(result.day).toBe(25);
      expect(result.month).toBe(12);
    });

    it('should handle time parts without seconds', () => {
      const time: Time = {
        hr: '02',
        min: '30',
        period: 'PM',
        mil: '123',
        string: '02:30 PM',
      };
      const result = getDateTimeFromParts({ time });

      expect(result).toBeInstanceOf(DateTime);
      expect(result.hour).toBe(14);
      expect(result.minute).toBe(30);
      expect(result.second).toBe(0);
      expect(result.millisecond).toBe(123);
    });

    it('should handle time parts without milliseconds', () => {
      const time: Time = {
        hr: '02',
        min: '30',
        sec: '45',
        period: 'PM',
        string: '02:30:45 PM',
      };
      const result = getDateTimeFromParts({ time });

      expect(result).toBeInstanceOf(DateTime);
      expect(result.hour).toBe(14);
      expect(result.minute).toBe(30);
      expect(result.second).toBe(45);
      expect(result.millisecond).toBe(0);
    });
  });

  describe('formatTimeString', () => {
    it('should format DateTime with 12-hour format', () => {
      const dt = DateTime.fromObject({ hour: 14, minute: 30 });
      const result = formatTimeString(dt, false, false);
      expect(result).toBe('02:30 PM');
    });

    it('should format DateTime with 24-hour format', () => {
      const dt = DateTime.fromObject({ hour: 14, minute: 30 });
      const result = formatTimeString(dt, true, false);
      expect(result).toBe('14:30');
    });

    it('should format DateTime with 12-hour format and seconds', () => {
      const dt = DateTime.fromObject({ hour: 14, minute: 30, second: 45 });
      const result = formatTimeString(dt, false, true);
      expect(result).toBe('02:30:45 PM');
    });

    it('should format DateTime with 24-hour format and seconds', () => {
      const dt = DateTime.fromObject({ hour: 14, minute: 30, second: 45 });
      const result = formatTimeString(dt, true, true);
      expect(result).toBe('14:30:45');
    });

    it('should handle midnight correctly', () => {
      const dt = DateTime.fromObject({ hour: 0, minute: 0 });
      const result = formatTimeString(dt, false, false);
      expect(result).toBe('12:00 AM');
    });

    it('should handle noon correctly', () => {
      const dt = DateTime.fromObject({ hour: 12, minute: 0 });
      const result = formatTimeString(dt, false, false);
      expect(result).toBe('12:00 PM');
    });
  });

  describe('formatTimeStringFromParts', () => {
    it('should format time parts with 12-hour format', () => {
      const time: Time = {
        hr: '02',
        min: '30',
        sec: '45',
        period: 'PM',
        mil: '123',
        string: '02:30:45 PM',
      };
      const result = formatTimeStringFromParts(time, false, false);
      expect(result).toBe('02:30 PM');
    });

    it('should format time parts with 24-hour format', () => {
      const time: Time = {
        hr: '14',
        min: '30',
        sec: '45',
        period: 'AM',
        mil: '123',
        string: '14:30:45',
      };
      const result = formatTimeStringFromParts(time, true, false);
      expect(result).toBe('14:30');
    });

    it('should format time parts with 12-hour format and seconds', () => {
      const time: Time = {
        hr: '02',
        min: '30',
        sec: '45',
        period: 'PM',
        mil: '123',
        string: '02:30:45 PM',
      };
      const result = formatTimeStringFromParts(time, false, true);
      expect(result).toBe('02:30:45 PM');
    });

    it('should format time parts with 24-hour format and seconds', () => {
      const time: Time = {
        hr: '14',
        min: '30',
        sec: '45',
        period: 'AM',
        mil: '123',
        string: '14:30:45',
      };
      const result = formatTimeStringFromParts(time, true, true);
      expect(result).toBe('14:30:45');
    });
  });

  describe('getTimeStringFromParts', () => {
    it('should format time parts with 12-hour format', () => {
      const time: Time = {
        hr: '02',
        min: '30',
        sec: '45',
        period: 'PM',
        mil: '123',
        string: '02:30:45 PM',
      };
      const result = getTimeStringFromParts(time, false, false);
      expect(result).toBe('02:30 PM');
    });

    it('should format time parts with 24-hour format', () => {
      const time: Time = {
        hr: '14',
        min: '30',
        sec: '45',
        period: 'AM',
        mil: '123',
        string: '14:30:45',
      };
      const result = getTimeStringFromParts(time, true, false);
      expect(result).toBe('14:30');
    });

    it('should format time parts with 12-hour format and seconds', () => {
      const time: Time = {
        hr: '02',
        min: '30',
        sec: '45',
        period: 'PM',
        mil: '123',
        string: '02:30:45 PM',
      };
      const result = getTimeStringFromParts(time, false, true);
      expect(result).toBe('02:30:45 PM');
    });

    it('should format time parts with 24-hour format and seconds', () => {
      const time: Time = {
        hr: '14',
        min: '30',
        sec: '45',
        period: 'AM',
        mil: '123',
        string: '14:30:45',
      };
      const result = getTimeStringFromParts(time, true, true);
      expect(result).toBe('14:30:45');
    });

    it('should handle missing seconds', () => {
      const time: Time = {
        hr: '02',
        min: '30',
        period: 'PM',
        mil: '123',
        string: '02:30 PM',
      };
      const result = getTimeStringFromParts(time, false, true);
      expect(result).toBe('02:30:00 PM');
    });

    it('should handle missing seconds in 24-hour format', () => {
      const time: Time = {
        hr: '14',
        min: '30',
        period: 'AM',
        mil: '123',
        string: '14:30',
      };
      const result = getTimeStringFromParts(time, true, true);
      expect(result).toBe('14:30:00');
    });
  });

  describe('getCurrentTime', () => {
    it('should get current time with 24-hour format', () => {
      const result = getCurrentTime({ use24Hour: true, showSeconds: false });

      expect(result).toHaveProperty('hr');
      expect(result).toHaveProperty('min');
      expect(result).toHaveProperty('sec');
      expect(result).toHaveProperty('period');
      expect(result).toHaveProperty('mil');
      expect(result).toHaveProperty('string');

      // Get expected time based on current timezone
      const expected = getExpectedTimeParts(now.toISOString(), true, false);
      expect(result.hr).toBe(expected.hr);
      expect(result.min).toBe(expected.min);
      expect(result.period).toBe(expected.period);
    });

    it('should get current time with 12-hour format', () => {
      const result = getCurrentTime({ use24Hour: false, showSeconds: false });

      expect(result).toHaveProperty('hr');
      expect(result).toHaveProperty('min');
      expect(result).toHaveProperty('sec');
      expect(result).toHaveProperty('period');
      expect(result).toHaveProperty('mil');
      expect(result).toHaveProperty('string');

      // Get expected time based on current timezone
      const expected = getExpectedTimeParts(now.toISOString(), false, false);
      expect(result.hr).toBe(expected.hr);
      expect(result.min).toBe(expected.min);
      expect(result.period).toBe(expected.period);
    });

    it('should get current time with seconds', () => {
      const result = getCurrentTime({ use24Hour: true, showSeconds: true });

      expect(result).toHaveProperty('sec');
      expect(result.string).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    it('should get current time with default options', () => {
      const result = getCurrentTime();

      expect(result).toHaveProperty('hr');
      expect(result).toHaveProperty('min');
      expect(result).toHaveProperty('sec');
      expect(result).toHaveProperty('period');
      expect(result).toHaveProperty('mil');
      expect(result).toHaveProperty('string');

      // Get expected time based on current timezone (default is 24-hour format)
      const expected = getExpectedTimeParts(now.toISOString(), true, false);
      expect(result.hr).toBe(expected.hr);
      expect(result.min).toBe(expected.min);
      expect(result.period).toBe(expected.period);
    });

    it('should get current time with 12-hour format and seconds', () => {
      const result = getCurrentTime({ use24Hour: false, showSeconds: true });

      expect(result).toHaveProperty('sec');
      expect(result.string).toMatch(/^\d{2}:\d{2}:\d{2} [AP]M$/);
    });
  });
});
