import { type VariantProps } from '@veraclins-dev/cva';
import { cva } from '@veraclins-dev/cva';

import { CHIP_DEFAULT_CLASSES } from '../styles';

import { baseVariants } from './base';
import { styleProps } from './styles';

// Chip variants
const chipVariants = cva({
  base: CHIP_DEFAULT_CLASSES,
  responsive: {
    ...styleProps,
  },
  variants: {
    ...baseVariants.variants,
    chipSize: {
      sm: 'p-0.5 text-xs',
      md: 'p-1 text-sm',
      lg: 'p-1.5 text-sm',
      xl: 'p-2 text-base',
    },
  },
  compoundVariants: [...baseVariants.compoundVariants],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    chipSize: 'md',
  },
});

type ChipVariants = VariantProps<typeof chipVariants>;

export { type ChipVariants, chipVariants };
