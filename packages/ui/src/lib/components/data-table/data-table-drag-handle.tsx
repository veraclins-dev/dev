import { useSortable } from '@dnd-kit/sortable';

import { ButtonBase as Button, Icon } from '../../ui';

import { type WithId } from './types';

export function DataTableDragHandle({ id }: WithId) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="text"
      color="accent"
      size="icon"
      className="text-muted-foreground hover:bg-transparent p-0"
    >
      <Icon
        name="drag-handle-dots-2"
        size="md"
        className="text-muted-foreground"
      />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}
