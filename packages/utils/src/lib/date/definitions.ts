export type HourFormat = '12h' | '24h';
/**
 * Time format options for time picker
 */
export type TimeFormat =
  | '12h'
  | '24h'
  | '12h-with-seconds'
  | '24h-with-seconds';

/**
 * Time picker configuration options
 */
export interface TimePickerConfig {
  format?: TimeFormat;
  minuteStep?: number;
  showSeconds?: boolean;
  secondStep?: number;
  minTime?: string;
  maxTime?: string;
  disabledTimes?: string[];
  locale?: string;
  timezone?: string;
}

export type Hour =
  | '00'
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23';

export type Minute =
  | '00'
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'
  | '31'
  | '32'
  | '33'
  | '34'
  | '35'
  | '36'
  | '37'
  | '38'
  | '39'
  | '40'
  | '41'
  | '42'
  | '43'
  | '44'
  | '45'
  | '46'
  | '47'
  | '48'
  | '49'
  | '50'
  | '51'
  | '52'
  | '53'
  | '54'
  | '55'
  | '56'
  | '57'
  | '58'
  | '59';

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type Millisecond = `${Digit}${Digit}${Digit}`;

export type Time = {
  hr: Hour;
  min: Minute;
  sec?: Minute;
  mil?: Millisecond;
  period: Period;
  string: string;
};

export type Period = 'AM' | 'PM';

/**
 * Pattern categories for smart filtering
 */
export type PatternCategory =
  | '12h-complete' // Complete 12-hour formats
  | '24h-complete' // Complete 24-hour formats
  | '12h-partial' // Partial 12-hour formats
  | '24h-partial' // Partial 24-hour formats
  | 'single-digit' // Single digit formats
  | 'edge-cases'; // Edge cases like just hours

/**
 * Enhanced pattern with categorization for smart filtering
 */
export interface CategorizedPattern {
  pattern: string;
  example: string;
  category: PatternCategory;
  hasSeconds: boolean;
  hasPeriod: boolean;
  is24Hour: boolean;
  length: number;
  colonCount: number;
}

/**
 * Categorized patterns for smart filtering
 */
