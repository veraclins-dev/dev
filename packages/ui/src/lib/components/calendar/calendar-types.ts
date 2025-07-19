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

/**
 * Calendar header component props
 */
export interface CalendarHeaderProps {
  className?: string;
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

/**
 * Calendar overlay component props (for popover/date picker mode)
 */
export interface CalendarOverlayProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}
