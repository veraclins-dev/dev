/// <reference types="@tiptap/extension-task-list" />
import { useRichTextEditorContext } from '../rich-text-editor-provider';

import { MenuButton, type MenuButtonProps } from './menu-button';

export type MenuButtonTaskListProps = Partial<MenuButtonProps>;

export function MenuButtonTaskList(props: MenuButtonTaskListProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      label="Task checklist"
      shortcutKeys={['mod', 'Shift', '9']}
      icon="check-list"
      isActive={editor?.isActive('taskList') ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleTaskList()}
      onClick={() => editor?.chain().focus().toggleTaskList().run()}
      {...props}
    />
  );
}
