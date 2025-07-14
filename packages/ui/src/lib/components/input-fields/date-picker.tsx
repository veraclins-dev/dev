'use client';

import { type FieldMetadata } from '@conform-to/react';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useRef, useState } from 'react';

import { cn, setReactInputValue } from '@veraclins-dev/utils';

import {
  Button,
  Icon,
  INPUT_CLASS_OVERRIDES,
  INPUT_CLASSES,
  LegacyCalendar,
  type LegacyCalendarProps,
  type LegacyDateRange,
  type Modifiers,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Typography,
} from '../../ui';

import { InputFieldWrapper } from './input-field-wrapper';
import {
  getInputProps,
  useFieldProperties,
  useInputControlProps,
} from './utils';

type DateValue = Date | undefined;
type RangeValue = LegacyDateRange | undefined;
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
} & LegacyCalendarProps;

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
const getValueFromRange = (range: LegacyDateRange | undefined) => {
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
    <InputFieldWrapper
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
          <LegacyCalendar
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
    </InputFieldWrapper>
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
  LegacyCalendarProps & {
    value?: string;
    onChange?: (date: Date | undefined) => void;
  }) {
  const { control, mainRef, ...baseProps } = useDatePicker({ field, name });
  const defaultValue = suppliedDefaultValue ?? field?.initialValue;
  const initialDate = defaultValue ? new Date(defaultValue) : undefined;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate,
  );
  const [formValue, setFormValue] = useState<string>('');

  useEffect(() => {
    if (suppliedValue !== undefined) {
      const newDate = suppliedValue ? new Date(suppliedValue) : undefined;
      setSelectedDate(newDate);
      setFormValue(suppliedValue || '');
    }
  }, [suppliedValue]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setSelectedDate(selectedDate);
    const newFormValue = selectedDate ? selectedDate.toISOString() : '';
    setFormValue(newFormValue);
    setReactInputValue(mainRef.current, newFormValue);
    onChange?.(selectedDate);
  };

  const displayText = () => {
    if (!selectedDate) {
      return 'Pick a date';
    }
    return DateTime.fromJSDate(selectedDate).toFormat('MMM dd, yyyy');
  };

  return (
    <BaseDatePicker
      {...baseProps}
      {...calendarProps}
      mode="single"
      selected={selectedDate}
      onSelect={handleSelect}
      displayText={displayText}
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
  LegacyCalendarProps & {
    value?: string;
    onChange?: (range: LegacyDateRange | undefined) => void;
  }) {
  const { control, mainRef, ...baseProps } = useDatePicker({ field, name });
  const defaultValue = suppliedDefaultValue ?? field?.initialValue;
  const initialRange = defaultValue
    ? getRangeFromValue(defaultValue)
    : undefined;

  const [range, setRange] = useState<LegacyDateRange | undefined>(initialRange);
  const [formValue, setFormValue] = useState<string>('');

  useEffect(() => {
    if (suppliedValue !== undefined) {
      const newRange = getRangeFromValue(suppliedValue);
      setRange(newRange);
      setFormValue(suppliedValue || '');
    }
  }, [suppliedValue]);

  const handleSelect = (newRange: LegacyDateRange | undefined) => {
    setRange(newRange);
    const newFormValue = getValueFromRange(newRange);
    setFormValue(newFormValue);
    setReactInputValue(mainRef.current, newFormValue);
    onChange?.(newRange);
  };

  const displayText = () => {
    if (!range?.from) {
      return 'Pick a date range';
    }
    const fromText = DateTime.fromJSDate(range.from).toFormat('MMM dd, yyyy');
    if (!range.to) {
      return fromText;
    }
    const toText = DateTime.fromJSDate(range.to).toFormat('MMM dd, yyyy');
    return `${fromText} - ${toText}`;
  };

  return (
    <BaseDatePicker
      {...baseProps}
      {...calendarProps}
      mode="range"
      selected={range}
      onSelect={handleSelect}
      displayText={displayText}
      formValue={formValue}
    />
  );
}

export { DatePickerField, DateRangePickerField };
