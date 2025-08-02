import {
  Box,
  Button as IconButton,
  type ButtonProps as IconButtonProps,
  Icon,
  type IconName,
  Typography,
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
  className,
  shortcutKeys,
  ...props
}: MenuTextButtonProps) => {
  return (
    <IconButton
      {...props}
      onClick={onClick}
      variant="plain"
      // color="secondary"
      className={cn(
        'size-7 rounded-md p-1 border-0 hover:bg-neutral-soft-hover',
        isActive ? 'font-bold bg-neutral-soft' : '',
        className,
      )}
      data-active={isActive}
      type="button"
      tooltip={
        label || (shortcutKeys && shortcutKeys.length > 0) ? (
          <Box display="flex" items="center" gap={2}>
            <Typography>{label}</Typography>
            {shortcutKeys && shortcutKeys.length > 0 && (
              <KeyboardShortcuts shortcutKeys={shortcutKeys} />
            )}
          </Box>
        ) : (
          ''
        )
      }
    >
      {children}
    </IconButton>
  );
};

Button.displayName = 'Button';

export const MenuTextButton = (props: MenuButtonProps) => <Button {...props} />;
