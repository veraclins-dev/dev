// ============================================================================
// ADMIN API UTILITIES
// ============================================================================

import { getDateRange } from '@veraclins-dev/utils';

import { type DateRangeValue } from '../../../common/types';

export const getPeriod = (period: DateRangeValue) => {
  const defaultPeriod = getDateRange({ from: 'Last 7 days' });
  const from = period.from ? period.from : defaultPeriod.from;
  const to = period.to ? period.to : defaultPeriod.to;
  const start = new Date(from);
  const end = new Date(to);
  return { start, end };
};

export function calculateGrowth(current: number, previous: number): number {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return Math.round(((current - previous) / previous) * 100);
}

export function toNumber(value: unknown): number {
  return Number(value || 0);
}

/**
 * Transforms a metrics object by converting all values to numbers
 * Maps keys from source object to target object keys
 */
export function transformMetrics<T extends Record<string, unknown>>(
  metrics: Record<string, unknown>,
  keyMap: Record<keyof T, string>,
): T {
  const result = {} as T;
  for (const [targetKey, sourceKey] of Object.entries(keyMap)) {
    result[targetKey as keyof T] = toNumber(metrics[sourceKey]) as T[keyof T];
  }
  return result;
}

// ============================================================================
// CHART DATA UTILITIES
// ============================================================================

export const generateChartIntervals = (start: Date, end: Date) => {
  const totalDuration = end.getTime() - start.getTime();
  const days = Math.ceil(totalDuration / (1000 * 60 * 60 * 24));
  let intervals: number;
  let intervalDuration: number;
  let labelFormat: Intl.DateTimeFormatOptions;

  switch (true) {
    case days <= 1: {
      intervals = 12;
      intervalDuration = 2 * 60 * 60 * 1000;
      labelFormat = { hour: 'numeric', minute: '2-digit' };
      break;
    }
    case days <= 2: {
      intervals = 12;
      intervalDuration = 4 * 60 * 60 * 1000;
      labelFormat = { hour: 'numeric', minute: '2-digit' };
      break;
    }
    case days <= 7: {
      intervals = Math.min(days, 7);
      intervalDuration = 24 * 60 * 60 * 1000;
      labelFormat = { weekday: 'short' };
      break;
    }
    case days <= 14: {
      intervals = 7;
      intervalDuration = totalDuration / intervals;
      labelFormat = { month: 'short', day: 'numeric' };
      break;
    }
    case days <= 30: {
      intervals = 10;
      intervalDuration = totalDuration / intervals;
      labelFormat = { month: 'short', day: 'numeric' };
      break;
    }
    case days <= 60: {
      intervals = 12;
      intervalDuration = totalDuration / intervals;
      labelFormat = { month: 'short', day: 'numeric' };
      break;
    }
    case days <= 90: {
      intervals = 10;
      intervalDuration = totalDuration / intervals;
      labelFormat = { month: 'short', day: 'numeric' };
      break;
    }
    case days <= 180: {
      intervals = 12;
      intervalDuration = totalDuration / intervals;
      labelFormat = { month: 'short', day: 'numeric' };
      break;
    }
    case days <= 365: {
      intervals = 12;
      intervalDuration = totalDuration / intervals;
      labelFormat = { month: 'short', day: 'numeric' };
      break;
    }
    case days <= 730: {
      intervals = 10;
      intervalDuration = totalDuration / intervals;
      labelFormat = { month: 'short', year: '2-digit' };
      break;
    }
    default: {
      intervals = 12;
      intervalDuration = totalDuration / intervals;
      labelFormat = { month: 'short', year: '2-digit' };
      break;
    }
  }

  return {
    intervals,
    intervalDuration,
    labelFormat,
  };
};

export const getTruncUnitFromFormat = (
  format: Intl.DateTimeFormatOptions,
): string => {
  if (format.hour) return 'hour';
  if (format.weekday) return 'day';
  if (format.month && format.year) return 'month';
  return 'day';
};

export const getDataByIntervals = async <
  T extends { bucket_start: Date | null; bucket_end: Date | null },
>(
  start: Date,
  end: Date,
  sqlQuery: (start: Date, end: Date, interval: string) => Promise<T[]>,
  dataMapper: (row: T) => (number | null)[],
) => {
  const { intervals, labelFormat, intervalDuration } = generateChartIntervals(
    start,
    end,
  );

  const intervalMs = intervalDuration;
  const intervalString =
    intervalMs < 60 * 60 * 1000
      ? `${Math.round(intervalMs / (60 * 1000))} minutes`
      : intervalMs < 24 * 60 * 60 * 1000
        ? `${Math.round(intervalMs / (60 * 60 * 1000))} hours`
        : `${Math.round(intervalMs / (24 * 60 * 60 * 1000))} days`;

  const intervalConfig = {
    interval: intervalString,
    truncUnit: getTruncUnitFromFormat(labelFormat),
  };

  const sqlData = await sqlQuery(start, end, intervalConfig.interval);

  const data = sqlData.map(dataMapper);

  const labels = sqlData.map((row) => {
    if (!row.bucket_start || !row.bucket_end)
      return { label: '', start: '', end: '' };

    const start = row.bucket_start.getTime();
    const end = row.bucket_end.getTime();
    const middleTime = (start + end) / 2;
    const middleDate = new Date(middleTime);

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (labelFormat.hour) {
      return {
        label: middleDate.toLocaleTimeString('en-US', labelFormat),
        start: startDate.toLocaleTimeString('en-US', labelFormat),
        end: endDate.toLocaleTimeString('en-US', labelFormat),
      };
    } else {
      const dateFormat = { ...labelFormat };
      delete dateFormat.hour;
      delete dateFormat.minute;
      return {
        label: middleDate.toLocaleDateString('en-US', dateFormat),
        start: startDate.toLocaleDateString('en-US', dateFormat),
        end: endDate.toLocaleDateString('en-US', dateFormat),
      };
    }
  });

  return { data, labels, intervals };
};
