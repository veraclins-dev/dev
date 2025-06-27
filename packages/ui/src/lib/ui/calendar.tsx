'use client';

import {
  type DateRange,
  DayPicker,
  type DayPickerProps,
  getDefaultClassNames,
  type Modifiers,
} from 'react-day-picker';

import { cn } from '@veraclins-dev/utils';

import { buttonVariants } from './utils/variants';

type LegacyCalendarProps = DayPickerProps;

/**
 * @deprecated This component is deprecated and will be removed in a future version.
 * Use the new Calendar component from @veraclins-dev/ui/components/calendar instead.
 *
 * The new Calendar component provides:
 * - Better customization options
 * - Improved performance
 * - Enhanced accessibility
 * - Smaller bundle size (no external dependencies)
 * - Consistent design system integration
 */
function LegacyCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: LegacyCalendarProps) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      data-slot="calendar"
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: `relative flex ${defaultClassNames.month}`,
        month_caption: `relative mx-10 flex h-7 items-center justify-center ${defaultClassNames.month_caption}`,
        weekdays: cn('flex flex-row', classNames?.weekdays),
        weekday: cn(
          'w-8 text-sm font-normal text-neutral-foreground',
          classNames?.weekday,
        ),
        month: cn('w-full', classNames?.month),

        caption_label: cn(
          'truncate text-sm font-medium',
          classNames?.caption_label,
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1 [&_svg]:fill-foreground',
          classNames?.button_next,
        ),
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1 [&_svg]:fill-foreground',
          classNames?.button_previous,
        ),
        nav: cn('flex items-start', classNames?.nav),
        month_grid: cn('mx-auto mt-4', classNames?.month_grid),
        week: cn('mt-2 flex w-max items-start', classNames?.week),
        day: cn(
          'flex size-8 flex-1 items-center justify-center p-0 text-sm',
          classNames?.day,
        ),
        day_button: cn(
          'size-8 rounded-md p-0 font-normal transition-none aria-selected:opacity-100',
          classNames?.day_button,
        ),
        range_start: cn(
          'bg-secondary [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground day-range-start rounded-s-md',
          classNames?.range_start,
        ),
        range_middle: cn(
          'bg-secondary !text-foreground [&>button]:bg-transparent [&>button]:!text-foreground [&>button]:hover:bg-transparent [&>button]:hover:!text-foreground',
          classNames?.range_middle,
        ),
        range_end: cn(
          'bg-secondary [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground day-range-end rounded-e-md',
          classNames?.range_end,
        ),
        selected: cn(
          '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground',
          classNames?.selected,
        ),
        today: cn(
          '[&>button]:bg-secondary [&>button]:text-secondary-foreground',
          classNames?.today,
        ),
        outside: cn(
          'day-outside text-neutral-foreground opacity-50 aria-selected:bg-secondary/50 aria-selected:text-neutral-foreground aria-selected:opacity-30',
          classNames?.outside,
        ),
        disabled: cn(
          'text-neutral-foreground opacity-50',
          classNames?.disabled,
        ),
        hidden: cn('invisible flex-1', classNames?.hidden),

        ...classNames,
      }}
      {...props}
    />
  );
}

// Export both for backward compatibility during transition
export {
  LegacyCalendar,
  type LegacyCalendarProps,
  type DateRange as LegacyDateRange,
  type Modifiers,
};
