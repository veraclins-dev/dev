import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  getOptionValue,
  Icon,
  type IconName,
  type ObjectOption,
  type SelectProps,
} from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import { type WithShortcuts } from '../types';

import { MenuButton } from './menu-button';

export interface Option extends ObjectOption, WithShortcuts {
  label: string;
  icon: IconName;
  className?: string;
}

export type MenuSelectIconProps = SelectProps & {
  options: Option[];
  className?: string;
  defaultLabel?: IconName;
  /**
   * Used to display what this button is responsible for. Ex: "Ordered list".
   */
  tooltip?: string;
  onClose: () => void;
};

export const MenuSelectIcons = ({
  options,
  defaultLabel = 'text-align-left',
  value,
  className,
  onValueChange,
  tooltip,
  onClose,
}: MenuSelectIconProps) => {
  const selected = options.find(
    (option: Option) => getOptionValue(option) === value,
  );

  const trigger = selected?.icon ?? defaultLabel;

  const handleValueChange = (value: string) => {
    onValueChange?.(value);
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DropdownMenuTrigger
        className={cn(
          'flex h-7 items-center justify-between rounded-md px-2 py-1 hover:bg-secondary-hover hover:text-secondary-foreground',
          className,
        )}
        tooltip={tooltip}
      >
        <Icon name={trigger} size="sm" /> <Icon name="chevron-down" />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className="max-h-64 min-w-fit p-2 overflow-y-scroll"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuArrow />
          <DropdownMenuRadioGroup
            value={value}
            onValueChange={handleValueChange}
            className="flex-row"
          >
            {options.map((option) => (
              <DropdownMenuRadioItem
                // asChild
                className={option.className}
                key={getOptionValue(option)}
                value={getOptionValue(option)}
                indicatorHidden
              >
                <MenuButton
                  className="flex-1 bg-transparent hover:bg-transparent h-6"
                  onClick={() => handleValueChange(getOptionValue(option))}
                  icon={option.icon}
                  label={option.label}
                  shortcutKeys={option.shortcutKeys}
                />
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};
