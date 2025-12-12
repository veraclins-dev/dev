import { cva, type VariantProps } from '@veraclins-dev/cva';

import { styleProps } from './styles';

/** ::::::::: List ::::::::: */
const listVariants = cva({
  base: 'group/list flex flex-col list-inside',
  responsive: {
    ...styleProps,
  },
  variants: {
    variant: {
      // Unordered list variants
      'unordered-disc': 'list-disc',
      'unordered-circle': 'list-[circle]',
      'unordered-square': 'list-[square]',
      // Ordered list variants
      'ordered-decimal': 'list-decimal',
      'ordered-roman': 'list-[lower-roman]',
      'ordered-upper-roman': 'list-[upper-roman]',
      'ordered-alpha': 'list-[lower-alpha]',
      'ordered-upper-alpha': 'list-[upper-alpha]',
      // No markers
      none: 'list-none',
    },
  },
  defaultVariants: {
    variant: 'none',
  },
});

type ListVariants = VariantProps<typeof listVariants>;

export { type ListVariants, listVariants };
