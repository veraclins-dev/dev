import { cn } from '@veraclins-dev/utils';

const BASE_INPUT_CLASSES = cn(
  // Border and Shadow
  'border shadow-xs',
  // Focus Styles
  'focus-visible:ring-primary/50 focus-visible:ring-2 focus:ring-offset-0.5',
  // Disabled Styles
  'disabled:cursor-not-allowed disabled:opacity-50',
  // Error States
  'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
  // Base
  'outline-none',
  // Transitions
  'transition-[color,box-shadow]',
);

const CHECKBOX_CLASSES = cn(
  BASE_INPUT_CLASSES,
  // Layout and Base
  'peer size-5 shrink-0 rounded-[4px]',
  // Text and Selection
  'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=checked]:border-primary',
  // Transitions
  'transition-shadow',
  // Focus Styles
  'focus:ring-primary/50 focus:ring-2',
);

const RADIO_GROUP_ITEM_CLASSES = cn(
  BASE_INPUT_CLASSES,
  // Layout and Base
  'flex items-center justify-center aspect-square size-5 shrink-0 rounded-full',
  // checked
  'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
  // Transitions
  'transition-shadow',
  // Focus Styles
  'focus:ring-primary/50 focus:ring-2',
);

const INPUT_CLASSES = cn(
  BASE_INPUT_CLASSES,
  // Layout and Base
  'flex flex-1 min-w-24 bg-transparent',
  // Text and Selection
  'text-base data-[placeholder]:text-current/50 md:text-sm placeholder:text-current/70 selection:bg-primary selection:text-primary-foreground',
  // Spacing
  'min-h-7 px-3 py-2',
  // Border and Shadow
  'rounded-md',
  // Focus Styles
  'focus-visible:ring-2 focus:ring-offset-0.5 has-focus-visible:ring-primary/50 has-focus-visible:ring-2 has-focus-visible:ring-offset-0.5',
  // Disabled Styles
  'disabled:pointer-events-none',
  // File Input Styles
  'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
  // SVG Styles
  '[&_svg]:shrink-0',
);

// Input Container Class
const INPUT_CONTAINER_CLASSES = cn(
  // Layout and Base
  'flex flex-1 min-w-0 bg-transparent outline-none items-center',
  // Spacing
  'px-3 py-2',
  // Border and Shadow
  'rounded-md border shadow-xs',
  // Focus Styles
  'has-focus-visible:ring-primary/50 has-focus-visible:ring-2 has-focus-visible:ring-offset-0.5',
  // Disabled Styles
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  // Error States
  'has-aria-invalid:ring-destructive/20 has-aria-invalid:border-destructive',
  // Transitions
  'transition-[border-color,box-shadow]',
);

// Input Class Overrides (applied to container to target input child)
const INPUT_CLASS_OVERRIDES = cn(
  // Spacing
  'p-0 min-h-0',
  // Border and Shadow
  'border-none rounded-none shadow-none',
  // Focus Styles
  'focus-visible:border-none focus-visible:ring-0 focus:ring-offset-0 has-focus-visible:border-none has-focus-visible:ring-0 has-focus-visible:ring-offset-0',
  // Error States
  'aria-invalid:border-none aria-invalid:ring-0',
);

// Popover Content Classes
const POPUP_CONTENT_CLASSES = cn(
  // Appearance
  'bg-popover text-popover-foreground rounded-md border shadow-md',
  // Layout and Base
  'flex flex-col gap-y-0.5',
  // Animations
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  // Positioning
  'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  // Z-Index
  'z-50',
);

// Dropdown Menu Content Classes
const CONTENT_CLASSES = cn(
  POPUP_CONTENT_CLASSES,
  // Sizing
  'max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem]',
  // Transform Origin
  'origin-[var(--radix-dropdown-menu-content-transform-origin)]',
  // Overflow
  'overflow-x-hidden overflow-y-auto',
  // Spacing
  'p-1',
  // Appearance
  'border shadow-md',
);

// Sub-Menu Content Classes
const SUB_CONTENT_CLASSES = cn(
  // Base Popover Styles
  POPUP_CONTENT_CLASSES,
  // Sizing
  'min-w-[8rem]',
  // Transform Origin
  'origin-[var(--radix-dropdown-menu-content-transform-origin)]',
  // Overflow
  'overflow-hidden',
  // Spacing
  'p-1',
  // Appearance
  'border shadow-lg',
);

