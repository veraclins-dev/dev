import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@veraclins-dev/utils';

import { CHECKBOX_CLASSES } from './utils/styles';
import { Icon } from './icon';
import { checkboxVariants, CheckboxVariants } from './utils/variants/input';
import { extractStyleProps } from './utils/variants';

/**
 * Represents the possible checked states of a checkbox.
 * - 'on': Checkbox is checked
 * - 'off': Checkbox is unchecked
 * - 'indeterminate': Checkbox is in an indeterminate state
 */
type CheckedValue = 'on' | 'off' | 'indeterminate';

/**
 * Props for the Checkbox component.
 * Extends Radix UI's CheckboxPrimitive.Root props with custom value handling.
 */
type CheckboxProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  'type' | 'value'
> & {
  /** The checked state of the checkbox */
  value?: CheckedValue;
} & CheckboxVariants;

/** Type representing the checked state from Radix UI's CheckboxPrimitive */
type CheckedState = CheckboxPrimitive.CheckedState;

/**
 * Checkbox component that provides a customizable checkbox input with support for
 * checked, unchecked, and indeterminate states. Built on top of Radix UI's
 * CheckboxPrimitive for accessibility and customization.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Checkbox />
 *
 * // With label
 * <Box className="flex items-center gap-2">
 *   <Checkbox id="terms" />
 *   <label htmlFor="terms">Accept terms</label>
 * </Box>
 *
 * // Controlled component
 * <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
 *
 * // Indeterminate state
 * <Checkbox checked="indeterminate" />
 * ```
 *
 * @param props - Props for the Checkbox component
 * @returns A styled checkbox input with support for various states
 */
function Checkbox({
  className,
  checked,
  checkboxSize,
  ...props
}: CheckboxProps) {
  const { styleProps, others } = extractStyleProps(props);
  props.defaultChecked;
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        checkboxVariants({
          ...styleProps,
          className,
          checkboxSize,
        }),
      )}
      {...others}
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
