// Main Calendar component
export { Calendar } from './calendar';

// Sub-components
export { CalendarDay } from './calendar-day';
export { CalendarFooter } from './calendar-footer';
export { CalendarGrid } from './calendar-grid';
export { CalendarHeader } from './calendar-header';
export { CalendarWeekHeader } from './calendar-week-header';
export { MonthGrid } from './month-grid';
export { MonthSelector } from './month-selector';
export { Selector } from './selector';
export { YearSelector } from './year-selector';

// Context and hooks
export { CalendarProvider, useCalendarContext } from './calendar-context';

// Utilities
export { dateUtils } from './calendar-utils';

// Types
export type {
  CalendarClassNames,
  CalendarDayState,
  CalendarFooterProps,
  CalendarHeaderProps,
  CalendarMode,
  CalendarOverlayProps,
  CalendarWeekHeaderProps,
  DateRange,
  WeekStartsOn,
} from './calendar-types';

// Variants
export {
  calendarFooterVariants,
  calendarGridVariants,
  calendarNavButtonVariants,
  calendarTodayButtonVariants,
  calendarWeekHeaderCellVariants,
  calendarWeekHeaderVariants,
  calendarWeekVariants,
} from './calendar-variants';
