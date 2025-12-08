import { type Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { useDebounce } from '@veraclins-dev/react-utils';

import { Box } from '../../ui/box';
import { Button } from '../../ui/button';
import { ComposedDropdownMenu, type ItemOption } from '../../ui/dropdown-menu';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';
import { type DataTableFacetedFilterProps, type WithId } from './types';

type GlobalFilter = {
  fn: (value: string) => void;
  value: string;
};

export interface DataTableToolbarProps<TData extends WithId, TValue> {
  table: Table<TData>;
  filters?: {
    global?: GlobalFilter;
    faceted?: {
      [key: string]: {
        options?: DataTableFacetedFilterProps<TData, TValue>['options'];
        type: DataTableFacetedFilterProps<TData, TValue>['type'];
        title?: string;
      };
    };
  };
  bulkActions?: ItemOption[];
  filterPlaceholder?: string;
}

interface DataTableToolbarFilterProps {
  filter: GlobalFilter;
  placeholder?: string;
}

function DataTableToolbarFilter({
  filter,
  placeholder = 'Filter results...',
}: DataTableToolbarFilterProps) {
  const [filterValue, setFilterValue] = useState(filter.value ?? '');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const handleFilterSubmit = (value: string) => {
    filter.fn(value);
  };

  const debouncedHandleFilterChange = useDebounce(handleFilterSubmit, 300);

  useEffect(() => {
    debouncedHandleFilterChange(filterValue);
  }, [debouncedHandleFilterChange, filterValue]);

  return (
    <Input
      placeholder={placeholder}
      value={filterValue}
      onChange={handleFilterChange}
      className="h-8 w-[150px] lg:w-[250px] max-w-xs border"
    />
  );
}

export function DataTableToolbar<TData extends WithId, TValue>({
  table,
  filters: { global, faceted } = {},
  bulkActions,
  filterPlaceholder,
}: DataTableToolbarProps<TData, TValue>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const hasSelectedRows = table.getFilteredSelectedRowModel().rows.length > 0;

  return (
    <Box
      display="flex"
      items="center"
      justify={global || faceted ? 'between' : 'end'}
    >
      <Box display="flex" items="center" gap={2} flex="1">
        {global?.fn && (
          <DataTableToolbarFilter
            placeholder={filterPlaceholder}
            filter={global}
          />
        )}
        {faceted &&
          Object.entries(faceted).map(
            ([key, { options, type, title, ...rest }]) => (
              <DataTableFacetedFilter
                key={key}
                column={table.getColumn(key)}
                title={title ?? key.charAt(0).toUpperCase() + key.slice(1)}
                options={options}
                type={type as 'dropdown'}
                {...rest}
              />
            ),
          )}

        {isFiltered && (
          <Button
            variant="text"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Icon name="cross-circled" />
          </Button>
        )}
      </Box>

      <Box display="flex" items="center" gap={2}>
        {hasSelectedRows && bulkActions && bulkActions.length > 0 && (
          <ComposedDropdownMenu
            Trigger={Button}
            TriggerProps={{
              children: 'Bulk Actions',
              variant: 'outline',
              className: 'h-8',
            }}
            items={bulkActions}
          />
        )}
        <DataTableViewOptions table={table} />
      </Box>
    </Box>
  );
}
