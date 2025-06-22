'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '@veraclins-dev/utils';

import { type IconName } from '../icons';
import {
  type ComponentWithTooltip,
  type WithComponent,
  type WithTrigger,
} from '../types';

import {
  CONTENT_CLASSES,
  INDICATOR_CLASSES,
  ITEM_CLASSES,
  SUB_CONTENT_CLASSES,
} from './utils/styles';
import { Icon } from './icon';
import { ComposedTooltip } from './tooltip';

type WithHiddenIndicator = {
  indicatorHidden?: boolean;
};

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

const DropdownMenuItemIndicator = DropdownMenuPrimitive.ItemIndicator;

type DropdownMenuProps = React.ComponentProps<typeof DropdownMenu>;

type DropdownMenuContentProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
>;

type DropdownMenuItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Item
>;

function DropdownMenuTrigger({
  tooltip,
  ...props
}: ComponentWithTooltip<typeof DropdownMenuPrimitive.Trigger>) {
  return tooltip ? (
    <ComposedTooltip
      data-slot="dropdown-menu-trigger-tooltip"
      Trigger={DropdownMenuPrimitive.Trigger}
      TriggerProps={{
        'data-slot': 'dropdown-menu-trigger',
        ...props,
      }}
      content={tooltip}
    />
  ) : (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuSubTrigger({
  className,
  inset,
  tooltip,
  children,
  ...props
}: ComponentWithTooltip<
  typeof DropdownMenuPrimitive.SubTrigger,
  { inset?: boolean }
>) {
  return tooltip ? (
    <ComposedTooltip
      data-slot="dropdown-menu-sub-trigger-tooltip"
      Trigger={DropdownMenuPrimitive.SubTrigger}
      TriggerProps={{
        'data-slot': 'dropdown-menu-sub-trigger',
        className: cn(
          'focus:bg-secondary focus:text-secondary-foreground data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8',
          className,
        ),
        'data-inset': inset,
        children: (
          <>
            {children}
            <Icon name="chevron-right" className="ml-auto size-4" />
          </>
        ),
        ...props,
      }}
      content={tooltip}
    />
  ) : (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        'focus:bg-secondary focus:text-secondary-foreground data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8',
        className,
      )}
      {...props}
    >
      {children}
      <Icon name="chevron-right" className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

const DropdownMenuArrow = ({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Arrow> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.Arrow
    className={cn('fill-current', className)}
    {...props}
  />
);

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(CONTENT_CLASSES, className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(SUB_CONTENT_CLASSES, className)}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(ITEM_CLASSES, className)}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  indicatorHidden,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> &
  WithHiddenIndicator) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-hidden-indicator={indicatorHidden}
      className={cn(INDICATOR_CLASSES, className)}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuItemIndicator>
          <Icon name="check-square" className="size-4" />
        </DropdownMenuItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      className={cn('space-y-1', className)}
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  indicatorHidden,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> &
  WithHiddenIndicator) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-hidden-indicator={indicatorHidden}
      className={cn(INDICATOR_CLASSES, className)}
      {...props}
    >
      {!indicatorHidden && (
        <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
          <DropdownMenuItemIndicator>
            <Icon name="circle-solid" className="size-2 fill-current" />
          </DropdownMenuItemIndicator>
        </span>
      )}
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'text-neutral-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  );
}

type ItemSeparator = DropdownMenuItemProps & {
  key: string;
  isSeparator?: boolean;
};
type ItemOption = DropdownMenuItemProps & {
  key: string;
  label: React.ReactNode;
  shortcutKeys?: string[];
  disabled?: boolean;
  isSeparator?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
};

type Item<P extends object> =
  | (WithComponent<P> & { key: string })
  | ItemSeparator
  | ItemOption;

type ComposedDropdownMenuProps<
  P extends object = object,
  I extends object = object,
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
  items,
  arrow = true,
}: ComposedDropdownMenuProps<P, I>) => (
  <DropdownMenu open={open} onOpenChange={onOpenChange}>
    <DropdownMenuTrigger asChild>
      <Trigger {...TriggerProps} />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="center" className={className}>
      {arrow && <DropdownMenuArrow />}

      {items.map(({ key, ...item }) => {
        if ('Component' in item) {
          const { Component, ComponentProps, ...props } = item;
          return (
            <DropdownMenuItem asChild key={key}>
              <Component {...ComponentProps} {...props} />
            </DropdownMenuItem>
          );
        }
        const {
          label,
          shortcutKeys,
          disabled,
          onClick,
          icon,
          iconPosition = 'left',
          isSeparator,
          ...itemProps
        } = item;

        if (isSeparator) {
          return <DropdownMenuSeparator key={key} />;
        }

        return (
          <DropdownMenuItem
            key={key}
            disabled={disabled}
            onClick={onClick}
            {...itemProps}
          >
            {icon && iconPosition === 'left' && (
              <Icon name={icon} className="size-4" />
            )}
            {label}
            {shortcutKeys && shortcutKeys.length > 0 && (
              <DropdownMenuShortcut>
                {shortcutKeys.join(' + ')}
              </DropdownMenuShortcut>
            )}
            {icon && iconPosition === 'right' && (
              <Icon name={icon} className="size-4" />
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
  type ItemOption,
};
