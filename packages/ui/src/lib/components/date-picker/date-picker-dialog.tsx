import { cn } from '@veraclins-dev/utils';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';

import { DatePickerContent } from './date-picker-content';
import type { DatePickerDialogProps } from './date-picker-types';

export function DatePickerDialog({
  children,
  open,
  onOpenChange,
  calendarProps,
  title = 'Select Date',
  className,
  classNames,
}: DatePickerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className={cn('w-auto max-w-fit', className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DatePickerContent {...calendarProps} className={classNames?.inline} />
      </DialogContent>
    </Dialog>
  );
}
