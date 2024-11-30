import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonStrikethroughProps = Partial<MenuButtonProps>;

export function MenuButtonStrikethrough(props: MenuButtonStrikethroughProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Strikethrough"
      shortcutKeys={['mod', 'Shift', 'X']}
      icon="strikethrough"
      isActive={editor?.isActive('strike') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleStrike()}
      onClick={() => editor?.chain().focus().toggleStrike().run()}
      {...props}
    />
  );
}