export const CATEGORIZED_PATTERNS: CategorizedPattern[] = [
  // 12-hour complete formats with seconds
  {
    pattern: 'h:mm:ss a',
    example: '2:30:45 pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 10, // '2:30:45 pm' = 10 chars
    colonCount: 2,
  },
  {
    pattern: 'h:mm:ssa',
    example: '2:30:45pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9, // '2:30:45pm' = 9 chars
    colonCount: 2,
  },
  {
    pattern: 'h:m:ss a',
    example: '2:3:45 pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9, // '2:3:45 pm' = 9 chars
    colonCount: 2,
  },
  {
    pattern: 'h:m:ssa',
    example: '2:3:45pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8, // '2:3:45pm' = 8 chars
    colonCount: 2,
  },
  {
    pattern: 'h:mm:s a',
    example: '2:30:4 pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9, // '2:30:4 pm' = 9 chars
    colonCount: 2,
  },
  {
    pattern: 'h:mm:sa',
    example: '2:30:4pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8, // '2:30:4pm' = 8 chars
    colonCount: 2,
  },
  {
    pattern: 'h:m:s a',
    example: '2:3:4 pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8, // '2:3:4 pm' = 8 chars
    colonCount: 2,
  },
  {
    pattern: 'h:m:sa',
    example: '2:3:4pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7, // '2:3:4pm' = 7 chars
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:ss a',
    example: '02:30:45 pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 11, // '02:30:45 pm' = 11 chars
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:ssa',
    example: '02:30:45pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 10, // '02:30:45pm' = 10 chars
    colonCount: 2,
  },
  {
    pattern: 'hh:m:ss a',
    example: '02:3:45 pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 10, // '02:3:45 pm' = 10 chars
    colonCount: 2,
  },
  {
    pattern: 'hh:m:ssa',
    example: '02:3:45pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9, // '02:3:45pm' = 9 chars
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:s a',
    example: '02:30:4 pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 10, // '02:30:4 pm' = 10 chars
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:sa',
    example: '02:30:4pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9, // '02:30:4pm' = 9 chars
    colonCount: 2,
  },
  {
    pattern: 'hh:m:s a',
    example: '02:3:4 pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9, // '02:3:4 pm' = 9 chars
    colonCount: 2,
  },
  {
    pattern: 'hh:m:sa',
    example: '02:3:4pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8, // '02:3:4pm' = 8 chars
    colonCount: 2,
  },
  // 12-hour complete formats without seconds
  {
    pattern: 'h:mm a',
    example: '2:30 pm',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 7, // '2:30 pm' = 7 chars
    colonCount: 1,
  },
  {
    pattern: 'h:mma',
    example: '2:30pm',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6, // '2:30pm' = 6 chars
    colonCount: 1,
  },
  {
    pattern: 'h:m a',
    example: '2:3 pm',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6, // '2:3 pm' = 6 chars
    colonCount: 1,
  },
  {
    pattern: 'h:ma',
    example: '2:3pm',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5, // '2:3pm' = 5 chars
    colonCount: 1,
  },
  {
    pattern: 'hh:mm a',
    example: '02:30 pm',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 8, // '02:30 pm' = 8 chars
    colonCount: 1,
  },
  {
    pattern: 'hh:mma',
    example: '02:30pm',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 7, // '02:30pm' = 7 chars
    colonCount: 1,
  },
  {
    pattern: 'hh:m a',
    example: '02:3 pm',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 7, // '02:3 pm' = 7 chars
    colonCount: 1,
  },
  {
    pattern: 'hh:ma',
    example: '02:3pm',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6, // '02:3pm' = 6 chars
    colonCount: 1,
  },
  // 12-hour partial formats - missing minutes
  {
    pattern: 'h: a',
    example: '2: pm',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5, // '2: pm' = 5 chars
    colonCount: 1,
  },
  {
    pattern: 'h:a',
    example: '2:pm',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4, // '2:pm' = 4 chars
    colonCount: 1,
  },
  {
    pattern: 'hh: a',
    example: '02: pm',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6, // '02: pm' = 6 chars
    colonCount: 1,
  },
  {
    pattern: 'hh:a',
    example: '02:pm',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5, // '02:pm' = 5 chars
    colonCount: 1,
  },
  // 12-hour partial formats - missing seconds
  {
    pattern: 'h:mm: a',
    example: '2:30: pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8, // '2:30: pm' = 8 chars
    colonCount: 2,
  },
  {
    pattern: 'h:mm:a',
    example: '2:30:pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7, // '2:30:pm' = 7 chars
    colonCount: 2,
  },
  {
    pattern: 'h:m: a',
    example: '2:3: pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7, // '2:3: pm' = 7 chars
    colonCount: 2,
  },
  {
    pattern: 'h:m:a',
    example: '2:3:pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 6, // '2:3:pm' = 6 chars
    colonCount: 2,
  },
  {
    pattern: 'hh:mm: a',
    example: '02:30: pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9, // '02:30: pm' = 9 chars
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:a',
    example: '02:30:pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8, // '02:30:pm' = 8 chars
    colonCount: 2,
  },
  {
    pattern: 'hh:m: a',
    example: '02:3: pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8, // '02:3: pm' = 8 chars
    colonCount: 2,
  },
  {
    pattern: 'hh:m:a',
    example: '02:3:pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7, // '02:3:pm' = 7 chars
    colonCount: 2,
  },
  // 24-hour complete formats with seconds
  {
    pattern: 'H:mm:ss',
    example: '14:30:45',
    category: '24h-complete',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 8, // '14:30:45' = 8 chars
    colonCount: 2,
  },
  {
    pattern: 'H:m:ss',
    example: '14:3:45',
    category: '24h-complete',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 7, // '14:3:45' = 7 chars
    colonCount: 2,
  },
  {
    pattern: 'H:mm:s',
    example: '14:30:4',
    category: '24h-complete',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 7, // '14:30:4' = 7 chars
    colonCount: 2,
  },
  {
    pattern: 'H:m:s',
    example: '14:3:4',
    category: '24h-complete',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 6, // '14:3:4' = 6 chars
    colonCount: 2,
  },
  {
    pattern: 'HH:mm:ss',
    example: '14:30:45',
    category: '24h-complete',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 8, // '14:30:45' = 8 chars
    colonCount: 2,
  },
  {
    pattern: 'HH:m:ss',
    example: '14:3:45',
    category: '24h-complete',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 7, // '14:3:45' = 7 chars
    colonCount: 2,
  },
  {
    pattern: 'HH:mm:s',
    example: '14:30:4',
    category: '24h-complete',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 7, // '14:30:4' = 7 chars
    colonCount: 2,
  },
  {
    pattern: 'HH:m:s',
    example: '14:3:4',
    category: '24h-complete',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 6, // '14:3:4' = 6 chars
    colonCount: 2,
  },
  // 24-hour complete formats without seconds
  {
    pattern: 'H:mm',
    example: '14:30',
    category: '24h-complete',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 5, // '14:30' = 5 chars
    colonCount: 1,
  },
  {
    pattern: 'H:m',
    example: '14:3',
    category: '24h-complete',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 4, // '14:3' = 4 chars
    colonCount: 1,
  },
  {
    pattern: 'HH:mm',
    example: '14:30',
    category: '24h-complete',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 5, // '14:30' = 5 chars
    colonCount: 1,
  },
  {
    pattern: 'HH:m',
    example: '14:3',
    category: '24h-complete',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 4, // '14:3' = 4 chars
    colonCount: 1,
  },
  // 24-hour partial formats - missing minutes
  {
    pattern: 'H:',
    example: '14:',
    category: '24h-partial',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 3, // '14:' = 3 chars
    colonCount: 1,
  },
  {
    pattern: 'HH:',
    example: '14:',
    category: '24h-partial',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 3, // '14:' = 3 chars
    colonCount: 1,
  },
  // 24-hour partial formats - missing seconds
  {
    pattern: 'H:mm:',
    example: '14:30:',
    category: '24h-partial',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 6, // '14:30:' = 6 chars
    colonCount: 2,
  },
  {
    pattern: 'H:m:',
    example: '14:3:',
    category: '24h-partial',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 5, // '14:3:' = 5 chars
    colonCount: 2,
  },
  {
    pattern: 'HH:mm:',
    example: '14:30:',
    category: '24h-partial',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 6, // '14:30:' = 6 chars
    colonCount: 2,
  },
  {
    pattern: 'HH:m:',
    example: '14:3:',
    category: '24h-partial',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 5, // '14:3:' = 5 chars
    colonCount: 2,
  },
  // Edge cases
  {
    pattern: 'h a',
    example: '2 pm',
    category: 'edge-cases',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4, // '2 pm' = 4 chars
    colonCount: 0,
  },
  {
    pattern: 'ha',
    example: '2pm',
    category: 'edge-cases',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 3, // '2pm' = 3 chars
    colonCount: 0,
  },
  {
    pattern: 'hh a',
    example: '02 pm',
    category: 'edge-cases',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5, // '02 pm' = 5 chars
    colonCount: 0,
  },
  {
    pattern: 'hha',
    example: '02pm',
    category: 'edge-cases',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4, // '02pm' = 4 chars
    colonCount: 0,
  },
  // Single-digit formats
  {
    pattern: 'h',
    example: '2',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: false,
    length: 1, // '2' = 1 char
    colonCount: 0,
  },
  {
    pattern: 'hh',
    example: '02',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: false,
    length: 2, // '02' = 2 chars
    colonCount: 0,
  },
  {
    pattern: 'H',
    example: '14',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 2, // '14' = 2 chars
    colonCount: 0,
  },
  {
    pattern: 'HH',
    example: '14',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 2, // '14' = 2 chars
    colonCount: 0,
  },
  {
    pattern: 'm',
    example: '30',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: false,
    length: 2, // '30' = 2 chars
    colonCount: 0,
  },
  {
    pattern: 'mm',
    example: '30',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: false,
    length: 2, // '30' = 2 chars
    colonCount: 0,
  },
  {
    pattern: 's',
    example: '45',
    category: 'single-digit',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: false,
    length: 2, // '45' = 2 chars
    colonCount: 0,
  },
  {
    pattern: 'ss',
    example: '45',
    category: 'single-digit',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: false,
    length: 2, // '45' = 2 chars
    colonCount: 0,
  },
  {
    pattern: 'a',
    example: 'pm',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 2, // 'pm' = 2 chars
    colonCount: 0,
  },
] as const;

