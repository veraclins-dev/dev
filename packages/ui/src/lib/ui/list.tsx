import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { type ListVariants, listVariants } from './variants';

type ListElement = 'ul' | 'ol';

interface ListProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof ListVariants>,
    ListVariants {
  /** The HTML element to render the List as. Defaults to 'ul'. */
  component?: ListElement;
}

/**
 * A flexible list component that supports both ordered and unordered lists with customizable styling.
 * This enables consistent list styling across the application with a consistent API.
 */
function BaseList({
  component = 'ul',
  className,
  // List variant props
  variant,
  marker,
  // Short-form spacing props
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  // Long-form spacing props
  margin,
  marginX,
  marginY,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  children,
  ...props
}: ListProps) {
  const Component = component;

  return (
    <Component
      data-slot="list"
      className={cn(
        listVariants({
          variant,
          marker,
          // Use long-form props if provided, otherwise fall back to short-form
          m: margin ?? m,
          mx: marginX ?? mx,
          my: marginY ?? my,
          mt: marginTop ?? mt,
          mr: marginRight ?? mr,
          mb: marginBottom ?? mb,
          ml: marginLeft ?? ml,
          p: padding ?? p,
          px: paddingX ?? px,
          py: paddingY ?? py,
          pt: paddingTop ?? pt,
          pr: paddingRight ?? pr,
          pb: paddingBottom ?? pb,
          pl: paddingLeft ?? pl,
        }),
        className,
      )}
      {...props}
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
