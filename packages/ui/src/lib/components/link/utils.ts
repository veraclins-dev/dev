import { type LinkProps as RemixLinkProps } from '@remix-run/react';
import { cva, type VariantProps } from 'class-variance-authority';

import { buttonDefaultClasses, buttonVariant } from '../../ui/button';

export interface LinkProps
  extends RemixLinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  withBorder?: boolean;
  disabled?: boolean;
  tooltip?: string;
}

export const buttonLinkVariants = cva(buttonDefaultClasses, {
  variants: { variant: buttonVariant },
  defaultVariants: { variant: 'default' },
});

export type LinkButtonVariants = VariantProps<typeof buttonLinkVariants>;

export type LinkButtonProps = LinkProps & LinkButtonVariants;
