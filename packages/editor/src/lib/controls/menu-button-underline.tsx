/// <reference types="@tiptap/extension-underline" />
import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonUnderlineProps = Partial<MenuButtonProps>;

export function MenuButtonUnderline(props: MenuButtonUnderlineProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Underline"
      shortcutKeys={['mod', 'U']}
      icon="underline"
      isActive={editor?.isActive('underline') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleUnderline()}
      onClick={() => editor?.chain().focus().toggleUnderline().run()}
      {...props}
    />
  );
}
