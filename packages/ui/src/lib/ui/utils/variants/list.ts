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
      ul: 'list-disc',
      ol: 'list-decimal',
      none: 'list-none',
    },
    marker: {
      default: '',
      circle: 'list-[circle]',
      square: 'list-[square]',
      roman: 'list-[lower-roman]',
      'upper-roman': 'list-[upper-roman]',
      alpha: 'list-[lower-alpha]',
      'upper-alpha': 'list-[upper-alpha]',
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
    {
      variant: 'none',
      marker: 'circle',
      className: 'pl-6',
    },
    {
      variant: 'none',
      marker: 'square',
      className: 'pl-6',
    },
    {
      variant: 'none',
      marker: 'roman',
      className: 'pl-6',
    },
    {
      variant: 'none',
      marker: 'upper-roman',
      className: 'pl-6',
    },
    {
      variant: 'none',
      marker: 'alpha',
      className: 'pl-6',
    },
    {
      variant: 'none',
      marker: 'upper-alpha',
      className: 'pl-6',
    },
  ],
  defaultVariants: {
    variant: 'ul',
    marker: 'default',
  },
});

type ListVariants = VariantProps<typeof listVariants>;

export { type ListVariants, listVariants };
