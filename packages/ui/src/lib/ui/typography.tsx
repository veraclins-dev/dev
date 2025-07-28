import { memo } from 'react';

import { cn } from '@veraclins-dev/utils';

import { type ComponentPropsWithoutColor } from '../types';

import {
  extractStyleProps,
  type TypographyVariants,
  typographyVariants,
} from './utils/variants';

// Type definitions
type Variant = NonNullable<TypographyVariants['variant']>;

type TypographyBlockElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
type TypographyElement = TypographyBlockElement | 'span';

const variantMapping: Record<Variant, TypographyElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  inherit: 'p',
};

type TypographyProps = ComponentPropsWithoutColor<TypographyBlockElement> & {
  children?: React.ReactNode;
  className?: string;
  component?: 'p' | 'span';
} & TypographyVariants;

/**
 * A versatile Typography component for rendering text with customizable styles, including variant-based
 * typography (e.g., headings, body text, captions), color schemes, text alignment, and spacing options.
 * The component is memoized for performance optimization and supports accessibility with appropriate
 * ARIA attributes for headings.
 */
function Base({
  variant = 'body2',
  align = 'inherit',
  gutterBottom = false,
  noWrap = false,
  className,
  children,
  component,
  ...props
}: TypographyProps) {
  const Component =
    variant.includes('body') && component
      ? component
      : variantMapping[variant] || 'p';
  const { styleProps, others } = extractStyleProps(props);

  return (
    <Component
      className={cn(
        typographyVariants({
          variant,
          align,
          gutterBottom,
          noWrap,
          ...styleProps,
          className,
        }),
      )}
      role={variant.startsWith('h') ? 'heading' : undefined}
      aria-level={
        variant.startsWith('h') ? Number(variant.replace('h', '')) : undefined
      }
      {...others}
    >
      {children}
    </Component>
  );
}

/**
 * A versatile Typography component for rendering text with customizable styles, including variant-based
 * typography (e.g., headings, body text, captions), color schemes, text alignment, and spacing options.
 * The component is memoized for performance optimization and supports accessibility with appropriate
 * ARIA attributes for headings.
 *
 * @component
 * @param {Object} props - The properties for the Typography component.
 * @param {string} [props.variant='body2'] - The typography variant to apply, controlling font size, weight,
 *   and line height. Options include:
 *   - `h1`, `h2`, `h3`, `h4`, `h5`, `h6`: Heading styles with varying sizes and weights.
 *   - `subtitle1`, `subtitle2`: Subtitle styles for secondary headings.
 *   - `body1`, `body2`: Body text styles for standard content.
 *   - `caption`: Small text for annotations or secondary information.
 *   - `overline`: Uppercase text with wide tracking for labels.
 *   - `inherit`: Inherits the parent typography styles and renders a <p> element.
 * @param {string} [props.align='inherit'] - Text alignment. Options include:
 *   - `inherit`: Inherits the parent alignment.
 *   - `left`: Left-aligned text.
 *   - `center`: Centered text.
 *   - `right`: Right-aligned text.
 *   - `justify`: Justified text.
 * @param {boolean} [props.gutterBottom=false] - Adds bottom margin (`mb-4`) for spacing below the text.
 * @param {boolean} [props.noWrap=false] - Prevents text wrapping, applying truncation (`truncate`) for overflow.
 * @param {string} [props.className] - Additional CSS classes to apply to the component.
 * @param {React.ReactNode} props.children - The content to render inside the Typography component.
 * @param {...any} props - Additional props are spread onto the rendered HTML element.
 * @returns {JSX.Element} The rendered Typography component.
 *
 * @example
 * ```jsx
 * <Typography variant="h1" color="primary" align="center" gutterBottom>
 *   Welcome to Our Website
 * </Typography>
 *
 * <Typography variant="body1" color="success" noWrap>
 *   This is a success message that will not wrap.
 * </Typography>
 *
 * <Typography variant="caption">
 *   Small caption text
 * </Typography>
 * ```
 *
 * @remarks
 * - **Variant Mapping**: The component maps typography variants to HTML elements (e.g., `h1` for `variant='h1'`,
 *   `p` for `variant='body1'`, `span` for `variant='caption'`).
 * - **Styling**: Styles are applied using the `typographyVariants` utility (based on `@veraclins-dev/cva`),
 *   which defines font sizes, weights, line heights, and other properties for each variant.
 * - **Accessibility**: Heading variants (`h1`–`h6`) include `role="heading"` and `aria-level` attributes to
 *   ensure proper accessibility for screen readers.
 * - **Performance**: The component is wrapped with `memo` to prevent unnecessary re-renders when props are unchanged.
 * - **Customization**: The `className` prop allows additional styling, and the `cn` utility (from `@veraclins-dev/utils`)
 *   merges custom classes with variant-based classes.
 * - **Responsive Design**: Variants like `h1`–`h6`, `subtitle1`, `subtitle2`, `body1`, `body2`, `caption`, and
 *   `overline` provide a range of typography scales suitable for responsive layouts.
 * - **Spacing and Truncation**: The `gutterBottom` prop adds consistent spacing below the text, and `noWrap`
 *   enables truncation for single-line text with overflow.
 */
const Typography = memo(Base);

export { Typography, type TypographyProps };

// for storybook
export default Base;
