/// <reference types="@tiptap/extension-horizontal-rule" />
import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

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
