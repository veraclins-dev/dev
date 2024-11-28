/// <reference types="@tiptap/extension-strike" />
import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonStrikethroughProps = Partial<MenuButtonProps>;

export function MenuButtonStrikethrough(props: MenuButtonStrikethroughProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Strikethrough"
      shortcutKeys={['mod', 'Shift', 'X']}
      icon="strikethrough"
      isActive={editor?.isActive('strike') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleStrike()}
      onClick={() => editor?.chain().focus().toggleStrike().run()}
      {...props}
    />
  );
}
