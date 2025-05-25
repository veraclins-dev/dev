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

export const MenuButton = ({ icon, iconProps, ...props }: MenuButtonProps) => (
  <Button {...props}>
    <Icon size="sm" name={icon} {...iconProps} />
  </Button>
);

export type MenuTextButtonProps = Omit<MenuButtonProps, 'icon'>;

export const Button = ({
  children,
  onClick,
  isActive,
  label,
  shortcutKeys,
  ...props
}: MenuTextButtonProps) => (
  <IconButton
    {...props}
    onClick={onClick}
    variant={isActive ? 'solid' : 'soft'}
    color="accent"
    className={cn(
      'size-7 rounded-md p-1 bg-transparent border-0',
      isActive ? 'bg-accent font-bold' : '',
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
  >
    {children}
  </IconButton>
);

Button.displayName = 'Button';

export const MenuTextButton = (props: MenuButtonProps) => <Button {...props} />;
