import { useSortable } from '@dnd-kit/sortable';

import { Button, Icon } from '../../ui';

import { type WithId } from './types';

export function DataTableDragHandle({ id }: WithId) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="text"
      color="neutral"
      buttonSize="icon"
      className="hover:bg-transparent p-0"
    >
      <Icon name="drag-handle-dots-2" size="md" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}
