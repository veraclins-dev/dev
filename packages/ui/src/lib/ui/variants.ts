import { type VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import {
  BADGE_DEFAULT_CLASSES,
  BUTTON_DEFAULT_CLASSES,
  CHIP_DEFAULT_CLASSES,
  LINK_DEFAULT_CLASSES,
} from './styles';

/** :::::::::: Buttons, chips and badges ::::::::: */

// Shared base variants for variant and color
const sharedBaseVariants = {
  variants: {
    variant: {
      solid: '',
      outline: 'bg-transparent',
      soft: '',
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
  },
  compoundVariants: [
    // Solid variant styles
    {
      variant: 'solid',
      color: 'default',
      className:
        'border-foreground bg-foreground text-background hover:bg-foreground/90',
    },
    {
      variant: 'solid',
      color: 'primary',
      className:
        'border-primary bg-primary text-primary-foreground hover:bg-primary/90',
    },
    {
      variant: 'solid',
      color: 'secondary',
      className:
        'border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80',
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
      className:
        'border-success bg-success text-success-foreground hover:bg-success/90',
    },
    {
      variant: 'solid',
      color: 'warning',
      className:
        'border-warning bg-warning text-warning-foreground hover:bg-warning/90',
    },
    {
      variant: 'solid',
      color: 'info',
      className: 'border-info bg-info text-info-foreground hover:bg-info/90',
    },
    {
      variant: 'solid',
      color: 'accent',
      className:
        'border-accent bg-accent text-accent-foreground hover:bg-accent/90',
    },
    // Outline variant styles
    {
      variant: 'outline',
      color: 'default',
      className: 'border-foreground hover:bg-foreground/10',
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
      className:
        'border-accent-foreground/20 text-accent/foreground/20 hover:bg-accent/40',
    },
    // Soft variant styles
    {
      variant: 'soft',
      color: 'default',
      className: 'border-foreground/20 bg-foreground/20 hover:bg-foreground/30',
    },
    {
      variant: 'soft',
      color: 'primary',
      className:
        'border-primary/20 bg-primary/20 text-primary hover:bg-primary/30',
    },
    {
      variant: 'soft',
      color: 'secondary',
      className:
        'border-secondary/20 bg-secondary/20 text-secondary hover:bg-secondary/30',
    },
    {
      variant: 'soft',
      color: 'destructive',
      className:
        'border-destructive/20 bg-destructive/20 text-destructive hover:bg-destructive/30',
    },
    {
      variant: 'soft',
      color: 'success',
      className:
        'border-success/20 bg-success/20 text-success hover:bg-success/30',
    },
    {
      variant: 'soft',
      color: 'warning',
      className:
        'border-warning/20 bg-warning/20 text-warning hover:bg-warning/30',
    },
    {
      variant: 'soft',
      color: 'info',
      className: 'border-info/20 bg-info/20 text-info hover:bg-info/30',
    },
    {
      variant: 'soft',
      color: 'accent',
      className:
        'border-accent/80 bg-accent/80 text-accent-foreground/60 hover:bg-accent/30',
    },
  ] as const,
};

// Button-specific text and plain variant compound styles
const buttonSpecificCompoundVariants = [
  // Text variant styles
  {
    variant: 'text',
    color: 'default',
    className: 'hover:bg-foreground/10',
  },
  {
    variant: 'text',
    color: 'primary',
    className: 'text-primary hover:bg-primary/10',
  },
  {
    variant: 'text',
    color: 'secondary',
    className: 'text-secondary hover:bg-secondary/10',
  },
  {
    variant: 'text',
    color: 'destructive',
    className: 'text-destructive hover:bg-destructive/10',
  },
  {
    variant: 'text',
    color: 'success',
    className: 'text-success hover:bg-success/10',
  },
  {
    variant: 'text',
    color: 'warning',
    className: 'text-warning hover:bg-warning/10',
  },
  {
    variant: 'text',
    color: 'info',
    className: 'text-info hover:bg-info/10',
  },
  {
    variant: 'text',
    color: 'accent',
    className: 'text-accent/foreground/20 hover:bg-accent/40',
  },
] as const;

// Button variants
const buttonVariants = cva(BUTTON_DEFAULT_CLASSES, {
  variants: {
    ...sharedBaseVariants.variants,
    variant: {
      ...sharedBaseVariants.variants.variant,
      text: 'bg-transparent',
      plain: 'bg-transparent',
    },
    size: {
      sm: "py-1 px-2 [&_svg:not([class*='size-'])]:size-3",
      md: "px-4 py-2 [&_svg:not([class*='size-'])]:size-5",
      lg: "py-3 px-6 [&_svg:not([class*='size-'])]:size-6",
      xl: "py-4 px-8 [&_svg:not([class*='size-'])]:size-8",
      icon: "p-2 [&_svg:not([class*='size-'])]:size-5",
    },
    loading: {
      true: 'cursor-not-allowed',
      false: '',
    },
  },
  compoundVariants: [
    ...sharedBaseVariants.compoundVariants,
    ...buttonSpecificCompoundVariants,
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'default',
    size: 'md',
    loading: false,
  },
});

// Badge variants
const badgeVariants = cva(BADGE_DEFAULT_CLASSES, {
  variants: {
    ...sharedBaseVariants.variants,
    size: {
      sm: 'px-1.5 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3.5 py-1.5 text-sm',
      xl: 'px-4.5 py-2 text-base',
    },
  },
  compoundVariants: [...sharedBaseVariants.compoundVariants],
  defaultVariants: {
    variant: 'solid',
    color: 'default',
    size: 'md',
  },
});

// Chip variants
const chipVariants = cva(CHIP_DEFAULT_CLASSES, {
  variants: {
    ...sharedBaseVariants.variants,
    size: {
      sm: 'p-0.5 text-xs',
      md: 'p-1 text-sm',
      lg: 'p-1.5 text-sm',
      xl: 'p-2 text-base',
    },
  },
  compoundVariants: [...sharedBaseVariants.compoundVariants],
  defaultVariants: {
    variant: 'solid',
    color: 'default',
    size: 'md',
  },
});

/** ::::::::: Box ::::::::: */
const BOX_DEFAULT_CLASSES = 'flex flex-col';

const spaces = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56,
  60, 64, 72, 80, 96,
] as const;

type Spaces = (typeof spaces)[number];

/**
 * Returns an object mapping space values to the corresponding Tailwind class names.
 * #### Margin:
 * - m-4  m-5  m-6  m-7  m-8  m-9  m-10  m-11  m-12  m-14  m-16  m-20  m-24  m-28  m-32  m-36  m-40  m-44  m-48  m-52  m-56  m-60  m-64  m-72  m-80  m-96
 * - mt-4 mt-5 mt-6 mt-7 mt-8 mt-9 mt-10 mt-11 mt-12 mt-14 mt-16 mt-20 mt-24 mt-28 mt-32 mt-36 mt-40 mt-44 mt-48 mt-52 mt-56 mt-60 mt-64 mt-72 mt-80 mt-96
 * - mr-4 mr-5 mr-6 mr-7 mr-8 mr-9 mr-10 mr-11 mr-12 mr-14 mr-16 mr-20 mr-24 mr-28 mr-32 mr-36 mr-40 mr-48 mr-52 mr-56 mr-60 mr-64 mr-72 mr-80 mr-96
 * - mb-4 mb-5 mb-6 mb-7 mb-8 mb-9 mb-10 mb-11 mb-12 mb-14 mb-16 mb-20 mb-24 mb-28 mt-32 mb-36 mb-40 mb-44 mb-48 mb-52 mb-56 mb-60 mb-64 mb-72 mb-80 mb-96
 * - ml-4 ml-5 ml-6 ml-7 ml-8 ml-9 ml-10 ml-11 ml-12 ml-14 ml-16 ml-20 ml-24 ml-28 ml-32 ml-36 ml-40 ml-44 ml-48 ml-52 ml-56 ml-60 ml-64 ml-72 ml-80 ml-96
 *
 * #### Padding:
 * - p-4  p-5  p-6  p-7  p-8  p-9  p-10  p-11  p-12  p-14  p-16  p-20  p-24  p-28  p-32  p-36  p-40  p-44  p-48  p-52  p-56  p-60  p-64  p-72  p-80  p-96
 * - pt-4 pt-5 pt-6 pt-7 pt-8 pt-9 pt-10 pt-11 pt-12 pt-14 pt-16 pt-20 pt-24 pt-28 pt-32 pt-36 pt-40 pt-44 pt-48 pt-52 pt-56 pt-60 pt-64 pt-72 pt-80 pt-96
 * - pr-4 pr-5 pr-6 pr-7 pr-8 pr-9 pr-10 pr-11 pr-12 pr-14 pr-16 pr-20 pr-24 pr-28 pr-32 pr-36 pr-40 pr-44 pr-48 pr-52 pr-56 pr-60 pr-64 pr-72 pr-80 pr-96
 * - pb-4 pb-5 pb-6 pb-7 pb-8 pb-9 pb-10 pb-11 pb-12 pb-14 pb-16 pb-20 pb-24 pb-28 pb-32 pb-36 pb-40 pb-44 pb-48 pb-52 pb-56 pb-60 pb-64 pb-72 pb-80 pb-96
 * - pl-4 pl-5 pl-6 pl-7 pl-8 pl-9 pl-10 pl-11 pl-12 pl-14 pl-16 pl-20 pl-24 pl-28 pl-32 pl-36 pl-40 pl-44 pl-48 pl-52 pl-56 pl-60 pl-64 pl-72 pl-80 pl-96
 */
const getSpaceClass = (prefix: string) =>
  spaces.reduce(
    (acc, space) => ({ ...acc, [space]: `${prefix}-${space}` }),
    {},
  ) as Record<Spaces, string>;

const boxVariants = cva(BOX_DEFAULT_CLASSES, {
  variants: {
    // Short-form spacing props
    m: {
      ...getSpaceClass('m'),
    },
    mt: {
      ...getSpaceClass('mt'),
    },
    mr: {
      ...getSpaceClass('mr'),
    },
    mb: {
      ...getSpaceClass('mb'),
    },
    ml: {
      ...getSpaceClass('ml'),
    },
    p: {
      ...getSpaceClass('p'),
    },
    pt: {
      ...getSpaceClass('pt'),
    },
    pr: {
      ...getSpaceClass('pr'),
    },
    pb: {
      ...getSpaceClass('pb'),
    },
    pl: {
      ...getSpaceClass('pl'),
    },
    // Long-form spacing props
    margin: {
      ...getSpaceClass('m'),
    },
    marginTop: {
      ...getSpaceClass('mt'),
    },
    marginRight: {
      ...getSpaceClass('mr'),
    },
    marginBottom: {
      ...getSpaceClass('mb'),
    },
    marginLeft: {
      ...getSpaceClass('ml'),
    },
    padding: {
      ...getSpaceClass('p'),
    },
    paddingTop: {
      ...getSpaceClass('pt'),
    },
    paddingRight: {
      ...getSpaceClass('pr'),
    },
    paddingBottom: {
      ...getSpaceClass('pb'),
    },
    paddingLeft: {
      ...getSpaceClass('pl'),
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
  defaultVariants: {},
});

/** ::::::::: Typography ::::::::: */
const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl font-bold leading-tight',
      h2: 'text-3xl font-bold leading-tight',
      h3: 'text-2xl font-semibold leading-snug',
      h4: 'text-xl font-semibold leading-snug',
      h5: 'text-lg font-medium leading-normal',
      h6: 'text-base font-medium leading-normal',
      subtitle1: 'text-base font-normal leading-normal',
      subtitle2: 'text-sm font-medium leading-normal',
      body1: 'text-base font-normal leading-relaxed',
      body2: 'text-sm font-normal leading-relaxed',
      caption: 'text-xs font-normal leading-normal text-gray-500',
      overline: 'text-xs font-normal leading-normal uppercase tracking-wider',
      inherit: '',
    },
    align: {
      inherit: '',
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    gutterBottom: {
      true: 'mb-4',
      false: '',
    },
    noWrap: {
      true: 'truncate',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'body2',
    align: 'inherit',
    gutterBottom: false,
    noWrap: false,
  },
});

/** ::::::::: Link ::::::::: */
const linkVariants = cva(LINK_DEFAULT_CLASSES, {
  variants: {
    type: {
      link: 'border-0 border-b border-[currentColor]/20 w-fit',
      button:
        'border border-transparent inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors',
    },
    variant: {
      ...sharedBaseVariants.variants.variant,
      text: 'bg-transparent',
      plain: 'bg-transparent',
    },
    color: {
      ...sharedBaseVariants.variants.color,
    },
    underline: {
      none: '',
      hover: '',
      always: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  compoundVariants: [
    // Button type styles (reusing shared and button-specific compound variants)
    ...sharedBaseVariants.compoundVariants.map((variant) => ({
      ...variant,
      type: 'button' as const,
    })),
    ...buttonSpecificCompoundVariants.map((variant) => ({
      ...variant,
      type: 'button' as const,
    })),
    // Button type size styles
    {
      type: 'button',
      size: 'sm',
      className: "py-1 px-2 [&_svg:not([class*='size-'])]:size-3",
    },
    {
      type: 'button',
      size: 'md',
      className: "px-4 py-2 [&_svg:not([class*='size-'])]:size-5",
    },
    {
      type: 'button',
      size: 'lg',
      className: "py-3 px-6 [&_svg:not([class*='size-'])]:size-6",
    },
    {
      type: 'button',
      size: 'xl',
      className: "py-4 px-8 [&_svg:not([class*='size-'])]:size-8",
    },
    // Link type styles
    {
      type: 'link',
      color: 'default',
      underline: 'none',
      className: 'text-foreground',
    },
    {
      type: 'link',
      color: 'default',
      underline: 'hover',
      className: 'hover:border-b hover:border-foreground',
    },
    {
      type: 'link',
      color: 'default',
      underline: 'always',
      className: 'border-b border-foreground',
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
      className: 'text-primary hover:border-b hover:border-primary',
    },
    {
      type: 'link',
      color: 'primary',
      underline: 'always',
      className: 'text-primary border-b border-primary',
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
      className: 'text-secondary hover:border-b hover:border-secondary',
    },
    {
      type: 'link',
      color: 'secondary',
      underline: 'always',
      className: 'text-secondary border-b border-secondary',
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
      className: 'text-destructive hover:border-b hover:border-destructive',
    },
    {
      type: 'link',
      color: 'destructive',
      underline: 'always',
      className: 'text-destructive border-b border-destructive',
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
      className: 'text-success hover:border-b hover:border-success',
    },
    {
      type: 'link',
      color: 'success',
      underline: 'always',
      className: 'text-success border-b border-success',
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
      className: 'text-warning hover:border-b hover:border-warning',
    },
    {
      type: 'link',
      color: 'warning',
      underline: 'always',
      className: 'text-warning border-b border-warning',
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
      className: 'text-info hover:border-b hover:border-info',
    },
    {
      type: 'link',
      color: 'info',
      underline: 'always',
      className: 'text-info border-b border-info',
    },
    {
      type: 'link',
      color: 'accent',
      underline: 'none',
      className: 'text-accent-foreground/20',
    },
    {
      type: 'link',
      color: 'accent',
      underline: 'hover',
      className:
        'text-accent-foreground/20 hover:border-b hover:border-accent-foreground/20',
    },
    {
      type: 'link',
      color: 'accent',
      underline: 'always',
      className:
        'text-accent-foreground/20 border-b border-accent-foreground/20',
    },
  ],
  defaultVariants: {
    type: 'link',
    variant: 'solid',
    color: 'default',
    underline: 'hover',
    size: 'md',
  },
});

/** ::::::::: Variant Types ::::::::: */
type BadgeVariants = VariantProps<typeof badgeVariants>;
type BoxVariants = VariantProps<typeof boxVariants>;
type ButtonVariants = VariantProps<typeof buttonVariants>;
type ChipVariants = VariantProps<typeof chipVariants>;
type TypographyVariants = VariantProps<typeof typographyVariants>;
type LinkVariants = VariantProps<typeof linkVariants>;

export {
  type BadgeVariants,
  badgeVariants,
  type BoxVariants,
  boxVariants,
  type ButtonVariants,
  buttonVariants,
  type ChipVariants,
  chipVariants,
  type LinkVariants,
  linkVariants,
  type Spaces,
  spaces,
  type TypographyVariants,
  typographyVariants,
};
