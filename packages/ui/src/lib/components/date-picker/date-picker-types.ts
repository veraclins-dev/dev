import type { InputProps } from '../../ui/input';
import type { CalendarMode, CalendarProps, DateValue } from '../calendar/types';

// DatePicker-specific props extending Calendar props
export interface DatePickerProps
  extends Pick<
      CalendarProps,
      | 'value'
      | 'onValueChange'
      | 'defaultValue'
      | 'mode'
      | 'numberOfMonths'
      | 'showOutsideDays'
      | 'showTodayButton'
      | 'showTimePicker'
      | 'onTimePickerBlur'
      | 'disabled'
      | 'minDate'
      | 'maxDate'
      | 'locale'
      | 'weekStartsOn'
      | 'className'
      | 'classNames'
      | 'aria-label'
      | 'aria-describedby'
    >,
    Pick<DatePickerInputProps, 'placeholder' | 'clearable' | 'inputSize'> {
  variant?: 'popover' | 'dialog' | 'inline';
  ref?: React.Ref<HTMLDivElement>;
  inputClassName?: DatePickerInputProps['className'];
  inputClassNames?: DatePickerInputProps['classNames'];
}

// Input component props extending Input props
export interface DatePickerInputProps
  extends Omit<InputProps, 'value' | 'onChange' | 'ref'> {
  value: string;
  onValueChange: (value: string) => void;
  onClear?: () => void;
  onFocus?: () => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  clearable?: boolean;
  classNames?: DatePickerInputClassNames;
  ref?: React.Ref<HTMLInputElement>;
}

// Reuse Calendar types directly
export type DatePickerValue = DateValue;
export type DatePickerMode = CalendarMode;

// DatePicker-specific class names
export interface DatePickerClassNames {
  input?: string;
  clearButton?: string;
  calendarIcon?: string;
  inline?: string;
}

export interface DatePickerInputClassNames {
  input?: string;
  clearButton?: string;
  calendarIcon?: string;
}

// Variant wrapper props
export interface DatePickerPopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  calendarProps: CalendarProps;
  className?: string;
  classNames?: DatePickerClassNames;
  anchorRef?: React.RefObject<HTMLDivElement>;
}

export interface DatePickerDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  calendarProps: CalendarProps;
  title?: string;
  className?: string;
  classNames?: DatePickerClassNames;
}

export interface DatePickerInlineProps
  extends Omit<CalendarProps, 'classNames'> {
  className?: string;
  classNames?: DatePickerClassNames;
  ref?: React.Ref<HTMLDivElement>;
}
