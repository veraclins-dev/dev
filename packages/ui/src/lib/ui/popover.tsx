import * as PopoverPrimitive from '@radix-ui/react-popover';
import { forwardRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import { type Maybe, type Measurable, type WithTrigger } from '../types';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverArrow = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <PopoverPrimitive.Arrow
    ref={ref}
    className={cn('fill-current', className)}
    {...props}
  />
));
PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName;

const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    arrow?: boolean;
  }
>(
  (
    { className, align = 'center', sideOffset = 4, arrow, children, ...props },
    ref,
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'popover-content z-50 flex min-w-64 flex-col rounded-md border bg-card p-2 text-card-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        {...props}
      >
        {arrow && <PopoverArrow />}
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  ),
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

type PopoverProps = PopoverPrimitive.PopoverProps;
type PopoverContentProps = React.ComponentProps<typeof PopoverContent>;

type ComposedPopoverProps<P extends object> = WithTrigger<P> &
  PopoverProps &
  PopoverContentProps;

type AnchorProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Anchor
>;
type PopoverAnchorProps = AnchorProps & {
  anchorEl?: Maybe<Measurable>;
};

const ComposedPopover = <P extends object>({
  children,
  open,
  Trigger,
  className,
  TriggerProps,
  triggerRef,
  onOpenChange,
}: ComposedPopoverProps<P>) => (
  <Popover open={open} onOpenChange={onOpenChange}>
    <PopoverTrigger asChild>
      <Trigger {...TriggerProps} ref={triggerRef} />
    </PopoverTrigger>
    <PopoverContent align="center" className={className}>
      {children}
    </PopoverContent>
  </Popover>
);

export {
  ComposedPopover,
  Popover,
  PopoverAnchor,
  PopoverAnchorProps,
  PopoverContent,
  type PopoverContentProps,
  type PopoverProps,
  PopoverTrigger,
};
