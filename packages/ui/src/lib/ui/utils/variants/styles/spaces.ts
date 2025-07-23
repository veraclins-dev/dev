const spaceScale = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24,
] as const;

type SpaceScale = (typeof spaceScale)[number];

const spaceScaleWithAuto = [...spaceScale, 'auto'] as const;

type MarginScale = (typeof spaceScaleWithAuto)[number];

type MarginTypes =
  | 'm'
  | 'mx'
  | 'my'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'ml'
  | 'me'
  | 'ms'
  | '-m'
  | '-mx'
  | '-my'
  | '-mt'
  | '-mr'
  | '-mb'
  | '-ml'
  | '-me'
  | '-ms';

type PaddingGapTypes =
  | 'p'
  | 'px'
  | 'py'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'pl'
  | 'pe'
  | 'ps'
  | 'gap'
  | 'gap-x'
  | 'gap-y';

type SpaceTypes = MarginTypes | PaddingGapTypes;

type SpaceValue = Record<SpaceScale, `${PaddingGapTypes}-${SpaceScale}`>;

type MarginValue = Record<MarginScale, `${MarginTypes}-${MarginScale}`>;

type SpaceVariant<T extends SpaceTypes> = T extends MarginTypes
  ? MarginValue
  : SpaceValue;

function generateSpaceVariants<T extends SpaceTypes>(
  spaceType: T,
): SpaceVariant<T> {
  if (spaceType.includes('m')) {
    return spaceScaleWithAuto.reduce((acc, scale) => {
      (acc as MarginValue)[scale] = `${spaceType as MarginTypes}-${scale}`;
      return acc;
    }, {} as SpaceVariant<T>);
  }

  return [...spaceScale].reduce((acc, scale) => {
    acc[scale] = `${spaceType}-${scale}`;
    return acc;
  }, {} as SpaceVariant<T>);
}

const spaceVariants = {
  m: generateSpaceVariants('m'),
  margin: generateSpaceVariants('m'),
  mx: generateSpaceVariants('mx'),
  marginX: generateSpaceVariants('mx'),
  my: generateSpaceVariants('my'),
  marginY: generateSpaceVariants('my'),
  mt: generateSpaceVariants('mt'),
  marginTop: generateSpaceVariants('mt'),
  mr: generateSpaceVariants('mr'),
  marginRight: generateSpaceVariants('mr'),
  mb: generateSpaceVariants('mb'),
  marginBottom: generateSpaceVariants('mb'),
  ml: generateSpaceVariants('ml'),
  marginLeft: generateSpaceVariants('ml'),
  ms: generateSpaceVariants('ms'),
  marginStart: generateSpaceVariants('ms'),
  me: generateSpaceVariants('me'),
  marginEnd: generateSpaceVariants('me'),

  mNeg: generateSpaceVariants('-m'),
  marginNeg: generateSpaceVariants('-m'),
  mxNeg: generateSpaceVariants('-mx'),
  marginXNeg: generateSpaceVariants('-mx'),
  myNeg: generateSpaceVariants('-my'),
  marginYNeg: generateSpaceVariants('-my'),
  mtNeg: generateSpaceVariants('-mt'),
  marginTopNeg: generateSpaceVariants('-mt'),
  mrNeg: generateSpaceVariants('-mr'),
  marginRightNeg: generateSpaceVariants('-mr'),
  mbNeg: generateSpaceVariants('-mb'),
  marginBottomNeg: generateSpaceVariants('-mb'),
  mlNeg: generateSpaceVariants('-ml'),
  marginLeftNeg: generateSpaceVariants('-ml'),
  msNeg: generateSpaceVariants('-ms'),
  marginStartNeg: generateSpaceVariants('-ms'),
  meNeg: generateSpaceVariants('-me'),
  marginEndNeg: generateSpaceVariants('-me'),

  p: generateSpaceVariants('p'),
  padding: generateSpaceVariants('p'),
  px: generateSpaceVariants('px'),
  paddingX: generateSpaceVariants('px'),
  py: generateSpaceVariants('py'),
  paddingY: generateSpaceVariants('py'),
  pt: generateSpaceVariants('pt'),
  paddingTop: generateSpaceVariants('pt'),
  pr: generateSpaceVariants('pr'),
  paddingRight: generateSpaceVariants('pr'),
  pb: generateSpaceVariants('pb'),
  paddingBottom: generateSpaceVariants('pb'),
  pl: generateSpaceVariants('pl'),
  paddingLeft: generateSpaceVariants('pl'),
  ps: generateSpaceVariants('ps'),
  paddingStart: generateSpaceVariants('ps'),
  pe: generateSpaceVariants('pe'),
  paddingEnd: generateSpaceVariants('pe'),

  gap: generateSpaceVariants('gap'),
  gapX: generateSpaceVariants('gap-x'),
  gapY: generateSpaceVariants('gap-y'),
};

type SpaceVariants = typeof spaceVariants;

export { spaceScale, type SpaceVariants, spaceVariants };

