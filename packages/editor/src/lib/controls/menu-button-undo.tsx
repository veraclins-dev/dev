import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonUndoProps = Partial<MenuButtonProps>;

export function MenuButtonUndo(props: MenuButtonUndoProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Undo"
      shortcutKeys={['mod', 'Z']}
      icon="undo"
      disabled={!editor?.isEditable || !editor.can().undo()}
      onClick={() => editor?.chain().focus().undo().run()}
      {...props}
    />
  );
}
