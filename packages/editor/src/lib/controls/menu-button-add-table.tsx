import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonAddTableProps = Partial<MenuButtonProps>;

export function MenuButtonAddTable(props: MenuButtonAddTableProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Insert table"
      icon="table"
      disabled={!editor?.isEditable || !editor.can().insertTable()}
      onClick={() =>
        editor
          ?.chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run()
      }
      {...props}
    />
  );
}
