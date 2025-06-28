// Main Calendar component
export { Calendar } from './calendar';

// Sub-components
export { CalendarDay } from './calendar-day';
export { CalendarGrid } from './calendar-grid';
export { CalendarHeader } from './calendar-header';
export { CalendarWeekHeader } from './calendar-week-header';
export { MonthGrid } from './month-grid';
export { MonthSelector } from './month-selector';
export { Selector } from './selector';
export { YearSelector } from './year-selector';

// Context and hooks
export { CalendarProvider, useCalendarContext } from './calendar-context';
export {
  useCalendarKeyboard,
  useDateRange,
  useMonthNavigation,
} from './calendar-hooks';

// Utilities
export { dateUtils } from './calendar-utils';

// Types
export type {
  CalendarClassNames,
  CalendarContextValue,
  CalendarDayProps,
  CalendarDayState,
  CalendarFooterProps,
  CalendarGridProps,
  CalendarHeaderProps,
  CalendarLayout,
  CalendarMode,
  CalendarOverlayProps,
  CalendarProps,
  CalendarSize,
  CalendarTheme,
  CalendarWeekHeaderProps,
  DateRange,
  WeekStartsOn,
} from './calendar-types';

// Variants
export {
  calendarFooterVariants,
  calendarGridVariants,
  calendarHeaderVariants,
  calendarNavButtonVariants,
  calendarTodayButtonVariants,
  calendarVariants,
  calendarWeekHeaderCellVariants,
  calendarWeekHeaderVariants,
  calendarWeekVariants,
} from './calendar-variants';
