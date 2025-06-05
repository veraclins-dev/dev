import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@veraclins-dev/utils';

import { Icon } from './icon';
import { CHECKBOX_CLASSES } from './styles';

type CheckedValue = 'on' | 'off' | 'indeterminate';

type CheckboxProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  'type' | 'value'
> & {
  value?: CheckedValue;
};

type CheckedState = CheckboxPrimitive.CheckedState;

/**
 * Checkbox component that uses Radix UI's CheckboxPrimitive.
 * @param param0
 * @returns
 */
function Checkbox({
  className,
  checked,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(CHECKBOX_CLASSES, className)}
      {...props}
      checked={checked}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <Icon
          name={checked === 'indeterminate' ? 'minus' : 'check-square'}
          className="size-4"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, type CheckboxProps, type CheckedState, type CheckedValue };
