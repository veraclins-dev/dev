import { useEffect, useRef, useState } from 'react';

import { getScrollPosition } from '@veraclins-dev/react-utils';
import { cn } from '@veraclins-dev/utils';

import { Box } from '../ui';

export interface ScrollFadeProps extends React.ComponentProps<typeof Box> {
  direction?: 'vertical' | 'horizontal';
}

export const ScrollFade = ({
  children,
  className,
  direction = 'vertical',
}: ScrollFadeProps) => {
  const [showFade, setShowFade] = useState({
    top: false,
    bottom: true,
    left: false,
    right: true,
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;

    setShowFade(getScrollPosition(element, { direction }));
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      handleScroll(); // Initial check
      element.addEventListener('scroll', handleScroll);
    }
    return () => element?.removeEventListener('scroll', handleScroll);
  }, [direction]);

  return (
    <Box className={cn('relative', className)}>
      <Box
        ref={scrollRef}
        className={cn(
          'overflow-auto',
          direction === 'vertical'
            ? 'h-full'
            : 'flex flex-nowrap whitespace-nowrap overflow-y-hidden',
        )}
      >
        {children}
      </Box>
      {direction === 'vertical' ? (
        <>
          <Box
            className={cn(
              'absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white transition-opacity duration-300 pointer-events-none',
              showFade.top ? 'opacity-100' : 'opacity-0',
            )}
          />
          <Box
            className={cn(
              'absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white transition-opacity duration-300 pointer-events-none',
              showFade.bottom ? 'opacity-100' : 'opacity-0',
            )}
          />
        </>
      ) : (
        <>
          <Box
            className={cn(
              'absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white transition-opacity duration-300 pointer-events-none',
              showFade.left ? 'opacity-100' : 'opacity-0',
            )}
          />
          <Box
            className={cn(
              'absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white transition-opacity duration-300 pointer-events-none',
              showFade.right ? 'opacity-100' : 'opacity-0',
            )}
          />
        </>
      )}
    </Box>
  );
};