/**
 * Type-safe time format patterns
 */
export type TimeFormatPattern =
  (typeof CATEGORIZED_PATTERNS)[number]['pattern'];

/**
 * Pre-computed pattern index for O(1) lookups
 * Built once at module load time
 */
const PATTERN_INDEX = (() => {
  const index = new Map<string, CategorizedPattern[]>();

  CATEGORIZED_PATTERNS.forEach((pattern) => {
    const key = `${pattern.length}-${pattern.colonCount}-${pattern.hasPeriod}-${pattern.hasSeconds}-${pattern.is24Hour}`;
    if (!index.has(key)) index.set(key, []);
    index.get(key)?.push(pattern);
  });

  return index;
})();

/**
 * Analyze the structure of a time input string
 */
interface TimeStructure {
  hourFormat: 'single' | 'double' | 'unknown';
  minuteFormat: 'single' | 'double' | 'unknown';
  secondFormat: 'single' | 'double' | 'unknown';
  hasPeriod: boolean;
  hasSeconds: boolean;
  colonCount: number;
  is24Hour: boolean;
}

/**
 * Analyze the structure of a time input string
 */
const analyzeTimeStructure = (normalized: string): TimeStructure => {
  const parts = normalized.split(':');
  const colonCount = parts.length - 1;

  // Analyze hour format
  let hourFormat: 'single' | 'double' | 'unknown' = 'unknown';
  if (parts[0]) {
    if (parts[0].length === 1) {
      hourFormat = 'single';
    } else if (parts[0].length === 2) {
      hourFormat = 'double';
    }
  }

  // Analyze minute format
  let minuteFormat: 'single' | 'double' | 'unknown' = 'unknown';
  if (parts[1]) {
    const minutePart = parts[1].replace(/[ap]m/i, '').trim();
    if (minutePart.length === 1) {
      minuteFormat = 'single';
    } else if (minutePart.length === 2) {
      minuteFormat = 'double';
    }
  }

  // Analyze second format
  let secondFormat: 'single' | 'double' | 'unknown' = 'unknown';
  if (parts[2]) {
    const secondPart = parts[2].replace(/[ap]m/i, '').trim();
    if (secondPart.length === 1) {
      secondFormat = 'single';
    } else if (secondPart.length === 2) {
      secondFormat = 'double';
    }
  }

  const hasPeriod = /[ap]m/i.test(normalized);
  const hasSeconds = colonCount >= 2;

  // Determine if 24-hour format
  let is24Hour = !hasPeriod;
  if (hasPeriod && parts[0]) {
    const hour = parseInt(parts[0], 10);
    is24Hour = hour > 12 && !hasPeriod; // Only consider 24-hour if hour > 12 and no period
  }

  return {
    hourFormat,
    minuteFormat,
    secondFormat,
    hasPeriod,
    hasSeconds,
    colonCount,
    is24Hour,
  };
};

