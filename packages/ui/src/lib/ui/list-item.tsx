import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import {
  extractStyleProps,
  type ListItemVariants,
  listItemVariants,
} from './utils/variants';

interface ListItemProps
  extends Omit<
      React.HTMLAttributes<HTMLElement>,
      keyof ListItemVariants | 'onSelect'
    >,
    ListItemVariants {
  /** The value this item represents (for selection) */
  value?: string;
  /** Whether this item is currently selected */
  selected?: boolean;
  /** Whether this item is currently focused */
  focused?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** ARIA role for accessibility. Useful for 'option' in listbox. */
  role?: string;
  /** Callback when this item is selected */
  onSelect?: (value?: string) => void;
}

/**
 * A list item component that supports various styling options and states.
 * This enables consistent list item styling across the application with a consistent API.
 */
function BaseListItem({
  className,
  variant,
  itemSize,
  weight,
  color,
  selected = false,
  focused = false,
  disabled = false,
  value,
  role,
  onSelect,
  children,
  ...props
}: ListItemProps) {
  const handleClick = () => {
    if (!disabled && onSelect) {
      onSelect(value);
    }
  };

  const { styleProps, others } = extractStyleProps(props);

  return (
    <li
      data-slot="list-item"
      role={role}
      aria-selected={selected}
      tabIndex={focused ? 0 : -1}
      className={cn(
        listItemVariants({
          variant,
          itemSize,
          weight,
          color,
          selected,
          focused,
          disabled,
          ...styleProps,
          className,
        }),
      )}
      onClick={handleClick}
      {...others}
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
