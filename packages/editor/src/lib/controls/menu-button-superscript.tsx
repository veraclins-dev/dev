/// <reference types="@tiptap/extension-superscript" />
import { MenuButton, type MenuButtonProps } from './menu-button';

import { useRichTextEditorContext } from '../rich-text-editor-provider';

export type MenuButtonSuperscriptProps = Partial<MenuButtonProps>;

export function MenuButtonSuperscript(props: MenuButtonSuperscriptProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Superscript"
      shortcutKeys={['mod', '.']}
      icon="superscript"
      isActive={editor?.isActive('superscript') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleSuperscript()}
      onClick={() => editor?.chain().focus().toggleSuperscript().run()}
      {...props}
    />
  );
}
