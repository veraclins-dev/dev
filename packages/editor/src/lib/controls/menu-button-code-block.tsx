/// <reference types="@tiptap/extension-code-block" />

import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonCodeBlockProps = Partial<MenuButtonProps>;

export function MenuButtonCodeBlock(props: MenuButtonCodeBlockProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Code block"
      shortcutKeys={['mod', 'Alt', 'C']}
      icon="curly-braces"
      isActive={editor?.isActive('codeBlock') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleCodeBlock()}
      onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
      {...props}
    />
  );
}
