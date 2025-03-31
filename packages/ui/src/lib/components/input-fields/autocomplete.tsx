import { matchSorter, type MatchSorterOptions } from 'match-sorter';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

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
  inputClasses,
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

export interface AutocompleteProps
  extends Omit<TextFieldProps, 'value' | 'onChange'> {
  options: Options;
  maxOptions?: number;
  dependsOn?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disableSorting?: boolean;
  shouldReset?: boolean;
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
  config.threshold = !multiple ? matchSorter.rankings.NO_MATCH : undefined;

  return matchSorter(options, value, config);
};

export const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps>(
  (
    {
      className,
      options,
      multiple,
      label,
      name,
      labelProps,
      maxOptions,
      dependsOn,
      field,
      borderless,
      bgClass = 'bg-input',
      inputClass,
      defaultValue,
      value: supplied,
      onChange,
      disableSorting,
      placeholder,
      shouldReset,
      ...props
    },
    ref,
  ) => {
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

    const handleBlur = () => {
      mainRef.current?.focus();
      mainRef.current?.blur();
      setOpen(false);
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
        }
      },
      [],
    );

    const handleFocus = useCallback(() => {
      setOpen(true);
      inputRef.current?.select();
    }, []);

    useEffect(() => {
      if (!selected.length && value?.length) {
        const val = Array.isArray(value)
          ? (value as string[])
          : value.split('|');
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

      if (!found) {
        reset();
      }
    }, [options]);

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
      <div className="w-full">
        <InputWrapper
          borderless={borderless}
          className={className}
          field={field}
          label={label}
          labelProps={labelProps}
          wrapperRef={ref}
          bgClass={bgClass}
        >
          <Command
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-transparent flex"
            shouldFilter={false}
            onBlur={handleBlur}
          >
            <div
              ref={anchorRef}
              className={cn(
                inputClasses,
                'flex w-full justify-between items-center py-1',
              )}
            >
              <div className="flex flex-wrap gap-1 flex-1">
                {multiple && selected.length ? (
                  <>
                    {selected.map((value) => {
                      return (
                        <Chip
                          key={value}
                          label={getOptionLabel(
                            options.find(
                              (option) => getOptionValue(option) === value,
                            ) ?? '',
                          )}
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
                    aria-invalid={errorId ? true : undefined}
                    data-testid={formProps.id ?? 'autocomplete-field'}
                    value={localValue}
                    onValueChange={handleChange}
                    // onBlur={handleBlur}
                    onFocus={handleFocus}
                    onClick={handleFocus}
                    placeholder={placeholder}
                    className="p-1"
                    disabled={!canSelect}
                  />
                )}
              </div>
              <div className="flex gap-2">
                {selected.length ? (
                  <IconButton onClick={clear} variant="ghost" rounded>
                    <Icon name="cross-2" className="opacity-70" />
                  </IconButton>
                ) : null}

                <Icon
                  name="chevron-down"
                  data-state={open ? 'open' : 'closed'}
                  className={cn('opacity-70', { 'rotate-180': open })}
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
              >
                <CommandList className="max-h-52 overflow-auto">
                  <CommandEmpty>
                    {dependent
                      ? `Select a value for "${humanize(dependsOn)}" first`
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
                        'bg-accent text-input-foreground': isSelected(option),
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
      </div>
    );
  },
);
