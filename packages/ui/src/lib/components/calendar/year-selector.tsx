import { memo, useCallback, useMemo, useState } from 'react';

import { Selector } from './selector';

/**
 * Year selection grid component
 */
interface YearSelectorProps {
  currentMonth: Date;
  onYearSelect: (year: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLabel: string;
  triggerAriaLabel: string;
}

export const YearSelector = memo(function YearSelector({
  currentMonth,
  onYearSelect,
  open,
  onOpenChange,
  triggerLabel,
  triggerAriaLabel,
}: YearSelectorProps) {
  const [yearRange, setYearRange] = useState(() => {
    const currentYear = new Date().getFullYear();
    return Math.floor(currentYear / 20) * 20; // Start at the beginning of the current 20-year period
  });

  const years = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const year = yearRange + i;
      return {
        value: year,
        label: year.toString(),
      };
    });
  }, [yearRange]);

  const navigationLabel = useMemo(() => {
    const startYear = yearRange;
    const endYear = yearRange + 19;
    return `${startYear}-${endYear}`;
  }, [yearRange]);

  const handleNavigatePrevious = useCallback(() => {
    setYearRange((prev) => prev - 20);
  }, []);

  const handleNavigateNext = useCallback(() => {
    setYearRange((prev) => prev + 20);
  }, []);

  return (
    <Selector
      open={open}
      onOpenChange={onOpenChange}
      triggerLabel={triggerLabel}
      triggerAriaLabel={triggerAriaLabel}
      value={currentMonth.getFullYear()}
      items={years}
      onSelect={onYearSelect}
      grids={4}
      showNavigation={true}
      onNavigatePrevious={handleNavigatePrevious}
      onNavigateNext={handleNavigateNext}
      navigationLabel={navigationLabel}
    />
  );
});
