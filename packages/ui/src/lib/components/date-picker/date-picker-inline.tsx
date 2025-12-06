import { cn } from '@veraclins-dev/utils';

import { Box } from '../../ui/box';

import { DatePickerContent } from './date-picker-content';
import type { DatePickerInlineProps } from './date-picker-types';

export function DatePickerInline({
  className,
  classNames,
  ref,
  ...calendarProps
}: DatePickerInlineProps) {
  return (
    <Box
      ref={ref}
      className={cn('mt-2', className, classNames?.inline)}
      tabIndex={-1}
    >
      <DatePickerContent {...calendarProps} className={classNames?.inline} />
    </Box>
  );
}
