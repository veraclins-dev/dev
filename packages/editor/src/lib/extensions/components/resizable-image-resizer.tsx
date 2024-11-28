import { useCallback, useEffect, useState } from 'react';
import { cn } from '@veraclins-dev/utils';

type ResizableImageResizerProps = {
  className?: string;
  onResize: (event: MouseEvent) => void;
};

export function ResizableImageResizer({
  onResize,
  className,
}: ResizableImageResizerProps) {
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      onResize(event);
    };

    if (mouseDown) {
      // If the user is currently holding down the resize handle, we'll have mouse
      // movements fire the onResize callback (since the user would be "dragging" the
      // handle)
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseDown, onResize]);

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = useCallback((_event: React.MouseEvent) => {
    setMouseDown(true);
  }, []);

  return (
    // There isn't a great role to use here (perhaps role="separator" is the
    // closest, as described here https://stackoverflow.com/a/43022983/4543977,
    // but we don't do keyboard-based resizing at this time so it doesn't make
    // sense to have it keyboard focusable)
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      // here, and allow users to override the aria-label when that happens to
      // support localization.
      aria-label="resize image"
      className={cn(
        'image-resizer absolute -bottom-1 -right-1 h-3 w-3 cursor-nwse-resize bg-primary',
        className,
      )}
      onMouseDown={handleMouseDown}
    />
  );
}
