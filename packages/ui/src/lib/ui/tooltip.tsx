import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { type WithTrigger } from '../types';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipArrow = TooltipPrimitive.Arrow;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 2, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border border-input bg-card px-2 py-1 text-center text-sm text-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

type ComposedTooltipProps<P extends object> = WithTrigger<P> & {
  content: React.ReactNode;
  arrow?: boolean;
};

const ComposedTooltip = <P extends { disabled?: boolean; className?: string }>({
  Trigger,
  content,
  arrow = true,
  TriggerProps,
  triggerRef,
}: ComposedTooltipProps<P>) => {
  const className = TriggerProps?.disabled
    ? cn(TriggerProps.className, 'disabled:pointer-events-auto')
    : TriggerProps.className;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Trigger {...TriggerProps} className={className} ref={triggerRef} />
        </TooltipTrigger>
        <TooltipContent>
          {content}
          {arrow && <TooltipArrow className="fill-current" />}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export {
  ComposedTooltip,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
};
