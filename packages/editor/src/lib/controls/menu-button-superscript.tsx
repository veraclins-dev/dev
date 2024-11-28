/// <reference types="@tiptap/extension-superscript" />
import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonSuperscriptProps = Partial<MenuButtonProps>;

export function MenuButtonSuperscript(props: MenuButtonSuperscriptProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Superscript"
      shortcutKeys={['mod', '.']}
      icon="superscript"
      isActive={editor?.isActive('superscript') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleSuperscript()}
      onClick={() => editor?.chain().focus().toggleSuperscript().run()}
      {...props}
    />
  );
}
