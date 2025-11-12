import { colord } from 'colord';

/**
 * Convert a color string to a color in hex string format (e.g. "#ff0000"), or
 * return null if the given string cannot be parsed as a valid color.
 *
 * Examples:
 *   "rgb(169, 79, 211)" -> "#a94fd3"
 *   "#a94fd3" -> "#a94fd3"
 *   "not a color" -> null
 */
export function colorToHex(color: string): string | null {
  try {
    const object = colord(color);
    return object.isValid() ? object.toHex() : null;
  } catch (_err) {
    return null;
  }
}

/**
 * Get the matching text color for a given background color.
 */
export function getContrastText(backgroundColor: string): string {
  const object = colord(backgroundColor);
  return object.isDark() ? '#949494' : '#474747';
}
