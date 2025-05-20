'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@veraclins-dev/utils';

import {
  type ComponentWithTooltip,
  type Maybe,
  type Measurable,
  type WithTrigger,
} from '../types';

import { popupContentClasses } from './styles';
import { ComposedTooltip } from './tooltip';

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  tooltip,
  ...props
}: ComponentWithTooltip<typeof PopoverPrimitive.Trigger>) {
  return tooltip ? (
    <ComposedTooltip
      Trigger={PopoverPrimitive.Trigger}
      TriggerProps={props}
      content={tooltip}
    />
  ) : (
    <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
  );
}

const PopoverArrow = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Arrow>) => (
  <PopoverPrimitive.Arrow
    data-slot="popover-arrow"
    className={cn('fill-current', className)}
    {...props}
  />
);

const PopoverContent = ({
  className,
  align = 'center',
  sideOffset = 4,
  arrow,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & {
  arrow?: boolean;
}) => (
  <PopoverPrimitive.Content
    align={align}
    sideOffset={sideOffset}
    className={cn(
      popupContentClasses,
      'min-w-72 origin-(--radix-popover-content-transform-origin) w-(--radix-popover-trigger-width) border p-4 shadow-md outline-hidden',
      className,
    )}
    {...props}
  >
    {arrow && <PopoverArrow />}
    {children}
  </PopoverPrimitive.Content>
);

type PopoverProps = PopoverPrimitive.PopoverProps;
type PopoverContentProps = React.ComponentProps<typeof PopoverContent>;

type ComposedPopoverProps<P extends object> = WithTrigger<P> &
  PopoverProps & {
    contentProps?: PopoverContentProps;
    className?: PopoverContentProps['className'];
  };
type AnchorProps = React.ComponentProps<typeof PopoverPrimitive.Anchor>;
type PopoverAnchorProps = AnchorProps & {
  anchorEl?: Maybe<Measurable>;
};

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

const ComposedPopover = <P extends object>({
  children,
  open,
  Trigger,
  className,
  TriggerProps,
  onOpenChange,
  contentProps,
  ...others
}: ComposedPopoverProps<P>) => (
  <Popover {...others} open={open} onOpenChange={onOpenChange}>
    <PopoverTrigger asChild>
      <Trigger {...TriggerProps} />
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
