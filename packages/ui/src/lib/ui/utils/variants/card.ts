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
      sm: 'not-has-[[data-slot^=card-]]:p-2',
      md: 'not-has-[[data-slot^=card-]]:p-4',
      lg: 'not-has-[[data-slot^=card-]]:p-6',
      xl: 'not-has-[[data-slot^=card-]]:p-8',
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
