import * as React from 'react';

import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './command';
import { Icon } from './icon';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { getOptionLabel, getOptionValue } from './select/select';
import { cn } from '@veraclins-dev/utils';
import { Option } from '../../types';

interface ComboboxProps {
  options: Option[];
}

export function ComboboxDemo({ options }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          // role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {getOptionLabel(
            options.find((option) => getOptionValue(option) === value),
          ) ?? 'Select option...'}
          <Icon className="ml-2 shrink-0 opacity-50" name="chevron-down" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search options..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => {
              const val = getOptionValue(option);
              return (
                <CommandItem
                  key={val}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Icon
                    name="check"
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === val ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {getOptionLabel(option)}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
