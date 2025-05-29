import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { type BoxVariants, boxVariants } from './variants';

type ContainerElement =
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'header'
  | 'footer'
  | 'main'
  | 'nav'
  | 'span';

interface BoxProps extends React.HTMLAttributes<HTMLElement>, BoxVariants {
  /** The HTML element to render the Box as. Defaults to 'div'. */
  component?: ContainerElement;
}

/**
 * A flexible container component inspired by MUI's Box, supporting spacing and layout props.
 * This enables predictable styling of elements with a consistent API.
 */
function Base({
  component = 'div',
  className,
  // Short-form spacing props
  m,
  mt,
  mr,
  mb,
  ml,
  p,
  pt,
  pr,
  pb,
  pl,
  // Long-form spacing props
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  display,
  flexDirection,
  alignItems,
  justifyContent,
  children,
  ...props
}: BoxProps) {
  const Component = component;

  return (
    <Component
      data-slot="box"
      className={cn(
        boxVariants({
          // Use long-form props if provided, otherwise fall back to short-form
          m: margin ?? m,
          mt: marginTop ?? mt,
          mr: marginRight ?? mr,
          mb: marginBottom ?? mb,
          ml: marginLeft ?? ml,
          p: padding ?? p,
          pt: paddingTop ?? pt,
          pr: paddingRight ?? pr,
          pb: paddingBottom ?? pb,
          pl: paddingLeft ?? pl,
          display,
          flexDirection,
          alignItems,
          justifyContent,
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
 * A memoized flexible container component inspired by MUI's Box, supporting spacing and layout props.
 * This enables predictable styling of elements with a consistent API.
 * It supports both short-form and long-form spacing props, allowing for flexible usage.
 * @param {BoxProps} props - The props for the Box component.
 * @returns {JSX.Element} A rendered HTML element with applied styles and children.
 * @example
 * ```tsx
 * <Box component="section" margin={16} padding={8} display="flex" flexDirection="column">
 *   <Box component="span" padding={4}>Hello, World!</Box>
 * </Box>
 * ```
 */
const Box = memo(Base);

export { Box, type BoxProps };
export default Base;
