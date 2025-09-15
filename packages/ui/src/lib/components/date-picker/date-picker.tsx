import { useCallback, useRef, useState } from 'react';

import { parseDateStringToDate } from '@veraclins-dev/utils';

import { Box, type DateRange } from '../../ui';

import { DatePickerDialog } from './date-picker-dialog';
import { DatePickerInline } from './date-picker-inline';
import { DatePickerInput } from './date-picker-input';
import { DatePickerPopover } from './date-picker-popover';
import type { DatePickerProps, DatePickerValue } from './date-picker-types';

export function DatePicker({
  variant = 'popover',
  placeholder = 'Select date',
  clearable = false,
  inputClassName,
  inputClassNames,
  inputSize,
  classNames,
  ref,
  ...calendarProps
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Value synchronization logic
  const handleValueChange = useCallback(
    (value?: DatePickerValue) => {
      calendarProps.onValueChange?.(value);

      // Update input value based on calendar value
      if (value) {
        if (typeof value === 'string') {
          setInputValue(value);
        } else if (value instanceof Date) {
          setInputValue(value.toLocaleDateString());
        } else if (Array.isArray(value) && value.length > 0) {
          if (calendarProps.mode === 'range') {
            // Handle range selection
            const startDate = value[0];
            const endDate = value[1];
            if (startDate && endDate) {
              setInputValue(
                `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
              );
            } else if (startDate) {
              setInputValue(startDate.toLocaleDateString());
            }
          } else if (calendarProps.mode === 'multiple') {
            // Handle multiple selection - show as comma-separated list
            const sortedDates = [...value].sort(
              (a, b) => a.getTime() - b.getTime(),
            );
            setInputValue(
              sortedDates.map((date) => date.toLocaleDateString()).join(', '),
            );
          }
        } else if (value && typeof value === 'object' && 'from' in value) {
          // Handle range object
          const range = value as { from: Date; to?: Date };
          if (range.from && range.to) {
            setInputValue(
              `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`,
            );
          } else if (range.from) {
            setInputValue(range.from.toLocaleDateString());
          }
        }
      } else {
        setInputValue('');
      }

      // Close popover/dialog on selection (except for range and multiple modes)
      if (
        calendarProps.mode === 'single' ||
        (calendarProps.mode === 'range' &&
          Array.isArray(value) &&
          value.length === 2) ||
        (calendarProps.mode === 'range' &&
          value &&
          typeof value === 'object' &&
          'from' in value &&
          value.to)
      ) {
        setIsOpen(false);
      }
    },
    [calendarProps],
  );

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    // Don't process the value immediately - wait for Enter key or blur
  }, []);

  const handleClear = useCallback(() => {
    setInputValue('');
    // Clear the value based on mode
    if (calendarProps.mode === 'multiple') {
      calendarProps.onValueChange?.([]);
    } else if (calendarProps.mode === 'range') {
      calendarProps.onValueChange?.({} as DateRange);
    } else {
      // For single mode, clear the value
      calendarProps.onValueChange?.(undefined);
    }
  }, [calendarProps]);

  const handleTimePickerBlur = useCallback(() => {
    // Close popover/dialog when time picker loses focus
    setIsOpen(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleInputClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  // Use the flexible date parsing utility
  const parseFlexibleDate = useCallback((value: string): Date | null => {
    return parseDateStringToDate(value);
  }, []);

  const processTypedDate = useCallback(
    (value: string) => {
      if (value.trim() === '') {
        // Clear the value based on mode
        if (calendarProps.mode === 'multiple') {
          calendarProps.onValueChange?.([]);
        } else if (calendarProps.mode === 'range') {
          calendarProps.onValueChange?.({} as DateRange);
        } else {
          calendarProps.onValueChange?.(undefined);
        }
      } else {
        const parsedDate = parseFlexibleDate(value);
        if (parsedDate) {
          if (calendarProps.mode === 'multiple') {
            // For multiple mode, add the date to existing selection
            const currentValue = calendarProps.value;
            const currentDates = Array.isArray(currentValue)
              ? currentValue
              : [];

            // Check if date is already selected
            const isAlreadySelected = currentDates.some(
              (date) => date.getTime() === parsedDate.getTime(),
            );

            if (!isAlreadySelected) {
              const newDates = [...currentDates, parsedDate].sort(
                (a, b) => a.getTime() - b.getTime(),
              );
              calendarProps.onValueChange?.(newDates);
            }
          } else {
            // For single and range modes, replace the value
            calendarProps.onValueChange?.(parsedDate);
          }
        }
        // If parsing fails, don't update the calendar value
        // The input will still show the user's typed value
      }
    },
    [calendarProps, parseFlexibleDate],
  );

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // When Enter is pressed, process the typed date
      if (e.key === 'Enter') {
        e.preventDefault();

        // For inline mode, try to parse the typed date first
        if (variant === 'inline') {
          const parsedDate = parseFlexibleDate(inputValue);
          if (parsedDate) {
            // If we successfully parsed a date, select it
            calendarProps.onValueChange?.(parsedDate);
          }
          // If parsing failed, don't do anything - let the user continue typing
          // or use the mouse to interact with the calendar
        } else {
          // For popover/dialog modes, process the typed date and close
          processTypedDate(inputValue);
          if (calendarProps.mode !== 'range') {
            setIsOpen(false);
          }
        }
      }
    },
    [inputValue, processTypedDate, variant, parseFlexibleDate, calendarProps],
  );

  const handleInputBlur = useCallback(() => {
    // Process the typed date when input loses focus
    processTypedDate(inputValue);
  }, [inputValue, processTypedDate]);

  const renderContent = () => {
    const commonCalendarProps = {
      ...calendarProps,
      onValueChange: handleValueChange,
      onTimePickerBlur: handleTimePickerBlur,
    };

    switch (variant) {
      case 'inline':
        return (
          <Box className="space-y-2">
            <DatePickerInput
              inputSize={inputSize}
              value={inputValue}
              onValueChange={handleInputChange}
              onClear={handleClear}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              placeholder={placeholder}
              clearable={clearable}
              className={inputClassName}
              classNames={inputClassNames}
            />
            <DatePickerInline ref={calendarRef} {...commonCalendarProps} />
          </Box>
        );
      case 'dialog':
        return (
          <DatePickerDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            calendarProps={commonCalendarProps}
          >
            <DatePickerInput
              inputSize={inputSize}
              value={inputValue}
              onValueChange={handleInputChange}
              onClear={handleClear}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              placeholder={placeholder}
              clearable={clearable}
              className={inputClassName}
              classNames={inputClassNames}
            />
          </DatePickerDialog>
        );
      case 'popover':
      default:
        return (
          <Box ref={anchorRef}>
            <DatePickerInput
              inputSize={inputSize}
              ref={inputRef}
              value={inputValue}
              onValueChange={handleInputChange}
              onClear={handleClear}
              onFocus={handleInputFocus}
              onClick={handleInputClick}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              placeholder={placeholder}
              clearable={clearable}
              className={inputClassName}
              classNames={inputClassNames}
            />
            <DatePickerPopover
              open={isOpen}
              onOpenChange={handleOpenChange}
              calendarProps={commonCalendarProps}
              anchorRef={anchorRef as React.RefObject<HTMLDivElement>}
            />
          </Box>
        );
    }
  };

  return (
    <Box ref={ref} className="relative w-full">
      {renderContent()}
    </Box>
  );
}
