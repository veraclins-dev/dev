import { type UniqueIdentifier } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui';

import { priorities, statuses } from './data/data';
import data from './data/tasks.json';
import { columns } from './columns';
import {
  getActionsColumn,
  getDragHandleColumn,
  getSelectColumn,
} from './data-table-columns';
import { DataTableDndContext } from './data-table-dnd-provider';
import { DataTablePagination } from './data-table-pagination';
import { DataTableRow } from './data-table-row';
import { type DataTableRowActionsProps } from './data-table-row-actions';
import {
  DataTableToolbar,
  type DataTableToolbarProps,
} from './data-table-toolbar';
import { type WithId } from './types';

export interface DataTableProps<
  TData extends WithId,
  TValue,
  T extends object,
> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: DataTableToolbarProps<TData, TValue>['filters'];
  draggable?: boolean | ColumnDef<TData, TValue>;
  selectable?: boolean | ColumnDef<TData, TValue>;
  actions?: DataTableRowActionsProps<T>['actions'];
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function DataTable<
  TData extends { id: UniqueIdentifier },
  TValue,
  T extends object,
>({
  columns: baseColumns,
  data: initialData,
  filters,
  draggable = false,
  selectable = false,
  actions,
}: DataTableProps<TData, TValue, T>) {
  const [data, setData] = useState(() => initialData);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(() => {
    const drag: ColumnDef<TData, TValue> | null =
      typeof draggable === 'object'
        ? draggable
        : draggable
          ? getDragHandleColumn<TData, TValue>()
          : null;
    const select: ColumnDef<TData, TValue> | null =
      typeof selectable === 'object'
        ? selectable
        : selectable
          ? getSelectColumn<TData, TValue>()
          : null;
    const action: ColumnDef<TData, TValue> | null = actions
      ? getActionsColumn<TData, TValue, T>(actions)
      : null;
    const controlColumns = [drag, select].filter(Boolean) as ColumnDef<
      TData,
      TValue
    >[];
    const actionColumns = action ? [action] : [];

    return [...controlColumns, ...baseColumns, ...actionColumns];
  }, [baseColumns]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    enableSorting: !draggable,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data],
  );

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        filters={{
          global: {
            fn: setGlobalFilter,
            value: globalFilter,
          },
          ...filters,
        }}
      />
      <div className="rounded-md border">
        <DataTableDndContext dataIds={dataIds} setData={setData}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DataTableRow
                      key={row.id}
                      row={row}
                      draggable={Boolean(draggable)}
                    />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DataTableDndContext>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

export const DataTableComponent = () => (
  <DataTable
    columns={columns}
    data={data}
    draggable
    selectable
    filters={{
      faceted: {
        status: { options: statuses },
        priority: { options: priorities },
      },
    }}
    actions={[
      {
        label: 'Edit',
        key: 'edit',
        onClick: (row) => {
          console.log('Edit', row);
        },
      },
      {
        label: 'Delete',
        key: 'trash',
        onClick: (row) => {
          console.log('Delete', row);
        },
      },
    ]}
  />
);
