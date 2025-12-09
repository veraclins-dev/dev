import { cva, type VariantProps } from '@veraclins-dev/cva';

import { styleProps } from './styles';

/** ::::::::: Box ::::::::: */
const BOX_DEFAULT_CLASSES = '';

const boxVariants = cva({
  base: BOX_DEFAULT_CLASSES,
  responsive: {
    ...styleProps,
  },
  variants: {},
  defaultVariants: {},
});

type BoxVariants = VariantProps<typeof boxVariants>;

export { type BoxVariants, boxVariants };
