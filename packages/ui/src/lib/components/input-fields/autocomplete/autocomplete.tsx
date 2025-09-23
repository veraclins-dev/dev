import { useId, useRef } from 'react';

import { cn, humanize } from '@veraclins-dev/utils';

import { type Maybe } from '../../../types';
import {
  Box,
  Button,
  Chip,
  extractStyleProps,
  Icon,
  Input,
  INPUT_CLASS_OVERRIDES,
  List,
  ListItem,
  type ListItemProps,
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '../../../ui';
import { inputContainerVariants } from '../../../ui/utils/variants/input';
import { InputFieldWrapper } from '../input-field-wrapper';
import {
  getInputProps,
  getOptionLabel,
  getOptionValue,
  useFieldProperties,
} from '../utils';

import { type AutocompleteProps } from './types';
import { useAutocomplete } from './use-autocomplete';

const AutocompleteListItem = ({ className, ...props }: ListItemProps) => {
  return (
    <ListItem
      {...props}
      className={cn('cursor-pointer px-2 py-1.5 rounded-sm', className)}
    />
  );
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
 * @param {string} [props.separator='comma'] - The separator used for adding multiple values in freeSolo mode.
 *   Users can type values separated by this character (e.g., "apple,banana") or paste comma-separated lists.
 *   Available separators: 'comma', 'semicolon', 'pipe', 'space'. Separator characters are filtered out
 *   from the input unless escaped with a backslash (e.g., "apple\,banana" to include a comma in the value).
 *   Only works when both `freeSolo` and `multiple` are true.
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
 *   separator="comma" // Allows typing "apple,banana" or pasting "apple, banana, orange"
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
 *   In multiple mode, users can also type values separated by the separator character (e.g., "apple,banana")
 *   or paste comma-separated lists (or custom separator via `separator`) to add multiple items at once.
 *   Separator characters are filtered out from typing unless escaped with a backslash, but can be included
 *   in pasted text or by escaping them.
 * - **Filtering**: Options are filtered using the `match-sorter` library based on the input value. Filtering
 *   can be customized with `disableSorting` to preserve the original order.
 * - **Dependency Handling**: If `dependsOn` is specified and no options are available, a message prompts the
 *   user to select a value for the dependent field first.
 * - **Accessibility**: The component includes ARIA attributes (`aria-describedby`, `aria-label`, etc.) for
 *   accessibility and integrates with form libraries via a hidden input.
 * - **Keyboard Navigation**: Supports keyboard interactions like `Enter` for creating new options in freeSolo
 *   mode, `Delete`/`Backspace` for removing selections, `Escape` to close the dropdown, arrow keys for
 *   navigation, `Home`/`End` for jumping to first/last option, and `Tab` for selecting focused options or
 *   accepting the current value in freeSolo mode.
 * - **Form Integration**: Works with form libraries (e.g., React Hook Form) via the `field` prop and a hidden
 *   input that stores the selected value(s) joined by `|`.
 * - **Reset and Clear**: The component can be reset programmatically via `shouldReset` or cleared using the
 *   clear button (displayed when selections exist).
 * - **Performance**: Uses memoization for filtered options and form value updates to prevent unnecessary re-renders.
 */
export const Autocomplete = ({
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
  separator = 'comma',
  ref,
  inputSize,
  ...props
}: AutocompleteProps) => {
  const { errorId } = useFieldProperties(field);
  const anchorRef = useRef<Maybe<HTMLDivElement>>(null);
  const wrapperRef = useRef<Maybe<HTMLDivElement>>(null);
  const { key, ...formProps } = getInputProps({ field, name });

  const {
    // Refs
    mainRef,
    inputRef,

    // State
    localValue,
    formValue,
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
    handlePaste,
    handleChange,
    handleCreateOption,
    handleBlur,
    handleSelect,
    handleRemove,
    handleKeyDown,
    handleFocus,
    clear,
    isSelected,
  } = useAutocomplete({
    options,
    multiple,
    maxOptions,
    dependsOn,
    value: supplied,
    defaultValue: formProps.defaultValue ?? defaultValue,
    onChange,
    disableSorting,
    shouldReset,
    freeSolo,
    separator,
  });

  delete formProps.defaultValue;
  const inputId = useId();
  const { styleProps, others } = extractStyleProps(props);

  return (
    <InputFieldWrapper
      className={className}
      field={field}
      label={label}
      labelProps={labelProps}
      wrapperClassName={wrapperClassName}
      ref={ref ?? wrapperRef}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onClick={refocusInput}
      plain
    >
      <Box
        ref={anchorRef}
        display="flex"
        justify="between"
        items="center"
        className={cn(
          inputContainerVariants({
            ...styleProps,
            inputSize,
            className: 'w-full',
          }),
        )}
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
                    chipSize="sm"
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
              onPaste={handlePaste}
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
        {...others}
        {...formProps}
        ref={mainRef}
        key={key}
        value={formValue}
        type="text"
        id={inputId}
        className="h-0 w-0 border-none p-0 absolute bottom-0 left-0"
        readOnly
      />
      <Popover open={open && canSelect}>
        <PopoverAnchor
          virtualRef={(ref ?? anchorRef) as React.RefObject<HTMLDivElement>}
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
              <AutocompleteListItem
                variant="selectable"
                disabled={true}
                className="text-muted-foreground"
              >
                Select a value for "
                {dependsOn ? humanize(dependsOn) : 'dependent field'}" first
              </AutocompleteListItem>
            ) : freeSolo && localValue ? (
              <AutocompleteListItem
                variant="selectable"
                focused={focusedIndex === -1}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onSelect={() => handleCreateOption()}
              >
                {multiple
                  ? `Press Enter, type "${separatorChar}" or click to accept "${localValue}"`
                  : `Press Enter or click to accept "${localValue}"`}
              </AutocompleteListItem>
            ) : freeSolo && !localValue ? (
              <AutocompleteListItem
                variant="selectable"
                disabled={true}
                className="text-muted-foreground"
              >
                {multiple
                  ? `Type a value and press Enter, type "${separatorChar}" or click to accept it`
                  : 'Type a value and press Enter or click to accept it'}
              </AutocompleteListItem>
            ) : filteredOptions.length === 0 ? (
              <AutocompleteListItem
                variant="selectable"
                disabled={true}
                className="text-muted-foreground"
              >
                No options found
              </AutocompleteListItem>
            ) : (
              filteredOptions.map((option, index) => (
                <AutocompleteListItem
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
                </AutocompleteListItem>
              ))
            )}
          </List>
        </PopoverContent>
      </Popover>
    </InputFieldWrapper>
  );
};
