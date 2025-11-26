import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { type Maybe, type Option } from '../../../types';
import { getOptionValue, useControlProps } from '../utils';

import { type AutocompleteProps } from './types';
import {
  filter,
  filterSeparators,
  hasUnescapedSeparator,
  parseSeparatedValues,
  SEPARATOR_MAP,
  unescapeSeparators,
} from './utils';

export const useAutocomplete = ({
  options,
  multiple = false,
  maxOptions,
  dependsOn,
  value: supplied,
  defaultValue,
  onChange,
  disableSorting = false,
  freeSolo = false,
  separator = 'comma',
}: AutocompleteProps) => {
  const mainRef = useRef<Maybe<HTMLInputElement>>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Compute initial value for lazy initialization
  const initialValue = supplied ?? defaultValue ?? '';
  const initialSelected = (() => {
    if (!initialValue) return [];
    const val = Array.isArray(initialValue)
      ? (initialValue as string[])
      : initialValue.split('|');
    return val.filter((item, index, arr) => arr.indexOf(item) === index);
  })();

  const [localValue, setLocalValue] = useState<string>(() => {
    // In single mode, initialize localValue from initial value
    if (!multiple && initialValue) {
      return initialValue;
    }
    return '';
  });
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Track the last synced value to detect external changes
  const lastSyncedValueRef = useRef<string>(initialValue);

  const {
    change,
    blur,
    register,
    value: controlValue,
  } = useControlProps({
    defaultValue,
    value: supplied,
  });

  const separatorChar = SEPARATOR_MAP[separator];

  const canSelect = !maxOptions || selected.length < maxOptions;
  const dependent = !!(dependsOn && !options.length);

  // Memoized filtered options for performance
  const filteredOptions = useMemo(() => {
    let filtered = options;
    if (multiple) {
      filtered = options.filter(
        (option) => !selected.includes(getOptionValue(option)),
      );
    }

    return filter({
      options: filtered,
      value: localValue,
      disableSorting,
    });
  }, [options, selected, localValue, disableSorting, multiple]);

  const refocusInput = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  const addValue = useCallback(
    (value: string) => {
      // Unescape separator characters from the value
      const unescapedValue = separatorChar
        ? unescapeSeparators(value, separatorChar)
        : value;

      const trimmedValue = unescapedValue.trim();
      if (!trimmedValue || !canSelect) return false;

      if (multiple) {
        // Check if value already exists
        if (!selected.includes(trimmedValue)) {
          setSelected((prev) => [...prev, trimmedValue]);
          return true;
        } else {
          // Clear input if value already exists in multiple mode
          setLocalValue('');
          return false;
        }
      } else {
        setSelected([trimmedValue]);
        setLocalValue(trimmedValue);
        setOpen(false);
        return true;
      }
    },
    [multiple, canSelect, selected, separatorChar],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (!freeSolo || !multiple) return;

      const pastedText = e.clipboardData.getData('text');
      if (!pastedText) return;

      // Check if the pasted text contains the separator
      if (pastedText.includes(separatorChar)) {
        e.preventDefault();

        const items = parseSeparatedValues(pastedText, separatorChar);

        if (items.length > 1) {
          // Add all valid items that don't exceed maxOptions
          let addedCount = 0;
          for (const item of items) {
            if (maxOptions && selected.length + addedCount >= maxOptions) break;
            if (addValue(item)) {
              addedCount++;
            }
          }

          if (addedCount > 0) {
            setLocalValue('');
            refocusInput();
          }
        }
      }
    },
    [
      freeSolo,
      multiple,
      separatorChar,
      maxOptions,
      selected,
      addValue,
      refocusInput,
    ],
  );

  const handleChange = useCallback(
    (value: string) => {
      // Filter out separator characters unless they're escaped
      const filteredValue =
        freeSolo && multiple && separatorChar
          ? filterSeparators(value, separatorChar)
          : value;

      setLocalValue(filteredValue);
      setFocusedIndex(-1); // Reset focus when typing

      // Check if the user typed the separator in freeSolo multiple mode
      if (freeSolo && multiple && hasUnescapedSeparator(value, separatorChar)) {
        const items = parseSeparatedValues(value, separatorChar);

        if (items.length >= 1) {
          const currentValue = items[0];
          const remainingItems = items.slice(1);
          const remainingValue = remainingItems.join(separatorChar);

          if (addValue(currentValue)) {
            // Add the current value and continue with the remaining text
            // Filter the remaining value to remove separators
            const filteredRemaining = filterSeparators(
              remainingValue,
              separatorChar,
            );
            setLocalValue(filteredRemaining);
            return;
          }
        }
      }

      if (filteredValue && !open) {
        setOpen(true);
      }
    },
    [freeSolo, multiple, separatorChar, addValue, open],
  );

  const handleCreateOption = useCallback(
    (shouldRefocus = true) => {
      if (freeSolo && localValue && canSelect) {
        if (addValue(localValue)) {
          if (multiple) {
            setLocalValue('');
          }
          if (shouldRefocus) {
            refocusInput();
          }
        } else {
          // addValue already cleared the input for duplicates, just refocus
          if (shouldRefocus) {
            refocusInput();
          }
        }
      }
    },
    [freeSolo, localValue, canSelect, addValue, multiple, refocusInput],
  );

  const handleBlur = useCallback(() => {
    mainRef.current?.blur();
    setOpen(false);
    blur();
    setFocusedIndex(-1);
    // When freeSolo is enabled and input has value, select it on blur
    if (freeSolo && localValue && canSelect) {
      handleCreateOption(false);
    }
  }, [freeSolo, localValue, canSelect, handleCreateOption, blur]);

  const handleSelect = useCallback(
    (option: Option) => {
      const val = getOptionValue(option);
      if (addValue(val)) {
        if (multiple) {
          setLocalValue('');
        } else {
          // Handle both string and object options
          const label =
            typeof option === 'string' ? option : option.label || val;
          setLocalValue(label);
        }
        refocusInput();
      }
    },
    [addValue, multiple, refocusInput],
  );

  const handleRemove = useCallback(
    (value: string) => {
      setSelected(selected.filter((val) => val !== value));
      refocusInput();
    },
    [selected, refocusInput],
  );

  const changeValue = useCallback(
    (value: string) => {
      if (value !== undefined && value !== controlValue) {
        change(value);
        onChange?.(value);
      }
    },
    [onChange, change, controlValue],
  );

  const reset = useCallback(() => {
    setSelected([]);
    setLocalValue('');
    changeValue('');
  }, [changeValue]);

  const clear = useCallback(() => {
    reset();
    refocusInput();
  }, [reset, refocusInput]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        if (e.key === 'Escape') {
          input.blur();
        }
        // Handle Enter key for creating new option in freeSolo mode
        if (
          e.key === 'Enter' &&
          freeSolo &&
          localValue &&
          filteredOptions.length === 0
        ) {
          e.preventDefault();
          handleCreateOption();
        }
        // Handle arrow keys for navigation
        if (e.key === 'ArrowDown' && open) {
          e.preventDefault();
          const maxIndex = filteredOptions.length - 1;
          setFocusedIndex((prev) => {
            if (prev < maxIndex) return prev + 1;
            if (prev === maxIndex) return 0; // Wrap to first
            return 0; // If no focus, start at first
          });
        }
        if (e.key === 'ArrowUp' && open) {
          e.preventDefault();
          const maxIndex = filteredOptions.length - 1;
          setFocusedIndex((prev) => {
            if (prev > 0) return prev - 1;
            if (prev === 0) return maxIndex; // Wrap to last
            return maxIndex; // If no focus, start at last
          });
        }
        // Handle Enter key for selecting focused option
        if (e.key === 'Enter' && focusedIndex >= 0 && open) {
          e.preventDefault();
          const option = filteredOptions[focusedIndex];
          if (option) {
            handleSelect(option);
          }
        }
        // Handle Tab key for selecting focused option or accepting current value
        if (e.key === 'Tab') {
          if (focusedIndex >= 0 && open) {
            // Select focused option if available
            e.preventDefault();
            const option = filteredOptions[focusedIndex];
            if (option) {
              handleSelect(option);
            }
          } else if (freeSolo && localValue && localValue.trim()) {
            // In freeSolo mode, accept the current input value only if it's not empty
            e.preventDefault();
            handleCreateOption();
          }
          // If no focused option and no value, let Tab have its default behavior
        }
        // Handle Home key to go to first option
        if (e.key === 'Home' && open && filteredOptions.length > 0) {
          e.preventDefault();
          setFocusedIndex(0);
        }
        // Handle End key to go to last option
        if (e.key === 'End' && open && filteredOptions.length > 0) {
          e.preventDefault();
          setFocusedIndex(filteredOptions.length - 1);
        }
      }
    },
    [
      freeSolo,
      localValue,
      filteredOptions,
      focusedIndex,
      open,
      handleCreateOption,
      handleSelect,
    ],
  );

  const handleFocus = useCallback(() => {
    setOpen(true);
    inputRef.current?.select();
  }, []);

  // Update form value when selected changes
  useEffect(() => {
    const value = selected.join('|');
    changeValue(value);
  }, [selected, changeValue]);

  // Handle external value changes and initialization
  const currentValue = supplied ?? defaultValue ?? '';
  useEffect(() => {
    // Only process if value has actually changed externally
    if (currentValue === lastSyncedValueRef.current) return;

    // Initialize selected from value if empty
    if (!selected.length && currentValue) {
      const val = Array.isArray(currentValue)
        ? (currentValue as string[])
        : currentValue.split('|');
      const uniqueValues = val.filter(
        (item, index, arr) => arr.indexOf(item) === index,
      );
      setSelected(uniqueValues);
    }

    // Sync to form control (only if different from current control value)
    if (currentValue && currentValue !== controlValue) {
      changeValue(currentValue);
    }

    // Update localValue in single mode when value changes externally
    if (!multiple && currentValue) {
      setLocalValue(currentValue);
    }

    lastSyncedValueRef.current = currentValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]); // Only depend on currentValue to avoid unnecessary runs

  // Handle options changes
  useEffect(() => {
    const found = selected.reduce((acc, val) => {
      return acc && options.some((option) => getOptionValue(option) === val);
    }, true);

    if (!found && !freeSolo) {
      reset();
    }
  }, [options, freeSolo, selected, reset]);

  // Cleanup timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isSelected = useCallback(
    (option: Option) => selected.includes(getOptionValue(option)),
    [selected],
  );

  return {
    // Refs
    mainRef,
    inputRef,

    // State
    localValue,
    selected,
    open,
    focusedIndex,
    filteredOptions,

    // Computed values
    separatorChar,
    canSelect,
    dependent,

    // Handlers
    refocusInput,
    addValue,
    handlePaste,
    handleChange,
    handleCreateOption,
    handleBlur,
    setOpen,
    handleSelect,
    handleRemove,
    handleKeyDown,
    handleFocus,
    reset,
    clear,
    isSelected,
    controlValue,
    register,
  };
};
