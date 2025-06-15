import { type Breakpoint } from './types';

/**
 * A scale of size values used for consistent sizing across the application.
 * Each number represents a size unit that can be used for width, height, or both.
 */
const sizeScale = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56,
  60, 64, 72, 80, 96,
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

/*
  All Tailwind size (size-), width (w-), height (h-), min-width (min-w-), min-height (min-h-),
  max-width (max-w-), and max-height (max-h-) classes based on sizeScale,
  including responsive variants for each breakpoint.

  Base classes (no breakpoint):
  size-4 size-5 size-6 size-7 size-8 size-9 size-10 size-11 size-12 size-14 size-16 size-20 size-24 size-28 size-32 size-36 size-40 size-44 size-48 size-52 size-56 size-60 size-64 size-72 size-80 size-96
  w-4 w-5 w-6 w-7 w-8 w-9 w-10 w-11 w-12 w-14 w-16 w-20 w-24 w-28 w-32 w-36 w-40 w-44 w-48 w-52 w-56 w-60 w-64 w-72 w-80 w-96
  h-4 h-5 h-6 h-7 h-8 h-9 h-10 h-11 h-12 h-14 h-16 h-20 h-24 h-28 h-32 h-36 h-40 h-44 h-48 h-52 h-56 h-60 h-64 h-72 h-80 h-96
  min-w-4 min-w-5 min-w-6 min-w-7 min-w-8 min-w-9 min-w-10 min-w-11 min-w-12 min-w-14 min-w-16 min-w-20 min-w-24 min-w-28 min-w-32 min-w-36 min-w-40 min-w-44 min-w-48 min-w-52 min-w-56 min-w-60 min-w-64 min-w-72 min-w-80 min-w-96
  min-h-4 min-h-5 min-h-6 min-h-7 min-h-8 min-h-9 min-h-10 min-h-11 min-h-12 min-h-14 min-h-16 min-h-20 min-h-24 min-h-28 min-h-32 min-h-36 min-h-40 min-h-44 min-h-48 min-h-52 min-h-56 min-h-60 min-h-64 min-h-72 min-h-80 min-h-96
  max-w-4 max-w-5 max-w-6 max-w-7 max-w-8 max-w-9 max-w-10 max-w-11 max-w-12 max-w-14 max-w-16 max-w-20 max-w-24 max-w-28 max-w-32 max-w-36 max-w-40 max-w-44 max-w-48 max-w-52 max-w-56 max-w-60 max-w-64 max-w-72 max-w-80 max-w-96
  max-h-4 max-h-5 max-h-6 max-h-7 max-h-8 max-h-9 max-h-10 max-h-11 max-h-12 max-h-14 max-h-16 max-h-20 max-h-24 max-h-28 max-h-32 max-h-36 max-h-40 max-h-44 max-h-48 max-h-52 max-h-56 max-h-60 max-h-64 max-h-72 max-h-80 max-h-96

  xs breakpoint:
  xs:size-4 xs:size-5 xs:size-6 xs:size-7 xs:size-8 xs:size-9 xs:size-10 xs:size-11 xs:size-12 xs:size-14 xs:size-16 xs:size-20 xs:size-24 xs:size-28 xs:size-32 xs:size-36 xs:size-40 xs:size-44 xs:size-48 xs:size-52 xs:size-56 xs:size-60 xs:size-64 xs:size-72 xs:size-80 xs:size-96
  xs:w-4 xs:w-5 xs:w-6 xs:w-7 xs:w-8 xs:w-9 xs:w-10 xs:w-11 xs:w-12 xs:w-14 xs:w-16 xs:w-20 xs:w-24 xs:w-28 xs:w-32 xs:w-36 xs:w-40 xs:w-44 xs:w-48 xs:w-52 xs:w-56 xs:w-60 xs:w-64 xs:w-72 xs:w-80 xs:w-96
  xs:h-4 xs:h-5 xs:h-6 xs:h-7 xs:h-8 xs:h-9 xs:h-10 xs:h-11 xs:h-12 xs:h-14 xs:h-16 xs:h-20 xs:h-24 xs:h-28 xs:h-32 xs:h-36 xs:h-40 xs:h-44 xs:h-48 xs:h-52 xs:h-56 xs:h-60 xs:h-64 xs:h-72 xs:h-80 xs:h-96
  xs:min-w-4 xs:min-w-5 xs:min-w-6 xs:min-w-7 xs:min-w-8 xs:min-w-9 xs:min-w-10 xs:min-w-11 xs:min-w-12 xs:min-w-14 xs:min-w-16 xs:min-w-20 xs:min-w-24 xs:min-w-28 xs:min-w-32 xs:min-w-36 xs:min-w-40 xs:min-w-44 xs:min-w-48 xs:min-w-52 xs:min-w-56 xs:min-w-60 xs:min-w-64 xs:min-w-72 xs:min-w-80 xs:min-w-96
  xs:min-h-4 xs:min-h-5 xs:min-h-6 xs:min-h-7 xs:min-h-8 xs:min-h-9 xs:min-h-10 xs:min-h-11 xs:min-h-12 xs:min-h-14 xs:min-h-16 xs:min-h-20 xs:min-h-24 xs:min-h-28 xs:min-h-32 xs:min-h-36 xs:min-h-40 xs:min-h-44 xs:min-h-48 xs:min-h-52 xs:min-h-56 xs:min-h-60 xs:min-h-64 xs:min-h-72 xs:min-h-80 xs:min-h-96
  xs:max-w-4 xs:max-w-5 xs:max-w-6 xs:max-w-7 xs:max-w-8 xs:max-w-9 xs:max-w-10 xs:max-w-11 xs:max-w-12 xs:max-w-14 xs:max-w-16 xs:max-w-20 xs:max-w-24 xs:max-w-28 xs:max-w-32 xs:max-w-36 xs:max-w-40 xs:max-w-44 xs:max-w-48 xs:max-w-52 xs:max-w-56 xs:max-w-60 xs:max-w-64 xs:max-w-72 xs:max-w-80 xs:max-w-96
  xs:max-h-4 xs:max-h-5 xs:max-h-6 xs:max-h-7 xs:max-h-8 xs:max-h-9 xs:max-h-10 xs:max-h-11 xs:max-h-12 xs:max-h-14 xs:max-h-16 xs:max-h-20 xs:max-h-24 xs:max-h-28 xs:max-h-32 xs:max-h-36 xs:max-h-40 xs:max-h-44 xs:max-h-48 xs:max-h-52 xs:max-h-56 xs:max-h-60 xs:max-h-64 xs:max-h-72 xs:max-h-80 xs:max-h-96

  sm breakpoint:
  sm:size-4 sm:size-5 sm:size-6 sm:size-7 sm:size-8 sm:size-9 sm:size-10 sm:size-11 sm:size-12 sm:size-14 sm:size-16 sm:size-20 sm:size-24 sm:size-28 sm:size-32 sm:size-36 sm:size-40 sm:size-44 sm:size-48 sm:size-52 sm:size-56 sm:size-60 sm:size-64 sm:size-72 sm:size-80 sm:size-96
  sm:w-4 sm:w-5 sm:w-6 sm:w-7 sm:w-8 sm:w-9 sm:w-10 sm:w-11 sm:w-12 sm:w-14 sm:w-16 sm:w-20 sm:w-24 sm:w-28 sm:w-32 sm:w-36 sm:w-40 sm:w-44 sm:w-48 sm:w-52 sm:w-56 sm:w-60 sm:w-64 sm:w-72 sm:w-80 sm:w-96
  sm:h-4 sm:h-5 sm:h-6 sm:h-7 sm:h-8 sm:h-9 sm:h-10 sm:h-11 sm:h-12 sm:h-14 sm:h-16 sm:h-20 sm:h-24 sm:h-28 sm:h-32 sm:h-36 sm:h-40 sm:h-44 sm:h-48 sm:h-52 sm:h-56 sm:h-60 sm:h-64 sm:h-72 sm:h-80 sm:h-96
  sm:min-w-4 sm:min-w-5 sm:min-w-6 sm:min-w-7 sm:min-w-8 sm:min-w-9 sm:min-w-10 sm:min-w-11 sm:min-w-12 sm:min-w-14 sm:min-w-16 sm:min-w-20 sm:min-w-24 sm:min-w-28 sm:min-w-32 sm:min-w-36 sm:min-w-40 sm:min-w-44 sm:min-w-48 sm:min-w-52 sm:min-w-56 sm:min-w-60 sm:min-w-64 sm:min-w-72 sm:min-w-80 sm:min-w-96
  sm:min-h-4 sm:min-h-5 sm:min-h-6 sm:min-h-7 sm:min-h-8 sm:min-h-9 sm:min-h-10 sm:min-h-11 sm:min-h-12 sm:min-h-14 sm:min-h-16 sm:min-h-20 sm:min-h-24 sm:min-h-28 sm:min-h-32 sm:min-h-36 sm:min-h-40 sm:min-h-44 sm:min-h-48 sm:min-h-52 sm:min-h-56 sm:min-h-60 sm:min-h-64 sm:min-h-72 sm:min-h-80 sm:min-h-96
  sm:max-w-4 sm:max-w-5 sm:max-w-6 sm:max-w-7 sm:max-w-8 sm:max-w-9 sm:max-w-10 sm:max-w-11 sm:max-w-12 sm:max-w-14 sm:max-w-16 sm:max-w-20 sm:max-w-24 sm:max-w-28 sm:max-w-32 sm:max-w-36 sm:max-w-40 sm:max-w-44 sm:max-w-48 sm:max-w-52 sm:max-w-56 sm:max-w-60 sm:max-w-64 sm:max-w-72 sm:max-w-80 sm:max-w-96
  sm:max-h-4 sm:max-h-5 sm:max-h-6 sm:max-h-7 sm:max-h-8 sm:max-h-9 sm:max-h-10 sm:max-h-11 sm:max-h-12 sm:max-h-14 sm:max-h-16 sm:max-h-20 sm:max-h-24 sm:max-h-28 sm:max-h-32 sm:max-h-36 sm:max-h-40 sm:max-h-44 sm:max-h-48 sm:max-h-52 sm:max-h-56 sm:max-h-60 sm:max-h-64 sm:max-h-72 sm:max-h-80 sm:max-h-96

  md breakpoint:
  md:size-4 md:size-5 md:size-6 md:size-7 md:size-8 md:size-9 md:size-10 md:size-11 md:size-12 md:size-14 md:size-16 md:size-20 md:size-24 md:size-28 md:size-32 md:size-36 md:size-40 md:size-44 md:size-48 md:size-52 md:size-56 md:size-60 md:size-64 md:size-72 md:size-80 md:size-96
  md:w-4 md:w-5 md:w-6 md:w-7 md:w-8 md:w-9 md:w-10 md:w-11 md:w-12 md:w-14 md:w-16 md:w-20 md:w-24 md:w-28 md:w-32 md:w-36 md:w-40 md:w-44 md:w-48 md:w-52 md:w-56 md:w-60 md:w-64 md:w-72 md:w-80 md:w-96
  md:h-4 md:h-5 md:h-6 md:h-7 md:h-8 md:h-9 md:h-10 md:h-11 md:h-12 md:h-14 md:h-16 md:h-20 md:h-24 md:h-28 md:h-32 md:h-36 md:h-40 md:h-44 md:h-48 md:h-52 md:h-56 md:h-60 md:h-64 md:h-72 md:h-80 md:h-96
  md:min-w-4 md:min-w-5 md:min-w-6 md:min-w-7 md:min-w-8 md:min-w-9 md:min-w-10 md:min-w-11 md:min-w-12 md:min-w-14 md:min-w-16 md:min-w-20 md:min-w-24 md:min-w-28 md:min-w-32 md:min-w-36 md:min-w-40 md:min-w-44 md:min-w-48 md:min-w-52 md:min-w-56 md:min-w-60 md:min-w-64 md:min-w-72 md:min-w-80 md:min-w-96
  md:min-h-4 md:min-h-5 md:min-h-6 md:min-h-7 md:min-h-8 md:min-h-9 md:min-h-10 md:min-h-11 md:min-h-12 md:min-h-14 md:min-h-16 md:min-h-20 md:min-h-24 md:min-h-28 md:min-h-32 md:min-h-36 md:min-h-40 md:min-h-44 md:min-h-48 md:min-h-52 md:min-h-56 md:min-h-60 md:min-h-64 md:min-h-72 md:min-h-80 md:min-h-96
  md:max-w-4 md:max-w-5 md:max-w-6 md:max-w-7 md:max-w-8 md:max-w-9 md:max-w-10 md:max-w-11 md:max-w-12 md:max-w-14 md:max-w-16 md:max-w-20 md:max-w-24 md:max-w-28 md:max-w-32 md:max-w-36 md:max-w-40 md:max-w-44 md:max-w-48 md:max-w-52 md:max-w-56 md:max-w-60 md:max-w-64 md:max-w-72 md:max-w-80 md:max-w-96
  md:max-h-4 md:max-h-5 md:max-h-6 md:max-h-7 md:max-h-8 md:max-h-9 md:max-h-10 md:max-h-11 md:max-h-12 md:max-h-14 md:max-h-16 md:max-h-20 md:max-h-24 md:max-h-28 md:max-h-32 md:max-h-36 md:max-h-40 md:max-h-44 md:max-h-48 md:max-h-52 md:max-h-56 md:max-h-60 md:max-h-64 md:max-h-72 md:max-h-80 md:max-h-96

  lg breakpoint:
  lg:size-4 lg:size-5 lg:size-6 lg:size-7 lg:size-8 lg:size-9 lg:size-10 lg:size-11 lg:size-12 lg:size-14 lg:size-16 lg:size-20 lg:size-24 lg:size-28 lg:size-32 lg:size-36 lg:size-40 lg:size-44 lg:size-48 lg:size-52 lg:size-56 lg:size-60 lg:size-64 lg:size-72 lg:size-80 lg:size-96
  lg:w-4 lg:w-5 lg:w-6 lg:w-7 lg:w-8 lg:w-9 lg:w-10 lg:w-11 lg:w-12 lg:w-14 lg:w-16 lg:w-20 lg:w-24 lg:w-28 lg:w-32 lg:w-36 lg:w-40 lg:w-44 lg:w-48 lg:w-52 lg:w-56 lg:w-60 lg:w-64 lg:w-72 lg:w-80 lg:w-96
  lg:h-4 lg:h-5 lg:h-6 lg:h-7 lg:h-8 lg:h-9 lg:h-10 lg:h-11 lg:h-12 lg:h-14 lg:h-16 lg:h-20 lg:h-24 lg:h-28 lg:h-32 lg:h-36 lg:h-40 lg:h-44 lg:h-48 lg:h-52 lg:h-56 lg:h-60 lg:h-64 lg:h-72 lg:h-80 lg:h-96
  lg:min-w-4 lg:min-w-5 lg:min-w-6 lg:min-w-7 lg:min-w-8 lg:min-w-9 lg:min-w-10 lg:min-w-11 lg:min-w-12 lg:min-w-14 lg:min-w-16 lg:min-w-20 lg:min-w-24 lg:min-w-28 lg:min-w-32 lg:min-w-36 lg:min-w-40 lg:min-w-44 lg:min-w-48 lg:min-w-52 lg:min-w-56 lg:min-w-60 lg:min-w-64 lg:min-w-72 lg:min-w-80 lg:min-w-96
  lg:min-h-4 lg:min-h-5 lg:min-h-6 lg:min-h-7 lg:min-h-8 lg:min-h-9 lg:min-h-10 lg:min-h-11 lg:min-h-12 lg:min-h-14 lg:min-h-16 lg:min-h-20 lg:min-h-24 lg:min-h-28 lg:min-h-32 lg:min-h-36 lg:min-h-40 lg:min-h-44 lg:min-h-48 lg:min-h-52 lg:min-h-56 lg:min-h-60 lg:min-h-64 lg:min-h-72 lg:min-h-80 lg:min-h-96
  lg:max-w-4 lg:max-w-5 lg:max-w-6 lg:max-w-7 lg:max-w-8 lg:max-w-9 lg:max-w-10 lg:max-w-11 lg:max-w-12 lg:max-w-14 lg:max-w-16 lg:max-w-20 lg:max-w-24 lg:max-w-28 lg:max-w-32 lg:max-w-36 lg:max-w-40 lg:max-w-44 lg:max-w-48 lg:max-w-52 lg:max-w-56 lg:max-w-60 lg:max-w-64 lg:max-w-72 lg:max-w-80 lg:max-w-96
  lg:max-h-4 lg:max-h-5 lg:max-h-6 lg:max-h-7 lg:max-h-8 lg:max-h-9 lg:max-h-10 lg:max-h-11 lg:max-h-12 lg:max-h-14 lg:max-h-16 lg:max-h-20 lg:max-h-24 lg:max-h-28 lg:max-h-32 lg:max-h-36 lg:max-h-40 lg:max-h-44 lg:max-h-48 lg:max-h-52 lg:max-h-56 lg:max-h-60 lg:max-h-64 lg:max-h-72 lg:max-h-80 lg:max-h-96

  xl breakpoint:
  xl:size-4 xl:size-5 xl:size-6 xl:size-7 xl:size-8 xl:size-9 xl:size-10 xl:size-11 xl:size-12 xl:size-14 xl:size-16 xl:size-20 xl:size-24 xl:size-28 xl:size-32 xl:size-36 xl:size-40 xl:size-44 xl:size-48 xl:size-52 xl:size-56 xl:size-60 xl:size-64 xl:size-72 xl:size-80 xl:size-96
  xl:w-4 xl:w-5 xl:w-6 xl:w-7 xl:w-8 xl:w-9 xl:w-10 xl:w-11 xl:w-12 xl:w-14 xl:w-16 xl:w-20 xl:w-24 xl:w-28 xl:w-32 xl:w-36 xl:w-40 xl:w-44 xl:w-48 xl:w-52 xl:w-56 xl:w-60 xl:w-64 xl:w-72 xl:w-80 xl:w-96
  xl:h-4 xl:h-5 xl:h-6 xl:h-7 xl:h-8 xl:h-9 xl:h-10 xl:h-11 xl:h-12 xl:h-14 xl:h-16 xl:h-20 xl:h-24 xl:h-28 xl:h-32 xl:h-36 xl:h-40 xl:h-44 xl:h-48 xl:h-52 xl:h-56 xl:h-60 xl:h-64 xl:h-72 xl:h-80 xl:h-96
  xl:min-w-4 xl:min-w-5 xl:min-w-6 xl:min-w-7 xl:min-w-8 xl:min-w-9 xl:min-w-10 xl:min-w-11 xl:min-w-12 xl:min-w-14 xl:min-w-16 xl:min-w-20 xl:min-w-24 xl:min-w-28 xl:min-w-32 xl:min-w-36 xl:min-w-40 xl:min-w-44 xl:min-w-48 xl:min-w-52 xl:min-w-56 xl:min-w-60 xl:min-w-64 xl:min-w-72 xl:min-w-80 xl:min-w-96
  xl:min-h-4 xl:min-h-5 xl:min-h-6 xl:min-h-7 xl:min-h-8 xl:min-h-9 xl:min-h-10 xl:min-h-11 xl:min-h-12 xl:min-h-14 xl:min-h-16 xl:min-h-20 xl:min-h-24 xl:min-h-28 xl:min-h-32 xl:min-h-36 xl:min-h-40 xl:min-h-44 xl:min-h-48 xl:min-h-52 xl:min-h-56 xl:min-h-60 xl:min-h-64 xl:min-h-72 xl:min-h-80 xl:min-h-96
  xl:max-w-4 xl:max-w-5 xl:max-w-6 xl:max-w-7 xl:max-w-8 xl:max-w-9 xl:max-w-10 xl:max-w-11 xl:max-w-12 xl:max-w-14 xl:max-w-16 xl:max-w-20 xl:max-w-24 xl:max-w-28 xl:max-w-32 xl:max-w-36 xl:max-w-40 xl:max-w-44 xl:max-w-48 xl:max-w-52 xl:max-w-56 xl:max-w-60 xl:max-w-64 xl:max-w-72 xl:max-w-80 xl:max-w-96
  xl:max-h-4 xl:max-h-5 xl:max-h-6 xl:max-h-7 xl:max-h-8 xl:max-h-9 xl:max-h-10 xl:max-h-11 xl:max-h-12 xl:max-h-14 xl:max-h-16 xl:max-h-20 xl:max-h-24 xl:max-h-28 xl:max-h-32 xl:max-h-36 xl:max-h-40 xl:max-h-44 xl:max-h-48 xl:max-h-52 xl:max-h-56 xl:max-h-60 xl:max-h-64 xl:max-h-72 xl:max-h-80 xl:max-h-96

  2xl breakpoint:
  2xl:size-4 2xl:size-5 2xl:size-6 2xl:size-7 2xl:size-8 2xl:size-9 2xl:size-10 2xl:size-11 2xl:size-12 2xl:size-14 2xl:size-16 2xl:size-20 2xl:size-24 2xl:size-28 2xl:size-32 2xl:size-36 2xl:size-40 2xl:size-44 2xl:size-48 2xl:size-52 2xl:size-56 2xl:size-60 2xl:size-64 2xl:size-72 2xl:size-80 2xl:size-96
  2xl:w-4 2xl:w-5 2xl:w-6 2xl:w-7 2xl:w-8 2xl:w-9 2xl:w-10 2xl:w-11 2xl:w-12 2xl:w-14 2xl:w-16 2xl:w-20 2xl:w-24 2xl:w-28 2xl:w-32 2xl:w-36 2xl:w-40 2xl:w-44 2xl:w-48 2xl:w-52 2xl:w-56 2xl:w-60 2xl:w-64 2xl:w-72 2xl:w-80 2xl:w-96
  2xl:h-4 2xl:h-5 2xl:h-6 2xl:h-7 2xl:h-8 2xl:h-9 2xl:h-10 2xl:h-11 2xl:h-12 2xl:h-14 2xl:h-16 2xl:h-20 2xl:h-24 2xl:h-28 2xl:h-32 2xl:h-36 2xl:h-40 2xl:h-44 2xl:h-48 2xl:h-52 2xl:h-56 2xl:h-60 2xl:h-64 2xl:h-72 2xl:h-80 2xl:h-96
  2xl:min-w-4 2xl:min-w-5 2xl:min-w-6 2xl:min-w-7 2xl:min-w-8 2xl:min-w-9 2xl:min-w-10 2xl:min-w-11 2xl:min-w-12 2xl:min-w-14 2xl:min-w-16 2xl:min-w-20 2xl:min-w-24 2xl:min-w-28 2xl:min-w-32 2xl:min-w-36 2xl:min-w-40 2xl:min-w-44 2xl:min-w-48 2xl:min-w-52 2xl:min-w-56 2xl:min-w-60 2xl:min-w-64 2xl:min-w-72 2xl:min-w-80 2xl:min-w-96
  2xl:min-h-4 2xl:min-h-5 2xl:min-h-6 2xl:min-h-7 2xl:min-h-8 2xl:min-h-9 2xl:min-h-10 2xl:min-h-11 2xl:min-h-12 2xl:min-h-14 2xl:min-h-16 2xl:min-h-20 2xl:min-h-24 2xl:min-h-28 2xl:min-h-32 2xl:min-h-36 2xl:min-h-40 2xl:min-h-44 2xl:min-h-48 2xl:min-h-52 2xl:min-h-56 2xl:min-h-60 2xl:min-h-64 2xl:min-h-72 2xl:min-h-80 2xl:min-h-96
  2xl:max-w-4 2xl:max-w-5 2xl:max-w-6 2xl:max-w-7 2xl:max-w-8 2xl:max-w-9 2xl:max-w-10 2xl:max-w-11 2xl:max-w-12 2xl:max-w-14 2xl:max-w-16 2xl:max-w-20 2xl:max-w-24 2xl:max-w-28 2xl:max-w-32 2xl:max-w-36 2xl:max-w-40 2xl:max-w-44 2xl:max-w-48 2xl:max-w-52 2xl:max-w-56 2xl:max-w-60 2xl:max-w-64 2xl:max-w-72 2xl:max-w-80 2xl:max-w-96
  2xl:max-h-4 2xl:max-h-5 2xl:max-h-6 2xl:max-h-7 2xl:max-h-8 2xl:max-h-9 2xl:max-h-10 2xl:max-h-11 2xl:max-h-12 2xl:max-h-14 2xl:max-h-16 2xl:max-h-20 2xl:max-h-24 2xl:max-h-28 2xl:max-h-32 2xl:max-h-36 2xl:max-h-40 2xl:max-h-44 2xl:max-h-48 2xl:max-h-52 2xl:max-h-56 2xl:max-h-60 2xl:max-h-64 2xl:max-h-72 2xl:max-h-80 2xl:max-h-96
*/

export {
  breakpoints,
  getSize,
  getSizeClasses,
  type Size,
  type SizeScale,
  sizeScale,
};
