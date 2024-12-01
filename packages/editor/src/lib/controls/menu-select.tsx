import React from 'react';

import {
  type BaseSelectProps,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  getOptionLabel,
  getOptionValue,
  Icon,
  type ObjectOption,
} from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import { type WithShortcuts } from '../types';

import { KeyboardShortcuts } from './keyboard-shortcuts';

export interface MenuIconOption extends ObjectOption, WithShortcuts {
  label: React.ReactElement | React.ReactNode;
  className?: string;
}

export interface MenuSelectProps extends BaseSelectProps {
  options: MenuIconOption[];
  className?: string;
  defaultLabel?: string;
  /**
   * Used to display what this button is responsible for. Ex: "Ordered list".
   */
  tooltip?: string;
}

export const MenuSelect = ({
  options,
  defaultLabel = 'Change to',
  value,
  defaultValue,
  className,
  onValueChange,
  tooltip,
}: MenuSelectProps) => {
  const selected =
    options.find((option) => getOptionValue(option) === value) || defaultValue;

  const trigger = getOptionLabel(selected) ?? defaultLabel;

  const handleValueChange = (value: string) => {
    console.log(value);
    onValueChange?.(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'flex h-7 items-center justify-between rounded-md p-1 hover:bg-accent hover:text-accent-foreground',
          className,
        )}
        tooltip={tooltip}
      >
        {trigger} <Icon name="chevron-down" />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="max-h-64 overflow-y-scroll">
          <DropdownMenuArrow />
          <DropdownMenuRadioGroup
            value={value}
            onValueChange={handleValueChange}
          >
            {options.map((option) => (
              <DropdownMenuRadioItem
                // asChild
                className={option.className}
                key={getOptionValue(option)}
                value={getOptionValue(option)}
                indicatorHidden
              >
                <div className="flex flex-1 items-center justify-between">
                  {getOptionLabel(option)}
                  {option.shortcutKeys && option.shortcutKeys.length > 0 && (
                    <KeyboardShortcuts
                      shortcutKeys={option.shortcutKeys}
                      className="ml-2 text-xs"
                    />
                  )}
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};
