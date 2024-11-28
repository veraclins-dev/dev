/// <reference types="@tiptap/extension-italic" />
import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonItalicProps = Partial<MenuButtonProps>;

export function MenuButtonItalic(props: MenuButtonItalicProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Italic"
      shortcutKeys={['mod', 'I']}
      icon="font-italic"
      isActive={editor?.isActive('italic') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleItalic()}
      onClick={() => editor?.chain().focus().toggleItalic().run()}
      {...props}
    />
  );
}
