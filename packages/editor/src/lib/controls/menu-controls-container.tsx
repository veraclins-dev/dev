import { type Except } from 'type-fest';

import { Box } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import {
  DebounceRender,
  type DebounceRenderProps,
} from '../utils/debounced-render';

export type MenuControlsContainerProps = {
  /** The set of controls (buttons, etc) to include in the menu bar. */
  children?: React.ReactNode;
  className?: string;
  /**
   * If true, the rendering of the children content here will be debounced, as a
   * way to improve performance. If this component is rendered in the same
   * context as Tiptap's `useEditor` and *not* debounced, then upon every editor
   * interaction (caret movement, character typed, etc.), the entire controls
   * content will re-render, which can bog down the editor, so debouncing is
   * usually recommended. Controls are often expensive to render since they need
   * to check a lot of editor state, with `editor.can()` commands and whatnot.
   */
  debounced?: boolean;
  /**
   * Override the props/options used with debounce rendering such as the wait
   * interval, if `debounced` is true.
   */
  DebounceProps?: Except<DebounceRenderProps, 'children'>;
};

/** Provides consistent spacing between different editor controls components. */
export function MenuControlsContainer({
  children,
  className,
  debounced = true,
  DebounceProps,
}: MenuControlsContainerProps) {
  const content = (
    <Box
      display="flex"
      flexWrap="wrap"
      items="center"
      gapX={1}
      gapY={3}
      className={cn('h-full', className)}
    >
      {children}
    </Box>
  );
  return debounced ? (
    <DebounceRender {...DebounceProps}>{content}</DebounceRender>
  ) : (
    content
  );
}
