import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@veraclins-dev/utils';

/**
 * Separator component for visually dividing content.
 * Built on top of Radix UI's Separator primitive for accessibility.
 * Supports both horizontal and vertical orientations.
 *
 * @example
 * ```tsx
 * // Basic horizontal separator
 * <Separator />
 *
 * // Vertical separator
 * <div className="flex h-8">
 *   <span>Left</span>
 *   <Separator orientation="vertical" />
 *   <span>Right</span>
 * </div>
 *
 * // With custom styling
 * <Separator className="my-4 bg-blue-500" />
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
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      {...props}
    />
  );
}
export { Separator };
