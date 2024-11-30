/// <reference types="@tiptap/starter-kit" />
import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

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
