import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonUnindentProps = Partial<MenuButtonProps>;

export function MenuButtonUnindent(props: MenuButtonUnindentProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Unindent"
      shortcutKeys={['Shift', 'Tab']}
      icon="indent-decrease"
      disabled={!editor?.isEditable || !editor.can().liftListItem('listItem')}
      onClick={() => editor?.chain().focus().liftListItem('listItem').run()}
      {...props}
    />
  );
}