/*!
// Base margin variants
m-0 m-1 m-2 m-3 m-4 m-5 m-6 m-7 m-8 m-9 m-10 m-11 m-12 m-14 m-16 m-20 m-24 m-auto
mx-0 mx-1 mx-2 mx-3 mx-4 mx-5 mx-6 mx-7 mx-8 mx-9 mx-10 mx-11 mx-12 mx-14 mx-16 mx-20 mx-24 mx-auto
my-0 my-1 my-2 my-3 my-4 my-5 my-6 my-7 my-8 my-9 my-10 my-11 my-12 my-14 my-16 my-20 my-24 my-auto
mt-0 mt-1 mt-2 mt-3 mt-4 mt-5 mt-6 mt-7 mt-8 mt-9 mt-10 mt-11 mt-12 mt-14 mt-16 mt-20 mt-24 mt-auto
mr-0 mr-1 mr-2 mr-3 mr-4 mr-5 mr-6 mr-7 mr-8 mr-9 mr-10 mr-11 mr-12 mr-14 mr-16 mr-20 mr-24 mr-auto
mb-0 mb-1 mb-2 mb-3 mb-4 mb-5 mb-6 mb-7 mb-8 mb-9 mb-10 mb-11 mb-12 mb-14 mb-16 mb-20 mb-24 mb-auto
ml-0 ml-1 ml-2 ml-3 ml-4 ml-5 ml-6 ml-7 ml-8 ml-9 ml-10 ml-11 ml-12 ml-14 ml-16 ml-20 ml-24 ml-auto
ms-0 ms-1 ms-2 ms-3 ms-4 ms-5 ms-6 ms-7 ms-8 ms-9 ms-10 ms-11 ms-12 ms-14 ms-16 ms-20 ms-24 ms-auto
me-0 me-1 me-2 me-3 me-4 me-5 me-6 me-7 me-8 me-9 me-10 me-11 me-12 me-14 me-16 me-20 me-24 me-auto

// Base negative margin variants
-m-0 -m-1 -m-2 -m-3 -m-4 -m-5 -m-6 -m-7 -m-8 -m-9 -m-10 -m-11 -m-12 -m-14 -m-16 -m-20 -m-24 -m-auto
-mx-0 -mx-1 -mx-2 -mx-3 -mx-4 -mx-5 -mx-6 -mx-7 -mx-8 -mx-9 -mx-10 -mx-11 -mx-12 -mx-14 -mx-16 -mx-20 -mx-24 -mx-auto
-my-0 -my-1 -my-2 -my-3 -my-4 -my-5 -my-6 -my-7 -my-8 -my-9 -my-10 -my-11 -my-12 -my-14 -my-16 -my-20 -my-24 -my-auto
-mt-0 -mt-1 -mt-2 -mt-3 -mt-4 -mt-5 -mt-6 -mt-7 -mt-8 -mt-9 -mt-10 -mt-11 -mt-12 -mt-14 -mt-16 -mt-20 -mt-24 -mt-auto
-mr-0 -mr-1 -mr-2 -mr-3 -mr-4 -mr-5 -mr-6 -mr-7 -mr-8 -mr-9 -mr-10 -mr-11 -mr-12 -mr-14 -mr-16 -mr-20 -mr-24 -mr-auto
-mb-0 -mb-1 -mb-2 -mb-3 -mb-4 -mb-5 -mb-6 -mb-7 -mb-8 -mb-9 -mb-10 -mb-11 -mb-12 -mb-14 -mb-16 -mb-20 -mb-24 -mb-auto
-ml-0 -ml-1 -ml-2 -ml-3 -ml-4 -ml-5 -ml-6 -ml-7 -ml-8 -ml-9 -ml-10 -ml-11 -ml-12 -ml-14 -ml-16 -ml-20 -ml-24 -ml-auto
-ms-0 -ms-1 -ms-2 -ms-3 -ms-4 -ms-5 -ms-6 -ms-7 -ms-8 -ms-9 -ms-10 -ms-11 -ms-12 -ms-14 -ms-16 -ms-20 -ms-24 -ms-auto
-me-0 -me-1 -me-2 -me-3 -me-4 -me-5 -me-6 -me-7 -me-8 -me-9 -me-10 -me-11 -me-12 -me-14 -me-16 -me-20 -me-24 -me-auto

// Base padding variants
p-0 p-1 p-2 p-3 p-4 p-5 p-6 p-7 p-8 p-9 p-10 p-11 p-12 p-14 p-16 p-20 p-24
px-0 px-1 px-2 px-3 px-4 px-5 px-6 px-7 px-8 px-9 px-10 px-11 px-12 px-14 px-16 px-20 px-24
py-0 py-1 py-2 py-3 py-4 py-5 py-6 py-7 py-8 py-9 py-10 py-11 py-12 py-14 py-16 py-20 py-24
pt-0 pt-1 pt-2 pt-3 pt-4 pt-5 pt-6 pt-7 pt-8 pt-9 pt-10 pt-11 pt-12 pt-14 pt-16 pt-20 pt-24
pr-0 pr-1 pr-2 pr-3 pr-4 pr-5 pr-6 pr-7 pr-8 pr-9 pr-10 pr-11 pr-12 pr-14 pr-16 pr-20 pr-24
pb-0 pb-1 pb-2 pb-3 pb-4 pb-5 pb-6 pb-7 pb-8 pb-9 pb-10 pb-11 pb-12 pb-14 pb-16 pb-20 pb-24
pl-0 pl-1 pl-2 pl-3 pl-4 pl-5 pl-6 pl-7 pl-8 pl-9 pl-10 pl-11 pl-12 pl-14 pl-16 pl-20 pl-24
ps-0 ps-1 ps-2 ps-3 ps-4 ps-5 ps-6 ps-7 ps-8 ps-9 ps-10 ps-11 ps-12 ps-14 ps-16 ps-20 ps-24
pe-0 pe-1 pe-2 pe-3 pe-4 pe-5 pe-6 pe-7 pe-8 pe-9 pe-10 pe-11 pe-12 pe-14 pe-16 pe-20 pe-24

// Base gap variants
gap-0 gap-1 gap-2 gap-3 gap-4 gap-5 gap-6 gap-7 gap-8 gap-9 gap-10 gap-11 gap-12 gap-14 gap-16 gap-20 gap-24
gap-x-0 gap-x-1 gap-x-2 gap-x-3 gap-x-4 gap-x-5 gap-x-6 gap-x-7 gap-x-8 gap-x-9 gap-x-10 gap-x-11 gap-x-12 gap-x-14 gap-x-16 gap-x-20 gap-x-24
gap-y-0 gap-y-1 gap-y-2 gap-y-3 gap-y-4 gap-y-5 gap-y-6 gap-y-7 gap-y-8 gap-y-9 gap-y-10 gap-y-11 gap-y-12 gap-y-14 gap-y-16 gap-y-20 gap-y-24

// Responsive margin variants
sm:m-0 sm:m-1 sm:m-2 sm:m-3 sm:m-4 sm:m-5 sm:m-6 sm:m-7 sm:m-8 sm:m-9 sm:m-10 sm:m-11 sm:m-12 sm:m-14 sm:m-16 sm:m-20 sm:m-24
sm:mx-0 sm:mx-1 sm:mx-2 sm:mx-3 sm:mx-4 sm:mx-5 sm:mx-6 sm:mx-7 sm:mx-8 sm:mx-9 sm:mx-10 sm:mx-11 sm:mx-12 sm:mx-14 sm:mx-16 sm:mx-20 sm:mx-24
sm:my-0 sm:my-1 sm:my-2 sm:my-3 sm:my-4 sm:my-5 sm:my-6 sm:my-7 sm:my-8 sm:my-9 sm:my-10 sm:my-11 sm:my-12 sm:my-14 sm:my-16 sm:my-20 sm:my-24
sm:mt-0 sm:mt-1 sm:mt-2 sm:mt-3 sm:mt-4 sm:mt-5 sm:mt-6 sm:mt-7 sm:mt-8 sm:mt-9 sm:mt-10 sm:mt-11 sm:mt-12 sm:mt-14 sm:mt-16 sm:mt-20 sm:mt-24
sm:mr-0 sm:mr-1 sm:mr-2 sm:mr-3 sm:mr-4 sm:mr-5 sm:mr-6 sm:mr-7 sm:mr-8 sm:mr-9 sm:mr-10 sm:mr-11 sm:mr-12 sm:mr-14 sm:mr-16 sm:mr-20 sm:mr-24
sm:mb-0 sm:mb-1 sm:mb-2 sm:mb-3 sm:mb-4 sm:mb-5 sm:mb-6 sm:mb-7 sm:mb-8 sm:mb-9 sm:mb-10 sm:mb-11 sm:mb-12 sm:mb-14 sm:mb-16 sm:mb-20 sm:mb-24
sm:ml-0 sm:ml-1 sm:ml-2 sm:ml-3 sm:ml-4 sm:ml-5 sm:ml-6 sm:ml-7 sm:ml-8 sm:ml-9 sm:ml-10 sm:ml-11 sm:ml-12 sm:ml-14 sm:ml-16 sm:ml-20 sm:ml-24
sm:ms-0 sm:ms-1 sm:ms-2 sm:ms-3 sm:ms-4 sm:ms-5 sm:ms-6 sm:ms-7 sm:ms-8 sm:ms-9 sm:ms-10 sm:ms-11 sm:ms-12 sm:ms-14 sm:ms-16 sm:ms-20 sm:ms-24
sm:me-0 sm:me-1 sm:me-2 sm:me-3 sm:me-4 sm:me-5 sm:me-6 sm:me-7 sm:me-8 sm:me-9 sm:me-10 sm:me-11 sm:me-12 sm:me-14 sm:me-16 sm:me-20 sm:me-24

sm:-m-0 sm:-m-1 sm:-m-2 sm:-m-3 sm:-m-4 sm:-m-5 sm:-m-6 sm:-m-7 sm:-m-8 sm:-m-9 sm:-m-10 sm:-m-11 sm:-m-12 sm:-m-14 sm:-m-16 sm:-m-20 sm:-m-24
sm:-mx-0 sm:-mx-1 sm:-mx-2 sm:-mx-3 sm:-mx-4 sm:-mx-5 sm:-mx-6 sm:-mx-7 sm:-mx-8 sm:-mx-9 sm:-mx-10 sm:-mx-11 sm:-mx-12 sm:-mx-14 sm:-mx-16 sm:-mx-20 sm:-mx-24
sm:-my-0 sm:-my-1 sm:-my-2 sm:-my-3 sm:-my-4 sm:-my-5 sm:-my-6 sm:-my-7 sm:-my-8 sm:-my-9 sm:-my-10 sm:-my-11 sm:-my-12 sm:-my-14 sm:-my-16 sm:-my-20 sm:-my-24
sm:-mt-0 sm:-mt-1 sm:-mt-2 sm:-mt-3 sm:-mt-4 sm:-mt-5 sm:-mt-6 sm:-mt-7 sm:-mt-8 sm:-mt-9 sm:-mt-10 sm:-mt-11 sm:-mt-12 sm:-mt-14 sm:-mt-16 sm:-mt-20 sm:-mt-24
sm:-mr-0 sm:-mr-1 sm:-mr-2 sm:-mr-3 sm:-mr-4 sm:-mr-5 sm:-mr-6 sm:-mr-7 sm:-mr-8 sm:-mr-9 sm:-mr-10 sm:-mr-11 sm:-mr-12 sm:-mr-14 sm:-mr-16 sm:-mr-20 sm:-mr-24
sm:-mb-0 sm:-mb-1 sm:-mb-2 sm:-mb-3 sm:-mb-4 sm:-mb-5 sm:-mb-6 sm:-mb-7 sm:-mb-8 sm:-mb-9 sm:-mb-10 sm:-mb-11 sm:-mb-12 sm:-mb-14 sm:-mb-16 sm:-mb-20 sm:-mb-24
sm:-ml-0 sm:-ml-1 sm:-ml-2 sm:-ml-3 sm:-ml-4 sm:-ml-5 sm:-ml-6 sm:-ml-7 sm:-ml-8 sm:-ml-9 sm:-ml-10 sm:-ml-11 sm:-ml-12 sm:-ml-14 sm:-ml-16 sm:-ml-20 sm:-ml-24
sm:-ms-0 sm:-ms-1 sm:-ms-2 sm:-ms-3 sm:-ms-4 sm:-ms-5 sm:-ms-6 sm:-ms-7 sm:-ms-8 sm:-ms-9 sm:-ms-10 sm:-ms-11 sm:-ms-12 sm:-ms-14 sm:-ms-16 sm:-ms-20 sm:-ms-24
sm:-me-0 sm:-me-1 sm:-me-2 sm:-me-3 sm:-me-4 sm:-me-5 sm:-me-6 sm:-me-7 sm:-me-8 sm:-me-9 sm:-me-10 sm:-me-11 sm:-me-12 sm:-me-14 sm:-me-16 sm:-me-20 sm:-me-24

sm:p-0 sm:p-1 sm:p-2 sm:p-3 sm:p-4 sm:p-5 sm:p-6 sm:p-7 sm:p-8 sm:p-9 sm:p-10 sm:p-11 sm:p-12 sm:p-14 sm:p-16 sm:p-20 sm:p-24
sm:px-0 sm:px-1 sm:px-2 sm:px-3 sm:px-4 sm:px-5 sm:px-6 sm:px-7 sm:px-8 sm:px-9 sm:px-10 sm:px-11 sm:px-12 sm:px-14 sm:px-16 sm:px-20 sm:px-24
sm:py-0 sm:py-1 sm:py-2 sm:py-3 sm:py-4 sm:py-5 sm:py-6 sm:py-7 sm:py-8 sm:py-9 sm:py-10 sm:py-11 sm:py-12 sm:py-14 sm:py-16 sm:py-20 sm:py-24
sm:pt-0 sm:pt-1 sm:pt-2 sm:pt-3 sm:pt-4 sm:pt-5 sm:pt-6 sm:pt-7 sm:pt-8 sm:pt-9 sm:pt-10 sm:pt-11 sm:pt-12 sm:pt-14 sm:pt-16 sm:pt-20 sm:pt-24
sm:pr-0 sm:pr-1 sm:pr-2 sm:pr-3 sm:pr-4 sm:pr-5 sm:pr-6 sm:pr-7 sm:pr-8 sm:pr-9 sm:pr-10 sm:pr-11 sm:pr-12 sm:pr-14 sm:pr-16 sm:pr-20 sm:pr-24
sm:pb-0 sm:pb-1 sm:pb-2 sm:pb-3 sm:pb-4 sm:pb-5 sm:pb-6 sm:pb-7 sm:pb-8 sm:pb-9 sm:pb-10 sm:pb-11 sm:pb-12 sm:pb-14 sm:pb-16 sm:pb-20 sm:pb-24
sm:pl-0 sm:pl-1 sm:pl-2 sm:pl-3 sm:pl-4 sm:pl-5 sm:pl-6 sm:pl-7 sm:pl-8 sm:pl-9 sm:pl-10 sm:pl-11 sm:pl-12 sm:pl-14 sm:pl-16 sm:pl-20 sm:pl-24
sm:ps-0 sm:ps-1 sm:ps-2 sm:ps-3 sm:ps-4 sm:ps-5 sm:ps-6 sm:ps-7 sm:ps-8 sm:ps-9 sm:ps-10 sm:ps-11 sm:ps-12 sm:ps-14 sm:ps-16 sm:ps-20 sm:ps-24
sm:pe-0 sm:pe-1 sm:pe-2 sm:pe-3 sm:pe-4 sm:pe-5 sm:pe-6 sm:pe-7 sm:pe-8 sm:pe-9 sm:pe-10 sm:pe-11 sm:pe-12 sm:pe-14 sm:pe-16 sm:pe-20 sm:pe-24

sm:gap-0 sm:gap-1 sm:gap-2 sm:gap-3 sm:gap-4 sm:gap-5 sm:gap-6 sm:gap-7 sm:gap-8 sm:gap-9 sm:gap-10 sm:gap-11 sm:gap-12 sm:gap-14 sm:gap-16 sm:gap-20 sm:gap-24
sm:gap-x-0 sm:gap-x-1 sm:gap-x-2 sm:gap-x-3 sm:gap-x-4 sm:gap-x-5 sm:gap-x-6 sm:gap-x-7 sm:gap-x-8 sm:gap-x-9 sm:gap-x-10 sm:gap-x-11 sm:gap-x-12 sm:gap-x-14 sm:gap-x-16 sm:gap-x-20 sm:gap-x-24
sm:gap-y-0 sm:gap-y-1 sm:gap-y-2 sm:gap-y-3 sm:gap-y-4 sm:gap-y-5 sm:gap-y-6 sm:gap-y-7 sm:gap-y-8 sm:gap-y-9 sm:gap-y-10 sm:gap-y-11 sm:gap-y-12 sm:gap-y-14 sm:gap-y-16 sm:gap-y-20 sm:gap-y-24

md:m-0 md:m-1 md:m-2 md:m-3 md:m-4 md:m-5 md:m-6 md:m-7 md:m-8 md:m-9 md:m-10 md:m-11 md:m-12 md:m-14 md:m-16 md:m-20 md:m-24
md:mx-0 md:mx-1 md:mx-2 md:mx-3 md:mx-4 md:mx-5 md:mx-6 md:mx-7 md:mx-8 md:mx-9 md:mx-10 md:mx-11 md:mx-12 md:mx-14 md:mx-16 md:mx-20 md:mx-24
md:my-0 md:my-1 md:my-2 md:my-3 md:my-4 md:my-5 md:my-6 md:my-7 md:my-8 md:my-9 md:my-10 md:my-11 md:my-12 md:my-14 md:my-16 md:my-20 md:my-24
md:mt-0 md:mt-1 md:mt-2 md:mt-3 md:mt-4 md:mt-5 md
md:mr-0 md:mr-1 md:mr-2 md:mr-3 md:mr-4 md:mr-5 md:mr-6 md:mr-7 md:mr-8 md:mr-9 md:mr-10 md:mr-11 md:mr-12 md:mr-14 md:mr-16 md:mr-20 md:mr-24
md:mb-0 md:mb-1 md:mb-2 md:mb-3 md:mb-4 md:mb-5 md:mb-6 md:mb-7 md:mb-8 md:mb-9 md:mb-10 md:mb-11 md:mb-12 md:mb-14 md:mb-16 md:mb-20 md:mb-24
md:ml-0 md:ml-1 md:ml-2 md:ml-3 md:ml-4 md:ml-5 md:ml-6 md:ml-7 md:ml-8 md:ml-9 md:ml-10 md:ml-11 md:ml-12 md:ml-14 md:ml-16 md:ml-20 md:ml-24
md:ms-0 md:ms-1 md:ms-2 md:ms-3 md:ms-4 md:ms-5 md:ms-6 md:ms-7 md:ms-8 md:ms-9 md:ms-10 md:ms-11 md:ms-12 md:ms-14 md:ms-16 md:ms-20 md:ms-24
md:me-0 md:me-1 md:me-2 md:me-3 md:me-4 md:me-5 md:me-6 md:me-7 md:me-8 md:me-9 md:me-10 md:me-11 md:me-12 md:me-14 md:me-16 md:me-20 md:me-24

md:-m-0 md:-m-1 md:-m-2 md:-m-3 md:-m-4 md:-m-5 md:-m-6 md:-m-7 md:-m-8 md:-m-9 md:-m-10 md:-m-11 md:-m-12 md:-m-14 md:-m-16 md:-m-20 md:-m-24
md:-mx-0 md:-mx-1 md:-mx-2 md:-mx-3 md:-mx-4 md:-mx-5 md:-mx-6 md:-mx-7 md:-mx-8 md:-mx-9 md:-mx-10 md:-mx-11 md:-mx-12 md:-mx-14 md:-mx-16 md:-mx-20 md:-mx-24
md:-my-0 md:-my-1 md:-my-2 md:-my-3 md:-my-4 md:-my-5 md:-my-6 md:-my-7 md:-my-8 md:-my-9 md:-my-10 md:-my-11 md:-my-12 md:-my-14 md:-my-16 md:-my-20 md:-my-24
md:-mt-0 md:-mt-1 md:-mt-2 md:-mt-3 md:-mt-4 md:-mt-5 md:-mt-6 md:-mt-7 md:-mt-8 md:-mt-9 md:-mt-10 md:-mt-11 md:-mt-12 md:-mt-14 md:-mt-16 md:-mt-20 md:-mt-24
md:-mr-0 md:-mr-1 md:-mr-2 md:-mr-3 md:-mr-4 md:-mr-5 md:-mr-6 md:-mr-7 md:-mr-8 md:-mr-9 md:-mr-10 md:-mr-11 md:-mr-12 md:-mr-14 md:-mr-16 md:-mr-20 md:-mr-24
md:-mb-0 md:-mb-1 md:-mb-2 md:-mb-3 md:-mb-4 md:-mb-5 md:-mb-6 md:-mb-7 md:-mb-8 md:-mb-9 md:-mb-10 md:-mb-11 md:-mb-12 md:-mb-14 md:-mb-16 md:-mb-20 md:-mb-24
md:-ml-0 md:-ml-1 md:-ml-2 md:-ml-3 md:-ml-4 md:-ml-5 md:-ml-6 md:-ml-7 md:-ml-8 md:-ml-9 md:-ml-10 md:-ml-11 md:-ml-12 md:-ml-14 md:-ml-16 md:-ml-20 md:-ml-24
md:-ms-0 md:-ms-1 md:-ms-2 md:-ms-3 md:-ms-4 md:-ms-5 md:-ms-6 md:-ms-7 md:-ms-8 md:-ms-9 md:-ms-10 md:-ms-11 md:-ms-12 md:-ms-14 md:-ms-16 md:-ms-20 md:-ms-24
md:-me-0 md:-me-1 md:-me-2 md:-me-3 md:-me-4 md:-me-5 md:-me-6 md:-me-7 md:-me-8 md:-me-9 md:-me-10 md:-me-11 md:-me-12 md:-me-14 md:-me-16 md:-me-20 md:-me-24

md:p-0 md:p-1 md:p-2 md:p-3 md:p-4 md:p-5 md:p-6 md:p-7 md:p-8 md:p-9 md:p-10 md:p-11 md:p-12 md:p-14 md:p-16 md:p-20 md:p-24
md:px-0 md:px-1 md:px-2 md:px-3 md:px-4 md:px-5 md:px-6 md:px-7 md:px-8 md:px-9 md:px-10 md:px-11 md:px-12 md:px-14 md:px-16 md:px-20 md:px-24
md:py-0 md:py-1 md:py-2 md:py-3 md:py-4 md:py-5 md:py-6 md:py-7 md:py-8 md:py-9 md:py-10 md:py-11 md:py-12 md:py-14 md:py-16 md:py-20 md:py-24
md:pt-0 md:pt-1 md:pt-2 md:pt-3 md:pt-4 md:pt-5 md:pt-6 md:pt-7 md:pt-8 md:pt-9 md:pt-10 md:pt-11 md:pt-12 md:pt-14 md:pt-16 md:pt-20 md:pt-24
md:pr-0 md:pr-1 md:pr-2 md:pr-3 md:pr-4 md:pr-5 md:pr-6 md:pr-7 md:pr-8 md:pr-9 md:pr-10 md:pr-11 md:pr-12 md:pr-14 md:pr-16 md:pr-20 md:pr-24
md:pb-0 md:pb-1 md:pb-2 md:pb-3 md:pb-4 md:pb-5 md:pb-6 md:pb-7 md:pb-8 md:pb-9 md:pb-10 md:pb-11 md:pb-12 md:pb-14 md:pb-16 md:pb-20 md:pb-24
md:pl-0 md:pl-1 md:pl-2 md:pl-3 md:pl-4 md:pl-5 md:pl-6 md:pl-7 md:pl-8 md:pl-9 md:pl-10 md:pl-11 md:pl-12 md:pl-14 md:pl-16 md:pl-20 md:pl-24
md:ps-0 md:ps-1 md:ps-2 md:ps-3 md:ps-4 md:ps-5 md:ps-6 md:ps-7 md:ps-8 md:ps-9 md:ps-10 md:ps-11 md:ps-12 md:ps-14 md:ps-16 md:ps-20 md:ps-24
md:pe-0 md:pe-1 md:pe-2 md:pe-3 md:pe-4 md:pe-5 md:pe-6 md:pe-7 md:pe-8 md:pe-9 md:pe-10 md:pe-11 md:pe-12 md:pe-14 md:pe-16 md:pe-20 md:pe-24

md:gap-0 md:gap-1 md:gap-2 md:gap-3 md:gap-4 md:gap-5 md:gap-6 md:gap-7 md:gap-8 md:gap-9 md:gap-10 md:gap-11 md:gap-12 md:gap-14 md:gap-16 md:gap-20 md:gap-24
md:gap-x-0 md:gap-x-1 md:gap-x-2 md:gap-x-3 md:gap-x-4 md:gap-x-5 md:gap-x-6 md:gap-x-7 md:gap-x-8 md:gap-x-9 md:gap-x-10 md:gap-x-11 md:gap-x-12 md:gap-x-14 md:gap-x-16 md:gap-x-20 md:gap-x-24
md:gap-y-0 md:gap-y-1 md:gap-y-2 md:gap-y-3 md:gap-y-4 md:gap-y-5 md:gap-y-6 md:gap-y-7 md:gap-y-8 md:gap-y-9 md:gap-y-10 md:gap-y-11 md:gap-y-12 md:gap-y-14 md:gap-y-16 md:gap-y-20 md:gap-y-24

lg:m-0 lg:m-1 lg:m-2 lg:m-3 lg:m-4 lg:m-5 lg:m-6 lg:m-7 lg:m-8 lg:m-9 lg:m-10 lg:m-11 lg:m-12 lg:m-14 lg:m-16 lg:m-20 lg:m-24
lg:mx-0 lg:mx-1 lg:mx-2 lg:mx-3 lg:mx-4 lg:mx-5 lg:mx-6 lg:mx-7 lg:mx-8 lg:mx-9 lg:mx-10 lg:mx-11 lg:mx-12 lg:mx-14 lg:mx-16 lg:mx-20 lg:mx-24
lg:my-0 lg:my-1 lg:my-2 lg:my-3 lg:my-4 lg:my-5 lg:my-6 lg:my-7 lg:my-8 lg:my-9 lg:my-10 lg:my-11 lg:my-12 lg:my-14 lg:my-16 lg:my-20 lg:my-24
lg:mt-0 lg:mt-1 lg:mt-2 lg:mt-3 lg:mt-4 lg:mt-5 lg:mt-6 lg:mt-7 lg:mt-8 lg:mt-9 lg:mt-10 lg:mt-11 lg:mt-12 lg:mt-14 lg:mt-16 lg:mt-20 lg:mt-24
lg:mr-0 lg:mr-1 lg:mr-2 lg:mr-3 lg:mr-4 lg:mr-5 lg:mr-6 lg:mr-7 lg:mr-8 lg:mr-9 lg:mr-10 lg:mr-11 lg:mr-12 lg:mr-14 lg:mr-16 lg:mr-20 lg:mr-24
lg:mb-0 lg:mb-1 lg:mb-2 lg:mb-3 lg:mb-4 lg:mb-5 lg:mb-6 lg:mb-7 lg:mb-8 lg:mb-9 lg:mb-10 lg:mb-11 lg:mb-12 lg:mb-14 lg:mb-16 lg:mb-20 lg:mb-24
lg:ml-0 lg:ml-1 lg:ml-2 lg:ml-3 lg:ml-4 lg:ml-5 lg:ml-6 lg:ml-7 lg:ml-8 lg:ml-9 lg:ml-10 lg:ml-11 lg:ml-12 lg:ml-14 lg:ml-16 lg:ml-20 lg:ml-24
lg:ms-0 lg:ms-1 lg:ms-2 lg:ms-3 lg:ms-4 lg:ms-5 lg:ms-6 lg:ms-7 lg:ms-8 lg:ms-9 lg:ms-10 lg:ms-11 lg:ms-12 lg:ms-14 lg:ms-16 lg:ms-20 lg:ms-24
lg:me-0 lg:me-1 lg:me-2 lg:me-3 lg:me-4 lg:me-5 lg:me-6 lg:me-7 lg:me-8 lg:me-9 lg:me-10 lg:me-11 lg:me-12 lg:me-14 lg:me-16 lg:me-20 lg:me-24

lg:-m-0 lg:-m-1 lg:-m-2 lg:-m-3 lg:-m-4 lg:-m-5 lg:-m-6 lg:-m-7 lg:-m-8 lg:-m-9 lg:-m-10 lg:-m-11 lg:-m-12 lg:-m-14 lg:-m-16 lg:-m-20 lg:-m-24
lg:-mx-0 lg:-mx-1 lg:-mx-2 lg:-mx-3 lg:-mx-4 lg:-mx-5 lg:-mx-6 lg:-mx-7 lg:-mx-8 lg:-mx-9 lg:-mx-10 lg:-mx-11 lg:-mx-12 lg:-mx-14 lg:-mx-16 lg:-mx-20 lg:-mx-24
lg:-my-0 lg:-my-1 lg:-my-2 lg:-my-3 lg:-my-4 lg:-my-5 lg:-my-6 lg:-my-7 lg:-my-8 lg:-my-9 lg:-my-10 lg:-my-11 lg:-my-12 lg:-my-14 lg:-my-16 lg:-my-20 lg:-my-24
lg:-mt-0 lg:-mt-1 lg:-mt-2 lg:-mt-3 lg:-mt-4 lg:-mt-5 lg:-mt-6 lg:-mt-7 lg:-mt-8 lg:-mt-9 lg:-mt-10 lg:-mt-11 lg:-mt-12 lg:-mt-14 lg:-mt-16 lg:-mt-20 lg:-mt-24
lg:-mr-0 lg:-mr-1 lg:-mr-2 lg:-mr-3 lg:-mr-4 lg:-mr-5 lg:-mr-6 lg:-mr-7 lg:-mr-8 lg:-mr-9 lg:-mr-10 lg:-mr-11 lg:-mr-12 lg:-mr-14 lg:-mr-16 lg:-mr-20 lg:-mr-24
lg:-mb-0 lg:-mb-1 lg:-mb-2 lg:-mb-3 lg:-mb-4 lg:-mb-5 lg:-mb-6 lg:-mb-7 lg:-mb-8 lg:-mb-9 lg:-mb-10 lg:-mb-11 lg:-mb-12 lg:-mb-14 lg:-mb-16 lg:-mb-20 lg:-mb-24
lg:-ml-0 lg:-ml-1 lg:-ml-2 lg:-ml-3 lg:-ml-4 lg:-ml-5 lg:-ml-6 lg:-ml-7 lg:-ml-8 lg:-ml-9 lg:-ml-10 lg:-ml-11 lg:-ml-12 lg:-ml-14 lg:-ml-16 lg:-ml-20 lg:-ml-24
lg:-ms-0 lg:-ms-1 lg:-ms-2 lg:-ms-3 lg:-ms-4 lg:-ms-5 lg:-ms-6 lg:-ms-7 lg:-ms-8 lg:-ms-9 lg:-ms-10 lg:-ms-11 lg:-ms-12 lg:-ms-14 lg:-ms-16 lg:-ms-20 lg:-ms-24
lg:-me-0 lg:-me-1 lg:-me-2 lg:-me-3 lg:-me-4 lg:-me-5 lg:-me-6 lg:-me-7 lg:-me-8 lg:-me-9 lg:-me-10 lg:-me-11 lg:-me-12 lg:-me-14 lg:-me-16 lg:-me-20 lg:-me-24

lg:p-0 lg:p-1 lg:p-2 lg:p-3 lg:p-4 lg:p-5 lg:p-6 lg:p-7 lg:p-8 lg:p-9 lg:p-10 lg:p-11 lg:p-12 lg:p-14 lg:p-16 lg:p-20 lg:p-24
lg:px-0 lg:px-1 lg:px-2 lg:px-3 lg:px-4 lg:px-5 lg:px-6 lg:px-7 lg:px-8 lg:px-9 lg:px-10 lg:px-11 lg:px-12 lg:px-14 lg:px-16 lg:px-20 lg:px-24
lg:py-0 lg:py-1 lg:py-2 lg:py-3 lg:py-4 lg:py-5 lg:py-6 lg:py-7 lg:py-8 lg:py-9 lg:py-10 lg:py-11 lg:py-12 lg:py-14 lg:py-16 lg:py-20 lg:py-24
lg:pt-0 lg:pt-1 lg:pt-2 lg:pt-3 lg:pt-4 lg:pt-5 lg:pt-6 lg:pt-7 lg:pt-8 lg:pt-9 lg:pt-10 lg:pt-11 lg:pt-12 lg:pt-14 lg:pt-16 lg:pt-20 lg:pt-24
lg:pr-0 lg:pr-1 lg:pr-2 lg:pr-3 lg:pr-4 lg:pr-5 lg:pr-6 lg:pr-7 lg:pr-8 lg:pr-9 lg:pr-10 lg:pr-11 lg:pr-12 lg:pr-14 lg:pr-16 lg:pr-20 lg:pr-24
lg:pb-0 lg:pb-1 lg:pb-2 lg:pb-3 lg:pb-4 lg:pb-5 lg:pb-6 lg:pb-7 lg:pb-8 lg:pb-9 lg:pb-10 lg:pb-11 lg:pb-12 lg:pb-14 lg:pb-16 lg:pb-20 lg:pb-24
lg:pl-0 lg:pl-1 lg:pl-2 lg:pl-3 lg:pl-4 lg:pl-5 lg:pl-6 lg:pl-7 lg:pl-8 lg:pl-9 lg:pl-10 lg:pl-11 lg:pl-12 lg:pl-14 lg:pl-16 lg:pl-20 lg:pl-24
lg:ps-0 lg:ps-1 lg:ps-2 lg:ps-3 lg:ps-4 lg:ps-5 lg:ps-6 lg:ps-7 lg:ps-8 lg:ps-9 lg:ps-10 lg:ps-11 lg:ps-12 lg:ps-14 lg:ps-16 lg:ps-20 lg:ps-24
lg:pe-0 lg:pe-1 lg:pe-2 lg:pe-3 lg:pe-4 lg:pe-5 lg:pe-6 lg:pe-7 lg:pe-8 lg:pe-9 lg:pe-10 lg:pe-11 lg:pe-12 lg:pe-14 lg:pe-16 lg:pe-20 lg:pe-24

lg:gap-0 lg:gap-1 lg:gap-2 lg:gap-3 lg:gap-4 lg:gap-5 lg:gap-6 lg:gap-7 lg:gap-8 lg:gap-9 lg:gap-10 lg:gap-11 lg:gap-12 lg:gap-14 lg:gap-16 lg:gap-20 lg:gap-24
lg:gap-x-0 lg:gap-x-1 lg:gap-x-2 lg:gap-x-3 lg:gap-x-4 lg:gap-x-5 lg:gap-x-6 lg:gap-x-7 lg:gap-x-8 lg:gap-x-9 lg:gap-x-10 lg:gap-x-11 lg:gap-x-12 lg:gap-x-14 lg:gap-x-16 lg:gap-x-20 lg:gap-x-24
lg:gap-y-0 lg:gap-y-1 lg:gap-y-2 lg:gap-y-3 lg:gap-y-4 lg:gap-y-5 lg:gap-y-6 lg:gap-y-7 lg:gap-y-8 lg:gap-y-9 lg:gap-y-10 lg:gap-y-11 lg:gap-y-12 lg:gap-y-14 lg:gap-y-16 lg:gap-y-20 lg:gap-y-24

xl:m-0 xl:m-1 xl:m-2 xl:m-3 xl:m-4 xl:m-5 xl:m-6 xl:m-7 xl:m-8 xl:m-9 xl:m-10 xl:m-11 xl:m-12 xl:m-14 xl:m-16 xl:m-20 xl:m-24
xl:mx-0 xl:mx-1 xl:mx-2 xl:mx-3 xl:mx-4 xl:mx-5 xl:mx-6 xl:mx-7 xl:mx-8 xl:mx-9 xl:mx-10 xl:mx-11 xl:mx-12 xl:mx-14 xl:mx-16 xl:mx-20 xl:mx-24
xl:my-0 xl:my-1 xl:my-2 xl:my-3 xl:my-4 xl:my-5 xl:my-6 xl:my-7 xl:my-8 xl:my-9 xl:my-10 xl:my-11 xl:my-12 xl:my-14 xl:my-16 xl:my-20 xl:my-24
xl:mt-0 xl:mt-1 xl:mt-2 xl:mt-3 xl:mt-4 xl:mt-5 xl:mt-6 xl:mt-7 xl:mt-8 xl:mt-9 xl:mt-10 xl:mt-11 xl:mt-12 xl:mt-14 xl:mt-16 xl:mt-20 xl:mt-24
xl:mr-0 xl:mr-1 xl:mr-2 xl:mr-3 xl:mr-4 xl:mr-5 xl:mr-6 xl:mr-7 xl:mr-8 xl:mr-9 xl:mr-10 xl:mr-11 xl:mr-12 xl:mr-14 xl:mr-16 xl:mr-20 xl:mr-24
xl:mb-0 xl:mb-1 xl:mb-2 xl:mb-3 xl:mb-4 xl:mb-5 xl:mb-6 xl:mb-7 xl:mb-8 xl:mb-9 xl:mb-10 xl:mb-11 xl:mb-12 xl:mb-14 xl:mb-16 xl:mb-20 xl:mb-24
xl:ml-0 xl:ml-1 xl:ml-2 xl:ml-3 xl:ml-4 xl:ml-5 xl:ml-6 xl:ml-7 xl:ml-8 xl:ml-9 xl:ml-10 xl:ml-11 xl:ml-12 xl:ml-14 xl:ml-16 xl:ml-20 xl:ml-24
xl:ms-0 xl:ms-1 xl:ms-2 xl:ms-3 xl:ms-4 xl:ms-5 xl:ms-6 xl:ms-7 xl:ms-8 xl:ms-9 xl:ms-10 xl:ms-11 xl:ms-12 xl:ms-14 xl:ms-16 xl:ms-20 xl:ms-24
xl:me-0 xl:me-1 xl:me-2 xl:me-3 xl:me-4 xl:me-5 xl:me-6 xl:me-7 xl:me-8 xl:me-9 xl:me-10 xl:me-11 xl:me-12 xl:me-14 xl:me-16 xl:me-20 xl:me-24

xl:-m-0 xl:-m-1 xl:-m-2 xl:-m-3 xl:-m-4 xl:-m-5 xl:-m-6 xl:-m-7 xl:-m-8 xl:-m-9 xl:-m-10 xl:-m-11 xl:-m-12 xl:-m-14 xl:-m-16 xl:-m-20 xl:-m-24
xl:-mx-0 xl:-mx-1 xl:-mx-2 xl:-mx-3 xl:-mx-4 xl:-mx-5 xl:-mx-6 xl:-mx-7 xl:-mx-8 xl:-mx-9 xl:-mx-10 xl:-mx-11 xl:-mx-12 xl:-mx-14 xl:-mx-16 xl:-mx-20 xl:-mx-24
xl:-my-0 xl:-my-1 xl:-my-2 xl:-my-3 xl:-my-4 xl:-my-5 xl:-my-6 xl:-my-7 xl:-my-8 xl:-my-9 xl:-my-10 xl:-my-11 xl:-my-12 xl:-my-14 xl:-my-16 xl:-my-20 xl:-my-24
xl:-mt-0 xl:-mt-1 xl:-mt-2 xl:-mt-3 xl:-mt-4 xl:-mt-5 xl:-mt-6 xl:-mt-7 xl:-mt-8 xl:-mt-9 xl:-mt-10 xl:-mt-11 xl:-mt-12 xl:-mt-14 xl:-mt-16 xl:-mt-20 xl:-mt-24
xl:-mr-0 xl:-mr-1 xl:-mr-2 xl:-mr-3 xl:-mr-4 xl:-mr-5 xl:-mr-6 xl:-mr-7 xl:-mr-8 xl:-mr-9 xl:-mr-10 xl:-mr-11 xl:-mr-12 xl:-mr-14 xl:-mr-16 xl:-mr-20 xl:-mr-24
xl:-mb-0 xl:-mb-1 xl:-mb-2 xl:-mb-3 xl:-mb-4 xl:-mb-5 xl:-mb-6 xl:-mb-7 xl:-mb-8 xl:-mb-9 xl:-mb-10 xl:-mb-11 xl:-mb-12 xl:-mb-14 xl:-mb-16 xl:-mb-20 xl:-mb-24
xl:-ml-0 xl:-ml-1 xl:-ml-2 xl:-ml-3 xl:-ml-4 xl:-ml-5 xl:-ml-6 xl:-ml-7 xl:-ml-8 xl:-ml-9 xl:-ml-10 xl:-ml-11 xl:-ml-12 xl:-ml-14 xl:-ml-16 xl:-ml-20 xl:-ml-24
xl:-ms-0 xl:-ms-1 xl:-ms-2 xl:-ms-3 xl:-ms-4 xl:-ms-5 xl:-ms-6 xl:-ms-7 xl:-ms-8 xl:-ms-9 xl:-ms-10 xl:-ms-11 xl:-ms-12 xl:-ms-14 xl:-ms-16 xl:-ms-20 xl:-ms-24
xl:-me-0 xl:-me-1 xl:-me-2 xl:-me-3 xl:-me-4 xl:-me-5 xl:-me-6 xl:-me-7 xl:-me-8 xl:-me-9 xl:-me-10 xl:-me-11 xl:-me-12 xl:-me-14 xl:-me-16 xl:-me-20 xl:-me-24

xl:p-0 xl:p-1 xl:p-2 xl:p-3 xl:p-4 xl:p-5 xl:p-6 xl:p-7 xl:p-8 xl:p-9 xl:p-10 xl:p-11 xl:p-12 xl:p-14 xl:p-16 xl:p-20 xl:p-24
xl:px-0 xl:px-1 xl:px-2 xl:px-3 xl:px-4 xl:px-5 xl:px-6 xl:px-7 xl:px-8 xl:px-9 xl:px-10 xl:px-11 xl:px-12 xl:px-14 xl:px-16 xl:px-20 xl:px-24
xl:py-0 xl:py-1 xl:py-2 xl:py-3 xl:py-4 xl:py-5 xl:py-6 xl:py-7 xl:py-8 xl:py-9 xl:py-10 xl:py-11 xl:py-12 xl:py-14 xl:py-16 xl:py-20 xl:py-24
xl:pt-0 xl:pt-1 xl:pt-2 xl:pt-3 xl:pt-4 xl:pt-5 xl:pt-6 xl:pt-7 xl:pt-8 xl:pt-9 xl:pt-10 xl:pt-11 xl:pt-12 xl:pt-14 xl:pt-16 xl:pt-20 xl:pt-24
xl:pr-0 xl:pr-1 xl:pr-2 xl:pr-3 xl:pr-4 xl:pr-5 xl:pr-6 xl:pr-7 xl:pr-8 xl:pr-9 xl:pr-10 xl:pr-11 xl:pr-12 xl:pr-14 xl:pr-16 xl:pr-20 xl:pr-24
xl:pb-0 xl:pb-1 xl:pb-2 xl:pb-3 xl:pb-4 xl:pb-5 xl:pb-6 xl:pb-7 xl:pb-8 xl:pb-9 xl:pb-10 xl:pb-11 xl:pb-12 xl:pb-14 xl:pb-16 xl:pb-20 xl:pb-24
xl:pl-0 xl:pl-1 xl:pl-2 xl:pl-3 xl:pl-4 xl:pl-5 xl:pl-6 xl:pl-7 xl:pl-8 xl:pl-9 xl:pl-10 xl:pl-11 xl:pl-12 xl:pl-14 xl:pl-16 xl:pl-20 xl:pl-24
xl:ps-0 xl:ps-1 xl:ps-2 xl:ps-3 xl:ps-4 xl:ps-5 xl:ps-6 xl:ps-7 xl:ps-8 xl:ps-9 xl:ps-10 xl:ps-11 xl:ps-12 xl:ps-14 xl:ps-16 xl:ps-20 xl:ps-24
xl:pe-0 xl:pe-1 xl:pe-2 xl:pe-3 xl:pe-4 xl:pe-5 xl:pe-6 xl:pe-7 xl:pe-8 xl:pe-9 xl:pe-10 xl:pe-11 xl:pe-12 xl:pe-14 xl:pe-16 xl:pe-20 xl:pe-24

xl:gap-0 xl:gap-1 xl:gap-2 xl:gap-3 xl:gap-4 xl:gap-5 xl:gap-6 xl:gap-7 xl:gap-8 xl:gap-9 xl:gap-10 xl:gap-11 xl:gap-12 xl:gap-14 xl:gap-16 xl:gap-20 xl:gap-24
xl:gap-x-0 xl:gap-x-1 xl:gap-x-2 xl:gap-x-3 xl:gap-x-4 xl:gap-x-5 xl:gap-x-6 xl:gap-x-7 xl:gap-x-8 xl:gap-x-9 xl:gap-x-10 xl:gap-x-11 xl:gap-x-12 xl:gap-x-14 xl:gap-x-16 xl:gap-x-20 xl:gap-x-24
xl:gap-y-0 xl:gap-y-1 xl:gap-y-2 xl:gap-y-3 xl:gap-y-4 xl:gap-y-5 xl:gap-y-6 xl:gap-y-7 xl:gap-y-8 xl:gap-y-9 xl:gap-y-10 xl:gap-y-11 xl:gap-y-12 xl:gap-y-14 xl:gap-y-16 xl:gap-y-20 xl:gap-y-24

2xl:m-0 2xl:m-1 2xl:m-2 2xl:m-3 2xl:m-4 2xl:m-5 2xl:m-6 2xl:m-7 2xl:m-8 2xl:m-9 2xl:m-10 2xl:m-11 2xl:m-12 2xl:m-14 2xl:m-16 2xl:m-20 2xl:m-24
2xl:mx-0 2xl:mx-1 2xl:mx-2 2xl:mx-3 2xl:mx-4 2xl:mx-5 2xl:mx-6 2xl:mx-7 2xl:mx-8 2xl:mx-9 2xl:mx-10 2xl:mx-11 2xl:mx-12 2xl:mx-14 2xl:mx-16 2xl:mx-20 2xl:mx-24
2xl:my-0 2xl:my-1 2xl:my-2 2xl:my-3 2xl:my-4 2xl:my-5 2xl:my-6 2xl:my-7 2xl:my-8 2xl:my-9 2xl:my-10 2xl:my-11 2xl:my-12 2xl:my-14 2xl:my-16 2xl:my-20 2xl:my-24
2xl:mt-0 2xl:mt-1 2xl:mt-2 2xl:mt-3 2xl:mt-4 2xl:mt-5 2xl:mt-6 2xl:mt-7 2xl:mt-8 2xl:mt-9 2xl:mt-10 2xl:mt-11 2xl:mt-12 2xl:mt-14 2xl:mt-16 2xl:mt-20 2xl:mt-24
2xl:mr-0 2xl:mr-1 2xl:mr-2 2xl:mr-3 2xl:mr-4 2xl:mr-5 2xl:mr-6 2xl:mr-7 2xl:mr-8 2xl:mr-9 2xl:mr-10 2xl:mr-11 2xl:mr-12 2xl:mr-14 2xl:mr-16 2xl:mr-20 2xl:mr-24
2xl:mb-0 2xl:mb-1 2xl:mb-2 2xl:mb-3 2xl:mb-4 2xl:mb-5 2xl:mb-6 2xl:mb-7 2xl:mb-8 2xl:mb-9 2xl:mb-10 2xl:mb-11 2xl:mb-12 2xl:mb-14 2xl:mb-16 2xl:mb-20 2xl:mb-24
2xl:ml-0 2xl:ml-1 2xl:ml-2 2xl:ml-3 2xl:ml-4 2xl:ml-5 2xl:ml-6 2xl:ml-7 2xl:ml-8 2xl:ml-9 2xl:ml-10 2xl:ml-11 2xl:ml-12 2xl:ml-14 2xl:ml-16 2xl:ml-20 2xl:ml-24
2xl:ms-0 2xl:ms-1 2xl:ms-2 2xl:ms-3 2xl:ms-4 2xl:ms-5 2xl:ms-6 2xl:ms-7 2xl:ms-8 2xl:ms-9 2xl:ms-10 2xl:ms-11 2xl:ms-12 2xl:ms-14 2xl:ms-16 2xl:ms-20 2xl:ms-24
2xl:me-0 2xl:me-1 2xl:me-2 2xl:me-3 2xl:me-4 2xl:me-5 2xl:me-6 2xl:me-7 2xl:me-8 2xl:me-9 2xl:me-10 2xl:me-11 2xl:me-12 2xl:me-14 2xl:me-16 2xl:me-20 2xl:me-24

2xl:-m-0 2xl:-m-1 2xl:-m-2 2xl:-m-3 2xl:-m-4 2xl:-m-5 2xl:-m-6 2xl:-m-7 2xl:-m-8 2xl:-m-9 2xl:-m-10 2xl:-m-11 2xl:-m-12 2xl:-m-14 2xl:-m-16 2xl:-m-20 2xl:-m-24
2xl:-mx-0 2xl:-mx-1 2xl:-mx-2 2xl:-mx-3 2xl:-mx-4 2xl:-mx-5 2xl:-mx-6 2xl:-mx-7 2xl:-mx-8 2xl:-mx-9 2xl:-mx-10 2xl:-mx-11 2xl:-mx-12 2xl:-mx-14 2xl:-mx-16 2xl:-mx-20 2xl:-mx-24
2xl:-my-0 2xl:-my-1 2xl:-my-2 2xl:-my-3 2xl:-my-4 2xl:-my-5 2xl:-my-6 2xl:-my-7 2xl:-my-8 2xl:-my-9 2xl:-my-10 2xl:-my-11 2xl:-my-12 2xl:-my-14 2xl:-my-16 2xl:-my-20 2xl:-my-24
2xl:-mt-0 2xl:-mt-1 2xl:-mt-2 2xl:-mt-3 2xl:-mt-4 2xl:-mt-5 2xl:-mt-6 2xl:-mt-7 2xl:-mt-8 2xl:-mt-9 2xl:-mt-10 2xl:-mt-11 2xl:-mt-12 2xl:-mt-14 2xl:-mt-16 2xl:-mt-20 2xl:-mt-24
2xl:-mr-0 2xl:-mr-1 2xl:-mr-2 2xl:-mr-3 2xl:-mr-4 2xl:-mr-5 2xl:-mr-6 2xl:-mr-7 2xl:-mr-8 2xl:-mr-9 2xl:-mr-10 2xl:-mr-11 2xl:-mr-12 2xl:-mr-14 2xl:-mr-16 2xl:-mr-20 2xl:-mr-24
2xl:-mb-0 2xl:-mb-1 2xl:-mb-2 2xl:-mb-3 2xl:-mb-4 2xl:-mb-5 2xl:-mb-6 2xl:-mb-7 2xl:-mb-8 2xl:-mb-9 2xl:-mb-10 2xl:-mb-11 2xl:-mb-12 2xl:-mb-14 2xl:-mb-16 2xl:-mb-20 2xl:-mb-24
2xl:-ml-0 2xl:-ml-1 2xl:-ml-2 2xl:-ml-3 2xl:-ml-4 2xl:-ml-5 2xl:-ml-6 2xl:-ml-7 2xl:-ml-8 2xl:-ml-9 2xl:-ml-10 2xl:-ml-11 2xl:-ml-12 2xl:-ml-14 2xl:-ml-16 2xl:-ml-20 2xl:-ml-24
2xl:-ms-0 2xl:-ms-1 2xl:-ms-2 2xl:-ms-3 2xl:-ms-4 2xl:-ms-5 2xl:-ms-6 2xl:-ms-7 2xl:-ms-8 2xl:-ms-9 2xl:-ms-10 2xl:-ms-11 2xl:-ms-12 2xl:-ms-14 2xl:-ms-16 2xl:-ms-20 2xl:-ms-24
2xl:-me-0 2xl:-me-1 2xl:-me-2 2xl:-me-3 2xl:-me-4 2xl:-me-5 2xl:-me-6 2xl:-me-7 2xl:-me-8 2xl:-me-9 2xl:-me-10 2xl:-me-11 2xl:-me-12 2xl:-me-14 2xl:-me-16 2xl:-me-20 2xl:-me-24

2xl:p-0 2xl:p-1 2xl:p-2 2xl:p-3 2xl:p-4 2xl:p-5 2xl:p-6 2xl:p-7 2xl:p-8 2xl:p-9 2xl:p-10 2xl:p-11 2xl:p-12 2xl:p-14 2xl:p-16 2xl:p-20 2xl:p-24
2xl:px-0 2xl:px-1 2xl:px-2 2xl:px-3 2xl:px-4 2xl:px-5 2xl:px-6 2xl:px-7 2xl:px-8 2xl:px-9 2xl:px-10 2xl:px-11 2xl:px-12 2xl:px-14 2xl:px-16 2xl:px-20 2xl:px-24
2xl:py-0 2xl:py-1 2xl:py-2 2xl:py-3 2xl:py-4 2xl:py-5 2xl:py-6 2xl:py-7 2xl:py-8 2xl:py-9 2xl:py-10 2xl:py-11 2xl:py-12 2xl:py-14 2xl:py-16 2xl:py-20 2xl:py-24
2xl:pt-0 2xl:pt-1 2xl:pt-2 2xl:pt-3 2xl:pt-4 2xl:pt-5 2xl:pt-6 2xl:pt-7 2xl:pt-8 2xl:pt-9 2xl:pt-10 2xl:pt-11 2xl:pt-12 2xl:pt-14 2xl:pt-16 2xl:pt-20 2xl:pt-24
2xl:pr-0 2xl:pr-1 2xl:pr-2 2xl:pr-3 2xl:pr-4 2xl:pr-5 2xl:pr-6 2xl:pr-7 2xl:pr-8 2xl:pr-9 2xl:pr-10 2xl:pr-11 2xl:pr-12 2xl:pr-14 2xl:pr-16 2xl:pr-20 2xl:pr-24
2xl:pb-0 2xl:pb-1 2xl:pb-2 2xl:pb-3 2xl:pb-4 2xl:pb-5 2xl:pb-6 2xl:pb-7 2xl:pb-8 2xl:pb-9 2xl:pb-10 2xl:pb-11 2xl:pb-12 2xl:pb-14 2xl:pb-16 2xl:pb-20 2xl:pb-24
2xl:pl-0 2xl:pl-1 2xl:pl-2 2xl:pl-3 2xl:pl-4 2xl:pl-5 2xl:pl-6 2xl:pl-7 2xl:pl-8 2xl:pl-9 2xl:pl-10 2xl:pl-11 2xl:pl-12 2xl:pl-14 2xl:pl-16 2xl:pl-20 2xl:pl-24
2xl:ps-0 2xl:ps-1 2xl:ps-2 2xl:ps-3 2xl:ps-4 2xl:ps-5 2xl:ps-6 2xl:ps-7 2xl:ps-8 2xl:ps-9 2xl:ps-10 2xl:ps-11 2xl:ps-12 2xl:ps-14 2xl:ps-16 2xl:ps-20 2xl:ps-24
2xl:pe-0 2xl:pe-1 2xl:pe-2 2xl:pe-3 2xl:pe-4 2xl:pe-5 2xl:pe-6 2xl:pe-7 2xl:pe-8 2xl:pe-9 2xl:pe-10 2xl:pe-11 2xl:pe-12 2xl:pe-14 2xl:pe-16 2xl:pe-20 2xl:pe-24

2xl:gap-0 2xl:gap-1 2xl:gap-2 2xl:gap-3 2xl:gap-4 2xl:gap-5 2xl:gap-6 2xl:gap-7 2xl:gap-8 2xl:gap-9 2xl:gap-10 2xl:gap-11 2xl:gap-12 2xl:gap-14 2xl:gap-16 2xl:gap-20 2xl:gap-24
2xl:gap-x-0 2xl:gap-x-1 2xl:gap-x-2 2xl:gap-x-3 2xl:gap-x-4 2xl:gap-x-5 2xl:gap-x-6 2xl:gap-x-7 2xl:gap-x-8 2xl:gap-x-9 2xl:gap-x-10 2xl:gap-x-11 2xl:gap-x-12 2xl:gap-x-14 2xl:gap-x-16 2xl:gap-x-20 2xl:gap-x-24
2xl:gap-y-0 2xl:gap-y-1 2xl:gap-y-2 2xl:gap-y-3 2xl:gap-y-4 2xl:gap-y-5 2xl:gap-y-6 2xl:gap-y-7 2xl:gap-y-8 2xl:gap-y-9 2xl:gap-y-10 2xl:gap-y-11 2xl:gap-y-12 2xl:gap-y-14 2xl:gap-y-16 2xl:gap-y-20 2xl:gap-y-24
*/
