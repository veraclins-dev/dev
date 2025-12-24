const gridNumericScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

const gridTemplateScale = [...gridNumericScale, 'none', 'subgrid'] as const;

const spanScale = [...gridNumericScale, 'full', 'auto'] as const;

type GridNumericScale = (typeof gridNumericScale)[number];
type GridTemplateScale = (typeof gridTemplateScale)[number];
type SpanScale = (typeof spanScale)[number];
function generateGridVariants<T extends string | number>(
  scale: readonly T[],
  prefix: string,
) {
  return scale.reduce(
    (acc, value) => {
      acc[value] = `${prefix}-${value}`;
      return acc;
    },
    {} as Record<T, string>,
  );
}

const gridVariants = {
  gridCols: generateGridVariants(gridTemplateScale, 'grid-cols'),
  gridRows: generateGridVariants(gridTemplateScale, 'grid-rows'),
  colSpan: generateGridVariants(spanScale, 'col-span'),
  rowSpan: generateGridVariants(spanScale, 'row-span'),
  placeItems: {
    start: 'place-items-start',
    end: 'place-items-end',
    center: 'place-items-center',
    stretch: 'place-items-stretch',
    baseline: 'place-items-baseline',
  },
  placeContent: {
    start: 'place-content-start',
    end: 'place-content-end',
    center: 'place-content-center',
    stretch: 'place-content-stretch',
    between: 'place-content-between',
    around: 'place-content-around',
    evenly: 'place-content-evenly',
    baseline: 'place-content-baseline',
  },
  placeSelf: {
    auto: 'place-self-auto',
    start: 'place-self-start',
    end: 'place-self-end',
    center: 'place-self-center',
    stretch: 'place-self-stretch',
    baseline: 'place-self-baseline',
  },
} as const;

type GridVariants = typeof gridVariants;

export {
  type GridNumericScale,
  type GridTemplateScale,
  type GridVariants,
  gridVariants,
  type SpanScale,
};

