import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { type ObjectOption, type Option } from '../../types';
import { Icon } from '../icon';

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;
const SelectViewport = SelectPrimitive.Viewport;

const SelectValue = SelectPrimitive.Value;
const SelectScrollUpButton = SelectPrimitive.ScrollUpButton;
const SelectScrollDownButton = SelectPrimitive.ScrollDownButton;

export const getOptionLabel = (option?: Option) =>
  typeof option === 'string' ? option : option?.label;
export const getOptionValue = (option: Option) =>
  typeof option === 'string' ? option : option.value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex min-h-[0.75rem] w-full items-center justify-between rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2  disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Icon className="opacity-50" name="chevron-down" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden rounded-md bg-card text-card-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
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
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Icon name="check" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
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
  label: ObjectOption['label'];
  options: Option[];
  id: string;
};

export type SelectProps = SelectPrimitive.SelectProps & {
  className?: string;
  placeholder?: string;
  showLabel?: boolean;
} & (
    | {
        options: Option[];
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
}: SelectProps & SelectPrimitive.SelectProps) => (
  <SelectRoot {...props} value={value}>
    <SelectTrigger className={cn('max-w-[120px]', className)}>
      {showLabel ? (
        <SelectValue placeholder={placeholder} />
      ) : (
        (value ?? placeholder)
      )}
    </SelectTrigger>
    <SelectContent className="select-content">
      <SelectViewport>
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
      </SelectViewport>
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
