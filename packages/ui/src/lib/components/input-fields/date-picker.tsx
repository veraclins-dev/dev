'use client';

import { type FieldMetadata } from '@conform-to/react';
import { addDays, format } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';

import { cn, setReactInputValue } from '@veraclins-dev/utils';

import {
  Button,
  Calendar,
  type CalendarProps,
  type DateRange,
  Icon,
  INPUT_CLASS_OVERRIDES,
  INPUT_CLASSES,
  type Modifiers,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Typography,
} from '../../ui';

import {
  getInputProps,
  useFieldProperties,
  useInputControlProps,
} from './utils';
import { InputWrapper } from './wrapper';

type DateValue = Date | undefined;
type RangeValue = DateRange | undefined;
type ValueType = DateValue | RangeValue;

// Utility types
type PickerProps = {
  field?: FieldMetadata<string | undefined>;
  label?: string | React.ReactNode;
  labelProps?: React.JSX.IntrinsicElements['label'];
  name?: string;
  className?: string;
  wrapperClassName?: string;
  defaultValue?: string;
} & CalendarProps;

type BaseDatePickerProps<T extends ValueType> = PickerProps & {
  value?: string;
  onChange?: (value: T) => void;
  mode: 'single' | 'range';
  selected: T;
  onSelect: (value: T) => void;
  displayText: () => string;
  defaultMonth?: Date;
  numberOfMonths?: number;
  formValue: string;
};

// Utility functions for range handling
const getValueFromRange = (range: DateRange | undefined) => {
  if (!range) return '';
  const from = range.from ? range.from.toISOString() : '';
  const to = range.to ? range.to.toISOString() : '';
  return `${from}|${to}`;
};

const getRangeFromValue = (value?: string) => {
  if (!value) return { from: undefined, to: undefined };
  const [from, to] = value.split('|');
  return {
    from: from ? new Date(from) : undefined,
    to: to ? new Date(to) : undefined,
  };
};

// Hook for shared form integration
function useDatePicker({ field, name, ...formProps }: PickerProps) {
  const { control } = useInputControlProps(field, name);
  const { errorId, id } = useFieldProperties(field);
  const { key, ...props } = getInputProps({ field, name });
  const mainRef = useRef<HTMLInputElement>(null);

  const handleDayFocus = (
    date: Date,
    modifiers: Modifiers,
    event: React.FocusEvent,
  ) => {
    control?.focus();
    formProps.onDayFocus?.(date, modifiers, event);
  };

  const handleDayBlur = (
    date: Date,
    modifiers: Modifiers,
    event: React.FocusEvent,
  ) => {
    control?.blur();
    formProps.onDayBlur?.(date, modifiers, event);
  };

  return {
    id,
    errorId,
    props: { ...props, key },
    mainRef,
    control,
    handleDayFocus,
    handleDayBlur,
  };
}

// Base component for shared UI
function BaseDatePicker<T extends ValueType>({
  field,
  label,
  labelProps,
  className,
  wrapperClassName,
  value: _suppliedValue,
  onChange: _onChange,
  displayText,
  defaultMonth,
  numberOfMonths = 1,
  ...calendarProps
}: BaseDatePickerProps<T>) {
  const { id, errorId, props, mainRef, handleDayFocus, handleDayBlur } =
    useDatePicker({ field, label, labelProps, className, wrapperClassName });

  const isSelected = useMemo(() => {
    if (calendarProps.mode === 'single') {
      return calendarProps.selected !== undefined;
    }
    return (
      calendarProps.selected?.from !== undefined ||
      calendarProps.selected?.to !== undefined
    );
  }, [calendarProps.selected, calendarProps.mode]);

  return (
    <InputWrapper
      className={cn(
        'has-focus:border-ring has-focus:ring-current/50 has-focus:ring-1',
        className,
      )}
      field={field}
      label={label}
      labelProps={labelProps}
      wrapperClassName={wrapperClassName}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="plain"
            className={cn(
              INPUT_CLASSES,
              INPUT_CLASS_OVERRIDES,
              'h-full min-w-[200px] justify-start font-normal',
              !isSelected && 'text-neutral-foreground',
            )}
            aria-invalid={errorId ? true : undefined}
            aria-describedby={errorId}
            type="button"
          >
            <Icon name="calendar" className="text-neutral-foreground" />
            <Typography variant="body2">{displayText()}</Typography>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            {...calendarProps}
            onDayFocus={handleDayFocus}
            onDayBlur={handleDayBlur}
            autoFocus
            defaultMonth={defaultMonth}
            numberOfMonths={numberOfMonths}
          />
        </PopoverContent>
      </Popover>
      <input
        {...props}
        ref={mainRef}
        type="text"
        className="h-0 w-0 border-none p-0"
        readOnly
      />
    </InputWrapper>
  );
}

