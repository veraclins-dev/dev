import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonBlockquoteProps = Partial<MenuButtonProps>;

export function MenuButtonBlockquote(props: MenuButtonBlockquoteProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Blockquote"
      shortcutKeys={['mod', 'Shift', 'B']}
      icon="quote"
      isActive={editor?.isActive('blockquote') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleBlockquote()}
      onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      {...props}
    />
  );
}
