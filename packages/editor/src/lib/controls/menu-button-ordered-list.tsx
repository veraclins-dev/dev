/// <reference types="@tiptap/extension-ordered-list" />
import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonOrderedListProps = Partial<MenuButtonProps>;

export function MenuButtonOrderedList(props: MenuButtonOrderedListProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Ordered list"
      shortcutKeys={['mod', 'Shift', '7']}
      icon="ordered-list"
      isActive={editor?.isActive('orderedList') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleOrderedList()}
      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      {...props}
    />
  );
}
