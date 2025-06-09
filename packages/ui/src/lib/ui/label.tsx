import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@veraclins-dev/utils';

/**
 * Props for the Label component.
 * Extends Radix UI's Label.Root props.
 */
type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root>;

/**
 * Label component for form controls and other UI elements.
 * Built on top of Radix UI's Label primitive for accessibility.
 * Includes built-in styling for disabled states and peer interactions.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" />
 *
 * // With custom styling
 * <Label className="text-blue-500">Custom Label</Label>
 *
 * // With disabled state
 * <Label className="group" data-disabled>
 *   Disabled Label
 * </Label>
 * ```
 *
 * @param props - Props for the Label component
 * @returns A styled label element with accessibility features
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Label, type LabelProps };