/**
 * Check if a pattern is compatible with the input structure
 */
const isPatternCompatible = (
  pattern: string,
  structure: TimeStructure,
): boolean => {
  // Extract format parts from pattern
  const patternParts = pattern.split(':');

  // Check hour format compatibility
  if (structure.hourFormat !== 'unknown') {
    const patternHour = patternParts[0];
    if (structure.hourFormat === 'single' && patternHour.startsWith('hh')) {
      return false; // Single-digit input with double-digit pattern
    }
    if (structure.hourFormat === 'double' && patternHour === 'h') {
      return false; // Double-digit input with single-digit pattern
    }
  }

  // Check minute format compatibility
  if (structure.minuteFormat !== 'unknown' && patternParts[1]) {
    const patternMinute = patternParts[1].replace(/[ap]m?/i, '');
    if (structure.minuteFormat === 'single' && patternMinute.startsWith('mm')) {
      return false; // Single-digit minutes with double-digit pattern
    }
    if (structure.minuteFormat === 'double' && patternMinute === 'm') {
      return false; // Double-digit minutes with single-digit pattern
    }
  }

  // Check second format compatibility
  if (structure.secondFormat !== 'unknown' && patternParts[2]) {
    const patternSecond = patternParts[2].replace(/[ap]m?/i, '');
    if (structure.secondFormat === 'single' && patternSecond.startsWith('ss')) {
      return false; // Single-digit seconds with double-digit pattern
    }
    if (structure.secondFormat === 'double' && patternSecond === 's') {
      return false; // Double-digit seconds with single-digit pattern
    }
  }

  return true;
};

