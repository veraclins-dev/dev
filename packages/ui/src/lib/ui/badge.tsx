import { cn } from '@veraclins-dev/utils';

import { type BadgeVariants, badgeVariants } from './utils/variants';
import { Box } from './box';

type BadgeProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> &
  BadgeVariants;

/**
 * Badge component for displaying status or contextual information.
 *
 * Renders a stylized badge with configurable variants, colors, and sizes.
 * Uses `class-variance-authority` for variant-based styling and supports
 * custom class names and additional HTML div attributes.
 *
 * @remarks
 * - Variants: `solid`, `outline`, `soft`
 * - Colors: `primary`, `secondary`, `destructive`, `success`, `warning`, `info`, `neutral`
 * - Sizes: `sm`, `md`, `lg`, `xl`
 *
 * @example
 * ```tsx
 * <Badge variant="outline" color="primary" size="lg">
 *   New
 * </Badge>
 * ```
 *
 * @param className - Additional CSS classes to apply to the badge.
 * @param variant - Visual style of the badge.
 * @param color - Color scheme of the badge.
 * @param size - Size of the badge.
 * @param {...props} props Additional HTML div attributes.
 *
 * @returns A React div element styled as a badge.
 */
function Badge({ className, variant, color, size, ...props }: BadgeProps) {
  const badgeClass = cn(badgeVariants({ variant, color, size }), className);
  return <Box className={badgeClass} {...props} />;
}

export { Badge, type BadgeProps };
