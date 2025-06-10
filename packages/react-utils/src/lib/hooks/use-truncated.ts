import { useEffect, useRef, useState } from 'react';

function isTextTruncated(element: HTMLElement | null): boolean {
  try {
    if (!element || !(element instanceof HTMLElement)) {
      return false;
    }

    const style = window.getComputedStyle(element);
    const { scrollWidth, clientWidth, scrollHeight, clientHeight } = element;
    const overflowX = style.overflowX;
    const overflowY = style.overflowY;

    const isHorizontalOverflow = scrollWidth > clientWidth;
    const hasHorizontalOverflowControl =
      overflowX === 'hidden' || overflowX === 'scroll';
    const isVerticalOverflow = scrollHeight > clientHeight;
    const hasVerticalOverflowControl =
      overflowY === 'hidden' || overflowY === 'scroll';

    return (
      (isHorizontalOverflow && hasHorizontalOverflowControl) ||
      (isVerticalOverflow && hasVerticalOverflowControl)
    );
  } catch (error) {
    console.error('Error checking text truncation:', error);
    return false;
  }
}

export function useTruncated<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const checkTruncation = () => {
    if (ref.current) {
      setIsTruncated(isTextTruncated(ref.current));
    }
  };

  useEffect(() => {
    checkTruncation();

    const observer = new ResizeObserver(() => {
      checkTruncation();
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    const handleResize = () => {
      checkTruncation();
    };
    window.addEventListener('resize', handleResize);
    const current = ref.current;
    return () => {
      if (current) {
        observer.unobserve(current);
      }
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { ref, isTruncated };
}
