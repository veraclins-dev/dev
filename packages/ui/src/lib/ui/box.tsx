import { cva, type VariantProps } from 'class-variance-authority';
import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

export const spaces = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56,
  60, 64, 72, 80, 96,
] as const;

export type Spaces = (typeof spaces)[number];

// Define allowed container HTML elements
type ContainerElement =
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'header'
  | 'footer'
  | 'main'
  | 'nav'
  | 'span'
  | 'p';

// Base classes for Box
const BOX_DEFAULT_CLASSES = 'inline-flex flex-col';

// CVA configuration for Box variants
const boxVariants = cva(BOX_DEFAULT_CLASSES, {
  variants: {
    variant: {
      solid: 'shadow-sm',
      outline: 'bg-transparent border border-foreground/20',
      soft: 'bg-foreground/10',
    },
    color: {
      default: '',
      primary: '',
      secondary: '',
      destructive: '',
      success: '',
      warning: '',
      info: '',
      accent: '',
    },
    // Short-form spacing props
    m: {
      // Margin
      ...spaces.reduce((acc, space) => ({ ...acc, [space]: `m-${space}` }), {}),
    },
    mt: {
      // Margin-top
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `mt-${space}` }),
        {},
      ),
    },
    mr: {
      // Margin-right
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `mr-${space}` }),
        {},
      ),
    },
    mb: {
      // Margin-bottom
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `mb-${space}` }),
        {},
      ),
    },
    ml: {
      // Margin-left
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `ml-${space}` }),
        {},
      ),
    },
    p: {
      // Padding
      ...spaces.reduce((acc, space) => ({ ...acc, [space]: `p-${space}` }), {}),
    },
    pt: {
      // Padding-top
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `pt-${space}` }),
        {},
      ),
    },
    pr: {
      // Padding-right
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `pr-${space}` }),
        {},
      ),
    },
    pb: {
      // Padding-bottom
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `pb-${space}` }),
        {},
      ),
    },
    pl: {
      // Padding-left
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `pl-${space}` }),
        {},
      ),
    },
    // Long-form spacing props
    margin: {
      ...spaces.reduce((acc, space) => ({ ...acc, [space]: `m-${space}` }), {}),
    },
    marginTop: {
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `mt-${space}` }),
        {},
      ),
    },
    marginRight: {
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `mr-${space}` }),
        {},
      ),
    },
    marginBottom: {
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `mb-${space}` }),
        {},
      ),
    },
    marginLeft: {
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `ml-${space}` }),
        {},
      ),
    },
    padding: {
      ...spaces.reduce((acc, space) => ({ ...acc, [space]: `p-${space}` }), {}),
    },
    paddingTop: {
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `pt-${space}` }),
        {},
      ),
    },
    paddingRight: {
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `pr-${space}` }),
        {},
      ),
    },
    paddingBottom: {
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `pb-${space}` }),
        {},
      ),
    },
    paddingLeft: {
      ...spaces.reduce(
        (acc, space) => ({ ...acc, [space]: `pl-${space}` }),
        {},
      ),
    },
    display: {
      block: 'block',
      inline: 'inline',
      'inline-block': 'inline-block',
      flex: 'flex',
      'inline-flex': 'inline-flex',
      grid: 'grid',
      'inline-grid': 'inline-grid',
      none: 'none',
    },
    flexDirection: {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
    alignItems: {
      'flex-start': 'items-start',
      'flex-end': 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    justifyContent: {
      'flex-start': 'justify-start',
      'flex-end': 'justify-end',
      center: 'justify-center',
      'space-between': 'justify-between',
      'space-around': 'justify-around',
      'space-evenly': 'justify-evenly',
    },
  },
  compoundVariants: [
    // Solid variant styles
    {
      variant: 'solid',
      color: 'default',
      className: 'bg-foreground text-background hover:bg-foreground/90',
    },
    {
      variant: 'solid',
      color: 'primary',
      className: 'bg-primary text-primary-foreground hover:bg-primary/90',
    },
    {
      variant: 'solid',
      color: 'secondary',
      className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    },
    {
      variant: 'solid',
      color: 'destructive',
      className:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    },
    {
      variant: 'solid',
      color: 'success',
      className: 'bg-success text-success-foreground hover:bg-success/90',
    },
    {
      variant: 'solid',
      color: 'warning',
      className: 'bg-warning text-warning-foreground hover:bg-warning/90',
    },
    {
      variant: 'solid',
      color: 'info',
      className: 'bg-info text-info-foreground hover:bg-info/90',
    },
    {
      variant: 'solid',
      color: 'accent',
      className: 'bg-accent text-accent-foreground hover:bg-accent/90',
    },
    // Outline variant styles
    {
      variant: 'outline',
      color: 'default',
      className: 'border-foreground text-foreground hover:bg-foreground/10',
    },
    {
      variant: 'outline',
      color: 'primary',
      className: 'border-primary text-primary hover:bg-primary/10',
    },
    {
      variant: 'outline',
      color: 'secondary',
      className: 'border-secondary text-secondary hover:bg-secondary/10',
    },
    {
      variant: 'outline',
      color: 'destructive',
      className: 'border-destructive text-destructive hover:bg-destructive/10',
    },
    {
      variant: 'outline',
      color: 'success',
      className: 'border-success text-success hover:bg-success/10',
    },
    {
      variant: 'outline',
      color: 'warning',
      className: 'border-warning text-warning hover:bg-warning/10',
    },
    {
      variant: 'outline',
      color: 'info',
      className: 'border-info text-info hover:bg-info/10',
    },
    {
      variant: 'outline',
      color: 'accent',
      className: 'border-accent text-accent hover:bg-accent/10',
    },
    // Soft variant styles
    {
      variant: 'soft',
      color: 'default',
      className: 'bg-foreground/10 text-foreground hover:bg-foreground/20',
    },
    {
      variant: 'soft',
      color: 'primary',
      className: 'bg-primary/10 text-primary hover:bg-primary/20',
    },
    {
      variant: 'soft',
      color: 'secondary',
      className: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
    },
    {
      variant: 'soft',
      color: 'destructive',
      className: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
    },
    {
      variant: 'soft',
      color: 'success',
      className: 'bg-success/10 text-success hover:bg-success/20',
    },
    {
      variant: 'soft',
      color: 'warning',
      className: 'bg-warning/10 text-warning hover:bg-warning/20',
    },
    {
      variant: 'soft',
      color: 'info',
      className: 'bg-info/10 text-info hover:bg-info/20',
    },
    {
      variant: 'soft',
      color: 'accent',
      className: 'bg-accent/10 text-accent hover:bg-accent/20',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'default',
  },
});

interface BoxProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof boxVariants> {
  component?: ContainerElement;
  children?: React.ReactNode;
}

const Box = memo(
  ({
    component = 'div',
    className,
    variant,
    color,
    // Short-form spacing props
    m,
    mt,
    mr,
    mb,
    ml,
    p,
    pt,
    pr,
    pb,
    pl,
    // Long-form spacing props
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    display,
    flexDirection,
    alignItems,
    justifyContent,
    ...props
  }: BoxProps) => {
    const Component = component;

    return (
      <Component
        data-slot="box"
        className={cn(
          boxVariants({
            variant,
            color,
            // Use long-form props if provided, otherwise fall back to short-form
            m: margin ?? m,
            mt: marginTop ?? mt,
            mr: marginRight ?? mr,
            mb: marginBottom ?? mb,
            ml: marginLeft ?? ml,
            p: padding ?? p,
            pt: paddingTop ?? pt,
            pr: paddingRight ?? pr,
            pb: paddingBottom ?? pb,
            pl: paddingLeft ?? pl,
            display,
            flexDirection,
            alignItems,
            justifyContent,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

export { Box, type BoxProps, boxVariants };
