import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import {
  type BoxVariants,
  boxVariants,
  extractStyleProps,
} from './utils/variants';

export type ContainerElement =
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
  // Layout props
  flexDirection,
  items,
  justify,
  flexWrap,
  flex,
  ...props
}: BoxProps) {
  const Component = component as React.ElementType;

  // Extract style props from the remaining props
  const { styleProps, others } = extractStyleProps(props);
  return (
    <Component
      data-slot="box"
      className={cn(
        boxVariants({
          ...styleProps,
          flexDirection,
          flexWrap,
          items,
          justify,
          flex,
          className,
        }),
      )}
      {...others}
    />
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
