import { useCallback, useRef, useState } from 'react';

interface Props<T extends HTMLElement> {
  onLongPress: React.MouseEventHandler<T>;
  onClick: React.MouseEventHandler<T>;
  delay?: number;
  shouldPreventDefault?: boolean;
}

interface ReturnProps<T extends HTMLElement> {
  onMouseDown: React.MouseEventHandler<T>;
  onTouchStart: React.TouchEventHandler<T>;
  onMouseUp: React.MouseEventHandler<T>;
  onMouseLeave: React.MouseEventHandler<T>;
  onTouchEnd: React.TouchEventHandler<T>;
}

export const useLongPress = <T extends HTMLElement>({
  onLongPress,
  onClick,
  shouldPreventDefault = true,
  delay = 500,
}: Props<T>): ReturnProps<T> => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<NodeJS.Timeout>(null);
  const timer = useRef<NodeJS.Timeout>(null);
  const target = useRef<EventTarget & T>(null);

  const handleLongPress: React.MouseEventHandler<T> = useCallback(
    (event) => {
      timer.current = setInterval(() => {
        onLongPress(event);
      }, 200);
    },
    [onLongPress],
  );

  const start = useCallback(
    (event: React.MouseEvent<T, MouseEvent> | React.TouchEvent<T>) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener(
          'touchend',
          preventDefault as EventListener,
          {
            passive: false,
          },
        );
        target.current = event.target as T;
      }
      timeout.current = setTimeout(() => {
        handleLongPress(event as React.MouseEvent<T, MouseEvent>);
        setLongPressTriggered(true);
      }, delay);
    },
    [handleLongPress, delay, shouldPreventDefault],
  );

  const clear = useCallback(
    (
      event: React.MouseEvent<T, MouseEvent> | React.TouchEvent<T>,
      shouldTriggerClick = true,
    ) => {
      timeout.current && clearTimeout(timeout.current);
      timer.current && clearInterval(timer.current);
      shouldTriggerClick &&
        !longPressTriggered &&
        onClick(event as React.MouseEvent<T, MouseEvent>);
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered],
  );

  return {
    onMouseDown: (e) => start(e as React.MouseEvent<T, MouseEvent>),
    onTouchStart: (e) => start(e),
    onMouseUp: (e) => clear(e),
    onMouseLeave: (e) => clear(e, false),
    onTouchEnd: (e) => clear(e),
  };
};

const isTouchEvent = (event: TouchEvent) => {
  return 'touches' in event;
};

const preventDefault = (event: TouchEvent) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};
