import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonHorizontalRuleProps = Partial<MenuButtonProps>;

export function MenuButtonHorizontalRule(props: MenuButtonHorizontalRuleProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Insert horizontal line"
      icon="divider-horizontal"
      disabled={!editor?.isEditable || !editor.can().setHorizontalRule()}
      onClick={() => editor?.chain().focus().setHorizontalRule().run()}
      {...props}
    />
  );
}
