import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@veraclins-dev/utils';

import { type WithTrigger } from '../types';

import { TOOLTIP_CLASSES } from './utils/styles';

/**
 * TooltipProvider component that wraps the tooltip functionality.
 * Provides context for tooltip positioning and behavior.
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>Tooltip content</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

/**
 * Root Tooltip component that manages the tooltip state and positioning.
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Tooltip content</TooltipContent>
 * </Tooltip>
 * ```
 */
function Tooltip({ ...props }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

/**
 * TooltipTrigger component that triggers the tooltip on hover or focus.
 *
 * @example
 * ```tsx
 * <TooltipTrigger>
 *   <Button>Hover me</Button>
 * </TooltipTrigger>
 * ```
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * TooltipArrow component that adds a visual arrow to the tooltip.
 *
 * @example
 * ```tsx
 * <TooltipContent>
 *   Tooltip content
 *   <TooltipArrow className="fill-current" />
 * </TooltipContent>
 * ```
 */
const TooltipArrow = ({
  className,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Arrow>) => (
  <TooltipPrimitive.Arrow className={cn(className)} {...props} />
);

type TooltipContentProps = React.ComponentProps<
  typeof TooltipPrimitive.Content
>;

/**
 * TooltipContent component that renders the tooltip content.
 *
 * @example
 * ```tsx
 * <TooltipContent>
 *   This is the tooltip content
 * </TooltipContent>
 * ```
 */
const TooltipContent = ({
  className,
  sideOffset = 2,
  ...props
}: TooltipContentProps) => (
  <TooltipPrimitive.Content
    sideOffset={sideOffset}
    className={cn(TOOLTIP_CLASSES, className)}
    {...props}
  />
);

/**
 * Props for the ComposedTooltip component
 */
type ComposedTooltipProps<P extends object> = WithTrigger<P> & {
  /** The content to display in the tooltip */
  content: React.ReactNode;
  /** Whether to show an arrow on the tooltip */
  arrow?: boolean;
  delayDuration?: TooltipProps['delayDuration'];
} & Omit<TooltipContentProps, 'content'>;

/**
 * ComposedTooltip component that combines all tooltip parts into a single component.
 * Provides a simpler API for common tooltip use cases.
 *
 * @example
 * ```tsx
 * <ComposedTooltip
 *   Trigger={Button}
 *   content="This is a tooltip"
 *   TriggerProps={{ children: 'Hover me' }}
 * />
 * ```
 */
const ComposedTooltip = <P extends { disabled?: boolean; className?: string }>({
  Trigger,
  content,
  arrow = true,
  TriggerProps,
  delayDuration = 200,
  ...props
}: ComposedTooltipProps<P>) => {
  const className = TriggerProps?.disabled
    ? cn(
        TriggerProps.className,
        'disabled:pointer-events-auto data-[disabled=true]:pointer-events-auto',
      )
    : TriggerProps.className;
  console.log(className, { arrow });
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>
        <Trigger {...TriggerProps} className={className} />
      </TooltipTrigger>
      <TooltipContent {...props}>
        {content}
        {arrow && <TooltipArrow className="fill-current" />}
      </TooltipContent>
    </Tooltip>
  );
};

export {
  ComposedTooltip,
  type ComposedTooltipProps,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
};
