import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@veraclins-dev/utils';

const buttonDefaultClasses =
  "cursor-pointer inline-flex items-center justify-center gap-2 px-3 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

const buttonVariant = {
  default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
  destructive:
    'bg-destructive text-white shadow-xs hover:bg-destructive/90 dark:bg-destructive/60',
  outline:
    'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
  light: 'bg-primary/40 text-primary-foreground/90 hover:bg-primary/60',
  secondary:
    'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
  'secondary-light':
    'bg-secondary/40 text-secondary-foreground/90 hover:bg-secondary/60',
  ghost: 'hover:bg-accent hover:border-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
  'primary-outline': 'border border-primary text-primary hover:bg-primary/80',
  plain: '',
};

const buttonVariants = cva(buttonDefaultClasses, {
  variants: {
    variant: buttonVariant,
    size: {
      default: 'px-4 py-2',
      sm: 'py-1.5 px-3',
      lg: 'py-3 px-8',
      xl: 'py-4 px-12',
      pill: 'px-12 py-3 leading-3',
      icon: 'size-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  asChild?: boolean;
}

const ButtonBase = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonBaseProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export {
  ButtonBase,
  type ButtonBaseProps,
  buttonDefaultClasses,
  buttonVariant,
  type ButtonVariants,
};
