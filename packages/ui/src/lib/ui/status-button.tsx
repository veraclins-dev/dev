import { useSpinDelay } from 'spin-delay';

import { cn } from '@veraclins-dev/utils';

import { Box } from './box';
import { Button, type ButtonProps } from './button';
import { Icon } from './icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

/**
 * Props for the StatusButton component.
 * Extends ButtonProps with additional status-related properties.
 */
type StatusButtonProps = ButtonProps & {
  /** Current status of the button */
  status: 'pending' | 'success' | 'error' | 'idle';
  /** Optional message to display in a tooltip */
  message?: string;
  /** Configuration for the spin delay animation */
  spinDelay?: Parameters<typeof useSpinDelay>[1];
};

/**
 * StatusButton component that extends the base Button with status indicators.
 * Shows different icons based on the current status and supports tooltips for status messages.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <StatusButton status="idle">Click me</StatusButton>
 *
 * // With loading state
 * <StatusButton status="pending">Loading...</StatusButton>
 *
 * // With success state and message
 * <StatusButton
 *   status="success"
 *   message="Operation completed successfully"
 * >
 *   Save
 * </StatusButton>
 *
 * // With error state
 * <StatusButton
 *   status="error"
 *   message="Failed to save changes"
 * >
 *   Save
 * </StatusButton>
 * ```
 *
 * @param props - Props for the StatusButton component
 * @returns A button with status indicators and optional tooltip
 */
export const StatusButton = ({
  message,
  status,
  className,
  children,
  spinDelay,
  ...props
}: StatusButtonProps) => {
  const delayedPending = useSpinDelay(status === 'pending', {
    delay: 400,
    minDuration: 300,
    ...spinDelay,
  });
  const companion = {
    pending: delayedPending ? (
      <Box
        display="inline-flex"
        items="center"
        justify="center"
        className="h-6 w-6"
      >
        <Icon name="update" className="animate-spin" />
      </Box>
    ) : null,
    success: (
      <Box
        display="inline-flex"
        items="center"
        justify="center"
        className="h-6 w-6"
      >
        <Icon name="check" />
      </Box>
    ),
    error: (
      <Box
        display="inline-flex"
        items="center"
        justify="center"
        className="h-6 w-6 rounded-full bg-destructive"
      >
        <Icon name="cross-1" className="text-destructive-foreground" />
      </Box>
    ),
    idle: null,
  }[status];

  const content = (
    <>
      {children}
      {companion}
    </>
  );

  return (
    <Button className={cn('flex justify-center gap-4', className)} {...props}>
      {message ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{content}</TooltipTrigger>
            <TooltipContent>{message}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        content
      )}
    </Button>
  );
};
StatusButton.displayName = 'StatusButton';
