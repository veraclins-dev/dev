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
      primary: '',
      secondary: '',
      destructive: '',
      success: '',
      warning: '',
      info: '',
      neutral: '',
    },
  },
  compoundVariants: [
    // Solid variant styles
    {
      variant: 'solid',
      color: 'primary',
      className: [
        'border-primary',
        'bg-primary',
        'text-primary-foreground',
        'hover:bg-primary-hover',
      ],
    },
    {
      variant: 'solid',
      color: 'secondary',
      className: [
        'border-secondary',
        'bg-secondary',
        'text-secondary-foreground',
        'hover:bg-secondary-hover',
      ],
    },
    {
      variant: 'solid',
      color: 'destructive',
      className: [
        'border-destructive',
        'bg-destructive',
        'text-destructive-foreground',
        'hover:bg-destructive-hover',
      ],
    },
    {
      variant: 'solid',
      color: 'success',
      className: [
        'border-success',
        'bg-success',
        'text-success-foreground',
        'hover:bg-success-hover',
      ],
    },
    {
      variant: 'solid',
      color: 'warning',
      className: [
        'border-warning',
        'bg-warning',
        'text-warning-foreground',
        'hover:bg-warning-hover',
      ],
    },
    {
      variant: 'solid',
      color: 'info',
      className: [
        'border-info',
        'bg-info',
        'text-info-foreground',
        'hover:bg-info-hover',
      ],
    },
    {
      variant: 'solid',
      color: 'neutral',
      className: [
        'border-neutral',
        'bg-neutral',
        'text-neutral-foreground',
        'hover:bg-neutral-hover',
      ],
    },
    // Outline variant styles
    {
      variant: 'outline',
      color: 'primary',
      className: [
        'border-primary',
        'text-primary',
        'hover:bg-primary-soft',
        'data-[active=true]:bg-primary-soft',
        'hover:text-primary-soft-foreground',
      ],
    },
    {
      variant: 'outline',
      color: 'secondary',
      className: [
        'border-secondary',
        'text-secondary',
        'hover:bg-secondary-soft',
        'data-[active=true]:bg-secondary-soft',
        'hover:text-secondary-soft-foreground',
      ],
    },
    {
      variant: 'outline',
      color: 'destructive',
      className: [
        'border-destructive',
        'text-destructive',
        'hover:bg-destructive-soft',
        'data-[active=true]:bg-destructive-soft',
        'hover:text-destructive-soft-foreground',
      ],
    },
    {
      variant: 'outline',
      color: 'success',
      className: [
        'border-success',
        'text-success',
        'hover:bg-success-soft',
        'data-[active=true]:bg-success-soft',
        'hover:text-success-soft-foreground',
      ],
    },
    {
      variant: 'outline',
      color: 'warning',
      className: [
        'border-warning',
        'text-warning',
        'hover:bg-warning-soft',
        'data-[active=true]:bg-warning-soft',
        'hover:text-warning-soft-foreground',
      ],
    },
    {
      variant: 'outline',
      color: 'info',
      className: [
        'border-info',
        'text-info',
        'hover:bg-info-soft',
        'data-[active=true]:bg-info-soft',
        'hover:text-info-soft-foreground',
      ],
    },
    {
      variant: 'outline',
      color: 'neutral',
      className: [
        'border-neutral-foreground',
        'text-neutral-foreground',
        'hover:bg-neutral-soft-hover',
        'data-[active=true]:bg-neutral-soft',
        'hover:text-neutral-soft-foreground',
      ],
    },
    // Soft variant styles
    {
      variant: 'soft',
      color: 'primary',
      className: [
        'border-primary-soft',
        'bg-primary-soft',
        'text-primary-soft-foreground',
        'hover:bg-primary-soft-hover',
      ],
    },
    {
      variant: 'soft',
      color: 'secondary',
      className: [
        'border-secondary-soft',
        'bg-secondary-soft',
        'text-secondary-soft-foreground',
        'hover:bg-secondary-soft-hover',
      ],
    },
    {
      variant: 'soft',
      color: 'destructive',
      className: [
        'border-destructive-soft',
        'bg-destructive-soft',
        'text-destructive-soft-foreground',
        'hover:bg-destructive-soft-hover',
      ],
    },
    {
      variant: 'soft',
      color: 'success',
      className: [
        'border-success-soft',
        'bg-success-soft',
        'text-success-soft-foreground',
        'hover:bg-success-soft-hover',
      ],
    },
    {
      variant: 'soft',
      color: 'warning',
      className: [
        'border-warning-soft',
        'bg-warning-soft',
        'text-warning-soft-foreground',
        'hover:bg-warning-soft-hover',
      ],
    },
    {
      variant: 'soft',
      color: 'info',
      className: [
        'border-info-soft',
        'bg-info-soft',
        'text-info-soft-foreground',
        'hover:bg-info-soft-hover',
      ],
    },
    {
      variant: 'soft',
      color: 'neutral',
      className: [
        'border-neutral-soft',
        'bg-neutral-soft',
        'text-neutral-soft-foreground',
        'hover:bg-neutral-soft-hover',
      ],
    },
  ] as const,
};

