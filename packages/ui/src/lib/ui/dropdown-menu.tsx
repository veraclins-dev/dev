import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { forwardRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import { type WithComponent, type WithTrigger } from '../types';

import { Icon } from './icon';
import { ComposedTooltip } from './tooltip';

type WithHiddenIndicator = {
  indicatorHidden?: boolean;
};

export const contentClasses =
  'z-50 min-w-64 flex-col rounded-md border border-avatar bg-card p-2 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';

export const itemClasses =
  'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50';

export const activeItemClasses =
  'data-[state="checked"]:bg-accent data-[state="checked"]:text-accent-foreground';

export const indicatorClasses =
  'absolute left-2 flex h-3.5 w-3.5 items-center justify-center';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuItemIndicator = DropdownMenuPrimitive.ItemIndicator;

type DropdownMenuProps = React.ComponentPropsWithoutRef<typeof DropdownMenu>;

type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;

type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
>;

const DropdownMenuTrigger = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> & {
    tooltip?: React.ReactNode;
  }
>(({ tooltip, ...props }, ref) =>
  tooltip ? (
    <ComposedTooltip
      Trigger={DropdownMenuPrimitive.Trigger}
      TriggerProps={props}
      content={tooltip}
      triggerRef={ref}
    />
  ) : (
    <DropdownMenuPrimitive.Trigger ref={ref} {...props} />
  ),
);
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

const DropdownMenuRadioGroup = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioGroup>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioGroup
    ref={ref}
    {...props}
    className={cn('gap-0.5 flex flex-col', className)}
  />
));
DropdownMenuRadioGroup.displayName =
  DropdownMenuPrimitive.RadioGroup.displayName;

const DropdownMenuSubTrigger = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent data-[state=open]:bg-accent',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <span className="ml-auto h-4 w-4" role="img" aria-label="arrow">
      ▶️
    </span>
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuArrow = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Arrow> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Arrow
    ref={ref}
    className={cn('fill-current', className)}
    {...props}
  />
));
DropdownMenuArrow.displayName = DropdownMenuPrimitive.Arrow.displayName;

const DropdownMenuSubContent = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(contentClasses, className)}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn('menu-content', contentClasses, className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(itemClasses, 'px-2', inset && 'pl-8', className)}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> &
    WithHiddenIndicator
>(({ className, children, checked, indicatorHidden, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'pr-2',
      itemClasses,
      activeItemClasses,
      indicatorHidden ? 'pl-2' : 'pl-8',
      className,
    )}
    checked={checked}
    {...props}
  >
    {!indicatorHidden && (
      <span className={indicatorClasses}>
        <DropdownMenuPrimitive.ItemIndicator>
          <span className="h-4 w-4">
            <Icon name="check-square" size="sm" className="text-white" />
          </span>
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
    )}
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> &
    WithHiddenIndicator
>(({ className, children, indicatorHidden, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'pr-2',
      itemClasses,
      activeItemClasses,
      indicatorHidden ? 'pl-2' : 'pl-8',
      className,
    )}
    {...props}
  >
    {!indicatorHidden && (
      <span className={indicatorClasses}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Icon name="check" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
    )}
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 font-semibold', inset && 'pl-8', className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
    {...props}
  />
);

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

type ItemOption = DropdownMenuItemProps & {
  key: string;
  label: React.ReactNode;
  shortcutKeys?: string[];
  disabled?: boolean;
};

type Item<P extends object> = (WithComponent<P> & { key: string }) | ItemOption;

type ComposedDropdownMenuProps<
  P extends object,
  I extends object,
> = WithTrigger<P> & {
  items: Item<I>[];
  arrow?: boolean;
} & DropdownMenuProps &
  DropdownMenuContentProps;

const ComposedDropdownMenu = <P extends object, I extends object>({
  open,
  onOpenChange,
  Trigger,
  className,
  TriggerProps,
  triggerRef,
  items,
  arrow = true,
}: ComposedDropdownMenuProps<P, I>) => (
  <DropdownMenu open={open} onOpenChange={onOpenChange}>
    <DropdownMenuTrigger asChild>
      <Trigger {...TriggerProps} ref={triggerRef} />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="center" className={className}>
      {arrow && <DropdownMenuArrow />}

      {items.map(({ key, ...item }) => {
        if ('Component' in item) {
          const { Component, ComponentProps, componentRef, ...props } = item;
          return (
            <DropdownMenuItem asChild key={key}>
              <Component {...ComponentProps} {...props} />
            </DropdownMenuItem>
          );
        }
        const { label, shortcutKeys, disabled, onClick, ...itemProps } = item;

        return (
          <DropdownMenuItem
            key={key}
            disabled={disabled}
            onClick={onClick}
            {...itemProps}
          >
            {label}
            {shortcutKeys && shortcutKeys.length > 0 && (
              <DropdownMenuShortcut>
                {shortcutKeys.join(' + ')}
              </DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuContent>
  </DropdownMenu>
);

export {
  ComposedDropdownMenu,
  type ComposedDropdownMenuProps,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  type DropdownMenuContentProps,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  type DropdownMenuProps,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
