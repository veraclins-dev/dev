'use client';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

import { cn } from '@veraclins-dev/utils';

/**
 * A hover card component that displays additional content when hovering over a trigger element.
 *
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger>
 *     <Button>Hover me</Button>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <p>Additional information</p>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

/**
 * The trigger element that activates the hover card when hovered.
 *
 * @example
 * ```tsx
 * <HoverCardTrigger asChild>
 *   <Button>Hover me</Button>
 * </HoverCardTrigger>
 * ```
 */
function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

/**
 * The content container for the hover card.
 *
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {'start' | 'center' | 'end'} [props.align='center'] - The alignment of the content relative to the trigger
 * @param {'top' | 'right' | 'bottom' | 'left'} [props.side='top'] - The side of the trigger where the content appears
 * @param {number} [props.sideOffset=4] - The distance between the trigger and content
 *
 * @example
 * ```tsx
 * <HoverCardContent align="start" side="right" sideOffset={8}>
 *   <p>Content appears on the right side</p>
 * </HoverCardContent>
 * ```
 */
function HoverCardContent({
  className,
  align = 'center',
  side = 'top',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        side={side}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardContent, HoverCardTrigger };
