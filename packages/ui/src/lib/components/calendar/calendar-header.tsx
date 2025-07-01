'use client';

import { Fragment, memo, useCallback, useState } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Icon } from '../../ui';
import { Box } from '../../ui/box';
import { Button } from '../../ui/button';

import { useCalendarContext } from './calendar-context';
import type { CalendarHeaderProps } from './calendar-types';
import { dateUtils } from './calendar-utils';
import { calendarNavButtonVariants } from './calendar-variants';
import { MonthSelector } from './month-selector';
import { YearSelector } from './year-selector';

/**
 * Calendar header component with navigation - optimized with memoization
 */
export const CalendarHeader = memo(function CalendarHeader({
  className,
  classNames,
  ref,
  ...props
}: CalendarHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  const context = useCalendarContext();

  const [monthPopoverOpen, setMonthPopoverOpen] = useState<
    number | undefined
  >();
  const [yearPopoverOpen, setYearPopoverOpen] = useState<number | undefined>();

  const handleMonthSelect = useCallback(
    (month: number, monthIndex = 0) => {
      context.onMonthSelect(month, monthIndex);
      setMonthPopoverOpen(undefined);
    },
    [context],
  );

  const handleYearSelect = useCallback(
    (year: number, monthIndex = 0) => {
      context.onYearSelect(year, monthIndex);
      setYearPopoverOpen(undefined);
      setMonthPopoverOpen(monthIndex);
    },
    [context],
  );

  const handleMonthPopoverChange = useCallback(
    (open: boolean, monthIndex = 0) => {
      if (open) {
        setMonthPopoverOpen(monthIndex);
        setYearPopoverOpen(undefined);
      } else {
        setMonthPopoverOpen(undefined);
      }
    },
    [],
  );

  const handleYearPopoverChange = useCallback(
    (open: boolean, monthIndex = 0) => {
      if (open) {
        setYearPopoverOpen(monthIndex);
        setMonthPopoverOpen(undefined);
      } else {
        setYearPopoverOpen(undefined);
      }
    },
    [],
  );

  return (
    <Box
      ref={ref}
      className={cn(
        'calendar-header flex items-center justify-between',
        className,
      )}
      {...props}
    >
      {/* Previous Month Button */}
      <Button
        type="button"
        variant="text"
        color="neutral"
        size="sm"
        onClick={context.gotoPreviousMonth}
        className={cn(
          calendarNavButtonVariants({ size: 'md', variant: 'ghost' }),
          classNames?.navigationButtonPrevious,
        )}
        aria-label="Go to previous month"
      >
        <Icon name="chevron-left" size="sm" />
      </Button>

      {/* Month/Year Display */}
      <Box className="flex flex-1 justify-center items-center gap-2">
        {context.numberOfMonths > 1 ? (
          // Multi-month display: map through all months
          <Box className="flex flex-1 justify-around items-center gap-1">
            {context.currentMonths.map((month, index) => (
              <Fragment key={index}>
                <Box className="flex items-center gap-2">
                  <MonthSelector
                    currentMonth={month}
                    locale={context.locale}
                    onMonthSelect={(monthNumber) =>
                      handleMonthSelect(monthNumber, index)
                    }
                    open={monthPopoverOpen === index}
                    onOpenChange={(open) =>
                      handleMonthPopoverChange(open, index)
                    }
                    triggerLabel={dateUtils.formatMonth(month, context.locale)}
                    triggerAriaLabel={`Select month ${index + 1}`}
                  />

                  <YearSelector
                    currentMonth={month}
                    onYearSelect={(year) => handleYearSelect(year, index)}
                    open={yearPopoverOpen === index}
                    onOpenChange={(open) =>
                      handleYearPopoverChange(open, index)
                    }
                    triggerLabel={dateUtils.formatYear(month)}
                    triggerAriaLabel={`Select year ${index + 1}`}
                  />
                </Box>
                {/* Add "to" separator between months */}
                {index < context.currentMonths.length - 1 && (
                  <span className="text-muted-foreground mx-1">-</span>
                )}
              </Fragment>
            ))}
          </Box>
        ) : (
          // Single month display
          <>
            <MonthSelector
              currentMonth={context.currentMonths[0]}
              locale={context.locale}
              onMonthSelect={(month) => handleMonthSelect(month, 0)}
              open={monthPopoverOpen === 0}
              onOpenChange={(open) => handleMonthPopoverChange(open, 0)}
              triggerLabel={dateUtils.formatMonth(
                context.currentMonths[0],
                context.locale,
              )}
              triggerAriaLabel="Select month"
            />

            <YearSelector
              currentMonth={context.currentMonths[0]}
              onYearSelect={(year) => handleYearSelect(year, 0)}
              open={yearPopoverOpen === 0}
              onOpenChange={(open) => handleYearPopoverChange(open, 0)}
              triggerLabel={dateUtils.formatYear(context.currentMonths[0])}
              triggerAriaLabel="Select year"
            />
          </>
        )}
      </Box>

      {/* Next Month Button */}
      <Button
        type="button"
        variant="text"
        color="neutral"
        size="sm"
        onClick={context.gotoNextMonth}
        className={cn(
          calendarNavButtonVariants({ size: 'md', variant: 'ghost' }),
          classNames?.navigationButtonNext,
        )}
        aria-label="Go to next month"
      >
        <Icon name="chevron-right" size="sm" />
      </Button>
    </Box>
  );
});

CalendarHeader.displayName = 'CalendarHeader';