// Shared Item Classes
const SHARED_ITEM_CLASSES = cn(
  // Layout
  'relative flex items-center gap-2',
  // Appearance
  'rounded-sm px-2 py-1.5 text-sm select-none',
  // Interactivity
  'cursor-pointer outline-hidden data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
  // SVG Styles
  '[&_svg]:shrink-0',
);

// Menu Item Classes
const ITEM_CLASSES = cn(
  // Base Shared Styles
  SHARED_ITEM_CLASSES,
  // Focus and Hover States
  'focus:bg-neutral-soft-hover focus:text-neutral-foreground-hover hover:bg-neutral-soft hover:text-neutral-foreground-hover',
  // Destructive Variant
  'data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive',
  // Inset Spacing
  'data-[inset]:pl-8',

  // Checked and Selected States
  'data-[state=checked]:bg-neutral-soft data-[state=checked]:text-neutral-foreground data-[selected=true]:bg-neutral-soft data-[selected=true]:text-neutral-foreground',
);

// Indicator Classes
const INDICATOR_CLASSES = cn(
  ITEM_CLASSES,
  // Appearance
  'rounded-sm py-1.5 pr-2 pl-8 data-[hidden-indicator=true]:pl-2 text-sm select-none',
  // Interactivity
  'cursor-pointer outline-hidden data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  // SVG Styles
  '[&_svg]:pointer-events-none [&_svg]:shrink-0',
);

// Shared default classes, grouped
const SHARED_ACTIVE_ELEMENT_CLASSES = cn(
  // Layout and Base
  'inline-flex items-center justify-center',
  // Border
  'border border-transparent',
  // Text
  'font-medium',
  // Transitions
  'transition-colors',
  // Error States
  'aria-invalid:border-destructive/20 dark:aria-invalid:border-destructive/40',
  // SVG Styles
  '[&_svg]:shrink-0',
);

// Component-specific default classes, grouped
const CHIP_DEFAULT_CLASSES = cn(
  SHARED_ACTIVE_ELEMENT_CLASSES,
  // Layout and Base
  'max-w-fit shrink-0',
  // Spacing
  'px-2.5 py-0.5 gap-1.5',
  // Text
  'text-xs',
  // Border and Shape
  'rounded-md',
);

const BADGE_DEFAULT_CLASSES = cn(
  SHARED_ACTIVE_ELEMENT_CLASSES,
  // Layout and Base
  'max-w-fit',
  // Spacing
  'px-2.5 py-0.5 gap-1.5',
  // Text
  'text-xs',
  // Border and Shape
  'rounded-full',
);

const BUTTON_DEFAULT_CLASSES = cn(
  SHARED_ACTIVE_ELEMENT_CLASSES,
  // Layout and Base
  'cursor-pointer',
  // Spacing
  'px-3 gap-2',
  // Text
  'text-sm whitespace-nowrap',
  // Border and Shape
  'rounded-md',
  // Disabled Styles
  'disabled:pointer-events-none disabled:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
  // Focus and Error States
  'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-0.5 outline-none focus-visible:outline-none focus-visible:ring-primary/50 focus-visible:ring-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
  // SVG Styles
  '[&_svg]:pointer-events-none',
);

const LINK_DEFAULT_CLASSES = cn(
  SHARED_ACTIVE_ELEMENT_CLASSES,
  // Layout and Base
  'cursor-pointer',
  // Transitions
  'transition-colors',
  // Focus Styles
  'focus-visible:outline-none focus-visible:ring-0',
  // Disabled Styles
  'disabled:pointer-events-none disabled:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
  // Text
  'font-medium no-underline',
);

const TOOLTIP_CLASSES = cn(
  // Appearance
  'bg-neutral-soft text-neutral-foreground rounded-md border border-neutral-soft shadow-md',
  // Layout and Base
  'px-2 py-1 text-center text-sm max-w-60',
  // Overflow
  'overflow-hidden',
  // Animations
  'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  // Positioning
  'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  // Z-Index
  'z-50',
);

export {
  BADGE_DEFAULT_CLASSES,
  BUTTON_DEFAULT_CLASSES,
  CHECKBOX_CLASSES,
  CHIP_DEFAULT_CLASSES,
  CONTENT_CLASSES,
  INDICATOR_CLASSES,
  INPUT_CLASS_OVERRIDES,
  INPUT_CLASSES,
  INPUT_CONTAINER_CLASSES,
  ITEM_CLASSES,
  LINK_DEFAULT_CLASSES,
  POPUP_CONTENT_CLASSES,
  RADIO_GROUP_ITEM_CLASSES,
  SHARED_ITEM_CLASSES,
  SUB_CONTENT_CLASSES,
  TOOLTIP_CLASSES,
};
