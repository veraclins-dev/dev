import { cva, type VariantProps } from '@veraclins-dev/cva';

import { styleProps } from './styles';

/** ::::::::: Box ::::::::: */
const BOX_DEFAULT_CLASSES = '';

const boxVariants = cva({
  base: BOX_DEFAULT_CLASSES,
  responsive: {
    ...styleProps,
  },
  variants: {
    // Layout props
    flexDirection: {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
    items: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    flexWrap: {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
    flex: {
      '1': 'flex-1',
      auto: 'flex-auto',
      initial: 'flex-initial',
      none: 'flex-none',
    },
  },
  defaultVariants: {},
});

type BoxVariants = VariantProps<typeof boxVariants>;

export { type BoxVariants, boxVariants };
