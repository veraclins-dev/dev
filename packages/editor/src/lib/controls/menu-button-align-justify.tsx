/// <reference types="@tiptap/extension-text-align" />
import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonAlignJustifyProps = Partial<MenuButtonProps>;

export function MenuButtonAlignJustify(props: MenuButtonAlignJustifyProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Justify"
      shortcutKeys={['mod', 'Shift', 'J']}
      icon="text-align-justify"
      isActive={editor?.isActive({ textAlign: 'justify' }) ?? false}
      disabled={!editor?.isEditable || !editor.can().setTextAlign('justify')}
      onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
      {...props}
    />
  );
}
