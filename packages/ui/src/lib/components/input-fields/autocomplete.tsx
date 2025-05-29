import { matchSorter, type MatchSorterOptions } from 'match-sorter';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn, humanize, setReactInputValue } from '@veraclins-dev/utils';

import { type Maybe, type Option } from '../../types';
import {
  Chip,
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  Icon,
  INPUT_CLASS_OVERRIDES,
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '../../ui';
import { IconButton } from '../icon-button';

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
  multiple = false,
}: {
  options: Options;
  value: string;
  keys?: string[];
  disableSorting?: boolean;
  multiple?: boolean;
}) => {
  const isObject = options.length && !isStringOption(options[0]);

  const config: MatchSorterOptions<Option> = {};

  if (isObject) {
    config.keys = keys;
  }
  if (disableSorting) {
    config.baseSort = () => 0;
  }
  // config.threshold = !multiple ? matchSorter.rankings.NO_MATCH : undefined;

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
  ...props
}: AutocompleteProps) => {
  const { errorId } = useFieldProperties(field);
  const mainRef = useRef<Maybe<HTMLInputElement>>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<Maybe<HTMLDivElement>>(null);
  const firstItemRef = useRef<Maybe<HTMLDivElement>>(null);

  const [localValue, setLocalValue] = useState<string>('');
  const [formValue, setFormValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Options>(options);
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const canSelect = !maxOptions || selected.length < maxOptions;
  const dependent = !!(dependsOn && !options.length);

  const handleChange = (value: string) => {
    setLocalValue(value);
    if (value && !open) {
      setOpen(true);
    }
    scrollIntoView(firstItemRef);
  };

  const handleCreateOption = () => {
    console.debug('Creating option:', { localValue, canSelect, multiple });
    if (freeSolo && localValue && canSelect) {
      if (multiple) {
        setSelected([...selected, localValue]);
        setLocalValue('');
        inputRef.current?.focus();
      } else {
        setSelected([localValue]);
        setLocalValue(localValue);
        setOpen(false);
      }
    }
  };

  const handleBlur = () => {
    mainRef.current?.blur();
    setOpen(false);
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
        inputRef.current?.focus();
      } else {
        setSelected([val]);
        setLocalValue(getOptionLabel(option));
        setOpen(false);
      }
    }
  };

  const handleRemove = (value: string) => {
    setSelected(selected.filter((val) => val !== value));
    inputRef.current?.focus();
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
    inputRef.current?.focus();
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
      }
    },
    [freeSolo, localValue, filteredOptions],
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
      multiple,
    });

    setFilteredOptions(filteredOptions);
  }, [disableSorting, localValue, multiple, options, selected]);

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
    >
      <Command
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent flex"
        shouldFilter={false}
        onBlur={handleBlur}
      >
        <div
          ref={anchorRef}
          className={cn('flex w-full h-full justify-between items-center')}
        >
          <div className="flex flex-1 flex-wrap gap-1">
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
                      onRemove={() => handleRemove(value)}
                    />
                  );
                })}
              </>
            ) : null}
            {canSelect && (
              <CommandInput
                ref={inputRef}
                name={`${formProps.name}-input`}
                aria-describedby={errorId}
                aria-label={formProps.name ?? 'autocomplete-field'}
                aria-labelledby={formProps.id ?? 'autocomplete-field'}
                data-testid={formProps.id ?? 'autocomplete-field'}
                aria-invalid={errorId ? true : undefined}
                value={localValue}
                onValueChange={handleChange}
                onFocus={handleFocus}
                onClick={handleFocus}
                placeholder={placeholder}
                className={INPUT_CLASS_OVERRIDES}
                disabled={!canSelect}
              />
            )}
          </div>
          <div className="flex gap-2">
            {selected.length ? (
              <IconButton
                onClick={clear}
                variant="text"
                className="p-1"
                rounded
              >
                <Icon name="cross-2" className="opacity-70" />
              </IconButton>
            ) : null}

            <Icon
              name="chevron-down"
              data-state={open ? 'open' : 'closed'}
              className={cn({ 'rotate-180': open })}
              onClick={handleFocus}
            />
          </div>
        </div>
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
            virtualRef={anchorRef as React.RefObject<HTMLDivElement>}
          />
          <PopoverContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="p-2"
            sideOffset={12}
          >
            <CommandList className="max-h-52 overflow-auto">
              <CommandEmpty>
                {dependent
                  ? `Select a value for "${humanize(dependsOn)}" first`
                  : freeSolo && localValue
                    ? `Press Enter to add "${localValue}"`
                    : freeSolo && !localValue
                      ? 'Type a value and press Enter to accept it'
                      : 'No options found'}
              </CommandEmpty>
              {filteredOptions.map((option, index) => (
                <CommandItem
                  key={getOptionValue(option)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => handleSelect(option)}
                  className={cn('cursor-pointer px-3 py-2 my-0.5', {
                    'bg-accent': isSelected(option),
                  })}
                  ref={index === 0 ? firstItemRef : undefined}
                >
                  {getOptionLabel(option)}
                </CommandItem>
              ))}
            </CommandList>
          </PopoverContent>
        </Popover>
      </Command>
    </InputWrapper>
  );
};

export { Autocomplete, type AutocompleteProps };
