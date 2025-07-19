import { type Breakpoint } from './types';

/**
 * A scale of size values used for consistent sizing across the application.
 * Each number represents a size unit that can be used for width, height, or both.
 */
const sizeScale = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48,
  52, 56, 60, 64, 72, 80, 96,
] as const;

/** Type representing a single value from the sizeScale array */
type SizeScale = (typeof sizeScale)[number];

/** Type representing dimension keys (width or height) */
type Sizes = 'w' | 'h';

/** Type representing size options (min or max) */
type SizeOption = 'min' | 'max';

/** Type for values that can be responsive across breakpoints */
type WithBreakpoint<T> = Partial<Record<Breakpoint, T>> &
  Record<Extract<Breakpoint, 'xs'>, T>;

/** Type for rectangular dimensions with width and height */
type Rect = Record<Sizes, SizeScale>;
/** Type for square dimensions (same width and height) */
type Square = SizeScale;
/** Type for responsive rectangular dimensions */
type RectWithBreakpoints = WithBreakpoint<Rect>;
/** Type for responsive square dimensions */
type SquareWithBreakpoints = WithBreakpoint<Square>;

/** Union type for all possible size configurations */
type Size = Square | Rect | RectWithBreakpoints | SquareWithBreakpoints;

/**
 * Generates CSS classes for a single size value at an optional breakpoint
 * @param value - The size value (square or rectangular)
 * @param breakpoint - Optional breakpoint for responsive sizing
 * @param option - Optional size option ('min' or 'max')
 * @returns A string of CSS classes for the given size configuration
 */
const getClassesForValue = ({
  value,
  breakpoint,
  option = 'min',
}: {
  value: Square | Rect;
  option?: SizeOption;
  breakpoint?: Breakpoint;
}): string => {
  const sizePrefix = option ? `${option}-` : '';
  const prefix = breakpoint && breakpoint !== 'xs' ? `${breakpoint}:` : '';

  if (typeof value === 'number') {
    return `${prefix}size-${value} ${prefix}${sizePrefix}w-${value} ${prefix}${sizePrefix}h-${value}`;
  } else {
    return `${prefix}w-${value.w} ${prefix}h-${value.h} ${prefix}${option}-w-${value.w} ${prefix}${option}-h-${value.h}`;
  }
};

/** Factor used to convert size units to pixels */
const scaleFactor = 4;

/**
 * Converts a size value to pixel dimensions
 * @param value - The size value (square or rectangular)
 * @returns An object containing width and height in pixels
 */
const getDimensions = (
  value: Square | Rect,
): { width: number; height: number } => {
  if (typeof value === 'number') {
    return { width: value * scaleFactor, height: value * scaleFactor };
  }
  return { width: value.w * scaleFactor, height: value.h * scaleFactor };
};

/** Array of available breakpoints for responsive sizing */
const breakpoints: Array<Breakpoint> = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
] as const;

/**
 * Generates CSS classes for a size configuration, handling both static and responsive sizes
 * @param size - The size configuration (can be static or responsive)
 * @param option - Optional size option ('min' or 'max')
 * @returns A string of CSS classes for the given size configuration
 */
const getSizeClasses = (size: Size, option?: SizeOption): string => {
  if (
    typeof size === 'number' ||
    ('w' in size && 'h' in size && !('xs' in size))
  ) {
    return getClassesForValue({ value: size as Square | Rect, option });
  }

  const classes: string[] = [];

  const rem = size as RectWithBreakpoints | SquareWithBreakpoints;

  for (const bp of breakpoints) {
    if (rem[bp]) {
      classes.push(
        getClassesForValue({ value: rem[bp], breakpoint: bp, option }),
      );
    }
  }
  return classes.join(' ');
};

/**
 * Calculates the maximum dimensions for a responsive size configuration
 * @param size - The size configuration (can be static or responsive)
 * @returns An object containing the maximum width and height in pixels
 */
const getSize = (size: Size): { width: number; height: number } => {
  if (
    typeof size === 'number' ||
    ('w' in size && 'h' in size && !('xs' in size))
  ) {
    return getDimensions(size as Square | Rect);
  }

  let maxWidth = 0;
  let maxHeight = 0;
  const rem = size as RectWithBreakpoints | SquareWithBreakpoints;

  for (const bp of breakpoints) {
    if (rem[bp]) {
      const dims = getDimensions(rem[bp]);
      maxWidth = Math.max(maxWidth, dims.width);
      maxHeight = Math.max(maxHeight, dims.height);
    }
  }

  return { width: maxWidth, height: maxHeight };
};

// Base size objects to avoid duplication

export {
  breakpoints,
  getSize,
  getSizeClasses,
  type Size,
  type SizeScale,
  sizeScale,
};
