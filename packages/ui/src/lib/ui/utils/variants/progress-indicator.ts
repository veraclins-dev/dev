import { type VariantProps } from '@veraclins-dev/cva';
import { cva } from '@veraclins-dev/cva';

import { baseVariants } from './base';

const progressIndicatorVariants = cva({
  base: 'transition-all duration-300 ease-in-out h-full',
  responsive: {},
  variants: {
    variant: {
      linear: 'h-full',
      circular: 'fill-none stroke-linecap-round',
    },
    progressSize: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
    color: {
      ...baseVariants.variants.color,
    },
    indeterminate: {
      true: 'animate-progress-indeterminate',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'linear',
      color: 'primary',
      className: 'bg-primary',
    },
    {
      variant: 'linear',
      color: 'success',
      className: 'bg-success',
    },
    {
      variant: 'linear',
      color: 'warning',
      className: 'bg-warning',
    },
    {
      variant: 'linear',
      color: 'destructive',
      className: 'bg-destructive',
    },
    {
      variant: 'linear',
      color: 'info',
      className: 'bg-info',
    },
    {
      variant: 'linear',
      color: 'neutral',
      className: 'bg-neutral',
    },
    {
      variant: 'linear',
      color: 'secondary',
      className: 'bg-secondary',
    },
    {
      variant: 'circular',
      color: 'primary',
      className: 'stroke-primary',
    },
    {
      variant: 'circular',
      color: 'success',
      className: 'stroke-success',
    },
    {
      variant: 'circular',
      color: 'warning',
      className: 'stroke-warning',
    },
    {
      variant: 'circular',
      color: 'destructive',
      className: 'stroke-destructive',
    },
    {
      variant: 'circular',
      color: 'info',
      className: 'stroke-info',
    },
    {
      variant: 'circular',
      color: 'neutral',
      className: 'stroke-neutral',
    },
    {
      variant: 'circular',
      color: 'secondary',
      className: 'stroke-secondary',
    },
    {
      variant: 'circular',
      progressSize: 'sm',
      className: 'stroke-4',
    },
    {
      variant: 'circular',
      progressSize: 'md',
      className: 'stroke-6',
    },
    {
      variant: 'circular',
      progressSize: 'lg',
      className: 'stroke-8',
    },
    {
      variant: 'circular',
      progressSize: 'xl',
      className: 'stroke-10',
    },
  ],
  defaultVariants: {
    variant: 'linear',
    progressSize: 'md',
    color: 'primary',
    indeterminate: false,
  },
});

type ProgressIndicatorVariants = VariantProps<typeof progressIndicatorVariants>;

export { type ProgressIndicatorVariants, progressIndicatorVariants };
