import { cva, type VariantProps } from 'class-variance-authority';
import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Icon } from './icon';

const CHIP_DEFAULT_CLASSES =
  'inline-flex max-w-fit items-center justify-center gap-1.5 border border-transparent px-2.5 py-0.5 text-xs font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2 aria-invalid:border-destructive/20 dark:aria-invalid:border-destructive/40 shrink-0 [&_svg]:shrink-0';

const chipVariants = cva(CHIP_DEFAULT_CLASSES, {
  variants: {
    variant: {
      solid: 'shadow-xs',
      outline: 'bg-transparent',
      soft: 'shadow-xs',
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
      sm: 'p-0.5 text-xs',
      md: 'p-1 text-sm',
      lg: 'p-1.5 text-sm',
      xl: 'p-2 text-base',
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
  },
});

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof chipVariants> {
  label: string | React.ReactNode;
  onRemove?: React.MouseEventHandler<SVGSVGElement>;
}

const Chip = memo(
  ({
    className,
    variant,
    color,
    size = 'md',
    onRemove,
    label,
    ...props
  }: ChipProps) => {
    return (
      <div
        className={cn(chipVariants({ variant, color, size }), className)}
        {...props}
      >
        <span className="align-middle">{label}</span>
        {onRemove && (
          <Icon
            className={cn(
              'cursor-pointer opacity-60 p-0.5 hover:opacity-100 focus:outline-none',
              size === 'sm' && 'size-4',
              size === 'md' && 'size-5',
              size === 'lg' && 'size-6',
              size === 'xl' && 'size-7',
            )}
            onClick={onRemove}
            name="cancel"
            aria-label="Remove"
            tooltip="Remove"
          />
        )}
      </div>
    );
  },
);

Chip.displayName = 'Chip';

export { Chip, chipVariants };
