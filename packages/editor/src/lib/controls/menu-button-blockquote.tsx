/// <reference types="@tiptap/extension-blockquote" />
import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonBlockquoteProps = Partial<MenuButtonProps>;

export function MenuButtonBlockquote(props: MenuButtonBlockquoteProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Blockquote"
      shortcutKeys={['mod', 'Shift', 'B']}
      icon="quote"
      isActive={editor?.isActive('blockquote') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleBlockquote()}
      onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      {...props}
    />
  );
}
