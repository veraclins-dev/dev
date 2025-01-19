import * as PopoverPrimitive from '@radix-ui/react-popover';
import { forwardRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import { type Maybe, type Measurable, type WithTrigger } from '../types';

import { contentClasses } from './dropdown-menu';
import { ComposedTooltip } from './tooltip';

const Popover = PopoverPrimitive.Root;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverTrigger = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & {
    tooltip?: React.ReactNode;
  }
>(({ tooltip, ...props }, ref) =>
  tooltip ? (
    <ComposedTooltip
      Trigger={PopoverPrimitive.Trigger}
      TriggerProps={props}
      content={tooltip}
      triggerRef={ref}
    />
  ) : (
    <PopoverPrimitive.Trigger ref={ref} {...props} />
  ),
);
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

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
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn('popover-content', contentClasses, className)}
      {...props}
    >
      {arrow && <PopoverArrow />}
      {children}
    </PopoverPrimitive.Content>
  ),
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

type PopoverProps = PopoverPrimitive.PopoverProps;
type PopoverContentProps = React.ComponentProps<typeof PopoverContent>;

type ComposedPopoverProps<P extends object> = WithTrigger<P> &
  PopoverProps & {
    contentProps?: PopoverContentProps;
    className?: PopoverContentProps['className'];
  };
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
  contentProps,
  ...others
}: ComposedPopoverProps<P>) => (
  <Popover {...others} open={open} onOpenChange={onOpenChange}>
    <PopoverTrigger asChild>
      <Trigger {...TriggerProps} ref={triggerRef} />
    </PopoverTrigger>
    <PopoverContent align="center" {...contentProps} className={className}>
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
