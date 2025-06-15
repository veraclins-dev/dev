import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { type BoxVariants, boxVariants } from './utils/variants';

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
  component?: ContainerElement | React.ComponentType<any>;
  /** The ref to be forwarded to the underlying element */
  ref?: React.Ref<HTMLDivElement | HTMLSpanElement>;
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
  // Gap props
  gap,
  gapX,
  gapY,
  // Layout props
  display,
  flexDirection,
  items,
  justify,
  children,
  flexWrap,
  flex,
  ...props
}: BoxProps) {
  const Component = component as React.ElementType;

  return (
    <Component
      data-slot="box"
      className={cn(
        boxVariants({
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
          gap,
          gapX,
          gapY,
          display,
          flexDirection,
          flexWrap,
          items,
          justify,
          flex,
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
