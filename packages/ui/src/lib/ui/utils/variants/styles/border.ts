const borderWidthScale = [0, 1, 2, 3, 4, 5, 6] as const;

const borderRadiusScale = [
  'none',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  'full',
] as const;

type BorderWidthScale = (typeof borderWidthScale)[number];
type BorderRadiusScale = (typeof borderRadiusScale)[number];

function generateBorderWidthVariants(prefix: string) {
  return borderWidthScale.reduce(
    (acc, value) => {
      if (value === 1) {
        acc[value] = prefix;
      } else {
        acc[value] = `${prefix}-${value}`;
      }
      return acc;
    },
    {} as Record<BorderWidthScale, string>,
  );
}

function generateBorderRadiusVariants(prefix: string) {
  return borderRadiusScale.reduce(
    (acc, value) => {
      acc[value] = `${prefix}-${value}`;
      return acc;
    },
    {} as Record<BorderRadiusScale, string>,
  );
}

const borderVariants = {
  border: generateBorderWidthVariants('border'),
  borderTop: generateBorderWidthVariants('border-t'),
  borderRight: generateBorderWidthVariants('border-r'),
  borderBottom: generateBorderWidthVariants('border-b'),
  borderLeft: generateBorderWidthVariants('border-l'),
  borderX: generateBorderWidthVariants('border-x'),
  borderY: generateBorderWidthVariants('border-y'),
  rounded: generateBorderRadiusVariants('rounded'),
  roundedTop: generateBorderRadiusVariants('rounded-t'),
  roundedRight: generateBorderRadiusVariants('rounded-r'),
  roundedBottom: generateBorderRadiusVariants('rounded-b'),
  roundedLeft: generateBorderRadiusVariants('rounded-l'),
  roundedTopLeft: generateBorderRadiusVariants('rounded-tl'),
  roundedTopRight: generateBorderRadiusVariants('rounded-tr'),
  roundedBottomRight: generateBorderRadiusVariants('rounded-br'),
  roundedBottomLeft: generateBorderRadiusVariants('rounded-bl'),
} as const;

type BorderVariants = typeof borderVariants;

export {
  type BorderRadiusScale,
  type BorderVariants,
  borderVariants,
  type BorderWidthScale,
};

