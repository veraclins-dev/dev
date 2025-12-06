import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

type Grid = 3 | 4 | 5;

const GRIDS: Record<Grid, string> = {
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
};

interface SelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLabel: string;
  triggerAriaLabel: string;
  value: number;
  items: { value: number; label: string }[];
  onSelect: (value: number) => void;
  grids?: Grid;
  header?: React.ReactNode;
  showNavigation?: boolean;
  onNavigatePrevious?: () => void;
  onNavigateNext?: () => void;
  navigationLabel?: string;
}

export const Selector = memo(function Selector({
  open,
  onOpenChange,
  triggerLabel,
  triggerAriaLabel,
  value,
  items,
  onSelect,
  grids = 3,
  header,
  showNavigation = false,
  onNavigatePrevious,
  onNavigateNext,
  navigationLabel,
}: SelectorProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="text"
          color="neutral"
          buttonSize="sm"
          className="font-medium rounded px-2 py-1"
          aria-label={triggerAriaLabel}
        >
          {triggerLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent arrow className="gap-y-3" align="center">
        {showNavigation ? (
          <Box className="flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="text"
              color="neutral"
              buttonSize="sm"
              onClick={onNavigatePrevious}
              className="p-1 h-6 w-6"
              aria-label="Previous range"
            >
              <Icon name="chevron-left" size="xs" />
            </Button>

            <Box className="text-sm font-medium text-center flex-1">
              {navigationLabel}
            </Box>

            <Button
              type="button"
              variant="text"
              color="neutral"
              buttonSize="sm"
              onClick={onNavigateNext}
              className="p-1 h-6 w-6"
              aria-label="Next range"
            >
              <Icon name="chevron-right" size="xs" />
            </Button>
          </Box>
        ) : (
          header
        )}
        <Box className={cn('grid gap-y-2 gap-x-3', GRIDS[grids])}>
          {items.map((item) => {
            const isSelected = item.value === value;
            return (
              <Button
                key={item.value}
                type="button"
                variant={isSelected ? 'solid' : 'text'}
                color={isSelected ? 'primary' : 'neutral'}
                buttonSize="sm"
                onClick={() => onSelect(item.value)}
                className="text-xs p-3"
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </PopoverContent>
    </Popover>
  );
});
