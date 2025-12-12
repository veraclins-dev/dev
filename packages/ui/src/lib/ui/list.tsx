import { memo, useMemo } from 'react';

import { cn } from '@veraclins-dev/utils';

import {
  extractStyleProps,
  type ListVariants,
  listVariants,
} from './utils/variants';

type ListElement = 'ul' | 'ol';

interface ListProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, keyof ListVariants>,
    ListVariants {
  /** The HTML element to render the List as. Defaults based on variant if not specified. */
  component?: ListElement;
  /** ARIA role for accessibility. Useful for 'listbox' in autocomplete. */
  role?: string;
  /** Whether this list is used for selection (adds selection-related ARIA attributes) */
  selectable?: boolean;
}

/**
 * A flexible list component that supports both ordered and unordered lists with customizable styling.
 * This enables consistent list styling across the application with a consistent API.
 */
function BaseList({
  component = 'ul',
  className,
  role,
  selectable = false,
  variant = 'none',
  children,
  ...props
}: ListProps) {
  const { styleProps, others } = extractStyleProps(props);

  const Component = useMemo(() => {
    if (component) return component;
    if (variant?.startsWith('ordered-')) return 'ol';
    return 'ul';
  }, [component, variant]);

  const marker = useMemo(() => {
    if (variant === 'none') return 'none';
    if (variant?.startsWith('unordered-')) {
      return variant.replace('unordered-', '');
    }
    if (variant?.startsWith('ordered-')) {
      return variant.replace('ordered-', '');
    }
    return 'default';
  }, [variant]);

  return (
    <Component
      data-slot="list"
      role={role}
      aria-label={selectable ? 'Options' : undefined}
      data-marker={marker}
      className={cn(
        listVariants({
          variant,
          ...styleProps,
          className,
        }),
      )}
      {...others}
    >
      {children}
    </Component>
  );
}

/**
 * A memoized flexible list component that supports both ordered and unordered lists with customizable styling.
 * This enables consistent list styling across the application with a consistent API.
 * @param {ListProps} props - The props for the List component.
 * @returns {JSX.Element} A rendered HTML element with applied styles and children.
 * @example
 * ```tsx
 * <List variant="unordered-disc" pl={6} my={4}>
 *   <ListItem variant="interactive" size="md">List item 1</ListItem>
 *   <ListItem variant="selected" color="primary">List item 2</ListItem>
 * </List>
 * ```
 */
const List = memo(BaseList);

export { List, type ListProps };
export default BaseList;
