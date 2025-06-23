import { type Table } from '@tanstack/react-table';

import {
  Box,
  Button,
  ComposedDropdownMenu,
  Icon,
  Input,
  type ItemOption,
} from '../../ui';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';
import { type DataTableFacetedFilterProps, type WithId } from './types';

export interface DataTableToolbarProps<TData extends WithId, TValue> {
  table: Table<TData>;
  filters?: {
    global?: {
      fn: (value: string) => void;
      value: string;
    };
    faceted?: {
      [key: string]: {
        options: DataTableFacetedFilterProps<TData, TValue>['options'];
      };
    };
  };
  bulkActions?: ItemOption[];
}

export function DataTableToolbar<TData extends WithId, TValue>({
  table,
  filters: { global, faceted } = {},
  bulkActions,
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
          <Input
            placeholder="Filter tasks..."
            value={global.value ?? ''}
            onChange={(event) => global.fn(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px] max-w-xs border"
          />
        )}
        {faceted &&
          Object.entries(faceted).map(([key, { options }]) => (
            <DataTableFacetedFilter
              key={key}
              column={table.getColumn(key)}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              options={options}
            />
          ))}

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
