import { cn } from '@veraclins-dev/utils';

import {
  type ProgressIndicatorVariants,
  progressIndicatorVariants,
  type ProgressVariants,
  progressVariants,
} from './utils/variants';
import { Box } from './box';

type ProgressIndicatorProps = ProgressIndicatorVariants & {
  value: number;
  className?: string;
};

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

  indicatorProps?: ProgressIndicatorProps;
}

function ProgressIndicator({
  value,
  variant = 'linear',
  progressSize: indicatorSize = 'md',
  color = 'primary',
  indeterminate = false,
  className,
  // ...props
}: ProgressIndicatorProps) {
  if (variant === 'circular') {
    const radius =
      indicatorSize === 'sm'
        ? 16
        : indicatorSize === 'md'
          ? 24
          : indicatorSize === 'lg'
            ? 32
            : 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = indeterminate
      ? circumference - 0.5 * circumference
      : circumference - (value / 100) * circumference;

    return (
      <circle
        data-slot="progress-indicator"
        className={cn(
          progressIndicatorVariants({
            variant,
            progressSize: indicatorSize,
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
    );
  }

  return (
    <Box
      data-slot="progress-indicator"
      className={cn(
        progressIndicatorVariants({
          variant,
          progressSize: indicatorSize,
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
  );
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
  progressSize = 'md',
  showValue = false,
  color = 'primary',
  indeterminate = false,
  className,
  ...props
}: ProgressBarProps) {
  if (variant === 'circular') {
    const radius =
      progressSize === 'sm'
        ? 16
        : progressSize === 'md'
          ? 24
          : progressSize === 'lg'
            ? 32
            : 40;

    return (
      <Box
        data-slot="progress-bar"
        data-variant={variant}
        data-size={progressSize}
        data-color={color}
        data-indeterminate={indeterminate}
        className={cn(
          progressVariants({ variant, progressSize: progressSize, className }),
        )}
        {...props}
      >
        <svg
          className={cn(
            'transform -rotate-90',
            progressSize === 'sm'
              ? 'size-8'
              : progressSize === 'md'
                ? 'size-12'
                : progressSize === 'lg'
                  ? 'size-16'
                  : 'size-20',
            indeterminate && 'animate-spin',
          )}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          <circle
            className={cn(
              progressVariants({ variant, progressSize: progressSize }),
              'stroke-neutral',
            )}
            fill="none"
            cx={radius}
            cy={radius}
            r={radius}
          />
          <ProgressIndicator
            value={value}
            variant={variant}
            progressSize={progressSize}
            color={color}
            indeterminate={indeterminate}
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
      data-size={progressSize}
      data-color={color}
      data-indeterminate={indeterminate}
      className={cn(
        progressVariants({ variant, progressSize: progressSize, className }),
      )}
      {...props}
    >
      <ProgressIndicator
        data-slot="progress-indicator"
        value={value}
        variant={variant}
        progressSize={progressSize}
        color={color}
        indeterminate={indeterminate}
        className={className}
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
