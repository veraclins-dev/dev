/// <reference types="@tiptap/extension-text-align" />
import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonAlignRightProps = Partial<MenuButtonProps>;

export function MenuButtonAlignRight(props: MenuButtonAlignRightProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Right align"
      shortcutKeys={['mod', 'Shift', 'R']}
      icon="text-align-right"
      isActive={editor?.isActive({ textAlign: 'right' }) ?? false}
      disabled={!editor?.isEditable || !editor.can().setTextAlign('right')}
      onClick={() => editor?.chain().focus().setTextAlign('right').run()}
      {...props}
    />
  );
}