/*!
// Base border width variants
border-0 border border-2 border-3 border-4 border-5 border-6
border-t-0 border-t border-t-2 border-t-3 border-t-4 border-t-5 border-t-6
border-r-0 border-r border-r-2 border-r-3 border-r-4 border-r-5 border-r-6
border-b-0 border-b border-b-2 border-b-3 border-b-4 border-b-5 border-b-6
border-l-0 border-l border-l-2 border-l-3 border-l-4 border-l-5 border-l-6
border-x-0 border-x border-x-2 border-x-3 border-x-4 border-x-5 border-x-6
border-y-0 border-y border-y-2 border-y-3 border-y-4 border-y-5 border-y-6

// Base border radius variants
rounded-none rounded-sm rounded-md rounded-lg rounded-xl rounded-2xl rounded-3xl rounded-full
rounded-t-none rounded-t-sm rounded-t-md rounded-t-lg rounded-t-xl rounded-t-2xl rounded-t-3xl rounded-t-full
rounded-r-none rounded-r-sm rounded-r-md rounded-r-lg rounded-r-xl rounded-r-2xl rounded-r-3xl rounded-r-full
rounded-b-none rounded-b-sm rounded-b-md rounded-b-lg rounded-b-xl rounded-b-2xl rounded-b-3xl rounded-b-full
rounded-l-none rounded-l-sm rounded-l-md rounded-l-lg rounded-l-xl rounded-l-2xl rounded-l-3xl rounded-l-full
rounded-tl-none rounded-tl-sm rounded-tl-md rounded-tl-lg rounded-tl-xl rounded-tl-2xl rounded-tl-3xl rounded-tl-full
rounded-tr-none rounded-tr-sm rounded-tr-md rounded-tr-lg rounded-tr-xl rounded-tr-2xl rounded-tr-3xl rounded-tr-full
rounded-br-none rounded-br-sm rounded-br-md rounded-br-lg rounded-br-xl rounded-br-2xl rounded-br-3xl rounded-br-full
rounded-bl-none rounded-bl-sm rounded-bl-md rounded-bl-lg rounded-bl-xl rounded-bl-2xl rounded-bl-3xl rounded-bl-full

// Responsive border width variants
sm:border-0 sm:border sm:border-2 sm:border-3 sm:border-4 sm:border-5 sm:border-6
sm:border-t-0 sm:border-t sm:border-t-2 sm:border-t-3 sm:border-t-4 sm:border-t-5 sm:border-t-6
sm:border-r-0 sm:border-r sm:border-r-2 sm:border-r-3 sm:border-r-4 sm:border-r-5 sm:border-r-6
sm:border-b-0 sm:border-b sm:border-b-2 sm:border-b-3 sm:border-b-4 sm:border-b-5 sm:border-b-6
sm:border-l-0 sm:border-l sm:border-l-2 sm:border-l-3 sm:border-l-4 sm:border-l-5 sm:border-l-6
sm:border-x-0 sm:border-x sm:border-x-2 sm:border-x-3 sm:border-x-4 sm:border-x-5 sm:border-x-6
sm:border-y-0 sm:border-y sm:border-y-2 sm:border-y-3 sm:border-y-4 sm:border-y-5 sm:border-y-6

sm:rounded-none sm:rounded-sm sm:rounded-md sm:rounded-lg sm:rounded-xl sm:rounded-2xl sm:rounded-3xl sm:rounded-full
sm:rounded-t-none sm:rounded-t-sm sm:rounded-t-md sm:rounded-t-lg sm:rounded-t-xl sm:rounded-t-2xl sm:rounded-t-3xl sm:rounded-t-full
sm:rounded-r-none sm:rounded-r-sm sm:rounded-r-md sm:rounded-r-lg sm:rounded-r-xl sm:rounded-r-2xl sm:rounded-r-3xl sm:rounded-r-full
sm:rounded-b-none sm:rounded-b-sm sm:rounded-b-md sm:rounded-b-lg sm:rounded-b-xl sm:rounded-b-2xl sm:rounded-b-3xl sm:rounded-b-full
sm:rounded-l-none sm:rounded-l-sm sm:rounded-l-md sm:rounded-l-lg sm:rounded-l-xl sm:rounded-l-2xl sm:rounded-l-3xl sm:rounded-l-full
sm:rounded-tl-none sm:rounded-tl-sm sm:rounded-tl-md sm:rounded-tl-lg sm:rounded-tl-xl sm:rounded-tl-2xl sm:rounded-tl-3xl sm:rounded-tl-full
sm:rounded-tr-none sm:rounded-tr-sm sm:rounded-tr-md sm:rounded-tr-lg sm:rounded-tr-xl sm:rounded-tr-2xl sm:rounded-tr-3xl sm:rounded-tr-full
sm:rounded-br-none sm:rounded-br-sm sm:rounded-br-md sm:rounded-br-lg sm:rounded-br-xl sm:rounded-br-2xl sm:rounded-br-3xl sm:rounded-br-full
sm:rounded-bl-none sm:rounded-bl-sm sm:rounded-bl-md sm:rounded-bl-lg sm:rounded-bl-xl sm:rounded-bl-2xl sm:rounded-bl-3xl sm:rounded-bl-full

md:border-0 md:border md:border-2 md:border-3 md:border-4 md:border-5 md:border-6
md:border-t-0 md:border-t md:border-t-2 md:border-t-3 md:border-t-4 md:border-t-5 md:border-t-6
md:border-r-0 md:border-r md:border-r-2 md:border-r-3 md:border-r-4 md:border-r-5 md:border-r-6
md:border-b-0 md:border-b md:border-b-2 md:border-b-3 md:border-b-4 md:border-b-5 md:border-b-6
md:border-l-0 md:border-l md:border-l-2 md:border-l-3 md:border-l-4 md:border-l-5 md:border-l-6
md:border-x-0 md:border-x md:border-x-2 md:border-x-3 md:border-x-4 md:border-x-5 md:border-x-6
md:border-y-0 md:border-y md:border-y-2 md:border-y-3 md:border-y-4 md:border-y-5 md:border-y-6

md:rounded-none md:rounded-sm md:rounded-md md:rounded-lg md:rounded-xl md:rounded-2xl md:rounded-3xl md:rounded-full
md:rounded-t-none md:rounded-t-sm md:rounded-t-md md:rounded-t-lg md:rounded-t-xl md:rounded-t-2xl md:rounded-t-3xl md:rounded-t-full
md:rounded-r-none md:rounded-r-sm md:rounded-r-md md:rounded-r-lg md:rounded-r-xl md:rounded-r-2xl md:rounded-r-3xl md:rounded-r-full
md:rounded-b-none md:rounded-b-sm md:rounded-b-md md:rounded-b-lg md:rounded-b-xl md:rounded-b-2xl md:rounded-b-3xl md:rounded-b-full
md:rounded-l-none md:rounded-l-sm md:rounded-l-md md:rounded-l-lg md:rounded-l-xl md:rounded-l-2xl md:rounded-l-3xl md:rounded-l-full
md:rounded-tl-none md:rounded-tl-sm md:rounded-tl-md md:rounded-tl-lg md:rounded-tl-xl md:rounded-tl-2xl md:rounded-tl-3xl md:rounded-tl-full
md:rounded-tr-none md:rounded-tr-sm md:rounded-tr-md md:rounded-tr-lg md:rounded-tr-xl md:rounded-tr-2xl md:rounded-tr-3xl md:rounded-tr-full
md:rounded-br-none md:rounded-br-sm md:rounded-br-md md:rounded-br-lg md:rounded-br-xl md:rounded-br-2xl md:rounded-br-3xl md:rounded-br-full
md:rounded-bl-none md:rounded-bl-sm md:rounded-bl-md md:rounded-bl-lg md:rounded-bl-xl md:rounded-bl-2xl md:rounded-bl-3xl md:rounded-bl-full

lg:border-0 lg:border lg:border-2 lg:border-3 lg:border-4 lg:border-5 lg:border-6
lg:border-t-0 lg:border-t lg:border-t-2 lg:border-t-3 lg:border-t-4 lg:border-t-5 lg:border-t-6
lg:border-r-0 lg:border-r lg:border-r-2 lg:border-r-3 lg:border-r-4 lg:border-r-5 lg:border-r-6
lg:border-b-0 lg:border-b lg:border-b-2 lg:border-b-3 lg:border-b-4 lg:border-b-5 lg:border-b-6
lg:border-l-0 lg:border-l lg:border-l-2 lg:border-l-3 lg:border-l-4 lg:border-l-5 lg:border-l-6
lg:border-x-0 lg:border-x lg:border-x-2 lg:border-x-3 lg:border-x-4 lg:border-x-5 lg:border-x-6
lg:border-y-0 lg:border-y lg:border-y-2 lg:border-y-3 lg:border-y-4 lg:border-y-5 lg:border-y-6

lg:rounded-none lg:rounded-sm lg:rounded-md lg:rounded-lg lg:rounded-xl lg:rounded-2xl lg:rounded-3xl lg:rounded-full
lg:rounded-t-none lg:rounded-t-sm lg:rounded-t-md lg:rounded-t-lg lg:rounded-t-xl lg:rounded-t-2xl lg:rounded-t-3xl lg:rounded-t-full
lg:rounded-r-none lg:rounded-r-sm lg:rounded-r-md lg:rounded-r-lg lg:rounded-r-xl lg:rounded-r-2xl lg:rounded-r-3xl lg:rounded-r-full
lg:rounded-b-none lg:rounded-b-sm lg:rounded-b-md lg:rounded-b-lg lg:rounded-b-xl lg:rounded-b-2xl lg:rounded-b-3xl lg:rounded-b-full
lg:rounded-l-none lg:rounded-l-sm lg:rounded-l-md lg:rounded-l-lg lg:rounded-l-xl lg:rounded-l-2xl lg:rounded-l-3xl lg:rounded-l-full
lg:rounded-tl-none lg:rounded-tl-sm lg:rounded-tl-md lg:rounded-tl-lg lg:rounded-tl-xl lg:rounded-tl-2xl lg:rounded-tl-3xl lg:rounded-tl-full
lg:rounded-tr-none lg:rounded-tr-sm lg:rounded-tr-md lg:rounded-tr-lg lg:rounded-tr-xl lg:rounded-tr-2xl lg:rounded-tr-3xl lg:rounded-tr-full
lg:rounded-br-none lg:rounded-br-sm lg:rounded-br-md lg:rounded-br-lg lg:rounded-br-xl lg:rounded-br-2xl lg:rounded-br-3xl lg:rounded-br-full
lg:rounded-bl-none lg:rounded-bl-sm lg:rounded-bl-md lg:rounded-bl-lg lg:rounded-bl-xl lg:rounded-bl-2xl lg:rounded-bl-3xl lg:rounded-bl-full

xl:border-0 xl:border xl:border-2 xl:border-3 xl:border-4 xl:border-5 xl:border-6
xl:border-t-0 xl:border-t xl:border-t-2 xl:border-t-3 xl:border-t-4 xl:border-t-5 xl:border-t-6
xl:border-r-0 xl:border-r xl:border-r-2 xl:border-r-3 xl:border-r-4 xl:border-r-5 xl:border-r-6
xl:border-b-0 xl:border-b xl:border-b-2 xl:border-b-3 xl:border-b-4 xl:border-b-5 xl:border-b-6
xl:border-l-0 xl:border-l xl:border-l-2 xl:border-l-3 xl:border-l-4 xl:border-l-5 xl:border-l-6
xl:border-x-0 xl:border-x xl:border-x-2 xl:border-x-3 xl:border-x-4 xl:border-x-5 xl:border-x-6
xl:border-y-0 xl:border-y xl:border-y-2 xl:border-y-3 xl:border-y-4 xl:border-y-5 xl:border-y-6

xl:rounded-none xl:rounded-sm xl:rounded-md xl:rounded-lg xl:rounded-xl xl:rounded-2xl xl:rounded-3xl xl:rounded-full
xl:rounded-t-none xl:rounded-t-sm xl:rounded-t-md xl:rounded-t-lg xl:rounded-t-xl xl:rounded-t-2xl xl:rounded-t-3xl xl:rounded-t-full
xl:rounded-r-none xl:rounded-r-sm xl:rounded-r-md xl:rounded-r-lg xl:rounded-r-xl xl:rounded-r-2xl xl:rounded-r-3xl xl:rounded-r-full
xl:rounded-b-none xl:rounded-b-sm xl:rounded-b-md xl:rounded-b-lg xl:rounded-b-xl xl:rounded-b-2xl xl:rounded-b-3xl xl:rounded-b-full
xl:rounded-l-none xl:rounded-l-sm xl:rounded-l-md xl:rounded-l-lg xl:rounded-l-xl xl:rounded-l-2xl xl:rounded-l-3xl xl:rounded-l-full
xl:rounded-tl-none xl:rounded-tl-sm xl:rounded-tl-md xl:rounded-tl-lg xl:rounded-tl-xl xl:rounded-tl-2xl xl:rounded-tl-3xl xl:rounded-tl-full
xl:rounded-tr-none xl:rounded-tr-sm xl:rounded-tr-md xl:rounded-tr-lg xl:rounded-tr-xl xl:rounded-tr-2xl xl:rounded-tr-3xl xl:rounded-tr-full
xl:rounded-br-none xl:rounded-br-sm xl:rounded-br-md xl:rounded-br-lg xl:rounded-br-xl xl:rounded-br-2xl xl:rounded-br-3xl xl:rounded-br-full
xl:rounded-bl-none xl:rounded-bl-sm xl:rounded-bl-md xl:rounded-bl-lg xl:rounded-bl-xl xl:rounded-bl-2xl xl:rounded-bl-3xl xl:rounded-bl-full

2xl:border-0 2xl:border 2xl:border-2 2xl:border-3 2xl:border-4 2xl:border-5 2xl:border-6
2xl:border-t-0 2xl:border-t 2xl:border-t-2 2xl:border-t-3 2xl:border-t-4 2xl:border-t-5 2xl:border-t-6
2xl:border-r-0 2xl:border-r 2xl:border-r-2 2xl:border-r-3 2xl:border-r-4 2xl:border-r-5 2xl:border-r-6
2xl:border-b-0 2xl:border-b 2xl:border-b-2 2xl:border-b-3 2xl:border-b-4 2xl:border-b-5 2xl:border-b-6
2xl:border-l-0 2xl:border-l 2xl:border-l-2 2xl:border-l-3 2xl:border-l-4 2xl:border-l-5 2xl:border-l-6
2xl:border-x-0 2xl:border-x 2xl:border-x-2 2xl:border-x-3 2xl:border-x-4 2xl:border-x-5 2xl:border-x-6
2xl:border-y-0 2xl:border-y 2xl:border-y-2 2xl:border-y-3 2xl:border-y-4 2xl:border-y-5 2xl:border-y-6

2xl:rounded-none 2xl:rounded-sm 2xl:rounded-md 2xl:rounded-lg 2xl:rounded-xl 2xl:rounded-2xl 2xl:rounded-3xl 2xl:rounded-full
2xl:rounded-t-none 2xl:rounded-t-sm 2xl:rounded-t-md 2xl:rounded-t-lg 2xl:rounded-t-xl 2xl:rounded-t-2xl 2xl:rounded-t-3xl 2xl:rounded-t-full
2xl:rounded-r-none 2xl:rounded-r-sm 2xl:rounded-r-md 2xl:rounded-r-lg 2xl:rounded-r-xl 2xl:rounded-r-2xl 2xl:rounded-r-3xl 2xl:rounded-r-full
2xl:rounded-b-none 2xl:rounded-b-sm 2xl:rounded-b-md 2xl:rounded-b-lg 2xl:rounded-b-xl 2xl:rounded-b-2xl 2xl:rounded-b-3xl 2xl:rounded-b-full
2xl:rounded-l-none 2xl:rounded-l-sm 2xl:rounded-l-md 2xl:rounded-l-lg 2xl:rounded-l-xl 2xl:rounded-l-2xl 2xl:rounded-l-3xl 2xl:rounded-l-full
2xl:rounded-tl-none 2xl:rounded-tl-sm 2xl:rounded-tl-md 2xl:rounded-tl-lg 2xl:rounded-tl-xl 2xl:rounded-tl-2xl 2xl:rounded-tl-3xl 2xl:rounded-tl-full
2xl:rounded-tr-none 2xl:rounded-tr-sm 2xl:rounded-tr-md 2xl:rounded-tr-lg 2xl:rounded-tr-xl 2xl:rounded-tr-2xl 2xl:rounded-tr-3xl 2xl:rounded-tr-full
2xl:rounded-br-none 2xl:rounded-br-sm 2xl:rounded-br-md 2xl:rounded-br-lg 2xl:rounded-br-xl 2xl:rounded-br-2xl 2xl:rounded-br-3xl 2xl:rounded-br-full
2xl:rounded-bl-none 2xl:rounded-bl-sm 2xl:rounded-bl-md 2xl:rounded-bl-lg 2xl:rounded-bl-xl 2xl:rounded-bl-2xl 2xl:rounded-bl-3xl 2xl:rounded-bl-full
*/
