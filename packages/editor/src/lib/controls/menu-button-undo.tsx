/// <reference types="@tiptap/extension-history" />
import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

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
