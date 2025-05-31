import React from 'react';

import { cn, type OverrideProps } from '@veraclins-dev/utils';

import { type LinkVariants, linkVariants } from './variants';

type Target = '_blank' | '_self' | '_parent' | '_top';

// Base props for when component is not provided or is a standard HTML anchor
interface BaseLinkProps extends LinkVariants {
  className?: string;
  children?: React.ReactNode;
  target?: Target;
  rel?: string;
}

export interface LinkTypeMap<
  AdditionalProps = object,
  RootComponent extends React.ElementType = 'a',
> {
  props: AdditionalProps & BaseLinkProps;
  defaultComponent: RootComponent;
}

type LinkProps<
  RootComponent extends React.ElementType = LinkTypeMap['defaultComponent'],
  AdditionalProps = object,
> = OverrideProps<
  LinkTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: RootComponent;
};
function Link<
  C extends React.ElementType = LinkTypeMap['defaultComponent'],
  AdditionalProps = object,
>({
  component = 'a' as C,
  type,
  color,
  underline,
  size,
  variant,
  className,
  children,
  target,
  rel,
  ...props
}: LinkProps<C, AdditionalProps>) {
  const Component = component;

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
      className={cn(
        linkVariants({ type, color, underline, size, variant, className }),
      )}
      target={target}
      rel={computedRel}
      {...props}
    >
      {children}
    </Component>
  );
}

export { BaseLinkProps, Link, LinkProps, linkVariants };
