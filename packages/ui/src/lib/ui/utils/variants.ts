import { type VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { sizeVariants } from './size';
import { spaceVariants } from './spaces';
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
      primary: 'focus:ring-primary/50 focus-visible:ring-primary/50',
      secondary: 'focus:ring-secondary/50 focus-visible:ring-secondary/50',
      destructive:
        'focus:ring-destructive/50 focus-visible:ring-destructive/50',
      success: 'focus:ring-success/50 focus-visible:ring-success/50',
      warning: 'focus:ring-warning/50 focus-visible:ring-warning/50',
      info: 'focus:ring-info/50 focus-visible:ring-info/50',
      neutral: 'focus:ring-neutral/50 focus-visible:ring-neutral/50',
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

const boxVariants = cva(BOX_DEFAULT_CLASSES, {
  variants: {
    // Space variants
    ...spaceVariants,
    // Size variants
    ...sizeVariants,
    // Layout props
    display: {
      block: 'block',
      inline: 'inline',
      'inline-block': 'inline-block',
      flex: 'flex',
      'inline-flex': 'inline-flex',
      grid: 'grid',
      'inline-grid': 'inline-grid',
      hidden: 'hidden',
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
      caption: 'text-xs font-normal leading-normal',
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

/** ::::::::: List ::::::::: */
const listVariants = cva('group', {
  variants: {
    variant: {
      ul: 'list-disc',
      ol: 'list-decimal',
      none: 'list-none',
    },
    ...spaceVariants,
    marker: {
      default: '',
      circle: 'list-[circle] pl-6',
      square: 'list-[square] pl-6',
      roman: 'list-[lower-roman] pl-6',
      alpha: 'list-[lower-alpha] pl-6',
      decimal: 'list-decimal pl-6',
      disc: 'list-disc pl-6',
    },
  },
  compoundVariants: [
    {
      variant: 'ul',
      marker: 'default',
      className: 'list-disc',
    },
    {
      variant: 'ol',
      marker: 'default',
      className: 'list-decimal',
    },
  ],
  defaultVariants: {
    variant: 'ul',
    marker: 'default',
  },
});

/** ::::::::: List Item ::::::::: */
const listItemVariants = cva(
  // if the list item is a link, it should have a hover state
  'relative group-data-[marker=default]:flex',
  {
    variants: {
      variant: {
        default: '',
        clickable:
          'cursor-pointer hover:bg-neutral-hover hover:text-neutral-foreground-hover focus:bg-neutral-hover focus:text-neutral-foreground-hover focus:outline-none',
        selectable:
          'cursor-pointer transition-colors focus:outline-none focus:bg-neutral-hover focus:text-neutral-foreground-hover hover:bg-neutral-hover hover:text-neutral-foreground-hover',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      color: {
        default: '',
        primary: 'text-primary',
        secondary: 'text-secondary',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
        info: 'text-info',
        neutral: 'text-neutral',
      },
      selected: {
        true: 'bg-neutral text-neutral-foreground',
        false: '',
      },
      focused: {
        true: 'bg-neutral-hover text-neutral-foreground-hover',
        false: '',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    compoundVariants: [
      // Handle conflicts - selected takes precedence over focused
      {
        selected: true,
        focused: true,
        className: 'bg-neutral text-neutral-foreground', // selected wins
      },
      // Disabled state overrides other states
      {
        disabled: true,
        selected: true,
        className:
          'opacity-50 cursor-not-allowed pointer-events-none bg-neutral text-neutral-foreground',
      },
      {
        disabled: true,
        focused: true,
        className:
          'opacity-50 cursor-not-allowed pointer-events-none bg-neutral-hover text-neutral-foreground-hover',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      weight: 'normal',
      color: 'default',
      selected: false,
      focused: false,
      disabled: false,
    },
  },
);

/** ::::::::: Link ::::::::: */
const linkVariants = cva(LINK_DEFAULT_CLASSES, {
  variants: {
    type: {
      link: 'border-0 border-primary/30 hover:border-primary w-fit justify-start',
      button:
        'border border-transparent rounded-md text-sm font-medium ring-offset-background transition-colors',
    },
    variant: {
      ...sharedBaseVariants.variants.variant,
      text: '',
      plain: 'bg-transparent',
    },
    color: {
      ...sharedBaseVariants.variants.color,
    },
    underline: {
      none: '',
      hover: '',
      always: 'border-b-2',
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
    size: 'md',
  },
});

/** :::::::::: Progress Bar ::::::::: */

const progressVariants = cva('relative overflow-hidden rounded-full', {
  variants: {
    variant: {
      linear: 'w-full bg-neutral-soft',
      circular: 'inline-flex items-center justify-center',
    },
    size: {
      sm: 'text-[6px]',
      md: 'text-[8px]',
      lg: 'text-xs',
      xl: 'text-sm',
    },
  },
  compoundVariants: [
    {
      variant: 'linear',
      size: 'sm',
      className: 'h-1 ',
    },
    {
      variant: 'linear',
      size: 'md',
      className: 'h-2',
    },
    {
      variant: 'linear',
      size: 'lg',
      className: 'h-3',
    },
    {
      variant: 'linear',
      size: 'xl',
      className: 'h-4',
    },
    {
      variant: 'circular',
      size: 'sm',
      className: 'size-8 stroke-4',
    },
    {
      variant: 'circular',
      size: 'md',
      className: 'size-12 stroke-6',
    },
    {
      variant: 'circular',
      size: 'lg',
      className: 'size-16 stroke-8',
    },
    {
      variant: 'circular',
      size: 'xl',
      className: 'size-20 stroke-10',
    },
  ],
  defaultVariants: {
    variant: 'linear',
    size: 'md',
  },
});

const progressIndicatorVariants = cva(
  'transition-all duration-300 ease-in-out h-full',
  {
    variants: {
      variant: {
        linear: 'h-full',
        circular: 'fill-none stroke-linecap-round',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
      color: {
        ...sharedBaseVariants.variants.color,
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
        size: 'sm',
        className: 'stroke-4',
      },
      {
        variant: 'circular',
        size: 'md',
        className: 'stroke-6',
      },
      {
        variant: 'circular',
        size: 'lg',
        className: 'stroke-8',
      },
      {
        variant: 'circular',
        size: 'xl',
        className: 'stroke-10',
      },
    ],
    defaultVariants: {
      variant: 'linear',
      size: 'md',
      color: 'primary',
      indeterminate: false,
    },
  },
);

const separatorVariants = cva('shrink-0', {
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

/** ::::::::: Variant Types ::::::::: */
type BadgeVariants = VariantProps<typeof badgeVariants>;
type BoxVariants = VariantProps<typeof boxVariants>;
type ButtonVariants = VariantProps<typeof buttonVariants>;
type ChipVariants = VariantProps<typeof chipVariants>;
type TypographyVariants = VariantProps<typeof typographyVariants>;
type ListVariants = VariantProps<typeof listVariants>;
type ListItemVariants = VariantProps<typeof listItemVariants>;
type LinkVariants = VariantProps<typeof linkVariants>;
type ProgressVariants = VariantProps<typeof progressVariants>;
type ProgressIndicatorVariants = VariantProps<typeof progressIndicatorVariants>;
type SeparatorVariants = VariantProps<typeof separatorVariants>;

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
  type ListItemVariants,
  listItemVariants,
  type ListVariants,
  listVariants,
  type ProgressIndicatorVariants,
  progressIndicatorVariants,
  type ProgressVariants,
  progressVariants,
  type SeparatorVariants,
  separatorVariants,
  type TypographyVariants,
  typographyVariants,
};
