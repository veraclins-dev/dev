/// <reference types="@tiptap/extension-subscript" />
import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonSubscriptProps = Partial<MenuButtonProps>;

export function MenuButtonSubscript(props: MenuButtonSubscriptProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Subscript"
      shortcutKeys={['mod', ',']}
      icon="subscript"
      isActive={editor?.isActive('subscript') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleSubscript()}
      onClick={() => editor?.chain().focus().toggleSubscript().run()}
      {...props}
    />
  );
}