/**
 * Smart pattern filtering based on input structure analysis
 * Optimized to match patterns based on actual input format
 */
export const getFilteredPatterns = (
  input: string,
  use24Hour?: boolean,
  showSeconds?: boolean,
): CategorizedPattern[] => {
  // Preprocess input to handle partial periods
  const normalized = input.trim().toLowerCase();
  const originalLength = normalized.length;

  const length = normalized.length;

  // Early exit for obvious cases
  if (length === 0) return [];
  if (length > 20) return []; // No pattern is this long
  if (normalized.split(':').length > 3) return []; // No pattern has more than 2 colons

  // Handle period-only input
  if (normalized === 'am' || normalized === 'pm') {
    return CATEGORIZED_PATTERNS.filter((p) => p.pattern === 'a');
  }

  // Analyze the input structure
  const structure = analyzeTimeStructure(normalized);

  // Override structure analysis with provided parameters when available
  if (use24Hour !== undefined) {
    structure.is24Hour = use24Hour;
    if (use24Hour) structure.hasPeriod = false; // Force no period for 24-hour format
  }
  if (showSeconds !== undefined) {
    structure.hasSeconds = showSeconds;
  }

  // Use pattern index for O(1) lookup
  const key = `${length}-${structure.colonCount}-${structure.hasPeriod}-${structure.hasSeconds}-${structure.is24Hour}`;
  const exactMatches = PATTERN_INDEX.get(key) || [];

  // Filter exact matches by structure compatibility
  const compatibleExactMatches = exactMatches.filter((pattern) =>
    isPatternCompatible(pattern.pattern, structure),
  );

  if (compatibleExactMatches.length > 0) {
    return compatibleExactMatches;
  }

  // Fallback to filtering all patterns with structure-based compatibility
  return CATEGORIZED_PATTERNS.filter((pattern) => {
    // Allow wider length range due to preprocessing
    if (pattern.length < originalLength - 3 || pattern.length > length + 3) {
      return false;
    }
    if (pattern.colonCount !== structure.colonCount) {
      return false;
    }
    if (pattern.hasPeriod !== structure.hasPeriod) {
      return false;
    }
    if (pattern.hasSeconds !== structure.hasSeconds) {
      return false;
    }
    if (pattern.is24Hour !== structure.is24Hour) {
      return false;
    }

    // Structure-based compatibility check
    return isPatternCompatible(pattern.pattern, structure);
  });
};

export const timeUtil = {
  '12h': 'hh:mm a',
  '24h': 'HH:mm',
  '12h-with-seconds': 'hh:mm:ss a',
  '24h-with-seconds': 'HH:mm:ss',
} as const;

/**
 * Date format categories for smart filtering
 */
export type DatePatternCategory =
  | 'iso-complete' // Complete ISO formats
  | 'iso-partial' // Partial ISO formats
  | 'numeric-complete' // Complete numeric formats
  | 'numeric-partial' // Partial numeric formats
  | 'text-complete' // Complete text formats
  | 'text-partial' // Partial text formats
  | 'edge-cases'; // Edge cases like just year

/**
 * Enhanced date pattern with categorization for smart filtering
 */
