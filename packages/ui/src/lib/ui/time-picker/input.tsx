import React, { useCallback, useId, useMemo, useRef } from 'react';

import { useDebounce } from '@veraclins-dev/react-utils';
import { cn, getPartsFromTimeString, type Time } from '@veraclins-dev/utils';

import {
  InputWrapper,
  type InputWrapperProps,
} from '../../components/input-wrapper';
import { type IconName } from '../../icons';
import { Icon } from '../icon';
import { Input, type InputProps } from '../input';
import { INPUT_CLASS_OVERRIDES } from '../utils/styles';

// Validation function for partial input
const isValidPartialInput = ({
  value,
  use24Hour,
  showSeconds,
}: {
  value: string;
  use24Hour?: boolean;
  showSeconds?: boolean;
}) => {
  if (!value) return true;

  if (use24Hour) {
    // For 24-hour format, allow partial patterns like "", "1", "12", "12:", "12:3", "12:30", "12:30:4", "12:30:45"
    const partialPattern = showSeconds
      ? /^([0-2]?[0-9]?)(:[0-5]?[0-9]?)?(:[0-5]?[0-9]?)?$/
      : /^([0-2]?[0-9]?)(:[0-5]?[0-9]?)?$/;
    return partialPattern.test(value);
  } else {
    // For 12-hour format, allow partial patterns like "", "1", "12", "12:", "12:3", "12:30", "12:30 P", "12:30 PM"
    const partialPattern = showSeconds
      ? /^([0-2]?[0-9]?)(:[0-5]?[0-9]?)?(:[0-5]?[0-9]?)?(\s?[AP]?[M]?)?$/i
      : /^([0-2]?[0-9]?)(:[0-5]?[0-9]?)?(\s?[AP]?[M]?)?$/i;
    return partialPattern.test(value);
  }
};

export type TimePickerInputProps = Omit<
  InputWrapperProps,
  'ref' | 'onChange' | 'children' | 'id'
> &
  Omit<InputProps, 'value' | 'onChange' | 'onFocus' | 'pattern' | 'ref'> & {
    time?: Time;
    onChange?: (time: Time) => void;
    onFocus?: () => void;
    use24Hour?: boolean;
    showSeconds?: boolean;
    icon?: IconName;
  };

export const TimePickerInput = ({
  time,
  onFocus,
  use24Hour,
  showSeconds,
  onChange,
  placeholder,
  icon = 'clock',
  className,
  label,
  labelProps,
  topText,
  wrapperClassName,
  id,
  errors,
  errorId,
  containerRef,
  ...inputProps
}: TimePickerInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const inputValue = time?.string ?? '';

  const updateTime = useDebounce(
    (value: string, use24Hour?: boolean, showSeconds?: boolean) => {
      if (onChange) {
        const time = getPartsFromTimeString({
          timeString: value,
          use24Hour,
          showSeconds,
        });

        onChange(time);
      }
    },
    500,
  );
  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (isValidPartialInput({ value, use24Hour, showSeconds })) {
        updateTime(value, use24Hour, showSeconds);
      }
    },
    [use24Hour, showSeconds, updateTime],
  );

  const handleFocus = useCallback(() => {
    onFocus?.();
    if (ref) {
      ref.current?.focus();
      const length = ref.current?.value.length ?? 0;
      ref.current?.setSelectionRange(length, length);
    }
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    updateTime(inputValue, use24Hour, showSeconds);
  }, [inputValue, use24Hour, showSeconds, updateTime]);

  // Generate placeholder text
  const placeholderText = useMemo(() => {
    if (placeholder) return placeholder;
    if (use24Hour) {
      return showSeconds ? 'HH:MM:SS' : 'HH:MM';
    }
    return showSeconds ? 'HH:MM:SS AM/PM' : 'HH:MM AM/PM';
  }, [placeholder, use24Hour, showSeconds]);

  const inputId = useId();
  return (
    <InputWrapper
      className={className}
      label={label}
      labelProps={labelProps}
      topText={topText}
      wrapperClassName={cn('w-fit max-w-full gap-2', wrapperClassName)}
      containerRef={containerRef}
      id={id ?? `time-picker-input-${inputId}`}
      errors={errors}
      errorId={errorId}
    >
      <Input
        ref={ref}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholderText}
        className={cn('min-w-16', INPUT_CLASS_OVERRIDES)}
        onFocus={onFocus}
        onBlur={handleBlur}
        id={id ?? `time-picker-input-${inputId}`}
        {...inputProps}
      />
      {icon && (
        <Icon
          onClick={handleFocus}
          size="sm"
          className="cursor-pointer"
          name={icon}
        />
      )}
    </InputWrapper>
  );
};
