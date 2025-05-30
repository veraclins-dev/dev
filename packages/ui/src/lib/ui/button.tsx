import { Slot } from '@radix-ui/react-slot';
import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { type IconName } from '../icons';

import { Icon } from './icon';
import { type ButtonVariants, buttonVariants } from './variants';

export type ButtonVariant = ButtonVariants['variant'];
export type ButtonColor = ButtonVariants['color'];
export type ButtonSize = ButtonVariants['size'];

interface ButtonBaseProps
  extends Omit<React.ComponentProps<'button'>, 'color'>,
    ButtonVariants {
  asChild?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  loading?: boolean;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
}

/**
 * A flexible button component for the design system, supporting structural variants and semantic colors.
 * The button supports various variants (solid, outline, text, soft) and colors (primary, secondary, destructive, etc.).
 * It can render as a Radix Slot child component for better integration with other components.
 * It also supports loading states with a spinner, leading and trailing icons, and accessibility features.
 */
function Component({
  className,
  variant = 'solid',
  color = 'default',
  size,
  asChild = false,
  type = 'button',
  loading = false,
  'aria-label': ariaLabel,
  leadingIcon,
  trailingIcon,
  children,
  disabled,
  ...props
}: ButtonBaseProps) {
  const Comp = asChild ? Slot : 'button';
  const isIconOnly =
    size === 'icon' && !children && !leadingIcon && !trailingIcon;
  if (isIconOnly && !ariaLabel && !props['aria-labelledby']) {
    console.warn(
      'Icon-only buttons require an aria-label or aria-labelledby for accessibility.',
    );
  }
  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, color, size, loading, className }),
      )}
      type={asChild ? undefined : type}
      aria-disabled={disabled || loading ? 'true' : undefined}
      disabled={disabled || loading}
      data-disabled={disabled || loading ? 'true' : undefined}
      aria-label={ariaLabel}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin size-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          role="status"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {leadingIcon && <Icon name={leadingIcon} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} />}
    </Comp>
  );
}

/**
 * A memoized flexible button component for the design system, supporting structural variants and semantic colors.
 * The button supports various variants (solid, outline, text, soft) and colors (primary, secondary, destructive, etc.).
 * It can render as a Radix Slot child component for better integration with other components.
 * It also supports loading states with a spinner, leading and trailing icons, and accessibility features.
 * @param {ButtonBaseProps} props - Component props
 * @param {ButtonVariant} [props.variant='solid'] - Structural style (solid, outline, text, soft)
 * @param {ButtonColor} [props.color='default'] - Semantic color (default, primary, secondary, destructive, etc.)
 * @param {ButtonSize} [props.size='default'] - Button size (default, sm, lg, xl, pill, icon)
 * @param {boolean} [props.asChild=false] - Render as a child component using Radix Slot
 * @param {boolean} [props.loading=false] - Show loading state with a spinner
 * @param {IconName} [props.leadingIcon] - Icon to display before the button content
 * @param {IconName} [props.trailingIcon] - Icon to display after the button content
 * @param {string} [props.type='button'] - Button type (button, submit, reset)
 * @param {string} [props.aria-label] - Accessible label for icon-only buttons
 * @param {React.Ref<HTMLButtonElement>} [props.ref] - Ref for the button element
 * @example
 * <ButtonBase variant="outline" color="destructive" size="lg" leadingIcon="trash">
 *   Delete
 * </ButtonBase>
 */
const ButtonBase = memo(Component);

export { ButtonBase, type ButtonBaseProps, type ButtonVariants };

// for storybook
export default Component;
