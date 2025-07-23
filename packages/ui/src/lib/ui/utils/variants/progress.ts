import { type VariantProps } from '@veraclins-dev/cva';
import { cva } from '@veraclins-dev/cva';

/** :::::::::: Progress Bar ::::::::: */

const progressVariants = cva({
  base: 'relative overflow-hidden rounded-full',
  responsive: {},
  variants: {
    variant: {
      linear: 'w-full bg-neutral-soft',
      circular: 'inline-flex items-center justify-center',
    },
    progressSize: {
      sm: 'text-[6px]',
      md: 'text-[8px]',
      lg: 'text-xs',
      xl: 'text-sm',
    },
  },
  compoundVariants: [
    {
      variant: 'linear',
      progressSize: 'sm',
      className: 'h-1 ',
    },
    {
      variant: 'linear',
      progressSize: 'md',
      className: 'h-2',
    },
    {
      variant: 'linear',
      progressSize: 'lg',
      className: 'h-3',
    },
    {
      variant: 'linear',
      progressSize: 'xl',
      className: 'h-4',
    },
    {
      variant: 'circular',
      progressSize: 'sm',
      className: 'size-8 stroke-4',
    },
    {
      variant: 'circular',
      progressSize: 'md',
      className: 'size-12 stroke-6',
    },
    {
      variant: 'circular',
      progressSize: 'lg',
      className: 'size-16 stroke-8',
    },
    {
      variant: 'circular',
      progressSize: 'xl',
      className: 'size-20 stroke-10',
    },
  ],
  defaultVariants: {
    variant: 'linear',
    progressSize: 'md',
  },
});

type ProgressVariants = VariantProps<typeof progressVariants>;

export { type ProgressVariants, progressVariants };
