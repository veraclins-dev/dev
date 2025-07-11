import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useDebounce } from '@veraclins-dev/react-utils';
import { cn } from '@veraclins-dev/utils';

import { Input, type InputProps } from '../../../ui';

export type TimePickerInputProps = Omit<
  InputProps,
  'value' | 'onChange' | 'onFocus' | 'pattern'
> & {
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  use24Hour?: boolean;
  showSeconds?: boolean;
};

export const TimePickerInput = ({
  value,
  onFocus,
  use24Hour,
  showSeconds,
  onChange,
  ref,
  placeholder,
  ...inputProps
}: TimePickerInputProps) => {
  const [inputValue, setInputValue] = useState<string>(value ?? '');

  const pattern = useMemo(() => {
    if (use24Hour) {
      return showSeconds
        ? '^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$'
        : '^([01]?[0-9]|2[0-3]):[0-5][0-9]$';
    }
    return showSeconds
      ? '^(0?[1-9]|1[0-2]):[0-5][0-9](:[0-5][0-9])?\\s?(AM|PM|am|pm)$'
      : '^(0?[1-9]|1[0-2]):[0-5][0-9]\\s?(AM|PM|am|pm)$';
  }, [use24Hour, showSeconds]);

  // Validation function for partial input
  const isValidPartialInput = useCallback(
    (value: string): boolean => {
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
    },
    [use24Hour, showSeconds],
  );

  const update = useDebounce((value: string) => {
    onChange?.(value);
  });

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (isValidPartialInput(value)) {
        setInputValue(value);
        update(value);
      }
    },
    [isValidPartialInput, update],
  );

  const handleBlur = useCallback(() => {
    onChange?.(inputValue);
  }, [inputValue, onChange]);

  // Generate placeholder text
  const placeholderText = useMemo(() => {
    if (placeholder) return placeholder;
    if (use24Hour) {
      return showSeconds ? 'HH:MM:SS' : 'HH:MM';
    }
    return showSeconds ? 'HH:MM:SS AM/PM' : 'HH:MM AM/PM';
  }, [placeholder, use24Hour, showSeconds]);

  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  return (
    <Input
      ref={ref}
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholderText}
      className={cn(inputProps?.className)}
      onFocus={onFocus}
      pattern={pattern}
      onBlur={handleBlur}
      {...inputProps}
    />
  );
};
