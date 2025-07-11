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
  // 12-hour formats with seconds
  {
    pattern: 'h:mm:ss a',
    example: '2:30:45 pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:ssa',
    example: '2:30:45pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:ss A',
    example: '2:30:45 PM',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:ssA',
    example: '2:30:45PM',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:ss a',
    example: '02:30:45 pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:ssa',
    example: '02:30:45pm',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:ss A',
    example: '02:30:45 PM',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:ssA',
    example: '02:30:45PM',
    category: '12h-complete',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  // 12-hour formats without seconds
  {
    pattern: 'h:mm a',
    example: '2:30 pm',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 1,
  },
  {
    pattern: 'h:mma',
    example: '2:30pm',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'h:mm A',
    example: '2:30 PM',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 1,
  },
  {
    pattern: 'h:mA',
    example: '2:30PM',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'hh:mm a',
    example: '02:30 pm',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 1,
  },
  {
    pattern: 'hh:mma',
    example: '02:30pm',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 1,
  },
  {
    pattern: 'hh:mm A',
    example: '02:30 PM',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 1,
  },
  {
    pattern: 'hh:mA',
    example: '02:30PM',
    category: '12h-complete',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 1,
  },
  // 24-hour formats with seconds
  {
    pattern: 'H:mm:ss',
    example: '14:30:45',
    category: '24h-complete',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'HH:mm:ss',
    example: '14:30:45',
    category: '24h-complete',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 8,
    colonCount: 2,
  },
  // 24-hour formats without seconds
  {
    pattern: 'H:mm',
    example: '4:30',
    category: '24h-complete',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 4,
    colonCount: 1,
  },
  {
    pattern: 'HH:mm',
    example: '14:30',
    category: '24h-complete',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 5,
    colonCount: 1,
  },
  // Edge cases
  {
    pattern: 'h a',
    example: '2 pm',
    category: 'edge-cases',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 3,
    colonCount: 0,
  },
  {
    pattern: 'h A',
    example: '2 PM',
    category: 'edge-cases',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 3,
    colonCount: 0,
  },
  {
    pattern: 'ha',
    example: '2pm',
    category: 'edge-cases',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 2,
    colonCount: 0,
  },
  {
    pattern: 'hA',
    example: '2PM',
    category: 'edge-cases',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 2,
    colonCount: 0,
  },
  {
    pattern: 'hh a',
    example: '02 pm',
    category: 'edge-cases',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 0,
  },
  {
    pattern: 'hh A',
    example: '02 PM',
    category: 'edge-cases',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 0,
  },
  {
    pattern: 'hha',
    example: '02pm',
    category: 'edge-cases',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 3,
    colonCount: 0,
  },
  {
    pattern: 'hhA',
    example: '02PM',
    category: 'edge-cases',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 3,
    colonCount: 0,
  },
  // Partial formats - missing minutes default to :00
  {
    pattern: 'h: a',
    example: '2: pm',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 1,
  },
  {
    pattern: 'h: A',
    example: '2: PM',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 1,
  },
  {
    pattern: 'h:a',
    example: '2:pm',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 3,
    colonCount: 1,
  },
  {
    pattern: 'h:A',
    example: '2:PM',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 3,
    colonCount: 1,
  },
  {
    pattern: 'hh: a',
    example: '02: pm',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'hh: A',
    example: '02: PM',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'hh:a',
    example: '02:pm',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 1,
  },
  {
    pattern: 'hh:A',
    example: '02:PM',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 1,
  },
  {
    pattern: 'H:',
    example: '4:',
    category: '24h-partial',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 2,
    colonCount: 1,
  },
  {
    pattern: 'HH:',
    example: '14:',
    category: '24h-partial',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 3,
    colonCount: 1,
  },
  // Partial formats - missing seconds default to :00
  {
    pattern: 'h:mm: a',
    example: '2:30: pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:mm: A',
    example: '2:30: PM',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:a',
    example: '2:30:pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:A',
    example: '2:30:PM',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm: a',
    example: '02:30: pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm: A',
    example: '02:30: PM',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:a',
    example: '02:30:pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:A',
    example: '02:30:PM',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'H:mm:',
    example: '4:30:',
    category: '24h-partial',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 5,
    colonCount: 2,
  },
  {
    pattern: 'HH:mm:',
    example: '14:30:',
    category: '24h-partial',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 6,
    colonCount: 2,
  },
  // Partial formats - single digit minutes
  {
    pattern: 'h:m a',
    example: '2:3 pm',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'h:m A',
    example: '2:3 PM',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'h:ma',
    example: '2:3pm',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 1,
  },
  {
    pattern: 'h:mA',
    example: '2:3PM',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 1,
  },
  {
    pattern: 'hh:m a',
    example: '02:3 pm',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 1,
  },
  {
    pattern: 'hh:m A',
    example: '02:3 PM',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 1,
  },
  {
    pattern: 'hh:ma',
    example: '02:3pm',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'hh:mA',
    example: '02:3PM',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'H:m',
    example: '4:3',
    category: '24h-partial',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 3,
    colonCount: 1,
  },
  {
    pattern: 'HH:m',
    example: '14:3',
    category: '24h-partial',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 4,
    colonCount: 1,
  },
  // Partial formats - single digit seconds
  {
    pattern: 'h:mm:s a',
    example: '2:30:4 pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:s A',
    example: '2:30:4 PM',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:sa',
    example: '2:30:4pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:sA',
    example: '2:30:4PM',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:s a',
    example: '02:30:4 pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:s A',
    example: '02:30:4 PM',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:sa',
    example: '02:30:4pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:sA',
    example: '02:30:4PM',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'H:mm:s',
    example: '4:30:4',
    category: '24h-partial',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 6,
    colonCount: 2,
  },
  {
    pattern: 'HH:mm:s',
    example: '14:30:4',
    category: '24h-partial',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 7,
    colonCount: 2,
  },
  // Partial formats - single digit minutes and seconds
  {
    pattern: 'h:m:s a',
    example: '2:3:4 pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:m:s A',
    example: '2:3:4 PM',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:m:sa',
    example: '2:3:4pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 2,
  },
  {
    pattern: 'h:m:sA',
    example: '2:3:4PM',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 2,
  },
  {
    pattern: 'hh:m:s a',
    example: '02:3:4 pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:m:s A',
    example: '02:3:4 PM',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:m:sa',
    example: '02:3:4pm',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'hh:m:sA',
    example: '02:3:4PM',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'H:m:s',
    example: '4:3:4',
    category: '24h-partial',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 5,
    colonCount: 2,
  },
  {
    pattern: 'HH:m:s',
    example: '14:3:4',
    category: '24h-partial',
    hasSeconds: true,
    hasPeriod: false,
    is24Hour: true,
    length: 6,
    colonCount: 2,
  },
  // Single digit formats (will be padded to double digits)
  {
    pattern: 'h',
    example: '2',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: false,
    length: 1,
    colonCount: 0,
  },
  {
    pattern: 'H',
    example: '4',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: true,
    length: 1,
    colonCount: 0,
  },
  {
    pattern: 'm',
    example: '30',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: false,
    length: 2,
    colonCount: 0,
  },
  {
    pattern: 's',
    example: '45',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: false,
    is24Hour: false,
    length: 2,
    colonCount: 0,
  },
  {
    pattern: 'a',
    example: 'pm',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 2,
    colonCount: 0,
  },
  {
    pattern: 'A',
    example: 'PM',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 2,
    colonCount: 0,
  },
  // Partial period formats (single character AM/PM)
  {
    pattern: 'h: a',
    example: '2: a',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 1,
  },
  {
    pattern: 'h: A',
    example: '2: A',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 1,
  },
  {
    pattern: 'h:a',
    example: '2:a',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 3,
    colonCount: 1,
  },
  {
    pattern: 'h:A',
    example: '2:A',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 3,
    colonCount: 1,
  },
  {
    pattern: 'hh: a',
    example: '02: a',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'hh: A',
    example: '02: A',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'hh:a',
    example: '02:a',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 1,
  },
  {
    pattern: 'hh:A',
    example: '02:A',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 1,
  },
  {
    pattern: 'h:mm: a',
    example: '2:30: a',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:mm: A',
    example: '2:30: A',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:a',
    example: '2:30:a',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:A',
    example: '2:30:A',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm: a',
    example: '02:30: a',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm: A',
    example: '02:30: A',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:a',
    example: '02:30:a',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:A',
    example: '02:30:A',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:s a',
    example: '2:30:4 a',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:s A',
    example: '2:30:4 A',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:sa',
    example: '2:30:4a',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:sA',
    example: '2:30:4A',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:s a',
    example: '02:30:4 a',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:s A',
    example: '02:30:4 A',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:sa',
    example: '02:30:4a',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:sA',
    example: '02:30:4A',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'h:m:s a',
    example: '2:3:4 a',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:m:s A',
    example: '2:3:4 A',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:m:sa',
    example: '2:3:4a',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 2,
  },
  {
    pattern: 'h:m:sA',
    example: '2:3:4A',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 2,
  },
  {
    pattern: 'hh:m:s a',
    example: '02:3:4 a',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:m:s A',
    example: '02:3:4 A',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:m:sa',
    example: '02:3:4a',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'hh:m:sA',
    example: '02:3:4A',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  // Additional partial period patterns for complete time formats
  {
    pattern: 'h:mm p',
    example: '2:30 p',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 1,
  },
  {
    pattern: 'h:mm P',
    example: '2:30 P',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 1,
  },
  {
    pattern: 'h:mmp',
    example: '2:30p',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'h:mmP',
    example: '2:30P',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'hh:mm p',
    example: '02:30 p',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 1,
  },
  {
    pattern: 'hh:mm P',
    example: '02:30 P',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 1,
  },
  {
    pattern: 'hh:mmp',
    example: '02:30p',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 1,
  },
  {
    pattern: 'hh:mmP',
    example: '02:30P',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 1,
  },
  {
    pattern: 'h:m p',
    example: '2:3 p',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'h:m P',
    example: '2:3 P',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'h:mp',
    example: '2:3p',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 1,
  },
  {
    pattern: 'h:mP',
    example: '2:3P',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 4,
    colonCount: 1,
  },
  {
    pattern: 'hh:m p',
    example: '02:3 p',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 1,
  },
  {
    pattern: 'hh:m P',
    example: '02:3 P',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 1,
  },
  {
    pattern: 'hh:mp',
    example: '02:3p',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'hh:mP',
    example: '02:3P',
    category: '12h-partial',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 5,
    colonCount: 1,
  },
  {
    pattern: 'h:mm:s p',
    example: '2:30:4 p',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:s P',
    example: '2:30:4 P',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:sp',
    example: '2:30:4p',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:mm:sP',
    example: '2:30:4P',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:s p',
    example: '02:30:4 p',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:s P',
    example: '02:30:4 P',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 9,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:sp',
    example: '02:30:4p',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:mm:sP',
    example: '02:30:4P',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'h:m:s p',
    example: '2:3:4 p',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:m:s P',
    example: '2:3:4 P',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'h:m:sp',
    example: '2:3:4p',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 2,
  },
  {
    pattern: 'h:m:sP',
    example: '2:3:4P',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 6,
    colonCount: 2,
  },
  {
    pattern: 'hh:m:s p',
    example: '02:3:4 p',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:m:s P',
    example: '02:3:4 P',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 8,
    colonCount: 2,
  },
  {
    pattern: 'hh:m:sp',
    example: '02:3:4p',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  {
    pattern: 'hh:m:sP',
    example: '02:3:4P',
    category: '12h-partial',
    hasSeconds: true,
    hasPeriod: true,
    is24Hour: false,
    length: 7,
    colonCount: 2,
  },
  // Standalone partial period
  {
    pattern: 'a',
    example: 'a',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 1,
    colonCount: 0,
  },
  {
    pattern: 'A',
    example: 'A',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 1,
    colonCount: 0,
  },
  {
    pattern: 'p',
    example: 'p',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 1,
    colonCount: 0,
  },
  {
    pattern: 'P',
    example: 'P',
    category: 'single-digit',
    hasSeconds: false,
    hasPeriod: true,
    is24Hour: false,
    length: 1,
    colonCount: 0,
  },
] as const;

/**
 * Type-safe time format patterns
 */
export type TimeFormatPattern =
  (typeof CATEGORIZED_PATTERNS)[number]['pattern'];

/**
 * Smart pattern filtering based on input characteristics
 * Optimized to minimize regex usage for better performance
 */
export const getFilteredPatterns = (input: string): CategorizedPattern[] => {
  const normalized = input.trim().toLowerCase();
  const length = normalized.length;

  // Use string operations instead of regex where possible
  const colonCount = normalized.split(':').length - 1;
  const hasPeriod =
    normalized.includes('am') ||
    normalized.includes('pm') ||
    normalized.includes('a') ||
    normalized.includes('p');
  const hasSeconds = colonCount >= 2;

  // Optimized 24-hour detection without complex regex
  let is24Hour = false;
  if (!hasPeriod && length > 0) {
    const firstChar = normalized[0];
    const secondChar = normalized[1];

    // Check if it starts with a digit that could be 24-hour format
    if (firstChar >= '0' && firstChar <= '2') {
      if (secondChar >= '0' && secondChar <= '9') {
        // Two digits: check if it's 00-23 (optimized logic)
        is24Hour = (firstChar === '2' && secondChar <= '3') || firstChar <= '1';
      } else {
        // Single digit: could be 0-2 (24-hour) or 1-2 (12-hour)
        if (colonCount > 0) {
          // If there's a colon, it's likely 24-hour format
          is24Hour = true;
        } else {
          // Single digit without colon - could be either, default to 12-hour
          is24Hour = false;
        }
      }
    } else if (firstChar >= '3' && firstChar <= '9') {
      // Single digit 3-9: could be 24-hour if there's a colon
      if (colonCount > 0) {
        is24Hour = true;
      } else {
        is24Hour = false;
      }
    }
  }

  return CATEGORIZED_PATTERNS.filter((pattern) => {
    // Filter by length (allow some tolerance for partial input)
    if (pattern.length < length - 2 || pattern.length > length + 2) {
      return false;
    }

    // Filter by colon count
    if (pattern.colonCount !== colonCount) {
      return false;
    }

    // Filter by period presence
    if (pattern.hasPeriod !== hasPeriod) {
      return false;
    }

    // Filter by seconds presence
    if (pattern.hasSeconds !== hasSeconds) {
      return false;
    }

    // Filter by 24-hour format
    if (pattern.is24Hour !== is24Hour) {
      return false;
    }

    return true;
  });
};
