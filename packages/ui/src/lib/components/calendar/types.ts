import { type BoxProps } from '../../ui';
import { type TimePickerProps } from '../input-fields';

/**
 * Date range type for range selection mode
 */
export interface DateRange {
  from: Date;
  to?: Date;
}

/**
 * Calendar selection modes
 */
export type CalendarMode = 'single' | 'multiple' | 'range';

/**
 * Week start options (0 = Sunday, 1 = Monday, etc.)
 */
export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Calendar layout variants
 */
export type CalendarLayout = 'single' | 'multiple' | 'range';

/**
 * Calendar class names for customization
 */
export interface CalendarClassNames {
  // Main calendar
  calendar?: string;
  calendarHeader?: string;
  calendarGrid?: string;
  calendarFooter?: string;

  // Navigation
  navigation?: string;
  navigationButton?: string;
  navigationButtonPrevious?: string;
  navigationButtonNext?: string;
  monthSelect?: string;
  yearSelect?: string;

  // Week header
  weekHeader?: string;
  weekHeaderRow?: string;
  weekHeaderCell?: string;

  // Days grid
  daysGrid?: string;
  weekRow?: string;
  dayCell?: string;
  dayButton?: string;

  // Day states
  dayDefault?: string;
  daySelected?: string;
  dayToday?: string;
  dayDisabled?: string;
  dayOutside?: string;
  dayInRange?: string;
  dayRangeStart?: string;
  dayRangeEnd?: string;
  dayHovered?: string;
  dayFocused?: string;

  // Footer
  todayButton?: string;
}

/**
 * Main Calendar component props
 */

/**
 * Calendar header component props
 */
export interface CalendarHeaderProps extends BoxProps {
  classNames?: CalendarClassNames;
}

/**
 * Calendar week header component props
 */
export interface CalendarWeekHeaderProps {
  weekDays?: string[];
  className?: string;
  classNames?: CalendarClassNames;
}

export type DateValue = Date | Date[] | DateRange;

export interface CalendarProviderProps {
  children: React.ReactNode;
  // Calendar configuration
  mode?: CalendarMode;
  showOutsideDays?: boolean;
  locale?: string;
  weekStartsOn?: WeekStartsOn;
  disabled?: Date[] | ((date: Date) => boolean) | boolean;
  minDate?: Date;
  maxDate?: Date;
  // Calendar state
  value?: DateValue;
  defaultValue?: DateValue;
  onValueChange?: (value?: DateValue) => void;
  numberOfMonths?: number;
}

export interface CalendarProps extends Omit<CalendarProviderProps, 'children'> {
  // Display options
  showTodayButton?: boolean;

  // Time selection
  showTimePicker?: boolean;
  onTimePickerBlur?: () => void;
  timePickerProps?: TimePickerProps;

  // Styling
  className?: string;
  classNames?: CalendarClassNames;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
}

/**
 * Calendar footer component props
 */
export interface CalendarFooterProps
  extends Pick<
    CalendarProps,
    | 'timePickerProps'
    | 'onTimePickerBlur'
    | 'showTimePicker'
    | 'className'
    | 'classNames'
  > {
  onTodayClick?: () => void;
}
/**
 * Calendar grid component props
 */
export interface CalendarGridProps
  extends Pick<
    CalendarProps,
    | 'value'
    | 'mode'
    | 'showOutsideDays'
    | 'disabled'
    | 'className'
    | 'classNames'
  > {
  monthGrid: Date[][];
}
