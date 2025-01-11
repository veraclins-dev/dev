import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { Icon } from './icon';

type CheckedValue = 'on' | 'off' | 'indeterminate';

type CheckboxProps = Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'type' | 'value'
> & {
  value?: CheckedValue;
};

type CheckedState = CheckboxPrimitive.CheckedState;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-5 w-5 shrink-0 rounded-sm border-2 ring-offset-background focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Icon name="check-square" size="xs" className="" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, type CheckboxProps, type CheckedState, type CheckedValue };
