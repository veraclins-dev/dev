import { type Period } from '@veraclins-dev/utils';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Value = string | number;

// Define constants for time values
const HOURS_12 = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, '0'),
);

const HOURS_24 = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, '0'),
);

const MINUTES = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, '0'),
);

const SECONDS = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, '0'),
);

const PERIODS: Period[] = ['AM', 'PM'];

const SIZES: Record<Size, string> = {
  sm: 'h-48 text-sm',
  md: 'h-64 text-base',
  lg: 'h-72 text-lg',
  xl: 'h-80 text-xl',
};

const DIAL_CONTAINER_PADDING: Record<Size, string> = {
  sm: 'py-24',
  md: 'py-32',
  lg: 'py-36',
  xl: 'py-40',
};

const DIAL_ITEM_PADDING: Record<Size, string> = {
  sm: 'py-1 px-2',
  md: 'py-2 px-4',
  lg: 'py-3 px-6',
  xl: 'py-4 px-8',
};

const NOW_BUTTON_CLASSES: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
};

export {
  DIAL_CONTAINER_PADDING,
  DIAL_ITEM_PADDING,
  HOURS_12,
  HOURS_24,
  MINUTES,
  NOW_BUTTON_CLASSES,
  PERIODS,
  SECONDS,
  SIZES,
};

export type { Size, Value };
