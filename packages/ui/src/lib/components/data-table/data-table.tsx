import { type UniqueIdentifier } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
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
  type Table as TanstackTable,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { Box } from '../../ui/box';
import { type ItemOption } from '../../ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';

import { DataTableDndContext } from './data-table-dnd-provider';
import { DataTablePagination } from './data-table-pagination';
import { DataTableRow } from './data-table-row';
import {
  DataTableToolbar,
  type DataTableToolbarProps,
} from './data-table-toolbar';
import { type WithId } from './types';
import { type ColumnConfig, generateColumnsConfig } from './utils';

interface DataTableProps<TData extends WithId, TValue = unknown> {
  disablePagination?: boolean;
  columnsConfig: ColumnConfig<TData, TValue>[];
  data: TData[];
  filters?: DataTableToolbarProps<TData, TValue>['filters'];
  bulkActions?: (table: TanstackTable<TData>) => ItemOption[];
  filterPlaceholder?: string;
  hideToolbar?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is a valid use case
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function DataTable<TData extends WithId, TValue = unknown>({
  disablePagination = false,
  columnsConfig,
  data: initialData,
  filters,
  bulkActions,
  filterPlaceholder,
  hideToolbar = false,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(() => initialData);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const config = useMemo(
    () => generateColumnsConfig(columnsConfig),
    [columnsConfig],
  );

   
  const table = useReactTable({
    data,
    columns: config.columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    enableSorting: !config.draggable,
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
    manualPagination: disablePagination,
  });

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data],
  );

  /**
   * Instead of calling `column.getSize()` on every render for every header
   * and especially every data cell (very expensive),
   * we will calculate all column sizes at once at the root table level in a useMemo
   * and pass the column sizes down as CSS variables to the <table> element.
   *
   * Reference: https://tanstack.com/table/v8/docs/framework/react/examples/column-resizing-performant
   */
  const columnSizing = table.getState().columnSizing;
  const flatHeaders = table.getFlatHeaders();

  const columnSizeVars = useMemo(() => {
    const colSizes: Record<string, string> = {};
    for (let i = 0; i < flatHeaders.length; i++) {
      const header = flatHeaders[i];
      if (!header) continue;

      const meta = header.column.columnDef.meta as
        | { hasExplicitWidth?: boolean }
        | undefined;
      const hasExplicitWidth = meta?.hasExplicitWidth ?? false;

      if (hasExplicitWidth) {
        const size = header.column.getSize();
        colSizes[`--col-${header.column.id}-size`] = `${size}px`;
      }
    }
    return colSizes;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnSizing, flatHeaders]);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {!hideToolbar && (
        <DataTableToolbar
          table={table}
          filters={{
            global: {
              fn: setGlobalFilter,
              value: globalFilter,
            },
            ...filters,
          }}
          bulkActions={bulkActions?.(table)}
          filterPlaceholder={filterPlaceholder}
        />
      )}
      <Box className="rounded-md border">
        <DataTableDndContext dataIds={dataIds} setData={setData}>
          <Box style={columnSizeVars}>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const meta = header.column.columnDef.meta as
                        | { hasExplicitWidth?: boolean; className?: string }
                        | undefined;
                      const hasExplicitWidth = meta?.hasExplicitWidth ?? false;
                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          className={meta?.className}
                          style={
                            hasExplicitWidth
                              ? {
                                  width: `var(--col-${header.column.id}-size)`,
                                  maxWidth: `var(--col-${header.column.id}-size)`,
                                }
                              : undefined
                          }
                        >
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
                        draggable={Boolean(config.draggable)}
                      />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={config.columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </DataTableDndContext>
      </Box>
      {!disablePagination && <DataTablePagination table={table} />}
    </Box>
  );
}

export { DataTable, type DataTableProps };
