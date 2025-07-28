import { cva, type VariantProps } from '@veraclins-dev/cva';

import { BADGE_DEFAULT_CLASSES } from '../styles';

import { baseVariants } from './base';
import { styleProps } from './styles';

// Badge variants
const badgeVariants = cva({
  base: BADGE_DEFAULT_CLASSES,
  responsive: {
    ...styleProps,
  },
  variants: {
    ...baseVariants.variants,
    badgeSize: {
      sm: 'px-1.5 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3.5 py-1.5 text-sm',
      xl: 'px-4.5 py-2 text-base',
    },
  },
  compoundVariants: [
    ...baseVariants.compoundVariants.map((variant) => ({
      ...variant,
      className: variant.className.filter((c) => !c.includes('hover:')),
    })),
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    badgeSize: 'md',
  },
});

type BadgeVariants = VariantProps<typeof badgeVariants>;

export { type BadgeVariants, badgeVariants };
