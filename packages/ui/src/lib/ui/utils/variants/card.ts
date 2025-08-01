import { cva, type VariantProps } from '@veraclins-dev/cva';

import { CARD_DEFAULT_CLASSES } from '../styles';

// Card variants
const cardVariants = cva({
  base: CARD_DEFAULT_CLASSES,
  responsive: {},
  variants: {
    elevated: {
      true: 'shadow-round',
      false: '',
    },
    borderless: {
      true: 'border-0',
      false: '',
    },
    cardSize: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  defaultVariants: {
    elevated: true,
    borderless: true,
    cardSize: 'md',
  },
});

type CardVariants = VariantProps<typeof cardVariants>;

export { type CardVariants, cardVariants };
