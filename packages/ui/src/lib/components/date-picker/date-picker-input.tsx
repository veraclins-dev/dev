import { cn } from '@veraclins-dev/utils';

import { Box, Button, Icon, Input } from '../../ui';

import type { DatePickerInputProps } from './date-picker-types';

// Validation function for partial date input - very permissive
const isValidPartialDate = (value: string): boolean => {
  if (!value) return true;

  // Allow most reasonable date-like patterns while typing
  // This is very permissive to allow various date formats
  const partialPatterns = [
    /^$/, // Empty
    /^\d{1,4}$/, // 1-4 digits (year, month, day)
    /^\d{1,2}\/\d{0,2}$/, // MM/DD or M/D
    /^\d{1,2}\/\d{1,2}\/\d{0,4}$/, // MM/DD/YYYY or M/D/YY
    /^\d{4}-\d{0,2}$/, // YYYY-MM
    /^\d{4}-\d{1,2}-\d{0,2}$/, // YYYY-MM-DD
    /^[A-Za-z]{3}\s+\d{0,2}$/, // MMM DD (partial)
    /^[A-Za-z]{3}\s+\d{1,2},\s*\d{0,4}$/, // MMM DD, YYYY (partial)
    /^[A-Za-z]+\s+\d{0,2}$/, // Month name + day (partial)
    /^[A-Za-z]+\s+\d{1,2},\s*\d{0,4}$/, // Month name + day, year (partial)
    /^\d{1,2}\s+[A-Za-z]+\s+\d{0,4}$/, // DD Month YYYY (partial)
    /^\d{1,2}\s+[A-Za-z]{3}\s+\d{0,4}$/, // DD MMM YYYY (partial)
    // Allow most reasonable character combinations
    /^[0-9\s\-/.,:+A-Za-z]+$/, // General date-like characters
  ];

  return partialPatterns.some((pattern) => pattern.test(value));
};

export function DatePickerInput({
  value,
  onValueChange,
  onClear,
  onFocus,
  onClick,
  onKeyDown,
  onBlur,
  clearable = false,
  classNames,
  ref,
  ...props
}: DatePickerInputProps) {
  const hasValue = Boolean(value);
  const showClearButton =
    clearable && hasValue && !props.disabled && !props.readOnly;

  return (
    <Box className="relative">
      <Input
        ref={ref}
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          if (isValidPartialDate(newValue)) {
            onValueChange(newValue);
          }
        }}
        onFocus={onFocus}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        rightIcon={{
          name: 'calendar',
          onClick: onClick,
          className: 'cursor-pointer',
        }}
        className={cn(classNames?.input)}
        {...props}
      />
      {showClearButton && (
        <Button
          variant="text"
          onClick={onClear}
          className={cn(
            'absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 p-0',
            classNames?.clearButton,
          )}
          aria-label="Clear date"
        >
          <Icon name="x-mark" size="xs" />
        </Button>
      )}
    </Box>
  );
}
