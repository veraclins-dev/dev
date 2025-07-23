import { type VariantProps } from '@veraclins-dev/cva';
import { cva } from '@veraclins-dev/cva';

const separatorVariants = cva({
  base: 'shrink-0',
  responsive: {},
  variants: {
    variant: {
      solid: 'bg-border',
      dashed: 'border-t border-dashed border-border',
      dotted: 'border-t border-dotted border-border',
      gradient: 'bg-gradient-to-r from-transparent via-border to-transparent',
    },
    orientation: {
      horizontal: 'w-full h-px min-w-3',
      vertical: 'h-full w-px min-h-3',
    },
  },
  compoundVariants: [
    // Vertical orientation with dashed variant
    {
      orientation: 'vertical',
      variant: 'dashed',
      className: 'border-l border-dashed border-border',
    },
    // Vertical orientation with dotted variant
    {
      orientation: 'vertical',
      variant: 'dotted',
      className: 'border-l border-dotted border-border',
    },
    // Vertical orientation with gradient variant
    {
      orientation: 'vertical',
      variant: 'gradient',
      className: 'bg-gradient-to-b from-transparent via-border to-transparent',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    orientation: 'horizontal',
  },
} as const);

type SeparatorVariants = VariantProps<typeof separatorVariants>;

export { type SeparatorVariants, separatorVariants };
