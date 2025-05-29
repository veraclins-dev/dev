import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@veraclins-dev/utils';

import { Icon } from './icon';

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
      className={cn(
        'peer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=checked]:border-primary size-5 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
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
