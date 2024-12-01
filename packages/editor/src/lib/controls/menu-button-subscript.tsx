/// <reference types="@tiptap/extension-subscript" />
import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonSubscriptProps = Partial<MenuButtonProps>;

export function MenuButtonSubscript(props: MenuButtonSubscriptProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Subscript"
      shortcutKeys={['mod', ',']}
      icon="subscript"
      isActive={editor?.isActive('subscript') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleSubscript()}
      onClick={() => editor?.chain().focus().toggleSubscript().run()}
      {...props}
    />
  );
}
