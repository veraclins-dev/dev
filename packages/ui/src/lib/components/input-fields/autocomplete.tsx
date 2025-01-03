import { matchSorter, type MatchSorterOptions } from 'match-sorter';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  cn,
  humanize,
  scrollIntoView,
  setReactInputValue,
} from '@veraclins-dev/utils';

import { type Maybe, type Option } from '../../types';
import { inputClasses } from '../../ui';
import { Chip } from '../../ui/chip';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../ui/command';
import { Popover, PopoverAnchor, PopoverContent } from '../../ui/popover';

import { type TextFieldProps } from './textfield';
import { getInputProps, useFieldProperties } from './utils';
import { InputWrapper } from './wrapper';

type Options = Option[];

export interface AutocompleteProps
  extends Omit<TextFieldProps, 'value' | 'onChange'> {
  options: Options;
  maxOptions?: number;
  dependsOn?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disableSorting?: boolean;
  menuClassName?: string;
  shouldReset?: boolean;
}

const getOptionLabel = (option?: Option) =>
  typeof option === 'string' ? option : option?.label;
const getOptionValue = (option: Option) =>
  typeof option === 'string' ? option : option.value;
const isStringOption = (option?: Option) => typeof option === 'string';

const filter = (
  options: Options,
  value: string,
  keys = ['label', 'value'],
  disableSorting = false,
) => {
  const isObject = options.length && !isStringOption(options[0]);

  const config: MatchSorterOptions<Option> = {};

  if (isObject) {
    config.keys = keys;
  }
  if (disableSorting) {
    config.baseSort = () => 0;
  }
  config.threshold = matchSorter.rankings.NO_MATCH;

  return matchSorter(options, value, config);
};

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
}: AutocompleteProps) => {
  const { errorId } = useFieldProperties(field);
  const wrapperRef = useRef<Maybe<HTMLDivElement>>(null);
  const mainRef = useRef<Maybe<HTMLInputElement>>(null);
  const inputRef = useRef<Maybe<HTMLInputElement>>(null);
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

  const handleBlur: React.ChangeEventHandler<HTMLInputElement> = () => {
    setOpen(false);
    mainRef.current?.focus();

    mainRef.current?.blur();
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
        wrapperRef.current?.focus();
      } else {
        setSelected([val]);
        setLocalValue(getOptionLabel(val) as string);
        setOpen(false);
      }
    }
  };
  const handleRemove = (value: string) => {
    setSelected(selected.filter((val) => val !== value));
    wrapperRef.current?.focus();
  };

  const changeValue = useCallback((value: string) => {
    if (value !== undefined) {
      setFormValue(value);
      setReactInputValue(mainRef.current, value);
      wrapperRef.current?.focus();
      onChange?.(value);
    }
  }, []);

  const reset = () => {
    setSelected([]);
    setLocalValue('');
    changeValue('');
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
        // This is not a default behaviour of the <input /> field
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

    const filteredOptions = filter(
      filtered,
      localValue,
      ['label'],
      disableSorting,
    );
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
    if (shouldReset) {
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
        wrapperRef={wrapperRef}
        bgClass={bgClass}
      >
        <Command
          onKeyDown={handleKeyDown}
          className="overflow-visible bg-transparent flex"
          shouldFilter={false}
        >
          <div className="flex flex-wrap">
            {multiple && selected.length ? (
              <div ref={anchorRef} className="flex flex-wrap gap-1 p-1">
                {selected.map((value) => {
                  return (
                    <Chip
                      key={value}
                      label={getOptionLabel(
                        options.find(
                          (option) => getOptionValue(option) === value,
                        ),
                      )}
                      onRemove={() => handleRemove(value)}
                    />
                  );
                })}
              </div>
            ) : null}
            {canSelect && (
              <CommandInput
                ref={inputRef}
                name={`${formProps.name}-input`}
                aria-describedby={errorId}
                aria-invalid={errorId ? true : undefined}
                data-testid={formProps.id ?? 'autocomplete-field'}
                value={localValue}
                onValueChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder={placeholder}
                className={inputClasses}
                disabled={!canSelect}
              />
            )}
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
            <PopoverAnchor virtualRef={inputRef} />
            <PopoverContent
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="p-2"
              sideOffset={10}
            >
              <CommandList className="max-h-52 overflow-auto">
                <CommandEmpty>
                  {dependent
                    ? `Select a value for "${humanize(dependsOn)}" first`
                    : 'No options found'}
                </CommandEmpty>
                {filteredOptions.map((option, index) => {
                  return (
                    <CommandItem
                      key={getOptionValue(option)}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => handleSelect(option)}
                      className={cn('cursor-pointer px-3 py-2', {
                        'bg-input text-input-foreground': isSelected(option),
                      })}
                      ref={index === 0 ? firstItemRef : undefined}
                    >
                      {getOptionLabel(option)}
                    </CommandItem>
                  );
                })}
              </CommandList>
            </PopoverContent>
          </Popover>
        </Command>
      </InputWrapper>
    </div>
  );
};
