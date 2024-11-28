import {
  MenuButton,
  type MenuButtonProps,
} from '#app/components/rich-editor/controls/menu-button';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';

export type MenuButtonEditLinkProps = Partial<MenuButtonProps>;

export function MenuButtonEditLink(props: MenuButtonEditLinkProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Link"
      shortcutKeys={['mod', 'Shift', 'U']}
      icon="link-1"
      isActive={editor?.isActive('link')}
      disabled={!editor?.isEditable}
      onClick={() => editor?.commands.openLinkBubbleMenu()}
      {...props}
    />
  );
}
