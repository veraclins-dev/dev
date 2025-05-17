import { cn } from '@veraclins-dev/utils';

const inputClasses = cn(
  // Layout and Base
  'flex flex-1 min-w-0 bg-transparent outline-none',
  // Text and Selection
  'text-base data-[placeholder]:text-muted-foreground md:text-sm placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
  // Spacing
  'min-h-7 px-3 py-2',
  // Border and Shadow
  'rounded-md border shadow-xs',
  // Focus Styles
  'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-1',
  // Disabled Styles
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  // Error States
  'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
  // File Input Styles
  'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
  // Transitions
  'transition-[color,box-shadow]',
  //  SVG Styles
  "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);

// Input Container Class
const inputContainerClass = cn(
  // Layout and Base
  'flex flex-1 min-w-0 bg-transparent outline-none items-center',
  // Spacing
  'px-3 py-2',
  // Border and Shadow
  'rounded-md border shadow-xs',
  // Focus Styles
  'has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-1',
  // Disabled Styles
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  // Error States
  'has-aria-invalid:ring-destructive/20 has-aria-invalid:border-destructive',
  // Transitions
  'transition-[border-color,box-shadow]',
);

// Input Class Overrides (applied to container to target input child)
const inputClassOverrides = cn(
  // Spacing
  'p-0 min-h-0',
  // Border and Shadow
  'border-none rounded-none shadow-none',
  // Focus Styles
  'focus-visible:border-none focus-visible:ring-0',
  // Error States
  'aria-invalid:border-none aria-invalid:ring-0',
);

// Popover Content Classes
const popupContentClasses = cn(
  // Appearance
  'bg-popover text-popover-foreground rounded-md border shadow-md',
  // Animations
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  // Positioning
  'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  // Z-Index
  'z-50',
);

// Dropdown Menu Content Classes
const contentClasses = cn(
  popupContentClasses,
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
const subContentClasses = cn(
  // Base Popover Styles
  popupContentClasses,
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
const sharedItemClasses = cn(
  // Layout
  'relative flex items-center gap-2',
  // Appearance
  'rounded-sm px-2 py-1.5 text-sm select-none',
  // Interactivity
  'cursor-default outline-hidden data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
  // SVG Styles
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);

// Menu Item Classes
const itemClasses = cn(
  // Base Shared Styles
  sharedItemClasses,
  // Focus States
  'focus:bg-accent focus:text-accent-foreground',
  // Destructive Variant
  'data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive',
  // Inset Spacing
  'data-[inset]:pl-8',
);

// Active Item Classes
const activeItemClasses = cn(
  // Checked State
  'data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground',
);

// Indicator Classes
const indicatorClasses = cn(
  // Layout
  'relative flex items-center gap-2',
  // Appearance
  'rounded-sm py-1.5 pr-2 pl-8 data-[hidden-indicator=true]:pl-2 text-sm select-none',
  // Interactivity
  'cursor-default outline-hidden data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  // SVG Styles
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);

export {
  activeItemClasses,
  contentClasses,
  indicatorClasses,
  inputClasses,
  inputClassOverrides,
  inputContainerClass,
  itemClasses,
  popupContentClasses,
  sharedItemClasses,
  subContentClasses,
};
