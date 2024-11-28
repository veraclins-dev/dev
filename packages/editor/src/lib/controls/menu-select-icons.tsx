import { type SelectProps } from '@radix-ui/react-select';
import React from 'react';
import { type WithShortcuts, type ObjectOption } from '#app/common/types.ts';
import { MenuButton } from '#app/components/rich-editor/controls/menu-button';
import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '#app/components/ui/dropdown-menu';
import { Icon, type IconName } from '#app/components/ui/icon';
import { getOptionValue } from '#app/components/ui/select/select';
import { cn } from '@veraclins-dev/utils';

export interface Option extends ObjectOption, WithShortcuts {
  label: string;
  icon: IconName;
  className?: string;
}

export interface MenuSelectProps extends SelectProps {
  options: Option[];
  className?: string;
  defaultLabel?: IconName;
  /**
   * Used to display what this button is responsible for. Ex: "Ordered list".
   */
  tooltip?: string;
}

export const MenuSelectIcons = ({
  options,
  defaultLabel = 'text-align-left',
  value,
  className,
  onValueChange,
  tooltip,
}: MenuSelectProps) => {
  const selected = options.find(
    (option: Option) => getOptionValue(option) === value,
  );

  const trigger = selected?.icon ?? defaultLabel;

  const handleValueChange = (value: string) => {
    console.log(value);
    onValueChange?.(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'flex h-8 items-center justify-between rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground',
          className,
        )}
        tooltip={tooltip}
      >
        <Icon name={trigger} size="sm" /> <Icon name="chevron-down" />
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
                  <MenuButton
                    className="flex-1"
                    onClick={() => handleValueChange(getOptionValue(option))}
                    icon={option.icon}
                    label={option.label}
                    shortcutKeys={option.shortcutKeys}
                  />
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};
