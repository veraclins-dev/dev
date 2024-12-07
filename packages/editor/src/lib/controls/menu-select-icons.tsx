import {
  type BaseSelectProps,
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
} from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import { type WithShortcuts } from '../types';

import { MenuButton } from './menu-button';

export interface Option extends ObjectOption, WithShortcuts {
  label: string;
  icon: IconName;
  className?: string;
}

export interface MenuSelectIconProps extends BaseSelectProps {
  options: Option[];
  className?: string;
  defaultLabel?: IconName;
  /**
   * Used to display what this button is responsible for. Ex: "Ordered list".
   */
  tooltip?: string;
  onClose: () => void;
}

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
          'flex h-7 items-center justify-between rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground',
          className,
        )}
        tooltip={tooltip}
      >
        <Icon name={trigger} size="sm" /> <Icon name="chevron-down" />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className="max-h-64 p-2 overflow-y-scroll"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
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
                <div className="flex flex-1 gap-4 items-center justify-between">
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