// Single date picker
function DatePickerField({
  field,
  label,
  labelProps,
  name,
  className,
  wrapperClassName,
  defaultValue: suppliedDefaultValue,
  value: suppliedValue,
  onChange,
  ...calendarProps
}: PickerProps &
  CalendarProps & {
    value?: string;
    onChange?: (date: Date | undefined) => void;
  }) {
  const { control, mainRef, ...baseProps } = useDatePicker({ field, name });
  const defaultValue = suppliedDefaultValue ?? field?.initialValue;
  const initialDate = defaultValue
    ? typeof defaultValue === 'string'
      ? new Date(defaultValue)
      : defaultValue
    : undefined;

  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [formValue, setFormValue] = useState<string>('');

  useEffect(() => {
    if (suppliedValue) {
      const newDate =
        typeof suppliedValue === 'string'
          ? new Date(suppliedValue)
          : suppliedValue;
      setDate(newDate);
      const newFormValue = newDate ? newDate.toISOString() : '';
      setFormValue(newFormValue);
      setReactInputValue(mainRef.current, newFormValue);
    }
  }, [suppliedValue]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    const newFormValue = selectedDate ? selectedDate.toISOString() : '';
    setFormValue(newFormValue);
    setReactInputValue(mainRef.current, newFormValue);
    control?.change(newFormValue);
    onChange?.(selectedDate);
  };

  const displayText = () => {
    return date ? format(date, 'PPP') : 'Pick a date';
  };

  return (
    <BaseDatePicker<DateValue>
      {...baseProps}
      {...calendarProps}
      field={field}
      label={label}
      labelProps={labelProps}
      className={className}
      wrapperClassName={wrapperClassName}
      mode="single"
      selected={date}
      onSelect={handleSelect}
      displayText={displayText}
      defaultMonth={date}
      numberOfMonths={1}
      formValue={formValue}
    />
  );
}

// Date range picker
function DateRangePickerField({
  field,
  label,
  labelProps,
  name,
  className,
  wrapperClassName,
  defaultValue: suppliedDefaultValue,
  value: suppliedValue,
  onChange,
  ...calendarProps
}: PickerProps &
  CalendarProps & {
    value?: string;
    onChange?: (range: DateRange | undefined) => void;
  }) {
  const { control, mainRef, ...baseProps } = useDatePicker({ field, name });
  const defaultValue = suppliedDefaultValue ?? field?.initialValue;
  const initialRange = defaultValue
    ? getRangeFromValue(defaultValue)
    : undefined;

  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const [formValue, setFormValue] = useState<string>('');

  useEffect(() => {
    if (suppliedValue) {
      const newRange = getRangeFromValue(suppliedValue);
      setRange(newRange);
      const newFormValue = getValueFromRange(newRange);
      setFormValue(newFormValue);
      setReactInputValue(mainRef.current, newFormValue);
    }
  }, [suppliedValue]);

  const handleSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    const newFormValue = getValueFromRange(newRange);
    setFormValue(newFormValue);
    setReactInputValue(mainRef.current, newFormValue);
    control?.change(newFormValue);
    onChange?.(newRange);
  };

  const displayText = () => {
    if (!range) return 'Pick a date range';
    const from = range.from ? format(range.from, 'LLL dd, y') : '';
    const to = range.to ? format(range.to, 'LLL dd, y') : '';
    return from && to ? `${from} - ${to}` : from || to;
  };

  return (
    <BaseDatePicker<RangeValue>
      {...baseProps}
      {...calendarProps}
      field={field}
      label={label}
      labelProps={labelProps}
      className={className}
      wrapperClassName={wrapperClassName}
      mode="range"
      selected={range}
      onSelect={handleSelect}
      displayText={displayText}
      defaultMonth={range?.from}
      numberOfMonths={2}
      formValue={formValue}
    />
  );
}

export { DatePickerField, DateRangePickerField };
