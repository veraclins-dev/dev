import { cn } from '@veraclins-dev/utils';

import { type CustomComponent, type OverrideComponentProps } from '../types';

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
  | 'span'
  | 'figure'
  | 'figcaption'
  | 'mark'
  | 'time'
  | 'address'
  | 'details'
  | 'summary'
  | 'dialog'
  | 'fieldset'
  | 'legend'
  | 'blockquote'
  | 'pre'
  | 'output';

interface InternalBoxProps
  extends React.HTMLAttributes<HTMLElement>,
    BoxVariants {}

type BoxProps<P extends ContainerElement | CustomComponent = 'div'> =
  OverrideComponentProps<P, InternalBoxProps>;

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
function Box<P extends ContainerElement | CustomComponent = 'div'>({
  component,
  className,
  // Layout props
  flexDirection,
  items,
  justify,
  flexWrap,
  flex,
  ...props
}: BoxProps<P>) {
  const Component = (component ?? 'div') as React.ElementType;

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
// const Box = memo(Base);

export { Box, type BoxProps };
export default Box;