export interface CategorizedDatePattern {
  pattern: string;
  example: string;
  category: DatePatternCategory;
  hasYear: boolean;
  hasMonth: boolean;
  hasDay: boolean;
  isISO: boolean;
  isNumeric: boolean;
  isText: boolean;
  length: number;
  separatorCount: number;
  separatorType: 'slash' | 'dash' | 'space' | 'comma' | 'none';
}

/**
 * Categorized date patterns for smart filtering
 */
export const CATEGORIZED_DATE_PATTERNS: CategorizedDatePattern[] = [
  // ISO complete formats
  {
    pattern: 'yyyy-MM-dd',
    example: '2023-12-25',
    category: 'iso-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: true,
    isNumeric: true,
    isText: false,
    length: 10,
    separatorCount: 2,
    separatorType: 'dash',
  },
  {
    pattern: 'yyyy-M-d',
    example: '2023-12-5',
    category: 'iso-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: true,
    isNumeric: true,
    isText: false,
    length: 8,
    separatorCount: 2,
    separatorType: 'dash',
  },
  // ISO partial formats
  {
    pattern: 'yyyy-MM',
    example: '2023-12',
    category: 'iso-partial',
    hasYear: true,
    hasMonth: true,
    hasDay: false,
    isISO: true,
    isNumeric: true,
    isText: false,
    length: 7,
    separatorCount: 1,
    separatorType: 'dash',
  },
  {
    pattern: 'yyyy',
    example: '2023',
    category: 'iso-partial',
    hasYear: true,
    hasMonth: false,
    hasDay: false,
    isISO: true,
    isNumeric: true,
    isText: false,
    length: 4,
    separatorCount: 0,
    separatorType: 'none',
  },
  // Numeric complete formats - DD/MM/YYYY
  {
    pattern: 'dd/MM/yyyy',
    example: '25/12/2023',
    category: 'numeric-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 10,
    separatorCount: 2,
    separatorType: 'slash',
  },
  {
    pattern: 'd/M/yyyy',
    example: '5/12/2023',
    category: 'numeric-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 8,
    separatorCount: 2,
    separatorType: 'slash',
  },
  {
    pattern: 'dd/MM/yy',
    example: '25/12/23',
    category: 'numeric-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 8,
    separatorCount: 2,
    separatorType: 'slash',
  },
  {
    pattern: 'd/M/yy',
    example: '5/12/23',
    category: 'numeric-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 6,
    separatorCount: 2,
    separatorType: 'slash',
  },
  // Numeric complete formats - MM/DD/YYYY (US format)
  {
    pattern: 'MM/dd/yyyy',
    example: '12/25/2023',
    category: 'numeric-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 10,
    separatorCount: 2,
    separatorType: 'slash',
  },
  {
    pattern: 'M/d/yyyy',
    example: '12/5/2023',
    category: 'numeric-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 8,
    separatorCount: 2,
    separatorType: 'slash',
  },
  {
    pattern: 'MM/dd/yy',
    example: '12/25/23',
    category: 'numeric-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 8,
    separatorCount: 2,
    separatorType: 'slash',
  },
  {
    pattern: 'M/d/yy',
    example: '12/5/23',
    category: 'numeric-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 6,
    separatorCount: 2,
    separatorType: 'slash',
  },
  // Numeric partial formats
  {
    pattern: 'dd/MM',
    example: '25/12',
    category: 'numeric-partial',
    hasYear: false,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 5,
    separatorCount: 1,
    separatorType: 'slash',
  },
  {
    pattern: 'd/M',
    example: '5/12',
    category: 'numeric-partial',
    hasYear: false,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 3,
    separatorCount: 1,
    separatorType: 'slash',
  },
  {
    pattern: 'MM/dd',
    example: '12/25',
    category: 'numeric-partial',
    hasYear: false,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 5,
    separatorCount: 1,
    separatorType: 'slash',
  },
  {
    pattern: 'M/d',
    example: '12/5',
    category: 'numeric-partial',
    hasYear: false,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 3,
    separatorCount: 1,
    separatorType: 'slash',
  },
  // Text complete formats
  {
    pattern: 'dd MMM yyyy',
    example: '25 Dec 2023',
    category: 'text-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: false,
    isText: true,
    length: 11,
    separatorCount: 2,
    separatorType: 'space',
  },
  {
    pattern: 'd MMM yyyy',
    example: '5 Dec 2023',
    category: 'text-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: false,
    isText: true,
    length: 9,
    separatorCount: 2,
    separatorType: 'space',
  },
  {
    pattern: 'MMM dd, yyyy',
    example: 'Dec 25, 2023',
    category: 'text-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: false,
    isText: true,
    length: 12,
    separatorCount: 2,
    separatorType: 'comma',
  },
  {
    pattern: 'MMM d, yyyy',
    example: 'Dec 5, 2023',
    category: 'text-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: false,
    isText: true,
    length: 10,
    separatorCount: 2,
    separatorType: 'comma',
  },
  {
    pattern: 'dd MMMM yyyy',
    example: '25 December 2023',
    category: 'text-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: false,
    isText: true,
    length: 16,
    separatorCount: 2,
    separatorType: 'space',
  },
  {
    pattern: 'd MMMM yyyy',
    example: '5 December 2023',
    category: 'text-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: false,
    isText: true,
    length: 14,
    separatorCount: 2,
    separatorType: 'space',
  },
  {
    pattern: 'MMMM dd, yyyy',
    example: 'December 25, 2023',
    category: 'text-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: false,
    isText: true,
    length: 17,
    separatorCount: 2,
    separatorType: 'comma',
  },
  {
    pattern: 'MMMM d, yyyy',
    example: 'December 5, 2023',
    category: 'text-complete',
    hasYear: true,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: false,
    isText: true,
    length: 15,
    separatorCount: 2,
    separatorType: 'comma',
  },
  // Text partial formats
  {
    pattern: 'dd MMM',
    example: '25 Dec',
    category: 'text-partial',
    hasYear: false,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: false,
    isText: true,
    length: 6,
    separatorCount: 1,
    separatorType: 'space',
  },
  {
    pattern: 'd MMM',
    example: '5 Dec',
    category: 'text-partial',
    hasYear: false,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: false,
    isText: true,
    length: 4,
    separatorCount: 1,
    separatorType: 'space',
  },
  {
    pattern: 'MMM dd',
    example: 'Dec 25',
    category: 'text-partial',
    hasYear: false,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: false,
    isText: true,
    length: 6,
    separatorCount: 1,
    separatorType: 'space',
  },
  {
    pattern: 'MMM d',
    example: 'Dec 5',
    category: 'text-partial',
    hasYear: false,
    hasMonth: true,
    hasDay: true,
    isISO: false,
    isNumeric: false,
    isText: true,
    length: 4,
    separatorCount: 1,
    separatorType: 'space',
  },
  // Edge cases
  {
    pattern: 'yyyy',
    example: '2023',
    category: 'edge-cases',
    hasYear: true,
    hasMonth: false,
    hasDay: false,
    isISO: true,
    isNumeric: true,
    isText: false,
    length: 4,
    separatorCount: 0,
    separatorType: 'none',
  },
  {
    pattern: 'MM',
    example: '12',
    category: 'edge-cases',
    hasYear: false,
    hasMonth: true,
    hasDay: false,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 2,
    separatorCount: 0,
    separatorType: 'none',
  },
  {
    pattern: 'M',
    example: '12',
    category: 'edge-cases',
    hasYear: false,
    hasMonth: true,
    hasDay: false,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 1,
    separatorCount: 0,
    separatorType: 'none',
  },
  {
    pattern: 'dd',
    example: '25',
    category: 'edge-cases',
    hasYear: false,
    hasMonth: false,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 2,
    separatorCount: 0,
    separatorType: 'none',
  },
  {
    pattern: 'd',
    example: '5',
    category: 'edge-cases',
    hasYear: false,
    hasMonth: false,
    hasDay: true,
    isISO: false,
    isNumeric: true,
    isText: false,
    length: 1,
    separatorCount: 0,
    separatorType: 'none',
  },
] as const;

/**
 * Type-safe date format patterns
 */
export type DateFormatPattern =
  (typeof CATEGORIZED_DATE_PATTERNS)[number]['pattern'];
