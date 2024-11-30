import { MenuButton, type MenuButtonProps } from './menu-button';

import { useRichTextEditorContext } from '../rich-text-editor-provider';

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
