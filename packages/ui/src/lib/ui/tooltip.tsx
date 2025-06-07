import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@veraclins-dev/utils';

import { type WithTrigger } from '../types';

import { TOOLTIP_CLASSES } from './styles';

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

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipArrow = ({
  className,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Arrow>) => (
  <TooltipPrimitive.Arrow className={cn(className)} {...props} />
);

const TooltipContent = ({
  className,
  sideOffset = 2,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) => (
  <TooltipPrimitive.Content
    sideOffset={sideOffset}
    className={cn(TOOLTIP_CLASSES, className)}
    {...props}
  />
);

type ComposedTooltipProps<P extends object> = WithTrigger<P> & {
  content: React.ReactNode;
  arrow?: boolean;
};

const ComposedTooltip = <P extends { disabled?: boolean; className?: string }>({
  Trigger,
  content,
  arrow = true,
  TriggerProps,
}: ComposedTooltipProps<P>) => {
  const className = TriggerProps?.disabled
    ? cn(
        TriggerProps.className,
        'disabled:pointer-events-auto data-[disabled=true]:pointer-events-auto',
      )
    : TriggerProps.className;

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <Trigger {...TriggerProps} className={className} />
      </TooltipTrigger>
      <TooltipContent>
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