// Button-specific text and plain variant compound styles
const buttonSpecificCompoundVariants = [
  // Text variant styles
  {
    variant: 'text',
    color: 'primary',
    className: [
      'text-primary',
      'hover:bg-primary-soft',
      'data-[active=true]:bg-primary-soft',
      'hover:text-primary-soft-foreground',
    ],
  },
  {
    variant: 'text',
    color: 'secondary',
    className: [
      'text-secondary',
      'hover:bg-secondary-soft',
      'data-[active=true]:bg-secondary-soft',
      'hover:text-secondary-soft-foreground',
    ],
  },
  {
    variant: 'text',
    color: 'destructive',
    className: [
      'text-destructive',
      'hover:bg-destructive-soft',
      'data-[active=true]:bg-destructive-soft',
      'hover:text-destructive-soft-foreground',
    ],
  },
  {
    variant: 'text',
    color: 'success',
    className: [
      'text-success',
      'hover:bg-success-soft',
      'data-[active=true]:bg-success-soft',
      'hover:text-success-soft-foreground',
    ],
  },
  {
    variant: 'text',
    color: 'warning',
    className: [
      'text-warning',
      'hover:bg-warning-soft',
      'data-[active=true]:bg-warning-soft',
      'hover:text-warning-soft-foreground',
    ],
  },
  {
    variant: 'text',
    color: 'info',
    className: [
      'text-info',
      'hover:bg-info-soft',
      'data-[active=true]:bg-info-soft',
      'hover:text-info-soft-foreground',
    ],
  },
  {
    variant: 'text',
    color: 'neutral',
    className: [
      'text-neutral-foreground',
      'hover:bg-neutral-soft',
      'data-[active=true]:bg-neutral-soft',
      'hover:text-neutral-soft-foreground',
    ],
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
      sm: 'py-1 px-2',
      md: 'px-4 py-2',
      lg: 'py-3 px-6',
      xl: 'py-4 px-8',
      icon: 'p-2',
    },
    loading: {
      true: 'cursor-not-allowed',
      false: '',
    },
    fullWidth: {
      true: 'w-full flex-1',
      false: '',
    },
  },
  compoundVariants: [
    ...sharedBaseVariants.compoundVariants,
    ...buttonSpecificCompoundVariants,
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'secondary',
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
  compoundVariants: [
    ...sharedBaseVariants.compoundVariants.map((variant) => ({
      ...variant,
      className: variant.className.filter((c) => !c.includes('hover:')),
    })),
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
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
    color: 'primary',
    size: 'md',
  },
});

/** ::::::::: Box ::::::::: */
const BOX_DEFAULT_CLASSES = '';

const spaces = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48,
  52, 56, 60, 64, 72, 80, 96,
] as const;

type Spaces = (typeof spaces)[number];

