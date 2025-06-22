import { Slot } from '@radix-ui/react-slot';

import { cn } from '@veraclins-dev/utils';

import { Icon } from './icon';

/**
 * Breadcrumb navigation component that provides hierarchical navigation context.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/products">Products</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Current Page</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

/**
 * Container for breadcrumb items. Provides proper semantic structure and styling.
 *
 * @example
 * ```tsx
 * <BreadcrumbList>
 *   <BreadcrumbItem>...</BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem>...</BreadcrumbItem>
 * </BreadcrumbList>
 * ```
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Individual breadcrumb item container. Wraps links and current page indicators.
 *
 * @example
 * ```tsx
 * <BreadcrumbItem>
 *   <BreadcrumbLink href="/path">Link Text</BreadcrumbLink>
 * </BreadcrumbItem>
 * ```
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  );
}

/**
 * Clickable breadcrumb link for navigation. Supports both regular links and custom components.
 *
 * @param asChild - When true, renders as a child component instead of an anchor tag
 * @example
 * ```tsx
 * // Regular link
 * <BreadcrumbLink href="/products">Products</BreadcrumbLink>
 *
 * // Custom component
 * <BreadcrumbLink asChild>
 *   <Link to="/products">Products</Link>
 * </BreadcrumbLink>
 * ```
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('hover:text-foreground transition-colors', className)}
      {...props}
    />
  );
}

/**
 * Current page indicator in breadcrumb navigation. Represents the active/current page.
 *
 * @example
 * ```tsx
 * <BreadcrumbPage>Current Page Title</BreadcrumbPage>
 * ```
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-foreground font-normal', className)}
      {...props}
    />
  );
}

/**
 * Separator between breadcrumb items. Defaults to a chevron-right icon.
 *
 * @param children - Custom separator content (defaults to chevron-right icon)
 * @example
 * ```tsx
 * // Default separator
 * <BreadcrumbSeparator />
 *
 * // Custom separator
 * <BreadcrumbSeparator>/</BreadcrumbSeparator>
 * ```
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <Icon name="chevron-right" />}
    </li>
  );
}

/**
 * Ellipsis indicator for collapsed breadcrumb items. Used when there are too many items to display.
 *
 * @example
 * ```tsx
 * <BreadcrumbEllipsis />
 * ```
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <Icon name="ellipsis-horizontal" className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
