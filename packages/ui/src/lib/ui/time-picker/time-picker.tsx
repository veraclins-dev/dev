import React, { useCallback, useEffect, useRef, useState } from 'react';

import { cn, getPartsFromTimeString, type Time } from '@veraclins-dev/utils';

import { Box } from '..';

import { type Size } from './definitions';
import { TimePickerInput, type TimePickerInputProps } from './input';
import { TimePopover, type TimePopoverProps } from './time-popover';

export interface TimePickerProps {
  className?: string;
  inputProps?: TimePickerInputProps;
  contentProps?: TimePopoverProps['contentProps'];
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
  const anchorRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [time, setTime] = useState<Time>(() =>
    getPartsFromTimeString({ timeString: value ?? '', use24Hour }),
  );

  const updateTime = useCallback(
    (time: Time) => {
      setTime(time);
      if (onChange && time.string) {
        onChange(time.string);
      }
    },
    [onChange],
  );

  // Handle input change
  const handleInputChange = useCallback(
    (time: Time) => {
      updateTime(time);
    },
    [updateTime],
  );

  const handleFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsOpen(false);
    updateTime(time);
  }, [time, updateTime]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        handleBlur();
      } else if (!isOpen) {
        setIsOpen(true);
      }
    },
    [handleBlur, isOpen],
  );

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
        id={inputProps?.id ?? 'time-picker-input'}
        containerRef={anchorRef}
        time={time}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={cn(inputProps?.className)}
        onFocus={handleFocus}
        onClick={handleFocus}
        use24Hour={use24Hour}
        showSeconds={showSeconds}
        onKeyDown={handleKeyDown}
      />
      <TimePopover
        isOpen={isOpen}
        anchorRef={anchorRef}
        time={time}
        use24Hour={use24Hour}
        showSeconds={showSeconds}
        size={size}
        updateTime={updateTime}
        contentProps={contentProps}
        onClose={handleBlur}
      />
    </Box>
  );
};
