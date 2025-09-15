import { useRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Popover, PopoverAnchor, PopoverContent } from '../../ui';

import { DatePickerContent } from './date-picker-content';
import type { DatePickerPopoverProps } from './date-picker-types';

export function DatePickerPopover({
  open,
  onOpenChange,
  calendarProps,
  className,
  classNames,
  anchorRef,
}: DatePickerPopoverProps) {
  const fallbackRef = useRef<HTMLDivElement>(null);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverAnchor
        virtualRef={
          (anchorRef ?? fallbackRef) as React.RefObject<HTMLDivElement>
        }
      />
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className={cn('w-auto p-0', className)}
        sideOffset={5}
      >
        <DatePickerContent {...calendarProps} className={classNames?.inline} />
      </PopoverContent>
    </Popover>
  );
}
