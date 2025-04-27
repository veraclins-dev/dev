import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, memo } from 'react';

import { cn } from '@veraclins-dev/utils';

// Type definitions
type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'inherit';

type Color =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'inherit';

type Align = 'inherit' | 'left' | 'center' | 'right' | 'justify';

const variantMapping: Record<Variant, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  inherit: 'p',
};

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
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      error: 'text-red-500',
      warning: 'text-yellow-500',
      info: 'text-blue-400',
      success: 'text-green-600',
      inherit: 'text-inherit',
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
    color: 'inherit',
    align: 'inherit',
    gutterBottom: false,
    noWrap: false,
  },
});

export type TypographyVariants = VariantProps<typeof typographyVariants>;

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    TypographyVariants {
  component?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export const Typography = memo(
  forwardRef<HTMLElement, TypographyProps>(
    (
      {
        variant: va = 'body2',
        color = 'inherit',
        align = 'inherit',
        gutterBottom = false,
        noWrap = false,
        component,
        className,
        children,
        ...props
      },
      ref,
    ) => {
      const variant = va ?? 'body2';
      const Component = component || variantMapping[variant] || 'p';

      return (
        <Component
          className={cn(
            typographyVariants({
              variant,
              color,
              align,
              gutterBottom,
              noWrap,
              className,
            }),
          )}
          ref={ref}
          role={variant.startsWith('h') ? 'heading' : undefined}
          aria-level={
            variant.startsWith('h') ? variant.replace('h', '') : undefined
          }
          {...props}
        >
          {children}
        </Component>
      );
    },
  ),
);

Typography.displayName = 'Typography';
