import { Slot } from '@radix-ui/react-slot';

import { cn } from '@veraclins-dev/utils';

import { Box, type BoxProps } from './box';
import { Icon } from './icon';
import { Link, type LinkProps } from './link';
import { List, type ListProps } from './list';
import { ListItem, type ListItemProps } from './list-item';

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
function Breadcrumb({ ...props }: BoxProps) {
  return (
    <Box
      component="nav"
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      {...props}
    />
  );
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
function BreadcrumbList({ className, ...props }: ListProps) {
  return (
    <List
      component="ol"
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
function BreadcrumbItem({ className, ...props }: ListItemProps) {
  return (
    <ListItem
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  );
}
type CustomComponent = React.ComponentType<any>;

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
function BreadcrumbLink<C extends 'a' | CustomComponent = 'a'>({
  asChild,
  className,
  color,
  ...props
}: LinkProps<C> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : Link;

  return (
    <Comp
      color={color as NonNullable<LinkProps['color']>}
      data-slot="breadcrumb-link"
      className={cn('transition-colors opacity-80', className)}
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
    <Box
      component="span"
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-foreground font-semibold', className)}
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
function BreadcrumbSeparator({ children, className, ...props }: ListItemProps) {
  return (
    <ListItem
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <Icon name="chevron-right" />}
    </ListItem>
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
    <Box
      component="span"
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        'flex size-9 items-center justify-center cursor-pointer',
        className,
      )}
      {...props}
    >
      <Icon name="ellipsis-horizontal" className="size-4" />
      <span className="sr-only">More</span>
    </Box>
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
