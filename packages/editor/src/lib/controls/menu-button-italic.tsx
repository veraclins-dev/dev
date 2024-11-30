import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonItalicProps = Partial<MenuButtonProps>;

export function MenuButtonItalic(props: MenuButtonItalicProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Italic"
      shortcutKeys={['mod', 'I']}
      icon="font-italic"
      isActive={editor?.isActive('italic') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleItalic()}
      onClick={() => editor?.chain().focus().toggleItalic().run()}
      {...props}
    />
  );
}
