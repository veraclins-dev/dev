'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@veraclins-dev/utils';

import {
  type ComponentWithTooltip,
  type Maybe,
  type Measurable,
  type WithTrigger,
} from '../types';

import { POPUP_CONTENT_CLASSES } from './utils/styles';
import { ComposedTooltip } from './tooltip';

/**
 * A popover component that displays content in a floating panel.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>
 *     <Button>Open Popover</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <p>Popover content</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

/**
 * The trigger element that opens the popover when clicked.
 *
 * @param {Object} props - The component props
 * @param {string} [props.tooltip] - Optional tooltip text to show on hover
 *
 * @example
 * ```tsx
 * <PopoverTrigger tooltip="Click to open">
 *   <Button>Open Popover</Button>
 * </PopoverTrigger>
 * ```
 */
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

/**
 * An arrow element that points to the trigger element.
 *
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply
 *
 * @example
 * ```tsx
 * <PopoverArrow className="fill-primary" />
 * ```
 */
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

/**
 * The content container for the popover.
 *
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {'start' | 'center' | 'end'} [props.align='center'] - The alignment of the content relative to the trigger
 * @param {number} [props.sideOffset=4] - The distance between the trigger and content
 * @param {boolean} [props.arrow] - Whether to show an arrow pointing to the trigger
 *
 * @example
 * ```tsx
 * <PopoverContent align="start" sideOffset={8} arrow>
 *   <p>Content with arrow</p>
 * </PopoverContent>
 * ```
 */
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
      POPUP_CONTENT_CLASSES,
      'min-w-fit origin-(--radix-popover-content-transform-origin) w-(--radix-popover-trigger-width) border p-4 shadow-md outline-hidden',
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

/**
 * An anchor element that the popover can be positioned relative to.
 *
 * @param {Object} props - The component props
 * @param {HTMLElement} [props.anchorEl] - The element to anchor the popover to
 *
 * @example
 * ```tsx
 * <PopoverAnchor anchorEl={someElement}>
 *   <PopoverContent>
 *     <p>Content anchored to element</p>
 *   </PopoverContent>
 * </PopoverAnchor>
 * ```
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

/**
 * A composed popover component that combines trigger and content in a single component.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to display in the popover
 * @param {boolean} [props.open] - Whether the popover is open
 * @param {React.ComponentType} props.Trigger - The trigger component
 * @param {string} [props.className] - Additional CSS classes to apply to the content
 * @param {Object} [props.TriggerProps] - Props to pass to the trigger component
 * @param {Function} [props.onOpenChange] - Callback when open state changes
 * @param {Object} [props.contentProps] - Additional props to pass to PopoverContent
 *
 * @example
 * ```tsx
 * <ComposedPopover
 *   Trigger={Button}
 *   TriggerProps={{ children: 'Open Popover' }}
 *   className="w-80"
 * >
 *   <p>Popover content</p>
 * </ComposedPopover>
 * ```
 */
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
  type PopoverAnchorProps,
  PopoverArrow,
  PopoverContent,
  type PopoverContentProps,
  type PopoverProps,
  PopoverTrigger,
};
