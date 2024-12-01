/// <reference types="@tiptap/extension-text-align" />
import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonAlignCenterProps = Partial<MenuButtonProps>;

export function MenuButtonAlignCenter(props: MenuButtonAlignCenterProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Center align"
      shortcutKeys={['mod', 'Shift', 'E']}
      icon="text-align-center"
      isActive={editor?.isActive({ textAlign: 'center' }) ?? false}
      disabled={!editor?.isEditable || !editor.can().setTextAlign('center')}
      onClick={() => editor?.chain().focus().setTextAlign('center').run()}
      {...props}
    />
  );
}
