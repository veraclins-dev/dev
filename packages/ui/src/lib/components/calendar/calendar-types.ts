import type { ReactNode } from 'react';

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
 * Calendar size variants
 */
export type CalendarSize = 'sm' | 'md' | 'lg';

/**
 * Calendar theme variants
 */
export type CalendarTheme = 'default' | 'minimal' | 'colorful';

/**
 * Calendar layout variants
 */
export type CalendarLayout = 'single' | 'multiple' | 'range';

/**
 * Calendar day states
 */
export type CalendarDayState =
  | 'default'
  | 'selected'
  | 'today'
  | 'disabled'
  | 'outside'
  | 'inRange'
  | 'rangeStart'
  | 'rangeEnd'
  | 'hovered'
  | 'focused';

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
export interface CalendarProps {
  // Date handling
  value?: Date | Date[] | DateRange;
  onValueChange?: (value: Date | Date[] | DateRange) => void;
  defaultValue?: Date | Date[] | DateRange;

  // Display options
  mode?: CalendarMode;
  numberOfMonths?: number;
  showOutsideDays?: boolean;
  showWeekNumbers?: boolean;
  showTodayButton?: boolean;
  showNavigation?: boolean;

  // Navigation constraints
  fromDate?: Date;
  toDate?: Date;
  disabled?: Date[] | ((date: Date) => boolean);
  minDate?: Date;
  maxDate?: Date;

  // Styling
  className?: string;
  classNames?: CalendarClassNames;
  size?: CalendarSize;
  theme?: CalendarTheme;

  // Events
  onDayClick?: (date: Date) => void;
  onDayMouseEnter?: (date: Date) => void;
  onDayMouseLeave?: (date: Date) => void;
  onMonthChange?: (date: Date) => void;
  onYearChange?: (date: Date) => void;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;

  // Advanced options
  locale?: string;
  weekStartsOn?: WeekStartsOn;
  fixedWeeks?: boolean;
  pagedNavigation?: boolean;
}

/**
 * Calendar header component props
 */
export interface CalendarHeaderProps {
  className?: string;
  classNames?: CalendarClassNames;
}

/**
 * Calendar grid component props
 */
export interface CalendarGridProps {
  monthGrid: Date[][];
  value?: Date | Date[] | DateRange;
  mode?: CalendarMode;
  showOutsideDays?: boolean;
  onDayClick?: (date: Date) => void;
  onDayMouseEnter?: (date: Date) => void;
  onDayMouseLeave?: (date: Date) => void;
  disabled?: Date[] | ((date: Date) => boolean);
  className?: string;
  classNames?: CalendarClassNames;
}

/**
 * Calendar day component props
 */
export interface CalendarDayProps {
  date: Date;
  isSelected?: boolean;
  isToday?: boolean;
  isOutsideMonth?: boolean;
  isDisabled?: boolean;
  isInRange?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isFocused?: boolean;
  isHovered?: boolean;

  // Events
  onClick?: (date: Date) => void;
  onMouseEnter?: (date: Date) => void;
  onMouseLeave?: (date: Date) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onFocus?: (date: Date) => void;
  onBlur?: (date: Date) => void;

  // Styling
  className?: string;
  children?: ReactNode;
}

/**
 * Calendar week header component props
 */
export interface CalendarWeekHeaderProps {
  weekDays?: string[];
  className?: string;
  classNames?: CalendarClassNames;
}

/**
 * Calendar footer component props
 */
export interface CalendarFooterProps {
  onTodayClick?: () => void;
  className?: string;
  classNames?: CalendarClassNames;
}

/**
 * Calendar overlay component props (for popover/date picker mode)
 */
export interface CalendarOverlayProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

/**
 * Calendar context value
 */
export interface CalendarContextValue {
  // State
  currentMonth: Date;
  selectedDates: Date | Date[] | DateRange | undefined;
  hoveredDate: Date | undefined;
  focusedDate: Date | undefined;

  // Actions
  setCurrentMonth: (date: Date) => void;
  setSelectedDates: (dates: Date | Date[] | DateRange | undefined) => void;
  setHoveredDate: (date: Date | undefined) => void;
  setFocusedDate: (date: Date | undefined) => void;

  // Utilities
  isSelected: (date: Date) => boolean;
  isInRange: (date: Date) => boolean;
  isRangeStart: (date: Date) => boolean;
  isRangeEnd: (date: Date) => boolean;
  isDisabled: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
  isOutsideMonth: (date: Date) => boolean;

  // Configuration
  mode: CalendarMode;
  showOutsideDays: boolean;
  locale: string;
  weekStartsOn: WeekStartsOn;
}
