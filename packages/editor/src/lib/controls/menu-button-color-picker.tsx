import { type ReactNode, useState } from 'react';
import { type Except } from 'type-fest';

import { Popover, PopoverTrigger } from '@veraclins-dev/ui';

import { type ColorPickerProps, type SwatchColorOption } from './color-picker';
import {
  ColorPickerPopper,
  type ColorPickerPopperProps,
} from './color-picker-popper';
import { MenuButton, type MenuButtonProps } from './menu-button';

export interface MenuButtonColorPickerProps
  // Omit the default `color`, `value`, and `onChange` toggle button props so
  // that "color" can't be confused for the `value` prop, and so that we can use
  // our own types for `value` and `onChange`.
  extends Except<MenuButtonProps, 'color' | 'value' | 'onChange'> {
  /** The current CSS color string value. */
  value: string | undefined;
  /** Callback when the color changes. */
  onChange: (newColor: string) => void;
  /**
   * Provide default list of colors (must be valid CSS color strings) which
   * are used to form buttons for color swatches.
   */
  swatchColors?: SwatchColorOption[];
  /** Override the props for the color picker. */
  ColorPickerProps?: Partial<ColorPickerProps>;
  /**
   * Unique HTML ID for the color picker popper that will be shown when clicking
   * this button (used for aria-describedby for accessibility).
   */
  popoverId?: string;
  /** Override the default labels for any of the content. */
  labels?: {
    /**
     * Button label for removing the currently set color (setting the color to
     * ""). By default "None".
     */
    removeColorButton?: ReactNode;
    /**
     * Tooltip title for the button that removes the currently set color. By
     * default "" (no tooltip shown).
     */
    removeColorButtonTooltipTitle?: ReactNode;
    /**
     * Button label for canceling updating the color in the picker. By default
     * "Cancel".
     */
    cancelButton?: ReactNode;
    /**
     * Button label for saving the color chosen in the interface. By default
     * "OK".
     */
    saveButton?: ReactNode;
    /**
     * The placeholder shown in the text field entry for color. By default:
     * 'Ex: "#7cb5ec"'
     */
    textFieldPlaceholder?: string;

    heading?: ReactNode;
  };
}

export function MenuButtonColorPicker({
  value: colorValue,
  onChange,
  swatchColors,
  labels,
  popoverId,
  ColorPickerProps,
  icon,
  label,
  ...menuButtonProps
}: MenuButtonColorPickerProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const { children, ...otherMenuButtonProps } = menuButtonProps;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MenuButton
          aria-describedby={popoverId}
          {...otherMenuButtonProps}
          icon={icon}
          label={label}
          iconProps={{
            style:
              menuButtonProps.disabled || !colorValue
                ? { borderBottomColor: 'currentColor', borderBottomWidth: 3 }
                : { borderBottomColor: colorValue, borderBottomWidth: 3 },
          }}
        />
      </PopoverTrigger>

      <ColorPickerPopper
        id={popoverId}
        value={colorValue ?? ''}
        onSave={(newColor) => {
          onChange(newColor);
          handleClose();
        }}
        onCancel={handleClose}
        swatchColors={swatchColors}
        ColorPickerProps={ColorPickerProps}
        labels={{ ...labels, heading: labels?.heading ?? label }}
      />
    </Popover>
  );
}