/**
 * Returns an object mapping space values to the corresponding Tailwind class names.
 * #### Margin:
 * - m-1 m-2 m-3 m-4  m-5  m-6  m-7  m-8  m-9  m-10  m-11  m-12  m-14  m-16  m-20  m-24  m-28  m-32  m-36  m-40  m-44  m-48  m-52  m-56  m-60  m-64  m-72  m-80  m-96
 * - mx-1 mx-2 mx-3 mx-4 mx-5 mx-6 mx-7 mx-8 mx-9 mx-10 mx-11 mx-12 mx-14 mx-16 mx-20 mx-24 mx-28 mx-32 mx-36 mx-40 mx-44 mx-48 mx-52 mx-56 mx-60 mx-64 mx-72 mx-80 mx-96
 * - my-1 my-2 my-3 my-4 my-5 my-6 my-7 my-8 my-9 my-10 my-11 my-12 my-14 my-16 my-20 my-24 my-28 mt-32 my-36 my-40 my-44 my-48 my-52 my-56 my-60 my-64 my-72 my-80 my-96
 * - mt-1 mt-2 mt-3 mt-4 mt-5 mt-6 mt-7 mt-8 mt-9 mt-10 mt-11 mt-12 mt-14 mt-16 mt-20 mt-24 mt-28 mt-32 mt-36 mt-40 mt-44 mt-48 mt-52 mt-56 mt-60 mt-64 mt-72 mt-80 mt-96
 * - mr-1 mr-2 mr-3 mr-4 mr-5 mr-6 mr-7 mr-8 mr-9 mr-10 mr-11 mr-12 mr-14 mr-16 mr-20 mr-24 mr-28 mr-32 mr-36 mr-40 mr-48 mr-52 mr-56 mr-60 mr-64 mr-72 mr-80 mr-96
 * - mb-1 mb-2 mb-3 mb-4 mb-5 mb-6 mb-7 mb-8 mb-9 mb-10 mb-11 mb-12 mb-14 mb-16 mb-20 mb-24 mb-28 mt-32 mb-36 mb-40 mb-44 mb-48 mb-52 mb-56 mb-60 mb-64 mb-72 mb-80 mb-96
 * - ml-1 ml-2 ml-3 ml-4 ml-5 ml-6 ml-7 ml-8 ml-9 ml-10 ml-11 ml-12 ml-14 ml-16 ml-20 ml-24 ml-28 ml-32 ml-36 ml-40 ml-44 ml-48 ml-52 ml-56 ml-60 ml-64 ml-72 ml-80 ml-96
 *
 * #### Padding:
 * - p-1 p-2 p-3 p-4 p-5 p-6 p-7 p-8 p-9 p-10 p-11 p-12 p-14 p-16 p-20 p-24 p-28 p-32 p-36 p-40 p-44 p-48 p-52 p-56 p-60 p-64 p-72 p-80 p-96
 * - px-1 px-2 px-3 px-4 px-5 px-6 px-7 px-8 px-9 px-10 px-11 px-12 px-14 px-16 px-20 px-24 px-28 px-32 px-36 px-40 px-44 px-48 px-52 px-56 px-60 px-64 px-72 px-80 px-96
 * - py-1 py-2 py-3 py-4 py-5 py-6 py-7 py-8 py-9 py-10 py-11 py-12 py-14 py-16 py-20 py-24 py-28 pt-32 py-36 py-40 py-44 py-48 py-52 py-56 py-60 py-64 py-72 py-80 py-96
 * - pt-1 pt-2 pt-3 pt-4 pt-5 pt-6 pt-7 pt-8 pt-9 pt-10 pt-11 pt-12 pt-14 pt-16 pt-20 pt-24 pt-28 pt-32 pt-36 pt-40 pt-44 pt-48 pt-52 pt-56 pt-60 pt-64 pt-72 pt-80 pt-96
 * - pr-1 pr-2 pr-3 pr-4 pr-5 pr-6 pr-7 pr-8 pr-9 pr-10 pr-11 pr-12 pr-14 pr-16 pr-20 pr-24 pr-28 pr-32 pr-36 pr-40 pr-44 pr-48 pr-52 pr-56 pr-60 pr-64 pr-72 pr-80 pr-96
 * - pb-1 pb-2 pb-3 pb-4 pb-5 pb-6 pb-7 pb-8 pb-9 pb-10 pb-11 pb-12 pb-14 pb-16 pb-20 pb-24 pb-28 pb-32 pb-36 pb-40 pb-44 pb-48 pb-52 pb-56 pb-60 pb-64 pb-72 pb-80 pb-96
 * - pl-1 pl-2 pl-3 pl-4 pl-5 pl-6 pl-7 pl-8 pl-9 pl-10 pl-11 pl-12 pl-14 pl-16 pl-20 pl-24 pl-28 pl-32 pl-36 pl-40 pl-44 pl-48 pl-52 pl-56 pl-60 pl-64 pl-72 pl-80 pl-96
 *
 * #### Gap:
 * - gap-1 gap-2 gap-3 gap-4 gap-5 gap-6 gap-7 gap-8 gap-9 gap-10 gap-11 gap-12 gap-14 gap-16 gap-20 gap-24 gap-28 gap-32 gap-36 gap-40 gap-44 gap-48 gap-52 gap-56 gap-60 gap-64 gap-72 gap-80 gap-96
 * - gap-x-1 gap-x-2 gap-x-3 gap-x-4 gap-x-5 gap-x-6 gap-x-7 gap-x-8 gap-x-9 gap-x-10 gap-x-11 gap-x-12 gap-x-14 gap-x-16 gap-x-20 gap-x-24 gap-x-28 gap-x-32 gap-x-36 gap-x-40 gap-x-44 gap-x-48 gap-x-52 gap-x-56 gap-x-60 gap-x-64 gap-x-72 gap-x-80 gap-x-96
 * - gap-y-1 gap-y-2 gap-y-3 gap-y-4 gap-y-5 gap-y-6 gap-y-7 gap-y-8 gap-y-9 gap-y-10 gap-y-11 gap-y-12 gap-y-14 gap-y-16 gap-y-20 gap-y-24 gap-y-28 gap-y-32 gap-y-36 gap-y-40 gap-y-44 gap-y-48 gap-y-52 gap-y-56 gap-y-60 gap-y-64 gap-y-72 gap-y-80 gap-y-96
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
    mx: {
      ...getSpaceClass('mx'),
    },
    my: {
      ...getSpaceClass('my'),
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
    px: {
      ...getSpaceClass('px'),
    },
    py: {
      ...getSpaceClass('py'),
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
    marginX: {
      ...getSpaceClass('mx'),
    },
    marginY: {
      ...getSpaceClass('my'),
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
    paddingX: {
      ...getSpaceClass('px'),
    },
    paddingY: {
      ...getSpaceClass('py'),
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
    // Gap props
    gap: {
      ...getSpaceClass('gap'),
    },
    gapX: {
      ...getSpaceClass('gap-x'),
    },
    gapY: {
      ...getSpaceClass('gap-y'),
    },
    // Layout props
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
      'space-between': 'justify-between',
      'space-around': 'justify-around',
      'space-evenly': 'justify-evenly',
    },
    flexWrap: {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
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
      link: 'border-0 border-primary/30 hover: border-primary w-fit justify-start',
      button:
        'border border-transparent rounded-md text-sm font-medium ring-offset-background transition-colors',
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
      hover: 'border-b',
      always: 'border-b',
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
      className: 'py-1 px-2',
    },
    {
      type: 'button',
      size: 'md',
      className: 'px-4 py-2',
    },
    {
      type: 'button',
      size: 'lg',
      className: 'py-3 px-6',
    },
    {
      type: 'button',
      size: 'xl',
      className: 'py-4 px-8',
    },
    // Link type styles
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
      className: 'text-primary border-primary/30 hover:border-primary',
    },
    {
      type: 'link',
      color: 'primary',
      underline: 'always',
      className: 'text-primary border-primary hover:border-primary',
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
      className: 'text-secondary border-secondary/30 hover:border-secondary',
    },
    {
      type: 'link',
      color: 'secondary',
      underline: 'always',
      className: 'text-secondary border-secondary hover:border-secondary',
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
        'text-destructive border-destructive/30 hover:border-destructive',
    },
    {
      type: 'link',
      color: 'destructive',
      underline: 'always',
      className: 'text-destructive border-destructive hover:border-destructive',
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
      className: 'text-success border-success/30 hover:border-success',
    },
    {
      type: 'link',
      color: 'success',
      underline: 'always',
      className: 'text-success border-success hover:border-success',
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
      className: 'text-warning border-warning/30 hover:border-warning',
    },
    {
      type: 'link',
      color: 'warning',
      underline: 'always',
      className: 'text-warning border-warning hover:border-warning',
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
      className: 'text-info border-info/30 hover:border-info',
    },
    {
      type: 'link',
      color: 'info',
      underline: 'always',
      className: 'text-info border-info hover:border-info',
    },
  ],
  defaultVariants: {
    type: 'link',
    variant: 'solid',
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
