import { type Table } from '@tanstack/react-table';

import { cn } from '@veraclins-dev/utils';

import { ButtonBase as Button, Icon, Input } from '../../ui';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';
import { type DataTableFacetedFilterProps } from './types';

export interface DataTableToolbarProps<TData, TValue> {
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
}

export function DataTableToolbar<TData, TValue>({
  table,
  filters: { global, faceted } = {},
}: DataTableToolbarProps<TData, TValue>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div
      className={cn(
        'flex items-center',
        global || faceted ? 'justify-between' : 'justify-end',
      )}
    >
      <div className="flex flex-1 items-center space-x-2">
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
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Icon name="cross-circled" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
