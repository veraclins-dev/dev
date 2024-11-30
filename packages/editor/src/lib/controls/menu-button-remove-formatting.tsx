import { MenuButton, type MenuButtonProps } from './menu-button';

import { useRichTextEditorContext } from '../rich-text-editor-provider';

export type MenuButtonRemoveFormattingProps = Partial<MenuButtonProps>;

/**
 * A control button removes all inline formatting of marks by calling Tiptap’s
 * unsetAllMarks command (https://tiptap.dev/api/commands/unset-all-marks).
 */
export function MenuButtonRemoveFormatting(
  props: MenuButtonRemoveFormattingProps,
) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Remove inline formatting"
      icon="format-clear"
      disabled={!editor?.isEditable || !editor.can().unsetAllMarks()}
      onClick={() => editor?.chain().focus().unsetAllMarks().run()}
      {...props}
    />
  );
}
