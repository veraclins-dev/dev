import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { type Maybe, type Measurable } from '../types';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverArrow = PopoverPrimitive.Arrow;

const PopoverContent = React.forwardRef<
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
          'z-50 min-w-40 rounded-md border bg-card p-4 text-card-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        {...props}
      >
        {arrow && <PopoverArrow className="fill-card stroke-border" />}
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  ),
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

type AnchorProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Anchor
>;
type PopoverAnchorProps = AnchorProps & {
  anchorEl?: Maybe<Measurable>;
};

const PopoverAnchor = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Anchor>,
  PopoverAnchorProps
>(({ virtualRef, anchorEl, ...props }, ref) => {
  const anchorRef = React.useRef<Measurable | null>(null);
  React.useEffect(() => {
    if (anchorEl) {
      anchorRef.current = anchorEl;
    }
  }, [anchorEl]);
  return (
    <PopoverPrimitive.Anchor
      ref={ref}
      virtualRef={anchorRef ?? virtualRef}
      {...props}
    />
  );
});
PopoverAnchor.displayName = PopoverPrimitive.Anchor.displayName;

type PopoverProps = PopoverPrimitive.PopoverContentProps;

export {
  Popover,
  PopoverAnchor,
  type PopoverAnchorProps,
  PopoverArrow,
  PopoverContent,
  type PopoverProps,
  PopoverTrigger,
};
