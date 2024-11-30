import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonIndentProps = Partial<MenuButtonProps>;

export function MenuButtonIndent(props: MenuButtonIndentProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Indent"
      shortcutKeys={['Tab']}
      icon="indent-increase"
      disabled={!editor?.isEditable || !editor.can().sinkListItem('listItem')}
      onClick={() => editor?.chain().focus().sinkListItem('listItem').run()}
      {...props}
    />
  );
}
