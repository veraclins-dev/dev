import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonBulletedListProps = Partial<MenuButtonProps>;

export function MenuButtonBulletedList(props: MenuButtonBulletedListProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Bulleted list"
      shortcutKeys={['mod', 'Shift', '8']}
      icon="list-bullet"
      isActive={editor?.isActive('bulletList') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleBulletList()}
      onClick={() => editor?.chain().focus().toggleBulletList().run()}
      {...props}
    />
  );
}
