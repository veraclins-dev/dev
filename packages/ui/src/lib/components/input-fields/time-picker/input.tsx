import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useDebounce } from '@veraclins-dev/react-utils';
import { cn, getPartsFromTimeString, Time } from '@veraclins-dev/utils';

import { Input, type InputProps } from '../../../ui';

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
  InputProps,
  'value' | 'onChange' | 'onFocus' | 'pattern'
> & {
  time?: Time;
  onChange?: (time: Time) => void;
  onFocus?: () => void;
  use24Hour?: boolean;
  showSeconds?: boolean;
};

export const TimePickerInput = ({
  time,
  onFocus,
  use24Hour,
  showSeconds,
  onChange,
  ref,
  placeholder,
  ...inputProps
}: TimePickerInputProps) => {
  const [inputValue, setInputValue] = useState<string>(time?.string ?? '');

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
        setInputValue(value);
        updateTime(value, use24Hour, showSeconds);
      }
    },
    [use24Hour, showSeconds],
  );

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

  useEffect(() => {
    setInputValue(time?.string ?? '');
  }, [time]);

  return (
    <Input
      ref={ref}
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholderText}
      className={cn(inputProps?.className)}
      onFocus={onFocus}
      onBlur={handleBlur}
      {...inputProps}
    />
  );
};
