import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import {
  extractStyleProps,
  type ListVariants,
  listVariants,
} from './utils/variants';

type ListElement = 'ul' | 'ol';

interface ListProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof ListVariants>,
    ListVariants {
  /** The HTML element to render the List as. Defaults to 'ul'. */
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
  // List variant props
  variant,
  marker = 'default',
  children,
  ...props
}: ListProps) {
  const Component = component;
  const { styleProps, others } = extractStyleProps(props);

  return (
    <Component
      data-slot="list"
      role={role}
      aria-label={selectable ? 'Options' : undefined}
      data-marker={marker}
      className={cn(
        listVariants({
          variant,
          marker,
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
 * <List component="ul" variant="ul" pl={6} my={4}>
 *   <ListItem variant="interactive" size="md">List item 1</ListItem>
 *   <ListItem variant="selected" color="primary">List item 2</ListItem>
 * </List>
 * ```
 */
const List = memo(BaseList);

export { List, type ListProps };
export default BaseList;
