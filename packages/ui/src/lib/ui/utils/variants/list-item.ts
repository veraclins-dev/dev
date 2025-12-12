import { cva, type VariantProps } from '@veraclins-dev/cva';

import { styleProps } from './styles';

/** ::::::::: List Item ::::::::: */
const listItemVariants = cva({
  base: 'relative group-data-[marker=default]/list:flex',
  responsive: {
    ...styleProps,
  },
  variants: {
    variant: {
      default: '',
      clickable:
        'cursor-pointer transition-colors hover:bg-neutral-hover hover:text-neutral-foreground-hover focus:bg-neutral-hover focus:text-neutral-foreground-hover focus:outline-none',
      selectable:
        'cursor-pointer transition-colors focus:outline-none focus:bg-neutral-hover focus:text-neutral-foreground-hover hover:bg-neutral-hover hover:text-neutral-foreground-hover',
    },
    itemSize: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      default: '',
      primary: 'text-primary',
      secondary: 'text-secondary',
      destructive: 'text-destructive',
      success: 'text-success',
      warning: 'text-warning',
      info: 'text-info',
      neutral: 'text-neutral',
    },
    selected: {
      true: 'bg-neutral text-neutral-foreground',
      false: '',
    },
    focused: {
      true: 'bg-neutral-hover text-neutral-foreground-hover',
      false: '',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none',
      false: '',
    },
  },
  compoundVariants: [
    // Handle conflicts - selected takes precedence over focused
    {
      selected: true,
      focused: true,
      className: 'bg-neutral text-neutral-foreground',
    },
    // Disabled state overrides other states
    {
      disabled: true,
      selected: true,
      className:
        'opacity-50 cursor-not-allowed pointer-events-none bg-neutral text-neutral-foreground',
    },
    {
      disabled: true,
      focused: true,
      className:
        'opacity-50 cursor-not-allowed pointer-events-none bg-neutral-hover text-neutral-foreground-hover',
    },
    // Disable interactive variants when disabled
    {
      disabled: true,
      variant: 'clickable',
      className: 'opacity-50 cursor-not-allowed pointer-events-none',
    },
    {
      disabled: true,
      variant: 'selectable',
      className: 'opacity-50 cursor-not-allowed pointer-events-none',
    },
  ],
  defaultVariants: {
    variant: 'default',
    itemSize: 'md',
    weight: 'normal',
    color: 'default',
    selected: false,
    focused: false,
    disabled: false,
  },
});

type ListItemVariants = VariantProps<typeof listItemVariants>;

export { type ListItemVariants, listItemVariants };
