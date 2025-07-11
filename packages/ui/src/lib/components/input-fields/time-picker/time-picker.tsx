import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  cn,
  debounce,
  formatTimeStringFromParts,
  getPartsFromTimeString,
  type Time,
} from '@veraclins-dev/utils';

import {
  Box,
  Input,
  type InputProps,
  Popover,
  PopoverAnchor,
  PopoverContent,
  type PopoverContentProps,
} from '../../../ui';

import {
  HOURS_12,
  HOURS_24,
  MINUTES,
  PERIODS,
  SECONDS,
  type Size,
  SIZES,
} from './definitions';
import { Dial } from './dial';
import { TimePickerInput, type TimePickerInputProps } from './input';

export interface TimePickerProps {
  className?: string;
  inputProps?: TimePickerInputProps;
  contentProps?: PopoverContentProps;
  showSeconds?: boolean;
  use24Hour?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: Size;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  className,
  inputProps,
  contentProps,
  showSeconds = false,
  use24Hour = false,
  value,
  onChange,
  placeholder,
  size = 'md',
}) => {
  /** ========= REFS ========= */
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);
  const ampmRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [time, setTime] = useState<Time>(() =>
    getPartsFromTimeString({ timeString: value ?? '', use24Hour }),
  );

  const hours = useMemo(() => (use24Hour ? HOURS_24 : HOURS_12), [use24Hour]);

  const handleSelect = useCallback(
    (key: keyof Time, value: string | number) => {
      const newTime = { ...time, [key]: value };
      setTime(newTime);
      if (onChange) {
        const formattedValue = formatTimeStringFromParts(
          newTime,
          use24Hour,
          showSeconds,
        );
        onChange(formattedValue);
      }
    },
    [time, use24Hour, showSeconds, onChange],
  );

  // Handle input change
  const handleInputChange = useCallback(
    (timeString: string) => {
      const parts = getPartsFromTimeString({
        timeString,
        use24Hour,
      });
      setTime(parts);
      if (onChange) {
        onChange(timeString);
      }
    },
    [use24Hour, onChange],
  );

  // Format input value
  const inputValue = formatTimeStringFromParts(time, use24Hour, showSeconds);

  // Generate placeholder text
  const placeholderText = useMemo(() => {
    if (placeholder) return placeholder;
    if (use24Hour) {
      return showSeconds ? 'HH:MM:SS' : 'HH:MM';
    }
    return showSeconds ? 'HH:MM:SS AM/PM' : 'HH:MM AM/PM';
  }, [placeholder, use24Hour, showSeconds]);

  const handleFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsOpen(false);
    if (onChange) {
      const formattedValue = formatTimeStringFromParts(
        time,
        use24Hour,
        showSeconds,
      );
      onChange(formattedValue);
    }
  }, [onChange, time, use24Hour, showSeconds]);

  useEffect(() => {
    setTime(
      getPartsFromTimeString({
        timeString: value ?? '',
        use24Hour,
      }),
    );
  }, [value, use24Hour, showSeconds]);

  return (
    <Box onBlur={handleBlur} className={className}>
      <TimePickerInput
        {...inputProps}
        ref={anchorRef}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholderText}
        className={cn(inputProps?.className)}
        onFocus={handleFocus}
      />
      <Popover open={isOpen}>
        <PopoverAnchor
          virtualRef={anchorRef as React.RefObject<HTMLInputElement>}
        />
        <PopoverContent
          sideOffset={5}
          arrow
          className={cn('p-1 w-fit', contentProps?.className)}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          {...contentProps}
        >
          <Box className={cn('flex gap-x-0.5 relative', SIZES[size])}>
            <div className="absolute w-full h-10 bg-primary-soft top-1/2 -translate-y-1/2" />

            <Dial
              id="hours-dial"
              items={hours}
              ref={hoursRef}
              value={time.hr}
              onSelect={(value) => handleSelect('hr', value)}
              size={size}
            />
            <Dial
              id="minutes-dial"
              items={MINUTES}
              ref={minutesRef}
              value={time.min}
              onSelect={(value) => handleSelect('min', value)}
              size={size}
            />
            {showSeconds && (
              <Dial
                id="seconds-dial"
                items={SECONDS}
                ref={secondsRef}
                value={time.sec}
                onSelect={(value) => handleSelect('sec', value)}
                size={size}
              />
            )}
            {!use24Hour && (
              <Dial
                id="ampm-dial"
                items={PERIODS}
                ref={ampmRef}
                value={time.period}
                onSelect={(value) => handleSelect('period', value)}
                size={size}
              />
            )}
          </Box>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
