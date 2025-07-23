import { type LayoutVariants, layoutVariants } from './layout';
import { type SizeVariants, sizeVariants } from './size';
import { type SpaceVariants, spaceVariants } from './spaces';

type StyleProps = LayoutVariants & SizeVariants & SpaceVariants;

type StylePropsKeys = keyof StyleProps;

const styleProps: StyleProps = {
  // Space variants
  ...spaceVariants,
  // Size variants
  ...sizeVariants,
  // Layout variants
  ...layoutVariants,
};

/**
 * Extracts style props from a component props object and returns them in a format that can be passed to variant functions.
 *
 * @param props - The component props object containing both style props and other props
 * @returns An object with `styleProps` (extracted style props) and `others` (remaining props)
 *
 * @example
 * ```tsx
 * function MyComponent(props) {
 *   const { styleProps, others } = extractStyleProps(props);
 *
 *   return (
 *     <div
 *       className={cn(
 *         boxVariants(styleProps), // Pass extracted style props to variant function
 *         className
 *       )}
 *       {...others} // Spread remaining props
 *     >
 *       {children}
 *     </div>
 *   );
 * }
 *
 * // Usage:
 * <MyComponent margin={4} padding={2} onClick={() => {}}>
 *   Content
 * </MyComponent>
 * ```
 */
function extractStyleProps<T extends Record<string, any>>(
  props: T,
): {
  styleProps: Pick<T, StylePropsKeys>;
  others: Omit<T, StylePropsKeys>;
} {
  const stylePropsKeys = Object.keys(styleProps) as StylePropsKeys[];
  const extractedStyleProps: Record<string, any> = {};
  const others: Record<string, any> = {};

  // Iterate through all props and separate style props from others
  for (const [key, value] of Object.entries(props)) {
    if (stylePropsKeys.includes(key as StylePropsKeys)) {
      extractedStyleProps[key] = value;
    } else {
      others[key] = value;
    }
  }

  return {
    styleProps: extractedStyleProps as Pick<T, StylePropsKeys>,
    others: others as Omit<T, StylePropsKeys>,
  };
}

export {
  extractStyleProps,
  layoutVariants,
  sizeVariants,
  spaceVariants,
  styleProps,
};
