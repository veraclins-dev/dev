import { type Table } from '@tanstack/react-table';

import {
  Box,
  Pagination,
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
  const paginationState = table.getState().pagination;
  const currentPage = paginationState.pageIndex + 1;
  const totalPages = table.getPageCount();

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
            value={`${paginationState.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={paginationState.pageSize} />
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
            Page {currentPage} of {totalPages}
          </Typography>
        </Box>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => table.setPageIndex(page - 1)}
          showFirstLast
          ariaLabel="Table pagination"
          maxVisiblePages={5}
          color="secondary"
        />
      </Box>
    </Box>
  );
}
