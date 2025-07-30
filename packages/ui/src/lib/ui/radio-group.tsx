import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { cn } from '@veraclins-dev/utils';

import { extractStyleProps } from './utils/variants';
import {
  type RadioGroupItemVariants,
  radioGroupItemVariants,
} from './utils/variants/input';
import { Box } from './box';
import { Icon } from './icon';
import { Label, type LabelProps } from './label';

/**
 * A group of radio buttons where only one option can be selected at a time.
 * Built on top of Radix UI's RadioGroup primitive with additional styling and features.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <RadioGroup defaultValue="option1">
 *   <RadioGroupItem value="option1" label="Option 1" />
 *   <RadioGroupItem value="option2" label="Option 2" />
 *   <RadioGroupItem value="option3" label="Option 3" />
 * </RadioGroup>
 *
 * // With custom label props
 * <RadioGroup defaultValue="option1">
 *   <RadioGroupItem
 *     value="option1"
 *     label="Option 1"
 *     labelProps={{ className: "text-sm font-medium" }}
 *   />
 * </RadioGroup>
 * ```
 */
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

/**
 * An individual radio button option within a RadioGroup.
 * Includes a label and custom styling for the radio button.
 *
 * @example
 * ```tsx
 * // Basic usage with label
 * <RadioGroupItem value="option1" label="Option 1" />
 *
 * // With custom label props
 * <RadioGroupItem
 *   value="option1"
 *   label="Option 1"
 *   labelProps={{ className: "text-sm font-medium" }}
 * />
 *
 * // Without label
 * <RadioGroupItem value="option1" />
 * ```
 *
 * @property {string} value - The value of the radio button
 * @property {React.ReactNode} [label] - The label text or element for the radio button
 * @property {LabelProps} [labelProps] - Props to pass to the Label component
 * @property {string} [className] - Additional CSS classes for the radio button
 * @property {string} [id] - Unique identifier for the radio button
 */
function RadioGroupItem({
  className,
  id,
  labelProps,
  label,
  radioSize,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  labelProps?: LabelProps;
  label?: React.ReactNode;
} & RadioGroupItemVariants) {
  const { styleProps, others } = extractStyleProps(props);
  return (
    <Box display="flex" items="center" gap={2} className={className}>
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        className={cn(radioGroupItemVariants({ ...styleProps, radioSize }))}
        data-size={radioSize}
        id={id}
        {...others}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="flex items-center justify-center"
        >
          <Icon
            data-size={radioSize}
            name="circle-solid"
            className="data-[size=sm]:size-3 data-[size=md]:size-3.5 data-[size=lg]:size-4 data-[size=xl]:size-5"
          />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label && (
        <Label {...labelProps} className="whitespace-nowrap" htmlFor={id}>
          {label}
        </Label>
      )}
    </Box>
  );
}

export { RadioGroup, RadioGroupItem };