/*!
// Base grid variants
grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12 grid-cols-none grid-cols-subgrid
grid-rows-1 grid-rows-2 grid-rows-3 grid-rows-4 grid-rows-5 grid-rows-6 grid-rows-7 grid-rows-8 grid-rows-9 grid-rows-10 grid-rows-11 grid-rows-12 grid-rows-none grid-rows-subgrid
col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12 col-span-full col-span-auto
row-span-1 row-span-2 row-span-3 row-span-4 row-span-5 row-span-6 row-span-7 row-span-8 row-span-9 row-span-10 row-span-11 row-span-12 row-span-full row-span-auto
place-items-start place-items-end place-items-center place-items-stretch place-items-baseline
place-content-start place-content-end place-content-center place-content-stretch place-content-between place-content-around place-content-evenly place-content-baseline
place-self-auto place-self-start place-self-end place-self-center place-self-stretch place-self-baseline

// Responsive grid variants
sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-6 sm:grid-cols-7 sm:grid-cols-8 sm:grid-cols-9 sm:grid-cols-10 sm:grid-cols-11 sm:grid-cols-12 sm:grid-cols-none sm:grid-cols-subgrid
sm:grid-rows-1 sm:grid-rows-2 sm:grid-rows-3 sm:grid-rows-4 sm:grid-rows-5 sm:grid-rows-6 sm:grid-rows-7 sm:grid-rows-8 sm:grid-rows-9 sm:grid-rows-10 sm:grid-rows-11 sm:grid-rows-12 sm:grid-rows-none sm:grid-rows-subgrid
sm:col-span-1 sm:col-span-2 sm:col-span-3 sm:col-span-4 sm:col-span-5 sm:col-span-6 sm:col-span-7 sm:col-span-8 sm:col-span-9 sm:col-span-10 sm:col-span-11 sm:col-span-12 sm:col-span-full sm:col-span-auto
sm:row-span-1 sm:row-span-2 sm:row-span-3 sm:row-span-4 sm:row-span-5 sm:row-span-6 sm:row-span-7 sm:row-span-8 sm:row-span-9 sm:row-span-10 sm:row-span-11 sm:row-span-12 sm:row-span-full sm:row-span-auto
sm:place-items-start sm:place-items-end sm:place-items-center sm:place-items-stretch sm:place-items-baseline
sm:place-content-start sm:place-content-end sm:place-content-center sm:place-content-stretch sm:place-content-between sm:place-content-around sm:place-content-evenly sm:place-content-baseline
sm:place-self-auto sm:place-self-start sm:place-self-end sm:place-self-center sm:place-self-stretch sm:place-self-baseline

md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6 md:grid-cols-7 md:grid-cols-8 md:grid-cols-9 md:grid-cols-10 md:grid-cols-11 md:grid-cols-12 md:grid-cols-none md:grid-cols-subgrid
md:grid-rows-1 md:grid-rows-2 md:grid-rows-3 md:grid-rows-4 md:grid-rows-5 md:grid-rows-6 md:grid-rows-7 md:grid-rows-8 md:grid-rows-9 md:grid-rows-10 md:grid-rows-11 md:grid-rows-12 md:grid-rows-none md:grid-rows-subgrid
md:col-span-1 md:col-span-2 md:col-span-3 md:col-span-4 md:col-span-5 md:col-span-6 md:col-span-7 md:col-span-8 md:col-span-9 md:col-span-10 md:col-span-11 md:col-span-12 md:col-span-full md:col-span-auto
md:row-span-1 md:row-span-2 md:row-span-3 md:row-span-4 md:row-span-5 md:row-span-6 md:row-span-7 md:row-span-8 md:row-span-9 md:row-span-10 md:row-span-11 md:row-span-12 md:row-span-full md:row-span-auto
md:place-items-start md:place-items-end md:place-items-center md:place-items-stretch md:place-items-baseline
md:place-content-start md:place-content-end md:place-content-center md:place-content-stretch md:place-content-between md:place-content-around md:place-content-evenly md:place-content-baseline
md:place-self-auto md:place-self-start md:place-self-end md:place-self-center md:place-self-stretch md:place-self-baseline

lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6 lg:grid-cols-7 lg:grid-cols-8 lg:grid-cols-9 lg:grid-cols-10 lg:grid-cols-11 lg:grid-cols-12 lg:grid-cols-none lg:grid-cols-subgrid
lg:grid-rows-1 lg:grid-rows-2 lg:grid-rows-3 lg:grid-rows-4 lg:grid-rows-5 lg:grid-rows-6 lg:grid-rows-7 lg:grid-rows-8 lg:grid-rows-9 lg:grid-rows-10 lg:grid-rows-11 lg:grid-rows-12 lg:grid-rows-none lg:grid-rows-subgrid
lg:col-span-1 lg:col-span-2 lg:col-span-3 lg:col-span-4 lg:col-span-5 lg:col-span-6 lg:col-span-7 lg:col-span-8 lg:col-span-9 lg:col-span-10 lg:col-span-11 lg:col-span-12 lg:col-span-full lg:col-span-auto
lg:row-span-1 lg:row-span-2 lg:row-span-3 lg:row-span-4 lg:row-span-5 lg:row-span-6 lg:row-span-7 lg:row-span-8 lg:row-span-9 lg:row-span-10 lg:row-span-11 lg:row-span-12 lg:row-span-full lg:row-span-auto
lg:place-items-start lg:place-items-end lg:place-items-center lg:place-items-stretch lg:place-items-baseline
lg:place-content-start lg:place-content-end lg:place-content-center lg:place-content-stretch lg:place-content-between lg:place-content-around lg:place-content-evenly lg:place-content-baseline
lg:place-self-auto lg:place-self-start lg:place-self-end lg:place-self-center lg:place-self-stretch lg:place-self-baseline

xl:grid-cols-1 xl:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6 xl:grid-cols-7 xl:grid-cols-8 xl:grid-cols-9 xl:grid-cols-10 xl:grid-cols-11 xl:grid-cols-12 xl:grid-cols-none xl:grid-cols-subgrid
xl:grid-rows-1 xl:grid-rows-2 xl:grid-rows-3 xl:grid-rows-4 xl:grid-rows-5 xl:grid-rows-6 xl:grid-rows-7 xl:grid-rows-8 xl:grid-rows-9 xl:grid-rows-10 xl:grid-rows-11 xl:grid-rows-12 xl:grid-rows-none xl:grid-rows-subgrid
xl:col-span-1 xl:col-span-2 xl:col-span-3 xl:col-span-4 xl:col-span-5 xl:col-span-6 xl:col-span-7 xl:col-span-8 xl:col-span-9 xl:col-span-10 xl:col-span-11 xl:col-span-12 xl:col-span-full xl:col-span-auto
xl:row-span-1 xl:row-span-2 xl:row-span-3 xl:row-span-4 xl:row-span-5 xl:row-span-6 xl:row-span-7 xl:row-span-8 xl:row-span-9 xl:row-span-10 xl:row-span-11 xl:row-span-12 xl:row-span-full xl:row-span-auto
xl:place-items-start xl:place-items-end xl:place-items-center xl:place-items-stretch xl:place-items-baseline
xl:place-content-start xl:place-content-end xl:place-content-center xl:place-content-stretch xl:place-content-between xl:place-content-around xl:place-content-evenly xl:place-content-baseline
xl:place-self-auto xl:place-self-start xl:place-self-end xl:place-self-center xl:place-self-stretch xl:place-self-baseline

2xl:grid-cols-1 2xl:grid-cols-2 2xl:grid-cols-3 2xl:grid-cols-4 2xl:grid-cols-5 2xl:grid-cols-6 2xl:grid-cols-7 2xl:grid-cols-8 2xl:grid-cols-9 2xl:grid-cols-10 2xl:grid-cols-11 2xl:grid-cols-12 2xl:grid-cols-none 2xl:grid-cols-subgrid
2xl:grid-rows-1 2xl:grid-rows-2 2xl:grid-rows-3 2xl:grid-rows-4 2xl:grid-rows-5 2xl:grid-rows-6 2xl:grid-rows-7 2xl:grid-rows-8 2xl:grid-rows-9 2xl:grid-rows-10 2xl:grid-rows-11 2xl:grid-rows-12 2xl:grid-rows-none 2xl:grid-rows-subgrid
2xl:col-span-1 2xl:col-span-2 2xl:col-span-3 2xl:col-span-4 2xl:col-span-5 2xl:col-span-6 2xl:col-span-7 2xl:col-span-8 2xl:col-span-9 2xl:col-span-10 2xl:col-span-11 2xl:col-span-12 2xl:col-span-full 2xl:col-span-auto
2xl:row-span-1 2xl:row-span-2 2xl:row-span-3 2xl:row-span-4 2xl:row-span-5 2xl:row-span-6 2xl:row-span-7 2xl:row-span-8 2xl:row-span-9 2xl:row-span-10 2xl:row-span-11 2xl:row-span-12 2xl:row-span-full 2xl:row-span-auto
2xl:place-items-start 2xl:place-items-end 2xl:place-items-center 2xl:place-items-stretch 2xl:place-items-baseline
2xl:place-content-start 2xl:place-content-end 2xl:place-content-center 2xl:place-content-stretch 2xl:place-content-between 2xl:place-content-around 2xl:place-content-evenly 2xl:place-content-baseline
2xl:place-self-auto 2xl:place-self-start 2xl:place-self-end 2xl:place-self-center 2xl:place-self-stretch 2xl:place-self-baseline
*/
