import { type BorderVariants, borderVariants } from './border';
import { type FlexVariants, flexVariants } from './flex';
import { type GridVariants, gridVariants } from './grid';
import { type LayoutVariants, layoutVariants } from './layout';
import { type SizeVariants, sizeVariants } from './size';
import { type SpaceVariants, spaceVariants } from './spaces';

type StyleProps = LayoutVariants &
  SizeVariants &
  SpaceVariants &
  FlexVariants &
  GridVariants &
  BorderVariants;

type StylePropsKeys = keyof StyleProps;

const styleProps: StyleProps = {
  // Space variants
  ...spaceVariants,
  // Size variants
  ...sizeVariants,
  // Layout variants
  ...layoutVariants,
  // Flex variants
  ...flexVariants,
  // Grid variants
  ...gridVariants,
  // Border variants
  ...borderVariants,
};

// Create a Set of style prop keys for O(1) lookup performance
// This is computed once at module load time
const STYLE_PROPS_KEYS_SET = new Set<string>(Object.keys(styleProps));

/**
 * Extracts style props from a component props object and returns them in a format that can be passed to variant functions.
 * Optimized for performance with O(1) Set lookups and minimal object creation.
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
function extractStyleProps<T extends Record<string, unknown>>(
  props: T,
): {
  styleProps: Pick<T, StylePropsKeys>;
  others: Omit<T, StylePropsKeys>;
} {
  const extractedStyleProps: Record<string, unknown> = {};
  const others: Record<string, unknown> = {};

  // Iterate through all props and separate style props from others
  // Using Set.has() for O(1) lookup instead of Array.includes() for O(n)
  for (const [key, value] of Object.entries(props)) {
    if (STYLE_PROPS_KEYS_SET.has(key)) {
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

export { extractStyleProps, styleProps };

export * from './border';
export * from './flex';
export * from './grid';
export * from './layout';
export * from './size';
export * from './spaces';

export type { StyleProps };
