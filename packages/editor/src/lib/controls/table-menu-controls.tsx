import { MenuButton } from '#app/components/rich-editor/controls/menu-button';
import { MenuControlsContainer } from '#app/components/rich-editor/controls/menu-controls-container';
import { MenuDivider } from '#app/components/rich-editor/controls/menu-divider';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type TableMenuControlsProps = {
  /** Class applied to the root controls container element. */
  className?: string;
};

/**
 * Renders all of the controls for manipulating a table in a Tiptap editor
 * (add or delete columns or rows, merge cells, etc.).
 */
export function TableMenuControls({ className }: TableMenuControlsProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuControlsContainer className={className}>
      <span className="sr-only" tabIndex={0} />
      <MenuButton
        label={'Insert column before'}
        icon="insert-column-left"
        onClick={() => editor?.chain().focus().addColumnBefore().run()}
        disabled={!editor?.can().addColumnBefore()}
      />

      <MenuButton
        label={'Insert column after'}
        icon="insert-column-right"
        onClick={() => editor?.chain().focus().addColumnAfter().run()}
        disabled={!editor?.can().addColumnAfter()}
      />

      <MenuButton
        label={'Delete column'}
        icon="delete-column"
        onClick={() => editor?.chain().focus().deleteColumn().run()}
        disabled={!editor?.can().deleteColumn()}
      />

      <MenuDivider />

      <MenuButton
        label={'Insert row above'}
        icon="insert-row-top"
        onClick={() => editor?.chain().focus().addRowBefore().run()}
        disabled={!editor?.can().addRowBefore()}
      />

      <MenuButton
        label={'Insert row below'}
        icon="insert-row-bottom"
        onClick={() => editor?.chain().focus().addRowAfter().run()}
        disabled={!editor?.can().addRowAfter()}
      />

      <MenuButton
        label={'Delete row'}
        icon="delete-row"
        onClick={() => editor?.chain().focus().deleteRow().run()}
        disabled={!editor?.can().deleteRow()}
      />

      <MenuDivider />

      <MenuButton
        label={'Merge cells'}
        icon="merge-cells-horizontal"
        onClick={() => editor?.chain().focus().mergeCells().run()}
        disabled={!editor?.can().mergeCells()}
      />

      <MenuButton
        label={'Split cell'}
        icon="split-cells-horizontal"
        onClick={() => editor?.chain().focus().splitCell().run()}
        disabled={!editor?.can().splitCell()}
      />

      <MenuDivider />

      <MenuButton
        label={'Toggle header row'}
        icon="layout-row-fill"
        onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
        disabled={!editor?.can().toggleHeaderRow()}
      />

      <MenuButton
        label={'Toggle header column'}
        icon="layout-column-fill"
        onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}
        disabled={!editor?.can().toggleHeaderColumn()}
      />

      <MenuButton
        label={'Toggle header cell'}
        icon="format-color-fill"
        onClick={() => editor?.chain().focus().toggleHeaderCell().run()}
        disabled={!editor?.can().toggleHeaderCell()}
        isActive={editor?.isActive('tableHeader') ?? false}
      />

      <MenuDivider />

      <MenuButton
        label={'Delete table'}
        icon="grid-off"
        onClick={() => editor?.chain().focus().deleteTable().run()}
        disabled={!editor?.can().deleteTable()}
      />
    </MenuControlsContainer>
  );
}
