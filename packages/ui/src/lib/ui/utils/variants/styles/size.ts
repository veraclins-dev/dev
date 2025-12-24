import { sizeScale } from '@veraclins-dev/utils';

type SizeType = 'size' | 'w' | 'h' | 'min-w' | 'min-h' | 'max-w' | 'max-h';

const extendedSizeScale = [
  ...sizeScale,
  'full',
  'auto',
  'fit',
  'min',
  'max',
  'dvh',
  'dvw',
  'lvw',
  'lvh',
  'svh',
  'svw',
] as const;

const widthScale = [
  ...extendedSizeScale,
  'screen',
  '3xs',
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
] as const;

const heightScale = [...extendedSizeScale, 'screen'] as const;

type ExtendedSizeScale = (typeof extendedSizeScale)[number];

type HeightScale = (typeof heightScale)[number];

type MaxHeightScale = HeightScale | 'none';

type WidthScale = (typeof widthScale)[number];

type MaxWidthScale = WidthScale | 'none';

type SizeValue = Record<ExtendedSizeScale, `${SizeType}-${ExtendedSizeScale}`>;

type WidthValue = Record<WidthScale, `${SizeType}-${WidthScale}`>;

type HeightValue = Record<HeightScale, `${SizeType}-${HeightScale}`>;

type MaxHeightValue = Record<MaxHeightScale, `${SizeType}-${MaxHeightScale}`>;

type MaxWidthValue = Record<MaxWidthScale, `${SizeType}-${MaxWidthScale}`>;

type SizeVariant<T extends SizeType> = T extends 'size'
  ? SizeValue
  : T extends 'w'
    ? WidthValue
    : T extends 'h'
      ? HeightValue
      : T extends 'min-w'
        ? WidthValue
        : T extends 'min-h'
          ? HeightValue
          : T extends 'max-w'
            ? MaxWidthValue
            : T extends 'max-h'
              ? MaxHeightValue
              : never;

const scales = {
  size: extendedSizeScale,
  h: heightScale,
  w: widthScale,
  'min-w': widthScale,
  'min-h': heightScale,
  'max-w': [...widthScale, 'none'],
  'max-h': [...heightScale, 'none'],
} as const;

function generateSizeVariants<T extends SizeType>(sizeType: T): SizeVariant<T> {
  return [...scales[sizeType]].reduce((acc, scale) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is a valid use case
    (acc as any)[scale] = `${sizeType}-${scale}`;
    return acc;
  }, {} as SizeVariant<T>);
}

const sizeVariants = {
  size: generateSizeVariants('size'),
  w: generateSizeVariants('w'),
  h: generateSizeVariants('h'),
  width: generateSizeVariants('w'),
  height: generateSizeVariants('h'),
  minW: generateSizeVariants('min-w'),
  minH: generateSizeVariants('min-h'),
  minWidth: generateSizeVariants('min-w'),
  minHeight: generateSizeVariants('min-h'),
  maxW: generateSizeVariants('max-w'),
  maxH: generateSizeVariants('max-h'),
  maxWidth: generateSizeVariants('max-w'),
  maxHeight: generateSizeVariants('max-h'),
} as const;

type SizeVariants = typeof sizeVariants;

export {
  type ExtendedSizeScale,
  extendedSizeScale,
  type HeightScale,
  heightScale,
  type MaxHeightScale,
  type MaxWidthScale,
  type SizeVariants,
  sizeVariants,
  type WidthScale,
  widthScale,
};

