import { cn } from '@veraclins-dev/utils';

import {
  type ProgressIndicatorVariants,
  progressIndicatorVariants,
  type ProgressVariants,
  progressVariants,
} from './utils/variants';
import { Box } from './box';

/**
 * Props for the ProgressBar component
 */
export interface ProgressBarProps
  extends Pick<React.ComponentProps<typeof Box>, 'className'>,
    ProgressVariants,
    ProgressIndicatorVariants {
  /**
   * The current progress value (0-100)
   */
  value: number;

  /**
   * Whether to show the progress value
   * @default false
   */
  showValue?: boolean;

  /**
   * Whether the progress bar is indeterminate
   * @default false
   */
  indeterminate?: boolean;
}

/**
 * Progress Bar component for displaying progress or loading states.
 * Supports both linear and circular variants with different sizes and colors.
 *
 * @example
 * ```tsx
 * // Basic linear progress
 * <ProgressBar value={75} />
 *
 * // Circular progress with value
 * <ProgressBar value={60} variant="circular" showValue />
 *
 * // Indeterminate progress
 * <ProgressBar indeterminate />
 *
 * // Custom color and size
 * <ProgressBar value={90} color="success" size="lg" />
 * ```
 */
function ProgressBar({
  value,
  variant = 'linear',
  size = 'md',
  showValue = false,
  color = 'primary',
  indeterminate = false,
  className,
  ...props
}: ProgressBarProps) {
  if (variant === 'circular') {
    const radius =
      size === 'sm' ? 16 : size === 'md' ? 24 : size === 'lg' ? 32 : 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = indeterminate
      ? circumference - 0.5 * circumference
      : circumference - (value / 100) * circumference;

    return (
      <Box
        data-slot="progress-bar"
        data-variant={variant}
        data-size={size}
        data-color={color}
        data-indeterminate={indeterminate}
        className={cn(progressVariants({ variant, size, className }))}
        {...props}
      >
        <svg
          className={cn(
            'transform -rotate-90',
            size === 'sm'
              ? 'size-8'
              : size === 'md'
                ? 'size-12'
                : size === 'lg'
                  ? 'size-16'
                  : 'size-20',
            indeterminate && 'animate-spin',
          )}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          <circle
            className={cn(
              progressVariants({ variant, size }),
              'stroke-neutral',
            )}
            fill="none"
            cx={radius}
            cy={radius}
            r={radius}
          />
          <circle
            data-slot="progress-indicator"
            className={cn(
              progressIndicatorVariants({
                variant,
                size,
                color,
              }),
            )}
            fill="none"
            cx={radius}
            cy={radius}
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>
        {showValue && !indeterminate && (
          <span className="absolute font-medium">{Math.round(value)}%</span>
        )}
      </Box>
    );
  }

  return (
    <Box
      data-slot="progress-bar"
      data-variant={variant}
      data-size={size}
      data-color={color}
      data-indeterminate={indeterminate}
      className={cn(progressVariants({ variant, size, className }))}
      {...props}
    >
      <Box
        data-slot="progress-indicator"
        className={cn(
          progressIndicatorVariants({
            variant,
            size,
            color,
            indeterminate,
            className,
          }),
        )}
        style={
          !indeterminate
            ? {
                width: `${value}%`,
              }
            : undefined
        }
      />
      {showValue && !indeterminate && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2">
          {Math.round(value)}%
        </span>
      )}
    </Box>
  );
}

export { ProgressBar };
