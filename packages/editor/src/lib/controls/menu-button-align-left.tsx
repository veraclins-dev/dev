/// <reference types="@tiptap/extension-text-align" />
import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonAlignLeftProps = Partial<MenuButtonProps>;

export function MenuButtonAlignLeft(props: MenuButtonAlignLeftProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Left align"
      shortcutKeys={['mod', 'Shift', 'L']}
      icon="text-align-left"
      isActive={editor?.isActive({ textAlign: 'left' }) ?? false}
      disabled={!editor?.isEditable || !editor.can().setTextAlign('left')}
      onClick={() => editor?.chain().focus().setTextAlign('left').run()}
      {...props}
    />
  );
}
