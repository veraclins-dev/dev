/// <reference types="@tiptap/extension-bold" />
import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonBoldProps = Partial<MenuButtonProps>;

export function MenuButtonBold(props: MenuButtonBoldProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Bold"
      shortcutKeys={['mod', 'B']}
      icon="font-bold"
      isActive={editor?.isActive('bold') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleBold()}
      onClick={() => editor?.chain().focus().toggleBold().run()}
      {...props}
    />
  );
}
