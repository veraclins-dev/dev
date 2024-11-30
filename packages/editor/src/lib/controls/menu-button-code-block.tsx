import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonCodeBlockProps = Partial<MenuButtonProps>;

export function MenuButtonCodeBlock(props: MenuButtonCodeBlockProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Code block"
      shortcutKeys={['mod', 'Alt', 'C']}
      icon="curly-braces"
      isActive={editor?.isActive('codeBlock') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleCodeBlock()}
      onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
      {...props}
    />
  );
}
