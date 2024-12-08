import { Link as RemixLink } from '@remix-run/react';
import { forwardRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import { usePathWithRedirect } from './usePathWithRedirect';
import {
  buttonLinkVariants,
  type LinkButtonProps,
  type LinkProps,
} from './utils';

const Base = ({
  children,
  to,
  className,
  withBorder = true,
  linkRef,
  ...props
}: LinkProps & {
  linkRef?: React.ForwardedRef<HTMLAnchorElement>;
}) => (
  <RemixLink
    to={to}
    ref={linkRef}
    {...props}
    className={cn(
      'inline-flex max-w-full items-center',
      { 'border-b-2 border-transparent': withBorder },
      className,
    )}
  >
    {children}
  </RemixLink>
);

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref) => <Base {...props} linkRef={ref} />,
);

Link.displayName = 'Link';

const LinkWithRedirect = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, ...props }: LinkProps, ref) => {
    const path = usePathWithRedirect(to);

    return <Base to={path} {...props} linkRef={ref} />;
  },
);

LinkWithRedirect.displayName = 'LinkWithRedirect';

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    { className, variant = 'link', children, ...props }: LinkButtonProps,
    ref,
  ) => (
    <Link
      ref={ref}
      className={cn(buttonLinkVariants({ variant, className }))}
      {...props}
      withBorder={false}
    >
      {children}
    </Link>
  ),
);

LinkButton.displayName = 'LinkButton';

const LinkButtonWithRedirect = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    { className, variant = 'link', children, ...props }: LinkButtonProps,
    ref,
  ) => (
    <LinkWithRedirect
      ref={ref}
      className={cn(buttonLinkVariants({ variant, className }))}
      {...props}
    >
      {children}
    </LinkWithRedirect>
  ),
);

LinkButtonWithRedirect.displayName = 'LinkButtonWithRedirect';

export { Link, LinkButton, LinkButtonWithRedirect, LinkWithRedirect };
