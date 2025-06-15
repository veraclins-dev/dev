import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { type ListItemVariants, listItemVariants } from './utils/variants';

interface ListItemProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof ListItemVariants>,
    ListItemVariants {}

/**
 * A list item component that supports various styling options and states.
 * This enables consistent list item styling across the application with a consistent API.
 */
function BaseListItem({
  className,
  variant,
  size,
  weight,
  color,
  children,
  ...props
}: ListItemProps) {
  return (
    <li
      data-slot="list-item"
      className={cn(
        listItemVariants({
          variant,
          size,
          weight,
          color,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
}

/**
 * A memoized list item component that supports various styling options and states.
 * This enables consistent list item styling across the application with a consistent API.
 * @param {ListItemProps} props - The props for the ListItem component.
 * @returns {JSX.Element} A rendered HTML element with applied styles and children.
 * @example
 * ```tsx
 * <ListItem variant="interactive" size="md" color="primary">
 *   Interactive list item
 * </ListItem>
 * ```
 */
const ListItem = memo(BaseListItem);

export { ListItem, type ListItemProps };
export default BaseListItem;
