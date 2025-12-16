import { cn } from '@veraclins-dev/utils';

import {
  type BadgeVariants,
  badgeVariants,
  extractStyleProps,
} from './utils/variants';
import { Box } from './box';

type BadgeProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> &
  BadgeVariants;

/**
 * Badge component for displaying status or contextual information.
 *
 * Renders a stylized badge with configurable variants, colors, and sizes.
 * Uses `@veraclins-dev/cva` for variant-based styling and supports
 * custom class names and additional HTML div attributes.
 *
 * @remarks
 * - Variants: `solid`, `outline`, `soft`
 * - Colors: `primary`, `secondary`, `destructive`, `success`, `warning`, `info`, `neutral`
 * - Sizes: `sm`, `md`, `lg`, `xl`
 * - Pill: Controls whether the badge is pill-shaped (fully rounded) or has default rounding
 *
 * @example
 * ```tsx
 * <Badge variant="outline" color="primary" badgeSize="lg">
 *   New
 * </Badge>
 * ```
 *
 * @param className - Additional CSS classes to apply to the badge.
 * @param variant - Visual style of the badge.
 * @param color - Color scheme of the badge.
 * @param badgeSize - Size of the badge.
 * @param pill - Whether the badge should be pill-shaped (rounded-full) or have default rounding (rounded-md). Defaults to `true`.
 * @param {...props} props Additional HTML div attributes including border style props like `rounded`.
 *
 * @returns A React div element styled as a badge.
 */
function Badge({
  className,
  variant,
  color,
  badgeSize,
  pill = true,
  ...props
}: BadgeProps) {
  const { styleProps, others } = extractStyleProps(props);
  const badgeClass = cn(
    badgeVariants({ ...styleProps, variant, color, badgeSize, pill }),
    className,
  );
  return <Box className={badgeClass} {...others} />;
}

export { Badge, type BadgeProps };
