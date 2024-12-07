import { forwardRef } from 'react';

import {
  Icon,
  IconButton,
  type IconButtonProps,
  type IconName,
} from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import { type WithShortcuts } from '../types';

import { KeyboardShortcuts } from './keyboard-shortcuts';

export interface MenuButtonProps
  extends Omit<IconButtonProps, 'tooltip'>,
    WithShortcuts {
  isActive?: boolean;
  icon: IconName;
  /**
   * Used to display what this button is responsible for. Ex: "Ordered list".
   */
  label: string;
  iconProps?: Partial<React.ComponentProps<typeof Icon>>;
}

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ icon, iconProps, ...props }, ref) => (
    <Button {...props} ref={ref}>
      <Icon size="sm" name={icon} {...iconProps} />
    </Button>
  ),
);

MenuButton.displayName = 'MenuButton';

export type MenuTextButtonProps = Omit<MenuButtonProps, 'icon'>;

export const Button = forwardRef<HTMLButtonElement, MenuTextButtonProps>(
  ({ children, onClick, isActive, label, shortcutKeys, ...props }, ref) => (
    <IconButton
      {...props}
      onClick={onClick}
      variant="plain"
      className={cn(
        'h-7 rounded-md p-1 hover:bg-accent hover:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        isActive ? 'bg-accent font-bold text-accent-foreground' : '',
      )}
      type="button"
      tooltip={
        label || (shortcutKeys && shortcutKeys.length > 0) ? (
          <div className="flex items-center space-x-2">
            <span>{label}</span>
            {shortcutKeys && shortcutKeys.length > 0 && (
              <KeyboardShortcuts shortcutKeys={shortcutKeys} />
            )}
          </div>
        ) : (
          ''
        )
      }
      ref={ref}
    >
      {children}
    </IconButton>
  ),
);

Button.displayName = 'Button';

export const MenuTextButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (props, ref) => <Button ref={ref} {...props} />,
);

MenuTextButton.displayName = 'MenuTextButton';
