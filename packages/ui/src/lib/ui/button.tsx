import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { type IconName } from '../icons';

import { Icon } from './icon';

const BUTTON_DEFAULT_CLASSES =
  "cursor-pointer inline-flex items-center justify-center gap-2 border border-transparent px-3 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-30 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-30 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

const buttonVariants = cva(BUTTON_DEFAULT_CLASSES, {
  variants: {
    variant: {
      solid: 'shadow-xs',
      outline: 'bg-transparent',
      text: 'bg-transparent',
      soft: 'shadow-xs',
      plain: 'bg-transparent',
    },
    color: {
      default: '',
      primary: '',
      secondary: '',
      destructive: '',
      success: '',
      warning: '',
      info: '',
      accent: '',
    },
    size: {
      sm: "py-1 px-2 [&_svg:not([class*='size-'])]:size-3",
      md: "px-4 py-2 [&_svg:not([class*='size-'])]:size-5",
      lg: "py-3 px-6 [&_svg:not([class*='size-'])]:size-6",
      xl: "py-4 px-8 [&_svg:not([class*='size-'])]:size-8",
      icon: "p-2 [&_svg:not([class*='size-'])]:size-5",
    },
    loading: {
      true: 'cursor-not-allowed',
      false: '',
    },
  },
  compoundVariants: [
    // Solid variant styles
    {
      variant: 'solid',
      color: 'default',
      className:
        'border-foreground bg-foreground text-background hover:bg-foreground/90',
    },
    {
      variant: 'solid',
      color: 'primary',
      className:
        'border-primary bg-primary text-primary-foreground hover:bg-primary/90',
    },
    {
      variant: 'solid',
      color: 'secondary',
      className:
        'border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80',
    },
    {
      variant: 'solid',
      color: 'destructive',
      className:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    },
    {
      variant: 'solid',
      color: 'success',
      className:
        'border-success bg-success text-success-foreground hover:bg-success/90',
    },
    {
      variant: 'solid',
      color: 'warning',
      className:
        'border-warning bg-warning text-warning-foreground hover:bg-warning/90',
    },
    {
      variant: 'solid',
      color: 'info',
      className: 'border-info bg-info text-info-foreground hover:bg-info/90',
    },
    {
      variant: 'solid',
      color: 'accent',
      className:
        'border-accent bg-accent text-accent-foreground hover:bg-accent/90',
    },
    // Outline variant styles
    {
      variant: 'outline',
      color: 'default',
      className: 'border-foreground text-foreground hover:bg-foreground/10',
    },
    {
      variant: 'outline',
      color: 'primary',
      className: 'border-primary text-primary hover:bg-primary/10',
    },
    {
      variant: 'outline',
      color: 'secondary',
      className: 'border-secondary text-secondary hover:bg-secondary/10',
    },
    {
      variant: 'outline',
      color: 'destructive',
      className: 'border-destructive text-destructive hover:bg-destructive/10',
    },
    {
      variant: 'outline',
      color: 'success',
      className: 'border-success text-success hover:bg-success/10',
    },
    {
      variant: 'outline',
      color: 'warning',
      className: 'border-warning text-warning hover:bg-warning/10',
    },
    {
      variant: 'outline',
      color: 'info',
      className: 'border-info text-info hover:bg-info/10',
    },
    {
      variant: 'outline',
      color: 'accent',
      className:
        'border-accent-foreground/20 text-accent/foreground/20 hover:bg-accent/40',
    },
    // Text variant styles
    {
      variant: 'text',
      color: 'default',
      className: 'text-foreground hover:bg-foreground/10',
    },
    {
      variant: 'text',
      color: 'primary',
      className: 'text-primary hover:bg-primary/10',
    },
    {
      variant: 'text',
      color: 'secondary',
      className: 'text-secondary hover:bg-secondary/10',
    },
    {
      variant: 'text',
      color: 'destructive',
      className: 'text-destructive hover:bg-destructive/10',
    },
    {
      variant: 'text',
      color: 'success',
      className: 'text-success hover:bg-success/10',
    },
    {
      variant: 'text',
      color: 'warning',
      className: 'text-warning hover:bg-warning/10',
    },
    {
      variant: 'text',
      color: 'info',
      className: 'text-info hover:bg-info/10',
    },
    {
      variant: 'text',
      color: 'accent',
      className: 'text-accent/foreground/20 hover:bg-accent/40',
    },
    // Soft variant styles
    {
      variant: 'soft',
      color: 'default',
      className:
        'border-foreground/20 bg-foreground/20 text-foreground hover:bg-foreground/30',
    },
    {
      variant: 'soft',
      color: 'primary',
      className:
        'border-primary/20 bg-primary/20 text-primary hover:bg-primary/30',
    },
    {
      variant: 'soft',
      color: 'secondary',
      className:
        'border-secondary/20 bg-secondary/20 text-secondary hover:bg-secondary/30',
    },
    {
      variant: 'soft',
      color: 'destructive',
      className:
        'border-destructive/20 bg-destructive/20 text-destructive hover:bg-destructive/30',
    },
    {
      variant: 'soft',
      color: 'success',
      className:
        'border-success/20 bg-success/20 text-success hover:bg-success/30',
    },
    {
      variant: 'soft',
      color: 'warning',
      className:
        'border-warning/20 bg-warning/20 text-warning hover:bg-warning/30',
    },
    {
      variant: 'soft',
      color: 'info',
      className: 'border-info/20 bg-info/20 text-info hover:bg-info/30',
    },
    {
      variant: 'soft',
      color: 'accent',
      className:
        'border-accent/80 bg-accent/80 text-accent-foreground/60 hover:bg-accent/30',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'default',
    size: 'md',
    loading: false,
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonVariant = ButtonVariants['variant'];
export type ButtonColor = ButtonVariants['color'];
export type ButtonSize = ButtonVariants['size'];

interface ButtonBaseProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  loading?: boolean;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
}

/**
 * A flexible button component for the design system, supporting structural variants and semantic colors.
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
const ButtonBase = memo(
  ({
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
  }: ButtonBaseProps) => {
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
        {leadingIcon && <Icon className="mr-2" name={leadingIcon} />}
        {children}
        {trailingIcon && <Icon className="ml-2" name={trailingIcon} />}
      </Comp>
    );
  },
);

ButtonBase.displayName = 'ButtonBase';

export {
  BUTTON_DEFAULT_CLASSES,
  ButtonBase,
  type ButtonBaseProps,
  type ButtonVariants,
  buttonVariants,
};
