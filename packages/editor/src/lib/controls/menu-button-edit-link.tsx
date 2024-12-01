import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

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
