/// <reference types="@tiptap/extension-text-align" />
import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

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
