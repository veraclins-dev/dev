import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { Icon } from './icon';
import { Label, type LabelProps } from './label';

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  id,
  labelProps,
  label,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  labelProps?: LabelProps;
  label?: React.ReactNode;
}) {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-current/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive  data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground aspect-square size-5 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        id={id}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="flex items-center justify-center"
        >
          <Icon name="circle-solid" className="size-3" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label && (
        <Label {...labelProps} className="whitespace-nowrap" htmlFor={id}>
          {label}
        </Label>
      )}
    </div>
  );
}

export { RadioGroup, RadioGroupItem };
