const flexDirectionValues = [
  'row',
  'column',
  'row-reverse',
  'column-reverse',
] as const;

type FlexDirection = (typeof flexDirectionValues)[number];

function generateFlexDirectionVariants() {
  return flexDirectionValues.reduce(
    (acc, value) => {
      if (value === 'row') {
        acc[value] = 'flex-row';
      } else if (value === 'column') {
        acc[value] = 'flex-col';
      } else if (value === 'row-reverse') {
        acc[value] = 'flex-row-reverse';
      } else {
        acc[value] = 'flex-col-reverse';
      }
      return acc;
    },
    {} as Record<FlexDirection, string>,
  );
}

const flexVariants = {
  flexDirection: generateFlexDirectionVariants(),
  flexWrap: {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
  },
  items: {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  },
  justify: {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  },
  flex: {
    '1': 'flex-1',
    auto: 'flex-auto',
    initial: 'flex-initial',
    none: 'flex-none',
  },
  grow: {
    0: 'grow-0',
    1: 'grow',
  },
  shrink: {
    0: 'shrink-0',
    1: 'shrink',
  },
  self: {
    auto: 'self-auto',
    start: 'self-start',
    end: 'self-end',
    center: 'self-center',
    stretch: 'self-stretch',
    baseline: 'self-baseline',
  },
  order: {
    1: 'order-1',
    2: 'order-2',
    3: 'order-3',
    4: 'order-4',
    5: 'order-5',
    6: 'order-6',
    7: 'order-7',
    8: 'order-8',
    9: 'order-9',
    10: 'order-10',
    11: 'order-11',
    12: 'order-12',
    first: 'order-first',
    last: 'order-last',
    none: 'order-none',
  },
} as const;

type FlexVariants = typeof flexVariants;

export { type FlexDirection, type FlexVariants, flexVariants };

/*!
// Base flex variants
flex-row flex-col flex-row-reverse flex-col-reverse
flex-nowrap flex-wrap flex-wrap-reverse
items-start items-end items-center items-baseline items-stretch
justify-start justify-end justify-center justify-between justify-around justify-evenly
flex-1 flex-auto flex-initial flex-none
grow-0 grow
shrink-0 shrink
self-auto self-start self-end self-center self-stretch self-baseline
order-1 order-2 order-3 order-4 order-5 order-6 order-7 order-8 order-9 order-10 order-11 order-12 order-first order-last order-none

// Responsive flex variants
sm:flex-row sm:flex-col sm:flex-row-reverse sm:flex-col-reverse
sm:flex-nowrap sm:flex-wrap sm:flex-wrap-reverse
sm:items-start sm:items-end sm:items-center sm:items-baseline sm:items-stretch
sm:justify-start sm:justify-end sm:justify-center sm:justify-between sm:justify-around sm:justify-evenly
sm:flex-1 sm:flex-auto sm:flex-initial sm:flex-none
sm:grow-0 sm:grow
sm:shrink-0 sm:shrink
sm:self-auto sm:self-start sm:self-end sm:self-center sm:self-stretch sm:self-baseline
sm:order-1 sm:order-2 sm:order-3 sm:order-4 sm:order-5 sm:order-6 sm:order-7 sm:order-8 sm:order-9 sm:order-10 sm:order-11 sm:order-12 sm:order-first sm:order-last sm:order-none

md:flex-row md:flex-col md:flex-row-reverse md:flex-col-reverse
md:flex-nowrap md:flex-wrap md:flex-wrap-reverse
md:items-start md:items-end md:items-center md:items-baseline md:items-stretch
md:justify-start md:justify-end md:justify-center md:justify-between md:justify-around md:justify-evenly
md:flex-1 md:flex-auto md:flex-initial md:flex-none
md:grow-0 md:grow
md:shrink-0 md:shrink
md:self-auto md:self-start md:self-end md:self-center md:self-stretch md:self-baseline
md:order-1 md:order-2 md:order-3 md:order-4 md:order-5 md:order-6 md:order-7 md:order-8 md:order-9 md:order-10 md:order-11 md:order-12 md:order-first md:order-last md:order-none

lg:flex-row lg:flex-col lg:flex-row-reverse lg:flex-col-reverse
lg:flex-nowrap lg:flex-wrap lg:flex-wrap-reverse
lg:items-start lg:items-end lg:items-center lg:items-baseline lg:items-stretch
lg:justify-start lg:justify-end lg:justify-center lg:justify-between lg:justify-around lg:justify-evenly
lg:flex-1 lg:flex-auto lg:flex-initial lg:flex-none
lg:grow-0 lg:grow
lg:shrink-0 lg:shrink
lg:self-auto lg:self-start lg:self-end lg:self-center lg:self-stretch lg:self-baseline
lg:order-1 lg:order-2 lg:order-3 lg:order-4 lg:order-5 lg:order-6 lg:order-7 lg:order-8 lg:order-9 lg:order-10 lg:order-11 lg:order-12 lg:order-first lg:order-last lg:order-none

xl:flex-row xl:flex-col xl:flex-row-reverse xl:flex-col-reverse
xl:flex-nowrap xl:flex-wrap xl:flex-wrap-reverse
xl:items-start xl:items-end xl:items-center xl:items-baseline xl:items-stretch
xl:justify-start xl:justify-end xl:justify-center xl:justify-between xl:justify-around xl:justify-evenly
xl:flex-1 xl:flex-auto xl:flex-initial xl:flex-none
xl:grow-0 xl:grow
xl:shrink-0 xl:shrink
xl:self-auto xl:self-start xl:self-end xl:self-center xl:self-stretch xl:self-baseline
xl:order-1 xl:order-2 xl:order-3 xl:order-4 xl:order-5 xl:order-6 xl:order-7 xl:order-8 xl:order-9 xl:order-10 xl:order-11 xl:order-12 xl:order-first xl:order-last xl:order-none

2xl:flex-row 2xl:flex-col 2xl:flex-row-reverse 2xl:flex-col-reverse
2xl:flex-nowrap 2xl:flex-wrap 2xl:flex-wrap-reverse
2xl:items-start 2xl:items-end 2xl:items-center 2xl:items-baseline 2xl:items-stretch
2xl:justify-start 2xl:justify-end 2xl:justify-center 2xl:justify-between 2xl:justify-around 2xl:justify-evenly
2xl:flex-1 2xl:flex-auto 2xl:flex-initial 2xl:flex-none
2xl:grow-0 2xl:grow
2xl:shrink-0 2xl:shrink
2xl:self-auto 2xl:self-start 2xl:self-end 2xl:self-center 2xl:self-stretch 2xl:self-baseline
2xl:order-1 2xl:order-2 2xl:order-3 2xl:order-4 2xl:order-5 2xl:order-6 2xl:order-7 2xl:order-8 2xl:order-9 2xl:order-10 2xl:order-11 2xl:order-12 2xl:order-first 2xl:order-last 2xl:order-none
*/
