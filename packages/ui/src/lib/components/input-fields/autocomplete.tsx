import { matchSorter, type MatchSorterOptions } from 'match-sorter';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn, humanize, setReactInputValue } from '@veraclins-dev/utils';

import { type Maybe, type Option } from '../../types';
import {
  Box,
  Button,
  Chip,
  Icon,
  Input,
  INPUT_CLASS_OVERRIDES,
  List,
  ListItem,
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '../../ui';

import { type TextFieldProps } from './textfield';
import {
  getInputProps,
  getOptionLabel,
  getOptionValue,
  isStringOption,
  scrollIntoView,
  useFieldProperties,
} from './utils';
import { InputWrapper } from './wrapper';

type Options = Option<string>[];

interface AutocompleteProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  options: Options;
  maxOptions?: number;
  dependsOn?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disableSorting?: boolean;
  shouldReset?: boolean;
  freeSolo?: boolean; // Added freeSolo prop
}

const filter = ({
  options,
  value,
  keys = ['label', 'value'],
  disableSorting = false,
}: {
  options: Options;
  value: string;
  keys?: string[];
  disableSorting?: boolean;
}) => {
  const isObject = options.length && !isStringOption(options[0]);

  const config: MatchSorterOptions<Option> = {};

  if (isObject) {
    config.keys = keys;
  }
  if (disableSorting) {
    config.baseSort = () => 0;
  }

  return matchSorter(options, value, config);
};

/**
 * A flexible and customizable Autocomplete component that allows users to select one or multiple options
 * from a provided list or create new options in freeSolo mode. The component supports filtering, sorting,
 * and dependency-based option rendering, with integration into form contexts and accessibility features.
 *
 * @component
 * @param {Object} props - The properties for the Autocomplete component.
 * @param {Option<string>[]} props.options - An array of options to display in the autocomplete dropdown.
 *   Each option can be a string or an object with `label` and `value` properties.
 * @param {boolean} [props.multiple=false] - Enables multiple selection mode, allowing users to select
 *   multiple options, which are displayed as chips.
 * @param {string} [props.label] - The label for the input field, displayed above the autocomplete.
 * @param {string} [props.name] - The name attribute for the input, used for form integration.
 * @param {Object} [props.labelProps] - Additional props to pass to the label element.
 * @param {number} [props.maxOptions] - The maximum number of options that can be selected in multiple mode.
 * @param {string} [props.dependsOn] - The name of another field that this autocomplete depends on.
 *   If specified and no options are available, a message is shown prompting selection of the dependent field.
 * @param {Object} [props.field] - Field properties for form integration (e.g., from React Hook Form).
 * @param {string} [props.inputClass] - Additional CSS classes for the input element.
 * @param {string} [props.defaultValue] - The default value for the autocomplete, used if no value is provided.
 * @param {string} [props.value] - The controlled value of the autocomplete, overriding defaultValue.
 * @param {(value: string) => void} [props.onChange] - Callback function triggered when the selected value(s) change.
 *   Receives a string of selected values joined by `|` for multiple selections.
 * @param {boolean} [props.disableSorting=false] - Disables sorting of filtered options, preserving the original order.
 * @param {string} [props.placeholder] - Placeholder text for the input field.
 * @param {boolean} [props.shouldReset=false] - If true, resets the selected values when this prop changes.
 * @param {string} [props.wrapperClassName] - Additional CSS classes for the wrapper element.
 * @param {boolean} [props.freeSolo=false] - Enables freeSolo mode, allowing users to create new options by typing
 *   and pressing Enter or blurring the input (for single selection).
 * @param {string} [props.className] - Additional CSS classes for the root element.
 * @param {...any} props - Additional props are spread onto the hidden input element for form integration.
 * @returns {JSX.Element} The rendered Autocomplete component.
 *
 * @example
 * ```jsx
 * const options = [
 *   { label: 'Apple', value: 'apple' },
 *   { label: 'Banana', value: 'banana' },
 *   { label: 'Orange', value: 'orange' },
 * ];
 *
 * <Autocomplete
 *   options={options}
 *   multiple
 *   label="Select Fruits"
 *   placeholder="Type to search or add..."
 *   freeSolo
 *   onChange={(value) => console.log('Selected:', value)}
 * />
 * ```
 *
 * @remarks
 * - **Single vs. Multiple Selection**: In single selection mode (`multiple=false`), the component allows
 *   selecting one option or creating a new one in freeSolo mode. In multiple selection mode (`multiple=true`),
 *   selected options are displayed as removable chips, and new options can be added in freeSolo mode.
 * - **FreeSolo Mode**: When `freeSolo=true`, users can type a custom value and press Enter (or blur for single
 *   selection) to add it as a new option, even if it doesn't exist in the provided `options`.
 * - **Filtering**: Options are filtered using the `match-sorter` library based on the input value. Filtering
 *   can be customized with `disableSorting` to preserve the original order.
 * - **Dependency Handling**: If `dependsOn` is specified and no options are available, a message prompts the
 *   user to select a value for the dependent field first.
 * - **Accessibility**: The component includes ARIA attributes (`aria-describedby`, `aria-label`, etc.) for
 *   accessibility and integrates with form libraries via a hidden input.
 * - **Keyboard Navigation**: Supports keyboard interactions like `Enter` for creating new options in freeSolo
 *   mode, `Delete`/`Backspace` for removing selections, and `Escape` to close the dropdown.
 * - **Form Integration**: Works with form libraries (e.g., React Hook Form) via the `field` prop and a hidden
 *   input that stores the selected value(s) joined by `|`.
 * - **Reset and Clear**: The component can be reset programmatically via `shouldReset` or cleared using the
 *   clear button (displayed when selections exist).
 */
