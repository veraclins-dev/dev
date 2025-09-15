import { cn } from '@veraclins-dev/utils';

import { Box, Calendar } from '../../ui';
import type { CalendarProps } from '../calendar/types';

interface DatePickerContentProps extends CalendarProps {
  className?: string;
  classNames?: {
    calendar?: string;
  };
  ref?: React.Ref<HTMLDivElement>;
}

export function DatePickerContent({
  className,
  classNames,
  ref,
  ...calendarProps
}: DatePickerContentProps) {
  return (
    <Box ref={ref} className={cn('w-full', className)}>
      <Calendar {...calendarProps} className={classNames?.calendar} />
    </Box>
  );
}
