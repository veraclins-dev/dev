import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { type SeparatorVariants, separatorVariants } from './utils/variants';
import { Box } from './box';

export interface SeparatorProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
      keyof SeparatorVariants
    >,
    SeparatorVariants {
  /** Content to display in the center of the separator (text or icon) */
  children?: React.ReactNode;
  /** Whether to show content on the separator */
  withContent?: boolean;
  /** Custom className for the content wrapper */
  contentClassName?: string;
  /** Animation variant for the separator */
  animated?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
}

/**
 * Enhanced Separator component for visually dividing content.
 * Built on top of Radix UI's Separator primitive for accessibility.
 * Supports multiple variants, sizes, and content display.
 *
 * @example
 * ```tsx
 * // Basic horizontal separator
 * <Separator />
 *
 * // Vertical separator with custom size
 * <Separator orientation="vertical" size="md" />
 *
 * // Dashed separator with content
 * <Separator variant="dashed" withContent>
 *   <Icon name="star" />
 * </Separator>
 *
 * // Gradient separator with text
 * <Separator variant="gradient" withContent>
 *   Section Title
 * </Separator>
 *
 * // Animated separator
 * <Separator variant="gradient" animated />
 *
 * // Non-decorative separator (for screen readers)
 * <Separator decorative={false} aria-label="Section divider" />
 * ```
 *
 * @param props - Props for the Separator component
 * @returns A styled separator element with accessibility features
 */
function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  variant = 'solid',
  children,
  withContent = false,
  contentClassName,
  animated = false,
  animationDuration = 1000,
  ref,
  ...props
}: SeparatorProps & {
  ref?: React.Ref<React.ComponentRef<typeof SeparatorPrimitive.Root>>;
}) {
  // Animation styles
  const animationStyles = animated
    ? {
        animation: `separator-pulse ${animationDuration}ms ease-in-out infinite`,
      }
    : {};

  // If no content or not using withContent, render simple separator
  if (!withContent || !children) {
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        data-slot="separator-root"
        decorative={decorative}
        orientation={orientation ?? 'horizontal'}
        className={cn(
          separatorVariants({
            variant,
            orientation,
          }),
          className,
        )}
        style={animationStyles}
        {...props}
      />
    );
  }

  // Render separator with content
  return (
    <Box
      className={cn(
        'flex items-center gap-2',
        orientation === 'vertical' ? 'flex-col h-full' : 'w-full',
        className,
      )}
    >
      <SeparatorPrimitive.Root
        ref={ref}
        data-slot="separator-root"
        decorative={decorative}
        orientation={orientation ?? 'horizontal'}
        className={cn(
          separatorVariants({
            variant,
            orientation,
          }),
          'flex-1',
        )}
        style={animationStyles}
        {...props}
      />

      <Box
        className={cn(
          'flex items-center justify-center px-2 text-xs text-muted-foreground whitespace-nowrap',
          contentClassName,
        )}
      >
        {children}
      </Box>

      <SeparatorPrimitive.Root
        decorative={decorative}
        orientation={orientation ?? 'horizontal'}
        className={cn(
          separatorVariants({
            variant,
            orientation,
          }),
          'flex-1',
        )}
        style={animationStyles}
      />
    </Box>
  );
}

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