const Autocomplete = ({
  className,
  options,
  multiple,
  label,
  name,
  labelProps,
  maxOptions,
  dependsOn,
  field,
  inputClass,
  defaultValue,
  value: supplied,
  onChange,
  disableSorting,
  placeholder,
  shouldReset,
  wrapperClassName,
  freeSolo = false,
  ref,
  ...props
}: AutocompleteProps) => {
  const { errorId } = useFieldProperties(field);
  const mainRef = useRef<Maybe<HTMLInputElement>>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<Maybe<HTMLDivElement>>(null);
  const wrapperRef = useRef<Maybe<HTMLDivElement>>(null);

  const [localValue, setLocalValue] = useState<string>('');
  const [formValue, setFormValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Options>(options);
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const canSelect = !maxOptions || selected.length < maxOptions;
  const dependent = !!(dependsOn && !options.length);

  const refocusInput = useCallback(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  const handleChange = (value: string) => {
    setLocalValue(value);
    setFocusedIndex(-1); // Reset focus when typing
    if (value && !open) {
      setOpen(true);
    }
  };

  const handleCreateOption = () => {
    if (freeSolo && localValue && canSelect) {
      if (multiple) {
        setSelected([...selected, localValue]);
        setLocalValue('');
        refocusInput();
      } else {
        setSelected([localValue]);
        setLocalValue(localValue);
        setOpen(false);
        refocusInput();
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    mainRef.current?.blur();
    setOpen(false);
    setFocusedIndex(-1);
    // When freeSolo is enabled and input has value, select it on blur
    if (freeSolo && localValue && canSelect && !multiple) {
      handleCreateOption();
    }
  };

  const value = supplied ?? field?.initialValue ?? defaultValue ?? '';
  delete field?.initialValue;

  const handleSelect = (option: Option) => {
    const val = getOptionValue(option);
    if (canSelect) {
      if (multiple) {
        const all = [...selected, val];
        setSelected(all);
        setLocalValue('');
        refocusInput();
      } else {
        setSelected([val]);
        setLocalValue(getOptionLabel(option));
        setOpen(false);
        refocusInput();
      }
    }
  };

  const handleRemove = (value: string) => {
    setSelected(selected.filter((val) => val !== value));
    refocusInput();
  };

  const changeValue = useCallback((value: string) => {
    if (value !== undefined) {
      setFormValue(value);
      setReactInputValue(mainRef.current, value);
      onChange?.(value);
    }
  }, []);

  const reset = () => {
    setSelected([]);
    setLocalValue('');
    changeValue('');
  };

  const clear = () => {
    reset();
    refocusInput();
  };

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
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0,
          );
        }
        if (e.key === 'ArrowUp' && open) {
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1,
          );
        }
        // Handle Enter key for selecting focused option
        if (e.key === 'Enter' && focusedIndex >= 0 && open) {
          e.preventDefault();
          const option = filteredOptions[focusedIndex];
          if (option) {
            handleSelect(option);
          }
        }
      }
    },
    [freeSolo, localValue, filteredOptions, focusedIndex, open, refocusInput],
  );

  const handleFocus = useCallback(() => {
    setOpen(true);
    inputRef.current?.select();
  }, []);

  useEffect(() => {
    if (!selected.length && value?.length) {
      const val = Array.isArray(value) ? (value as string[]) : value.split('|');
      setSelected(val);
    }
  }, [value]);

  useEffect(() => {
    let filtered = options;
    if (multiple) {
      filtered = options.filter(
        (option) => !selected.includes(getOptionValue(option)),
      );
    }

    const filteredOptions = filter({
      options: filtered,
      value: localValue,
      disableSorting,
    });

    setFilteredOptions(filteredOptions);
  }, [disableSorting, localValue, options, selected]);

  useEffect(() => {
    const value = selected.join('|');
    changeValue(value);
  }, [selected]);

  useEffect(() => {
    if (value) {
      changeValue(value);
      if (!multiple) {
        setLocalValue(value);
      }
    }
  }, [value, multiple]);

  useEffect(() => {
    const found = selected.reduce((acc, val) => {
      return acc && options.some((option) => getOptionValue(option) === val);
    }, true);

    if (!found && !freeSolo) {
      reset();
    }
  }, [options, freeSolo]);

  useEffect(() => {
    if (shouldReset && selected.length) {
      reset();
    }
  }, [shouldReset]);

  const { key, ...formProps } = getInputProps({ field, name });
  delete formProps.defaultValue;

  const isSelected = useCallback(
    (option: Option) => selected.includes(getOptionValue(option)),
    [selected],
  );

  return (
    <InputWrapper
      className={className}
      field={field}
      label={label}
      labelProps={labelProps}
      wrapperClassName={wrapperClassName}
      ref={ref ?? wrapperRef}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <Box
        ref={anchorRef}
        display="flex"
        justify="between"
        items="center"
        className="w-full h-full"
      >
        <Box display="flex" flexWrap="wrap" flex="1" gap={1}>
          {multiple && selected.length ? (
            <>
              {selected.map((value) => {
                return (
                  <Chip
                    key={value}
                    label={getOptionLabel(
                      options.find(
                        (option) => getOptionValue(option) === value,
                      ) ?? { label: value, value }, // Use value as label for freeSolo created options
                    )}
                    variant="soft"
                    color="primary"
                    size="sm"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    className="px-1 text-xs border-none"
                    onRemove={() => handleRemove(value)}
                  />
                );
              })}
            </>
          ) : null}
          {canSelect && (
            <Input
              ref={inputRef}
              name={`${formProps.name}-input`}
              aria-describedby={errorId}
              aria-label={formProps.name ?? 'autocomplete-field'}
              aria-labelledby={formProps.id ?? 'autocomplete-field'}
              data-testid={formProps.id ?? 'autocomplete-field'}
              aria-invalid={errorId ? true : undefined}
              value={localValue}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={handleFocus}
              onClick={handleFocus}
              placeholder={placeholder}
              className={cn(
                INPUT_CLASS_OVERRIDES,
                'flex-1 bg-transparent border-none outline-none',
              )}
              disabled={!canSelect}
            />
          )}
        </Box>
        <Box display="flex" gap={2}>
          {selected.length ? (
            <Button
              onClick={clear}
              variant="text"
              className="p-0.5 rounded-full"
            >
              <Icon name="cross-2" className="opacity-70" />
            </Button>
          ) : null}

          <Icon
            name="chevron-down"
            data-state={open ? 'open' : 'closed'}
            className={cn({ 'rotate-180': open })}
            onClick={handleFocus}
          />
        </Box>
      </Box>
      <input
        {...props}
        {...formProps}
        ref={mainRef}
        key={key}
        value={formValue}
        type="text"
        className="h-0 w-0 border-none p-0"
        readOnly
      />
      <Popover open={open && canSelect}>
        <PopoverAnchor
          virtualRef={(ref ?? wrapperRef) as React.RefObject<HTMLDivElement>}
        />
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="p-2"
          sideOffset={5}
        >
          <List
            role="listbox"
            selectable={true}
            className="max-h-52 overflow-auto"
            variant="none"
          >
            {dependent ? (
              <ListItem
                variant="selectable"
                disabled={true}
                className="text-muted-foreground"
              >
                Select a value for "{humanize(dependsOn)}" first
              </ListItem>
            ) : freeSolo && localValue ? (
              <ListItem
                variant="selectable"
                focused={focusedIndex === -1}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onSelect={() => handleCreateOption()}
              >
                Press Enter to add "{localValue}"
              </ListItem>
            ) : freeSolo && !localValue ? (
              <ListItem
                variant="selectable"
                disabled={true}
                className="text-muted-foreground"
              >
                Type a value and press Enter to accept it
              </ListItem>
            ) : filteredOptions.length === 0 ? (
              <ListItem
                variant="selectable"
                disabled={true}
                className="text-muted-foreground"
              >
                No options found
              </ListItem>
            ) : (
              filteredOptions.map((option, index) => (
                <ListItem
                  key={getOptionValue(option)}
                  value={getOptionValue(option)}
                  role="option"
                  selected={isSelected(option)}
                  focused={focusedIndex === index}
                  variant="selectable"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={(value) => {
                    const option = filteredOptions.find(
                      (opt) => getOptionValue(opt) === value,
                    );
                    if (option) {
                      handleSelect(option);
                    }
                  }}
                >
                  {getOptionLabel(option)}
                </ListItem>
              ))
            )}
          </List>
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
};

export { Autocomplete, type AutocompleteProps };
