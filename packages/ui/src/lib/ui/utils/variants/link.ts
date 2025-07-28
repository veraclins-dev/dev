import { cva, type VariantProps } from '@veraclins-dev/cva';

import { LINK_DEFAULT_CLASSES } from '../styles';

import { baseActionCompoundVariants, baseVariants } from './base';
import { styleProps } from './styles';

/** ::::::::: Link ::::::::: */
const linkVariants = cva({
  base: LINK_DEFAULT_CLASSES,
  responsive: {
    ...styleProps,
  },
  variants: {
    type: {
      link: 'border-0 border-primary/30 hover:border-primary w-fit justify-start',
      button:
        'border border-transparent rounded-md text-sm font-medium ring-offset-background transition-colors',
    },
    variant: {
      ...baseVariants.variants.variant,
      text: '',
      plain: 'bg-transparent',
    },
    color: baseVariants.variants.color,
    underline: {
      none: '',
      hover: '',
      always: 'border-b-2',
    },
    linkSize: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  compoundVariants: [
    // Button type styles (reusing shared and button-specific compound variants)
    ...baseVariants.compoundVariants.map((variant) => ({
      ...variant,
      type: 'button' as const,
    })),
    ...baseActionCompoundVariants.map((variant) => ({
      ...variant,
      type: 'button' as const,
    })),
    // Button type size styles
    {
      type: 'button',
      linkSize: 'sm',
      className: 'py-1 px-2',
    },
    {
      type: 'button',
      linkSize: 'md',
      className: 'px-4 py-2',
    },
    {
      type: 'button',
      linkSize: 'lg',
      className: 'py-3 px-6',
    },
    {
      type: 'button',
      linkSize: 'xl',
      className: 'py-4 px-8',
    },
    // Link type styles
    {
      type: 'link',
      underline: 'hover',
      className: 'border-b-2 border-transparent hover:border-border',
    },
    {
      type: 'link',
      underline: 'always',
      className: 'border-b-2 border-border',
    },
    {
      type: 'link',
      color: 'primary',
      underline: 'none',
      className: 'text-primary',
    },
    {
      type: 'link',
      color: 'primary',
      underline: 'hover',
      className:
        'border-b-2 text-primary border-primary/30 hover:border-primary',
    },
    {
      type: 'link',
      color: 'primary',
      underline: 'always',
      className: 'border-b-2 text-primary border-primary',
    },
    {
      type: 'link',
      color: 'secondary',
      underline: 'none',
      className: 'text-secondary',
    },
    {
      type: 'link',
      color: 'secondary',
      underline: 'hover',
      className:
        'border-b-2 text-secondary border-secondary/30 hover:border-secondary',
    },
    {
      type: 'link',
      color: 'secondary',
      underline: 'always',
      className: 'border-b-2 text-secondary border-secondary',
    },
    {
      type: 'link',
      color: 'destructive',
      underline: 'none',
      className: 'text-destructive',
    },
    {
      type: 'link',
      color: 'destructive',
      underline: 'hover',
      className:
        'border-b-2 text-destructive border-destructive/30 hover:border-destructive',
    },
    {
      type: 'link',
      color: 'destructive',
      underline: 'always',
      className: 'border-b-2 text-destructive border-destructive',
    },
    {
      type: 'link',
      color: 'success',
      underline: 'none',
      className: 'text-success',
    },
    {
      type: 'link',
      color: 'success',
      underline: 'hover',
      className:
        'border-b-2 text-success border-success/30 hover:border-success',
    },
    {
      type: 'link',
      color: 'success',
      underline: 'always',
      className: 'border-b-2 text-success border-success',
    },
    {
      type: 'link',
      color: 'warning',
      underline: 'none',
      className: 'text-warning',
    },
    {
      type: 'link',
      color: 'warning',
      underline: 'hover',
      className:
        'border-b-2 text-warning border-warning/30 hover:border-warning',
    },
    {
      type: 'link',
      color: 'warning',
      underline: 'always',
      className: 'border-b-2 text-warning border-warning',
    },
    {
      type: 'link',
      color: 'info',
      underline: 'none',
      className: 'text-info',
    },
    {
      type: 'link',
      color: 'info',
      underline: 'hover',
      className: 'border-b-2 text-info border-info/30 hover:border-info',
    },
    {
      type: 'link',
      color: 'info',
      underline: 'always',
      className: 'border-b-2 text-info border-info',
    },
  ],
  defaultVariants: {
    type: 'link',
    variant: 'solid',
    underline: 'hover',
    linkSize: 'md',
  },
});

type LinkVariants = VariantProps<typeof linkVariants>;

export { type LinkVariants, linkVariants };
