import { findParentNodeClosestToPos, posToDOMRect } from '@tiptap/core';
import { useMemo } from 'react';

import { TableMenuControls } from './controls/table-menu-controls';
import { DebounceRender } from './utils/debounced-render';
import { ControlledBubbleMenu } from './controlled-bubble-menu';
import { useRichTextEditorContext } from './rich-text-editor-provider';

export function TableBubbleMenu() {
  const editor = useRichTextEditorContext();

  // Because the user interactions with the table menu bar buttons unfocus the
  // editor (since it's not part of the editor content), we'll debounce our
  // visual focused state so that we keep the bubble menu open during those
  // interactions. That way we don't close it upon menu bar button click
  // immediately, which can prevent menu button callbacks from working and
  // also undesirably will close the bubble menu rather than keeping it open for
  // future menu interaction.
  // const isEditorFocusedDebounced = useDebouncedFocus({ editor })

  // We want to position the table menu outside the entire table, rather than at the
  // current cursor position, so that it's essentially static even as the table changes
  // in size and doesn't "block" things within the table while you're trying to edit.

  // NOTE: Popper accepts an `anchorEl` prop as an HTML element, virtualElement
  // (https://popper.js.org/docs/v2/virtual-elements/), or a function that returns
  // either. However, if you use a function that return an element, Popper will *not*
  // re-evaluate which element that is except when the function itself changes, or when
  // the Popper `open` state changes
  // (https://github.com/mui/material-ui/blob/5b2583a1c8b227661c4bf4113a79346634ea53af/packages/mui-base/src/PopperUnstyled/PopperUnstyled#L126-L130).
  // As such, we need to return a virtualElement (object with `getBoundingClientRect`)
  // and *not* return an HTML element, since we don't want it to get cached. Otherwise
  // clicking from one table to another will incorrectly get the bubble menu "stuck" on
  // the table that was first used to position the Popper.
  const bubbleMenuAnchorEl = useMemo(
    () =>
      editor
        ? {
            getBoundingClientRect: () => {
              const nearestTableParent = editor.isActive('table')
                ? findParentNodeClosestToPos(
                    editor.state.selection.$anchor,
                    (node) => node.type.name === 'table',
                  )
                : null;
              if (nearestTableParent) {
                const wrapperDomNode = editor.view.nodeDOM(
                  nearestTableParent.pos,
                ) as HTMLElement | null | undefined;

                // The DOM node of a Tiptap table node is a div wrapper, which contains a `table` child.
                // The div wrapper is a block element that fills the entire row, but the table may not be
                // full width, so we want to get our bounding rectangle based on the `table` (to align it
                // with the table itself), not the div. See
                // https://github.com/ueberdosis/tiptap/blob/40a9404c94c7fef7900610c195536384781ae101/packages/extension-table/src/TableView.ts#L69-L71
                const tableDomNode = wrapperDomNode?.querySelector('table');
                if (tableDomNode) {
                  return tableDomNode.getBoundingClientRect();
                }
              }

              // Since we weren't able to find a table from the current user position, that means the user
              // hasn't put their cursor in a table. We'll be hiding the table in this case, but we need
              // to return a bounding rect regardless (can't return `null`), so we use the standard logic
              // based on the current cursor position/selection instead.
              const { ranges } = editor.state.selection;
              const from = Math.min(...ranges.map((range) => range.$from.pos));
              const to = Math.max(...ranges.map((range) => range.$to.pos));
              return posToDOMRect(editor.view, from, to);
            },
          }
        : null,
    [editor],
  );

  if (!editor?.isEditable) {
    return null;
  }

  return (
    <ControlledBubbleMenu
      editor={editor}
      open={editor.isActive('table')}
      anchorEl={bubbleMenuAnchorEl}
    >
      {/* We debounce rendering of the controls to improve performance, since
      otherwise it will be expensive to re-render (since it relies on several
      editor `can` commands, and would otherwise be updating upon every editor
      interaction like caret movement and typing). See DebounceRender for
      more notes on this rationale and approach. */}
      <DebounceRender>
        <TableMenuControls />
      </DebounceRender>
    </ControlledBubbleMenu>
  );
}
