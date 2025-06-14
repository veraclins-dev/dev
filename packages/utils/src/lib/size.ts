import { type Breakpoint } from './types';

const sizeScale = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56,
  60, 64, 72, 80, 96,
] as const;

type SizeScale = (typeof sizeScale)[number];

type Sizes = 'w' | 'h';

type SizeOption = 'min' | 'max';

type WithBreakpoint<T> = Partial<Record<Breakpoint, T>> &
  Record<Extract<Breakpoint, 'xs'>, T>;

type Rect = Record<Sizes, SizeScale>;
type Square = SizeScale;
type RectWithBreakpoints = WithBreakpoint<Rect>;
type SquareWithBreakpoints = WithBreakpoint<Square>;

type Size = Square | Rect | RectWithBreakpoints | SquareWithBreakpoints;

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

const scaleFactor = 4;

const getDimensions = (
  value: Square | Rect,
): { width: number; height: number } => {
  if (typeof value === 'number') {
    return { width: value * scaleFactor, height: value * scaleFactor };
  }
  return { width: value.w * scaleFactor, height: value.h * scaleFactor };
};

const breakpoints: Array<Breakpoint> = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
] as const;

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

export {
  breakpoints,
  getSize,
  getSizeClasses,
  type Size,
  type SizeScale,
  sizeScale,
};
