'use client';

import { memo, useCallback, useMemo } from 'react';

import { dateUtils } from './calendar-utils';
import { Selector } from './selector';

/**
 * Month selection grid component
 */
interface MonthSelectorProps {
  currentMonth: Date;
  locale: string;
  onMonthSelect: (month: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLabel: string;
  triggerAriaLabel: string;
  selectedYear?: number;
}

export const MonthSelector = memo(function MonthSelector({
  currentMonth,
  locale,
  onMonthSelect,
  open,
  onOpenChange,
  triggerLabel,
  triggerAriaLabel,
  selectedYear,
}: MonthSelectorProps) {
  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(2024, i, 1);
      return {
        value: i,
        label: dateUtils.formatMonthShort(date, locale),
      };
    });
  }, [locale]);

  const handleMonthSelect = useCallback(
    (month: number) => {
      onMonthSelect(month);
    },
    [onMonthSelect],
  );

  return (
    <Selector
      open={open}
      onOpenChange={onOpenChange}
      triggerLabel={triggerLabel}
      triggerAriaLabel={triggerAriaLabel}
      value={currentMonth.getMonth()}
      items={months}
      onSelect={handleMonthSelect}
    />
  );
});
