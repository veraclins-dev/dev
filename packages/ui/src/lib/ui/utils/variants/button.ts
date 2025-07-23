import { type VariantProps } from '@veraclins-dev/cva';
import { cva } from '@veraclins-dev/cva';

import { BUTTON_DEFAULT_CLASSES } from '../styles';

import { baseActionCompoundVariants, baseVariants } from './base';
import { styleProps } from './styles';

// Button variants
const buttonVariants = cva({
  base: BUTTON_DEFAULT_CLASSES,
  responsive: {
    ...styleProps,
  },
  variants: {
    ...baseVariants.variants,
    variant: {
      ...baseVariants.variants.variant,
      text: 'bg-transparent',
      plain: 'bg-transparent',
    },
    buttonSize: {
      sm: 'py-1 px-2',
      md: 'px-4 py-2',
      lg: 'py-3 px-6',
      xl: 'py-4 px-8',
      icon: 'p-2',
    },
    loading: {
      true: 'cursor-not-allowed',
      false: '',
    },
    fullWidth: {
      true: 'w-full flex-1',
      false: '',
    },
  },
  compoundVariants: [
    ...baseVariants.compoundVariants,
    ...baseActionCompoundVariants,
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'secondary',
    buttonSize: 'md',
    loading: false,
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

export { type ButtonVariants, buttonVariants };
