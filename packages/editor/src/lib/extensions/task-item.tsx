import { TaskItem as TiptapTaskItem } from '@tiptap/extension-task-item';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { TaskItem } from './components/task-item';

export const TaskItemExtension = TiptapTaskItem.extend({
  addNodeView() {
    return ReactNodeViewRenderer(TaskItem);
  },
}).configure({
  nested: true,
});
