import { type ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '../../ui';

import { DataTableDragHandle } from './data-table-drag-handle';
import {
  DataTableRowActions,
  type DataTableRowActionsProps,
} from './data-table-row-actions';
import { type WithId } from './types';

export const getDragHandleColumn = <TData extends WithId, TValue>() => {
  return {
    id: 'drag',
    header: () => null,
    cell: ({ row }) => <DataTableDragHandle id={row.original.id} />,
  } as ColumnDef<TData, TValue>;
};

export const getSelectColumn = <TData extends WithId, TValue>() => {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  } as ColumnDef<TData, TValue>;
};

export const getActionsColumn = <
  TData extends WithId,
  TValue,
  T extends object,
>(
  actions: DataTableRowActionsProps<T>['actions'],
) => {
  return {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        actions={actions.map((action) => ({
          ...action,
          // @ts-expect-error testing
          onClick: () => action?.onClick(row.original.id),
        }))}
      />
    ),
  } as ColumnDef<TData, TValue>;
};
