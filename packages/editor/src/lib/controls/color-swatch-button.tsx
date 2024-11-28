import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { type Except } from 'type-fest';
import { getContrastText } from '#app/components/rich-editor/utils/color.ts';
import { Icon } from '#app/components/ui/icon';
import { cn } from '@veraclins-dev/utils';

export interface ColorSwatchButtonProps
  // Omit the default "color" prop so that it can't be confused for the `value`
  // prop
  extends Except<ComponentPropsWithoutRef<'button'>, 'color'> {
  /**
   * What color is shown with this swatch. If not provided, shows a checkerboard
   * pattern, typically used as "not set" or "transparent".
   */
  value?: string;
  /**
   * An optional human-friendly name for this color, used as an aria-label for
   * the button.
   */
  label?: string;
  /**
   * Whether this swatch color is the currently active color. If true, shows an
   * overlaid checkmark as a visual indicator.
   */
  active?: boolean;
  /** If given, sets the padding between the color and the border of the swatch. */
  padding?: string | number;
}

/**
 * Renders a button in the given color `value`, useful for showing and allowing
 * selecting a color preset.
 */
export const ColorSwatchButton = forwardRef<
  ElementRef<'button'>,
  ColorSwatchButtonProps
>(({ value: colorValue, label, padding, active, ...buttonProps }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      style={{ backgroundColor: colorValue, padding }}
      aria-label={label ?? colorValue}
      value={colorValue}
      {...buttonProps}
      className={cn(
        'h-9 w-9 rounded-sm border',
        { 'bg-checkered bg-clip-content': !colorValue },
        buttonProps.className,
      )}
    >
      {active && (
        <Icon
          fontSize="small"
          name="check"
          className="h-full w-4/5 align-middle"
          style={{
            color: colorValue ? getContrastText(colorValue) : undefined,
          }}
        />
      )}
    </button>
  );
});

ColorSwatchButton.displayName = 'ColorSwatchButton';
