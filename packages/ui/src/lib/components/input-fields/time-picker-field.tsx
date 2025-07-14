import React, { useCallback } from 'react';

import { cn } from '@veraclins-dev/utils';

import { TimePicker, type TimePickerProps } from '../../ui';

import {
  type BaseInputProps,
  getInputProps,
  useFieldProperties,
  useInputControlProps,
} from './utils';

export interface TimePickerFieldProps
  extends TimePickerProps,
    Omit<BaseInputProps, 'leftIcon' | 'rightIcon' | 'rightAddon'> {
  inputRef?: React.Ref<HTMLInputElement>;
}

export const TimePickerField = ({
  name,
  label,
  labelProps,
  topText,
  className,
  inputRef,
  field,
  inputClass,
  wrapperClassName,
  showSeconds = false,
  use24Hour = false,
  placeholder,
  size = 'md',
  inputProps,
  contentProps,
  onChange,
  value: supplied,
  ...props
}: TimePickerFieldProps) => {
  const { errorId, id, errors } = useFieldProperties(field);
  const { key, ...inputFieldProps } = getInputProps({
    field,
    type: 'text',
    name,
  });
  const { control, value } = useInputControlProps(field, name);

  // Handle time changes
  const handleChange = useCallback(
    (timeString: string) => {
      control?.change(timeString);
      onChange?.(timeString);
    },
    [control, onChange],
  );

  // Filter out props that aren't valid for TimePicker
  const timePickerProps = {
    showSeconds,
    use24Hour,
    placeholder,
    size,
    ...props,
    inputProps: {
      ...inputFieldProps,
      ...inputProps,
      className: cn(inputProps?.className, inputClass),
      id,
      'aria-describedby': errorId,
      'aria-invalid': errorId ? true : undefined,
      label,
      labelProps,
      topText,
      wrapperClassName,
      errors,
      errorId,
    },
    contentProps,
    className: cn('w-full', className),
  };

  return (
    <TimePicker
      {...timePickerProps}
      key={key}
      value={value ?? supplied}
      onChange={handleChange}
      className={className}
    />
  );
};
