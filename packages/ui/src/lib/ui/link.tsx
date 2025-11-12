import { cn } from '@veraclins-dev/utils';

import {
  type CustomComponent,
  type OverrideComponentProps,
  type WithTooltip,
} from '../types';

import {
  extractStyleProps,
  type LinkVariants,
  linkVariants,
} from './utils/variants';
import { ComposedTooltip } from './tooltip';

type Target = '_blank' | '_self' | '_parent' | '_top';

// Base props for the Link component
interface BaseLinkProps extends LinkVariants {
  className?: string;
  children?: React.ReactNode;
  target?: Target;
  rel?: string;
}

// Define a type for custom components

type LinkProps<RootComponent extends 'a' | CustomComponent = 'a'> =
  OverrideComponentProps<RootComponent, BaseLinkProps>;

function Link<C extends 'a' | CustomComponent = 'a'>({
  tooltip,
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
}: WithTooltip<LinkProps<C>>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const classes = cn(
    linkVariants({
      type,
      color,
      underline,
      linkSize,
      variant,
      ...styleProps,
      className,
    }),
  );

  return tooltip ? (
    <ComposedTooltip
      Trigger={Component}
      TriggerProps={{
        ...others,
        className: classes,
        target,
        rel: computedRel,
        children,
        ...others,
      }}
      content={tooltip}
    />
  ) : (
    <Component
      data-slot="link"
      className={classes}
      target={target}
      rel={computedRel}
      {...others}
    >
      {children}
    </Component>
  );
}

export { Link, type LinkProps, linkVariants };
