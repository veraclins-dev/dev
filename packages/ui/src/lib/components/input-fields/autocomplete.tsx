'use client';
import { Command as CommandPrimitive } from 'cmdk';
import { matchSorter, type MatchSorterOptions } from 'match-sorter';
import { useCallback, useEffect, useRef, useState } from 'react';

import { isObject } from '@veraclins-dev/utils';

import { type Maybe, type Option } from '../../types';
import { Chip } from '../../ui/chip';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '../../ui/command';

import { type TextFieldProps } from './textfield';
import { getInputProps } from './utils';
import { InputWrapper } from './wrapper';

type Options = Option[];

export interface AutocompleteProps
  extends Omit<TextFieldProps, 'value' | 'onChange'> {
  options: Options;
  openOnFocus?: boolean;
  maxOptions?: number;
  dependsOn?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disableSorting?: boolean;
}

const isStringOption = (option?: Option) => typeof option === 'string';
const getOptionLabel = (option?: Option) =>
  isObject(option) ? option.label : option;

const getOptionValue = (option: Option) =>
  isObject(option) ? option.value : option;

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

export function Autocomplete({
  options,
  label,
  disableSorting,
  multiple = true,
  maxOptions,
  dependsOn,
  className,
  field,
  borderless,
  bgClass,
  labelProps,
  name,
  placeholder,
  onChange,
  ...props
}: AutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<Maybe<HTMLInputElement>>(null);

  const [open, setOpen] = useState(false);

  const [localValue, setLocalValue] = useState('');
  const [formValue, setFormValue] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

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

  const dependent = !!(dependsOn && !options.length);
  const canSelect =
    (!maxOptions || selected.length < maxOptions) && filteredOptions.length > 0;

  const handleUnselect = useCallback((value: string) => {
    setSelected((prev) => prev.filter((s) => s !== value));
  }, []);

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
        setLocalValue(getOptionLabel(val) as string);
      }
    }
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

  const { key, ...formProps } = getInputProps({ field, name });
  delete formProps.defaultValue;

  const changeValue = useCallback((value: string) => {
    if (value !== undefined) {
      setFormValue(value);
      // setReactInputValue(mainRef.current, value)
      // inputRef.current?.focus()
      // onChange?.(value);
    }
  }, []);

  const reset = () => {
    setSelected([]);
    setLocalValue('');
    changeValue('');
  };

  useEffect(() => {
    const value = selected.join('|');
    changeValue(value);
  }, [selected]);

  useEffect(() => {
    const found = selected.reduce((acc, val) => {
      return acc && options.some((option) => getOptionValue(option) === val);
    }, true);

    if (!found) {
      reset();
    }
  }, [options]);

  console.log(filteredOptions, selected, inputValue, canSelect);

  return (
    <InputWrapper
      borderless={borderless}
      className={className}
      field={field}
      label={label}
      labelProps={labelProps}
      wrapperRef={inputRef}
      bgClass={bgClass}
    >
      <Command
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex flex-wrap gap-1">
            {multiple &&
              selected.map((value) => {
                return (
                  <Chip
                    key={value}
                    label={getOptionLabel(
                      options.find(
                        (option) => getOptionValue(option) === value,
                      ),
                    )}
                    onRemove={() => handleUnselect(value)}
                  />
                );
              })}
            {/* Avoid having the "Search" Icon */}
            {canSelect && (
              <CommandPrimitive.Input
                ref={inputRef}
                value={inputValue}
                onValueChange={setInputValue}
                onBlur={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                disabled={!canSelect}
              />
            )}
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
        <CommandList>
          {open && filteredOptions.length > 0 ? (
            <div className="bg-popover text-popover-foreground absolute top-0 z-10 w-full rounded-md border shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {filteredOptions.map((option) => {
                  return (
                    <CommandItem
                      key={getOptionValue(option)}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        console.log({ value });
                        handleSelect(option);
                      }}
                      className="cursor-pointer"
                    >
                      {getOptionLabel(option)}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </Command>
    </InputWrapper>
  );
}
