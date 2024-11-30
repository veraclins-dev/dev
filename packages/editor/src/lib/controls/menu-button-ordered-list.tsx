import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonOrderedListProps = Partial<MenuButtonProps>;

export function MenuButtonOrderedList(props: MenuButtonOrderedListProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Ordered list"
      shortcutKeys={['mod', 'Shift', '7']}
      icon="ordered-list"
      isActive={editor?.isActive('orderedList') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleOrderedList()}
      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      {...props}
    />
  );
}
