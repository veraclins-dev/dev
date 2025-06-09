import { cn } from '@veraclins-dev/utils';

import { Box } from './box';

/**
 * Skeleton component for displaying loading states.
 * Provides a pulsing animation effect to indicate content is loading.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Skeleton className="h-4 w-[250px]" />
 *
 * // Card skeleton
 * <div className="space-y-3">
 *   <Skeleton className="h-4 w-[250px]" />
 *   <Skeleton className="h-4 w-[200px]" />
 *   <Skeleton className="h-4 w-[300px]" />
 * </div>
 *
 * // Avatar skeleton
 * <Skeleton className="h-12 w-12 rounded-full" />
 *
 * // Custom styling
 * <Skeleton className="h-20 w-full bg-blue-100" />
 * ```
 *
 * @param props - Props for the Skeleton component
 * @returns A styled div element with loading animation
 */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <Box
      data-slot="skeleton"
      className={cn('bg-neutral animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
