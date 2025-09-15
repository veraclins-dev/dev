import React, { useCallback, useId, useRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Box, INPUT_CLASS_OVERRIDES } from '../../ui';
import { inputContainerVariants } from '../../ui/utils/variants/input';
import {
  DatePicker,
  type DatePickerProps,
  type DatePickerValue,
} from '../date-picker';

import { InputFieldWrapper } from './input-field-wrapper';
import {
  type BaseInputProps,
  getInputProps,
  useInputControlProps,
} from './utils';

export interface DateFieldProps
  extends Omit<BaseInputProps<string>, 'leftIcon' | 'rightIcon' | 'rightAddon'>,
    Pick<
      DatePickerProps,
      | 'onValueChange'
      | 'mode'
      | 'numberOfMonths'
      | 'showTimePicker'
      | 'disabled'
      | 'minDate'
      | 'maxDate'
      | 'locale'
      | 'weekStartsOn'
      | 'className'
      | 'classNames'
      | 'aria-label'
      | 'aria-describedby'
      | 'variant'
      | 'inputSize'
      | 'inputClassName'
      | 'inputClassNames'
      | 'placeholder'
      | 'clearable'
    > {
  inputRef?: React.Ref<HTMLDivElement>;
  value?: string;
  defaultValue?: string;
}

export const DateField = ({
  name,
  label,
  labelProps,
  topText,
  className,
  inputRef,
  field,
  inputClass,
  wrapperClassName,
  mode = 'single',
  variant = 'popover',
  showTimePicker = false,
  disabled = false,
  locale = 'en-US',
  weekStartsOn = 0,
  numberOfMonths = 1,
  onValueChange,
  value: supplied,
  placeholder,
  inputSize,
  inputClassNames,
  clearable,
  ...props
}: DateFieldProps) => {
  const { key, ...formProps } = getInputProps({
    field,
    type: 'text',
    name,
  });
  const { control, value } = useInputControlProps(field, name);
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  // Get the current value (form value or supplied value)
  const currentValue = value ?? supplied;

  // Format the display value
  const formatDisplayValue = (val: DatePickerValue | undefined): string => {
    if (!val) return '';

    if (val instanceof Date) {
      const timeStr = showTimePicker
        ? ` ${val.toLocaleTimeString(locale, {
            hour12: !showTimePicker,
            hour: '2-digit',
            minute: '2-digit',
          })}`
        : '';
      return (
        val.toLocaleDateString(locale, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        }) + timeStr
      );
    }

    if (Array.isArray(val)) {
      if (val.length === 0) return '';
      if (val.length === 1) {
        return val[0].toLocaleDateString(locale, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        });
      }
      return `${val.length} date(s) selected`;
    }

    if ('from' in val && val.from) {
      const fromStr = val.from.toLocaleDateString(locale, {
        month: 'short',
        day: '2-digit',
      });
      const toStr = val.to
        ? val.to.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })
        : '';
      return `${fromStr}${toStr ? ` - ${toStr}` : ''}`;
    }

    return '';
  };

  // Handle date changes
  const handleValueChange = useCallback(
    (newValue?: DatePickerValue) => {
      // Convert DatePickerValue to string for form control
      let stringValue: string | undefined;

      if (!newValue) {
        stringValue = '';
      } else if (newValue instanceof Date) {
        stringValue = newValue.toISOString();
      } else if (Array.isArray(newValue)) {
        stringValue = newValue.map((date) => date.toISOString()).join(',');
      } else if (
        newValue &&
        typeof newValue === 'object' &&
        'from' in newValue
      ) {
        const fromStr = newValue.from ? newValue.from.toISOString() : '';
        const toStr = newValue.to ? newValue.to.toISOString() : '';
        stringValue = `${fromStr}|${toStr}`;
      }

      control?.change(stringValue);
      if (newValue !== undefined) {
        onValueChange?.(newValue);
      }
    },
    [control, onValueChange],
  );

  // Convert form value back to DatePickerValue
  const getDatePickerValue = (): DatePickerValue | undefined => {
    if (!currentValue || typeof currentValue !== 'string') return undefined;

    if (mode === 'single') {
      try {
        return new Date(currentValue);
      } catch {
        return undefined;
      }
    } else if (mode === 'multiple') {
      try {
        return currentValue
          .split(',')
          .map((dateStr: string) => new Date(dateStr.trim()));
      } catch {
        return [];
      }
    } else if (mode === 'range') {
      try {
        const [fromStr, toStr] = currentValue.split('|');
        const from = fromStr ? new Date(fromStr) : undefined;
        const to = toStr ? new Date(toStr) : undefined;
        return from ? { from, to } : undefined;
      } catch {
        return undefined;
      }
    }

    return undefined;
  };

  return (
    <InputFieldWrapper
      className={className}
      field={field}
      label={label}
      labelProps={labelProps}
      topText={topText}
      wrapperClassName={wrapperClassName}
      ref={inputRef}
      plain
    >
      <Box
        ref={anchorRef}
        display="flex"
        justify="between"
        items="center"
        className={cn(
          inputContainerVariants({
            inputSize,
            className: 'w-full',
          }),
        )}
      >
        <DatePicker
          placeholder={placeholder}
          clearable={clearable}
          inputSize={inputSize}
          inputClassName={cn('w-full', INPUT_CLASS_OVERRIDES, inputClass)}
          inputClassNames={inputClassNames}
          value={getDatePickerValue()}
          onValueChange={handleValueChange}
          mode={mode}
          variant={variant}
          showTimePicker={showTimePicker}
          disabled={disabled}
          locale={locale}
          weekStartsOn={weekStartsOn}
          numberOfMonths={numberOfMonths}
        />
      </Box>

      {/* Hidden input for form value */}
      <input
        {...props}
        {...formProps}
        key={key}
        value={typeof currentValue === 'string' ? currentValue : ''}
        type="text"
        id={inputId}
        className="h-0 w-0 border-none p-0 absolute bottom-0 left-0"
        readOnly
      />
    </InputFieldWrapper>
  );
};
