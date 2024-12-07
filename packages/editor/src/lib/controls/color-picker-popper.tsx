import { useEffect, useState } from 'react';

import { Button, PopoverContent, type PopoverProps } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import { ColorPicker } from '../controls/color-picker';
import { type MenuButtonColorPickerProps } from '../controls/menu-button-color-picker';

export interface ColorPickerPopperBodyProps
  extends Pick<
    MenuButtonColorPickerProps,
    'swatchColors' | 'labels' | 'ColorPickerProps'
  > {
  /** The current color value. Must be a valid CSS color string. */
  value: string;
  /** Callback when the user is saving/changing the current color. */
  onSave: (newColor: string) => void;
  /** Callback when the user is canceling updates to the current color. */
  onCancel: () => void;
}

export interface ColorPickerPopperProps
  extends PopoverProps,
    ColorPickerPopperBodyProps {}

// NOTE: This component's state logic is able to be kept simple because the
// component is unmounted whenever the outer Popper is not open, so we don't
// have to worry about resetting the state ourselves when the user cancels, for
// instance.
export function ColorPickerPopperBody({
  value,
  onCancel,
  onSave,
  swatchColors,
  labels = {},
  ColorPickerProps,
}: ColorPickerPopperBodyProps) {
  const {
    removeColorButton = 'Clear',
    cancelButton = 'Cancel',
    saveButton = 'Apply',
    heading = 'Choose a color',
    removeColorButtonTooltipTitle = 'Clear color',
  } = labels;

  // Because color can change rapidly as the user drags the color in the
  // ColorPicker gradient, we'll wait until "Save" to call the onSave prop, and
  // we'll store an internal localColor until then. (This could alternatively be
  // implemented such that we "save" directly whenever a swatch preset is
  // clicked, by looking at the `source` from `ColorPicker.onChange`, but it may
  // be useful to tweak a color from a swatch before saving.)
  const [localColor, setLocalColor] = useState<string>(value);
  // Update our internal value whenever the `color` prop changes (since this is
  // a controlled component)
  useEffect(() => {
    setLocalColor(value);
  }, [value]);

  return (
    <>
      <p className="text-md font-medium mb-2">{heading}</p>
      <ColorPicker
        swatchColors={swatchColors}
        value={localColor}
        onChange={(newColor) => {
          setLocalColor(newColor);
        }}
        labels={labels}
        {...ColorPickerProps}
      />

      <div className="mt-4 flex justify-between">
        <Button
          tooltip={removeColorButtonTooltipTitle}
          className="px-2 py-0.5"
          onClick={() => onSave('')}
          type="button"
        >
          {removeColorButton}
        </Button>

        <Button
          variant="outline"
          className="px-2 py-0.5"
          onClick={onCancel}
          type="button"
        >
          {cancelButton}
        </Button>

        <Button
          variant="primary"
          className="px-2 py-0.5"
          onClick={() => onSave(localColor)}
          type="button"
        >
          {saveButton}
        </Button>
      </div>
    </>
  );
}

/**
 * Renders the ColorPicker inside of a Popper interface, for use with the
 * MenuButtonColorPicker.
 */
export function ColorPickerPopper({
  value,
  onSave,
  onCancel,
  swatchColors,
  ColorPickerProps,
  labels,
  className,
  ...popperProps
}: ColorPickerPopperProps) {
  return (
    <PopoverContent {...popperProps} className={cn('z-[3] w-64', className)}>
      <ColorPickerPopperBody
        value={value || ''}
        onSave={onSave}
        onCancel={onCancel}
        swatchColors={swatchColors}
        ColorPickerProps={ColorPickerProps}
        labels={labels}
      />
    </PopoverContent>
  );
}
