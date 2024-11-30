import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

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
