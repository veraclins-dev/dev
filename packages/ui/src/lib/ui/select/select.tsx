import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { getOptionLabel, getOptionValue } from '../../components';
import { type ObjectOption, type Option } from '../../types';
import {
  activeItemClasses,
  contentClasses,
  itemClasses,
} from '../dropdown-menu';
import { Icon } from '../icon';
import { inputClasses } from '../input';

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;
const SelectScrollUpButton = SelectPrimitive.ScrollUpButton;
const SelectScrollDownButton = SelectPrimitive.ScrollDownButton;

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex min-h-[0.75rem] min-w-fit items-center justify-between rounded-md text-sm focus:outline-none focus:ring-2  disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Icon className="opacity-70" name="chevron-down" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectViewport = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Viewport
    ref={ref}
    {...props}
    className={cn('gap-0.5 flex flex-col', className)}
  >
    {children}
  </SelectPrimitive.Viewport>
));
SelectViewport.displayName = SelectPrimitive.Viewport.displayName;

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Content
    ref={ref}
    className={cn(
      contentClasses,
      'relative min-w-[var(--radix-select-trigger-width)]',
      position === 'popper' &&
        'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
      className,
    )}
    position={position}
    {...props}
  >
    <SelectViewport
      className={cn(
        position === 'popper' && 'h-[var(--radix-select-trigger-height)]',
      )}
    >
      {children}
    </SelectViewport>
  </SelectPrimitive.Content>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(itemClasses, 'px-2', activeItemClasses, className)}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <Icon name="check" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

type GroupOptions = {
  label: ObjectOption<React.ReactNode>['label'];
  options: Option<React.ReactNode>[];
  id: string;
};

export type SelectProps = SelectPrimitive.SelectProps & {
  className?: string;
  placeholder?: string;
  showLabel?: boolean;
} & (
    | {
        options: Option<React.ReactNode>[];
        grouped?: false;
      }
    | {
        options: GroupOptions[];
        grouped: true;
      }
  );

const Select = ({
  options,
  grouped,
  className,
  placeholder,
  showLabel = true,
  value,
  ...props
}: SelectProps) => (
  <SelectRoot {...props} value={value}>
    <SelectTrigger className={cn(inputClasses, className)}>
      {showLabel ? (
        <SelectValue placeholder={placeholder} />
      ) : (
        (value ?? placeholder)
      )}
    </SelectTrigger>
    <SelectContent className="border">
      {grouped ? (
        options.map((group) => (
          <SelectGroup key={group.id}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.options.map((option) => (
              <SelectItem
                key={getOptionValue(option)}
                value={getOptionValue(option)}
              >
                {getOptionLabel(option)}
              </SelectItem>
            ))}
          </SelectGroup>
        ))
      ) : (
        <>
          {options.map((option) => (
            <SelectItem
              key={getOptionValue(option)}
              value={getOptionValue(option)}
            >
              {getOptionLabel(option)}
            </SelectItem>
          ))}
        </>
      )}
    </SelectContent>
  </SelectRoot>
);

Select.displayName = SelectRoot.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
};
