import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonCodeProps = Partial<MenuButtonProps>;

export function MenuButtonCode(props: MenuButtonCodeProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Code"
      shortcutKeys={['mod', 'E']}
      icon="code"
      isActive={editor?.isActive('code') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleCode()}
      onClick={() => editor?.chain().focus().toggleCode().run()}
      {...props}
    />
  );
}
