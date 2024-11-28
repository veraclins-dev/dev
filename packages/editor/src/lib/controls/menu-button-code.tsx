/// <reference types="@tiptap/extension-code" />
import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonCodeProps = Partial<MenuButtonProps>;

export function MenuButtonCode(props: MenuButtonCodeProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Code"
      shortcutKeys={['mod', 'E']}
      icon="code"
      isActive={editor?.isActive('code') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleCode()}
      onClick={() => editor?.chain().focus().toggleCode().run()}
      {...props}
    />
  );
}
