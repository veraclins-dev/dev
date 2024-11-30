import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonRedoProps = Partial<MenuButtonProps>;

export function MenuButtonRedo(props: MenuButtonRedoProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Redo"
      shortcutKeys={['mod', 'Shift', 'Z']}
      icon="redo"
      disabled={!editor?.isEditable || !editor.can().redo()}
      onClick={() => editor?.chain().focus().redo().run()}
      {...props}
    />
  );
}
