export interface ScrollPosition {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

export interface ScrollPositionOptions {
  direction: 'vertical' | 'horizontal';
}

export const getScrollPosition = (
  element: HTMLElement,
  options: ScrollPositionOptions,
): ScrollPosition => {
  const { direction } = options;

  if (direction === 'vertical') {
    const { scrollTop, scrollHeight, clientHeight } = element;
    return {
      top: scrollTop > 0,
      bottom: scrollTop + clientHeight < scrollHeight,
      left: false,
      right: false,
    };
  }

  const { scrollLeft, scrollWidth, clientWidth } = element;
  return {
    top: false,
    bottom: false,
    left: scrollLeft > 0,
    right: scrollLeft + clientWidth < scrollWidth,
  };
};
