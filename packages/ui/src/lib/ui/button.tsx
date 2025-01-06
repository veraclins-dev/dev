import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

export const buttonDefaultClasses =
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';

export const buttonVariant = {
  default: 'bg-avatar hover:bg-avatar/80',
  destructive:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border hover:border-brand-lightening hover:text-brand-lightening',
  primary: 'bg-primary text-primary-foreground hover:bg-primary/80',
  'primary-light':
    'bg-primary-light text-primary-light-foreground hover:bg-primary-light/80',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  'secondary-light':
    'bg-secondary-light text-secondary-light-foreground hover:bg-secondary-light/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
  'primary-outline': 'border border-primary text-primary hover:bg-primary/80',
  plain: '',
};

const buttonVariants = cva(buttonDefaultClasses, {
  variants: {
    variant: buttonVariant,
    size: {
      default: 'p-0.5',
      wide: 'px-24 py-5',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      pill: 'px-12 py-3 leading-3',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  asChild?: boolean;
}

export const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

ButtonBase.displayName = 'Button';
