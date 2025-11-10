import { type Editor, isNodeSelection, posToDOMRect } from '@tiptap/react';
import { useEffect, useMemo, useRef } from 'react';

import {
  type Measurable,
  Popover,
  PopoverAnchor,
  type PopoverAnchorProps,
  PopoverContent,
} from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

export type ControlledBubbleMenuProps = {
  editor: Editor;
  open: boolean;
  children: React.ReactNode;
  /** Class applied to the root Popper element. */
  className?: string;
  anchorEl?: PopoverAnchorProps['anchorEl'];
};

// The `BubbleMenu` React component provided by Tiptap in @tiptap/react and the
// underlying BubbleMenuPlugin don't work very well in practice. There are two
// primary problems:
// 1) BubbleMenu places its tippy DOM element *within* the editor DOM structure,
//    so it can get clipped by the edges of the editor, especially noticeable
//    when there is no content in the editor yet (so it'll get sliced off at the
//    top of the editor). It's not possible to use a React Portal there as a
//    workaround due to the way in which the element is dynamically
//    created/destroyed via tippy inside Tiptap, preventing interactivity (see
//    https://github.com/ueberdosis/tiptap/issues/2292).
// 2) The BubbleMenu visibility cannot be controlled programmatically. Its
//    `shouldShow` callback only runs when editor internal state changes, so we
//    can't control it beyond that without wacky hacks. See the issue here
//    https://github.com/ueberdosis/tiptap/issues/2305.
//
// This alternative component has a simpler API, with just an `open` flag, which
// properly responds to all changes in React props, and it uses MUI's Popper
// rather than relying on tippy, so we inherently get "Portal" behavior and
// don't have to worry about visual clipping.
export function ControlledBubbleMenu({
  editor,
  open,
  className,
  children,
  anchorEl,
}: ControlledBubbleMenuProps) {
  const anchorRef = useRef<Measurable | null>(null);

  const defaultAnchorEl = useMemo(() => {
    // The logic here is taken from the positioning implementation in Tiptap's BubbleMenuPlugin
    // https://github.com/ueberdosis/tiptap/blob/16bec4e9d0c99feded855b261edb6e0d3f0bad21/packages/extension-bubble-menu/src/bubble-menu-plugin.ts#L183-L193
    const { ranges } = editor.state.selection;
    const from = Math.min(...ranges.map((range) => range.$from.pos));
    const to = Math.max(...ranges.map((range) => range.$to.pos));

    return {
      getBoundingClientRect: () => {
        if (isNodeSelection(editor.state.selection)) {
          const node = editor.view.nodeDOM(from);

          if (node instanceof HTMLElement) {
            return node.getBoundingClientRect();
          }
        }

        return posToDOMRect(editor.view, from, to);
      },
    };
  }, [editor]);

  useEffect(() => {
    if (anchorEl || defaultAnchorEl) {
      anchorRef.current = anchorEl ?? defaultAnchorEl;
    }
  }, [anchorEl, defaultAnchorEl]);

  return (
    <Popover open={open}>
      <PopoverAnchor virtualRef={anchorRef as React.RefObject<Measurable>} />
      <PopoverContent className={cn('z-30 w-80', className)} arrow>
        {children}
      </PopoverContent>
    </Popover>
  );
}