/*!
// Base size variants
size-0 size-1 size-2 size-3 size-4 size-5 size-6 size-7 size-8 size-9 size-10 size-11 size-12 size-14 size-16 size-20 size-24 size-28 size-32 size-36 size-40 size-44 size-48 size-52 size-56 size-60 size-64 size-72 size-80 size-96 size-full size-auto size-fit size-min size-max size-dvh size-dvw size-lvw size-lvh size-svh size-svw

w-0 w-1 w-2 w-3 w-4 w-5 w-6 w-7 w-8 w-9 w-10 w-11 w-12 w-14 w-16 w-20 w-24 w-28 w-32 w-36 w-40 w-44 w-48 w-52 w-56 w-60 w-64 w-72 w-80 w-96 w-full w-auto w-fit w-min w-max w-dvh w-dvw w-lvw w-lvh w-svh w-svw w-screen w-3xs w-2xs w-xs w-sm w-md w-lg w-xl w-2xl w-3xl w-4xl w-5xl w-6xl w-7xl
min-w-0 min-w-1 min-w-2 min-w-3 min-w-4 min-w-5 min-w-6 min-w-7 min-w-8 min-w-9 min-w-10 min-w-11 min-w-12 min-w-14 min-w-16 min-w-20 min-w-24 min-w-28 min-w-32 min-w-36 min-w-40 min-w-44 min-w-48 min-w-52 min-w-56 min-w-60 min-w-64 min-w-72 min-w-80 min-w-96 min-w-full min-w-auto min-w-fit min-w-min min-w-max min-w-dvh min-w-dvw min-w-lvw min-w-lvh min-w-svh min-w-svw min-w-screen min-w-3xs min-w-2xs min-w-xs min-w-sm min-w-md min-w-lg min-w-xl min-w-2xl min-w-3xl min-w-4xl min-w-5xl min-w-6xl min-w-7xl
max-w-0 max-w-1 max-w-2 max-w-3 max-w-4 max-w-5 max-w-6 max-w-7 max-w-8 max-w-9 max-w-10 max-w-11 max-w-12 max-w-14 max-w-16 max-w-20 max-w-24 max-w-28 max-w-32 max-w-36 max-w-40 max-w-44 max-w-48 max-w-52 max-w-56 max-w-60 max-w-64 max-w-72 max-w-80 max-w-96 max-w-full max-w-auto max-w-fit max-w-min max-w-max max-w-dvh max-w-dvw max-w-lvw max-w-lvh max-w-svh max-w-svw max-w-screen max-w-3xs max-w-2xs max-w-xs max-w-sm max-w-md max-w-lg max-w-xl max-w-2xl max-w-3xl max-w-4xl max-w-5xl max-w-6xl max-w-7xl max-w-none

h-0 h-1 h-2 h-3 h-4 h-5 h-6 h-7 h-8 h-9 h-10 h-11 h-12 h-14 h-16 h-20 h-24 h-28 h-32 h-36 h-40 h-44 h-48 h-52 h-56 h-60 h-64 h-72 h-80 h-96 h-full h-auto h-fit h-min h-max h-dvh h-dvw h-lvw h-lvh h-svh h-svw h-screen
min-h-0 min-h-1 min-h-2 min-h-3 min-h-4 min-h-5 min-h-6 min-h-7 min-h-8 min-h-9 min-h-10 min-h-11 min-h-12 min-h-14 min-h-16 min-h-20 min-h-24 min-h-28 min-h-32 min-h-36 min-h-40 min-h-44 min-h-48 min-h-52 min-h-56 min-h-60 min-h-64 min-h-72 min-h-80 min-h-96 min-h-full min-h-auto min-h-fit min-h-min min-h-max min-h-dvh min-h-dvw min-h-lvw min-h-lvh min-h-svh min-h-svw min-h-screen
max-h-0 max-h-1 max-h-2 max-h-3 max-h-4 max-h-5 max-h-6 max-h-7 max-h-8 max-h-9 max-h-10 max-h-11 max-h-12 max-h-14 max-h-16 max-h-20 max-h-24 max-h-28 max-h-32 max-h-36 max-h-40 max-h-44 max-h-48 max-h-52 max-h-56 max-h-60 max-h-64 max-h-72 max-h-80 max-h-96 max-h-full max-h-auto max-h-fit max-h-min max-h-max max-h-dvh max-h-dvw max-h-lvw max-h-lvh max-h-svh max-h-svw max-h-screen max-h-none

// Responsive size variants
sm:size-0 sm:size-1 sm:size-2 sm:size-3 sm:size-4 sm:size-5 sm:size-6 sm:size-7 sm:size-8 sm:size-9 sm:size-10 sm:size-11 sm:size-12 sm:size-14 sm:size-16 sm:size-20 sm:size-24 sm:size-28 sm:size-32 sm:size-36 sm:size-40 sm:size-44 sm:size-48 sm:size-52 sm:size-56 sm:size-60 sm:size-64 sm:size-72 sm:size-80 sm:size-96 sm:size-full sm:size-auto sm:size-fit sm:size-min sm:size-max sm:size-dvh sm:size-dvw sm:size-lvw sm:size-lvh sm:size-svh sm:size-svw
sm:w-0 sm:w-1 sm:w-2 sm:w-3 sm:w-4 sm:w-5 sm:w-6 sm:w-7 sm:w-8 sm:w-9 sm:w-10 sm:w-11 sm:w-12 sm:w-14 sm:w-16 sm:w-20 sm:w-24 sm:w-28 sm:w-32 sm:w-36 sm:w-40 sm:w-44 sm:w-48 sm:w-52 sm:w-56 sm:w-60 sm:w-64 sm:w-72 sm:w-80 sm:w-96 sm:w-full sm:w-auto sm:w-fit sm:w-min sm:w-max sm:w-dvh sm:w-dvw sm:w-lvw sm:w-lvh sm:w-svh sm:w-svw sm:w-screen sm:w-3xs sm:w-2xs sm:w-xs sm:w-sm sm:w-md sm:w-lg sm:w-xl sm:w-2xl sm:w-3xl sm:w-4xl sm:w-5xl sm:w-6xl sm:w-7xl
sm:h-0 sm:h-1 sm:h-2 sm:h-3 sm:h-4 sm:h-5 sm:h-6 sm:h-7 sm:h-8 sm:h-9 sm:h-10 sm:h-11 sm:h-12 sm:h-14 sm:h-16 sm:h-20 sm:h-24 sm:h-28 sm:h-32 sm:h-36 sm:h-40 sm:h-44 sm:h-48 sm:h-52 sm:h-56 sm:h-60 sm:h-64 sm:h-72 sm:h-80 sm:h-96 sm:h-full sm:h-auto sm:h-fit sm:h-min sm:h-max sm:h-dvh sm:h-dvw sm:h-lvw sm:h-lvh sm:h-svh sm:h-svw sm:h-screen
sm:min-w-0 sm:min-w-1 sm:min-w-2 sm:min-w-3 sm:min-w-4 sm:min-w-5 sm:min-w-6 sm:min-w-7 sm:min-w-8 sm:min-w-9 sm:min-w-10 sm:min-w-11 sm:min-w-12 sm:min-w-14 sm:min-w-16 sm:min-w-20 sm:min-w-24 sm:min-w-28 sm:min-w-32 sm:min-w-36 sm:min-w-40 sm:min-w-44 sm:min-w-48 sm:min-w-52 sm:min-w-56 sm:min-w-60 sm:min-w-64 sm:min-w-72 sm:min-w-80 sm:min-w-96 sm:min-w-full sm:min-w-auto sm:min-w-fit sm:min-w-min sm:min-w-max sm:min-w-dvh sm:min-w-dvw sm:min-w-lvw sm:min-w-lvh sm:min-w-svh sm:min-w-svw sm:min-w-screen sm:min-w-3xs sm:min-w-2xs sm:min-w-xs sm:min-w-sm sm:min-w-md sm:min-w-lg sm:min-w-xl sm:min-w-2xl sm:min-w-3xl sm:min-w-4xl sm:min-w-5xl sm:min-w-6xl sm:min-w-7xl
sm:min-h-0 sm:min-h-1 sm:min-h-2 sm:min-h-3 sm:min-h-4 sm:min-h-5 sm:min-h-6 sm:min-h-7 sm:min-h-8 sm:min-h-9 sm:min-h-10 sm:min-h-11 sm:min-h-12 sm:min-h-14 sm:min-h-16 sm:min-h-20 sm:min-h-24 sm:min-h-28 sm:min-h-32 sm:min-h-36 sm:min-h-40 sm:min-h-44 sm:min-h-48 sm:min-h-52 sm:min-h-56 sm:min-h-60 sm:min-h-64 sm:min-h-72 sm:min-h-80 sm:min-h-96 sm:min-h-full sm:min-h-auto sm:min-h-fit sm:min-h-min sm:min-h-max sm:min-h-dvh sm:min-h-dvw sm:min-h-lvw sm:min-h-lvh sm:min-h-svh sm:min-h-svw sm:min-h-screen
sm:max-w-0 sm:max-w-1 sm:max-w-2 sm:max-w-3 sm:max-w-4 sm:max-w-5 sm:max-w-6 sm:max-w-7 sm:max-w-8 sm:max-w-9 sm:max-w-10 sm:max-w-11 sm:max-w-12 sm:max-w-14 sm:max-w-16 sm:max-w-20 sm:max-w-24 sm:max-w-28 sm:max-w-32 sm:max-w-36 sm:max-w-40 sm:max-w-44 sm:max-w-48 sm:max-w-52 sm:max-w-56 sm:max-w-60 sm:max-w-64 sm:max-w-72 sm:max-w-80 sm:max-w-96 sm:max-w-full sm:max-w-auto sm:max-w-fit sm:max-w-min sm:max-w-max sm:max-w-dvh sm:max-w-dvw sm:max-w-lvw sm:max-w-lvh sm:max-w-svh sm:max-w-svw sm:max-w-screen sm:max-w-3xs sm:max-w-2xs sm:max-w-xs sm:max-w-sm sm:max-w-md sm:max-w-lg sm:max-w-xl sm:max-w-2xl sm:max-w-3xl sm:max-w-4xl sm:max-w-5xl sm:max-w-6xl sm:max-w-7xl sm:max-w-none
sm:max-h-0 sm:max-h-1 sm:max-h-2 sm:max-h-3 sm:max-h-4 sm:max-h-5 sm:max-h-6 sm:max-h-7 sm:max-h-8 sm:max-h-9 sm:max-h-10 sm:max-h-11 sm:max-h-12 sm:max-h-14 sm:max-h-16 sm:max-h-20 sm:max-h-24 sm:max-h-28 sm:max-h-32 sm:max-h-36 sm:max-h-40 sm:max-h-44 sm:max-h-48 sm:max-h-52 sm:max-h-56 sm:max-h-60 sm:max-h-64 sm:max-h-72 sm:max-h-80 sm:max-h-96 sm:max-h-full sm:max-h-auto sm:max-h-fit sm:max-h-min sm:max-h-max sm:max-h-dvh sm:max-h-dvw sm:max-h-lvw sm:max-h-lvh sm:max-h-svh sm:max-h-svw sm:max-h-screen sm:max-h-none

md:size-0 md:size-1 md:size-2 md:size-3 md:size-4 md:size-5 md:size-6 md:size-7 md:size-8 md:size-9 md:size-10 md:size-11 md:size-12 md:size-14 md:size-16 md:size-20 md:size-24 md:size-28 md:size-32 md:size-36 md:size-40 md:size-44 md:size-48 md:size-52 md:size-56 md:size-60 md:size-64 md:size-72 md:size-80 md:size-96 md:size-full md:size-auto md:size-fit md:size-min md:size-max md:size-dvh md:size-dvw md:size-lvw md:size-lvh md:size-svh md:size-svw
md:w-0 md:w-1 md:w-2 md:w-3 md:w-4 md:w-5 md:w-6 md:w-7 md:w-8 md:w-9 md:w-10 md:w-11 md:w-12 md:w-14 md:w-16 md:w-20 md:w-24 md:w-28 md:w-32 md:w-36 md:w-40 md:w-44 md:w-48 md:w-52 md:w-56 md:w-60 md:w-64 md:w-72 md:w-80 md:w-96 md:w-full md:w-auto md:w-fit md:w-min md:w-max md:w-dvh md:w-dvw md:w-lvw md:w-lvh md:w-svh md:w-svw md:w-screen md:w-3xs md:w-2xs md:w-xs md:w-sm md:w-md md:w-lg md:w-xl md:w-2xl md:w-3xl md:w-4xl md:w-5xl md:w-6xl md:w-7xl
md:h-0 md:h-1 md:h-2 md:h-3 md:h-4 md:h-5 md:h-6 md:h-7 md:h-8 md:h-9 md:h-10 md:h-11 md:h-12 md:h-14 md:h-16 md:h-20 md:h-24 md:h-28 md:h-32 md:h-36 md:h-40 md:h-44 md:h-48 md:h-52 md:h-56 md:h-60 md:h-64 md:h-72 md:h-80 md:h-96 md:h-full md:h-auto md:h-fit md:h-min md:h-max md:h-dvh md:h-dvw md:h-lvw md:h-lvh md:h-svh md:h-svw md:h-screen
md:min-w-0 md:min-w-1 md:min-w-2 md:min-w-3 md:min-w-4 md:min-w-5 md:min-w-6 md:min-w-7 md:min-w-8 md:min-w-9 md:min-w-10 md:min-w-11 md:min-w-12 md:min-w-14 md:min-w-16 md:min-w-20 md:min-w-24 md:min-w-28 md:min-w-32 md:min-w-36 md:min-w-40 md:min-w-44 md:min-w-48 md:min-w-52 md:min-w-56 md:min-w-60 md:min-w-64 md:min-w-72 md:min-w-80 md:min-w-96 md:min-w-full md:min-w-auto md:min-w-fit md:min-w-min md:min-w-max md:min-w-dvh md:min-w-dvw md:min-w-lvw md:min-w-lvh md:min-w-svh md:min-w-svw md:min-w-screen md:min-w-3xs md:min-w-2xs md:min-w-xs md:min-w-sm md:min-w-md md:min-w-lg md:min-w-xl md:min-w-2xl md:min-w-3xl md:min-w-4xl md:min-w-5xl md:min-w-6xl md:min-w-7xl
md:min-h-0 md:min-h-1 md:min-h-2 md:min-h-3 md:min-h-4 md:min-h-5 md:min-h-6 md:min-h-7 md:min-h-8 md:min-h-9 md:min-h-10 md:min-h-11 md:min-h-12 md:min-h-14 md:min-h-16 md:min-h-20 md:min-h-24 md:min-h-28 md:min-h-32 md:min-h-36 md:min-h-40 md:min-h-44 md:min-h-48 md:min-h-52 md:min-h-56 md:min-h-60 md:min-h-64 md:min-h-72 md:min-h-80 md:min-h-96 md:min-h-full md:min-h-auto md:min-h-fit md:min-h-min md:min-h-max md:min-h-dvh md:min-h-dvw md:min-h-lvw md:min-h-lvh md:min-h-svh md:min-h-svw md:min-h-screen
md:max-w-0 md:max-w-1 md:max-w-2 md:max-w-3 md:max-w-4 md:max-w-5 md:max-w-6 md:max-w-7 md:max-w-8 md:max-w-9 md:max-w-10 md:max-w-11 md:max-w-12 md:max-w-14 md:max-w-16 md:max-w-20 md:max-w-24 md:max-w-28 md:max-w-32 md:max-w-36 md:max-w-40 md:max-w-44 md:max-w-48 md:max-w-52 md:max-w-56 md:max-w-60 md:max-w-64 md:max-w-72 md:max-w-80 md:max-w-96 md:max-w-full md:max-w-auto md:max-w-fit md:max-w-min md:max-w-max md:max-w-dvh md:max-w-dvw md:max-w-lvw md:max-w-lvh md:max-w-svh md:max-w-svw md:max-w-screen md:max-w-3xs md:max-w-2xs md:max-w-xs md:max-w-sm md:max-w-md md:max-w-lg md:max-w-xl md:max-w-2xl md:max-w-3xl md:max-w-4xl md:max-w-5xl md:max-w-6xl md:max-w-7xl md:max-w-none
md:max-h-0 md:max-h-1 md:max-h-2 md:max-h-3 md:max-h-4 md:max-h-5 md:max-h-6 md:max-h-7 md:max-h-8 md:max-h-9 md:max-h-10 md:max-h-11 md:max-h-12 md:max-h-14 md:max-h-16 md:max-h-20 md:max-h-24 md:max-h-28 md:max-h-32 md:max-h-36 md:max-h-40 md:max-h-44 md:max-h-48 md:max-h-52 md:max-h-56 md:max-h-60 md:max-h-64 md:max-h-72 md:max-h-80 md:max-h-96 md:max-h-full md:max-h-auto md:max-h-fit md:max-h-min md:max-h-max md:max-h-dvh md:max-h-dvw md:max-h-lvw md:max-h-lvh md:max-h-svh md:max-h-svw md:max-h-screen md:max-h-none

lg:size-0 lg:size-1 lg:size-2 lg:size-3 lg:size-4 lg:size-5 lg:size-6 lg:size-7 lg:size-8 lg:size-9 lg:size-10 lg:size-11 lg:size-12 lg:size-14 lg:size-16 lg:size-20 lg:size-24 lg:size-28 lg:size-32 lg:size-36 lg:size-40 lg:size-44 lg:size-48 lg:size-52 lg:size-56 lg:size-60 lg:size-64 lg:size-72 lg:size-80 lg:size-96 lg:size-full lg:size-auto lg:size-fit lg:size-min lg:size-max lg:size-dvh lg:size-dvw lg:size-lvw lg:size-lvh lg:size-svh lg:size-svw
lg:w-0 lg:w-1 lg:w-2 lg:w-3 lg:w-4 lg:w-5 lg:w-6 lg:w-7 lg:w-8 lg:w-9 lg:w-10 lg:w-11 lg:w-12 lg:w-14 lg:w-16 lg:w-20 lg:w-24 lg:w-28 lg:w-32 lg:w-36 lg:w-40 lg:w-44 lg:w-48 lg:w-52 lg:w-56 lg:w-60 lg:w-64 lg:w-72 lg:w-80 lg:w-96 lg:w-full lg:w-auto lg:w-fit lg:w-min lg:w-max lg:w-dvh lg:w-dvw lg:w-lvw lg:w-lvh lg:w-svh lg:w-svw lg:w-screen lg:w-3xs lg:w-2xs lg:w-xs lg:w-sm lg:w-md lg:w-lg lg:w-xl lg:w-2xl lg:w-3xl lg:w-4xl lg:w-5xl lg:w-6xl lg:w-7xl
lg:h-0 lg:h-1 lg:h-2 lg:h-3 lg:h-4 lg:h-5 lg:h-6 lg:h-7 lg:h-8 lg:h-9 lg:h-10 lg:h-11 lg:h-12 lg:h-14 lg:h-16 lg:h-20 lg:h-24 lg:h-28 lg:h-32 lg:h-36 lg:h-40 lg:h-44 lg:h-48 lg:h-52 lg:h-56 lg:h-60 lg:h-64 lg:h-72 lg:h-80 lg:h-96 lg:h-full lg:h-auto lg:h-fit lg:h-min lg:h-max lg:h-dvh lg:h-dvw lg:h-lvw lg:h-lvh lg:h-svh lg:h-svw lg:h-screen
lg:min-w-0 lg:min-w-1 lg:min-w-2 lg:min-w-3 lg:min-w-4 lg:min-w-5 lg:min-w-6 lg:min-w-7 lg:min-w-8 lg:min-w-9 lg:min-w-10 lg:min-w-11 lg:min-w-12 lg:min-w-14 lg:min-w-16 lg:min-w-20 lg:min-w-24 lg:min-w-28 lg:min-w-32 lg:min-w-36 lg:min-w-40 lg:min-w-44 lg:min-w-48 lg:min-w-52 lg:min-w-56 lg:min-w-60 lg:min-w-64 lg:min-w-72 lg:min-w-80 lg:min-w-96 lg:min-w-full lg:min-w-auto lg:min-w-fit lg:min-w-min lg:min-w-max lg:min-w-dvh lg:min-w-dvw lg:min-w-lvw lg:min-w-lvh lg:min-w-svh lg:min-w-svw lg:min-w-screen lg:min-w-3xs lg:min-w-2xs lg:min-w-xs lg:min-w-sm lg:min-w-md lg:min-w-lg lg:min-w-xl lg:min-w-2xl lg:min-w-3xl lg:min-w-4xl lg:min-w-5xl lg:min-w-6xl lg:min-w-7xl
lg:min-h-0 lg:min-h-1 lg:min-h-2 lg:min-h-3 lg:min-h-4 lg:min-h-5 lg:min-h-6 lg:min-h-7 lg:min-h-8 lg:min-h-9 lg:min-h-10 lg:min-h-11 lg:min-h-12 lg:min-h-14 lg:min-h-16 lg:min-h-20 lg:min-h-24 lg:min-h-28 lg:min-h-32 lg:min-h-36 lg:min-h-40 lg:min-h-44 lg:min-h-48 lg:min-h-52 lg:min-h-56 lg:min-h-60 lg:min-h-64 lg:min-h-72 lg:min-h-80 lg:min-h-96 lg:min-h-full lg:min-h-auto lg:min-h-fit lg:min-h-min lg:min-h-max lg:min-h-dvh lg:min-h-dvw lg:min-h-lvw lg:min-h-lvh lg:min-h-svh lg:min-h-svw lg:min-h-screen
lg:max-w-0 lg:max-w-1 lg:max-w-2 lg:max-w-3 lg:max-w-4 lg:max-w-5 lg:max-w-6 lg:max-w-7 lg:max-w-8 lg:max-w-9 lg:max-w-10 lg:max-w-11 lg:max-w-12 lg:max-w-14 lg:max-w-16 lg:max-w-20 lg:max-w-24 lg:max-w-28 lg:max-w-32 lg:max-w-36 lg:max-w-40 lg:max-w-44 lg:max-w-48 lg:max-w-52 lg:max-w-56 lg:max-w-60 lg:max-w-64 lg:max-w-72 lg:max-w-80 lg:max-w-96 lg:max-w-full lg:max-w-auto lg:max-w-fit lg:max-w-min lg:max-w-max lg:max-w-dvh lg:max-w-dvw lg:max-w-lvw lg:max-w-lvh lg:max-w-svh lg:max-w-svw lg:max-w-screen lg:max-w-3xs lg:max-w-2xs lg:max-w-xs lg:max-w-sm lg:max-w-md lg:max-w-lg lg:max-w-xl lg:max-w-2xl lg:max-w-3xl lg:max-w-4xl lg:max-w-5xl lg:max-w-6xl lg:max-w-7xl lg:max-w-none
lg:max-h-0 lg:max-h-1 lg:max-h-2 lg:max-h-3 lg:max-h-4 lg:max-h-5 lg:max-h-6 lg:max-h-7 lg:max-h-8 lg:max-h-9 lg:max-h-10 lg:max-h-11 lg:max-h-12 lg:max-h-14 lg:max-h-16 lg:max-h-20 lg:max-h-24 lg:max-h-28 lg:max-h-32 lg:max-h-36 lg:max-h-40 lg:max-h-44 lg:max-h-48 lg:max-h-52 lg:max-h-56 lg:max-h-60 lg:max-h-64 lg:max-h-72 lg:max-h-80 lg:max-h-96 lg:max-h-full lg:max-h-auto lg:max-h-fit lg:max-h-min lg:max-h-max lg:max-h-dvh lg:max-h-dvw lg:max-h-lvw lg:max-h-lvh lg:max-h-svh lg:max-h-svw lg:max-h-screen lg:max-h-none

xl:size-0 xl:size-1 xl:size-2 xl:size-3 xl:size-4 xl:size-5 xl:size-6 xl:size-7 xl:size-8 xl:size-9 xl:size-10 xl:size-11 xl:size-12 xl:size-14 xl:size-16 xl:size-20 xl:size-24 xl:size-28 xl:size-32 xl:size-36 xl:size-40 xl:size-44 xl:size-48 xl:size-52 xl:size-56 xl:size-60 xl:size-64 xl:size-72 xl:size-80 xl:size-96 xl:size-full xl:size-auto xl:size-fit xl:size-min xl:size-max xl:size-dvh xl:size-dvw xl:size-lvw xl:size-lvh xl:size-svh xl:size-svw
xl:w-0 xl:w-1 xl:w-2 xl:w-3 xl:w-4 xl:w-5 xl:w-6 xl:w-7 xl:w-8 xl:w-9 xl:w-10 xl:w-11 xl:w-12 xl:w-14 xl:w-16 xl:w-20 xl:w-24 xl:w-28 xl:w-32 xl:w-36 xl:w-40 xl:w-44 xl:w-48 xl:w-52 xl:w-56 xl:w-60 xl:w-64 xl:w-72 xl:w-80 xl:w-96 xl:w-full xl:w-auto xl:w-fit xl:w-min xl:w-max xl:w-dvh xl:w-dvw xl:w-lvw xl:w-lvh xl:w-svh xl:w-svw xl:w-screen xl:w-3xs xl:w-2xs xl:w-xs xl:w-sm xl:w-md xl:w-lg xl:w-xl xl:w-2xl xl:w-3xl xl:w-4xl xl:w-5xl xl:w-6xl xl:w-7xl
xl:h-0 xl:h-1 xl:h-2 xl:h-3 xl:h-4 xl:h-5 xl:h-6 xl:h-7 xl:h-8 xl:h-9 xl:h-10 xl:h-11 xl:h-12 xl:h-14 xl:h-16 xl:h-20 xl:h-24 xl:h-28 xl:h-32 xl:h-36 xl:h-40 xl:h-44 xl:h-48 xl:h-52 xl:h-56 xl:h-60 xl:h-64 xl:h-72 xl:h-80 xl:h-96 xl:h-full xl:h-auto xl:h-fit xl:h-min xl:h-max xl:h-dvh xl:h-dvw xl:h-lvw xl:h-lvh xl:h-svh xl:h-svw xl:h-screen
xl:min-w-0 xl:min-w-1 xl:min-w-2 xl:min-w-3 xl:min-w-4 xl:min-w-5 xl:min-w-6 xl:min-w-7 xl:min-w-8 xl:min-w-9 xl:min-w-10 xl:min-w-11 xl:min-w-12 xl:min-w-14 xl:min-w-16 xl:min-w-20 xl:min-w-24 xl:min-w-28 xl:min-w-32 xl:min-w-36 xl:min-w-40 xl:min-w-44 xl:min-w-48 xl:min-w-52 xl:min-w-56 xl:min-w-60 xl:min-w-64 xl:min-w-72 xl:min-w-80 xl:min-w-96 xl:min-w-full xl:min-w-auto xl:min-w-fit xl:min-w-min xl:min-w-max xl:min-w-dvh xl:min-w-dvw xl:min-w-lvw xl:min-w-lvh xl:min-w-svh xl:min-w-svw xl:min-w-screen xl:min-w-3xs xl:min-w-2xs xl:min-w-xs xl:min-w-sm xl:min-w-md xl:min-w-lg xl:min-w-xl xl:min-w-2xl xl:min-w-3xl xl:min-w-4xl xl:min-w-5xl xl:min-w-6xl xl:min-w-7xl
xl:min-h-0 xl:min-h-1 xl:min-h-2 xl:min-h-3 xl:min-h-4 xl:min-h-5 xl:min-h-6 xl:min-h-7 xl:min-h-8 xl:min-h-9 xl:min-h-10 xl:min-h-11 xl:min-h-12 xl:min-h-14 xl:min-h-16 xl:min-h-20 xl:min-h-24 xl:min-h-28 xl:min-h-32 xl:min-h-36 xl:min-h-40 xl:min-h-44 xl:min-h-48 xl:min-h-52 xl:min-h-56 xl:min-h-60 xl:min-h-64 xl:min-h-72 xl:min-h-80 xl:min-h-96 xl:min-h-full xl:min-h-auto xl:min-h-fit xl:min-h-min xl:min-h-max xl:min-h-dvh xl:min-h-dvw xl:min-h-lvw xl:min-h-lvh xl:min-h-svh xl:min-h-svw xl:min-h-screen
xl:max-w-0 xl:max-w-1 xl:max-w-2 xl:max-w-3 xl:max-w-4 xl:max-w-5 xl:max-w-6 xl:max-w-7 xl:max-w-8 xl:max-w-9 xl:max-w-10 xl:max-w-11 xl:max-w-12 xl:max-w-14 xl:max-w-16 xl:max-w-20 xl:max-w-24 xl:max-w-28 xl:max-w-32 xl:max-w-36 xl:max-w-40 xl:max-w-44 xl:max-w-48 xl:max-w-52 xl:max-w-56 xl:max-w-60 xl:max-w-64 xl:max-w-72 xl:max-w-80 xl:max-w-96 xl:max-w-full xl:max-w-auto xl:max-w-fit xl:max-w-min xl:max-w-max xl:max-w-dvh xl:max-w-dvw xl:max-w-lvw xl:max-w-lvh xl:max-w-svh xl:max-w-svw xl:max-w-screen xl:max-w-3xs xl:max-w-2xs xl:max-w-xs xl:max-w-sm xl:max-w-md xl:max-w-lg xl:max-w-xl xl:max-w-2xl xl:max-w-3xl xl:max-w-4xl xl:max-w-5xl xl:max-w-6xl xl:max-w-7xl xl:max-w-none
xl:max-h-0 xl:max-h-1 xl:max-h-2 xl:max-h-3 xl:max-h-4 xl:max-h-5 xl:max-h-6 xl:max-h-7 xl:max-h-8 xl:max-h-9 xl:max-h-10 xl:max-h-11 xl:max-h-12 xl:max-h-14 xl:max-h-16 xl:max-h-20 xl:max-h-24 xl:max-h-28 xl:max-h-32 xl:max-h-36 xl:max-h-40 xl:max-h-44 xl:max-h-48 xl:max-h-52 xl:max-h-56 xl:max-h-60 xl:max-h-64 xl:max-h-72 xl:max-h-80 xl:max-h-96 xl:max-h-full xl:max-h-auto xl:max-h-fit xl:max-h-min xl:max-h-max xl:max-h-dvh xl:max-h-dvw xl:max-h-lvw xl:max-h-lvh xl:max-h-svh xl:max-h-svw xl:max-h-screen xl:max-h-none

2xl:size-0 2xl:size-1 2xl:size-2 2xl:size-3 2xl:size-4 2xl:size-5 2xl:size-6 2xl:size-7 2xl:size-8 2xl:size-9 2xl:size-10 2xl:size-11 2xl:size-12 2xl:size-14 2xl:size-16 2xl:size-20 2xl:size-24 2xl:size-28 2xl:size-32 2xl:size-36 2xl:size-40 2xl:size-44 2xl:size-48 2xl:size-52 2xl:size-56 2xl:size-60 2xl:size-64 2xl:size-72 2xl:size-80 2xl:size-96 2xl:size-full 2xl:size-auto 2xl:size-fit 2xl:size-min 2xl:size-max 2xl:size-dvh 2xl:size-dvw 2xl:size-lvw 2xl:size-lvh 2xl:size-svh 2xl:size-svw
2xl:w-0 2xl:w-1 2xl:w-2 2xl:w-3 2xl:w-4 2xl:w-5 2xl:w-6 2xl:w-7 2xl:w-8 2xl:w-9 2xl:w-10 2xl:w-11 2xl:w-12 2xl:w-14 2xl:w-16 2xl:w-20 2xl:w-24 2xl:w-28 2xl:w-32 2xl:w-36 2xl:w-40 2xl:w-44 2xl:w-48 2xl:w-52 2xl:w-56 2xl:w-60 2xl:w-64 2xl:w-72 2xl:w-80 2xl:w-96 2xl:w-full 2xl:w-auto 2xl:w-fit 2xl:w-min 2xl:w-max 2xl:w-dvh 2xl:w-dvw 2xl:w-lvw 2xl:w-lvh 2xl:w-svh 2xl:w-svw 2xl:w-screen 2xl:w-3xs 2xl:w-2xs 2xl:w-xs 2xl:w-sm 2xl:w-md 2xl:w-lg 2xl:w-xl 2xl:w-2xl 2xl:w-3xl 2xl:w-4xl 2xl:w-5xl 2xl:w-6xl 2xl:w-7xl
2xl:h-0 2xl:h-1 2xl:h-2 2xl:h-3 2xl:h-4 2xl:h-5 2xl:h-6 2xl:h-7 2xl:h-8 2xl:h-9 2xl:h-10 2xl:h-11 2xl:h-12 2xl:h-14 2xl:h-16 2xl:h-20 2xl:h-24 2xl:h-28 2xl:h-32 2xl:h-36 2xl:h-40 2xl:h-44 2xl:h-48 2xl:h-52 2xl:h-56 2xl:h-60 2xl:h-64 2xl:h-72 2xl:h-80 2xl:h-96 2xl:h-full 2xl:h-auto 2xl:h-fit 2xl:h-min 2xl:h-max 2xl:h-dvh 2xl:h-dvw 2xl:h-lvw 2xl:h-lvh 2xl:h-svh 2xl:h-svw 2xl:h-screen
2xl:min-w-0 2xl:min-w-1 2xl:min-w-2 2xl:min-w-3 2xl:min-w-4 2xl:min-w-5 2xl:min-w-6 2xl:min-w-7 2xl:min-w-8 2xl:min-w-9 2xl:min-w-10 2xl:min-w-11 2xl:min-w-12 2xl:min-w-14 2xl:min-w-16 2xl:min-w-20 2xl:min-w-24 2xl:min-w-28 2xl:min-w-32 2xl:min-w-36 2xl:min-w-40 2xl:min-w-44 2xl:min-w-48 2xl:min-w-52 2xl:min-w-56 2xl:min-w-60 2xl:min-w-64 2xl:min-w-72 2xl:min-w-80 2xl:min-w-96 2xl:min-w-full 2xl:min-w-auto 2xl:min-w-fit 2xl:min-w-min 2xl:min-w-max 2xl:min-w-dvh 2xl:min-w-dvw 2xl:min-w-lvw 2xl:min-w-lvh 2xl:min-w-svh 2xl:min-w-svw 2xl:min-w-screen 2xl:min-w-3xs 2xl:min-w-2xs 2xl:min-w-xs 2xl:min-w-sm 2xl:min-w-md 2xl:min-w-lg 2xl:min-w-xl 2xl:min-w-2xl 2xl:min-w-3xl 2xl:min-w-4xl 2xl:min-w-5xl 2xl:min-w-6xl 2xl:min-w-7xl
2xl:min-h-0 2xl:min-h-1 2xl:min-h-2 2xl:min-h-3 2xl:min-h-4 2xl:min-h-5 2xl:min-h-6 2xl:min-h-7 2xl:min-h-8 2xl:min-h-9 2xl:min-h-10 2xl:min-h-11 2xl:min-h-12 2xl:min-h-14 2xl:min-h-16 2xl:min-h-20 2xl:min-h-24 2xl:min-h-28 2xl:min-h-32 2xl:min-h-36 2xl:min-h-40 2xl:min-h-44 2xl:min-h-48 2xl:min-h-52 2xl:min-h-56 2xl:min-h-60 2xl:min-h-64 2xl:min-h-72 2xl:min-h-80 2xl:min-h-96 2xl:min-h-full 2xl:min-h-auto 2xl:min-h-fit 2xl:min-h-min 2xl:min-h-max 2xl:min-h-dvh 2xl:min-h-dvw 2xl:min-h-lvw 2xl:min-h-lvh 2xl:min-h-svh 2xl:min-h-svw 2xl:min-h-screen
2xl:max-w-0 2xl:max-w-1 2xl:max-w-2 2xl:max-w-3 2xl:max-w-4 2xl:max-w-5 2xl:max-w-6 2xl:max-w-7 2xl:max-w-8 2xl:max-w-9 2xl:max-w-10 2xl:max-w-11 2xl:max-w-12 2xl:max-w-14 2xl:max-w-16 2xl:max-w-20 2xl:max-w-24 2xl:max-w-28 2xl:max-w-32 2xl:max-w-36 2xl:max-w-40 2xl:max-w-44 2xl:max-w-48 2xl:max-w-52 2xl:max-w-56 2xl:max-w-60 2xl:max-w-64 2xl:max-w-72 2xl:max-w-80 2xl:max-w-96 2xl:max-w-full 2xl:max-w-auto 2xl:max-w-fit 2xl:max-w-min 2xl:max-w-max 2xl:max-w-dvh 2xl:max-w-dvw 2xl:max-w-lvw 2xl:max-w-lvh 2xl:max-w-svh 2xl:max-w-svw 2xl:max-w-screen 2xl:max-w-3xs 2xl:max-w-2xs 2xl:max-w-xs 2xl:max-w-sm 2xl:max-w-md 2xl:max-w-lg 2xl:max-w-xl 2xl:max-w-2xl 2xl:max-w-3xl 2xl:max-w-4xl 2xl:max-w-5xl 2xl:max-w-6xl 2xl:max-w-7xl 2xl:max-w-none
2xl:max-h-0 2xl:max-h-1 2xl:max-h-2 2xl:max-h-3 2xl:max-h-4 2xl:max-h-5 2xl:max-h-6 2xl:max-h-7 2xl:max-h-8 2xl:max-h-9 2xl:max-h-10 2xl:max-h-11 2xl:max-h-12 2xl:max-h-14 2xl:max-h-16 2xl:max-h-20 2xl:max-h-24 2xl:max-h-28 2xl:max-h-32 2xl:max-h-36 2xl:max-h-40 2xl:max-h-44 2xl:max-h-48 2xl:max-h-52 2xl:max-h-56 2xl:max-h-60 2xl:max-h-64 2xl:max-h-72 2xl:max-h-80 2xl:max-h-96 2xl:max-h-full 2xl:max-h-auto 2xl:max-h-fit 2xl:max-h-min 2xl:max-h-max 2xl:max-h-dvh 2xl:max-h-dvw 2xl:max-h-lvw 2xl:max-h-lvh 2xl:max-h-svh 2xl:max-h-svw 2xl:max-h-screen 2xl:max-h-none
*/
