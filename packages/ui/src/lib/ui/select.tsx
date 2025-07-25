import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@veraclins-dev/utils';

import { getOptionLabel, getOptionValue } from '../components';
import { type ObjectOption, type Option } from '../types';

import {
  INPUT_CLASSES,
  ITEM_CLASSES,
  POPUP_CONTENT_CLASSES,
} from './utils/styles';
import { type InputVariants, inputVariants } from './utils/variants/input';
import { extractStyleProps } from './utils/variants/styles';
import { Icon } from './icon';

/**
 * Root component for the Select component. Provides the context for all select-related components.
 * @example
 * ```tsx
 * <Select>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select an option" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="option1">Option 1</SelectItem>
 *     <SelectItem value="option2">Option 2</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

/**
 * Groups related select items together. Can be used to organize options into categories.
 * @example
 * ```tsx
 * <SelectGroup>
 *   <SelectLabel>Fruits</SelectLabel>
 *   <SelectItem value="apple">Apple</SelectItem>
 *   <SelectItem value="banana">Banana</SelectItem>
 * </SelectGroup>
 * ```
 */
function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

/**
 * Displays the currently selected value or placeholder in the select trigger.
 * @example
 * ```tsx
 * <SelectValue placeholder="Select an option" />
 * ```
 */
function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

/**
 * The button that triggers the select dropdown. Contains the selected value and a dropdown icon.
 * @example
 * ```tsx
 * <SelectTrigger>
 *   <SelectValue placeholder="Select an option" />
 * </SelectTrigger>
 * ```
 */
function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        INPUT_CLASSES,
        'flex w-fit items-center justify-between gap-2 bg-transparent whitespace-nowrap *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <Icon name="chevron-down" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

type SelectContentProps = React.ComponentProps<typeof SelectPrimitive.Content>;

/**
 * The container for the select dropdown content. Includes scroll buttons and viewport.
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectScrollUpButton />
 *   <SelectItem value="option1">Option 1</SelectItem>
 *   <SelectItem value="option2">Option 2</SelectItem>
 *   <SelectScrollDownButton />
 * </SelectContent>
 * ```
 */
function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          POPUP_CONTENT_CLASSES,
          'relative max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

/**
 * A label for a group of select items. Used to categorize options.
 * @example
 * ```tsx
 * <SelectLabel>Fruits</SelectLabel>
 * ```
 */
function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('text-neutral-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  );
}

/**
 * An individual selectable option in the dropdown.
 * @example
 * ```tsx
 * <SelectItem value="apple">Apple</SelectItem>
 * ```
 */
function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        ITEM_CLASSES,
        'w-full pr-8 pl-2 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Icon name="check" className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/**
 * A visual separator between groups of select items.
 * @example
 * ```tsx
 * <SelectGroup>
 *   <SelectItem value="apple">Apple</SelectItem>
 * </SelectGroup>
 * <SelectSeparator />
 * <SelectGroup>
 *   <SelectItem value="carrot">Carrot</SelectItem>
 * </SelectGroup>
 * ```
 */
function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

/**
 * A button that appears at the top of the select content when there are more items above.
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectScrollUpButton />
 *   <SelectItem value="option1">Option 1</SelectItem>
 * </SelectContent>
 * ```
 */
function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <Icon className="size-4" name="chevron-up" />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * A button that appears at the bottom of the select content when there are more items below.
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectItem value="option1">Option 1</SelectItem>
 *   <SelectScrollDownButton />
 * </SelectContent>
 * ```
 */
function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <Icon className="size-4" name="chevron-down" />
    </SelectPrimitive.ScrollDownButton>
  );
}

type GroupOptions = {
  label: ObjectOption<React.ReactNode>['label'];
  options: Option<React.ReactNode>[];
  id: string;
};

/**
 * Props for the Select component.
 * @property {Option<React.ReactNode>[]} options - Array of options or grouped options
 * @property {boolean} [grouped] - Whether the options are grouped
 * @property {string} [placeholder] - Placeholder text when no value is selected
 * @property {boolean} [showLabel] - Whether to show the label
 * @property {'popper' | 'item-aligned'} [position] - Position of the select content
 * @property {number} [sideOffset] - Offset from the trigger
 * @property {string} [value] - Currently selected value
 * @property {function} [onValueChange] - Callback when value changes
 * @property {string} [className] - Additional CSS classes
 */
export type SelectProps = SelectPrimitive.SelectProps &
  InputVariants &
  Pick<SelectContentProps, 'className' | 'sideOffset'> & {
    placeholder?: string;
    showLabel?: boolean;
    contentPosition?: SelectContentProps['position'];
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

/**
 * A pre-composed Select component that handles common use cases.
 * Supports both flat and grouped options, with customizable styling and behavior.
 * @example
 * ```tsx
 * // Basic usage
 * <ComposedSelect
 *   options={[
 *     { label: 'Option 1', value: 'option1' },
 *     { label: 'Option 2', value: 'option2' },
 *   ]}
 *   placeholder="Select an option"
 * />
 *
 * // With grouped options
 * <ComposedSelect
 *   grouped
 *   options={[
 *     {
 *       id: 'fruits',
 *       label: 'Fruits',
 *       options: [
 *         { label: 'Apple', value: 'apple' },
 *         { label: 'Banana', value: 'banana' },
 *       ],
 *     },
 *   ]}
 *   placeholder="Select a fruit"
 * />
 * ```
 */
const ComposedSelect = ({
  options,
  grouped,
  className,
  placeholder,
  showLabel = true,
  contentPosition,
  sideOffset,
  value,
  inputSize,
  ...props
}: SelectProps) => {
  const { styleProps, others } = extractStyleProps(props);
  return (
    <Select {...others} value={value}>
      <SelectTrigger
        className={cn(
          'w-full',
          inputVariants({ ...styleProps, inputSize, className }),
        )}
      >
        {showLabel ? (
          <SelectValue placeholder={placeholder} />
        ) : (
          (value ?? placeholder)
        )}
      </SelectTrigger>
      <SelectContent position={contentPosition} sideOffset={sideOffset}>
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
    </Select>
  );
};

export {
  ComposedSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
