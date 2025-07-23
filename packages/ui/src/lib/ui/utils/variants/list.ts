import { type VariantProps } from '@veraclins-dev/cva';
import { cva } from '@veraclins-dev/cva';

import { styleProps } from './styles';

/** ::::::::: List ::::::::: */
const listVariants = cva({
  base: 'group',
  responsive: {
    ...styleProps,
  },
  variants: {
    variant: {
      ul: 'list-disc',
      ol: 'list-decimal',
      none: 'list-none',
    },
    marker: {
      default: '',
      circle: 'list-[circle] pl-6',
      square: 'list-[square] pl-6',
      roman: 'list-[lower-roman] pl-6',
      alpha: 'list-[lower-alpha] pl-6',
      decimal: 'list-decimal pl-6',
      disc: 'list-disc pl-6',
    },
  },
  compoundVariants: [
    {
      variant: 'ul',
      marker: 'default',
      className: 'list-disc',
    },
    {
      variant: 'ol',
      marker: 'default',
      className: 'list-decimal',
    },
  ],
  defaultVariants: {
    variant: 'ul',
    marker: 'default',
  },
});

type ListVariants = VariantProps<typeof listVariants>;

export { type ListVariants, listVariants };
