import { type Table } from '@tanstack/react-table';

import {
  Box,
  Button,
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Typography,
} from '../../ui';

import { type WithId } from './types';

interface DataTablePaginationProps<TData extends WithId> {
  table: Table<TData>;
}

export function DataTablePagination<TData extends WithId>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <Box display="flex" items="center" justify="between" className="px-2">
      <Box flex="1">
        <Typography variant="body2">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </Typography>
      </Box>
      <Box display="flex" items="center" gap={6} className="lg:gap-8">
        <Box display="flex" items="center" gap={2}>
          <Typography variant="body2" className="font-medium">
            Rows per page
          </Typography>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Box>
        <Box
          display="flex"
          items="center"
          justify="center"
          className="w-[100px]"
        >
          <Typography variant="body2" className="font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </Typography>
        </Box>
        <Box display="flex" items="center" gap={2}>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <Typography variant="caption" className="sr-only">
              Go to first page
            </Typography>
            <Icon name="chevron-double-left" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Typography variant="caption" className="sr-only">
              Go to previous page
            </Typography>
            <Icon name="chevron-left" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Typography className="sr-only" variant="caption">
              Go to next page
            </Typography>
            <Icon name="chevron-right" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <Typography className="sr-only" variant="caption">
              Go to last page
            </Typography>
            <Icon name="chevron-double-right" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
