import { useMediaQuery } from './use-media-query';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const useBreakpoint = () => {
  const isXs = useMediaQuery('(max-width: 639px)');
  const isSm = useMediaQuery('(min-width: 640px) and (max-width: 767px)');
  const isMd = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isLg = useMediaQuery('(min-width: 1024px) and (max-width: 1279px)');
  const isXl = useMediaQuery('(min-width: 1280px) and (max-width: 1535px)');
  const is2xl = useMediaQuery('(min-width: 1536px)');

  const breakpoints: { [key in Breakpoint]: boolean } = {
    xs: isXs,
    sm: isSm,
    md: isMd,
    lg: isLg,
    xl: isXl,
    '2xl': is2xl,
  };
  const matched = Object.entries(breakpoints).find(([_, value]) => value);

  return (matched?.[0] || 'xl') as Breakpoint;
};
const breakpoints: Array<Breakpoint> = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const getResponsiveValues = (
  baseValue: number,
  ratios: { [key in Breakpoint]: number },
) => {
  return breakpoints.reduce(
    (acc, key) => {
      acc[key] = baseValue * ratios[key];
      return acc;
    },
    {} as {
      [key in Breakpoint]: number;
    },
  );
};

export { type Breakpoint, getResponsiveValues, useBreakpoint };
