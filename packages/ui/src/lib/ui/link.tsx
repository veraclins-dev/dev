import React from 'react';

import { cn } from '@veraclins-dev/utils';

import {
  extractStyleProps,
  type LinkVariants,
  linkVariants,
} from './utils/variants';

type Target = '_blank' | '_self' | '_parent' | '_top';

// Base props for the Link component
interface BaseLinkProps extends LinkVariants {
  className?: string;
  children?: React.ReactNode;
  target?: Target;
  rel?: string;
}

// Define a type for custom components
type CustomComponent = React.ComponentType<any>;

// Define LinkProps using OverrideProps
type LinkProps<RootComponent extends 'a' | CustomComponent = 'a'> = {
  component?: RootComponent;
} & (RootComponent extends 'a'
  ? BaseLinkProps & Omit<React.ComponentProps<'a'>, keyof BaseLinkProps>
  : RootComponent extends React.ComponentType<infer P>
    ? BaseLinkProps & Omit<P, keyof BaseLinkProps>
    : never);

function Link<C extends 'a' | CustomComponent = 'a'>({
  component = 'a' as C,
  type,
  color,
  underline,
  linkSize,
  variant,
  className,
  children,
  target,
  rel,
  ...props
}: LinkProps<C>) {
  const Component = component as React.ComponentType<any>;
  const { styleProps, others } = extractStyleProps(props);

  // Ensure rel includes 'noopener noreferrer' for external links when target is '_blank'
  const computedRel =
    target === '_blank'
      ? (() => {
          const relValues = (rel || '').split(' ').filter(Boolean);
          if (!relValues.includes('noopener')) relValues.push('noopener');
          if (!relValues.includes('noreferrer')) relValues.push('noreferrer');
          return relValues.join(' ').trim();
        })()
      : rel;

  return (
    <Component
      data-slot="link"
      className={cn(
        linkVariants({
          type,
          color,
          underline,
          linkSize,
          variant,
          ...styleProps,
          className,
        }),
      )}
      target={target}
      rel={computedRel}
      {...others}
    >
      {children}
    </Component>
  );
}

export { Link, type LinkProps, linkVariants };
