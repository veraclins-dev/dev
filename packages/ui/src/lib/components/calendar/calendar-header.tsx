'use client';

import { memo, useCallback, useMemo, useState } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Icon } from '../../ui';
import { Box } from '../../ui/box';
import { Button } from '../../ui/button';

import { useCalendarContext } from './calendar-context';
import type { CalendarHeaderProps } from './calendar-types';
import { dateUtils } from './calendar-utils';
import {
  calendarHeaderVariants,
  calendarNavButtonVariants,
} from './calendar-variants';
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
  const [monthPopoverOpen, setMonthPopoverOpen] = useState(false);
  const [yearPopoverOpen, setYearPopoverOpen] = useState(false);
  const [secondMonthPopoverOpen, setSecondMonthPopoverOpen] = useState(false);
  const [secondYearPopoverOpen, setSecondYearPopoverOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | undefined>();

  // Memoize end month display for multi-month
  const endMonthDisplay = useMemo(() => {
    if (context.numberOfMonths <= 1) return null;

    const endMonth = dateUtils.addMonths(
      context.currentMonth,
      context.numberOfMonths - 1,
    );
    return `${dateUtils.formatMonth(endMonth, context.locale)} ${dateUtils.formatYear(endMonth, context.locale)}`;
  }, [context.numberOfMonths, context.currentMonth, context.locale]);

  // Calculate second month for multi-month display
  const secondMonth = useMemo(() => {
    if (context.numberOfMonths <= 1) return null;
    return dateUtils.addMonths(
      context.currentMonth,
      context.numberOfMonths - 1,
    );
  }, [context.currentMonth, context.numberOfMonths]);

  // Optimized navigation handlers
  const handlePreviousMonth = useCallback(() => {
    const newMonth = dateUtils.subtractMonths(context.currentMonth, 1);
    context.setCurrentMonth(newMonth);
  }, [context]);

  const handleNextMonth = useCallback(() => {
    const newMonth = dateUtils.addMonths(context.currentMonth, 1);
    context.setCurrentMonth(newMonth);
  }, [context]);

  const handleMonthSelect = useCallback(
    (month: number) => {
      // Use selectedYear if available, otherwise use current year
      const year = selectedYear ?? context.currentMonth.getFullYear();
      const newMonth = new Date(year, month, 1);
      context.setCurrentMonth(newMonth);
      setMonthPopoverOpen(false);
      setSelectedYear(undefined); // Clear selected year after use
    },
    [selectedYear, context],
  );

  const handleYearSelect = useCallback((year: number) => {
    // Store the selected year and open month selector
    setSelectedYear(year);
    setYearPopoverOpen(false);
    setMonthPopoverOpen(true);
  }, []);

  const handleSecondMonthSelect = useCallback(
    (month: number) => {
      if (!secondMonth) return;

      // Calculate the offset to maintain the same gap between months
      const newSecondMonth = new Date(secondMonth.getFullYear(), month, 1);
      const offset = context.numberOfMonths - 1;
      const newFirstMonth = dateUtils.subtractMonths(newSecondMonth, offset);
      context.setCurrentMonth(newFirstMonth);
      setSecondMonthPopoverOpen(false);
    },
    [secondMonth, context],
  );

  const handleSecondYearSelect = useCallback(
    (year: number) => {
      if (!secondMonth) return;

      // Calculate the offset to maintain the same gap between months
      const newSecondMonth = new Date(year, secondMonth.getMonth(), 1);
      const offset = context.numberOfMonths - 1;
      const newFirstMonth = dateUtils.subtractMonths(newSecondMonth, offset);
      context.setCurrentMonth(newFirstMonth);
      setSecondYearPopoverOpen(false);
    },
    [secondMonth, context],
  );

  const handleMonthPopoverChange = useCallback(
    (open: boolean) => {
      setMonthPopoverOpen(open);
      if (open) {
        setYearPopoverOpen(false);
        setSecondMonthPopoverOpen(false);
        setSecondYearPopoverOpen(false);
      } else {
        // If we have a selected year but no month was chosen, navigate to that year with current month
        if (selectedYear !== undefined) {
          const currentMonth = context.currentMonth.getMonth();
          const newMonth = new Date(selectedYear, currentMonth, 1);
          context.setCurrentMonth(newMonth);
          setSelectedYear(undefined); // Clear selected year after use
        }
      }
    },
    [selectedYear, context],
  );

  const handleYearPopoverChange = useCallback((open: boolean) => {
    setYearPopoverOpen(open);
    if (open) {
      setMonthPopoverOpen(false);
      setSecondMonthPopoverOpen(false);
      setSecondYearPopoverOpen(false);
    }
  }, []);

  const handleSecondMonthPopoverChange = useCallback((open: boolean) => {
    setSecondMonthPopoverOpen(open);
    if (open) {
      setMonthPopoverOpen(false);
      setYearPopoverOpen(false);
      setSecondYearPopoverOpen(false);
    }
  }, []);

  const handleSecondYearPopoverChange = useCallback((open: boolean) => {
    setSecondYearPopoverOpen(open);
    if (open) {
      setMonthPopoverOpen(false);
      setYearPopoverOpen(false);
      setSecondMonthPopoverOpen(false);
    }
  }, []);

  return (
    <Box
      ref={ref}
      className={cn(calendarHeaderVariants({ size: 'md' }), className)}
      {...props}
    >
      {/* Previous Month Button */}
      <Button
        type="button"
        variant="text"
        color="neutral"
        size="sm"
        onClick={handlePreviousMonth}
        className={cn(
          calendarNavButtonVariants({ size: 'md', variant: 'ghost' }),
          classNames?.navigationButtonPrevious,
        )}
        aria-label="Go to previous month"
      >
        <Icon name="chevron-left" />
      </Button>

      {/* Month/Year Display */}
      <Box className="flex flex-1 justify-center items-center gap-2">
        {context.numberOfMonths > 1 ? (
          // Multi-month display: single line with coordinated months
          <Box className="flex flex-1 justify-around items-center gap-1">
            <Box>
              <MonthSelector
                currentMonth={context.currentMonth}
                locale={context.locale}
                onMonthSelect={handleMonthSelect}
                open={monthPopoverOpen}
                onOpenChange={handleMonthPopoverChange}
                triggerLabel={dateUtils.formatMonth(
                  context.currentMonth,
                  context.locale,
                )}
                triggerAriaLabel="Select first month"
                selectedYear={selectedYear}
              />

              <YearSelector
                currentMonth={context.currentMonth}
                onYearSelect={handleYearSelect}
                open={yearPopoverOpen}
                onOpenChange={handleYearPopoverChange}
                triggerLabel={context.currentMonth.getFullYear().toString()}
                triggerAriaLabel="Select first year"
              />
            </Box>

            <span className="text-muted-foreground mx-1">to</span>

            {secondMonth && (
              <Box>
                <MonthSelector
                  currentMonth={secondMonth}
                  locale={context.locale}
                  onMonthSelect={handleSecondMonthSelect}
                  open={secondMonthPopoverOpen}
                  onOpenChange={handleSecondMonthPopoverChange}
                  triggerLabel={dateUtils.formatMonth(
                    secondMonth,
                    context.locale,
                  )}
                  triggerAriaLabel="Select second month"
                />

                <YearSelector
                  currentMonth={secondMonth}
                  onYearSelect={handleSecondYearSelect}
                  open={secondYearPopoverOpen}
                  onOpenChange={handleSecondYearPopoverChange}
                  triggerLabel={secondMonth.getFullYear().toString()}
                  triggerAriaLabel="Select second year"
                />
              </Box>
            )}
          </Box>
        ) : (
          // Single month display
          <>
            <MonthSelector
              currentMonth={context.currentMonth}
              locale={context.locale}
              onMonthSelect={handleMonthSelect}
              open={monthPopoverOpen}
              onOpenChange={handleMonthPopoverChange}
              triggerLabel={dateUtils.formatMonth(
                context.currentMonth,
                context.locale,
              )}
              triggerAriaLabel="Select month"
              selectedYear={selectedYear}
            />

            <YearSelector
              currentMonth={context.currentMonth}
              onYearSelect={handleYearSelect}
              open={yearPopoverOpen}
              onOpenChange={handleYearPopoverChange}
              triggerLabel={context.currentMonth.getFullYear().toString()}
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
        onClick={handleNextMonth}
        className={cn(
          calendarNavButtonVariants({ size: 'md', variant: 'ghost' }),
          classNames?.navigationButtonNext,
        )}
        aria-label="Go to next month"
      >
        <Icon name="chevron-right" />
      </Button>
    </Box>
  );
});

CalendarHeader.displayName = 'CalendarHeader';
